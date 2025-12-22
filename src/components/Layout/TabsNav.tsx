import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { useTabs } from "@/hooks/useTabs";
import { CloseOutlined } from "@ant-design/icons";
import { deleteCache } from "@/store/cacheSlice";
import { useDispatch } from "react-redux";

function TabsNav() {
  const { tabs, activeKey, switchTab, closeTab } = useTabs();
  const dispatch = useDispatch();
  const items: TabsProps["items"] = tabs.map((tab) => ({
    key: tab.path,
    label: (
      <div className="flex items-center gap-2">
        {tab.icon}
        <span>{tab.title}</span>
        {tabs.length > 1 && (
          <CloseOutlined
            className="ml-1 hover:text-red-500"
            onClick={(e) => {
              e.stopPropagation();
              closeTab(tab.path);
              dispatch(deleteCache(tab.path));
            }}
          />
        )}
      </div>
    ),
  }));

  const handleChange = (key: string) => {
    switchTab(key);
  };

  if (tabs.length === 0) {
    return null;
  }

  return (
    <div className="px-2">
      <Tabs
        activeKey={activeKey}
        items={items}
        onChange={handleChange}
        type="card"
        hideAdd
        size="small"
        className="tabs-nav"
        style={{ margin: 0 }}
      />
    </div>
  );
}

export default TabsNav;
