/* 活动演示页数据：对齐《大富翁游戏》新规则。逛三园是小活动，不是分区大活动。 */
window.ZONE_CONTENT = {
  activities: [
    {
      key: 'garden',
      title: '逛三园',
      short: '30秒接龙外延',
      blurb: '小活动：抽一个园目，组内限时接龙说出外延。',
      rule: '抽到「XX园」后，组内成员在 0.5 分钟（30 秒）内接龙说出该概念的多个外延。例如哲学家园可说「亚里士多德」。每说出一个有效外延 +1 分。',
      scoreHint: '有效外延 +1 / 个',
      timerSec: 30,
      accent: '#3de7ff',
      poolKey: 'gardens',
      poolLabel: '园目'
    },
    {
      key: 'feihua',
      title: '飞花令 / 诗词大赛',
      short: '主题字飞花·诗词',
      blurb: '共用主题库：飞花令或诗词接龙。',
      rule: '导师公布主题字/意象。飞花令：接龙说出包含该字或符合主题的成语/词语（约 1 分钟）。诗词大赛：限时内背诵或接龙相关古诗词句（约 2 分钟）。按完成质量给分。',
      scoreHint: '建议 +1 / 优秀 +2',
      timerSec: 60,
      accent: '#ff8f5a',
      poolKey: 'feihuaThemes',
      poolLabel: '主题'
    },
    {
      key: 'refute',
      title: '驳论闪电战',
      short: '一分钟两层反驳',
      blurb: '针对屏幕观点，组织两层反驳。',
      rule: '针对屏幕上的观点，在 1 分钟内组织两层反驳，由助教老师评判完成度。按完成质量连续线性给分，步长 1 分，区间 1～8 分。',
      scoreHint: '线性给分 +1～+8',
      timerSec: 60,
      accent: '#7dffb3',
      poolKey: 'refuteClaims',
      poolLabel: '观点'
    },
    {
      key: 'aiDetect',
      title: 'AI鉴识',
      short: '鉴别人工或AI',
      blurb: '1 分钟鉴别文本出处。',
      rule: '运用学过的知识，小组在 1 分钟内鉴别屏幕上的文字是 AI 写的还是人写的。鉴别成功 +5 分。',
      scoreHint: '鉴别成功 +5',
      timerSec: 60,
      accent: '#c57bff',
      poolKey: 'aiSamples',
      poolLabel: '文本素材'
    },
    {
      key: 'bluff',
      title: '瞎掰王',
      short: '真假概念投票',
      blurb: '线下发卡 · 网页只计时计分',
      rule: '线下发放概念卡牌：组内每人一张晦涩概念，其中只有一张带真实解释。1 分钟准备后，每人依次解释 30 秒；其余三组投票找出「有解释的人」。未找出：该组 +7；找出：其余三组各 +2。本页不展示词汇，仅提供规则与计时。',
      scoreHint: '未找出该组 +7 · 找出则其余三组各 +2',
      timerSec: 60,
      speakSec: 30,
      accent: '#ffd56a',
      poolKey: null,
      poolLabel: '线下卡牌',
      offlineCards: true
    }
  ],
  gardens: [
    '本届参赛队伍园', '知名辩手园', '单机游戏园', '画家园', '省会城市园',
    '国家首都园', '音乐家园', '哲学家园', '数学物理定律园', '知名建筑园'
  ],
  feihuaThemes: [
    '龙', '鸟', '月', '风', '水', '雪', '酒', '花', '红', '春',
    '颜色', '植物', '生肖', '叠字', '建筑', '兵器', '写人'
  ],
  refuteClaims: [
    '可以证明人类想要了解宠物的需求，很爱宠物，因为B站上有很多人们学习宠物语言的视频（比如人会研究狗狗摇尾巴是什么不同的意思）',
    '很多科技都是为了治疗痛苦发展的，因此如果没有痛苦科技就没有发展。',
    '霍金有未竟的事业没有完成非常遗憾，所以应该推广数字永生。',
    '运动员偶像化可以为运动队提供大量资金，资金可以辅助运动队建设，所以这有助于发扬体育精神。',
    '社会得到进步，我个人也会更加幸福。',
    '我们不应当推广数字永生，因为永生会被资本垄断。',
    '痛苦是人类的必需品，因为痛苦可以带来成长（比如只有经历考试失败的痛苦，我才会继续好好学习）',
    '人生来就有痛苦和幸福，痛苦是完整的人生基石，失去了痛苦人生就不完整。',
    '勇敢的人先享受世界不是一个陷阱，因为马丁路德金勇敢地反抗压迫，取得了伟大的成就。',
    '因为人的细胞是不断轮换的，所以只有内在的意识可以决定人的核心。'
  ],
  aiSamples: [
    {
      label: '素材一 · 文本 A',
      text: '在南三环木犀园到南四环大红门一带，有很多服装批发大楼，其中的天雅是专门的品牌批发，购物环境不错。',
      answerLabel: '人工'
    },
    {
      label: '素材一 · 文本 B',
      text: '这些市场都提供各种服装产品，包括男装、女装、童装等。',
      answerLabel: 'AI'
    },
    {
      label: '素材二 · 文本 A',
      text: '华尔街的话，其实价格蛮贵的，网上的叫骂声也蛮高的，但是我觉得培训方面还是非常不错的。',
      answerLabel: '人工'
    },
    {
      label: '素材二 · 文本 B',
      text: '华尔街英语使用了多种教学方法，包括讲课、角色扮演、小组讨论和个人辅导等。',
      answerLabel: 'AI'
    }
  ],
  bluffPacks: [
    {
      concepts: [
        { term: '奥卡姆剃刀', real: true, explanation: '如无必要，勿增实体；同等解释力下优先更简单的假设。' },
        { term: '虚空回响', real: false },
        { term: '镜面熵流', real: false },
        { term: '静默契约', real: false }
      ]
    },
    {
      concepts: [
        { term: '贝叶斯更新', real: true, explanation: '根据新证据调整先验概率，得到后验概率。' },
        { term: '时滞回环', real: false },
        { term: '灰阶悖论', real: false },
        { term: '空集共振', real: false }
      ]
    },
    {
      concepts: [
        { term: '沉没成本', real: true, explanation: '已发生且无法收回的成本；理性决策应忽略它，只看未来增量。' },
        { term: '逆熵捕手', real: false },
        { term: '名义锚点', real: false },
        { term: '伪相关核', real: false }
      ]
    }
  ]
};
