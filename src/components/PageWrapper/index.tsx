import { ReactNode } from "react";
import { Spin } from "antd";
import pageWrapperCss from "./pageWrapper.module.css";

type PageWrapperProps = {
  readonly children: ReactNode;
  readonly loading?: boolean;
};

function PageWrapper({ children, loading = false }: PageWrapperProps) {
  return (
    <div className="w-full h-full">
      {/* ① 相对定位容器 */}
      <div className={pageWrapperCss.spinWrapper}>
        {/* ② 真正的遮罩层：铺满 + 居中 */}
        {loading && (
          <div className={pageWrapperCss.spinMask}>
            <Spin size="large" />
          </div>
        )}
        {/* ③ 真实内容 */}
        <div className="p-2 page-wrapper">{children}</div>
      </div>
    </div>
  );
}

export default PageWrapper;
