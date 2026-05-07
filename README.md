# Hermes Agent Desktop Client

基于 Hermes 开发的桌面应用 UI，支持 Hermes 新版本更新，包含针对小白的操作引导。

## 功能特性

- 聊天界面 - 与 Hermes 对话的主界面
- 技能管理 - 管理 Hermes 可用的技能/工具
- 版本管理 - Hermes 版本切换、自动检测更新、版本回退
- 设置配置 - API 密钥、模型参数等设置
- 任务历史 - 查看对话历史记录
- 插件扩展 - 支持安装第三方插件
- 记忆管理 - 管理 Hermes 的记忆功能
- Tokens 管理 - 查看 token 消耗统计
- 工作空间管理 - 创建、切换、管理多个工作空间

## 技术栈

- Electron - 桌面应用框架
- React + TypeScript - 前端开发
- TailwindCSS - 样式框架
- Zustand - 状态管理

## 安装使用

### 开发环境

```bash
# 克隆项目
git clone <your-repo-url>
cd hermes-desktop

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 打包构建

```bash
# 构建生产版本
npm run build

# 打包安装程序
npm run package
```

## GitHub Actions 自动打包

项目已配置 GitHub Actions 工作流，支持自动打包 Windows、macOS 和 Linux 三个平台的安装包。

### 使用方法

1. **Fork 或推送代码到 GitHub 仓库**

2. **创建标签触发自动打包**
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

3. **查看构建结果**
   - 进入 GitHub 仓库的 Actions 页面
   - 等待构建完成
   - 在 Releases 页面下载安装包

### 构建输出

| 平台 | 输出文件 |
|------|----------|
| Windows | `.exe` (安装程序), `.exe` (便携版) |
| macOS | `.dmg` (安装包), `.zip` (压缩包) |
| Linux | `.AppImage`, `.snap`, `.deb` |

## 用户引导

应用内置了针对小白用户的操作引导系统：

1. **首次启动引导** - 分步介绍主要功能
2. **操作提示** - 悬停时显示功能说明
3. **智能助手** - 内置帮助按钮可随时查看指南

## 版本更新

- 支持自动检测新版本
- 支持一键更新
- 支持版本回退

## 项目结构

```
hermes-desktop/
├── src/
│   ├── main/           # Electron 主进程
│   ├── renderer/       # React 前端代码
│   ├── store/          # Zustand 状态管理
│   └── types/          # TypeScript 类型定义
├── build/              # 应用图标等资源
├── .github/workflows/  # GitHub Actions 配置
├── vite.config.cjs     # Vite 配置
├── tsconfig.json       # TypeScript 配置
└── package.json        # 项目配置
```

## 许可证

MIT
