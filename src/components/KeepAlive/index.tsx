import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

interface KeepAliveProps {
  children: React.ReactNode;
  include?: string[]; // 需要缓存的路径模式
  exclude?: string[]; // 不需要缓存的路径模式
  max?: number; // 最大缓存数量
}

// 全局缓存存储 - 存储所有缓存的组件实例
const componentCache = new Map<
  string,
  {
    element: React.ReactElement;
    scrollTop: number;
    createdAt: number; // 创建时间，用于LRU
  }
>();

function KeepAlive({
  children,
  include = [],
  exclude = [],
  max = 10,
}: KeepAliveProps) {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePath, setActivePath] = useState(location.pathname);

  // 判断当前路由是否需要缓存
  const shouldCache = (pathname: string) => {
    // 如果设置了 include，只有匹配的路径才缓存
    if (include.length > 0) {
      return include.some((pattern) => pathname.includes(pattern));
    }

    // 如果设置了 exclude，排除的路径不缓存
    if (exclude.length > 0) {
      return !exclude.some((pattern) => pathname.includes(pattern));
    }

    // 默认缓存所有路径（除了首页）
    return pathname !== "/";
  };

  // LRU清理函数
  const evictLRU = () => {
    if (componentCache.size >= max) {
      // 找到最老的缓存项
      let oldestKey = "";
      let oldestTime = Date.now();

      for (const [key, cacheItem] of componentCache) {
        if (cacheItem.createdAt < oldestTime) {
          oldestTime = cacheItem.createdAt;
          oldestKey = key;
        }
      }

      if (oldestKey) {
        console.log(`KeepAlive: 清理过期缓存 ${oldestKey}`);
        componentCache.delete(oldestKey);
      }
    }
  };

  // 监听路由变化
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  // 缓存管理逻辑（在所有Hooks之前）
  const needsCache = shouldCache(location.pathname);

  // 获取或创建缓存的组件（在所有Hooks之前执行）
  let cacheItem = componentCache.get(location.pathname);

  if (!cacheItem && needsCache) {
    // 创建新的缓存组件
    const element = React.cloneElement(children as React.ReactElement, {
      key: `keep-alive-${location.pathname}`, // 稳定的key
    });

    cacheItem = {
      element,
      scrollTop: 0,
      createdAt: Date.now(),
    };

    // LRU清理
    evictLRU();
    componentCache.set(location.pathname, cacheItem);
  }

  // 滚动位置恢复和监听（修复版本）
  useEffect(() => {
    if (!needsCache || !cacheItem) return;

    const container = containerRef.current;
    if (!container) return;

    // 使用 requestAnimationFrame 确保 DOM 更新完成后再恢复滚动
    const restoreScroll = () => {
      requestAnimationFrame(() => {
        container.scrollTop = cacheItem.scrollTop;
      });
    };

    // 延迟执行，确保组件完全渲染
    const timeoutId = setTimeout(restoreScroll, 0);

    // 监听滚动事件并保存位置
    const handleScroll = () => {
      cacheItem.scrollTop = container.scrollTop;
    };

    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      container.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname, cacheItem, needsCache]);

  // 如果不需要缓存，直接渲染
  if (!needsCache) {
    return (
      <div ref={containerRef} style={{ height: "100%", overflow: "auto" }}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{ height: "100%", overflow: "auto", position: "relative" }}
    >
      {/* 渲染所有缓存的组件，通过display控制显示 */}
      {Array.from(componentCache.entries()).map(([path, { element }]) => (
        <div
          key={path}
          style={{
            height: "100%",
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            display: path === activePath ? "block" : "none",
          }}
        >
          {element}
        </div>
      ))}
    </div>
  );
}

export default KeepAlive;
