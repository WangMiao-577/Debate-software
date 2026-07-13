(() => {
  const DATA = window.MELT_CITY;
  const state = {
    view: 'intro',
    turn: 0,
    rolling: false,
    barriers: new Set(),
    lastDice: 1,
    pendingExtraRoll: false,
    logs: [],
    ruleTab: 'flow'
  };

  const els = {};
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  function team() {
    return DATA.teams[state.turn];
  }

  function log(msg) {
    const now = new Date();
    const t = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;
    state.logs.unshift({ t, msg });
    if (state.logs.length > 60) state.logs.pop();
    renderLog();
  }

  function toast(msg) {
    const el = els.toast;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => el.classList.remove('show'), 2200);
  }

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function save() {
    try {
      localStorage.setItem('melt-city-monopoly', JSON.stringify({
        teams: DATA.teams,
        turn: state.turn,
        barriers: [...state.barriers],
        logs: state.logs.slice(0, 30)
      }));
    } catch (_) {}
  }

  function load() {
    try {
      const raw = localStorage.getItem('melt-city-monopoly');
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data.teams) {
        data.teams.forEach((t, i) => Object.assign(DATA.teams[i], t));
      }
      if (typeof data.turn === 'number') state.turn = data.turn;
      if (data.barriers) state.barriers = new Set(data.barriers);
      if (data.logs) state.logs = data.logs;
    } catch (_) {}
  }

  function setView(name) {
    state.view = name;
    $$('.nav-btn[data-view]').forEach(b => b.classList.toggle('active', b.dataset.view === name));
    $$('.view').forEach(v => v.classList.toggle('active', v.id === `view-${name}`));
  }

  function openModal(id) {
    $(`#${id}`).classList.add('show');
  }
  function closeModal(id) {
    $(`#${id}`).classList.remove('show');
  }

  function renderTeams() {
    const box = els.teamList;
    box.innerHTML = DATA.teams.map((t, i) => {
      const props = Object.entries(t.props)
        .filter(([, n]) => n > 0)
        .map(([k, n]) => `<span class="prop-pill">${DATA.propNames[k] || k} ×${n}</span>`)
        .join('') || '<span class="prop-pill">暂无道具</span>';
      return `<div class="team-card ${i === state.turn ? 'active' : ''}" style="color:${t.color}" data-team="${i}">
        <div class="name"><span>${t.id} · ${t.name}</span><span>${i === state.turn ? '行动中' : ''}</span></div>
        <div class="ore">${t.ore}<span style="font-size:12px;margin-left:6px;color:#9bb8d4">矿石</span></div>
        <div class="meta">位置：${DATA.cells[t.pos].name}（#${t.pos}）${t.skip ? ' · 冻结中' : ''}</div>
        <div class="props">${props}</div>
      </div>`;
    }).join('');

    // score modal
    els.scoreGrid.innerHTML = DATA.teams.map((t, i) => `
      <div class="score-team" style="border-color:${t.color}55">
        <div class="head"><span style="color:${t.color}">${t.id} · ${t.name}</span>
          <input class="input" style="width:120px;margin:0" value="${t.name}" data-rename="${i}" />
        </div>
        <div class="value" id="score-val-${i}">${t.ore}</div>
        <div class="score-actions">
          <button class="btn" data-score="${i}" data-delta="-10">-10</button>
          <button class="btn" data-score="${i}" data-delta="-5">-5</button>
          <button class="btn" data-score="${i}" data-delta="-1">-1</button>
          <button class="btn ore" data-score="${i}" data-delta="1">+1</button>
          <button class="btn ore" data-score="${i}" data-delta="5">+5</button>
          <button class="btn ore" data-score="${i}" data-delta="10">+10</button>
        </div>
      </div>`).join('');

    const award = $('#awardTeam');
    if (award) {
      const cur = award.value;
      award.innerHTML = DATA.teams.map((t, i) =>
        `<option value="${i}">${t.id} · ${t.name}</option>`
      ).join('');
      award.value = cur;
    }
  }

  function renderBoard() {
    const board = els.board;
    const occupied = {};
    DATA.teams.forEach((t, i) => {
      (occupied[t.pos] ||= []).push(i);
    });

    let html = '';
    DATA.cells.forEach(c => {
      const classes = ['cell'];
      if (c.type === 'start') classes.push('start', 'corner');
      if (c.type === 'portal') classes.push('corner');
      if (state.barriers.has(c.id)) classes.push('has-barrier');
      const tokens = (occupied[c.id] || []).map(i => {
        const t = DATA.teams[i];
        return `<span class="token" style="background:${t.color};color:${t.color}" title="${t.name}"></span>`;
      }).join('');
      html += `<button class="${classes.join(' ')}" style="grid-column:${c.col};grid-row:${c.row}" data-cell="${c.id}">
        <span class="cell-id">#${c.id}</span>
        <span class="cell-name">${c.name}</span>
        <span class="tokens">${tokens}</span>
      </button>`;
    });
    (DATA.spacers || []).forEach(s => {
      html += `<div class="cell" style="grid-column:${s.col};grid-row:${s.row};opacity:.35;pointer-events:none">
        <span class="cell-name" style="margin:auto">${s.label}</span>
      </div>`;
    });
    html += `<div class="board-center">
      <h3>2026CDWC</h3>
      <p>熔城矿脉争夺战 · 四域协作冲向炉心<br/>当前行动：<strong style="color:${team().color}">${team().name}</strong></p>
      <div class="dice-stage">
        <div class="dice ${state.rolling ? 'rolling' : ''}" id="diceFace">${state.lastDice}</div>
        <button class="btn accent" id="btnRollCenter" ${state.rolling ? 'disabled' : ''}>投掷骰子</button>
      </div>
    </div>`;
    board.innerHTML = html;
    $('#btnRollCenter')?.addEventListener('click', rollDice);
    $$('[data-cell]', board).forEach(btn => btn.addEventListener('click', () => previewCell(+btn.dataset.cell)));
  }

  function renderLog() {
    els.log.innerHTML = state.logs.map(l => `<div class="line"><time>${l.t}</time>${l.msg}</div>`).join('') ||
      '<div class="line">系统就绪。调频者可开始争夺矿脉。</div>';
  }

  function renderPropsPanel() {
    const t = team();
    els.propSelect.innerHTML = Object.entries(t.props)
      .filter(([, n]) => n > 0)
      .map(([k, n]) => `<option value="${k}">${DATA.propNames[k]} ×${n}</option>`)
      .join('') || '<option value="">暂无可用道具</option>';

    els.targetSelect.innerHTML = DATA.teams
      .map((x, i) => `<option value="${i}" ${i === state.turn ? 'disabled' : ''}>${x.name}</option>`)
      .join('');

    els.barrierSelect.innerHTML = DATA.cells
      .filter(c => c.id !== 0)
      .map(c => `<option value="${c.id}">#${c.id} ${c.name}</option>`)
      .join('');
  }

  function renderAll() {
    renderTeams();
    renderBoard();
    renderLog();
    renderPropsPanel();
    els.turnLabel.textContent = `${team().id} · ${team().name}`;
    save();
  }

  function addOre(teamIndex, delta, reason) {
    const t = DATA.teams[teamIndex];
    t.ore = Math.max(0, t.ore + delta);
    const sign = delta >= 0 ? '+' : '';
    log(`${t.name} ${sign}${delta} 能量矿石${reason ? '（' + reason + '）' : ''} → ${t.ore}`);
    toast(`${t.name} ${sign}${delta} 矿石`);
    renderAll();
  }

  function nextTurn() {
    state.turn = (state.turn + 1) % DATA.teams.length;
    const t = team();
    if (t.skip > 0) {
      t.skip -= 1;
      log(`${t.name} 被冻结力场影响，跳过本回合`);
      toast(`${t.name} 跳过回合`);
      renderAll();
      return nextTurn();
    }
    log(`轮到 ${t.name} 行动`);
    renderAll();
  }

  function pathStep(from, steps) {
    // Move clockwise; stop before barrier on destination path
    let pos = from;
    for (let i = 0; i < steps; i++) {
      const next = (pos + 1) % DATA.cells.length;
      if (state.barriers.has(next)) {
        log(`路障磁环触发：无法进入 #${next} ${DATA.cells[next].name}`);
        state.barriers.delete(next);
        return { pos, blocked: true, blockedAt: next };
      }
      pos = next;
    }
    return { pos, blocked: false };
  }

  async function animateMove(teamIndex, from, to) {
    const t = DATA.teams[teamIndex];
    let cur = from;
    const total = (to - from + DATA.cells.length) % DATA.cells.length;
    for (let i = 0; i < total; i++) {
      cur = (cur + 1) % DATA.cells.length;
      // if barrier was ahead we already stopped in pathStep
      t.pos = cur;
      renderBoard();
      await wait(180);
    }
  }

  function wait(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  async function rollDice(forced) {
    if (state.rolling) return;
    const t = team();
    state.rolling = true;
    renderBoard();
    const face = $('#diceFace');
    for (let i = 0; i < 12; i++) {
      state.lastDice = 1 + Math.floor(Math.random() * 6);
      if (face) face.textContent = state.lastDice;
      await wait(50);
    }
    const dice = typeof forced === 'number' ? forced : state.lastDice;
    state.lastDice = dice;
    if (face) face.textContent = dice;
    state.rolling = false;

    const from = t.pos;
    const result = pathStep(from, dice);
    log(`${t.name} 掷出 ${dice} 点，从 #${from} 前往 #${result.pos}`);
    await animateMove(state.turn, from, result.pos);
    t.pos = result.pos;
    renderAll();
    await handleCell(t.pos);
  }

  function previewCell(id) {
    const c = DATA.cells[id];
    openEvent({
      title: `#${c.id} ${c.name}`,
      badge: '格子预览',
      html: `<div class="event-desc">${describeCell(c)}</div>`,
      actions: [{ label: '关闭', className: 'btn', onClick: () => closeModal('eventModal') }]
    });
  }

  function describeCell(c) {
    if (DATA.activities[c.type]) return DATA.activities[c.type].desc;
    if (c.type === 'start') return '熔城炉心起点。经过或停留可继续前进，无额外奖惩。';
    if (c.type === 'portal') return '跃迁门：立即传送到另一扇跃迁门。';
    if (c.type === 'wheel') return '能量转盘：抽取一件本局道具（或暴矿脉冲）。';
    if (c.type === 'reroll') return '再投一次：立即额外投掷一次骰子。';
    if (c.type === 'item') return `获得道具【${DATA.propNames[c.item]}】×1。`;
    return '特殊事件格。';
  }

  function openEvent({ title, badge, html, actions }) {
    els.eventTitle.textContent = title;
    els.eventBadge.textContent = badge || '事件';
    els.eventBody.innerHTML = html;
    els.eventActions.innerHTML = '';
    (actions || []).forEach(a => {
      const btn = document.createElement('button');
      btn.className = a.className || 'btn';
      btn.textContent = a.label;
      btn.addEventListener('click', a.onClick);
      els.eventActions.appendChild(btn);
    });
    openModal('eventModal');
  }

  function awardButtons(defaultAmt = 5) {
    return [3, 5, 8, 10].map(n => ({
      label: `+${n} 矿石`,
      className: 'btn ore',
      onClick: () => {
        addOre(state.turn, n, '挑战奖励');
        closeModal('eventModal');
        nextTurn();
      }
    })).concat([
      { label: `默认 +${defaultAmt}`, className: 'btn accent', onClick: () => {
        addOre(state.turn, defaultAmt, '挑战奖励');
        closeModal('eventModal');
        nextTurn();
      }},
      { label: '跳过 / 未完成', className: 'btn', onClick: () => { closeModal('eventModal'); nextTurn(); } }
    ]);
  }

  async function handleCell(cellId) {
    const c = DATA.cells[cellId];
    const t = team();

    if (c.type === 'start') {
      toast('回到炉心起点');
      nextTurn();
      return;
    }

    if (c.type === 'portal') {
      const portals = DATA.cells.filter(x => x.type === 'portal' && x.id !== c.id).map(x => x.id);
      const dest = pick(portals);
      openEvent({
        title: '跃迁门启动',
        badge: '传送',
        html: `<div class="event-desc">${t.name} 触发跃迁门，将传送至 <strong>#${dest} ${DATA.cells[dest].name}</strong>。</div>`,
        actions: [{
          label: '确认跃迁', className: 'btn accent', onClick: async () => {
            closeModal('eventModal');
            const from = t.pos;
            t.pos = dest;
            renderAll();
            log(`${t.name} 跃迁至 #${dest}`);
            // landing on portal again shouldn't chain infinitely for demo: treat as arrive then end
            nextTurn();
          }
        }]
      });
      return;
    }

    if (c.type === 'reroll') {
      openEvent({
        title: '再投一次',
        badge: '增益',
        html: `<div class="event-desc">系统允许 ${t.name} 立即再投一次骰子。</div>`,
        actions: [{
          label: '再投！', className: 'btn accent', onClick: async () => {
            closeModal('eventModal');
            await rollDice();
          }
        }]
      });
      return;
    }

    if (c.type === 'item') {
      t.props[c.item] = (t.props[c.item] || 0) + 1;
      log(`${t.name} 获得道具 ${DATA.propNames[c.item]}`);
      openEvent({
        title: `获得 ${DATA.propNames[c.item]}`,
        badge: '道具',
        html: `<div class="event-desc">已放入背包。可在右侧“道具操作”中使用。</div>`,
        actions: [{ label: '继续', className: 'btn accent', onClick: () => { closeModal('eventModal'); nextTurn(); } }]
      });
      renderAll();
      return;
    }

    if (c.type === 'wheel') {
      openEvent({
        title: '能量转盘',
        badge: '抽取',
        html: `<div class="event-desc">转动能量转盘，随机获得本局道具或暴矿脉冲。</div>
          <div class="wheel-box"><div class="wheel-pointer"></div><div class="wheel" id="wheelDisk"></div></div>`,
        actions: [{
          label: '启动转盘', className: 'btn accent', onClick: () => spinWheel()
        }]
      });
      return;
    }

    // activity cells
    const act = DATA.activities[c.type];
    if (act) {
      let extra = '';
      if (c.type === 'garden') extra = `<p style="margin-top:10px">推荐区目：<strong>${pick(DATA.gardens)}</strong></p>`;
      if (c.type === 'feihua') extra = `<p style="margin-top:10px">推荐关键字：<strong>${pick(DATA.feihua)}</strong></p>`;
      if (c.type === 'poetry' || c.type === 'song') extra = `<p style="margin-top:10px">推荐意象：<strong>${pick(DATA.poetry)}</strong></p>`;
      if (c.type === 'charades') extra = `<p style="margin-top:10px">推荐角色：<strong>${pick(DATA.charades)}</strong></p>`;
      if (c.type === 'telephone') extra = `<p style="margin-top:10px">推荐密语：<strong>${pick(DATA.telephone)}</strong></p>`;
      if (c.type === 'story') {
        extra = `<p style="margin-top:10px">词语：名词 <strong>${pick(DATA.storyWords.noun)}</strong> /
          动词 <strong>${pick(DATA.storyWords.verb)}</strong> /
          形容词 <strong>${pick(DATA.storyWords.adj)}</strong></p>`;
      }
      openEvent({
        title: act.title,
        badge: '表达挑战',
        html: `<div class="event-desc">${act.desc}${extra}<p class="hint" style="margin-top:10px;color:#9bb8d4">课堂演示：完成挑战后由导师点击发放矿石。</p></div>`,
        actions: awardButtons(c.type === 'charades' ? 10 : 5)
      });
      return;
    }

    nextTurn();
  }

  function spinWheel() {
    const disk = $('#wheelDisk');
    if (!disk) return;
    const idx = Math.floor(Math.random() * DATA.wheelItems.length);
    const item = DATA.wheelItems[idx];
    const rot = 360 * 5 + (360 - idx * 60 - 30);
    disk.style.transform = `rotate(${rot}deg)`;
    setTimeout(() => {
      const t = team();
      if (item.key === 'burst') {
        addOre(state.turn, 10, '暴矿脉冲');
      } else {
        t.props[item.key] = (t.props[item.key] || 0) + 1;
        log(`${t.name} 转盘获得 ${item.label}`);
        toast(`获得 ${item.label}`);
        renderAll();
      }
      openEvent({
        title: `转盘结果：${item.label}`,
        badge: '完成',
        html: `<div class="event-desc">奖励已结算。</div>`,
        actions: [{ label: '结束回合', className: 'btn accent', onClick: () => { closeModal('eventModal'); nextTurn(); } }]
      });
    }, 3300);
  }

  function useProp() {
    const key = els.propSelect.value;
    if (!key) return toast('没有可使用的道具');
    const t = team();
    if (!t.props[key]) return toast('道具不足');

    if (key === 'barrier') {
      const cellId = +els.barrierSelect.value;
      if (cellId === 0) return toast('不可在起点放置');
      state.barriers.add(cellId);
      t.props.barrier -= 1;
      log(`${t.name} 在 #${cellId} 放置路障磁环`);
      toast('路障已部署');
      renderAll();
      return;
    }

    if (key === 'stun') {
      const ti = +els.targetSelect.value;
      if (ti === state.turn) return toast('不能作用于自己');
      DATA.teams[ti].skip += 1;
      t.props.stun -= 1;
      log(`${t.name} 对 ${DATA.teams[ti].name} 使用冻结力场`);
      toast(`${DATA.teams[ti].name} 将停留 1 回合`);
      renderAll();
      return;
    }

    if (key === 'remoteDice') {
      openEvent({
        title: '量子骰子',
        badge: '遥控',
        html: `<div class="event-desc">指定任意点数前进。</div>
          <div class="btn-row" id="quantumRow"></div>`,
        actions: [{ label: '取消', className: 'btn', onClick: () => closeModal('eventModal') }]
      });
      const row = $('#quantumRow');
      for (let n = 1; n <= 6; n++) {
        const b = document.createElement('button');
        b.className = 'btn accent';
        b.textContent = String(n);
        b.onclick = async () => {
          t.props.remoteDice -= 1;
          closeModal('eventModal');
          log(`${t.name} 使用量子骰子，指定 ${n} 点`);
          renderAll();
          await rollDice(n);
        };
        row.appendChild(b);
      }
      return;
    }

    if (key === 'extraMove') {
      t.props.extraMove -= 1;
      log(`${t.name} 使用再动推进，额外投掷`);
      renderAll();
      rollDice();
      return;
    }

    if (key === 'jump') {
      // jump to a portal cell
      const portals = DATA.cells.filter(c => c.type === 'portal');
      const dest = pick(portals);
      t.props.jump -= 1;
      t.pos = dest.id;
      log(`${t.name} 使用跃迁舱，抵达 #${dest.id}`);
      toast(`跃迁至 ${dest.name}`);
      renderAll();
      handleCell(dest.id);
      return;
    }
  }

  function renderRules() {
    const map = {
      flow: `<ul>
        <li>四域势力轮流投掷骰子，沿熔城轨道顺时针前进。</li>
        <li>停留事件格后，完成对应表达挑战，由导师发放<strong>能量矿石</strong>。</li>
        <li>矿石可用于终局之战前的矿石商店兑换道具（营地主线）。</li>
        <li>组内合作、组间对抗：本页适合课堂大屏演示推进。</li>
      </ul>
      <p class="hint">本局货币：能量矿石（对应上届“仙桃”）。</p>`,
      cells: `<ul>
        <li><strong>表达挑战格</strong>：钢索扭扭、频段数七、逛三区、飞花令、诗词共振、金曲接龙、你演我猜、信号中继、叙事接龙、轨道投篮。</li>
        <li><strong>能量转盘</strong>：随机发放路障/冻结/量子骰子/再动/跃迁舱/暴矿脉冲。</li>
        <li><strong>跃迁门</strong>：传送至其他跃迁门。</li>
        <li><strong>再投一次</strong>：立即额外投掷。</li>
        <li><strong>道具格</strong>：直接获得对应道具。</li>
      </ul>`,
      props: `<ul>
        <li><strong>路障磁环</strong>：在指定格子设障，对手踩到前一格停下并消除路障。初始 1。</li>
        <li><strong>冻结力场</strong>：令一条轨道上的对手停留 1 回合。</li>
        <li><strong>量子骰子</strong>：指定 1~6 点前进。初始 1。</li>
        <li><strong>再动推进</strong>：再投一次骰子。</li>
        <li><strong>跃迁舱</strong>：直接前往跃迁门（原“筋斗云”设定）。</li>
        <li><strong>暴矿脉冲</strong>：立即 +10 能量矿石。</li>
      </ul>`,
      score: `<ul>
        <li>多数挑战：按完成质量给 <strong>5~10</strong> 矿石（向下取整规则由导师掌握）。</li>
        <li>你演我猜：猜对 <strong>+10</strong>。</li>
        <li>金曲接龙：3 句 +5，6 句 +10。</li>
        <li>点击顶部「计分面板」可随时加减分、改队名。</li>
      </ul>
      <p class="hint">建议课堂投屏后，由助教专职操作计分弹窗。</p>`
    };
    els.ruleBody.innerHTML = map[state.ruleTab] || map.flow;
    $$('.rule-tab').forEach(t => t.classList.toggle('active', t.dataset.rule === state.ruleTab));
  }

  function bind() {
    $$('.nav-btn[data-view]').forEach(btn => btn.addEventListener('click', () => setView(btn.dataset.view)));
    $('#btnToGame')?.addEventListener('click', () => setView('game'));
    $('#btnOpenScore')?.addEventListener('click', () => { renderTeams(); openModal('scoreModal'); });
    $('#btnOpenScore2')?.addEventListener('click', () => { renderTeams(); openModal('scoreModal'); });
    $('#closeScore')?.addEventListener('click', () => closeModal('scoreModal'));
    $('#closeEvent')?.addEventListener('click', () => closeModal('eventModal'));

    $$('.rule-tab').forEach(tab => tab.addEventListener('click', () => {
      state.ruleTab = tab.dataset.rule;
      renderRules();
    }));

    $('#btnRoll')?.addEventListener('click', () => rollDice());
    $('#btnNext')?.addEventListener('click', () => nextTurn());
    $('#btnUseProp')?.addEventListener('click', useProp);
    $('#btnReset')?.addEventListener('click', () => {
      if (!confirm('确认重置本局进度？')) return;
      localStorage.removeItem('melt-city-monopoly');
      location.reload();
    });

    els.scoreGrid.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-score]');
      if (!btn) return;
      addOre(+btn.dataset.score, +btn.dataset.delta, '计分面板');
      renderTeams();
    });
    els.scoreGrid.addEventListener('change', (e) => {
      const input = e.target.closest('[data-rename]');
      if (!input) return;
      const i = +input.dataset.rename;
      DATA.teams[i].name = input.value.trim() || DATA.teams[i].name;
      renderAll();
    });

    // quick awards in score modal
    els.awardGrid.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-award]');
      if (!btn) return;
      const teamIndex = +$('#awardTeam').value;
      addOre(teamIndex, +btn.dataset.award, btn.dataset.reason || '快捷奖励');
      renderTeams();
    });

    // keyboard for classroom
    document.addEventListener('keydown', (e) => {
      if (e.key === 's' || e.key === 'S') { renderTeams(); openModal('scoreModal'); }
      if (e.key === 'Escape') { closeModal('scoreModal'); closeModal('eventModal'); }
      if (e.key === ' ' && state.view === 'game' && !state.rolling) {
        e.preventDefault();
        rollDice();
      }
    });

    // click backdrop to close
    ['scoreModal', 'eventModal'].forEach(id => {
      $(`#${id}`).addEventListener('click', (e) => {
        if (e.target.id === id) closeModal(id);
      });
    });
  }

  function init() {
    els.teamList = $('#teamList');
    els.board = $('#board');
    els.log = $('#logBox');
    els.toast = $('#toast');
    els.propSelect = $('#propSelect');
    els.targetSelect = $('#targetSelect');
    els.barrierSelect = $('#barrierSelect');
    els.turnLabel = $('#turnLabel');
    els.scoreGrid = $('#scoreGrid');
    els.awardGrid = $('#awardGrid');
    els.ruleBody = $('#ruleBody');
    els.eventTitle = $('#eventTitle');
    els.eventBadge = $('#eventBadge');
    els.eventBody = $('#eventBody');
    els.eventActions = $('#eventActions');

    load();
    bind();
    renderRules();
    renderAll();
    setView('intro');
    log('熔城系统上线：四域调频者已就位');
  }

  document.addEventListener('DOMContentLoaded', init);
})();
