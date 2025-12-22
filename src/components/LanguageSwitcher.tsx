import { Button, Dropdown } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useLanguage } from '@/hooks/useLanguage';

function LanguageSwitcher() {
  const { currentLanguage, changeLanguage } = useLanguage();

  const items: MenuProps['items'] = [
    {
      key: 'zh-CN',
      label: '中文',
      onClick: () => changeLanguage('zh-CN'),
    },
    {
      key: 'en-US',
      label: 'English',
      onClick: () => changeLanguage('en-US'),
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomRight">
      <Button icon={<GlobalOutlined />} type="text">
        {currentLanguage === 'zh-CN' ? '中文' : 'English'}
      </Button>
    </Dropdown>
  );
}

export default LanguageSwitcher;

