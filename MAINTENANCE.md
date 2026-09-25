# WUT-AI4Mat 实验室网站 · 维护与部署说明

> 本文档说明站点的目录结构、内容维护方式和部署流程。
> 实验室介绍请看 [README.md](README.md)，站点线上地址：<https://wut-ai4mat.github.io/>

武汉理工大学 WUT-AI4Mat 实验室（人工智能 + 材料科学交叉研究）的静态宣传站点。
纯 HTML / CSS / JavaScript，无任何依赖与构建步骤，可直接部署到任意静态托管。

## 目录结构

```
index.html                 页面结构（含所有静态文案）
404.html                   找不到页面时的提示页（不依赖外部资源）
assets/css/style.css       全部样式
assets/js/data.js          可维护内容：师资、成员、论文、项目、专利  ← 日常主要改这里
assets/js/main.js          渲染与交互逻辑
assets/img/                教师照片、站点图标
robots.txt / sitemap.xml   搜索引擎收录配置
.nojekyll                  GitHub Pages 所需的空文件
README.md                  仓库首页：实验室介绍
MAINTENANCE.md             本文件：维护与部署说明
SOURCES.md                 内容来源与整理说明
```

## 本地预览

直接双击 `index.html` 即可；如需更接近线上的效果（避免个别浏览器对 `file://` 的限制），可起一个本地服务：

```powershell
python -m http.server 8000
# 浏览器打开 http://localhost:8000
```

## 如何更新内容

所有需要长期维护的内容都集中在 `assets/js/data.js`，改完后刷新页面即可生效。

| 想改什么 | 改哪里 |
| --- | --- |
| 首页统计数字（带头人、论文数、被引数） | `SITE.stats` |
| 教师简介、职称、研究方向、链接 | `FACULTY` |
| 研究生团队成员 | `MEMBERS`（见下方示例） |
| 论文列表 / 精选标记 | `PUBLICATIONS` |
| 科研项目 | `PROJECTS` |
| 专利与著作 | `PATENTS` |
| 实验室简介、研究方向、联系方式的正文 | `index.html` |

### 添加研究生成员

`MEMBERS` 目前为空数组，页面会显示「名单持续更新中」的提示卡片。
补充成员后自动变为卡片列表：

```js
const MEMBERS = [
  {
    name: "张三",
    en: "San ZHANG",
    grade: "2024 级博士研究生",
    topic: "材料科学文本挖掘与知识抽取",
    email: "zhangsan@whut.edu.cn"
  }
];
```

### 添加论文

```js
{
  y: 2026,                       // 年份，列表按年份倒序自动分组
  title: "论文标题（建议保留原始英文标题）",
  authors: "Xin Zhang, Jingling Yuan*, Wen Luo*",  // 两位老师会被自动加粗标注
  venue: "KDD 2026",
  badge: "CCF A",                // 右上角标注文字
  badgeType: "a",                // a=青绿底（CCF/顶会） q=铜色底（期刊分区） b=灰色底
  themes: ["mol", "battery"],    // 方向标签，取值见 THEMES
  featured: true                 // 是否进入首页默认的「WUT-AI4Mat 精选」
}
```

方向标签取值：`llm` 材料大模型 / `mol` 分子与材料学习 / `char` 智能表征 /
`battery` 电池与器件 / `eff` 高效计算 / `ml` 机器学习方法。

### 替换教师照片

把照片放到 `assets/img/` 下，再修改 `FACULTY` 中对应的 `photo` 路径。
建议使用 3:4 竖版照片（宽 400px 以上），页面会自动裁切填充。

## 部署

站点是纯静态、零依赖的，所有资源都使用相对路径，因此既可以放在域名根目录，
也可以放在子目录（如 `ai.whut.edu.cn/ai4mat/`），两种情形都不需要改代码。

### 方式一：GitHub Pages（当前使用，已上线）

- 账号：<https://github.com/WUT-AI4Mat>（个人账号，不是组织）
- 仓库：<https://github.com/WUT-AI4Mat/WUT-AI4Mat.github.io>
- 远程地址：`https://github.com/WUT-AI4Mat/WUT-AI4Mat.github.io.git`
- 站点地址：<https://wut-ai4mat.github.io/>（已启用 Pages，设为 User Site）

仓库命名为 `WUT-AI4Mat.github.io` 的好处是站点直接发布在 `https://wut-ai4mat.github.io/` 根目录，
不带子路径。若改用其他仓库名，站点地址会变成 `https://wut-ai4mat.github.io/<仓库名>/`，
届时需要同步修改 `robots.txt` 与 `sitemap.xml` 中的地址。

本地仓库已初始化、远程已配置并完成首次提交，后续更新只需提交后推送：

```powershell
cd C:\Users\zhang\codex_workspace\WUT_AI4Mat
git add -A
git commit -m "更新说明"
git push
```

> **推送时的网络设置**：本机直连 github.com 不稳定（443 常被阻断），需借助本机代理软件。
> 该软件通常提供两个入口，实测表现不同：
> - HTTP 入口 `http://127.0.0.1:7890` —— 可访问 github.io、api.github.com，但连 github.com 会出现 TLS 握手失败
> - SOCKS5 入口 `socks5h://127.0.0.1:7891` —— 连 github.com 正常（当前使用这个）
>
> 仓库级配置已设为 SOCKS5。若某天推送失败，可先试另一个入口：
> `git config http.proxy socks5h://127.0.0.1:7891`；
> 直连可用时则用 `git config --unset http.proxy && git config --unset https.proxy` 取消代理。

首次推送时会弹出登录窗口，需要一个有该仓库写权限的 **Personal Access Token**
（GitHub 已不支持用账号密码推送，密码框里要填 Token），或直接点弹窗中的浏览器登录。
凭据由 Windows 凭据管理器保存，之后推送不再询问。

仓库的 Settings → Pages 已配置为 `Deploy from a branch`、`main` + `/ (root)`，
每次推送后约 1 分钟自动重新发布。

注意两点：

1. GitHub Pages 免费版要求仓库为 **Public**，仓库内容对外可见（网站本身也是公开的）。
2. 该账号是个人账号，仓库名 `WUT-AI4Mat.github.io` 与账号名一致，
   因此站点发布在 `https://wut-ai4mat.github.io/` 根目录（GitHub 的 User Site 规则）。

仓库中的 `.nojekyll` 用于关闭 GitHub Pages 的 Jekyll 处理，避免下划线开头的文件被忽略。

### 方式二：学校 / 学院服务器（后续迁移）

把整个目录上传到分配到的目录（如 `ai.whut.edu.cn/ai4mat/`）即可，无需任何构建步骤。
校园域名已完成备案，迁移后建议同步更新 `robots.txt` 与 `sitemap.xml` 中的地址。

### 其他

- 无需 Node.js、无需构建流程，也没有任何第三方依赖（无外部字体、无 CDN 请求）。
- 使用虚拟主机（如阿里云 OSS、腾讯云 COS 静态托管）同样上传整个目录即可；
  但绑定自己的域名需要先完成 ICP 备案。

## 搜索引擎收录（SEO）

### 站点侧已完成的配置

- `title` / `description` / `keywords`，页面语言 `lang="zh-CN"`
- `rel="canonical"`、`og:*`（含 1200×630 分享封面 `assets/img/og-cover.png`）、`twitter:card`
- **结构化数据（JSON-LD）**：把实验室作为 `Organization`、两位老师作为 `Person`、
  站点作为 `WebSite` 声明，并列出 `knowsAbout`（研究方向关键词）与官方主页链接
- `robots.txt` + `sitemap.xml`（已指向真实站点地址）、`404.html`、`.nojekyll`
- 语义化标题层级、移动端自适应、无外部依赖（首屏快，利于抓取与评分）

### 需要人工提交的部分

收录与否最终取决于搜索引擎，以下三步需要自己操作（都需要相应账号）：

1. **Google Search Console**（<https://search.google.com/search-console>）
   添加资源 `https://wut-ai4mat.github.io/`，用「HTML 标记」或「HTML 文件」方式验证，
   验证后提交 `https://wut-ai4mat.github.io/sitemap.xml`。
2. **Bing Webmaster Tools**（<https://www.bing.com/webmasters>）
   可直接从 Google Search Console 导入站点与站点地图。
3. **百度搜索资源平台**（<https://ziyuan.baidu.com>）
   同样需要验证后提交 sitemap。注意：百度对 `github.io` 的收录历来很慢且不稳定，
   建议等站点迁到学校域名（`whut.edu.cn` 三级域名或子目录）后再重点提交。

### 提升排名最有效的一件事：外部链接

搜索引擎判断新站点权重的核心是「有多少可信站点链接到你」。建议按性价比顺序推进：

1. **学院/学校官网**：请人工智能学院、物理与力学学院在教师页或实验室页加上本站链接
   （学校域名的外链权重远高于普通站点）
2. **两位老师的个人主页**：学院主页、材料学院导师页的"个人网站"字段填本站在地址
3. **GitHub 仓库首页**：仓库右上角 About 的 Website 填 `https://wut-ai4mat.github.io/`，
   Topics 填 `ai-for-materials`、`materials-informatics`、`large-language-models`、`battery` 等
4. **论文与学术主页**：新论文的 arXiv/期刊页面、Google Scholar 个人主页、
   会议报告 PPT 的尾页附上本站地址
5. **迁移到学校域名后**：把 `robots.txt`、`sitemap.xml`、canonical 与 og:url 换成新地址，
   并在旧地址保留跳转说明

### 如何检查收录情况

- 在 Google / Bing 搜索 `site:wut-ai4mat.github.io`，有结果即已被收录
- 直接搜索 `WUT-AI4Mat`、`武汉理工大学 AI4Mat 实验室`、`袁景凌 罗雯 实验室` 等关键词看排名
- 结构化数据可用 <https://search.google.com/test/rich-results> 校验

新站点的收录通常需要数天到数周，且需要外部链接才能稳定获得排名，属于正常现象。

## 无障碍与兼容

- 语义化结构、图片 `alt`、键盘可达的导航与筛选按钮。
- 支持 `prefers-reduced-motion`，对减少动效的用户关闭进场动画。
- 已在 1440px 桌面端与 390px 移动端验证：无横向溢出、无脚本报错。

## 待补充

1. 研究生团队成员名单（`MEMBERS`）。
2. 如需更完整的论文列表，可按需继续补充 `PUBLICATIONS`（当前收录 60 篇代表性成果）。
3. 实验室英文名称如需统一表述，可修改 `SITE` 与页脚文案。
