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
    jump: '跃迁舱',
    burst: '暴矿脉冲'
  },
  wheelItems: [
    { key: 'barrier', label: '路障磁环' },
    { key: 'stun', label: '冻结力场' },
    { key: 'remoteDice', label: '量子骰子' },
    { key: 'extraMove', label: '再动推进' },
    { key: 'jump', label: '跃迁舱' },
    { key: 'burst', label: '暴矿脉冲 +10' }
  ],
  gardens: [
    '本届参赛队伍区', '知名辩手区', '单机游戏区', '熔城地标区', '省会城市区',
    '国家首都区', '中外知名歌手区', '哲学家园', '数理定律区', '知名建筑区'
  ],
  feihua: ['龙','鸟','月','风','水','雪','酒','花','红','春','喜悦','忧愁','颜色','植物','四季','生肖','叠字','建筑','兵器','写人'],
  poetry: ['月','心','国','和','家','花','一','手','梦','光'],
  songs: ['月','心','国','和','家','花','一','手','梦','光'],
  charades: ['炉心守护者','轨道骑士','穹顶观测员','钢潮先锋','调频者','熔城旅人','能量矿工','天穹辩手'],
  telephone: ['比赛获胜了','吃一顿火锅','努力备赛中','下楼扔垃圾','捡到一百万','慢跑五公里'],
  storyWords: {
    noun: ['苹果','水杯','电脑','金钱','手表','鞋子','书包','钢笔','书本','陀螺'],
    verb: ['殴打','嘲笑','抓住','痛哭','起飞','瘫软','疑惑','大笑','旋转','坠落'],
    adj: ['欢乐','忧愁','激动','平静','快速','柔弱','坚强','夸张','丑陋','优美']
  },
  activities: {
    twist: {
      title: '钢索扭扭',
      desc: '导师选定“钢索”数量，全组同学依次扭。每完成一轮获得 5 枚能量矿石（向下取整），建议奖励区间 5~10。'
    },
    count7: {
      title: '频段数七',
      desc: '导师选定起始数字，全组同学依次数七。每完成一轮获得 5 枚能量矿石（向下取整），建议奖励区间 5~10。'
    },
    garden: {
      title: '逛三区',
      desc: '导师选定一个“区”，全组同学依次接龙逛区。每完成一轮获得 5 枚能量矿石（向下取整），建议奖励区间 5~10。'
    },
    feihua: {
      title: '飞花令',
      desc: '导师选定关键字，1 分钟内进行成语飞花令。说出几个成语，给予对应数量矿石（向下取整），建议 5~10。'
    },
    poetry: {
      title: '诗词共振',
      desc: '导师选定意象/关键字，2 分钟内背诵相关古诗。按句数给予矿石（向下取整），建议 5~10。'
    },
    song: {
      title: '金曲接龙',
      desc: '导师选定意象/关键字，2 分钟内唱出相关歌词。3 句 = 5 矿石，6 句 = 10 矿石。'
    },
    charades: {
      title: '你演我猜',
      desc: '三位同学演绎熔城/观赛营相关角色，另外三位猜测。猜对得 10 矿石，时限 30 秒。'
    },
    telephone: {
      title: '信号中继',
      desc: '传递指定文字：第一人听，后 5 人依次比划，最后一人复述。按还原合理程度给 5~10 矿石。'
    },
    story: {
      title: '叙事接龙',
      desc: '三位同学各拿一个词（名/动/形），第一人开句，后续同学合理接龙补全故事，给 5~10 矿石。'
    },
    basketball: {
      title: '轨道投篮',
      desc: '课堂互动小游戏：后仰跳投/投篮挑战。由导师现场裁定成功次数，建议奖励 5~10 矿石。'
    }
  },
  // Classic Monopoly perimeter on 11x11 grid: bottom-left start, clockwise
  // grid positions [col,row] 1-indexed for CSS grid
  cells: [
    { id: 0, name: '炉心起点', type: 'start', col: 1, row: 11 },
    { id: 1, name: '诗词共振', type: 'poetry', col: 1, row: 10 },
    { id: 2, name: '轨道投篮', type: 'basketball', col: 1, row: 9 },
    { id: 3, name: '频段数七', type: 'count7', col: 1, row: 8 },
    { id: 4, name: '信号中继', type: 'telephone', col: 1, row: 7 },
    { id: 5, name: '能量转盘', type: 'wheel', col: 1, row: 6 },
    { id: 6, name: '路障磁环', type: 'item', item: 'barrier', col: 1, row: 5 },
    { id: 7, name: '逛三区', type: 'garden', col: 1, row: 4 },
    { id: 8, name: '叙事接龙', type: 'story', col: 1, row: 3 },
    { id: 9, name: '跃迁门', type: 'portal', col: 1, row: 2 },
    { id: 10, name: '你演我猜', type: 'charades', col: 2, row: 1 },
    { id: 11, name: '逛三区', type: 'garden', col: 3, row: 1 },
    { id: 12, name: '能量转盘', type: 'wheel', col: 4, row: 1 },
    { id: 13, name: '钢索扭扭', type: 'twist', col: 5, row: 1 },
    { id: 14, name: '再投一次', type: 'reroll', col: 6, row: 1 },
    { id: 15, name: '金曲接龙', type: 'song', col: 7, row: 1 },
    { id: 16, name: '再动推进', type: 'item', item: 'extraMove', col: 8, row: 1 },
    { id: 17, name: '逛三区', type: 'garden', col: 9, row: 1 },
    { id: 18, name: '飞花令', type: 'feihua', col: 10, row: 1 },
    { id: 19, name: '跃迁门', type: 'portal', col: 11, row: 1 },
    { id: 20, name: '逛三区', type: 'garden', col: 11, row: 2 },
    { id: 21, name: '信号中继', type: 'telephone', col: 11, row: 3 },
    { id: 22, name: '冻结力场', type: 'item', item: 'stun', col: 11, row: 4 },
    { id: 23, name: '能量转盘', type: 'wheel', col: 11, row: 5 },
    { id: 24, name: '诗词共振', type: 'poetry', col: 11, row: 6 },
    { id: 25, name: '频段数七', type: 'count7', col: 11, row: 7 },
    { id: 26, name: '轨道投篮', type: 'basketball', col: 11, row: 8 },
    { id: 27, name: '叙事接龙', type: 'story', col: 11, row: 9 },
    { id: 28, name: '跃迁门', type: 'portal', col: 11, row: 10 },
    { id: 29, name: '金曲接龙', type: 'song', col: 11, row: 11 },
    { id: 30, name: '能量转盘', type: 'wheel', col: 10, row: 11 },
    { id: 31, name: '量子骰子', type: 'item', item: 'remoteDice', col: 9, row: 11 },
    { id: 32, name: '你演我猜', type: 'charades', col: 8, row: 11 },
    { id: 33, name: '逛三区', type: 'garden', col: 7, row: 11 },
    { id: 34, name: '逛三区', type: 'garden', col: 6, row: 11 },
    { id: 35, name: '钢索扭扭', type: 'twist', col: 5, row: 11 },
    { id: 36, name: '飞花令', type: 'feihua', col: 4, row: 11 },
    { id: 37, name: '再投一次', type: 'reroll', col: 3, row: 11 },
    // fill remaining bottom cells visually - wait, classic board has cells 37 next to start
    // Looking at excel: bottom is 0, 37,36,35,34,33,32,31,30,29,28
    // So after 37 should be col 2 row 11... I need cell between 37 and 0
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
