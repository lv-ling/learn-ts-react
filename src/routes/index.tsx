import { RouteObject } from "react-router-dom";
import {
  HomeOutlined,
  InfoCircleOutlined,
  CalculatorOutlined,
  CodeOutlined,
  GlobalOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { ReactNode } from "react";

// 懒加载页面组件
import { lazy } from "react";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Counter = lazy(() => import("@/pages/Counter"));
const ComponentComparison = lazy(() => import("@/pages/ComponentComparison"));
const LocaleDemo = lazy(() => import("@/pages/LocaleDemo"));
const I18nDemo = lazy(() => import("@/pages/I18nDemo"));

// 路由元数据接口
export interface RouteMeta {
  title: string;
  icon?: ReactNode;
  hidden?: boolean; // 是否在菜单中隐藏
  requiresAuth?: boolean; // 是否需要认证
}

// 扩展路由配置接口
export interface AppRouteObject extends Omit<RouteObject, "children"> {
  meta?: RouteMeta;
  children?: AppRouteObject[];
}

// 路由配置
export const routes: AppRouteObject[] = [
  {
    path: "/",
    element: <Home />,
    meta: {
      title: "首页",
      icon: <HomeOutlined />,
    },
  },
  {
    path: "/about",
    element: <About />,
    meta: {
      title: "关于",
      icon: <InfoCircleOutlined />,
    },
  },
  {
    path: "/counter",
    element: <Counter />,
    meta: {
      title: "计数器",
      icon: <CalculatorOutlined />,
    },
  },
  {
    path: "/components",
    element: <ComponentComparison />,
    meta: {
      title: "组件对比",
      icon: <CodeOutlined />,
    },
  },
  {
    path: "/system",
    exact: true,
    meta: {
      title: "系统设置",
      icon: <SettingOutlined />,
    },
    children: [
      {
        path: "local",
        element: <LocaleDemo />,
        meta: {
          title: "国际化示例",
          icon: <GlobalOutlined />,
        },
      },
      {
        path: "i18n", // 使用相对路径，完整路径为 /system/locale/i18n
        element: <I18nDemo />,
        meta: {
          title: "i18n 多语言",
          icon: <GlobalOutlined />,
        },
      },
    ],
  },
] as AppRouteObject[];

// 导出路由配置供 React Router 使用
export default routes;
