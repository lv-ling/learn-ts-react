import { useRoutes, type RouteObject } from "react-router-dom";
import { Suspense } from "react";
import { Spin } from "antd";
import routes from "./index";
import KeepAlive from "@/components/KeepAlive";

// 路由加载中的占位组件
function RouteLoading() {
  return (
    <Spin percent="auto" size="large" tip="页面加载中...">
      <div />
    </Spin>
  );
}

// 渲染路由的组件
export default function RenderRoutes() {
  const element = useRoutes(routes as RouteObject[]);

  return (
    <Suspense fallback={<RouteLoading />}>
      <KeepAlive
        include={[
          "/",
          "/basicFunPage",
          "/about",
          "/components",
          "counter",
          "/system/local",
        ]} // 只缓存这两个页面
        max={10} // 最大缓存10个页面
      >
        {element}
      </KeepAlive>
    </Suspense>
  );
}
