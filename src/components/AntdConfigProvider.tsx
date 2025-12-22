import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import enUS from "antd/locale/en_US";
import { useLanguage } from "@/hooks/useLanguage";
import type { ReactNode } from "react";

interface AntdConfigProviderProps {
  readonly children: ReactNode;
}

function AntdConfigProvider({ children }: AntdConfigProviderProps) {
  const { currentLanguage } = useLanguage();
  const locale = currentLanguage === "zh-CN" ? zhCN : enUS;

  return <ConfigProvider locale={locale}>{children}</ConfigProvider>;
}

export default AntdConfigProvider;
