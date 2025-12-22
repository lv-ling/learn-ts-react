import { Breadcrumb } from "antd";
import { useLocation, Link } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import { routes, type AppRouteObject } from "@/routes/index";

function BreadcrumbNav() {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => !!i);

  // 构建面包屑项
  const breadcrumbItems = [
    {
      title: (
        <Link to="/">
          <HomeOutlined /> 首页
        </Link>
      ),
    },
  ];

  // 根据路径生成面包屑
  let currentPath = "";
  pathSnippets.forEach((snippet) => {
    currentPath += `/${snippet}`;
    const route = findRouteByPath(routes, currentPath);
    if (route?.meta) {
      breadcrumbItems.push({
        title: <span>{route.meta.title}</span>,
      });
    }
  });

  return <Breadcrumb items={breadcrumbItems} />;
}

/**
 * 递归查找路由
 * 根据完整 pathname 找出唯一匹配的路由对象（支持嵌套）
 * 顶层 path 允许带 "/"，子层不带
 */
function findRouteByPath(
  routes: AppRouteObject[],
  pathname: string
): AppRouteObject | null {
  // 去掉开头多余的 "/"，拆成段
  const parts = pathname.replace(/^\/+/, "").split("/"); // ["system","local"]

  // 从索引 0 开始递归
  function deep(list: AppRouteObject[], idx: number): AppRouteObject | null {
    for (const node of list) {
      // 统一把路由自身的 path 去掉前缀 "/" 再比较
      const nodePath = node.path?.replace(/^\/+/, "");
      if (nodePath !== parts[idx]) continue;

      // 已经匹配到最后一段，直接返回
      if (idx === parts.length - 1) return node;

      // 还有下级，继续往 children 里找
      if (node.children) {
        const hit = deep(node.children, idx + 1);
        if (hit) return hit;
      }
    }
    return null;
  }

  return deep(routes, 0);
}

export default BreadcrumbNav;
