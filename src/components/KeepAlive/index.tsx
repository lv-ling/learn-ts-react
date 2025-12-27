import React, { useEffect, useRef, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { addCache, deleteCache, updateScrollTop } from "@/store/cacheSlice";

interface KeepAliveProps {
  readonly children: React.ReactNode;
  readonly cacheKey: string;
  readonly max?: number;
  readonly scrollRestoration?: boolean;
}

// 缓存的组件渲染器
const CachedRenderer = React.memo<{
  cacheKey: string;
  children: React.ReactNode;
  onScroll: (scrollTop: number) => void;
}>(({ cacheKey, children, onScroll }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(`CachedRenderer 挂载: ${cacheKey}`);
    return () => {
      console.log(`CachedRenderer 卸载: ${cacheKey}`);
    };
  }, [cacheKey]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    onScroll(e.currentTarget.scrollTop);
  };

  return (
    <div
      ref={containerRef}
      data-cache-key={cacheKey}
      style={{
        height: "100%",
        overflow: "auto",
      }}
      onScroll={handleScroll}
    >
      {children}
    </div>
  );
});

function KeepAlive({
  children,
  cacheKey,
  max = 10,
  scrollRestoration = true,
}: KeepAliveProps) {
  const dispatch = useDispatch();
  const cache = useSelector((state: RootState) => state.cache.cache);

  // 初始化缓存
  useEffect(() => {
    if (!cache[cacheKey]) {
      dispatch(
        addCache({
          key: cacheKey,
          pathname: cacheKey,
        })
      );

      // LRU 缓存清理
      const keys = Object.keys(cache);
      if (keys.length >= max) {
        const firstKey = keys[0];
        dispatch(deleteCache(firstKey));
      }
    }
  }, [cacheKey, cache, dispatch, max]);

  const handleScroll = useCallback(
    (scrollTop: number) => {
      if (scrollRestoration) {
        dispatch(
          updateScrollTop({
            key: cacheKey,
            scrollTop,
          })
        );
      }
    },
    [scrollRestoration, dispatch, cacheKey]
  );

  // 使用 useMemo 确保只有在 cacheKey 变化时才重新创建组件
  const cachedRenderer = useMemo(() => {
    console.log(`KeepAlive: 创建/重用 CachedRenderer for ${cacheKey}`);
    return (
      <CachedRenderer
        key={cacheKey} // 稳定的 key
        cacheKey={cacheKey}
        onScroll={handleScroll}
      >
        {children}
      </CachedRenderer>
    );
  }, [cacheKey, children, handleScroll]);

  return cachedRenderer;
}

export default KeepAlive;
