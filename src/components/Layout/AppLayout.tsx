import { Layout, Menu } from "antd";
import { useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { generateMenuItems } from "@/routes/menuItems";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import BreadcrumbNav from "./BreadcrumbNav";
import TabsNav from "./TabsNav";
import { useMemo, useState, useEffect } from "react";

const { Header, Sider, Content } = Layout;

interface AppLayoutProps {
  readonly children: ReactNode;
}

/** 根据 pathname 向上收集所有需要展开的父级 key */
function getOpenKeys(pathname: string): string[] {
  const keys: string[] = [];
  const segs = pathname.split("/").filter(Boolean);
  let full = "";
  segs.forEach((s, i) => {
    full += `/${s}`;
    if (i < segs.length - 1) keys.push(full); // 末段自己是选中，不展开
  });
  return keys;
}

function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  const menuItems = generateMenuItems();

  /* -------- 受控展开逻辑 -------- */
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  useEffect(() => {
    setOpenKeys(getOpenKeys(location.pathname));
  }, [location.pathname]);

  const selectedKeys = useMemo(() => [location.pathname], [location.pathname]);

  return (
    <Layout className="h-screen">
      {/* 固定在顶部的 Header */}
      <Header
        className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50 flex flex-col"
        style={{ height: "auto", padding: 0 }}
      >
        {/* 第一行：标题、面包屑、语言切换 */}
        <div
          className="flex items-center justify-between px-6"
          style={{ height: "64px", lineHeight: "64px" }}
        >
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <h1 className="text-xl font-bold text-gray-800 m-0 whitespace-nowrap">
              Learn React
            </h1>
            <div className="flex-1 min-w-0">
              <BreadcrumbNav />
            </div>
          </div>
          <div className="ml-4">
            <LanguageSwitcher />
          </div>
        </div>
        {/* 第二行：标签页导航 */}
        <div className="border-t border-gray-200 bg-white">
          <TabsNav />
        </div>
      </Header>

      <Layout
        style={{
          height: "calc(100vh - 112px)",
          marginTop: "112px",
        }}
      >
        {/* 侧边栏 */}
        <Sider
          width={200}
          className="bg-white"
          style={{ overflowY: "auto", height: "100%" }}
        >
          <Menu
            mode="inline"
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onOpenChange={setOpenKeys}
            items={menuItems}
            className="h-full border-r-0"
          />
        </Sider>

        {/* 内容区域 - KeepAlive 内部处理滚动 */}
        <Content className="bg-gray-50" style={{ height: "100%" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default AppLayout;
