import { Card, Typography, Space, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';

const { Title, Paragraph, Text } = Typography;

function I18nDemo() {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <Space direction="vertical" size="large" className="w-full">
          <div>
            <Title level={2}>{t('locale.title')}</Title>
            <Paragraph>{t('locale.description')}</Paragraph>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <Title level={4}>当前语言: {currentLanguage}</Title>
            <Space>
              <Button
                type={currentLanguage === 'zh-CN' ? 'primary' : 'default'}
                onClick={() => changeLanguage('zh-CN')}
              >
                切换到中文
              </Button>
              <Button
                type={currentLanguage === 'en-US' ? 'primary' : 'default'}
                onClick={() => changeLanguage('en-US')}
              >
                Switch to English
              </Button>
            </Space>
          </div>

          <div>
            <Title level={4}>翻译示例</Title>
            <Space direction="vertical" size="middle">
              <div>
                <Text strong>common.welcome: </Text>
                <Text>{t('common.welcome')}</Text>
              </div>
              <div>
                <Text strong>home.title: </Text>
                <Text>{t('home.title')}</Text>
              </div>
              <div>
                <Text strong>counter.title: </Text>
                <Text>{t('counter.title')}</Text>
              </div>
              <div>
                <Text strong>counter.increment: </Text>
                <Text>{t('counter.increment')}</Text>
              </div>
            </Space>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <Title level={4}>使用方式</Title>
            <Space direction="vertical" size="small" className="w-full">
              <Text code className="block">
                import {'{'} useTranslation {'}'} from 'react-i18next';
              </Text>
              <Text code className="block">
                const {'{'} t {'}'} = useTranslation();
              </Text>
              <Text code className="block">
                {'<'}Text{'>'}{'{'}t('common.welcome'){'}'}{'</Text>'}
              </Text>
            </Space>
          </div>
        </Space>
      </Card>
    </div>
  );
}

export default I18nDemo;

