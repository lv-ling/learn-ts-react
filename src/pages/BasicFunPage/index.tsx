import PageWrapper from "@/components/PageWrapper";
import { useState, useEffect } from "react";
import AdvancedSearchForm from "./FormItem";
import TableContent from "./TableContent";

function BasicFunPage() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);

    const timeoutId = setTimeout(() => {
      console.log("loading 结束");
      setLoading(false);
    }, 1000);

    // 清理函数
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <PageWrapper loading={loading}>
      <AdvancedSearchForm />
      <TableContent />
    </PageWrapper>
  );
}

export default BasicFunPage;
