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
  return (
    <Suspense fallback={<RouteLoading />}>
      <KeepAlive cacheKey={location.pathname}>{element}</KeepAlive>
    </Suspense>
  );
}
