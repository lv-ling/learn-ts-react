import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { routes, type AppRouteObject } from '@/routes/index';

export interface TabItem {
  key: string;
  path: string;
  title: string;
  icon?: React.ReactNode;
}

// 查找路由信息
function findRouteByPath(routes: AppRouteObject[], pathname: string): AppRouteObject | null {
  const parts = pathname.replace(/^\/+/, '').split('/');

  function search(
    routes: AppRouteObject[],
    index: number
  ): AppRouteObject | null {
    for (const route of routes) {
      // 顶层路由可能带 /，如 /system
      const routePath = route.path?.replace(/^\/+/, '');

      if (routePath === parts[index]) {
        if (index === parts.length - 1) {
          return route; // 找到最后一级
        }
        if (route.children) {
          const found = search(route.children, index + 1);
          if (found) return found;
        }
      }
    }
    return null;
  }

  return search(routes, 0);
}

// 获取路由标题
function getRouteTitle(pathname: string): string {
  const route = findRouteByPath(routes, pathname);
  return route?.meta?.title || '未知页面';
}

// 获取路由图标
function getRouteIcon(pathname: string): React.ReactNode | undefined {
  const route = findRouteByPath(routes, pathname);
  return route?.meta?.icon;
}

export function useTabs() {
  const navigate = useNavigate();
  const location = useLocation();
  const [tabs, setTabs] = useState<TabItem[]>([]);
  const [activeKey, setActiveKey] = useState<string>('');

  // 初始化首页标签并监听路由变化
  useEffect(() => {
    const pathname = location.pathname;

    setTabs((prev) => {
      // 如果标签列表为空，初始化首页标签
      if (prev.length === 0) {
        const homeTab: TabItem = {
          key: '/',
          path: '/',
          title: getRouteTitle('/'),
          icon: getRouteIcon('/'),
        };
        return [homeTab];
      }

      // 检查当前路径是否已存在，不存在则添加
      if (!prev.some((tab) => tab.path === pathname)) {
        const newTab: TabItem = {
          key: pathname,
          path: pathname,
          title: getRouteTitle(pathname),
          icon: getRouteIcon(pathname),
        };
        return [...prev, newTab];
      }

      return prev;
    });

    setActiveKey(pathname);
  }, [location.pathname]);

  // 切换标签
  const switchTab = useCallback(
    (path: string) => {
      navigate(path);
      setActiveKey(path);
    },
    [navigate]
  );

  // 关闭标签
  const closeTab = useCallback(
    (path: string) => {
      if (tabs.length <= 1) {
        // 至少保留一个标签
        return;
      }

      const newTabs = tabs.filter((tab) => tab.path !== path);
      setTabs(newTabs);

      // 如果关闭的是当前标签，切换到最后一个标签
      if (path === activeKey) {
        const lastTab = newTabs.at(-1);
        if (lastTab) {
          navigate(lastTab.path);
          setActiveKey(lastTab.path);
        }
      }
    },
    [tabs, activeKey, navigate]
  );

  // 关闭其他标签
  const closeOtherTabs = useCallback(
    (path: string) => {
      const currentTab = tabs.find((tab) => tab.path === path);
      if (currentTab) {
        setTabs([currentTab]);
        navigate(path);
        setActiveKey(path);
      }
    },
    [tabs, navigate]
  );

  // 关闭所有标签（保留当前）
  const closeAllTabs = useCallback(() => {
    const currentTab = tabs.find((tab) => tab.path === activeKey);
    if (currentTab) {
      setTabs([currentTab]);
    }
  }, [tabs, activeKey]);

  return {
    tabs,
    activeKey,
    switchTab,
    closeTab,
    closeOtherTabs,
    closeAllTabs,
  };
}

