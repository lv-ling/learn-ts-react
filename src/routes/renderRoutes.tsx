import { useRoutes, useLocation, type RouteObject } from "react-router-dom";
import { Suspense } from "react";
import { Spin } from "antd";
import routes from "./index";
import KeepAlive from "@/components/KeepAlive";

// 路由加载中的占位组件
function RouteLoading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Spin size="large" tip="加载中..." />
    </div>
  );
}

// 渲染路由的组件
export default function RenderRoutes() {
  const location = useLocation();
  const element = useRoutes(routes as RouteObject[]);

  // 可以根据路由配置决定是否启用缓存
  const shouldCache = (path: string) => {
    // 例如：只缓存特定页面，不缓存首页
    const noCachePaths = ['/'];
    return !noCachePaths.includes(path);
  };

  if (shouldCache(location.pathname)) {
    return (
      <Suspense fallback={<RouteLoading />}>
        <KeepAlive cacheKey={location.pathname} max={5}>
          {element}
        </KeepAlive>
      </Suspense>
    );
  }

  // 不缓存的页面正常渲染
  return (
    <Suspense fallback={<RouteLoading />}>
      {element}
    </Suspense>
  );
}
