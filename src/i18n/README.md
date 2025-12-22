# React 多语言方案

## 主流方案对比

### 1. **react-i18next** ⭐ (推荐)

- **优点**：

  - 最流行的 React i18n 方案
  - 基于成熟的 i18next 库
  - 功能强大，支持复数、插值、命名空间等
  - 支持懒加载语言包
  - 丰富的插件生态
  - TypeScript 支持良好

- **适用场景**：大多数 React 项目

### 2. **react-intl** (FormatJS)

- **优点**：

  - 由 React 团队维护
  - 遵循国际化标准（ICU Message Format）
  - 支持日期、数字、货币格式化
  - 功能全面

- **缺点**：

  - 学习曲线较陡
  - 配置相对复杂

- **适用场景**：需要复杂格式化的企业级应用

### 3. **react-intl-universal**

- **优点**：

  - 阿里巴巴开源
  - 支持 React 组件和纯 JS
  - 轻量级

- **适用场景**：中小型项目

## 本项目使用：react-i18next

### 安装依赖

```bash
npm install i18next react-i18next
```

### 项目结构

```
src/
├── i18n/
│   ├── index.ts              # i18n 配置
│   ├── locales/
│   │   ├── zh-CN.json        # 中文语言包
│   │   └── en-US.json        # 英文语言包
│   └── README.md
└── hooks/
    └── useLanguage.ts        # 语言切换 Hook
```

### 使用方法

#### 1. 在组件中使用

```tsx
import { useTranslation } from "react-i18next";

function MyComponent() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("common.welcome")}</h1>
      <p>{t("home.description")}</p>
    </div>
  );
}
```

#### 2. 切换语言

```tsx
import { useLanguage } from "@/hooks/useLanguage";

function LanguageSwitcher() {
  const { changeLanguage, currentLanguage } = useLanguage();

  return <button onClick={() => changeLanguage("en-US")}>切换到英文</button>;
}
```

#### 3. 带参数翻译

```json
// zh-CN.json
{
  "greeting": "你好，{{name}}！"
}
```

```tsx
{
  t("greeting", { name: "张三" });
} // 输出：你好，张三！
```

#### 4. 复数形式

```json
{
  "items": "{{count}} 个项目",
  "items_plural": "{{count}} 个项目"
}
```

```tsx
{
  t("items", { count: 5 });
} // 自动选择复数形式
```

### 与 Ant Design 集成

本项目同时配置了 Ant Design 的国际化，语言切换时会同步更新：

```tsx
// LanguageSwitcher.tsx 中会自动同步 Ant Design 的语言
useEffect(() => {
  setAntdLocale(currentLanguage === "zh-CN" ? zhCN : enUS);
}, [currentLanguage]);
```

### 最佳实践

1. **语言包组织**：按功能模块组织（common、home、about 等）
2. **命名规范**：使用点分隔的命名空间（如 `common.welcome`）
3. **类型安全**：可以为翻译 key 添加 TypeScript 类型定义
4. **懒加载**：大型项目可以使用懒加载语言包
5. **持久化**：将用户选择的语言保存到 localStorage
