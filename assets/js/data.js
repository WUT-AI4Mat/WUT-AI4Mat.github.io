/* ============================================================
   WUT-AI4Mat Lab · 内容数据
   ------------------------------------------------------------
   本文件集中存放站点中「可维护」的内容：
     - SITE      站点级信息（实验室名称、统计数字）
     - FACULTY   学术带头人
     - MEMBERS   研究生团队成员（按需增补）
     - PUBLICATIONS 论文（featured = 是否进入「WUT-AI4Mat 精选」）
     - PROJECTS  科研项目
     - PATENTS   代表专利与著作
   修改本文件即可更新网站，无需改动页面结构。
   ============================================================ */

const SITE = {
  name: "WUT-AI4Mat Lab",
  nameCN: "武汉理工大学 WUT-AI4Mat 实验室",
  tagline: "人工智能驱动的材料科学研究",
  stats: [
    { value: "2", suffix: "", label: "学术带头人" },
    { value: "5", suffix: "", label: "核心研究方向" },
    { value: "160", suffix: "+", label: "学术论文" },
    { value: "11,000", suffix: "+", label: "论文被引" }
  ]
};

/* ---------- 研究方向标签（同时用于论文筛选） ---------- */
const THEMES = [
  { key: "featured", label: "WUT-AI4Mat 精选" },
  { key: "all", label: "全部成果" },
  { key: "llm", label: "材料大模型" },
  { key: "mol", label: "分子与材料学习" },
  { key: "char", label: "智能表征" },
  { key: "battery", label: "电池与器件" },
  { key: "device", label: "类脑与智能器件" },
  { key: "eff", label: "高效计算" },
  { key: "ml", label: "机器学习方法" }
];

const THEME_LABEL = {
  llm: "材料大模型",
  mol: "分子与材料学习",
  char: "智能表征",
  battery: "电池与器件",
  device: "类脑与智能器件",
  eff: "高效计算",
  ml: "机器学习方法"
};

/* ---------- 学术带头人 ---------- */
const FACULTY = [
  {
    name: "袁景凌",
    en: "Jingling YUAN",
    role: "教授 · 博士生导师",
    org: "人工智能学院",
    photo: "assets/img/yuan-jingling.png",
    tags: ["机器学习", "绿色计算", "边缘智能", "AI4Science"],
    bio:
      "武汉理工大学人工智能学院教授、博士生导师，交通物联网技术湖北省重点实验室主任，" +
      "CCF 杰出会员、CCF 体系结构专委会委员，湖北省计算机学会理事/副秘书长。主要研究兴趣包括机器学习、" +
      "绿色计算、边缘智能与 AI4Science，近年重点推进大模型与图学习在材料与化学领域的落地。" +
      "在 ICML、AAAI、KDD、IJCAI、ICCV/ECCV、ACM MM 及 TC、TMM、TMC、TNNLS、TACL 等会议与期刊发表论文 80 余篇，" +
      "获国家发明专利 25 项，编写专著教材 10 余本，主持国家自然科学基金等项目，成果获教育部科学研究优秀成果二等奖、" +
      "湖北省自然科学二等奖、中国发明协会创新成果一等奖等。",
    links: [
      { text: "学院主页", url: "https://ai.whut.edu.cn/szdw/jsml/202509/t20250919_1349796.shtml" },
      { text: "Google Scholar", url: "https://scholar.google.com/citations?user=0k0SnZkAAAAJ&hl=en" },
      { text: "yuanjingling@126.com", url: "mailto:yuanjingling@126.com" }
    ]
  },
  {
    name: "罗雯",
    en: "Wen LUO",
    role: "特岗教授 · 博士生导师",
    org: "理学院物理系",
    photo: "assets/img/luo-wen.jpg",
    tags: ["电化学储能材料", "微纳器件物理", "原位表征技术"],
    bio:
      "武汉理工大学理学院物理系特岗教授、博士生导师，第七届中国科协青年人才托举工程入选者，" +
      "武汉理工大学青年拔尖人才（第二层次）。主要研究方向为电化学储能材料、微纳器件物理与原位表征技术，" +
      "聚焦二维金属烯微纳器件的原位监测、电化学析氢增强机理与储能电池复杂界面的多维表征调控。" +
      "主持国家自然科学基金面上、青年项目及湖北省自然科学基金项目，承担国家重大科研仪器项目子任务、" +
      "国家重点研发计划子任务，在 Advanced Materials、Advanced Energy Materials、ACS Energy Letters 等期刊发表论文，" +
      "2 篇入选高被引论文，h-index 52。指导学生获“挑战杯”全国特等奖、银奖等。",
    links: [
      { text: "理学院主页", url: "http://ssci.whut.edu.cn/szdw/zrjs/202309/t20230921_939697.shtml" },
      { text: "材料学院导师页", url: "http://smse.whut.edu.cn/yjspy/dsdw/202311/t20231126_969506.shtml" },
      { text: "Google Scholar", url: "https://scholar.google.com/citations?user=D9qoVOoAAAAJ&hl=en" },
      { text: "luowen_1991@whut.edu.cn", url: "mailto:luowen_1991@whut.edu.cn" }
    ]
  }
];

/* ---------- 研究生团队成员 ----------
   在下面的数组中补充成员即可，例如：
   { name: "张三", en: "San Zhang", grade: "2024 级博士研究生",
     topic: "材料科学文本挖掘与知识抽取", email: "zhangsan@whut.edu.cn" }
   数组为空时，页面会显示「成员名单持续更新中」的提示卡片。
--------------------------------------------- */
const MEMBERS = [];

/* ---------- 论文 ----------
   y 年份 | title 标题 | authors 作者（可用 * 标注通讯作者）
   venue 发表载体 | badge 标注 | themes 方向标签 | featured 是否精选
   link 可留空，留空时自动生成 Google Scholar 检索链接
------------------------------------------------------------- */
const PUBLICATIONS = [
  // ===== 2026 =====
  {
    y: 2026,
    title: "Advancing battery failure diagnosis by knowledge-augmented large language models",
    authors: "Xin Zhang, Jingling Yuan*, Lin Li, Zhaohui Deng, Jinqiao Du, Wen Luo*, Liqiang Mai*",
    venue: "National Science Review, 2026, 13(14)",
    badge: "IF 18.1 · 中科院一区",
    badgeType: "q",
    themes: ["battery", "llm"],
    featured: true
  },
  {
    y: 2026,
    title: "A highly robust MoS2-xOδ volatile memtransistor array for reservoir computing",
    authors: "Weiqi Deng, Xinyue Yan, Daihong Tang, Wei Yin, Hui Xu, Hong Zhang, Ru Su, Wen Luo*",
    venue: "Nano Letters, 2026, 26(32): 10882-10890",
    badge: "中科院一区",
    badgeType: "q",
    themes: ["device", "eff"],
    featured: true
  },
  {
    y: 2026,
    title: "All-in-one sensing-memory-computing system based on a self-powered MoS2 P-N homojunction transistor",
    authors: "Weiqi Deng, Xinyue Yan, Hui Xu, et al., Jun Wu, Wen Luo*",
    venue: "Advanced Functional Materials, 2026: e75864",
    badge: "中科院一区",
    badgeType: "q",
    themes: ["device", "eff"],
    featured: true
  },
  {
    y: 2026,
    title: "Representational alignment with chemical induced fit for molecular relational learning",
    authors: "Peiliang Zhang, Jingling Yuan*, et al.",
    venue: "KDD 2026",
    badge: "CCF A",
    badgeType: "a",
    themes: ["mol"],
    featured: true
  },
  {
    y: 2026,
    title: "Cross-domain molecular relational learning: leveraging chemical structure-activity analysis",
    authors: "Peiliang Zhang, Jingling Yuan*, et al.",
    venue: "KDD 2026",
    badge: "CCF A",
    badgeType: "a",
    themes: ["mol"],
    featured: true
  },
  {
    y: 2026,
    title: "Forget by uncertainty: orthogonal entropy unlearning for quantized neural networks",
    authors: "Tian Zhang, Yujia Tong, Junhao Dong, Ke Xu, Yuze Wang, Jingling Yuan*",
    venue: "ICML 2026",
    badge: "CCF A",
    badgeType: "a",
    themes: ["eff"],
    featured: true
  },
  {
    y: 2026,
    title: "Prototype learning with structural-semantic alignment for interpretable molecular relational learning",
    authors: "Peiliang Zhang, Jingling Yuan, et al.",
    venue: "Knowledge-Based Systems, 2026: 115460",
    badge: "中科院一区",
    badgeType: "q",
    themes: ["mol"],
    featured: true
  },
  {
    y: 2026,
    title: "Venom: liquid diffusion-guided gradient inversion for breaking differential privacy in federated learning",
    authors: "Bin Hu, Jingling Yuan*, et al.",
    venue: "AAAI 2026",
    badge: "CCF A",
    badgeType: "a",
    themes: ["ml"],
    featured: false
  },
  {
    y: 2026,
    title: "Efficiently enhancing long-term series forecasting via adaptive lookback with wavelets",
    authors: "Suxin Tong, Jingling Yuan*",
    venue: "AAAI 2026",
    badge: "CCF A",
    badgeType: "a",
    themes: ["ml"],
    featured: false
  },
  {
    y: 2026,
    title: "Heaven-sent or hell-bent? Benchmarking the intelligence and defectiveness of LLM hallucinations",
    authors: "Chengxu Yang, Jingling Yuan*, et al.",
    venue: "KDD 2026",
    badge: "CCF A",
    badgeType: "a",
    themes: ["ml"],
    featured: false
  },
  {
    y: 2026,
    title: "Enhancing quantization-aware training on edge devices via relative entropy coreset selection and cascaded layer correction",
    authors: "Yujia Tong, Jingling Yuan*, et al.",
    venue: "IEEE Transactions on Mobile Computing (TMC), 2026",
    badge: "CCF A · 中科院一区",
    badgeType: "a",
    themes: ["eff"],
    featured: false
  },
  {
    y: 2026,
    title: "Function-as-a-service empowered edge-cloud analytics system for short video platforms",
    authors: "Yaxin Li, Kaiwei Lin, Jingling Yuan*, Chuang Hu",
    venue: "IEEE Transactions on Computers (TC), 2026",
    badge: "CCF A",
    badgeType: "a",
    themes: ["eff"],
    featured: false
  },
  {
    y: 2026,
    title: "Core-aware contrastive learning with substructure adaptivity for stable drug-drug interaction event prediction",
    authors: "Peiliang Zhang, Jijun Wang, Jingling Yuan*, et al.",
    venue: "IEEE Transactions on Consumer Electronics, 2026",
    badge: "中科院一区",
    badgeType: "q",
    themes: ["mol"],
    featured: false
  },
  {
    y: 2026,
    title: "Directly training on quantized model via gradient scale correction for edge devices",
    authors: "Dewang Zhang, Jingling Yuan*, et al.",
    venue: "Neural Networks, 2026: 109266",
    badge: "中科院一区",
    badgeType: "q",
    themes: ["eff"],
    featured: false
  },
  {
    y: 2026,
    title: "Mitigating hallucination in multimodal large language models via cross-layer visual anchors",
    authors: "Chengxu Yang, Siqi Cai, Jingling Yuan*, et al.",
    venue: "Pattern Recognition, 2026: 114380",
    badge: "中科院一区",
    badgeType: "q",
    themes: ["ml"],
    featured: false
  },

  // ===== 2025 =====
  {
    y: 2025,
    title: "Zero-shot learning for materials science texts: leveraging duck typing principles",
    authors: "Xin Zhang, Peiliang Zhang, Jingling Yuan*, Lin Li",
    venue: "AAAI 2025",
    badge: "CCF A",
    badgeType: "a",
    themes: ["llm"],
    featured: true
  },
  {
    y: 2025,
    title: "Active knowledge structuring for large language models in materials science text mining",
    authors: "Xin Zhang, Jingling Yuan*, Peiliang Zhang, Jia Liu, Lin Li",
    venue: "Transactions of the ACL (TACL), 2025",
    badge: "JCR Q1 · 中科院二区",
    badgeType: "q",
    themes: ["llm"],
    featured: true
  },
  {
    y: 2025,
    title: "Subgraph information bottleneck with causal dependency for stable molecular relational learning",
    authors: "Peiliang Zhang, Jingling Yuan*, et al.",
    venue: "IJCAI 2025",
    badge: "CCF A",
    badgeType: "a",
    themes: ["mol"],
    featured: true
  },
  {
    y: 2025,
    title: "Robust machine unlearning for quantized neural networks via adaptive gradient reweighting with similar labels",
    authors: "Yujia Tong, Yuze Wang, Jingling Yuan*, Chuang Hu",
    venue: "ICCV 2025",
    badge: "CCF A",
    badgeType: "a",
    themes: ["eff"],
    featured: true
  },
  {
    y: 2025,
    title: "Sparse mixture of Mambas for domain generalized atomic electron tomography augmentation",
    authors: "Yang Yu, Jingling Yuan*, Xian Zhong, Qihao Zhao, Wen Luo, Liqiang Mai",
    venue: "IEEE TNNLS, 2025",
    badge: "CCF A",
    badgeType: "a",
    themes: ["char"],
    featured: true
  },
  {
    y: 2025,
    title: "Linearly programmable oxygen-doped MoS2 memtransistor for neuromorphic computing",
    authors: "Weiqi Deng, Yang Yu, Xinyue Yan, Liu Wang, Nian Yu, Xing Liao, Wen Luo*, Jun Wu",
    venue: "ACS Nano, 2025, 19(30): 27526-27537",
    badge: "中科院一区",
    badgeType: "q",
    themes: ["device", "eff"],
    featured: true
  },
  {
    y: 2025,
    title: "Ultra-high switching ratio memtransistor based on van der Waals heterostructures toward neuromorphic computing",
    authors: "Weiqi Deng, Yang Yu, Xinyue Yan, Yuxuan Li, Liu Wang, Jun Wu, Jean-Jacques Gaumet, Wen Luo*",
    venue: "Energy & Environmental Materials, 2025, 8(6): e70075",
    badge: "中科院一区",
    badgeType: "q",
    themes: ["device"],
    featured: false
  },
  {
    y: 2025,
    title: "Low-power reconfigurable MoS2/MoTe2 optoelectronic synapse for visual recognition",
    authors: "Xinyue Yan, Weiqi Deng, Nian Yu, Jun Wu, Xin Zhang, Wen Luo*",
    venue: "Nano Research, 2025, 18: 94907741",
    badge: "中科院一区",
    badgeType: "q",
    themes: ["device"],
    featured: false
  },
  {
    y: 2025,
    title: "Prompt-Ladder: memory-efficient prompt tuning for vision-language models on edge devices",
    authors: "Siqi Cai, Xuan Liu, Jingling Yuan*, Qihua Zhou",
    venue: "Pattern Recognition, 2025",
    badge: "中科院一区",
    badgeType: "q",
    themes: ["eff"],
    featured: false
  },
  {
    y: 2025,
    title: "PAREformer: positional adaptive and recurrent enhanced transformer for time series forecasting",
    authors: "Suxin Tong, Jingling Yuan*",
    venue: "Information Fusion, 2025: 103967",
    badge: "中科院一区 · IF 17.4",
    badgeType: "q",
    themes: ["ml"],
    featured: false
  },
  {
    y: 2025,
    title: "Efficiently enhancing long-term series forecasting via ultra-long lookback windows",
    authors: "Suxin Tong, Jingling Yuan*",
    venue: "AAAI 2025",
    badge: "CCF A",
    badgeType: "a",
    themes: ["ml"],
    featured: false
  },
  {
    y: 2025,
    title: "Data-free quantization of vision transformers via easy-to-hard synthesis and activation correction",
    authors: "Yujia Tong, Jingling Yuan, Tian Zhang, et al.",
    venue: "ACM TOMM, 2025",
    badge: "中科院二区",
    badgeType: "b",
    themes: ["eff"],
    featured: false
  },
  {
    y: 2025,
    title: "Toward inference latency optimization for scalable collaborative multi-UAV analytics",
    authors: "Ying Wang, Jingling Yuan, Wenbo Wu, et al.",
    venue: "IEEE Transactions on Green Communications and Networking, 2025",
    badge: "中科院二区",
    badgeType: "b",
    themes: ["eff"],
    featured: false
  },
  {
    y: 2025,
    title: "Towards the explanation consistency of citizen groups in happiness prediction via factor decorrelation",
    authors: "Xin Wu, Lin Li, Xiaohui Tao, Jingling Yuan, Haoran Xie",
    venue: "IEEE Transactions on Emerging Topics in Computational Intelligence, 2025",
    badge: "机器学习方法",
    badgeType: "b",
    themes: ["ml"],
    featured: false
  },
  {
    y: 2025,
    title: "时频域差分熵增强的多线图稳定聚类",
    authors: "赵启轩, 袁景凌*, 张鑫, 俞洋, 李琳",
    venue: "控制与决策, 2025",
    badge: "中文核心",
    badgeType: "b",
    themes: ["ml"],
    featured: false
  },

  // ===== 2024 =====
  {
    y: 2024,
    title: "Key substructure learning with chemical intuition for material property prediction",
    authors: "Peiliang Zhang, Jingling Yuan*, Lin Li, Wen Luo, Jian Hu, Xin Li",
    venue: "DASFAA 2024",
    badge: "CCF B",
    badgeType: "b",
    themes: ["mol"],
    featured: true
  },
  {
    y: 2024,
    title: "Two-dimensional materials based memtransistors: integration strategies, switching mechanisms and advanced characterizations",
    authors: "Weiqi Deng, Xinyue Yan, Liu Wang, Nian Yu, Wen Luo*, Liqiang Mai*",
    venue: "Nano Energy, 2024, 128: 109861",
    badge: "中科院一区",
    badgeType: "q",
    themes: ["device"],
    featured: false
  },
  {
    y: 2024,
    title: "Ensemble cross UNet transformers for augmentation of atomic electron tomography",
    authors: "Yang Yu, Jingling Yuan*, Liang Liao, et al.",
    venue: "IEEE Transactions on Instrumentation and Measurement, 2024",
    badge: "中科院二区 · JCR Q1",
    badgeType: "q",
    themes: ["char"],
    featured: true
  },
  {
    y: 2024,
    title: "NCH-DDA: neighborhood contrastive learning heterogeneous network for drug-disease association prediction",
    authors: "Peiliang Zhang, Chao Che, Bo Jin, Jingling Yuan, Ruiying Li, Yongjun Zhu",
    venue: "Expert Systems with Applications, 2024",
    badge: "机器/生物信息学",
    badgeType: "b",
    themes: ["mol"],
    featured: false
  },
  {
    y: 2024,
    title: "DenseTrack: drone-based crowd tracking via density-aware motion-appearance synergy",
    authors: "Yi Lei, Huilin Zhu, Jingling Yuan*, et al.",
    venue: "ACM MM 2024",
    badge: "CCF A",
    badgeType: "a",
    themes: ["ml"],
    featured: false
  },
  {
    y: 2024,
    title: "Fine-grained similarity mining for domain-adaptive crowd counting",
    authors: "Huilin Zhu, Jingling Yuan*, Xian Zhong*, et al.",
    venue: "IEEE Transactions on Multimedia (TMM), 2024",
    badge: "中科院一区",
    badgeType: "q",
    themes: ["ml"],
    featured: false
  },
  {
    y: 2024,
    title: "Zero-shot object counting with good exemplars",
    authors: "Huilin Zhu, Jingling Yuan, Zhengwei Yang, et al.",
    venue: "ECCV 2024",
    badge: "CCF B",
    badgeType: "b",
    themes: ["ml"],
    featured: false
  },
  {
    y: 2024,
    title: "Legal judgment prediction via graph boosting with constraints",
    authors: "Suxin Tong, Jingling Yuan, Peiliang Zhang, Lin Li",
    venue: "Information Processing & Management, 2024",
    badge: "中科院一区",
    badgeType: "q",
    themes: ["ml"],
    featured: false
  },

  // ===== 2023 =====
  {
    y: 2023,
    title: "Ion tunnel matrix initiated oriented attachment for highly utilized Zn anodes",
    authors: "Dongming Deng, Kang Fu, Ruohan Yu, Jie Zhu, Hao Cai, Xin Zhang, Jun Wu, Wen Luo*, Liqiang Mai*",
    venue: "Advanced Materials, 2023: 2302353",
    badge: "中科院一区",
    badgeType: "q",
    themes: ["battery"],
    featured: true
  },
  {
    y: 2023,
    title: "Reducing the bias of visual objects in multimodal named entity recognition",
    authors: "Xin Zhang, Jingling Yuan, Lin Li, Jia Liu",
    venue: "WSDM 2023",
    badge: "CCF B",
    badgeType: "b",
    themes: ["llm"],
    featured: true
  },
  {
    y: 2023,
    title: "Molecular carbon skeleton with self-regulating ion-transport channels for long-life potassium ion batteries",
    authors: "Wenchao Feng, Chaoyu Pan, Hao Wang, Bo Zhang, Wen Luo*, Chao Shen, et al.",
    venue: "Energy Storage Materials, 2023, 63: 102975",
    badge: "中科院一区",
    badgeType: "q",
    themes: ["battery"],
    featured: false
  },
  {
    y: 2023,
    title: "DAOT: domain-agnostically aligned optimal transport for domain-adaptive crowd counting",
    authors: "Huilin Zhu, Jingling Yuan, Xian Zhong, et al.",
    venue: "ACM MM 2023",
    badge: "CCF A",
    badgeType: "a",
    themes: ["ml"],
    featured: false
  },
  {
    y: 2023,
    title: "ELECT: energy-efficient intelligent edge-cloud collaboration for remote IoT services",
    authors: "Jingling Yuan*, Hua Xiao, Zhishu Shen, Tao Zhang, Jianqing Jin",
    venue: "Future Generation Computer Systems, 2023, 147: 179-194",
    badge: "中科院二区 · JCR Q1",
    badgeType: "b",
    themes: ["eff"],
    featured: false
  },
  {
    y: 2023,
    title: "UPOA: a user preference based latency and energy aware intelligent offloading approach for cloud-edge systems",
    authors: "Jingling Yuan*, Yao Xiang, Yuhui Deng, et al.",
    venue: "IEEE Transactions on Cloud Computing (TCC), 2023",
    badge: "中科院二区 · JCR Q1",
    badgeType: "b",
    themes: ["eff"],
    featured: false
  },
  {
    y: 2023,
    title: "AMLFN-AD: adaptive multi-level integrated fusion attack detection framework for intelligent building systems",
    authors: "Jingling Yuan*, Nana Wang, Siqi Cai, et al.",
    venue: "Computer Networks, 2023",
    badge: "中科院二区 · JCR Q1",
    badgeType: "b",
    themes: ["eff"],
    featured: false
  },
  {
    y: 2023,
    title: "A survey of next-generation computing technologies in space-air-ground integrated networks",
    authors: "Zhishu Shen, Jianqing Jin, Cheng Tan, Atsushi Tagami, Shangguang Wang, Qi Li, Qinghua Zheng, Jingling Yuan",
    venue: "ACM Computing Surveys, 2023, 56(1): 1-40",
    badge: "中科院一区",
    badgeType: "q",
    themes: ["eff"],
    featured: false
  },
  {
    y: 2023,
    title: "基于去偏对比学习的多模态命名实体识别",
    authors: "张鑫, 袁景凌*, 李琳, 等",
    venue: "中文信息学报, 2023",
    badge: "中文核心",
    badgeType: "b",
    themes: ["llm"],
    featured: false
  },

  // ===== 2022 =====
  {
    y: 2022,
    title: "Eutectic electrolytes in advanced metal-ion batteries",
    authors: "Lingyu Geng, Xuanpeng Wang, Kang Han, Ping Hu, Liang Zhou, Yan Zhao, Wen Luo*, Liqiang Mai*",
    venue: "ACS Energy Letters, 2022, 7: 247-260",
    badge: "中科院一区",
    badgeType: "q",
    themes: ["battery"],
    featured: true
  },
  {
    y: 2022,
    title: "A strain-relaxation red phosphorus freestanding anode for non-aqueous potassium ion batteries",
    authors: "Wenchao Feng, Hao Wang, Yaxin Jiang, Bo Zhang, Wen Luo*, et al.",
    venue: "Advanced Energy Materials, 2022, 12(7): 2103343",
    badge: "中科院一区",
    badgeType: "q",
    themes: ["battery"],
    featured: false
  },
  {
    y: 2022,
    title: "Dual sulfur-doped sites boost potassium storage in carbon nanosheets derived from low-cost sulfonate",
    authors: "Zhenyu Li, Wen Luo*, Chao Wang, Wenchao Feng, Xufeng Hong, Liqiang Mai*",
    venue: "Chemical Engineering Journal, 2022, 431: 134207",
    badge: "中科院一区",
    badgeType: "q",
    themes: ["battery"],
    featured: false
  },
  {
    y: 2022,
    title: "Fine-grained fragment diffusion for cross domain crowd counting",
    authors: "Huilin Zhu, Jingling Yuan, Zhengwei Yang, et al.",
    venue: "ACM MM 2022",
    badge: "CCF A",
    badgeType: "a",
    themes: ["ml"],
    featured: false
  },
  {
    y: 2022,
    title: "异构云环境下 AHP 定权的多目标强化学习作业调度方法",
    authors: "袁景凌*, 陈旻骋, 江涛, 等",
    venue: "控制与决策, 2022",
    badge: "中文核心",
    badgeType: "b",
    themes: ["eff"],
    featured: false
  },

  // ===== 2021 =====
  {
    y: 2021,
    title: "Unveiling the role of surface P-O group in P-doped Co3O4 for electrocatalytic oxygen evolution by on-chip micro-device",
    authors: "Xin Zhou, Xiaobin Liao, Xuelei Pan, Mengyu Yan, Liang He, Pei Wu, Yan Zhao*, Wen Luo*, Liqiang Mai*",
    venue: "Nano Energy, 2021, 83: 105748",
    badge: "中科院一区",
    badgeType: "q",
    themes: ["char", "battery"],
    featured: true
  },

  // ===== 2020 =====
  {
    y: 2020,
    title: "Electrochemically exfoliating MoS2 into atomically thin planar-stacking through a selective lateral reaction pathway",
    authors: "Xuelei Pan, Mengyu Yan, Congli Sun, Kangning Zhao, Wen Luo*, Xufeng Hong, et al.",
    venue: "Advanced Functional Materials, 2020: 2007840",
    badge: "中科院一区",
    badgeType: "q",
    themes: ["battery"],
    featured: false
  },
  {
    y: 2020,
    title: "Recent advances in high-performance microbatteries: construction, application, and perspective",
    authors: "Zhiqiang Zhu, Ruohan Kan, Shuo Hu, Liang He*, Xufeng Hong, Hongtao Tang, Wen Luo*",
    venue: "Small, 2020: 2003251",
    badge: "中科院一区",
    badgeType: "q",
    themes: ["battery"],
    featured: false
  },
  {
    y: 2020,
    title: "Visible-infrared person re-identification via colorization-based siamese generative adversarial network",
    authors: "Xian Zhong, Tianyou Lu, Wenxuan Huang, Jingling Yuan, Wenxuan Liu, Chia-Wen Lin",
    venue: "ICMR 2020",
    badge: "CCF B",
    badgeType: "b",
    themes: ["ml"],
    featured: false
  },

  // ===== 2019 =====
  {
    y: 2019,
    title: "Realizing three-electron redox reactions in NASICON-structured Na3MnTi(PO4)3 for sodium-ion batteries",
    authors: "Ting Zhu, Ping Hu, Xuanpeng Wang, Ziang Liu, Wen Luo, Kwadwo Asare Owusu, et al.",
    venue: "Advanced Energy Materials, 2019, 9(9): 1803436",
    badge: "中科院一区",
    badgeType: "q",
    themes: ["battery"],
    featured: false
  },
  {
    y: 2019,
    title: "A novel dendrite-free Mn2+/Zn2+ hybrid battery with 2.3 V voltage window and 11000-cycle lifespan",
    authors: "Meng Li, Qiu He, Zhaolong Li, Qi Li, Yan Zhao, Jiashen Meng, Wen Luo, et al.",
    venue: "Advanced Energy Materials, 2019, 9(29): 1901469",
    badge: "中科院一区",
    badgeType: "q",
    themes: ["battery"],
    featured: false
  },
  {
    y: 2019,
    title: "Yolk@shell SiOx/C microspheres with semi-graphitic carbon coating on the exterior and interior surfaces for durable lithium storage",
    authors: "Zhenhui Liu, Yan Zhao, Ruohan He, Wen Luo, Jiashen Meng, Qiang Yu, et al.",
    venue: "Energy Storage Materials, 2019, 19: 299-305",
    badge: "中科院一区",
    badgeType: "q",
    themes: ["battery"],
    featured: false
  },

  // ===== 2018 =====
  {
    y: 2018,
    title: "Bottom-up confined synthesis of nanorod-in-nanotube structured Sb@N-C for durable lithium and sodium storage",
    authors: "Wen Luo, Feng Li, Jean-Jacques Gaumet, Pierre Magri, Sebastien Diliberto, Liang Zhou, Liqiang Mai*",
    venue: "Advanced Energy Materials, 2018, 8(19): 1703237",
    badge: "高被引论文 · 中科院一区",
    badgeType: "q",
    themes: ["battery"],
    featured: true
  },
  {
    y: 2018,
    title: "Highly durable Na2V6O16·1.63H2O nanowire cathode for aqueous zinc-ion battery",
    authors: "Ping Hu, Ting Zhu, Xuanpeng Wang, Xiong Wei, Mengyu Yan, Jun Li, Wen Luo, et al.",
    venue: "Nano Letters, 2018, 18(3): 1758-1763",
    badge: "高被引 · 中科院一区",
    badgeType: "q",
    themes: ["battery"],
    featured: false
  },
  {
    y: 2018,
    title: "Heterostructured Bi2S3-Bi2O3 nanosheets with a built-in electric field for improved sodium storage",
    authors: "Wen Luo, Feng Li, Qidong Li, Xuanpeng Wang, Wei Yang, Liang Zhou, Liqiang Mai*",
    venue: "ACS Applied Materials & Interfaces, 2018, 10(8): 7201-7207",
    badge: "中科院一区",
    badgeType: "q",
    themes: ["battery"],
    featured: false
  },

  // ===== 2016 =====
  {
    y: 2016,
    title: "Antimony nanoparticles anchored in three-dimensional carbon network as promising sodium-ion battery anode",
    authors: "Wen Luo, Peiyu Zhang, Xuanpeng Wang, Qiulong Li, Yifan Dong, Jun Hua, Liang Zhou, Liqiang Mai*",
    venue: "Journal of Power Sources, 2016, 304: 340-345",
    badge: "高被引论文",
    badgeType: "q",
    themes: ["battery"],
    featured: false
  },

  // ===== 2015 及更早 =====
  {
    y: 2015,
    title: "Towards sustainable in-situ server systems in the big data era",
    authors: "Chao Li, Yang Hu, Longjun Liu, Jing Gu, Ming Song, Xiaoyu Liang, Jingling Yuan, Tao Li",
    venue: "ACM SIGARCH Computer Architecture News / ISCA 2015",
    badge: "CCF A",
    badgeType: "a",
    themes: ["eff"],
    featured: true
  },
  {
    y: 2015,
    title: "绿色数据中心不完备能耗大数据填补及分类算法研究",
    authors: "袁景凌*, 钟珞, 杨光, 等",
    venue: "计算机学报, 2015",
    badge: "中文一级学报",
    badgeType: "b",
    themes: ["eff"],
    featured: false
  },
  {
    y: 2013,
    title: "Enabling datacenter servers to scale out economically and sustainably",
    authors: "Chao Li, Ruijin Zhou, Ming Liu, Longjun Liu, Jingling Yuan, Tao Li",
    venue: "IEEE/ACM International Symposium on Microarchitecture (MICRO) 2013",
    badge: "CCF A",
    badgeType: "a",
    themes: ["eff"],
    featured: false
  }
];

/* ---------- 科研项目 ---------- */
const PROJECTS = [
  {
    period: "2025 — 2028",
    title: "面向交通视频分析的低功耗异构边缘计算研究",
    kind: "国家自然科学基金面上项目",
    role: "主持",
    owner: "袁景凌"
  },
  {
    period: "2024 — 2026",
    title: "多模态新闻内容的智能抽取及个性化推荐",
    kind: "武汉东湖高新区“揭榜挂帅”项目",
    role: "主持",
    owner: "袁景凌"
  },
  {
    period: "2022 — 2026",
    title: "高分辨无损伤跨尺度电化学原位测试系统研制",
    kind: "国家自然科学基金重大仪器专项",
    role: "参与",
    owner: "袁景凌"
  },
  {
    period: "2023 — 2025",
    title: "基于 AI 的数字信息基础设施低碳关键技术研究与应用",
    kind: "湖北省高质量发展项目",
    role: "子项负责",
    owner: "袁景凌"
  },
  {
    period: "2021 — 2023",
    title: "基于上市公司科技数据的区域产业创新能力评价研究",
    kind: "重点实验室项目",
    role: "主持",
    owner: "袁景凌"
  },
  {
    period: "2022 — 2026",
    title: "基于二维金属烯微纳器件的原位监测与电化学析氢增强机理研究",
    kind: "国家自然科学基金面上项目",
    role: "主持",
    owner: "罗雯"
  },
  {
    period: "2022 — 2026",
    title: "原位拉曼光谱、X 射线衍射和 X 射线断层扫描联用技术开发",
    kind: "国家重点研发计划子任务",
    role: "子任务负责",
    owner: "罗雯"
  },
  {
    period: "2022 — 2026",
    title: "高真空检漏和光学/拉曼光谱表征系统的设计与开发",
    kind: "国家自然科学基金重大科研仪器项目子任务",
    role: "子任务负责",
    owner: "罗雯"
  },
  {
    period: "2023 — 2026",
    title: "储能电池高安全运维技术研究",
    kind: "企业横向课题",
    role: "主持",
    owner: "罗雯"
  },
  {
    period: "2022 — 2024",
    title: "钾离子储能电池复杂非连续界面的多维表征与调控技术",
    kind: "湖北省自然科学基金联合基金项目",
    role: "主持",
    owner: "罗雯"
  },
  {
    period: "2019 — 2021",
    title: "少层锑烯的微波快速剥离和储钾机制研究",
    kind: "国家自然科学基金青年项目",
    role: "主持",
    owner: "罗雯"
  },
  {
    period: "2019 — 2020",
    title: "纳米硫属化合物钠离子电池负极材料的微波辅助可控制备及储钠机理研究",
    kind: "湖北省自然科学基金面上项目",
    role: "主持",
    owner: "罗雯"
  }
];

/* ---------- 代表专利与著作 ---------- */
const PATENTS = {
  patents: [
    { title: "基于增强自编码的电子衍射晶体结构加速重建方法及系统", no: "ZL202210195074.X", theme: "智能表征" },
    { title: "一种中草药-基因关联关系预测方法、系统及存储介质", no: "ZL202510662375.2", theme: "分子与材料学习" },
    { title: "受控知识迁移的海洋遥感广义小样本目标检测方法及系统", no: "ZL202610547287.2", theme: "小样本学习" },
    { title: "一种基于核心集选择的运维异常检测方法及系统", no: "ZL202512005724.6", theme: "高效计算" },
    { title: "一种多能源供给边缘系统的最优碳排计算卸载方法及系统", no: "ZL202210654463.4", theme: "绿色计算" },
    { title: "一种基于幻影卷积的轻量级工程结构裂缝识别方法及系统", no: "ZL202210084371.7（已转化）", theme: "视觉检测" },
    { title: "一种有机酸根无机盐热解碳电极材料及其制备方法与应用", no: "ZL202110876458.3", theme: "储能材料" },
    { title: "异质结构的铁/钴双金属酞菁电催化剂及其制备方法和应用", no: "ZL202010758587.8", theme: "电催化" }
  ],
  books: [
    "麦立强, 罗雯, 陈伟. 材料化学[M]. 化学工业出版社, 2023.",
    "团队成员参与编写专著与教材 10 余本，制定湖北省地方标准 1 项。"
  ]
};
