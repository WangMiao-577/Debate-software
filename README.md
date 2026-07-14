# 辩论大富翁 · 熔城矿脉争夺战

2026CDWC《钢铁雄心：四域之争》课堂演示网页：四域棋盘、表达挑战、计分面板与活动大屏演示。

纯静态站点，**无需 Node / npm / 构建工具**，浏览器直接打开即可。

---

## 在线访问（GitHub Pages）

仓库：<https://github.com/WangMiao-577/Debate-software>

启用 Pages 并完成首次部署后，访问地址一般为：

**https://wangmiao-577.github.io/Debate-software/**

| 页面 | 地址 |
|------|------|
| 主游戏 | `/Debate-software/` 或 `/Debate-software/index.html` |
| 活动演示（隐藏页） | `/Debate-software/zones.html` |

> 首次开启 Pages 后需等待约 1～2 分钟；若 404，检查 Actions 是否跑通，或仓库 Settings → Pages 状态是否为 Active。

---

## 本地安装与运行

### 环境要求

- 任意现代浏览器（Chrome / Edge / Firefox / Safari）
- （可选）本机有 Python 3 或 VS Code Live Server，用于开本地静态服务

### 方式 A：克隆后用本地服务器（推荐）

```bash
git clone https://github.com/WangMiao-577/Debate-software.git
cd Debate-software
```

用 Python 起静态服务（任选其一）：

```bash
# Python 3
python -m http.server 8765
```

浏览器打开：

```
http://127.0.0.1:8765/
```

活动演示页：

```
http://127.0.0.1:8765/zones.html
```

### 方式 B：直接打开文件

双击 `index.html` 也可运行（部分浏览器对本地文件限制更严）。课堂投屏建议仍用方式 A。

### 方式 C：下载 ZIP

1. 打开仓库页 → 绿色 **Code** → **Download ZIP**
2. 解压后进入文件夹，按方式 A 启动 `python -m http.server 8765`

---

## 发布到 GitHub Pages（维护者）

本仓库已附带 Actions 工作流：`.github/workflows/deploy-pages.yml`（推送到 `main` 自动发布 `index.html` / `zones.html` / `css` / `js` / `assets`）。

### 第一次启用（只需做一次）

1. 将最新代码推到 GitHub `main` 分支：

   ```bash
   git add .
   git status
   git commit -m "Prepare GitHub Pages release"
   git push origin main
   ```

2. 打开仓库 → **Settings** → **Pages**
3. **Source** 选择 **GitHub Actions**（不要选 “Deploy from a branch”，以免与工作流冲突）
4. 打开 **Actions** 页，确认工作流 **Deploy GitHub Pages** 成功（绿色勾）
5. 回到 **Settings → Pages**，复制站点 URL 并访问验证

### 之后更新网站

改完代码后：

```bash
git add .
git commit -m "Update game content"
git push origin main
```

推送成功后 Actions 会自动重新部署，约 1 分钟后刷新线上页面即可。

### 手动触发部署

Actions → **Deploy GitHub Pages** → **Run workflow**。

---

## 目录结构

```
Debate-software/
├── index.html          # 主游戏（设定 / 棋盘 / 计分）
├── zones.html          # 活动大屏演示（隐藏入口）
├── css/
│   ├── style.css
│   └── zones.css
├── js/
│   ├── data.js         # 棋盘、活动、素材池
│   ├── game.js
│   ├── zones-data.js
│   └── zones.js
├── assets/             # 背景图
├── .github/workflows/  # Pages 自动部署
└── README.md
```

---

## 课堂快捷操作

| 操作 | 说明 |
|------|------|
| `空格` | 投骰子 |
| `S` | 打开计分面板 |
| `Z` | 打开活动演示页 |
| `Esc` | 关闭弹窗 |
| 连点标题旁 `2026CDWC · STEEL HEART` 五次 | 打开活动演示页 |

进度保存在浏览器 `localStorage`（键名 `melt-city-monopoly`），换设备不会同步。

---

## 活动一览（新规则）

- **逛三园**：小活动，30 秒接龙外延，+1 / 个  
- **飞花令 / 诗词大赛**：主题库飞花或诗词  
- **驳论闪电战**：1 分钟两层反驳，线性给分 **+1～+8**  
- **AI鉴识**：鉴别人工 / AI，成功 +5  
- **瞎掰王**：真假概念投票，未找出 +7 / 找出他组各 +2  

各活动素材打乱顺序、不重复展示；限时活动带计时器。

---

## 常见问题

**Q: Pages 打开是空白或样式丢失？**  
确认访问的是 `…/Debate-software/`（带仓库名路径），且 Actions 部署成功。本站使用相对路径，勿用错误的自定义 `base`。

**Q: 需要安装依赖吗？**  
不需要。没有 `package.json`，也没有后端服务。

**Q: 可以嵌到自己的域名吗？**  
可以：Pages 设置里绑定 Custom domain，并按 GitHub 文档配置 DNS。

**Q: 本地改完如何给同学试用？**  
推送到 `main` 用线上链接，或把整个文件夹打包发 ZIP，对方按「本地安装」启动。

---

## 许可与用途

课堂演示用途。剧本与视觉素材归属 2026CDWC 相关组织方；二次分发请遵守活动方要求。
