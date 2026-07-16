/* Game data & rules for 熔城辩论大富翁 */
window.MELT_CITY = {
  title: '辩论大富翁 · 熔城矿脉争夺战',
  campaign: '2026CDWC《钢铁雄心：四域之争》特别企划',
  currency: '能量矿石',
  teams: [
    { id: 'A', name: '炉心域', color: '#3de7ff', ore: 0, pos: 0, skip: 0, props: { barrier: 1, stun: 0, remoteDice: 1, extraMove: 0, jump: 0 } },
    { id: 'B', name: '轨域', color: '#ff8f5a', ore: 0, pos: 0, skip: 0, props: { barrier: 1, stun: 0, remoteDice: 1, extraMove: 0, jump: 0 } },
    { id: 'C', name: '穹域', color: '#7dffb3', ore: 0, pos: 0, skip: 0, props: { barrier: 1, stun: 0, remoteDice: 1, extraMove: 0, jump: 0 } },
    { id: 'D', name: '钢潮域', color: '#c57bff', ore: 0, pos: 0, skip: 0, props: { barrier: 1, stun: 0, remoteDice: 1, extraMove: 0, jump: 0 } }
  ],
  propNames: {
    barrier: '路障磁环',
    stun: '冻结力场',
    remoteDice: '量子骰子',
    extraMove: '再动推进',
    jump: '跃迁舱'
  },
  scoreCap: 50,
  wheelItems: [
    { key: 'barrier', label: '路障磁环', kind: 'prop' },
    { key: 'stun', label: '冻结力场', kind: 'prop' },
    { key: 'remoteDice', label: '量子骰子', kind: 'prop' },
    { key: 'extraMove', label: '再动推进', kind: 'prop' },
    { key: 'jump', label: '跃迁舱', kind: 'prop' },
    { key: 'bluff', label: '瞎掰王', kind: 'activity' },
    { key: 'refute', label: '驳论闪电战', kind: 'activity' }
  ],
  /** 素材池：各活动独立洗牌，用尽后再洗，保证不重复展示 */
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
      id: 's1-human',
      label: '素材一 · 文本 A',
      text: '在南三环木犀园到南四环大红门一带，有很多服装批发大楼，其中的天雅是专门的品牌批发，购物环境不错。',
      answer: 'human',
      answerLabel: '人工'
    },
    {
      id: 's1-ai',
      label: '素材一 · 文本 B',
      text: '这些市场都提供各种服装产品，包括男装、女装、童装等。',
      answer: 'ai',
      answerLabel: 'AI'
    },
    {
      id: 's2-human',
      label: '素材二 · 文本 A',
      text: '华尔街的话，其实价格蛮贵的，网上的叫骂声也蛮高的，但是我觉得培训方面还是非常不错的。',
      answer: 'human',
      answerLabel: '人工'
    },
    {
      id: 's2-ai',
      label: '素材二 · 文本 B',
      text: '华尔街英语使用了多种教学方法，包括讲课、角色扮演、小组讨论和个人辅导等。',
      answer: 'ai',
      answerLabel: 'AI'
    }
  ],
  /** 瞎掰王：每包 4 个概念，仅 1 个带真实解释；演示用示例库 */
  bluffPacks: [
    {
      id: 'pack1',
      concepts: [
        { term: '奥卡姆剃刀', real: true, explanation: '一种方法论原则：如无必要，勿增实体；在同等解释力下优先更简单的假设。' },
        { term: '虚空回响', real: false },
        { term: '镜面熵流', real: false },
        { term: '静默契约', real: false }
      ]
    },
    {
      id: 'pack2',
      concepts: [
        { term: '贝叶斯更新', real: true, explanation: '根据新证据调整先验概率，得到后验概率的推理方式。' },
        { term: '时滞回环', real: false },
        { term: '灰阶悖论', real: false },
        { term: '空集共振', real: false }
      ]
    },
    {
      id: 'pack3',
      concepts: [
        { term: '沉没成本', real: true, explanation: '已经发生且无法收回的成本；理性决策时应忽略它，只看未来增量得失。' },
        { term: '逆熵捕手', real: false },
        { term: '名义锚点', real: false },
        { term: '伪相关核', real: false }
      ]
    }
  ],
  activities: {
    garden: {
      title: '逛三园',
      short: '接龙外延',
      desc: '抽到一个「XX园」后，组内成员在 0.5 分钟（30 秒）内接龙说出该概念的多个外延。例如哲学家园可说「亚里士多德」。每说出一个有效外延 +1 分。',
      scoreHint: '有效外延 +1 / 个',
      timerSec: 30,
      poolKey: 'gardens'
    },
    feihua: {
      title: '飞花令',
      short: '成语飞花',
      desc: '导师公布主题字/意象，组内进行飞花令：接龙说出包含该字（或符合该主题）的成语/词语。课堂常见玩法，限时 1 分钟。按完成质量给分。',
      scoreHint: '建议 +1 / 优秀 +2',
      timerSec: 60,
      poolKey: 'feihuaThemes'
    },
    poetry: {
      title: '诗词大赛',
      short: '诗词接龙',
      desc: '与飞花令共用主题库。导师公布主题后，组内在限时内背诵/接龙相关古诗词句。按句数与质量给分。',
      scoreHint: '建议 +1 / 优秀 +2',
      timerSec: 120,
      poolKey: 'feihuaThemes'
    },
    refute: {
      title: '驳论闪电战',
      short: '两层反驳',
      desc: '针对屏幕上的观点，在 1 分钟内组织两层反驳，由助教老师评判完成度。按完成质量连续线性给分，步长 1 分，区间 1～8 分。',
      scoreHint: '线性给分 +1～+8',
      timerSec: 60,
      poolKey: 'refuteClaims'
    },
    aiDetect: {
      title: 'AI鉴识',
      short: '人机鉴别',
      desc: '运用学过的知识，小组在 1 分钟内鉴别屏幕上的文字是 AI 写的还是人写的。鉴别成功 +5 分。',
      scoreHint: '鉴别成功 +5',
      timerSec: 60,
      poolKey: 'aiSamples'
    },
    bluff: {
      title: '瞎掰王',
      short: '真假概念',
      desc: '线下发放概念卡牌：组内每人一张晦涩概念，其中只有一张带真实解释。1 分钟准备后，每人依次解释 30 秒；其余三组投票找出「有解释的人」。未找出：该组 +7；找出：其余三组各 +2。网页仅提供规则与计时，不展示词汇。',
      scoreHint: '未找出该组 +7 · 找出则其余三组各 +2',
      timerSec: 60,
      speakSec: 30,
      poolKey: null,
      offlineCards: true
    }
  },
  // Classic Monopoly perimeter on 11x11 grid: bottom-left start, clockwise
  cells: [
    { id: 0, name: '炉心起点', type: 'start', col: 1, row: 11 },
    { id: 1, name: 'AI鉴识', type: 'aiDetect', col: 1, row: 10 },
    { id: 2, name: '驳论闪电战', type: 'refute', col: 1, row: 9 },
    { id: 3, name: '瞎掰王', type: 'bluff', col: 1, row: 8 },
    { id: 4, name: '飞花令', type: 'feihua', col: 1, row: 7 },
    { id: 5, name: '能量转盘', type: 'wheel', col: 1, row: 6 },
    { id: 6, name: '路障磁环', type: 'item', item: 'barrier', col: 1, row: 5 },
    { id: 7, name: '逛三园', type: 'garden', col: 1, row: 4 },
    { id: 8, name: '驳论闪电战', type: 'refute', col: 1, row: 3 },
    { id: 9, name: '跃迁门', type: 'portal', col: 1, row: 2 },
    { id: 10, name: 'AI鉴识', type: 'aiDetect', col: 2, row: 1 },
    { id: 11, name: '瞎掰王', type: 'bluff', col: 3, row: 1 },
    { id: 12, name: '能量转盘', type: 'wheel', col: 4, row: 1 },
    { id: 13, name: '驳论闪电战', type: 'refute', col: 5, row: 1 },
    { id: 14, name: '再投一次', type: 'reroll', col: 6, row: 1 },
    { id: 15, name: '诗词大赛', type: 'poetry', col: 7, row: 1 },
    { id: 16, name: '再动推进', type: 'item', item: 'extraMove', col: 8, row: 1 },
    { id: 17, name: 'AI鉴识', type: 'aiDetect', col: 9, row: 1 },
    { id: 18, name: '瞎掰王', type: 'bluff', col: 10, row: 1 },
    { id: 19, name: '跃迁门', type: 'portal', col: 11, row: 1 },
    { id: 20, name: '驳论闪电战', type: 'refute', col: 11, row: 2 },
    { id: 21, name: '逛三园', type: 'garden', col: 11, row: 3 },
    { id: 22, name: '冻结力场', type: 'item', item: 'stun', col: 11, row: 4 },
    { id: 23, name: '能量转盘', type: 'wheel', col: 11, row: 5 },
    { id: 24, name: 'AI鉴识', type: 'aiDetect', col: 11, row: 6 },
    { id: 25, name: '瞎掰王', type: 'bluff', col: 11, row: 7 },
    { id: 26, name: '驳论闪电战', type: 'refute', col: 11, row: 8 },
    { id: 27, name: '飞花令', type: 'feihua', col: 11, row: 9 },
    { id: 28, name: '跃迁门', type: 'portal', col: 11, row: 10 },
    { id: 29, name: '瞎掰王', type: 'bluff', col: 11, row: 11 },
    { id: 30, name: '能量转盘', type: 'wheel', col: 10, row: 11 },
    { id: 31, name: '量子骰子', type: 'item', item: 'remoteDice', col: 9, row: 11 },
    { id: 32, name: '驳论闪电战', type: 'refute', col: 8, row: 11 },
    { id: 33, name: 'AI鉴识', type: 'aiDetect', col: 7, row: 11 },
    { id: 34, name: '逛三园', type: 'garden', col: 6, row: 11 },
    { id: 35, name: '瞎掰王', type: 'bluff', col: 5, row: 11 },
    { id: 36, name: '诗词大赛', type: 'poetry', col: 4, row: 11 },
    { id: 37, name: '再投一次', type: 'reroll', col: 3, row: 11 }
  ]
};

// Fix: excel bottom row left-to-right from start: 0, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28
// So cell 37 is at col 2, and we need empty? No - 11 cells on bottom: 0 + 37..28 = 11 cells
// My mapping put 37 at col 3 - wrong. Recalculate bottom:
// col1=0, col2=37, col3=36, col4=35, col5=34, col6=33, col7=32, col8=31, col9=30, col10=29, col11=28
(function fixBottom() {
  const map = {
    0: [1,11], 37:[2,11], 36:[3,11], 35:[4,11], 34:[5,11], 33:[6,11],
    32:[7,11], 31:[8,11], 30:[9,11], 29:[10,11], 28:[11,11]
  };
  // also fix left side - excel goes up from start: 0,1,2,3,4,5,6,7,8,9
  // row11=0, row10=1 ... row2=9, and row1 is top with 9 as corner already
  // Top: 9 is corner at (1,1)? Excel shows 9 at top-left corner.
  // Left column from bottom: start at bottom-left, then up: 1..8, corner 9 at top-left
  // So: (1,11)=0, (1,10)=1, (1,9)=2, (1,8)=3, (1,7)=4, (1,6)=5, (1,5)=6, (1,4)=7, (1,3)=8, (1,2)=? 
  // For 11x11 with corners only: left has cells at rows 2-10 = 9 cells + 2 corners = 11
  // Corners: (1,11)=0, (1,1)=9, (11,1)=19, (11,11)=28
  // Left edge non-corner: rows 10..2 = ids 1..8 — that's only 8 cells. + corners 0 and 9 = 10 positions on left.
  // Top non-corner: cols 2..10 = ids 10..18 (9 cells) + corners 9,19 = 11
  // Right non-corner: rows 2..10 = ids 20..27 (8) + corners 19,28 = 10
  // Bottom non-corner: cols 10..2 = ids 29..37 (9) + corners 28,0 = 11
  
  // Total: 38 cells (0-37). Perimeter of 11x11 square = 11*4-4 = 40. So 2 cells difference?
  // Wait Excel top has 11 cells (9-19), bottom 11 (0,37-28), left middle 8 (1-8), right middle 8 (20-27) = 11+11+8+8 = 38. Yes!
  // So left column uses rows 3-10 for cells 1-8, and row 2 is EMPTY? Or the grid is not uniform...
  
  // Actually looking at Excel again - the board might be 10 cells on sides visually in a table.
  // Top row R2: columns B-L = 11 cells (9 to 19)
  // Bottom R11: columns B-L = 11 cells (0, 37..28)  
  // Left: R3-R10 = 8 cells (8 down to 1)
  // Right: R3-R10 = 8 cells (20 to 27)
  // That's a 10-row by 11-col outer frame... R2 to R11 = 10 rows, with corners included in top/bottom.
  // Left/right don't include corners. So visual grid is 10 rows × 11 cols for the ring.
  
  // For CSS 11x11 I'll use:
  // corners at (1,11), (1,1), (11,1), (11,11) — but left only has 8 between top and bottom corner in 9 intermediate rows if 11 rows...
  // 11 rows means 9 intermediate. We only have 8 left cells. One gap.
  
  // Better approach: use 10x10 grid:
  // Top: row1 cols1-10 = cells 9-18, and cell 19 at? 
  // Simpler: keep 11x11 and leave one empty on left and right, OR squeeze 8 cells into rows 2-9 and leave row 10 unused on sides... 
  
  // Cleanest for demo: use explicit positions matching classic look with 10x10:
  // Perimeter length 36 for 10x10 (10*4-4=36), but we need 38.
  // Use 11x11 with 40 perimeter slots, leave 2 decorative empty, OR put all 38 and leave 2 gaps.
  
  // I'll place left cells 1-8 at rows 10 down to 3, leave row 2 as a spacer cell labeled ··· or merge portal into corner only.
  
  const cells = window.MELT_CITY.cells;
  const byId = Object.fromEntries(cells.map(c => [c.id, c]));
  
  // Left: 0 at (1,11), 1-8 at (1,10)..(1,3), 9 at (1,1) — skip (1,2) as visual bridge
  const left = {0:[1,11],1:[1,10],2:[1,9],3:[1,8],4:[1,7],5:[1,6],6:[1,5],7:[1,4],8:[1,3],9:[1,1]};
  // Top: 9 already, 10-18 at (2,1)..(10,1), 19 at (11,1)
  const top = {10:[2,1],11:[3,1],12:[4,1],13:[5,1],14:[6,1],15:[7,1],16:[8,1],17:[9,1],18:[10,1],19:[11,1]};
  // Right: 20-27 at (11,2)..(11,9), 28 at (11,11) — skip (11,10)
  const right = {20:[11,2],21:[11,3],22:[11,4],23:[11,5],24:[11,6],25:[11,7],26:[11,8],27:[11,9],28:[11,11]};
  // Bottom: 29-37 between 28 and 0: from right to left cols 10..2
  const bottom = {29:[10,11],30:[9,11],31:[8,11],32:[7,11],33:[6,11],34:[5,11],35:[4,11],36:[3,11],37:[2,11]};
  
  Object.assign(left, top, right, bottom);
  for (const [id, pos] of Object.entries(left)) {
    const c = byId[Number(id)];
    if (c) { c.col = pos[0]; c.row = pos[1]; }
  }
  
  // Add spacer decorative cells
  window.MELT_CITY.spacers = [
    { col: 1, row: 2, label: '▲' },
    { col: 11, row: 10, label: '▼' }
  ];
})();
