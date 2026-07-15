(() => {
  const C = window.ZONE_CONTENT;
  const decks = Object.create(null);
  let currentKey = null;
  let currentItem = null;

  const timer = { remain: 0, total: 0, running: false, handle: null };

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function draw(poolKey) {
    const source = C[poolKey];
    if (!source?.length) return null;
    if (!decks[poolKey] || decks[poolKey].length === 0) {
      decks[poolKey] = shuffle(source.map((_, i) => i));
    }
    const idx = decks[poolKey].pop();
    return { item: source[idx], remain: decks[poolKey].length, total: source.length };
  }

  function formatTime(sec) {
    const s = Math.max(0, Math.ceil(sec));
    return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  }

  function stopTimer() {
    timer.running = false;
    if (timer.handle) {
      clearInterval(timer.handle);
      timer.handle = null;
    }
  }

  function paintTimer() {
    const display = $('#zTimerDisplay');
    const bar = $('#zTimerBar');
    if (display) {
      display.textContent = formatTime(timer.remain);
      display.classList.toggle('urgent', timer.remain <= 5 && timer.remain > 0);
      display.classList.toggle('done', timer.remain <= 0);
    }
    if (bar && timer.total > 0) {
      bar.style.width = `${Math.max(0, (timer.remain / timer.total) * 100)}%`;
    }
  }

  function setupTimer(seconds) {
    stopTimer();
    timer.total = seconds;
    timer.remain = seconds;
    paintTimer();
    $('#zBtnStart')?.addEventListener('click', () => {
      if (timer.running) return;
      if (timer.remain <= 0) timer.remain = timer.total;
      timer.running = true;
      timer.handle = setInterval(() => {
        timer.remain -= 0.1;
        if (timer.remain <= 0) {
          timer.remain = 0;
          paintTimer();
          stopTimer();
        } else paintTimer();
      }, 100);
    });
    $('#zBtnPause')?.addEventListener('click', stopTimer);
    $('#zBtnReset')?.addEventListener('click', () => {
      stopTimer();
      timer.remain = timer.total;
      paintTimer();
    });
    $('#zBtnSpeak')?.addEventListener('click', () => {
      const act = C.activities.find(a => a.key === currentKey);
      const sec = act?.speakSec || 30;
      stopTimer();
      timer.total = sec;
      timer.remain = sec;
      paintTimer();
      const label = $('#zTimerLabel');
      if (label) label.textContent = `单人解释 ${sec} 秒`;
    });
  }

  function showPanel(id) {
    $$('.z-panel').forEach(p => p.classList.toggle('active', p.id === id));
  }

  function renderHub() {
    const grid = $('#zoneGrid');
    grid.innerHTML = C.activities.map(a => `
      <button class="zone-card" data-key="${a.key}" style="--accent:${a.accent}">
        <div class="zone-card-kicker">${a.short}</div>
        <div class="zone-card-title">${a.title}</div>
        <p>${a.blurb}</p>
        <div class="zone-card-meta">计时 ${a.timerSec}s · ${a.scoreHint}</div>
      </button>
    `).join('');
    grid.querySelectorAll('.zone-card').forEach(btn => {
      btn.addEventListener('click', () => openActivity(btn.dataset.key));
    });
  }

  function materialHtml(act, drawn) {
    const item = drawn.item;
    if (act.key === 'garden') {
      return `<div class="mat-hero">${item}</div>
        <p class="mat-tip">30 秒内接龙说出该园概念的外延，每说一个 +1。</p>`;
    }
    if (act.key === 'feihua') {
      return `<div class="mat-hero">${item}</div>
        <p class="mat-tip">飞花令 / 诗词大赛共用主题。可先飞花 1 分钟，或改诗词模式延长至 2 分钟。</p>
        <div class="mat-extra-btns">
          <button type="button" class="z-btn" id="zBtnPoetryTimer">切换诗词计时 2 分钟</button>
        </div>`;
    }
    if (act.key === 'refute') {
      return `<div class="mat-claim">${item}</div>
        <p class="mat-tip">1 分钟内组织两层反驳；按完成度线性给分 +1～+8（步长 1）。</p>`;
    }
    if (act.key === 'aiDetect') {
      return `<div class="mat-label">${item.label}</div>
        <div class="mat-claim">${item.text}</div>
        <details class="mat-answer"><summary>显示答案（导师）</summary><p>标准答案：<strong>${item.answerLabel}</strong></p></details>
        <p class="mat-tip">1 分钟内鉴别人工 / AI；成功 +5。</p>`;
    }
    if (act.key === 'bluff') {
      return `<div class="mat-hero" style="font-size:clamp(24px,4vw,40px)">请发放线下概念卡牌</div>
        <p class="mat-tip">网页不展示词汇。准备 1 分钟后，点「解释 30 秒」切换单人计时；他组投票。</p>
        <div class="mat-extra-btns">
          <button type="button" class="z-btn accent" id="zBtnSpeak">切换：解释 30 秒</button>
        </div>`;
    }
    return '';
  }

  function openActivity(key, { keepItem = false } = {}) {
    const act = C.activities.find(a => a.key === key);
    if (!act) return;
    currentKey = key;
    stopTimer();

    let drawn = { item: null, remain: 0, total: 0 };
    if (act.poolKey) {
      if (keepItem && currentItem) {
        drawn = currentItem;
      } else {
        drawn = draw(act.poolKey);
        currentItem = drawn;
      }
    }

    const stage = $('#presentStage');
    const nextBtn = act.offlineCards || !act.poolKey
      ? ''
      : `<button class="z-btn accent" id="btnNextMat">下一素材（不重复）</button>`;
    const poolLabel = act.offlineCards
      ? '线下卡牌 · 不在网页展示词汇'
      : `${act.poolLabel} · 剩余 ${drawn.remain} / ${drawn.total}`;

    stage.innerHTML = `
      <div class="present-top" style="--accent:${act.accent}">
        <button class="z-btn" id="btnBackHub">← 返回总览</button>
        <div>
          <div class="present-kicker">${act.short}</div>
          <h2>${act.title}</h2>
        </div>
        ${nextBtn}
      </div>

      <div class="present-rule">
        <h3>规则介绍</h3>
        <p>${act.rule}</p>
        <p class="present-score">计分：${act.scoreHint}</p>
      </div>

      <div class="present-material">
        <div class="mat-pool-label">${poolLabel}</div>
        ${materialHtml(act, drawn)}
      </div>

      <div class="z-timer">
        <div class="z-timer-head">
          <span id="zTimerLabel">限时 ${act.timerSec} 秒</span>
          <span class="z-timer-display" id="zTimerDisplay">${formatTime(act.timerSec)}</span>
        </div>
        <div class="z-timer-track"><div class="z-timer-bar" id="zTimerBar" style="width:100%"></div></div>
        <div class="z-timer-btns">
          <button type="button" class="z-btn accent" id="zBtnStart">开始计时</button>
          <button type="button" class="z-btn" id="zBtnPause">暂停</button>
          <button type="button" class="z-btn" id="zBtnReset">重置</button>
        </div>
      </div>
    `;

    showPanel('panel-present');
    setupTimer(act.timerSec);

    $('#btnBackHub')?.addEventListener('click', () => {
      stopTimer();
      showPanel('panel-hub');
    });
    $('#btnNextMat')?.addEventListener('click', () => openActivity(key));
    $('#zBtnPoetryTimer')?.addEventListener('click', () => {
      stopTimer();
      timer.total = 120;
      timer.remain = 120;
      paintTimer();
      const label = $('#zTimerLabel');
      if (label) label.textContent = '诗词模式 2 分钟';
    });
  }

  function boot() {
    renderHub();
    $('#btnToHub')?.addEventListener('click', () => {
      stopTimer();
      showPanel('panel-hub');
    });
    $('#btnBackMain')?.addEventListener('click', () => {
      window.location.href = 'index.html';
    });

    const params = new URLSearchParams(location.search);
    const a = params.get('a') || params.get('activity');
    if (a && C.activities.some(x => x.key === a)) {
      openActivity(a);
    }
  }

  boot();
})();
