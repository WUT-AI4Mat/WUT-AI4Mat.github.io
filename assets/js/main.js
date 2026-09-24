/* ============================================================
   WUT-AI4Mat Lab · 交互脚本
   依赖 data.js 中的 SITE / FACULTY / MEMBERS / PUBLICATIONS /
   PROJECTS / PATENTS
   ============================================================ */
(function () {
  "use strict";

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.prototype.slice.call((root || document).querySelectorAll(sel));

  /* ---------------- 工具函数 ---------------- */

  // 转义 HTML，避免内容中的特殊字符破坏结构
  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // 标注实验室两位负责人
  function markAuthors(text) {
    return esc(text).replace(
      /(Jingling Yuan|Wen Luo|袁景凌|罗雯)(\*)?/g,
      '<b class="wlut">$1$2</b>'
    );
  }

  function scholarUrl(title) {
    return "https://scholar.google.com/scholar?q=" + encodeURIComponent(title);
  }

  /* ---------------- 学术带头人 ---------------- */

  function renderFaculty() {
    const box = $("#facultyGrid");
    if (!box || typeof FACULTY === "undefined") return;

    box.innerHTML = FACULTY.map(function (p) {
      const links = p.links
        .map(function (l) {
          const ext = /^https?:/.test(l.url) ? ' target="_blank" rel="noopener"' : "";
          return '<a href="' + esc(l.url) + '"' + ext + ">" + esc(l.text) + "</a>";
        })
        .join("");

      return (
        '<article class="faculty-card reveal">' +
          '<div class="faculty-photo">' +
            '<img src="' + esc(p.photo) + '" alt="' + esc(p.name) + "老师照片" +
              '" loading="lazy" width="270" height="360" />' +
          "</div>" +
          '<div class="faculty-body">' +
            '<div class="faculty-name"><h3>' + esc(p.name) + "</h3><span>" + esc(p.en) + "</span></div>" +
            '<p class="faculty-role">' + esc(p.role) + " · " + esc(p.org) + "</p>" +
            '<ul class="faculty-tags">' +
              p.tags.map((t) => "<li>" + esc(t) + "</li>").join("") +
            "</ul>" +
            '<p class="faculty-bio">' + esc(p.bio) + "</p>" +
            '<div class="faculty-links">' + links + "</div>" +
          "</div>" +
        "</article>"
      );
    }).join("");
  }

  /* ---------------- 研究生团队 ---------------- */

  function renderMembers() {
    const box = $("#membersGrid");
    if (!box || typeof MEMBERS === "undefined") return;

    if (!MEMBERS.length) {
      box.innerHTML =
        '<div class="member-placeholder">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">' +
            '<circle cx="9" cy="8" r="3.2" /><path d="M2.8 19.2c0-3.2 2.8-5.2 6.2-5.2s6.2 2 6.2 5.2" />' +
            '<path d="M16.4 6.2a3 3 0 0 1 0 5.9M17.6 13.9c2.3.5 3.8 2.2 3.8 5.3" />' +
          "</svg>" +
          "<span>在读博士、硕士研究生名单持续更新中——欢迎感兴趣的本科生、研究生加入课题组。</span>" +
        "</div>";
      return;
    }

    box.innerHTML = MEMBERS.map(function (m) {
      return (
        '<article class="member-card">' +
          "<h4>" + esc(m.name) + (m.en ? ' <span style="font-size:.8rem;color:var(--muted)">' + esc(m.en) + "</span>" : "") + "</h4>" +
          "<p>" + esc(m.grade || "") + "</p>" +
          "<p>" + esc(m.topic || "") + "</p>" +
        "</article>"
      );
    }).join("");
  }

  /* ---------------- 科研项目 ---------------- */

  function renderProjects() {
    const box = $("#projectsGrid");
    if (!box || typeof PROJECTS === "undefined") return;

    box.innerHTML = PROJECTS.map(function (p) {
      return (
        '<article class="project-card reveal">' +
          '<p class="project-period">' + esc(p.period) + "</p>" +
          '<h3 class="project-title">' + esc(p.title) + "</h3>" +
          '<div class="project-meta">' +
            '<span class="project-kind">' + esc(p.kind) + "</span>" +
            '<span class="project-role">' + esc(p.role) + "</span>" +
            '<span class="project-owner">' + esc(p.owner) + "</span>" +
          "</div>" +
        "</article>"
      );
    }).join("");
  }

  /* ---------------- 专利与著作 ---------------- */

  function renderPatents() {
    const box = $("#patentsBlock");
    if (!box || typeof PATENTS === "undefined") return;

    const rows = PATENTS.patents
      .map(function (p) {
        return (
          "<li>" +
            '<span class="patent-title">' + esc(p.title) + "</span>" +
            '<span class="patent-meta">' + esc(p.no) + " · " + esc(p.theme) + "</span>" +
          "</li>"
        );
      })
      .join("");

    const books = PATENTS.books.map((b) => "<li>" + esc(b) + "</li>").join("");

    box.innerHTML =
      '<div class="patents-grid">' +
        '<div class="patents-col reveal">' +
          '<h3>代表发明专利</h3>' +
          '<ul class="patent-list">' + rows + "</ul>" +
          '<p class="patents-note">团队累计获国家发明专利 28 项，其中多项已完成成果转化。</p>' +
        "</div>" +
        '<div class="patents-col reveal">' +
          "<h3>著作与标准</h3>" +
          '<ul class="patent-list patent-list-plain">' + books + "</ul>" +
        "</div>" +
      "</div>";
  }

  /* ---------------- 论文列表 ---------------- */

  const PUB_LIMIT = 12;
  let currentTheme = "featured";
  let pubExpanded = false;

  function renderFilters() {
    const box = $("#pubFilters");
    if (!box || typeof THEMES === "undefined") return;

    box.innerHTML = THEMES.map(function (t) {
      const pressed = t.key === currentTheme ? "true" : "false";
      return (
        '<button class="chip" type="button" data-theme="' + esc(t.key) +
        '" aria-pressed="' + pressed + '">' + esc(t.label) + "</button>"
      );
    }).join("");

    box.addEventListener("click", function (e) {
      const btn = e.target.closest(".chip");
      if (!btn) return;
      currentTheme = btn.dataset.theme;
      pubExpanded = false;
      $$(".chip", box).forEach(function (c) {
        c.setAttribute("aria-pressed", c === btn ? "true" : "false");
      });
      renderPublications();
    });
  }

  function filteredPubs() {
    if (currentTheme === "all") return PUBLICATIONS.slice();
    if (currentTheme === "featured") {
      return PUBLICATIONS.filter((p) => p.featured);
    }
    return PUBLICATIONS.filter((p) => (p.themes || []).indexOf(currentTheme) !== -1);
  }

  function renderPublications() {
    const box = $("#pubList");
    const toggle = $("#pubToggle");
    if (!box || typeof PUBLICATIONS === "undefined") return;

    const list = filteredPubs();
    const visible = pubExpanded ? list : list.slice(0, PUB_LIMIT);

    if (!visible.length) {
      box.innerHTML = '<p class="pub-empty">该方向暂无收录条目。</p>';
      if (toggle) toggle.hidden = true;
      return;
    }

    // 按年份分组
    const groups = [];
    visible.forEach(function (p) {
      let g = groups[groups.length - 1];
      if (!g || g.year !== p.y) {
        g = { year: p.y, items: [] };
        groups.push(g);
      }
      g.items.push(p);
    });

    box.innerHTML = groups
      .map(function (g) {
        const items = g.items
          .map(function (p) {
            const tags = (p.themes || [])
              .map(function (k) {
                const label = (typeof THEME_LABEL !== "undefined" && THEME_LABEL[k]) || k;
                return "<li>" + esc(label) + "</li>";
              })
              .join("");

            return (
              '<article class="pub-item' + (p.featured ? " is-featured" : "") + '">' +
                "<div>" +
                  '<h3 class="pub-title">' + esc(p.title) + "</h3>" +
                  '<p class="pub-authors">' + markAuthors(p.authors) + "</p>" +
                  '<p class="pub-venue"><em>' + esc(p.venue) + "</em></p>" +
                "</div>" +
                '<div class="pub-side">' +
                  '<span class="badge badge-' + esc(p.badgeType || "b") + '">' + esc(p.badge || "") + "</span>" +
                  '<ul class="pub-tags">' + tags + "</ul>" +
                  '<a class="pub-link" href="' + esc(p.link || scholarUrl(p.title)) +
                    '" target="_blank" rel="noopener">查看全文</a>' +
                "</div>" +
              "</article>"
            );
          })
          .join("");

        return (
          '<section class="pub-year">' +
            '<header class="pub-year-head"><span>' + g.year + "</span><i></i></header>" +
            items +
          "</section>"
        );
      })
      .join("");

    if (toggle) {
      const hasMore = list.length > PUB_LIMIT;
      toggle.hidden = !hasMore;
      toggle.textContent = pubExpanded
        ? "收起列表"
        : "展开全部 " + list.length + " 篇";
      toggle.setAttribute("aria-expanded", pubExpanded ? "true" : "false");
    }
  }

  function initPubToggle() {
    const toggle = $("#pubToggle");
    if (!toggle) return;
    toggle.addEventListener("click", function () {
      pubExpanded = !pubExpanded;
      renderPublications();
      if (!pubExpanded) {
        const anchor = $("#publications");
        if (anchor) anchor.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  /* ---------------- 导航 ---------------- */

  function initNav() {
    const toggle = $("#navToggle");
    const nav = $("#primaryNav");
    const header = $("#siteHeader");

    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        const open = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        toggle.setAttribute("aria-label", open ? "关闭导航菜单" : "打开导航菜单");
      });
      $$("a", nav).forEach(function (a) {
        a.addEventListener("click", function () {
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
      window.addEventListener("resize", function () {
        if (window.innerWidth > 860) {
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    }

    // 滚动状态 + 返回顶部
    const toTop = $("#toTop");
    const sectionIds = ["about", "research", "team", "publications", "projects", "contact"];
    const links = {};
    $$(".primary-nav a").forEach(function (a) {
      const id = (a.getAttribute("href") || "").replace("#", "");
      if (id) links[id] = a;
    });

    let ticking = false;
    function onScroll() {
      const y = window.scrollY || window.pageYOffset;
      if (header) header.classList.toggle("is-stuck", y > 8);
      if (toTop) toTop.hidden = y < 700;

      // scrollspy
      let active = "";
      sectionIds.forEach(function (id) {
        const el = document.getElementById(id);
        if (!el) return;
        if (el.getBoundingClientRect().top <= 140) active = id;
      });
      Object.keys(links).forEach(function (id) {
        links[id].classList.toggle("is-active", id === active);
      });
      ticking = false;
    }
    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(onScroll);
        }
      },
      { passive: true }
    );
    onScroll();

    if (toTop) {
      toTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }

  /* ---------------- 滚动进入动画 ---------------- */

  function initReveal() {
    const items = $$(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window) ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const siblings = Array.prototype.slice.call(el.parentElement.children).filter((n) =>
            n.classList.contains("reveal")
          );
          const idx = siblings.indexOf(el);
          el.style.transitionDelay = Math.min(idx, 5) * 70 + "ms";
          el.classList.add("is-visible");
          io.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    items.forEach((el) => io.observe(el));
  }

  /* ---------------- 根据数据计算统计数字（可选覆盖） ---------------- */

  function syncStats() {
    const stats = $$(".hero-stats div");
    if (!stats.length || typeof SITE === "undefined" || !SITE.stats) return;
    SITE.stats.forEach(function (s, i) {
      if (!stats[i]) return;
      stats[i].innerHTML =
        "<dt>" + esc(s.value) +
        (s.suffix ? "<span>" + esc(s.suffix) + "</span>" : "") +
        "</dt><dd>" + esc(s.label) + "</dd>";
    });
  }

  /* ---------------- 启动 ---------------- */

  document.addEventListener("DOMContentLoaded", function () {
    renderFaculty();
    renderMembers();
    renderProjects();
    renderPatents();
    renderFilters();
    renderPublications();
    initPubToggle();
    initNav();
    syncStats();
    initReveal();

    const year = $("#year");
    if (year) year.textContent = new Date().getFullYear();
  });
})();
