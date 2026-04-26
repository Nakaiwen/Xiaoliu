/*
  神農藥草園 V3.0 Final
  Clean JavaScript bundle

  整理內容：
  - 將原本內嵌於 shennong_herb_garden.html 的遊戲程式碼移出成獨立檔案
  - 保留 V3.0.13 Final 的種植、採收、成長、修心養性、本草札記與 localStorage 邏輯
  - 不改動遊戲功能，只整理檔案結構，方便後續維護
*/

const HERBS = [
      {
        id: "mint",
        name: "薄荷",
        emoji: "🌿",
        growSeconds: 30,
        coinMin: 5,
        coinMax: 12,
        expMin: 3,
        expMax: 6,
        unlockLevel: 1,
        tags: ["清涼", "醒神", "新手草"],
        desc: "薄荷清新舒爽，常用於茶飲與料理。種下薄荷，能為藥園帶來一陣清涼之氣。",
        imagePrefix: "mint"
      },
      {
        id: "mugwort",
        name: "艾草",
        emoji: "🌱",
        growSeconds: 60,
        coinMin: 8,
        coinMax: 18,
        expMin: 5,
        expMax: 9,
        unlockLevel: 1,
        tags: ["溫和", "辟穢", "養生"],
        desc: "艾草氣味溫厚，常見於民俗與養生應用。等待它成長，也像是在等待心緒安定。",
        imagePrefix: "mugwort"
      },
      {
        id: "radish",
        name: "白蘿蔔",
        emoji: "🥬",
        growSeconds: 90,
        coinMin: 10,
        coinMax: 22,
        expMin: 6,
        expMax: 11,
        unlockLevel: 2,
        tags: ["居家", "食材", "二級解鎖"],
        desc: "白蘿蔔是親切的居家食材，清爽平和，象徵日常生活中的調養與安定。",
        imagePrefix: "radish"
      },
      {
        id: "perilla",
        name: "紫蘇",
        emoji: "🍃",
        growSeconds: 120,
        coinMin: 14,
        coinMax: 28,
        expMin: 8,
        expMax: 15,
        unlockLevel: 3,
        tags: ["食養", "芳香", "三級解鎖"],
        desc: "紫蘇香氣獨特，常見於食材搭配。它提醒你，日常飲食之中，也藏著調養的智慧。",
        imagePrefix: "perilla"
      },
      {
        id: "licorice",
        name: "甘草",
        emoji: "🌾",
        growSeconds: 180,
        coinMin: 18,
        coinMax: 36,
        expMin: 10,
        expMax: 18,
        unlockLevel: 4,
        tags: ["調和", "甘味", "四級解鎖"],
        desc: "甘草味甘，有調和之意。藥園中的甘草象徵圓融與平衡。",
        imagePrefix: "licorice"
      },
      {
        id: "goji",
        name: "枸杞",
        emoji: "🫐",
        growSeconds: 300,
        coinMin: 26,
        coinMax: 50,
        expMin: 14,
        expMax: 26,
        unlockLevel: 5,
        tags: ["滋養", "茶飲", "五級解鎖"],
        desc: "枸杞常見於茶飲與湯品，象徵溫和滋養。它成長較慢，但收穫也更豐厚。",
        imagePrefix: "goji"
      },
      {
        id: "danshen",
        name: "丹蔘",
        emoji: "🌺",
        growSeconds: 420,
        coinMin: 34,
        coinMax: 65,
        expMin: 18,
        expMax: 34,
        unlockLevel: 6,
        tags: ["進階", "本草", "六級解鎖"],
        desc: "丹蔘色澤沉穩，是中後期的進階本草。種下丹蔘，象徵藥園主人更成熟的栽培功夫。",
        imagePrefix: "danshen"
      },
      {
        id: "lingzhi",
        name: "靈芝",
        emoji: "🍄",
        growSeconds: 600,
        coinMin: 50,
        coinMax: 100,
        expMin: 28,
        expMax: 55,
        unlockLevel: 8,
        tags: ["稀有", "祥瑞", "八級解鎖"],
        desc: "靈芝象徵祥瑞與長養。它需要更長時間成熟，適合耐心等待的園主。",
        imagePrefix: "lingzhi"
      }
    ];

    const SUTRA_LINES = [
      "觀自在菩薩",
      "行深般若波羅蜜多時",
      "照見五蘊皆空",
      "度一切苦厄",
      "色不異空",
      "空不異色",
      "色即是空",
      "空即是色",
      "受想行識",
      "亦復如是",
      "是諸法空相",
      "不生不滅"
    ];

    const TOUR_FACTS = [
      "薑：辛溫芳香，常用於茶飲與料理，天冷時可煮薑茶暖身。",
      "紅棗：味甘溫和，常見於甜湯與茶飲，適合做日常滋養食材。",
      "山藥：口感細緻，可煮湯、清炒或入粥，是溫和的家常食材。",
      "黑芝麻：香氣濃厚，常做成芝麻糊，適合喜歡溫潤甜品的人。",
      "蓮子：常用於粥品與甜湯，味道清雅，適合靜心品味。",
      "枸杞：常見於茶飲、湯品與粥品，顏色明亮，為料理增添溫和滋味。",
      "薄荷：清香醒腦，適合做成涼茶或加入甜點，但體質偏寒者宜適量。",
      "紫蘇：氣味芳香，可搭配料理，也能為藥園帶來明亮的綠意。",
      "白蘿蔔：清爽多汁，適合煮湯、燉煮或清炒，是很親切的居家食材。",
      "丹蔘：常見於本草文化中，適合在遊戲中作為進階藥草知識認識。"
    ];

    const MEDITATION_STEPS = [
      "放鬆肩膀，讓身體安住。感覺背脊自然挺直，雙手輕放。",
      "慢慢吸氣，感覺氣息從鼻尖進入。不要用力，只是溫柔覺察。",
      "慢慢吐氣，讓胸口與腹部鬆開。把心中的急躁交還給大地。",
      "觀想鼻尖一點微光。吸氣時微光明亮，吐氣時身心安穩。",
      "靜靜停留三息。完成後，將這份安定帶回藥草園。"
    ];

    const MAPS = [
      {
        id: "map1",
        name: "初階藥園",
        unlockLevel: 1,
        background: "assets/shennong/biggarden.png",
        plots: [
          { id: 0, name: "左上藥畦", image: "assets/shennong/plots/plot-empty.png" },
          { id: 1, name: "中上藥畦", image: "assets/shennong/plots/plot-empty.png" },
          { id: 2, name: "右上藥畦", image: "assets/shennong/plots/plot-empty.png" },
          { id: 3, name: "左下藥畦", image: "assets/shennong/plots/plot-empty.png" },
          { id: 4, name: "中下藥畦", image: "assets/shennong/plots/plot-empty.png" },
          { id: 5, name: "右下藥畦", image: "assets/shennong/plots/plot-empty.png" }
        ]
      }
    ];

    const DEFAULT_MAP_ID = "map1";
    const DEFAULT_PLOT_IMAGE = "assets/shennong/plots/plot-empty.png";

    const STORAGE_KEY = "xiaoliu_shennong_garden_v2_8_herbs";

    const initialState = () => ({
      level: 1,
      exp: 0,
      coins: 20,
      harvests: 0,
      sutraIndex: 0,
      activeMapId: DEFAULT_MAP_ID,
      plots: Array.from({ length: 6 }, (_, i) => ({
        id: i,
        herbId: null,
        plantedAt: null,
        growSeconds: null
      })),
      logs: [
        { time: Date.now(), text: "歡迎來到神農藥草園。先種下一株藥草，等待成熟後即可收穫。" }
      ]
    });

    let state = loadState();
    let selectedPlotId = null;
    let activeActivity = "meditate";
    let meditationIndex = 0;
    let plantTargetPlot = null;

    const $ = (id) => document.getElementById(id);

    function loadState() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return initialState();
        const parsed = JSON.parse(raw);
        if (!parsed.plots || parsed.plots.length !== 6) return initialState();
        return { ...initialState(), ...parsed };
      } catch {
        return initialState();
      }
    }

    function saveState() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }

    function expNeed(level = state.level) {
      return 80 + (level - 1) * 45;
    }

    function addLog(text) {
      state.logs.unshift({ time: Date.now(), text });
      state.logs = state.logs.slice(0, 18);
      saveState();
      renderLogs();
    }

    function toast(text) {
      const el = $("toast");
      el.textContent = text;
      el.classList.add("show");
      clearTimeout(toast._t);
      toast._t = setTimeout(() => el.classList.remove("show"), 2200);
    }

    function addExp(amount) {
      state.exp += amount;
      let leveled = false;
      while (state.exp >= expNeed()) {
        state.exp -= expNeed();
        state.level += 1;
        leveled = true;
      }
      if (leveled) {
        toast(`升級了！目前 ${state.level} 級`);
        addLog(`<b>園主升級</b>：你的藥園等級提升至 ${state.level} 級。`);
      }
    }

    function rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getHerb(id) {
      return HERBS.find(h => h.id === id);
    }

    function getActiveMap() {
      return MAPS.find(map => map.id === (state.activeMapId || DEFAULT_MAP_ID)) || MAPS[0];
    }

    function getPlotMeta(plotId) {
      const map = getActiveMap();
      return map.plots.find(plot => plot.id === plotId) || null;
    }

    function plotImageSrc(plotId) {
      const plotIndex = Number(plotId) + 1;
      if (plotIndex >= 1 && plotIndex <= 6) {
        return `assets/shennong/plots/plot-${plotIndex}-empty.png`;
      }
      return "assets/shennong/plots/plot-empty.png";
    }


    function herbStageNumber(progress) {
      if (progress >= 1) return 4;
      if (progress >= 0.68) return 3;
      if (progress >= 0.34) return 2;
      return 1;
    }

    function herbStageImage(herb, progress) {
      if (!herb || !herb.imagePrefix) return "";
      return `assets/shennong/herbs/${herb.imagePrefix}-stage-${herbStageNumber(progress)}.png`;
    }

    function herbDetailImage(herb) {
      if (!herb || !herb.imagePrefix) return "";
      return `assets/shennong/herbs/${herb.imagePrefix}-stage-4.png`;
    }

    function formatTime(seconds) {
      seconds = Math.max(0, Math.ceil(seconds));
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = seconds % 60;
      if (h > 0) return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
      return `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
    }

    function plotProgress(plot) {
      if (!plot.herbId || !plot.plantedAt) return 0;
      const elapsed = (Date.now() - plot.plantedAt) / 1000;
      return Math.min(1, elapsed / plot.growSeconds);
    }

    function isHarvestable(plot) {
      return plot.herbId && plotProgress(plot) >= 1;
    }

    function renderAll() {
      renderStats();
      renderGarden();
      renderDetail();
      renderActivity();
      renderLogs();
      saveState();
    }

    function renderStats() {
      $("level").textContent = state.level;
      $("coins").textContent = state.coins;
      $("exp").textContent = state.exp;
      $("expNeed").textContent = expNeed();
      $("expFill").style.width = `${Math.min(100, state.exp / expNeed() * 100)}%`;
    }

    function renderGarden() {
      const grid = $("gardenGrid");
      grid.innerHTML = "";

      state.plots.forEach(plot => {
        const herb = plot.herbId ? getHerb(plot.herbId) : null;
        const progress = plotProgress(plot);
        const harvestable = isHarvestable(plot);
        const stageNumber = herb ? herbStageNumber(progress) : 0;
        const plotMeta = getPlotMeta(plot.id);

        const div = document.createElement("article");
        div.className = `plot plot-slot-${plot.id + 1} ${harvestable ? "harvestable" : ""} ${herb ? "planted" : "empty"}`;
        div.dataset.id = String(plot.id);
        div.dataset.stage = String(stageNumber);
        div.dataset.harvestable = harvestable ? "1" : "0";
        div.title = harvestable ? "點擊藥草即可收穫" : "";
        div.innerHTML = `
          <div class="plot-inner">
            <div class="plot-tag">${herb ? herb.name : "未開墾"}</div>
            <div class="herb-stage">
              <div class="plot-art ${herb ? "has-herb" : ""} ${harvestable ? "harvest-ready" : ""}">
                <img class="plot-base-img" src="${plotImageSrc(plot.id)}" alt="${plotMeta?.name || '藥草園土地格'}">
                ${
                  herb && herb.imagePrefix
                    ? `<img class="herb-plant-img ${herb.id} stage-${stageNumber} ${harvestable ? "harvest-ready" : ""}" src="${herbStageImage(herb, progress)}" alt="${herb.name} 成長階段 ${stageNumber}">${stageNumber === 3 && !harvestable ? `<div class="preview-sparkles" aria-hidden="true"><span class="sparkle p1">✦</span><span class="sparkle p2">✦</span></div>` : ``}${harvestable ? `<div class="harvest-sparkles" aria-hidden="true"><span class="sparkle s1">✦</span><span class="sparkle s2">✦</span><span class="sparkle s3">✦</span><span class="sparkle s4">✦</span><span class="sparkle s5">✦</span></div>` : ``}`
                    : herb
                      ? `<div class="herb-emoji">${herb.emoji}</div>`
                      : `<div class="empty-sprout" aria-hidden="true"></div>`
                }
              </div>
            </div>
            <div class="plot-info">
              <div class="plot-time">${
                herb
                  ? harvestable
                    ? "可收穫"
                    : "藥草靜靜生長中"
                  : "點擊種植藥草"
              }</div>
              <div class="progress"><i style="width:${Math.round(progress * 100)}%"></i></div>
              <div class="plot-actions">
                ${
                  herb
                    ? harvestable
                      ? `` : ``
                    : ``
                }
              </div>
            </div>
          </div>
        `;
        grid.appendChild(div);
      });

      grid.querySelectorAll(".plot").forEach(plotEl => {
        plotEl.addEventListener("click", (event) => {
          if (event.target.closest("button")) return;
          const id = Number(plotEl.dataset.id);
          const plot = state.plots[id];
          if (!plot) return;
          if (isHarvestable(plot)) {
            harvest(id, plotEl);
            return;
          }
          if (!plot.herbId) {
            openPlantModal(id);
            return;
          }
          if (plot.herbId) {
            selectedPlotId = id;
            renderDetail();
          }
        });
      });

      grid.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", () => {
          const action = btn.dataset.action;
          const id = Number(btn.dataset.id);
          if (action === "plant") openPlantModal(id);
          if (action === "select") {
            selectedPlotId = id;
            renderDetail();
          }
          if (action === "harvest") harvest(id, btn.closest(".plot"));
        });
      });
    }


    function updateGardenProgress() {
      let needsFullRender = false;

      state.plots.forEach(plot => {
        const plotEl = document.querySelector(`.plot[data-id="${plot.id}"]`);
        if (!plotEl) {
          needsFullRender = true;
          return;
        }

        const herb = plot.herbId ? getHerb(plot.herbId) : null;
        const progress = plotProgress(plot);
        const harvestable = isHarvestable(plot);
        const stageNumber = herb ? herbStageNumber(progress) : 0;

        if (
          plotEl.dataset.stage !== String(stageNumber) ||
          plotEl.dataset.harvestable !== (harvestable ? "1" : "0")
        ) {
          needsFullRender = true;
          return;
        }

        const bar = plotEl.querySelector(".progress i");
        if (bar) {
          bar.style.width = `${Math.round(progress * 100)}%`;
        }
      });

      if (needsFullRender) {
        renderGarden();
      }
    }

    function renderDetail() {
      const plot = selectedPlotId !== null ? state.plots[selectedPlotId] : state.plots.find(p => p.herbId) || null;
      const herb = plot?.herbId ? getHerb(plot.herbId) : null;

      if (!herb) {
        $("selectedStatus").textContent = "尚未選取";
        $("detailEmoji").innerHTML = `<img class="detail-main-img" src="assets/shennong/shennong-herb-garden-main-illustration.png" alt="神農藥草園主視覺插圖">`;
        $("detailName").textContent = "藥草";
        $("detailTags").innerHTML = "";
        $("detailText").textContent = "請點擊藥園中的藥草，查看成長狀態與本草介紹。";
        return;
      }

      const progress = plotProgress(plot);
      $("selectedStatus").textContent = isHarvestable(plot) ? "可收穫" : `成長中 ${Math.round(progress * 100)}%`;
      $("detailEmoji").innerHTML = herb.imagePrefix
        ? `<img class="detail-herb-img" src="${herbDetailImage(herb)}" alt="${herb.name} 本草圖">`
        : herb.emoji;
      $("detailName").textContent = herb.name;
      $("detailTags").innerHTML = herb.tags.map(t => `<span class="tag">${t}</span>`).join("");
      $("detailText").innerHTML = `
        ${herb.desc}<br>
        成長時間：${formatTime(herb.growSeconds)}。<br>
        預估收穫：金幣 ${herb.coinMin}～${herb.coinMax}，經驗 ${herb.expMin}～${herb.expMax}。
      `;
    }

    function openPlantModal(plotId = null) {
      plantTargetPlot = plotId ?? state.plots.find(p => !p.herbId)?.id ?? 0;
      const menu = $("plantMenu");
      menu.innerHTML = "";

      HERBS.forEach(herb => {
        const locked = state.level < herb.unlockLevel;
        const row = document.createElement("div");
        row.className = "plant-choice";
        row.innerHTML = `
          <span>
            ${
              herb.imagePrefix
                ? `<img class="plant-choice-thumb" src="${herbDetailImage(herb)}" alt="${herb.name}">`
                : `<b style="font-size:1.8rem">${herb.emoji}</b>`
            }
            <span>
              <b>${herb.name}</b><br>
              <small>${formatTime(herb.growSeconds)}成熟｜${herb.unlockLevel}級解鎖</small>
            </span>
          </span>
          <button class="btn ${locked ? "btn-soft" : "btn-green"}" ${locked ? "disabled" : ""} data-herb="${herb.id}">
            ${locked ? "未解鎖" : "種植"}
          </button>
        `;
        menu.appendChild(row);
      });

      menu.querySelectorAll("button[data-herb]").forEach(btn => {
        btn.addEventListener("click", () => plantHerb(plantTargetPlot, btn.dataset.herb));
      });

      $("plantModal").classList.add("show");
      $("plantModal").setAttribute("aria-hidden", "false");
    }

    function closePlantModal() {
      $("plantModal").classList.remove("show");
      $("plantModal").setAttribute("aria-hidden", "true");
    }

    function plantHerb(plotId, herbId) {
      const plot = state.plots[plotId];
      const herb = getHerb(herbId);
      if (!plot || !herb) return;
      if (state.level < herb.unlockLevel) return toast("等級尚未解鎖此藥草");
      if (plot.herbId) return toast("此地已有藥草");

      plot.herbId = herb.id;
      plot.plantedAt = Date.now();
      plot.growSeconds = herb.growSeconds;
      selectedPlotId = plotId;
      addLog(`你種下了 <b>${herb.name}</b>，靜待它順時而長。`);
      toast(`已種下 ${herb.name}`);
      closePlantModal();
      renderAll();
    }


    function playHarvestEffect(anchorEl, coins, exp) {
      const source = anchorEl?.querySelector(".herb-plant-img") || anchorEl?.querySelector(".plot-art") || anchorEl;
      const rect = source?.getBoundingClientRect?.();
      if (!rect) return;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const layer = document.createElement("div");
      layer.className = "harvest-fx-layer";

      const burst = document.createElement("div");
      burst.className = "harvest-burst";
      burst.style.left = `${centerX}px`;
      burst.style.top = `${centerY}px`;

      const sparkleCount = 28;
      const sparkles = Array.from({ length: sparkleCount }, (_, index) => {
        const angle = (Math.PI * 2 * index) / sparkleCount;
        const radius = 46 + (index % 5) * 11;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius * 0.78;
        const delay = (index % 7) * 0.018;
        const size = 15 + (index % 4) * 3;
        const scale = 0.82 + (index % 5) * 0.08;
        const duration = 0.82 + (index % 6) * 0.045;

        return `<span class="harvest-fx-sparkle" style="--x:${x.toFixed(1)}px; --y:${y.toFixed(1)}px; --delay:${delay.toFixed(2)}s; --size:${size}px; --scale:${scale.toFixed(2)}; --dur:${duration.toFixed(2)}s;" aria-hidden="true">✦</span>`;
      }).join("");

      burst.innerHTML = `
        <div class="harvest-burst-core" aria-hidden="true"></div>
        <div class="harvest-spark-burst" aria-hidden="true">${sparkles}</div>
        <div class="harvest-float-text" aria-hidden="true">
          <div class="harvest-reward coins">金幣 +${coins}</div>
          <div class="harvest-reward exp">經驗值 +${exp}</div>
        </div>
      `;

      layer.appendChild(burst);
      document.body.appendChild(layer);

      window.setTimeout(() => {
        layer.remove();
      }, 1250);
    }

    function harvest(plotId, anchorEl = null) {
      const plot = state.plots[plotId];
      const herb = getHerb(plot.herbId);
      if (!plot || !herb || !isHarvestable(plot)) return;

      const coins = rand(herb.coinMin, herb.coinMax);
      const exp = rand(herb.expMin, herb.expMax);

      playHarvestEffect(anchorEl || document.querySelector(`.plot[data-id="${plotId}"]`), coins, exp);

      state.coins += coins;
      addExp(exp);
      state.harvests += 1;

      plot.herbId = null;
      plot.plantedAt = null;
      plot.growSeconds = null;

      addLog(`恭喜收穫 <b>${herb.name}</b>！獲得 🪙 ${coins}、經驗值 ${exp}。`);
      toast(`收穫 ${herb.name}：金幣 +${coins}，經驗 +${exp}`);
      renderAll();
    }

    function renderActivity() {
      const panel = $("activityPanel");
      document.querySelectorAll(".activity-option").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.activity === activeActivity);
      });

      if (activeActivity === "meditate") {
        panel.innerHTML = `
          <h3>打坐冥想</h3>
          <div class="breath-orb">吸氣</div>
          <div class="meditation-step">${MEDITATION_STEPS[meditationIndex]}</div>
          <button id="nextMeditationBtn" class="btn btn-green">${meditationIndex >= MEDITATION_STEPS.length - 1 ? "完成冥想" : "下一步"}</button>
        `;
        $("nextMeditationBtn").addEventListener("click", () => {
          if (meditationIndex < MEDITATION_STEPS.length - 1) {
            meditationIndex++;
            renderActivity();
          } else {
            meditationIndex = 0;
            addExp(4);
            state.coins += 1;
            addLog("完成一次 <b>打坐冥想</b>，獲得經驗值 4、金幣 1。");
            toast("冥想完成：經驗 +4，金幣 +1");
            renderAll();
          }
        });
      }

      if (activeActivity === "sutra") {
        const line = SUTRA_LINES[state.sutraIndex % SUTRA_LINES.length];
        panel.innerHTML = `
          <h3>抄經</h3>
          <div class="sutra-guide">${line}</div>
          <textarea id="sutraInput" class="sutra-input" placeholder="請依照上方淡字輸入"></textarea>
          <div class="tiny-actions">
            <button id="submitSutraBtn" class="btn btn-green">確認提交</button>
            <button id="clearSutraBtn" class="btn btn-outline">清除</button>
          </div>
        `;
        $("submitSutraBtn").addEventListener("click", () => {
          const input = $("sutraInput").value.trim().replace(/\s/g, "");
          const target = line.replace(/\s/g, "");
          if (input !== target) return toast("文字尚未完全符合，請再確認一次");
          state.sutraIndex++;
          state.coins += 2;
          addExp(5);
          addLog(`完成抄寫：<b>${line}</b>。獲得金幣 2、經驗值 5。`);
          toast("抄經完成：金幣 +2，經驗 +5");
          renderAll();
        });
        $("clearSutraBtn").addEventListener("click", () => $("sutraInput").value = "");
      }

      if (activeActivity === "tour") {
        const fact = TOUR_FACTS[rand(0, TOUR_FACTS.length - 1)];
        panel.innerHTML = `
          <h3>參觀藥園</h3>
          <div id="tourFact" class="tour-fact">${fact}</div>
          <div class="tiny-actions">
            <button id="newFactBtn" class="btn btn-green">再看一則</button>
          </div>
        `;
        $("newFactBtn").addEventListener("click", () => {
          const f = TOUR_FACTS[rand(0, TOUR_FACTS.length - 1)];
          $("tourFact").textContent = f;
          const exp = 3;
          const coins = rand(1, 3);
          state.coins += coins;
          addExp(exp);
          addLog(`參觀藥園，獲得養生知識，也獲得金幣 ${coins}、經驗值 ${exp}。`);
          toast(`參觀完成：金幣 +${coins}，經驗 +${exp}`);
          renderAll();
        });
      }
    }

    function renderLogs() {
      const list = $("logList");
      if (!state.logs.length) {
        list.innerHTML = `<div class="log-item">尚無訊息。</div>`;
        return;
      }
      list.innerHTML = state.logs.map(log => {
        const d = new Date(log.time);
        const time = `${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;
        return `<div class="log-item"><small>${time}</small><br>${log.text}</div>`;
      }).join("");
    }

    document.querySelectorAll(".activity-option").forEach(btn => {
      btn.addEventListener("click", () => {
        activeActivity = btn.dataset.activity;
        if (activeActivity !== "meditate") meditationIndex = 0;
        renderActivity();
      });
    });

    $("plantFirstBtn").addEventListener("click", () => {
      const empty = state.plots.find(p => !p.herbId);
      if (!empty) return toast("目前沒有空地，請先收穫成熟藥草");
      openPlantModal(empty.id);
    });

    $("closeModalBtn").addEventListener("click", closePlantModal);
    $("plantModal").addEventListener("click", (e) => {
      if (e.target.id === "plantModal") closePlantModal();
    });

    $("resetBtn").addEventListener("click", () => {
      if (!confirm("確定要清除目前本機遊戲紀錄嗎？")) return;
      state = initialState();
      selectedPlotId = null;
      meditationIndex = 0;
      saveState();
      renderAll();
      toast("已重置藥草園");
    });

    setInterval(() => {
      renderStats();
      updateGardenProgress();
      renderDetail();
    }, 1000);

    renderAll();
