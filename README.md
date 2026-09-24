# WUT-AI4Mat 实验室网站

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

### 方式一：GitHub Pages（当前使用）

- 账号：<https://github.com/WUT-AI4Mat>
- 仓库：`WUT-AI4Mat.github.io`
- 远程地址：`https://github.com/WUT-AI4Mat/WUT-AI4Mat.github.io.git`
- 站点地址：<https://wut-ai4mat.github.io/>

仓库命名为 `WUT-AI4Mat.github.io` 的好处是站点直接发布在 `https://wut-ai4mat.github.io/` 根目录，
不带子路径。若改用其他仓库名，站点地址会变成 `https://wut-ai4mat.github.io/<仓库名>/`，
届时需要同步修改 `robots.txt` 与 `sitemap.xml` 中的地址。

本地仓库已初始化、远程已配置并完成首次提交。在 GitHub 上创建同名仓库后，推送即可：

```powershell
# 第 1 步：在 https://github.com/organizations/WUT-AI4Mat/repositories/new 新建仓库
#         名称填 WUT-AI4Mat.github.io，可见性选 Public，不要勾选任何初始化选项

# 第 2 步：推送
cd C:\Users\zhang\codex_workspace\WUT_AI4Mat
git push -u origin main
```

> 本机经直连无法访问 github.com（443 端口被阻断），因此仓库中已配置
> 仓库级代理 `http.proxy = http://127.0.0.1:7890`（对应系统里已开启的代理软件）。
> 如果代理软件换了端口或停用，可用 `git config --unset http.proxy` 与
> `git config --unset https.proxy` 取消，再自行按需调整。

推送后会弹出登录窗口，需要一个有该仓库写权限的 **Personal Access Token**（GitHub 已不支持用账号密码推送）。
推送成功后进入仓库 Settings → Pages，Source 选 `Deploy from a branch`，
分支选 `main`、目录选 `/ (root)`，保存后约 1 分钟即可访问。

注意两点：

1. GitHub Pages 免费版要求仓库为 **Public**，仓库内容对外可见（网站本身也是公开的）。
2. 组织账号需在组织设置中允许使用 GitHub Pages。

仓库中的 `.nojekyll` 用于关闭 GitHub Pages 的 Jekyll 处理，避免下划线开头的文件被忽略。

### 方式二：学校 / 学院服务器（后续迁移）

把整个目录上传到分配到的目录（如 `ai.whut.edu.cn/ai4mat/`）即可，无需任何构建步骤。
校园域名已完成备案，迁移后建议同步更新 `robots.txt` 与 `sitemap.xml` 中的地址。

### 其他

- 无需 Node.js、无需构建流程，也没有任何第三方依赖（无外部字体、无 CDN 请求）。
- 使用虚拟主机（如阿里云 OSS、腾讯云 COS 静态托管）同样上传整个目录即可；
  但绑定自己的域名需要先完成 ICP 备案。

## 无障碍与兼容

- 语义化结构、图片 `alt`、键盘可达的导航与筛选按钮。
- 支持 `prefers-reduced-motion`，对减少动效的用户关闭进场动画。
- 已在 1440px 桌面端与 390px 移动端验证：无横向溢出、无脚本报错。

## 待补充

1. 研究生团队成员名单（`MEMBERS`）。
2. 如需更完整的论文列表，可按需继续补充 `PUBLICATIONS`（当前收录 60 篇代表性成果）。
3. 实验室英文名称如需统一表述，可修改 `SITE` 与页脚文案。
