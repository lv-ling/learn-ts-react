import { Link } from "react-router-dom";
import type { MenuProps } from "antd";
import { routes, type AppRouteObject } from "./index";

type MenuItemType = NonNullable<MenuProps["items"]>[number];

// 递归生成菜单项（支持嵌套子菜单）
function generateMenuItem(
  route: AppRouteObject,
  parentPath = ""
): MenuItemType | null {
  // 如果路由被隐藏，返回 null
  if (route.meta?.hidden) {
    return null;
  }

  // 如果没有 meta，跳过
  if (!route.meta) {
    return null;
  }

  // 计算完整路径：如果是 index 路由，使用父路径；如果是相对路径，组合父路径；否则使用绝对路径
  let fullPath = "";
  if (route.index) {
    fullPath = parentPath;
  } else if (route.path) {
    // 判断是相对路径还是绝对路径
    if (route.path.startsWith("/")) {
      fullPath = route.path;
    } else {
      // 规范化路径：移除多余的斜杠
      const parts = [parentPath, route.path].filter(Boolean);
      fullPath = "/" + parts.join("/").split("/").filter(Boolean).join("/");
    }
  }

  // 如果路由没有 element 但有子路由，则作为分组标题（不可点击）
  const hasChildren = route.children && route.children.length > 0;
  const isGroupOnly = !route.element && hasChildren;

  const menuItem: MenuItemType = {
    key: fullPath || route.meta.title, // 如果没有路径，使用标题作为 key
    icon: route.meta.icon,
    label:
      isGroupOnly || !fullPath ? (
        route.meta.title
      ) : (
        <Link to={fullPath}>{route.meta.title}</Link>
      ),
  };

  // 如果有子路由，递归生成子菜单
  if (route.children && route.children.length > 0) {
    const children = route.children
      .map((child) => generateMenuItem(child, fullPath))
      .filter((item): item is MenuItemType => item !== null);

    if (children.length > 0) {
      (menuItem as MenuItemType & { children: MenuItemType[] }).children =
        children;
    }
  }

  return menuItem;
}

// 从路由配置生成菜单项
export function generateMenuItems(): MenuProps["items"] {
  return routes
    .map((route) => generateMenuItem(route))
    .filter((item): item is MenuItemType => item !== null);
}

// 获取路由路径对应的标题（用于面包屑等）
export function getRouteTitle(pathname: string): string {
  const route = findRouteByPath(routes, pathname);
  return route?.meta?.title || "未知页面";
}

// 递归查找路由（支持完整路径匹配）
function findRouteByPath(
  routes: AppRouteObject[],
  pathname: string,
  parentPath = ""
): AppRouteObject | null {
  for (const route of routes) {
    // 计算当前路由的完整路径
    let fullPath = "";
    if (route.index) {
      fullPath = parentPath;
    } else if (route.path) {
      if (route.path.startsWith("/")) {
        fullPath = route.path;
      } else {
        const parts = [parentPath, route.path].filter(Boolean);
        fullPath = "/" + parts.join("/").split("/").filter(Boolean).join("/");
      }
    }

    // 匹配完整路径
    if (fullPath === pathname) {
      return route;
    }

    // 递归查找子路由
    if (route.children) {
      const found = findRouteByPath(route.children, pathname, fullPath);
      if (found) return found;
    }
  }
  return null;
}
