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
        imagePrefix: "mint",
        mapId: "map1"
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
        imagePrefix: "mugwort",
        mapId: "map1"
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
        imagePrefix: "radish",
        mapId: "map1"
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
        imagePrefix: "perilla",
        mapId: "map1"
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
        imagePrefix: "licorice",
        mapId: "map1"
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
        imagePrefix: "goji",
        mapId: "map1"
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
        imagePrefix: "danshen",
        mapId: "map1"
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
        imagePrefix: "lingzhi",
        mapId: "map1"
      },
      {
        id: "honeysuckle",
        name: "金銀花",
        emoji: "🌼",
        growSeconds: 360,
        coinMin: 16,
        coinMax: 22,
        expMin: 18,
        expMax: 24,
        unlockLevel: 8,
        tags: ["花草", "茶飲", "山谷藥圃"],
        desc: "金銀花花色初白後黃，常見於茶飲與本草文化。它象徵山谷中清潤的氣息，也提醒人保持清明。",
        imagePrefix: "honeysuckle",
        mapId: "map2"
      },
      {
        id: "houttuynia",
        name: "魚腥草",
        emoji: "🌿",
        growSeconds: 480,
        coinMin: 20,
        coinMax: 28,
        expMin: 22,
        expMax: 28,
        unlockLevel: 8,
        tags: ["野菜", "青草茶", "醫食同源"],
        desc: "魚腥草喜濕潤陰地，常見於溪邊與山谷角落。它帶有特殊氣味，提醒人們真正有用之物不一定討喜。",
        imagePrefix: "houttuynia",
        mapId: "map2"
      },
      {
        id: "yam",
        name: "山藥",
        emoji: "🍠",
        growSeconds: 600,
        coinMin: 26,
        coinMax: 36,
        expMin: 28,
        expMax: 36,
        unlockLevel: 9,
        tags: ["食補", "根莖", "醫食同源"],
        desc: "山藥質地潔白，常入湯羹與清炒。日常餐桌上的食材，也能承載本草智慧。",
        imagePrefix: "yam",
        mapId: "map2"
      },
      {
        id: "lilybulb",
        name: "百合",
        emoji: "🤍",
        growSeconds: 840,
        coinMin: 32,
        coinMax: 44,
        expMin: 36,
        expMax: 46,
        unlockLevel: 9,
        tags: ["清潤", "甜湯", "醫食同源"],
        desc: "百合瓣片潔白如玉，可入粥、入湯，也能安定心緒。它是山谷藥圃裡最溫柔的食養植物之一。",
        imagePrefix: "lilybulb",
        mapId: "map2"
      },
      {
        id: "astragalus",
        name: "黃耆",
        emoji: "🌾",
        growSeconds: 1020,
        coinMin: 38,
        coinMax: 52,
        expMin: 42,
        expMax: 54,
        unlockLevel: 10,
        tags: ["補氣", "湯品", "醫食同源"],
        desc: "黃耆根性堅實，常見於湯品與茶飲。它象徵正氣的積累，也提醒玩家慢慢養成才會深厚。",
        imagePrefix: "astragalus",
        mapId: "map2"
      },
      {
        id: "chuanxiong",
        name: "川芎",
        emoji: "🌱",
        growSeconds: 1200,
        coinMin: 44,
        coinMax: 60,
        expMin: 50,
        expMax: 64,
        unlockLevel: 11,
        tags: ["山谷", "本草", "進階藥材"],
        desc: "川芎生於山地濕潤之處，氣味辛香，走而不滯。它象徵讓凝結的念頭重新流動，如山谷中穿石而過的溪水。",
        imagePrefix: "chuanxiong",
        mapId: "map2"
      },
      {
        id: "fleeceflower",
        name: "何首烏",
        emoji: "🍂",
        growSeconds: 1620,
        coinMin: 64,
        coinMax: 82,
        expMin: 68,
        expMax: 88,
        unlockLevel: 12,
        tags: ["滋補", "藤蔓", "高階藥材"],
        desc: "何首烏藤蔓纏繞，根形沉厚，象徵時間沉澱後的生命力，是山谷藥圃後段的珍貴本草。",
        imagePrefix: "fleeceflower",
        mapId: "map2"
      },
      {
        id: "snowlotus",
        name: "天山雪蓮",
        emoji: "🏔️",
        growSeconds: 2640,
        coinMin: 100,
        coinMax: 128,
        expMin: 110,
        expMax: 145,
        unlockLevel: 15,
        tags: ["稀有", "靈草", "雪域"],
        desc: "天山雪蓮生於高寒山域，花色清冷而靈秀。它象徵逆境中仍能盛放的心性。",
        imagePrefix: "snowlotus",
        mapId: "map2"
      },
      {
        id: "scallion",
        name: "青蔥",
        emoji: "🌱",
        growSeconds: 900,
        coinMin: 32,
        coinMax: 42,
        expMin: 46,
        expMax: 58,
        unlockLevel: 15,
        tags: ["灶香", "辛香", "醫食同源"],
        desc: "青蔥是灶間常見的辛香食材，細長青葉入鍋，能喚醒一餐的香氣，也象徵日常中的養生智慧。",
        imagePrefix: "scallion",
        mapId: "map3"
      },
      {
        id: "garlic",
        name: "大蒜",
        emoji: "🧄",
        growSeconds: 960,
        coinMin: 34,
        coinMax: 46,
        expMin: 48,
        expMax: 60,
        unlockLevel: 15,
        tags: ["灶香", "辛香", "食養"],
        desc: "大蒜氣味辛烈，是廚房與食養中常見的基礎食材。它提醒玩家，日常飲食也能蘊藏本草之道。",
        imagePrefix: "garlic",
        mapId: "map3"
      },
      {
        id: "chive",
        name: "韭菜",
        emoji: "🌿",
        growSeconds: 1020,
        coinMin: 36,
        coinMax: 50,
        expMin: 50,
        expMax: 64,
        unlockLevel: 16,
        tags: ["灶香", "家常", "辛香"],
        desc: "韭菜葉色青翠，常見於家常料理。它帶著灶邊煙火氣，也象徵生命力的綿長生發。",
        imagePrefix: "chive",
        mapId: "map3"
      },
      {
        id: "basil",
        name: "九層塔",
        emoji: "🌿",
        growSeconds: 1080,
        coinMin: 38,
        coinMax: 54,
        expMin: 54,
        expMax: 68,
        unlockLevel: 17,
        tags: ["香草", "料理", "灶香"],
        desc: "九層塔葉香濃郁，入菜後香氣鮮明。它讓灶香藥田多了一份活潑的香草氣息。",
        imagePrefix: "basil",
        mapId: "map3"
      },
      {
        id: "coriander",
        name: "香菜",
        emoji: "🌱",
        growSeconds: 1140,
        coinMin: 40,
        coinMax: 56,
        expMin: 58,
        expMax: 72,
        unlockLevel: 18,
        tags: ["清香", "食材", "醫食同源"],
        desc: "香菜葉形細緻，氣味清揚，是許多料理最後一筆香氣。它象徵細微而不可忽略的調和之力。",
        imagePrefix: "coriander",
        mapId: "map3"
      },
      {
        id: "ginger",
        name: "生薑",
        emoji: "🫚",
        growSeconds: 1320,
        coinMin: 46,
        coinMax: 62,
        expMin: 66,
        expMax: 82,
        unlockLevel: 19,
        tags: ["溫養", "食療", "根莖"],
        desc: "生薑辛香溫潤，常入湯飲與料理。它代表灶間的暖意，也呼應食養中的調理智慧。",
        imagePrefix: "ginger",
        mapId: "map3"
      },
      {
        id: "chili",
        name: "辣椒",
        emoji: "🌶️",
        growSeconds: 1380,
        coinMin: 50,
        coinMax: 66,
        expMin: 70,
        expMax: 88,
        unlockLevel: 20,
        tags: ["辛香", "醒味", "灶香"],
        desc: "辣椒色澤鮮明，辛香醒味，是灶香藥田中的亮色。它象徵熱度、活力與料理中的一點火候。",
        imagePrefix: "chili",
        mapId: "map3"
      },
      {
        id: "corn",
        name: "玉米",
        emoji: "🌽",
        growSeconds: 1620,
        coinMin: 60,
        coinMax: 80,
        expMin: 84,
        expMax: 104,
        unlockLevel: 22,
        tags: ["穀物", "食養", "高階作物"],
        desc: "玉米穗實飽滿，是日常穀物與食養作物。它讓灶香藥田多了豐收感，也象徵土地的厚實供養。",
        imagePrefix: "corn",
        mapId: "map3"
      },
      {
        id: "mulberryleaf",
        name: "桑葉",
        emoji: "🍃",
        growSeconds: 2700,
        coinMin: 72,
        coinMax: 88,
        expMin: 48,
        expMax: 60,
        unlockLevel: 22,
        tags: ["清潤", "茶飲", "桃源藥谷"],
        desc: "桑葉葉脈清晰，氣息清潤，像桃源谷中拂過的微風。它是第四章初入藥谷時最親切的花葉藥草。",
        imagePrefix: "mulberryleaf",
        mapId: "map4"
      },
      {
        id: "chrysanthemum",
        name: "菊花",
        emoji: "🌼",
        growSeconds: 2880,
        coinMin: 76,
        coinMax: 94,
        expMin: 50,
        expMax: 64,
        unlockLevel: 22,
        tags: ["花茶", "清雅", "桃源藥谷"],
        desc: "菊花色澤淡雅，花瓣層層舒展。它讓桃源藥谷多了一份清明與安定，也適合日後做成花草茶食譜。",
        imagePrefix: "chrysanthemum",
        mapId: "map4"
      },
      {
        id: "jujube",
        name: "紅棗",
        emoji: "🔴",
        growSeconds: 3300,
        coinMin: 84,
        coinMax: 106,
        expMin: 56,
        expMax: 70,
        unlockLevel: 23,
        tags: ["食養", "甜湯", "果實"],
        desc: "紅棗果色溫潤，是常見的食養食材。它為桃源藥谷添上一點暖紅，也讓清潤花草多了生活滋味。",
        imagePrefix: "jujube",
        mapId: "map4"
      },
      {
        id: "osmanthus",
        name: "桂花",
        emoji: "🌼",
        growSeconds: 3900,
        coinMin: 94,
        coinMax: 118,
        expMin: 64,
        expMax: 78,
        unlockLevel: 24,
        tags: ["花香", "茶飲", "甜品"],
        desc: "桂花花小而香，金黃點點藏在綠葉之間。它適合做茶飲與甜湯，也讓桃源藥谷飄起一縷秋香。",
        imagePrefix: "osmanthus",
        mapId: "map4"
      },
      {
        id: "solomonseal",
        name: "玉竹",
        emoji: "🌱",
        growSeconds: 4320,
        coinMin: 104,
        coinMax: 132,
        expMin: 70,
        expMax: 88,
        unlockLevel: 25,
        tags: ["清補", "潤養", "根莖"],
        desc: "玉竹葉姿柔雅，根莖溫潤如玉。它象徵不急不躁的滋養，是桃源藥谷中安靜生長的清補藥草。",
        imagePrefix: "solomonseal",
        mapId: "map4"
      },
      {
        id: "ophiopogon",
        name: "麥門冬",
        emoji: "🌾",
        growSeconds: 4800,
        coinMin: 116,
        coinMax: 148,
        expMin: 78,
        expMax: 96,
        unlockLevel: 26,
        tags: ["潤燥", "生津", "清泉"],
        desc: "麥門冬葉叢細長，像谷中清泉旁的綠意。它帶著潤燥生津的意象，適合慢慢培養。",
        imagePrefix: "ophiopogon",
        mapId: "map4"
      },
      {
        id: "peonyroot",
        name: "芍藥",
        emoji: "🌺",
        growSeconds: 5400,
        coinMin: 132,
        coinMax: 168,
        expMin: 90,
        expMax: 112,
        unlockLevel: 27,
        tags: ["花草", "柔養", "桃源"],
        desc: "芍藥花色明麗，根部亦有藥用意象。它是桃源藥谷後段的華美花草，象徵柔中有力的調養。",
        imagePrefix: "peonyroot",
        mapId: "map4"
      },
      {
        id: "peachblossom",
        name: "桃花",
        emoji: "🌸",
        growSeconds: 6600,
        coinMin: 160,
        coinMax: 205,
        expMin: 110,
        expMax: 138,
        unlockLevel: 29,
        tags: ["桃源", "壓軸", "花木"],
        desc: "桃花是桃源藥谷的代表植物。當它在谷中盛放，也象徵玩家終於遇見這片世外桃源最核心的風景。",
        imagePrefix: "peachblossom",
        mapId: "map4"
      }

    ];

    const RECIPES = [
      {
        id: "scallion-ginger-soup",
        name: "青蔥薑湯",
        category: "湯品",
        unlockLevel: 1,
        requiredHerbs: ["scallion"],
        optionalHerbs: ["ginger"],
        difficulty: 1,
        timeText: "約 10 分鐘",
        tools: ["小鍋"],
        beginnerTags: ["新手友善", "一鍋完成", "不用油"],
        seasonGroups: ["春生", "冬藏"],
        solarTerms: ["立春", "雨水", "驚蟄", "立冬", "小雪", "冬至"],
        benefitLabel: "溫中散寒",
        suitableText: "適合｜雨後微涼時",
        ingredients: ["青蔥", "薑", "水", "少許鹽"],
        gameSteps: [
          "洗淨青蔥與生薑，讓食材帶著清香醒來。",
          "將生薑切片，青蔥切段，備在小碟中。",
          "清水入鍋，小火煮出薑的暖香。",
          "放入青蔥稍煮，湯氣升起，即可完成。"
        ],
        realRecipe: {
          ingredients: [
            "青蔥 1～2 支",
            "生薑 3～5 片",
            "水 500 ml",
            "鹽少許，可不加"
          ],
          steps: [
            "青蔥洗淨切段，生薑洗淨切片。",
            "水煮滾後放入生薑，小火煮 5～8 分鐘。",
            "加入青蔥，再煮 1～2 分鐘。",
            "關火後稍微放溫即可飲用。"
          ]
        },
        effects: ["發汗散寒", "暖胃暖身", "舒緩初起受寒不適"],
        note: "春雨微寒，宜以辛溫輕食養身。",
        rewardExp: 20,
        rewardCoins: 12,
        backgroundImage: "assets/shennong/kitchen/backgrounds/kitchen-bg-main_afternoon.jpg",
        image: "assets/shennong/kitchen/recipes/recipe-scallion-ginger-soup.jpg",
        dishImage: "assets/shennong/kitchen/recipes/dish-scallion-ginger-soup.png",
        ingredientImages: [
          { id: "scallion", name: "青蔥", image: "assets/shennong/kitchen/ingredients/ingredient-scallion.png" },
          { id: "ginger", name: "薑", image: "assets/shennong/kitchen/ingredients/ingredient-ginger.png" }
        ]
      }
    ];

    let activeRecipeId = "scallion-ginger-soup";
    let kitchenStepIndex = 0;
    let kitchenViewMode = "cook";
    let kitchenSceneState = createKitchenSceneState();

    function createKitchenSceneState() {
      return {
        addedIngredients: [],
        animatingIngredients: [],
        potReady: false,
        bursting: false,
        dishReady: false
      };
    }

    function resetKitchenScene() {
      kitchenSceneState = createKitchenSceneState();
    }


    const SOLAR_TERMS = [
      { name: "小寒", date: "01-05", season: "冬藏", message: "寒氣漸深，藥園靜養根氣。" },
      { name: "大寒", date: "01-20", season: "冬藏", message: "寒至極處，靜待春意回生。" },
      { name: "立春", date: "02-04", season: "春生", message: "春氣初動，萬物準備甦醒。" },
      { name: "雨水", date: "02-19", season: "春生", message: "甘霖入土，藥苗舒展新葉。" },
      { name: "驚蟄", date: "03-05", season: "春生", message: "春雷喚醒沉睡的生命，藥園開始萌動。" },
      { name: "春分", date: "03-20", season: "春生", message: "晝夜平衡，心也回到中道。" },
      { name: "清明", date: "04-04", season: "春生", message: "天地清朗，草木向陽而生。" },
      { name: "穀雨", date: "04-20", season: "春生", message: "雨生百穀，藥園更添生機。" },
      { name: "立夏", date: "05-05", season: "夏長", message: "夏氣初臨，葉色漸濃。" },
      { name: "小滿", date: "05-21", season: "夏長", message: "萬物漸盈，藥草靜靜舒展。" },
      { name: "芒種", date: "06-05", season: "夏長", message: "有芒之種順時而生，勤耕也要安住身心。" },
      { name: "夏至", date: "06-21", season: "夏長", message: "日光最盛，草木蓄滿生長之力。" },
      { name: "小暑", date: "07-07", season: "夏長", message: "暑氣漸起，藥園需要一份清涼心。" },
      { name: "大暑", date: "07-23", season: "夏長", message: "盛暑之中，靜心如蔭。" },
      { name: "立秋", date: "08-07", season: "秋收", message: "秋意初生，收斂也是一種滋養。" },
      { name: "處暑", date: "08-23", season: "秋收", message: "暑氣漸退，藥草氣息轉為沉穩。" },
      { name: "白露", date: "09-07", season: "秋收", message: "晨露滋潤，葉間藏著清明。" },
      { name: "秋分", date: "09-23", season: "秋收", message: "晝夜再次平衡，收穫與休息同樣重要。" },
      { name: "寒露", date: "10-08", season: "秋收", message: "露氣轉寒，藥草把力量收回根中。" },
      { name: "霜降", date: "10-23", season: "秋收", message: "霜意初降，成熟的光芒更顯珍貴。" },
      { name: "立冬", date: "11-07", season: "冬藏", message: "冬氣初臨，萬物準備收藏。" },
      { name: "小雪", date: "11-22", season: "冬藏", message: "細雪未深，靜養心氣。" },
      { name: "大雪", date: "12-07", season: "冬藏", message: "雪意漸盛，藥園安靜沉澱。" },
      { name: "冬至", date: "12-21", season: "冬藏", message: "一陽來復，深冬裡藏著新生。" }
    ];

    function solarDateForYear(term, year) {
      const [month, day] = term.date.split("-").map(Number);
      return new Date(year, month - 1, day);
    }

    function getSolarTermInfo(now = new Date()) {
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const year = today.getFullYear();
      let current = SOLAR_TERMS[SOLAR_TERMS.length - 1];
      let currentDate = solarDateForYear(current, year - 1);
      let next = SOLAR_TERMS[0];
      let nextDate = solarDateForYear(next, year);

      for (let i = 0; i < SOLAR_TERMS.length; i++) {
        const termDate = solarDateForYear(SOLAR_TERMS[i], year);
        const following = SOLAR_TERMS[(i + 1) % SOLAR_TERMS.length];
        const followingDate = i === SOLAR_TERMS.length - 1
          ? solarDateForYear(following, year + 1)
          : solarDateForYear(following, year);

        if (today >= termDate) {
          current = SOLAR_TERMS[i];
          currentDate = termDate;
          next = following;
          nextDate = followingDate;
        }
      }

      const daysToNext = Math.max(0, Math.ceil((nextDate - today) / 86400000));
      return { current, currentDate, next, nextDate, daysToNext };
    }

    function renderSolarTerm() {
      const nameEl = $("solarTermName");
      if (!nameEl) return;
      const info = getSolarTermInfo();
      $("solarTermSeason").textContent = info.current.season;
      $("solarTermName").textContent = info.current.name;
      $("solarTermMessage").textContent = info.current.message;
      $("solarTermNext").textContent = `距離下一節氣「${info.next.name}」約 ${info.daysToNext} 天。自然只給祝福，不造成收成損失。`;
    }


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

    // ======================================================
    // V3.3.7.3：測試模式快速版
    // - 開啟方式：網址加 ?test=1
    // - 縮短所有天氣等待與持續時間，方便開發測試
    // - 視覺風格、動畫速度、機率完全不變
    // - 右上角會顯示 🧪 測試模式 角標
    // ======================================================
    const TEST_MODE = (() => {
      try {
        const params = new URLSearchParams(window.location.search);
        return params.get("test") === "1";
      } catch (error) {
        return false;
      }
    })();

    // 等比縮約 10 倍的尺度
    const TEST_MODE_SCALE = 10;

    // 依測試模式回傳對應毫秒數
    function timeMs(normalMs) {
      return TEST_MODE ? Math.round(normalMs / TEST_MODE_SCALE) : normalMs;
    }

    const SPRING_RAIN_SETTINGS = {
      lineLength: 20,
      lineWidth: 1,
      spreadX: 32,
      spreadY: 16,
      streaksPerGroup: 6,
      backGroupCount: 60,
      frontGroupCount: 80,
      backDuration: [2.5, 3.5],
      frontDuration: [1.0, 2.0]
    };

    const SPRING_RAIN_RANDOM = {
      durationMs: timeMs(5 * 60 * 1000),
      firstDelayMinMs: timeMs(20 * 1000),
      firstDelayMaxMs: timeMs(80 * 1000),
      nextDelayMinMs: timeMs(6 * 60 * 1000),
      nextDelayMaxMs: timeMs(16 * 60 * 1000)
    };

    const SPRING_RAIN_STORAGE_KEY = "xiaoliu_shennong_spring_rain_v1";

    const POST_RAIN_RAINBOW = {
      showChance: 1,
      durationMs: timeMs(60 * 1000)
    };

    // V3.3.7.2：桃花雨設定（map4 桃源藥谷專屬天氣）
    // - 取代春雨在第四章的角色
    // - 觸發機制完全比照春雨，玩家熟悉的節奏感
    // - 與春雨永不同框：兩者各管各的地圖
    // V3.3.7.8：花瓣動畫時長延長 1.6 倍（12-22s → 22-36s），更慢更療癒
    const PEACH_PETAL_SETTINGS = {
      desktopCount: 14,
      mobileCount: 7,
      mobileBreakpoint: 720,
      durationMinS: 22,
      durationMaxS: 36,
      delayMinS: 0,
      delayMaxS: 10
    };

    const PEACH_PETAL_RANDOM = {
      durationMs: timeMs(4 * 60 * 1000),
      firstDelayMinMs: timeMs(20 * 1000),
      firstDelayMaxMs: timeMs(80 * 1000),
      nextDelayMinMs: timeMs(6 * 60 * 1000),
      nextDelayMaxMs: timeMs(16 * 60 * 1000)
    };

    const PEACH_PETAL_STORAGE_KEY = "xiaoliu_shennong_peach_petal_v1";

    const PEACH_PETAL_MAP_ID = "map4";

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
        background: "assets/shennong/maps/map1-starter-garden-background.jpg",
        plots: [
          { id: 0, name: "左上藥畦", image: "assets/shennong/plots/plot-1-empty.png" },
          { id: 1, name: "中上藥畦", image: "assets/shennong/plots/plot-2-empty.png" },
          { id: 2, name: "右上藥畦", image: "assets/shennong/plots/plot-3-empty.png" },
          { id: 3, name: "左下藥畦", image: "assets/shennong/plots/plot-4-empty.png" },
          { id: 4, name: "中下藥畦", image: "assets/shennong/plots/plot-5-empty.png" },
          { id: 5, name: "右下藥畦", image: "assets/shennong/plots/plot-6-empty.png" }
        ]
      },
      {
        id: "map2",
        name: "山谷藥圃",
        unlockLevel: 8,
        background: "assets/shennong/maps/map2-valley-grove-background.jpg",
        plots: [
          { id: 0, name: "山谷左上藥畦", image: "assets/shennong/plots/plot-1-empty.png" },
          { id: 1, name: "山谷中上藥畦", image: "assets/shennong/plots/plot-2-empty.png" },
          { id: 2, name: "山谷右上藥畦", image: "assets/shennong/plots/plot-3-empty.png" },
          { id: 3, name: "山谷左下藥畦", image: "assets/shennong/plots/plot-4-empty.png" },
          { id: 4, name: "山谷中下藥畦", image: "assets/shennong/plots/plot-5-empty.png" },
          { id: 5, name: "山谷右下藥畦", image: "assets/shennong/plots/plot-6-empty.png" }
        ]
      },
      {
        id: "map3",
        name: "灶香藥田",
        unlockLevel: 15,
        background: "assets/shennong/maps/map3-stove-herb-field-background.jpg",
        plots: [
          { id: 0, name: "灶香左上藥畦", image: "assets/shennong/plots/plot-1-empty.png" },
          { id: 1, name: "灶香中上藥畦", image: "assets/shennong/plots/plot-2-empty.png" },
          { id: 2, name: "灶香右上藥畦", image: "assets/shennong/plots/plot-3-empty.png" },
          { id: 3, name: "灶香左下藥畦", image: "assets/shennong/plots/plot-4-empty.png" },
          { id: 4, name: "灶香中下藥畦", image: "assets/shennong/plots/plot-5-empty.png" },
          { id: 5, name: "灶香右下藥畦", image: "assets/shennong/plots/plot-6-empty.png" }
        ]
      },
      {
        id: "map4",
        name: "桃源藥谷",
        unlockLevel: 22,
        background: "assets/shennong/maps/map4-peach-blossom-valley.jpg",
        plots: [
          { id: 0, name: "桃源左上藥畦", image: "assets/shennong/plots/plot-1-empty.png" },
          { id: 1, name: "桃源中上藥畦", image: "assets/shennong/plots/plot-2-empty.png" },
          { id: 2, name: "桃源右上藥畦", image: "assets/shennong/plots/plot-3-empty.png" },
          { id: 3, name: "桃源左下藥畦", image: "assets/shennong/plots/plot-4-empty.png" },
          { id: 4, name: "桃源中下藥畦", image: "assets/shennong/plots/plot-5-empty.png" },
          { id: 5, name: "桃源右下藥畦", image: "assets/shennong/plots/plot-6-empty.png" }
        ]
      }
    ];

    const DEFAULT_MAP_ID = "map1";
    const DEFAULT_PLOT_IMAGE = "assets/shennong/plots/plot-empty.png";

    const STORAGE_KEY = "xiaoliu_shennong_garden_v2_8_herbs";

    const createEmptyPlots = () => Array.from({ length: 6 }, (_, i) => ({
      id: i,
      herbId: null,
      plantedAt: null,
      growSeconds: null
    }));

    const createInitialMapState = () => MAPS.reduce((acc, map) => {
      acc[map.id] = { plots: createEmptyPlots() };
      return acc;
    }, {});

    const initialState = () => ({
      level: 1,
      exp: 0,
      coins: 20,
      harvests: 0,
      sutraIndex: 0,
      activeMapId: DEFAULT_MAP_ID,
      maps: createInitialMapState(),
      plots: createEmptyPlots(),
      harvestedHerbs: {},
      completedRecipes: {},
      logs: [
        { time: Date.now(), text: "歡迎來到神農藥草園。先種下一株藥草，等待成熟後即可收穫。" }
      ]
    });

    let state = loadState();
    let selectedPlotId = null;
    let activeActivity = "meditate";
    let meditationIndex = 0;
    let springRainStartTimer = null;
    let springRainStopTimer = null;
    let rainbowTimer = null;
    // V3.3.7.2：桃花雨計時器
    let peachPetalStartTimer = null;
    let peachPetalStopTimer = null;
    let plantTargetPlot = null;

    const $ = (id) => document.getElementById(id);

    function coinIconMarkup(className = "coin-inline-icon") {
      return `<img class="${className}" src="assets/shennong/icon/coin.png" alt="金幣">`;
    }

    function normalizeCoinIconInText(text) {
      return String(text).replaceAll("🪙", coinIconMarkup());
    }

    function normalizeState(parsed) {
      const base = initialState();
      const merged = { ...base, ...parsed };

      if (!merged.maps) {
        merged.maps = createInitialMapState();
        if (Array.isArray(parsed.plots) && parsed.plots.length === 6) {
          merged.maps.map1.plots = parsed.plots;
        }
      }

      MAPS.forEach(map => {
        if (!merged.maps[map.id] || !Array.isArray(merged.maps[map.id].plots) || merged.maps[map.id].plots.length !== 6) {
          merged.maps[map.id] = { plots: createEmptyPlots() };
        }
      });

      if (!MAPS.some(map => map.id === merged.activeMapId)) {
        merged.activeMapId = DEFAULT_MAP_ID;
      }

      if (!merged.harvestedHerbs || typeof merged.harvestedHerbs !== "object" || Array.isArray(merged.harvestedHerbs)) {
        merged.harvestedHerbs = {};
      }

      if (!merged.completedRecipes || typeof merged.completedRecipes !== "object" || Array.isArray(merged.completedRecipes)) {
        merged.completedRecipes = {};
      }

      merged.plots = merged.maps[merged.activeMapId]?.plots || merged.maps[DEFAULT_MAP_ID].plots;
      return merged;
    }

    function loadState() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return initialState();
        return normalizeState(JSON.parse(raw));
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


    function getActivePlots() {
      const map = getActiveMap();
      if (!state.maps) state.maps = createInitialMapState();
      if (!state.maps[map.id]) state.maps[map.id] = { plots: createEmptyPlots() };
      state.plots = state.maps[map.id].plots;
      return state.plots;
    }

    function getAvailableHerbs() {
      const activeMapId = state.activeMapId || DEFAULT_MAP_ID;
      return HERBS.filter(herb => (herb.mapId || "map1") === activeMapId);
    }

    function applyMapBackground() {
      const bg = document.querySelector(".garden-scene-bg");
      const map = getActiveMap();
      if (bg && map?.background) {
        // 舊版 CSS 曾用 background shorthand + !important 固定第一章背景。
        // 這裡用 inline important 指定 background-image，確保切換地圖時背景圖會同步切換。
        bg.style.setProperty("background-image", `url('${map.background}')`, "important");
      }
    }

    function randomBetween(min, max) {
      return Math.random() * (max - min) + min;
    }

    function createRainStreak(offsetX, offsetY, alpha, isMain) {
      const streak = document.createElement("span");
      streak.className = `rain-streak ${isMain ? "main" : "sub"}`;
      streak.style.setProperty("--offset-x", `${offsetX}px`);
      streak.style.setProperty("--offset-y", `${offsetY}px`);
      streak.style.setProperty("--line-alpha", alpha.toFixed(2));
      streak.style.setProperty("--line-length", `${SPRING_RAIN_SETTINGS.lineLength}px`);
      streak.style.setProperty("--line-width", `${SPRING_RAIN_SETTINGS.lineWidth}px`);
      return streak;
    }

    function populateRainLayer(layerSelector, groupCount, durationRange, opacityRange) {
      const layer = document.querySelector(layerSelector);
      if (!layer) return;
      layer.innerHTML = "";

      for (let i = 0; i < groupCount; i++) {
        const group = document.createElement("span");
        group.className = "rain-group";
        group.style.left = `${randomBetween(-2, 94)}%`;
        group.style.top = `${randomBetween(-8, 82)}%`;
        group.style.setProperty("--duration", `${randomBetween(durationRange[0], durationRange[1]).toFixed(2)}s`);
        group.style.setProperty("--delay", `${(-randomBetween(0, durationRange[1])).toFixed(2)}s`);
        group.style.setProperty("--travel-x", `${randomBetween(-28, -42).toFixed(1)}px`);
        group.style.setProperty("--travel-y", `${randomBetween(142, 182).toFixed(1)}px`);
        group.style.setProperty("--group-opacity", randomBetween(opacityRange[0], opacityRange[1]).toFixed(2));
        group.style.setProperty("--group-scale", randomBetween(0.92, 1.08).toFixed(2));

        group.appendChild(createRainStreak(0, 0, randomBetween(0.72, 0.92), true));
        for (let j = 1; j < SPRING_RAIN_SETTINGS.streaksPerGroup; j++) {
          group.appendChild(createRainStreak(
            randomBetween(-SPRING_RAIN_SETTINGS.spreadX, SPRING_RAIN_SETTINGS.spreadX),
            randomBetween(-SPRING_RAIN_SETTINGS.spreadY, SPRING_RAIN_SETTINGS.spreadY),
            randomBetween(0.34, 0.62),
            false
          ));
        }

        layer.appendChild(group);
      }
    }

    function initSpringRain() {
      populateRainLayer(
        ".spring-rain-back",
        SPRING_RAIN_SETTINGS.backGroupCount,
        SPRING_RAIN_SETTINGS.backDuration,
        [0.46, 0.72]
      );
      populateRainLayer(
        ".spring-rain-front",
        SPRING_RAIN_SETTINGS.frontGroupCount,
        SPRING_RAIN_SETTINGS.frontDuration,
        [0.56, 0.88]
      );
    }

    function setSpringRainActive(active) {
      const scene = document.querySelector(".garden-scene");
      if (!scene) return;
      // V3.3.7.2：第四章不下春雨，視覺強制關閉（時間軸仍照常記）
      const visible = active && !isMap4Active();
      scene.classList.toggle("rain-active", visible);
    }

    function randomMs(min, max) {
      return Math.round(randomBetween(min, max));
    }

    function readSpringRainState() {
      try {
        return JSON.parse(localStorage.getItem(SPRING_RAIN_STORAGE_KEY) || "{}");
      } catch (error) {
        return {};
      }
    }

    function writeSpringRainState(rainState) {
      try {
        localStorage.setItem(SPRING_RAIN_STORAGE_KEY, JSON.stringify(rainState));
      } catch (error) {
        // localStorage 不可用時，春雨仍可照常以本次頁面計時運作。
      }
    }

    function clearSpringRainState() {
      try {
        localStorage.removeItem(SPRING_RAIN_STORAGE_KEY);
      } catch (error) {
        // ignore
      }
    }

    function setPostRainRainbowActive(active) {
      const rainbow = document.querySelector(".post-rain-rainbow");
      if (!rainbow) return;
      rainbow.classList.toggle("rainbow-visible", active);
    }

    function showPostRainRainbow() {
      window.clearTimeout(rainbowTimer);
      setPostRainRainbowActive(true);
      rainbowTimer = window.setTimeout(() => {
        setPostRainRainbowActive(false);
      }, POST_RAIN_RAINBOW.durationMs);
    }

    function maybeShowPostRainRainbow() {
      if (Math.random() <= POST_RAIN_RAINBOW.showChance) {
        showPostRainRainbow();
      }
    }

    function startSpringRain(savedEndAt = null) {
      const now = Date.now();
      const endAt = savedEndAt && savedEndAt > now
        ? savedEndAt
        : now + SPRING_RAIN_RANDOM.durationMs;
      const remainingMs = Math.max(0, endAt - now);

      window.clearTimeout(springRainStartTimer);
      window.clearTimeout(springRainStopTimer);

      initSpringRain();
      setPostRainRainbowActive(false);
      setSpringRainActive(true);
      writeSpringRainState({
        active: true,
        startedAt: now,
        endAt
      });

      springRainStopTimer = window.setTimeout(() => {
        stopSpringRain();
      }, remainingMs);
    }

    function stopSpringRain() {
      window.clearTimeout(springRainStopTimer);
      setSpringRainActive(false);
      // V3.3.7.2：第四章期間結束的春雨不要顯示彩虹（玩家此時看不到那場雨）
      if (!isMap4Active()) {
        maybeShowPostRainRainbow();
      }
      scheduleNextSpringRain();
    }

    function scheduleNextSpringRain(isFirst = false, fixedDelay = null) {
      window.clearTimeout(springRainStartTimer);
      const delay = Number.isFinite(fixedDelay)
        ? Math.max(0, fixedDelay)
        : isFirst
          ? randomMs(SPRING_RAIN_RANDOM.firstDelayMinMs, SPRING_RAIN_RANDOM.firstDelayMaxMs)
          : randomMs(SPRING_RAIN_RANDOM.nextDelayMinMs, SPRING_RAIN_RANDOM.nextDelayMaxMs);
      const nextStartAt = Date.now() + delay;

      writeSpringRainState({
        active: false,
        nextStartAt
      });

      springRainStartTimer = window.setTimeout(() => {
        startSpringRain();
      }, delay);
    }

    function restoreSpringRainAfterRefresh() {
      // V3.3.7.4：測試模式下不沿用 storage 的舊延遲（可能是正常模式留下的長延遲）
      // 直接重抽用測試模式的縮短時間。正常模式維持原有接續邏輯。
      if (TEST_MODE) {
        clearSpringRainState();
        scheduleNextSpringRain(true);
        return;
      }

      const rainState = readSpringRainState();
      const now = Date.now();

      if (rainState.active && rainState.endAt && rainState.endAt > now) {
        startSpringRain(rainState.endAt);
        return;
      }

      if (!rainState.active && rainState.nextStartAt && rainState.nextStartAt > now) {
        scheduleNextSpringRain(false, rainState.nextStartAt - now);
        return;
      }

      scheduleNextSpringRain(true);
    }

    // ======================================================
    // V3.3.7.2：桃花雨系統（map4 桃源藥谷專屬天氣）
    // - 完整仿照春雨架構，行為對稱
    // - 與春雨永不同框：透過 isMap4Active() 判斷
    // - 結束時呼叫共用的 maybeShowPostRainRainbow，桃花雨後一樣有彩虹
    // ======================================================

    function isMap4Active() {
      return (state.activeMapId || DEFAULT_MAP_ID) === PEACH_PETAL_MAP_ID;
    }

    function readPeachPetalState() {
      try {
        return JSON.parse(localStorage.getItem(PEACH_PETAL_STORAGE_KEY) || "{}");
      } catch (error) {
        return {};
      }
    }

    function writePeachPetalState(petalState) {
      try {
        localStorage.setItem(PEACH_PETAL_STORAGE_KEY, JSON.stringify(petalState));
      } catch (error) {
        // localStorage 不可用時，桃花雨仍可照本次頁面計時運作
      }
    }

    function clearPeachPetalState() {
      try {
        localStorage.removeItem(PEACH_PETAL_STORAGE_KEY);
      } catch (error) {
        // ignore
      }
    }

    function initPeachPetal() {
      const layer = document.querySelector(".peach-petal-drift");
      if (!layer) return;
      layer.innerHTML = "";

      const isMobile = window.innerWidth <= PEACH_PETAL_SETTINGS.mobileBreakpoint;
      const count = isMobile
        ? PEACH_PETAL_SETTINGS.mobileCount
        : PEACH_PETAL_SETTINGS.desktopCount;

      // V3.3.7.6：隨機指派三個飄落變體，讓畫面所有花瓣不同步
      const variants = ["", "variant-b", "variant-c"];

      for (let i = 0; i < count; i++) {
        const petal = document.createElement("span");
        const variant = variants[Math.floor(Math.random() * variants.length)];
        petal.className = variant ? `peach-petal ${variant}` : "peach-petal";
        const leftPct = randomBetween(0, 96);
        const duration = randomBetween(
          PEACH_PETAL_SETTINGS.durationMinS,
          PEACH_PETAL_SETTINGS.durationMaxS
        );
        const delay = randomBetween(
          PEACH_PETAL_SETTINGS.delayMinS,
          PEACH_PETAL_SETTINGS.delayMaxS
        );
        petal.style.left = `${leftPct.toFixed(2)}%`;
        petal.style.animationDuration = `${duration.toFixed(2)}s`;
        petal.style.animationDelay = `${(-delay).toFixed(2)}s`;
        layer.appendChild(petal);
      }
    }

    function setPeachPetalActive(active) {
      const layer = document.querySelector(".peach-petal-drift");
      if (!layer) return;
      // 只有在第四章才實際顯示，其他章節即使邏輯上 active，視覺也不顯示
      const visible = active && isMap4Active();
      layer.classList.toggle("petal-active", visible);
    }

    function startPeachPetal(savedEndAt = null) {
      const now = Date.now();
      const endAt = savedEndAt && savedEndAt > now
        ? savedEndAt
        : now + PEACH_PETAL_RANDOM.durationMs;
      const remainingMs = Math.max(0, endAt - now);

      window.clearTimeout(peachPetalStartTimer);
      window.clearTimeout(peachPetalStopTimer);

      initPeachPetal();
      setPostRainRainbowActive(false);
      setPeachPetalActive(true);
      writePeachPetalState({
        active: true,
        startedAt: now,
        endAt
      });

      peachPetalStopTimer = window.setTimeout(() => {
        stopPeachPetal();
      }, remainingMs);
    }

    function stopPeachPetal() {
      window.clearTimeout(peachPetalStopTimer);
      setPeachPetalActive(false);
      // 桃花雨結束也呼叫共用的彩虹（只在 map4 才看得到，但邏輯一致）
      if (isMap4Active()) {
        maybeShowPostRainRainbow();
      }
      scheduleNextPeachPetal();
    }

    function scheduleNextPeachPetal(isFirst = false, fixedDelay = null) {
      window.clearTimeout(peachPetalStartTimer);
      const delay = Number.isFinite(fixedDelay)
        ? Math.max(0, fixedDelay)
        : isFirst
          ? randomMs(PEACH_PETAL_RANDOM.firstDelayMinMs, PEACH_PETAL_RANDOM.firstDelayMaxMs)
          : randomMs(PEACH_PETAL_RANDOM.nextDelayMinMs, PEACH_PETAL_RANDOM.nextDelayMaxMs);
      const nextStartAt = Date.now() + delay;

      writePeachPetalState({
        active: false,
        nextStartAt
      });

      peachPetalStartTimer = window.setTimeout(() => {
        startPeachPetal();
      }, delay);
    }

    function restorePeachPetalAfterRefresh() {
      // V3.3.7.4：測試模式下不沿用 storage 的舊延遲（可能是正常模式留下的長延遲）
      if (TEST_MODE) {
        clearPeachPetalState();
        scheduleNextPeachPetal(true);
        return;
      }

      const petalState = readPeachPetalState();
      const now = Date.now();

      if (petalState.active && petalState.endAt && petalState.endAt > now) {
        startPeachPetal(petalState.endAt);
        return;
      }

      if (!petalState.active && petalState.nextStartAt && petalState.nextStartAt > now) {
        scheduleNextPeachPetal(false, petalState.nextStartAt - now);
        return;
      }

      scheduleNextPeachPetal(true);
    }

    // 切換地圖時呼叫，依當前地圖決定哪套天氣顯示
    // - 兩套各自的計時器繼續跑（時間軸不變）
    // - 只調整視覺顯隱
    function syncWeatherToActiveMap() {
      if (isMap4Active()) {
        // 第四章：關春雨視覺、開桃花雨視覺（若邏輯上正在飄）
        setSpringRainActive(false);
        setPostRainRainbowActive(false);
        const petalState = readPeachPetalState();
        const now = Date.now();
        if (petalState.active && petalState.endAt && petalState.endAt > now) {
          setPeachPetalActive(true);
          // 確保 DOM 上有花瓣，因 initPeachPetal 才會生成
          const layer = document.querySelector(".peach-petal-drift");
          if (layer && !layer.children.length) {
            initPeachPetal();
          }
        }
      } else {
        // 非第四章：關桃花雨視覺、開春雨視覺（若邏輯上正在飄）
        setPeachPetalActive(false);
        const rainState = readSpringRainState();
        const now = Date.now();
        if (rainState.active && rainState.endAt && rainState.endAt > now) {
          setSpringRainActive(true);
        }
      }
    }

    // V3.3.7.5：地圖鎖判斷集中處理（helper）
    // V3.3.7.10：部署前移除測試模式自動解鎖。地圖一律依玩家等級判斷，與正式體驗一致。
    function isMapLocked(map) {
      if (!map) return true;
      if (map.placeholder) return true;
      return state.level < map.unlockLevel;
    }

    function renderMapTabs() {
      const tabs = document.querySelector(".garden-map-tabs");
      if (!tabs) return;
      tabs.innerHTML = MAPS.map(map => {
        const locked = isMapLocked(map);
        const active = map.id === (state.activeMapId || DEFAULT_MAP_ID);
        const label = locked
          ? `${map.name} <small>Lv.${map.unlockLevel} 解鎖</small>`
          : `${map.name} <small>Lv.${map.unlockLevel}</small>`;
        return `<button class="map-tab ${active ? "active" : ""} ${locked ? "locked" : ""}" type="button" data-map-id="${map.id}" ${locked ? "disabled" : ""}>${label}</button>`;
      }).join("");

      tabs.querySelectorAll("button[data-map-id]:not([disabled])").forEach(btn => {
        btn.addEventListener("click", () => switchMap(btn.dataset.mapId));
      });
    }

    function switchMap(mapId) {
      const map = MAPS.find(item => item.id === mapId);
      if (!map) return;
      if (isMapLocked(map)) {
        return toast(`${map.name} 尚未解鎖`);
      }
      state.activeMapId = mapId;
      selectedPlotId = null;
      getActivePlots();
      saveState();
      renderAll();
      // V3.3.7.2：切換地圖後同步天氣顯隱（map4 用桃花雨、其他章用春雨）
      syncWeatherToActiveMap();
      toast(`已前往${map.name}`);
    }

    function getPlotMeta(plotId) {
      const map = getActiveMap();
      return map.plots.find(plot => plot.id === plotId) || null;
    }

    function plotImageSrc(plotId) {
      const plotMeta = getPlotMeta(Number(plotId));
      return plotMeta?.image || DEFAULT_PLOT_IMAGE;
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
      getActivePlots();
      renderMapTabs();
      applyMapBackground();
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

      getActivePlots().forEach(plot => {
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

      getActivePlots().forEach(plot => {
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
      const activePlots = getActivePlots();
      const plot = selectedPlotId !== null ? activePlots[selectedPlotId] : activePlots.find(p => p.herbId) || null;
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
      plantTargetPlot = plotId ?? getActivePlots().find(p => !p.herbId)?.id ?? 0;
      const menu = $("plantMenu");
      menu.innerHTML = "";

      getAvailableHerbs().forEach(herb => {
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
      const plot = getActivePlots()[plotId];
      const herb = getHerb(herbId);
      if (!plot || !herb) return;
      if (state.level < herb.unlockLevel) return toast("等級尚未解鎖此藥草");
      if ((herb.mapId || "map1") !== (state.activeMapId || DEFAULT_MAP_ID)) return toast("這株藥草不屬於目前地圖");
      if (plot.herbId) return toast("此地已有藥草");

      plot.herbId = herb.id;
      plot.plantedAt = Date.now();
      plot.growSeconds = herb.growSeconds;
      selectedPlotId = plotId;
      addLog(`你種下了 <b>${herb.name}</b>，靜待它順時而長。`);
      toast(`已種下 ${herb.name}`);
      closePlantModal();
      renderSolarTerm();
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

    function getRecipe(id) {
      return RECIPES.find(recipe => recipe.id === id);
    }

    function recordRecipeCompleted(recipe) {
      if (!state.completedRecipes) state.completedRecipes = {};
      const now = new Date().toISOString();
      const current = state.completedRecipes[recipe.id];
      state.completedRecipes[recipe.id] = {
        count: current ? current.count + 1 : 1,
        firstCompletedAt: current ? current.firstCompletedAt : now,
        lastCompletedAt: now
      };
    }

    function getRecipeUnlockStatus(recipe) {
      const byLevel = state.level >= recipe.unlockLevel;
      const harvested = state.harvestedHerbs || {};
      const hasRequired = recipe.requiredHerbs.every(id => harvested[id]);
      // 第一版先讓第一道食譜可直接測試；之後正式版可改回 byLevel && hasRequired。
      return {
        unlocked: true,
        byLevel,
        hasRequired,
        missingHerbs: recipe.requiredHerbs.filter(id => !harvested[id])
      };
    }

    function formatRecipeDate(iso) {
      if (!iso) return "尚未完成";
      const d = new Date(iso);
      return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
    }

    function harvest(plotId, anchorEl = null) {
      const plot = getActivePlots()[plotId];
      const herb = getHerb(plot.herbId);
      if (!plot || !herb || !isHarvestable(plot)) return;

      const coins = rand(herb.coinMin, herb.coinMax);
      const exp = rand(herb.expMin, herb.expMax);

      playHarvestEffect(anchorEl || document.querySelector(`.plot[data-id="${plotId}"]`), coins, exp);

      state.coins += coins;
      addExp(exp);
      state.harvests += 1;
      if (!state.harvestedHerbs) state.harvestedHerbs = {};
      state.harvestedHerbs[herb.id] = true;

      plot.herbId = null;
      plot.plantedAt = null;
      plot.growSeconds = null;

      addLog(`恭喜收穫 <b>${herb.name}</b>！獲得 ${coinIconMarkup()} ${coins}、經驗值 ${exp}。`);
      toast(`收穫 ${herb.name}：金幣 +${coins}，經驗 +${exp}`);
      renderAll();
    }

    function renderActivity() {
      const panel = $("activityPanel");
      document.body.classList.remove("kitchen-mode");
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

      if (activeActivity === "kitchen") {
        const recipe = getRecipe(activeRecipeId) || RECIPES[0];
        const status = getRecipeUnlockStatus(recipe);
        const completed = state.completedRecipes?.[recipe.id];
        const stepTotal = recipe.gameSteps.length;
        const ingredientItems = recipe.ingredientImages || [];

        if (kitchenViewMode === "collection") {
          const completedRecipes = RECIPES.filter(item => state.completedRecipes?.[item.id]);
          panel.innerHTML = `
            <h3>食養廚房</h3>
            <div class="kitchen-collection-layout kitchen-collection-clean">
              <section class="kitchen-book-list">
                <div class="kitchen-book-head">
                  <h4>我的食譜</h4>
                  <p>這些是你親手完成過的食養料理卡。</p>
                </div>
                <div class="kitchen-book-items">
                  ${completedRecipes.length ? completedRecipes.map(item => {
                    const done = state.completedRecipes?.[item.id];
                    return `
                      <button type="button" class="kitchen-book-item ${item.id === activeRecipeId ? "active" : ""}" data-recipe-id="${item.id}">
                        <img src="${item.dishImage || item.image}" alt="${item.name}">
                        <span class="book-item-name">${item.name}</span>
                        <small>完成 ${done?.count || 0} 次</small>
                      </button>
                    `;
                  }).join("") : `<div class="kitchen-book-empty">尚未完成食譜，先去煮一鍋暖暖的食養料理吧。</div>`}
                </div>
              </section>

              <section class="kitchen-recipe-card-view kitchen-recipe-card-only">
                <div class="kitchen-card-toolbar">
                  <span class="recipe-kicker">食譜卡收藏</span>
                  <button id="backToKitchenCookBtn" class="btn btn-soft">返回廚房</button>
                </div>

                <div class="kitchen-recipe-card-stage">
                  <img class="kitchen-recipe-card-large" src="${recipe.image}" alt="${recipe.name}食譜卡">
                  <div class="kitchen-recipe-card-caption">
                    <b>${recipe.name}</b>
                    <small>${completed ? `已完成 ${completed.count} 次｜最近 ${formatRecipeDate(completed.lastCompletedAt)}` : "尚未完成"}</small>
                  </div>
                </div>
              </section>
            </div>
          `;

          document.querySelectorAll(".kitchen-book-item[data-recipe-id]").forEach(btn => {
            btn.addEventListener("click", () => {
              activeRecipeId = btn.dataset.recipeId;
              renderActivity();
            });
          });

          $("backToKitchenCookBtn")?.addEventListener("click", () => {
            kitchenViewMode = "cook";
            kitchenStepIndex = 0;
            resetKitchenScene();
            renderActivity();
          });
        } else {
          const isIngredientStep = kitchenStepIndex === 2;
          const currentStepText = (() => {
            if (isIngredientStep && !kitchenSceneState.potReady && !kitchenSceneState.dishReady) {
              return "請點選桌上的青蔥與薑，讓食材從桌面縮小進入鍋內。";
            }
            if (isIngredientStep && kitchenSceneState.potReady && !kitchenSceneState.dishReady) {
              return "食材已入鍋，請點擊鍋子，讓黃光升起並完成料理。";
            }
            return recipe.gameSteps[kitchenStepIndex] || recipe.gameSteps[0];
          })();

          const primaryLabel = (() => {
            if (kitchenStepIndex < 2) return "下一步";
            if (kitchenStepIndex === 2) return kitchenSceneState.dishReady ? "前往完成料理" : "請先操作鍋具";
            return "完成料理";
          })();

          const primaryDisabled = (kitchenStepIndex === 2 && !kitchenSceneState.dishReady) ? "disabled" : "";

          panel.innerHTML = `
            <h3>食養廚房</h3>
            <div class="kitchen-stage-simple" style="--kitchen-bg:url('${recipe.backgroundImage || "assets/shennong/kitchen/backgrounds/kitchen-bg-main_afternoon.jpg"}')">
              <div class="kitchen-scene-simple ${kitchenSceneState.potReady ? "pot-ready" : ""} ${kitchenSceneState.bursting ? "pot-bursting" : ""} ${kitchenSceneState.dishReady ? "dish-ready" : ""}" aria-label="${recipe.name}料理畫面">
                <button type="button" id="kitchenPotBtn" class="kitchen-main-pot ${kitchenSceneState.potReady ? "is-ready" : ""} ${kitchenSceneState.bursting ? "is-bursting" : ""} ${kitchenSceneState.dishReady ? "is-hidden" : ""}" aria-label="料理鍋子">
                  <img src="assets/shennong/kitchen/ui/tool-clay-pot.png" alt="正在煮的鍋子">
                </button>

                <div class="kitchen-ingredient-row">
                  ${ingredientItems.map(item => {
                    const isAnimating = kitchenSceneState.animatingIngredients.includes(item.id);
                    const isUsed = kitchenSceneState.addedIngredients.includes(item.id);
                    const canClick = isIngredientStep && !isAnimating && !isUsed && !kitchenSceneState.potReady && !kitchenSceneState.dishReady;
                    return `
                      <button type="button" class="kitchen-scene-ingredient kitchen-scene-ingredient-${item.id} ${isAnimating ? "is-animating" : ""} ${isUsed ? "is-used" : ""}" data-ingredient-id="${item.id}" ${canClick ? "" : "disabled"}>
                        <img src="${item.image}" alt="${item.name}">
                        <span>${item.name}</span>
                      </button>
                    `;
                  }).join("")}
                </div>

                <div class="kitchen-cross-burst ${kitchenSceneState.bursting ? "show" : ""}" aria-hidden="true">
                  ${Array.from({ length: 10 }).map((_, idx) => `<i class="kitchen-cross cross-${idx + 1}"></i>`).join("")}
                </div>

                <img class="kitchen-finished-dish ${kitchenSceneState.dishReady ? "show" : ""}" src="${recipe.dishImage}" alt="${recipe.name}">
              </div>

              <div class="kitchen-step-panel-simple">
                <div class="kitchen-step-main">
                  <span class="recipe-kicker">${recipe.category}・${recipe.timeText}</span>
                  <h4>${recipe.name}</h4>
                  <div class="recipe-benefit">${recipe.benefitLabel}</div>
                  <p class="kitchen-step-current">步驟 ${Math.min(kitchenStepIndex + 1, stepTotal)} / ${stepTotal}｜${currentStepText}</p>
                  <div class="recipe-step-progress">
                    ${recipe.gameSteps.map((_, idx) => `<i class="${idx <= kitchenStepIndex ? "active" : ""}"></i>`).join("")}
                  </div>
                  <small class="kitchen-complete-status">${completed ? `已完成 ${completed.count} 次｜最近 ${formatRecipeDate(completed.lastCompletedAt)}` : recipe.suitableText}</small>
                </div>

                <div class="recipe-actions kitchen-actions-simple">
                  <button id="prevRecipeStepBtn" class="btn btn-soft" ${kitchenStepIndex <= 0 ? "disabled" : ""}>上一步</button>
                  <button id="nextRecipeStepBtn" class="btn btn-green" ${primaryDisabled}>${primaryLabel}</button>
                </div>
              </div>
            </div>
          `;

          document.querySelectorAll(".kitchen-scene-ingredient[data-ingredient-id]").forEach(btn => {
            btn.addEventListener("click", () => {
              const ingredientId = btn.dataset.ingredientId;
              if (!isIngredientStep || kitchenSceneState.potReady || kitchenSceneState.dishReady) return;
              if (kitchenSceneState.addedIngredients.includes(ingredientId) || kitchenSceneState.animatingIngredients.includes(ingredientId)) return;

              kitchenSceneState.animatingIngredients.push(ingredientId);
              renderActivity();

              setTimeout(() => {
                kitchenSceneState.animatingIngredients = kitchenSceneState.animatingIngredients.filter(id => id !== ingredientId);
                if (!kitchenSceneState.addedIngredients.includes(ingredientId)) {
                  kitchenSceneState.addedIngredients.push(ingredientId);
                }

                if (ingredientItems.every(item => kitchenSceneState.addedIngredients.includes(item.id))) {
                  kitchenSceneState.potReady = true;
                }
                renderActivity();
              }, 700);
            });
          });

          $("kitchenPotBtn").addEventListener("click", () => {
            if (!kitchenSceneState.potReady || kitchenSceneState.dishReady || kitchenSceneState.bursting) return;
            kitchenSceneState.bursting = true;
            renderActivity();

            setTimeout(() => {
              kitchenSceneState.bursting = false;
              kitchenSceneState.potReady = false;
              kitchenSceneState.dishReady = true;
              kitchenStepIndex = Math.max(kitchenStepIndex, stepTotal - 1);
              renderActivity();
            }, 760);
          });

          $("prevRecipeStepBtn").addEventListener("click", () => {
            if (kitchenStepIndex <= 0) return;
            kitchenStepIndex = Math.max(0, kitchenStepIndex - 1);
            if (kitchenStepIndex < 2) resetKitchenScene();
            renderActivity();
          });

          $("nextRecipeStepBtn").addEventListener("click", () => {
            if (!status.unlocked) {
              toast("這道食譜尚未解鎖");
              return;
            }

            if (kitchenStepIndex < 2) {
              kitchenStepIndex += 1;
              if (kitchenStepIndex === 2) resetKitchenScene();
              renderActivity();
              return;
            }

            if (kitchenStepIndex === 2 && !kitchenSceneState.dishReady) {
              toast("請先點選兩樣食材入鍋，再點擊鍋子完成料理");
              return;
            }

            if (kitchenStepIndex < stepTotal - 1) {
              kitchenStepIndex += 1;
              renderActivity();
              return;
            }

            state.coins += recipe.rewardCoins;
            addExp(recipe.rewardExp);
            recordRecipeCompleted(recipe);
            addLog(`完成第一道食養食譜：<b>${recipe.name}</b>。獲得 ${coinIconMarkup()} ${recipe.rewardCoins}、經驗值 ${recipe.rewardExp}。`);
            toast(`${recipe.name}完成：金幣 +${recipe.rewardCoins}，經驗 +${recipe.rewardExp}`);
            kitchenViewMode = "collection";
            kitchenStepIndex = 0;
            resetKitchenScene();
            renderAll();
          });
        }
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
        return `<div class="log-item"><small>${time}</small><br>${normalizeCoinIconInText(log.text)}</div>`;
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
      const empty = getActivePlots().find(p => !p.herbId);
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
      clearSpringRainState();
      setSpringRainActive(false);
      setPostRainRainbowActive(false);
      window.clearTimeout(springRainStartTimer);
      window.clearTimeout(springRainStopTimer);
      window.clearTimeout(rainbowTimer);
      scheduleNextSpringRain(true);
      // V3.3.7.2：reset 時也清理桃花雨
      clearPeachPetalState();
      setPeachPetalActive(false);
      window.clearTimeout(peachPetalStartTimer);
      window.clearTimeout(peachPetalStopTimer);
      scheduleNextPeachPetal(true);
      saveState();
      renderAll();
      toast("已重置藥草園");
    });

    restoreSpringRainAfterRefresh();
    // V3.3.7.2：桃花雨 restore + 同步當前地圖的天氣顯隱
    restorePeachPetalAfterRefresh();
    syncWeatherToActiveMap();

    // V3.3.7.3：測試模式角標
    if (TEST_MODE) {
      const badge = document.createElement("div");
      badge.className = "test-mode-badge";
      badge.textContent = "🧪 測試模式";
      badge.title = "URL 加上 ?test=1 才會出現此角標。移除參數即可關閉。";
      document.body.appendChild(badge);
      // 主控台給個提示，方便檢查
      try {
        console.info(
          "%c🧪 神農藥草園 - 測試模式已啟用",
          "background:#7a4055;color:#fff;padding:4px 10px;border-radius:4px;font-weight:bold;",
          "\n等待 / 持續時間縮約 " + TEST_MODE_SCALE + " 倍。視覺與機率不變。\n關閉方式：移除網址中的 ?test=1 並重新整理。"
        );
      } catch (error) {
        // ignore
      }
    }

    setInterval(() => {
      renderStats();
      updateGardenProgress();
      renderDetail();
    }, 1000);

    renderAll();

    renderSolarTerm();
    renderAll();
