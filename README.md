# 我的成长主页（个人学习记录与技能展示网页）

一个用原生 HTML / CSS / JavaScript 编写的个人主页，用于记录大学期间的学习过程、展示技能与项目作品。它不是一次性的课程作业，而是一个会持续更新的个人空间。

## 项目说明

- **纯原生实现**：不依赖任何框架或外部 CDN，离线也能完整运行。
- **5 个页面**，通过顶部导航栏互相跳转：
  | 页面 | 文件 | 内容 |
  |------|------|------|
  | 关于我 | `index.html` | 我是谁、学习方向、一句话介绍、最近更新 |
  | 学习记录 | `records.html` | 时间线形式的学习记录（时间 / 学了什么 / 问题 / 解决方式） |
  | 技能展示 | `skills.html` | 技能清单 + 代码片段作为证据 |
  | 项目作品 | `projects.html` | 项目介绍（解决什么问题 / 负责什么 / 技术栈 / 最大困难） |
  | 联系方式 | `contact.html` | GitHub 与邮箱（不含隐私信息）+ 留言表单 |
- **交互功能**（见 `js/main.js`）：
  - 当前页面导航自动高亮
  - 移动端响应式汉堡菜单
  - 留言表单的 JavaScript 校验（称呼非空、邮箱格式、留言长度），通过后保存到浏览器 `localStorage`
  - 回到顶部按钮、页脚年份自动更新

## 目录结构

```
growth-homepage/
├── index.html        # 关于我（首页）
├── records.html      # 学习记录
├── skills.html       # 技能展示
├── projects.html     # 项目作品
├── contact.html      # 联系方式 + 留言表单
├── css/
│   └── style.css     # 全站共享样式（全局外观只改这一个文件）
├── js/
│   └── main.js       # 全站共享脚本（导航 / 表单校验 / 留言存储）
└── README.md         # 本文件
```

## 运行方式

**方式一（最简单）：** 直接双击 `index.html`，用浏览器打开即可。所有页面、样式、脚本均可在本地文件方式下正常工作。

**方式二（推荐，便于后续开发）：** 使用 VS Code 的 Live Server 插件：

1. 用 VS Code 打开本文件夹；
2. 安装 "Live Server" 扩展；
3. 右键 `index.html` → "Open with Live Server"，浏览器会自动打开 `http://127.0.0.1:5500`。

或使用任意静态服务器，例如：

```bash
# Python
python -m http.server 8000
# 然后访问 http://localhost:8000
```

## 部署到 GitHub Pages（可选）

1. 在 GitHub 上创建一个新仓库（例如 `growth-homepage`），不要勾选自动生成 README；
2. 把本地代码推送上去：
   ```bash
   git remote add origin https://github.com/<你的用户名>/growth-homepage.git
   git push -u origin master
   ```
3. 仓库页面 → Settings → Pages → Branch 选择 `master`（或 `main`）→ Save；
4. 等待约 1 分钟，访问 `https://<你的用户名>.github.io/growth-homepage/`。

## 内容替换指南

网页中的示例内容都标有 `<!-- TODO: ... -->` 注释，替换为自己的真实信息时：

1. 全局搜索 `TODO`，按注释提示逐条替换（姓名、一句话介绍、GitHub 用户名、邮箱等）；
2. 学习记录（`records.html`）每条包含时间 / 学了什么 / 问题 / 解决方式，至少保留 3 条真实记录；
3. 技能（`skills.html`）建议按"我用它做过什么"来写，避免"熟悉 / 了解"这类空话；
4. 每次学完新东西，在学习记录和首页"最近更新"里各补一条。

## 隐私说明

本站只包含 GitHub 主页与邮箱两类联系方式，不涉及手机号、家庭住址、身份证号等敏感信息。留言表单为纯前端演示，数据只保存在访问者自己的浏览器 `localStorage` 中，不会上传服务器。
