# React + Vite + TypeScript 项目

这是一个现代化的 React 前端项目模板，集成了以下技术栈：

- ⚛️ **React 18** - 用户界面库
- ⚡ **Vite** - 快速的构建工具
- 📘 **TypeScript** - 类型安全的 JavaScript
- 🗃️ **Redux Toolkit** - 状态管理
- 🧭 **React Router** - 路由管理
- 🎨 **Tailwind CSS** - 原子化 CSS 框架
- 🎯 **Ant Design** - 企业级 UI 组件库

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 项目结构

```
src/
├── components/          # 组件目录
│   └── Layout/         # 布局组件
├── pages/              # 页面组件
├── store/              # Redux store
│   ├── slices/         # Redux slices
│   └── hooks.ts        # Redux hooks
├── App.tsx             # 主应用组件
├── main.tsx            # 应用入口
└── index.css           # 全局样式
```

## 技术栈说明

### Redux Toolkit
使用 Redux Toolkit 进行状态管理，示例代码在 `src/pages/Counter.tsx` 中。

### React Router
使用 React Router v6 进行路由管理，路由配置在 `src/App.tsx` 中。

### Tailwind CSS
原子化 CSS 框架，配置文件为 `tailwind.config.js`。注意已禁用 preflight 以避免与 Ant Design 样式冲突。

### Ant Design
企业级 UI 组件库，已在 `main.tsx` 中配置中文语言包。

## 开发建议

1. 使用 TypeScript 的类型系统提高代码质量
2. 遵循 React Hooks 最佳实践
3. 使用 Redux Toolkit 的 createSlice 创建状态切片
4. 利用 Tailwind CSS 的原子类快速构建 UI
5. 使用 Ant Design 组件保持 UI 一致性

## License

MIT

