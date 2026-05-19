// Código original adaptado para ejecutarse después de que React pinta el HTML.
window.initGdoSolarApp = function initGdoSolarApp() {
  if (window.__gdoSolarInitialized) return;
  window.__gdoSolarInitialized = true;


                // ===============================
                // SUPABASE CONFIG
                // 1) Go to Supabase > Project Settings > API
                // 2) Replace these two values with your Project URL and anon public key
                // IMPORTANT: never put the service_role key in frontend code.
                // ===============================
                const SUPABASE_URL = "https://nlnmadhpatoiuzhmhcsu.supabase.co";
                const SUPABASE_ANON_KEY =
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sbm1hZGhwYXRvaXV6aG1oY3N1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5MzExMTYsImV4cCI6MjA5MzUwNzExNn0.MbgCn4HYaq0oCY5Jws5IT3bbttInfCEIi5PUieTIoq4";

                const supabaseClient = window.supabase.createClient(
                    SUPABASE_URL,
                    SUPABASE_ANON_KEY,
                );

                const home = document.getElementById("home");
                const formPage = document.getElementById("formPage");
                const resultsPage = document.getElementById("resultsPage");
                const questionCard = document.getElementById("questionCard");
                const progressBar = document.getElementById("progressBar");
                const progressEmojis =
                    document.getElementById("progressEmojis");
                const progressTrack = document.getElementById("progressTrack");
                const stepLabel = document.getElementById("stepLabel");
                const speech = document.getElementById("speech");
                const sunOrb = document.getElementById("sunOrb");
                const sunTip = document.getElementById("sunTip");
                const randomTip = document.getElementById("randomTip");
                const homeBtn = document.getElementById("homeBtn");
                const dropTarget = document.getElementById("dropTarget");
                const startCheckModal =
                    document.getElementById("startCheckModal");
                const closeStartModal =
                    document.getElementById("closeStartModal");
                const modalQuestionStep =
                    document.getElementById("modalQuestionStep");
                const modalPhoneStep =
                    document.getElementById("modalPhoneStep");
                const alreadyAnsweredBtn =
                    document.getElementById("alreadyAnsweredBtn");
                const newFormBtn = document.getElementById("newFormBtn");
                const lookupPhoneInput =
                    document.getElementById("lookupPhoneInput");
                const lookupResultBtn =
                    document.getElementById("lookupResultBtn");
                const startAnywayBtn =
                    document.getElementById("startAnywayBtn");
                const lookupError = document.getElementById("lookupError");
                const returningMiniCard =
                    document.getElementById("returningMiniCard");
                const returningPhoneInput = document.getElementById(
                    "returningPhoneInput",
                );
                const returningLookupBtn =
                    document.getElementById("returningLookupBtn");
                const returningMiniError =
                    document.getElementById("returningMiniError");
                const returningMiniClose =
                    document.getElementById("returningMiniClose");

                const state = {
                    current: 0,
                    answers: {},
                    feedback: "",
                    savedToSupabase: false,
                };

                const iconAliases = {
                    "💸": "wallet",
                    "🔋": "battery",
                    "🌿": "leaf",
                    "🧭": "compass",
                    "📉": "trendingDown",
                    "🏠": "home",
                    "👨‍👩‍👧": "users",
                    "🧳": "briefcase",
                    "🔑": "key",
                    "☀️": "sun",
                    "🌙": "moon",
                    "⚖️": "scale",
                    "🙂": "circle",
                    "😐": "circle",
                    "😟": "circleAlert",
                    "😰": "circleAlert",
                    "✅": "check",
                    "⚡": "zap",
                    "🔌": "plug",
                    "🚨": "siren",
                    "⏱️": "timer",
                    "🕒": "clock",
                    "🌑": "moon",
                    "❔": "circleHelp",
                    "🏢": "building",
                    "🚪": "door",
                    "❌": "x",
                    "🤔": "circleHelp",
                    "❄️": "snowflake",
                    "🧊": "box",
                    "💻": "laptop",
                    "💡": "lightbulb",
                    "🌬️": "wind",
                    "🍃": "leaf",
                    "🚫": "ban",
                    "1️⃣": "one",
                    "2️⃣": "two",
                    "3️⃣": "three",
                    "✨": "sparkles",
                    "💬": "message",
                    "📩": "mail",
                    "🎉": "sparkles",
                    "🔎": "search",
                    "👋": "hand",
                    "🔒": "lock",
                };

                function normalizeIconName(icon) {
                    if (!icon) return "sparkles";
                    return iconAliases[icon] || icon;
                }

                function iconSvg(icon, size = 22) {
                    const name = normalizeIconName(icon);
                    const common = `width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"`;
                    const icons = {
                        sun: `<svg ${common}><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
                        wallet: `<svg ${common}><path d="M19 7V6a2 2 0 0 0-2-2H5a3 3 0 0 0 0 6h14a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a3 3 0 0 1-3-3V7"/><path d="M16 13h.01"/></svg>`,
                        battery: `<svg ${common}><rect x="2" y="7" width="18" height="10" rx="2"/><path d="M22 11v2"/><path d="M7 11h4"/><path d="M9 9v4"/></svg>`,
                        leaf: `<svg ${common}><path d="M11 20A7 7 0 0 1 4 13c0-5 8-9 16-9 0 8-4 16-9 16Z"/><path d="M4 13c4 0 8 2 11 5"/></svg>`,
                        compass: `<svg ${common}><circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36Z"/></svg>`,
                        trendingDown: `<svg ${common}><path d="m22 17-8.5-8.5-5 5L2 7"/><path d="M16 17h6v-6"/></svg>`,
                        home: `<svg ${common}><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></svg>`,
                        users: `<svg ${common}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
                        briefcase: `<svg ${common}><path d="M10 6V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1"/><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 12h18"/></svg>`,
                        key: `<svg ${common}><circle cx="7.5" cy="15.5" r="5.5"/><path d="m12 11 8-8"/><path d="m17 3 4 4"/><path d="m19 5-4 4"/></svg>`,
                        moon: `<svg ${common}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9"/></svg>`,
                        scale: `<svg ${common}><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h18"/></svg>`,
                        circle: `<svg ${common}><circle cx="12" cy="12" r="10"/></svg>`,
                        circleAlert: `<svg ${common}><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>`,
                        check: `<svg ${common}><path d="M20 6 9 17l-5-5"/></svg>`,
                        zap: `<svg ${common}><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"/></svg>`,
                        plug: `<svg ${common}><path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M6 8h12v4a6 6 0 0 1-12 0Z"/></svg>`,
                        siren: `<svg ${common}><path d="M7 18v-6a5 5 0 0 1 10 0v6"/><path d="M5 21h14"/><path d="M12 2v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
                        timer: `<svg ${common}><path d="M10 2h4"/><path d="M12 14v-4"/><circle cx="12" cy="14" r="8"/></svg>`,
                        clock: `<svg ${common}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
                        circleHelp: `<svg ${common}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 1 1 5.82 1c0 2-3 2-3 4"/><path d="M12 17h.01"/></svg>`,
                        building: `<svg ${common}><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/></svg>`,
                        door: `<svg ${common}><path d="M13 4h3a2 2 0 0 1 2 2v14"/><path d="M2 20h20"/><path d="M13 20V2L6 4v16"/><path d="M10 12h.01"/></svg>`,
                        x: `<svg ${common}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
                        snowflake: `<svg ${common}><path d="m10 20-1.25-2.5L6 18"/><path d="M10 4 8.75 6.5 6 6"/><path d="m14 20 1.25-2.5L18 18"/><path d="M14 4l1.25 2.5L18 6"/><path d="M2 12h20"/><path d="m7 7 10 10"/><path d="m17 7-10 10"/></svg>`,
                        box: `<svg ${common}><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>`,
                        laptop: `<svg ${common}><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9"/><path d="M2 20h20"/><path d="M6 16h12"/></svg>`,
                        lightbulb: `<svg ${common}><path d="M15 14c.2-1 .7-1.7 1.5-2.5A6 6 0 1 0 7.5 11.5C8.3 12.3 8.8 13 9 14"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>`,
                        wind: `<svg ${common}><path d="M17.7 7.7A2.5 2.5 0 1 1 20 11H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>`,
                        ban: `<svg ${common}><circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/></svg>`,
                        one: `<svg ${common}><path d="M12 20V4l-4 4"/></svg>`,
                        two: `<svg ${common}><path d="M6 8a6 6 0 0 1 12 0c0 3-4 5-7 8l-5 4h12"/></svg>`,
                        three: `<svg ${common}><path d="M7 4h10l-5 6a5 5 0 1 1-5 8"/></svg>`,
                        sparkles: `<svg ${common}><path d="M9.9 2.1 8.5 8.5 2.1 9.9l6.4 1.4 1.4 6.4 1.4-6.4 6.4-1.4-6.4-1.4Z"/><path d="M19 15v4"/><path d="M21 17h-4"/></svg>`,
                        message: `<svg ${common}><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/></svg>`,
                        mail: `<svg ${common}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>`,
                        search: `<svg ${common}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
                        hand: `<svg ${common}><path d="M18 11V6a2 2 0 0 0-4 0v5"/><path d="M14 10V4a2 2 0 0 0-4 0v8"/><path d="M10 10.5V6a2 2 0 0 0-4 0v9"/><path d="M6 15a2 2 0 0 0-4 0c0 6 4 7 8 7h4a6 6 0 0 0 6-6v-5a2 2 0 0 0-4 0v1"/></svg>`,
                        lock: `<svg ${common}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
                        settings: `<svg ${common}><path d="M12.22 2h-.44a2 2 0 0 0-2 2l-.09.56a2 2 0 0 1-1 1.51l-.55.32a2 2 0 0 0-.73 2.73l.22.39a2 2 0 0 1 0 1.98l-.22.39a2 2 0 0 0 .73 2.73l.55.32a2 2 0 0 1 1 1.51l.09.56a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2l.09-.56a2 2 0 0 1 1-1.51l.55-.32a2 2 0 0 0 .73-2.73l-.22-.39a2 2 0 0 1 0-1.98l.22-.39a2 2 0 0 0-.73-2.73l-.55-.32a2 2 0 0 1-1-1.51L14.22 4a2 2 0 0 0-2-2Z"/><circle cx="12" cy="12" r="3"/></svg>`,
                    };
                    return icons[name] || icons.sparkles;
                }


                const questions = [
                    {
                        id: "motivation",
                        block: "Bloque 1 — Motivación",
                        type: "single",
                        question:
                            "¿Qué te trajo a explorar la energía solar hoy?",
                        hint: "Elige la opción que más se parezca a lo que estás sintiendo ahora.",
                        options: [
                            {
                                text: "Me preocupa lo que pago en energía y quiero reducirlo",
                                icon: "💸",
                                score: "optimizador",
                            },
                            {
                                text: "Me estresa quedarme sin luz cuando hay cortes",
                                icon: "🔋",
                                score: "resiliente",
                            },
                            {
                                text: "Quiero hacer algo por el medio ambiente desde mi casa",
                                icon: "🌿",
                                score: "green",
                            },
                            {
                                text: "Quiero entender mejor mi consumo y ver qué opciones hay",
                                icon: "🧭",
                                score: "optimizador",
                            },
                        ],
                    },
                    {
                        id: "priority",
                        block: "Bloque 1 — Motivación",
                        type: "single",
                        question:
                            "Si pudieras elegir solo una cosa, ¿qué sería más valioso para ti?",
                        options: [
                            {
                                text: "Pagar menos en mi factura mes a mes",
                                icon: "📉",
                                score: "optimizador",
                            },
                            {
                                text: "Que mi casa siga funcionando aunque se vaya la luz",
                                icon: "🏠",
                                score: "resiliente",
                            },
                            {
                                text: "Saber que estoy consumiendo energía limpia",
                                icon: "🍃",
                                score: "green",
                            },
                        ],
                    },
                    {
                        id: "homeUse",
                        block: "Bloque 2 — Contexto del hogar",
                        type: "single",
                        question: "¿Cómo es tu casa la mayor parte del tiempo?",
                        options: [
                            { text: "Vivimos aquí todos los días", icon: "👨‍👩‍👧" },
                            {
                                text: "La usamos solo en temporadas o fines de semana",
                                icon: "🧳",
                            },
                            { text: "La tenemos para rentar", icon: "🔑" },
                        ],
                    },
                    {
                        id: "energyTime",
                        block: "Bloque 2 — Contexto del hogar",
                        type: "single",
                        question:
                            "¿Cuándo sientes que tu casa consume más energía?",
                        options: [
                            { text: "Durante el día", icon: "☀️" },
                            { text: "En la noche", icon: "🌙" },
                            { text: "Más o menos parejo", icon: "⚖️" },
                        ],
                    },
                    {
                        id: "monthlySpend",
                        block: "Bloque 2 — Contexto del hogar",
                        type: "number",
                        question:
                            "¿En promedio cuánto pagas de energía al mes en tu hogar?",
                        hint: "Escribe solo números. Por ejemplo: 180000",
                        placeholder: "Ej: 180000",
                    },
                    {
                        id: "billFeeling",
                        block: "Bloque 2 — Contexto del hogar",
                        type: "single",
                        question: "¿Cómo se siente tu factura de energía hoy?",
                        options: [
                            { text: "Está bien", icon: "🙂" },
                            { text: "Normal", icon: "😐" },
                            { text: "Alta", icon: "😟", score: "optimizador" },
                            {
                                text: "Muy alta",
                                icon: "😰",
                                score: "optimizador",
                            },
                        ],
                    },
                    {
                        id: "outageFrequency",
                        block: "Bloque 3 — Realidad energética",
                        type: "single",
                        question: "¿Qué tan seguido se va la luz en tu hogar?",
                        options: [
                            { text: "Casi nunca", icon: "✅" },
                            {
                                text: "Algunas veces al mes",
                                icon: "⚡",
                                score: "resiliente",
                            },
                            {
                                text: "Varias veces a la semana",
                                icon: "🔌",
                                score: "resiliente",
                            },
                            {
                                text: "Casi todos los días",
                                icon: "🚨",
                                score: "resiliente",
                            },
                        ],
                    },
                    {
                        id: "outageDuration",
                        block: "Bloque 3 — Realidad energética",
                        type: "single",
                        question: "Cuando se va, ¿cuánto tiempo estás sin luz?",
                        options: [
                            { text: "Menos de 1 hora", icon: "⏱️" },
                            {
                                text: "1 a 3 horas",
                                icon: "🕒",
                                score: "resiliente",
                            },
                            {
                                text: "Más de 3 horas",
                                icon: "🌑",
                                score: "resiliente",
                            },
                            { text: "No estoy seguro/a", icon: "❔" },
                        ],
                    },
                    {
                        id: "generator",
                        block: "Bloque 3 — Realidad energética",
                        type: "single",
                        question: "¿Tu conjunto tiene planta eléctrica?",
                        options: [
                            { text: "Sí, todo", icon: "🏢" },
                            { text: "Sí, solo zonas comunes", icon: "🚪" },
                            { text: "No", icon: "❌", score: "resiliente" },
                            { text: "No sé", icon: "🤔" },
                        ],
                    },
                    {
                        id: "criticalLoads",
                        block: "Bloque 4 — Cargas críticas",
                        type: "multi",
                        question:
                            "Si se va la luz, ¿qué sería lo peor que deje de funcionar?",
                        hint: "Puedes elegir varias opciones.",
                        options: [
                            {
                                text: "Aire acondicionado",
                                icon: "❄️",
                                score: "resiliente",
                            },
                            { text: "Nevera", icon: "🧊", score: "resiliente" },
                            {
                                text: "Internet / trabajo",
                                icon: "💻",
                                score: "resiliente",
                            },
                            { text: "Luces", icon: "💡", score: "resiliente" },
                            { text: "Todo", icon: "🏠", score: "resiliente" },
                        ],
                    },
                    {
                        id: "acUse",
                        block: "Bloque 4 — Cargas críticas",
                        type: "single",
                        question: "¿Cómo usas el aire acondicionado?",
                        options: [
                            {
                                text: "Todos los días",
                                icon: "❄️",
                                score: "resiliente",
                            },
                            { text: "A veces", icon: "🌬️" },
                            { text: "Muy poco", icon: "🍃" },
                            { text: "No tenemos", icon: "🚫" },
                        ],
                    },
                    {
                        id: "fridges",
                        block: "Bloque 4 — Cargas críticas",
                        type: "single",
                        question: "¿Cuántas neveras tienen?",
                        options: [
                            { text: "Una", icon: "1️⃣" },
                            { text: "Dos", icon: "2️⃣", score: "resiliente" },
                            {
                                text: "Tres o más",
                                icon: "3️⃣",
                                score: "resiliente",
                            },
                        ],
                    },
                    {
                        id: "concern",
                        block: "Bloque 5 — Apertura",
                        type: "text",
                        question: "¿Tienes alguna duda o preocupación?",
                        hint: "Puedes escribir lo que quieras. Por ejemplo: costos, apagones, estética, instalación o tiempos.",
                        placeholder: "Escribe tu duda aquí...",
                    },
                    {
                        id: "contact",
                        block: "Bloque 6 — Tu propuesta",
                        type: "contact",
                        question: "Tu propuesta personalizada está lista",
                        hint: "Déjanos tus datos y te enviamos el plan con tu estimado de ahorro, tu batería recomendada y los próximos pasos para empezar.",
                        fields: [
                            {
                                name: "name",
                                label: "Nombre",
                                type: "text",
                                required: true,
                            },
                            {
                                name: "whatsapp",
                                label: "WhatsApp",
                                type: "tel",
                                required: true,
                            },
                            {
                                name: "email",
                                label: "Correo (opcional)",
                                type: "email",
                                required: false,
                            },
                        ],
                    },
                ];

                if (progressEmojis) {
                    progressEmojis.innerHTML = questions
                        .map((question) => `<span>${iconSvg(question.progressIcon || "circle", 14)}</span>`)
                        .join("");
                }
                if (progressTrack) {
                    progressTrack.innerHTML = questions
                        .map(() => '<span class="progress-segment"></span>')
                        .join("");
                }

                const profileContent = {
                    resiliente: {
                        name: "Plan Respaldo Total",
                        emoji: "battery",
                        explanation:
                            "Este plan te da la mayor autonomía posible: una batería de mayor capacidad que mantiene tu casa encendida incluso durante apagones prolongados. Ideal si la continuidad del servicio es más importante que el ahorro máximo.",
                        gain: "Mayor batería de respaldo, continuidad durante apagones y tranquilidad real en tu hogar. Tarifa fija sin importar lo que suba la energía.",
                        tradeoff:
                            "Al priorizar mayor capacidad de batería, el ahorro mensual estimado puede ser un poco menor que en el plan Ahorrador. La ventaja es la tranquilidad.",
                    },
                    optimizador: {
                        name: "Plan Ahorrador",
                        emoji: "wallet",
                        explanation:
                            "Este plan maximiza el ahorro mensual en tu factura. Los paneles solares generan la mayor parte de tu energía diurna y la batería cubre los momentos de baja producción.",
                        gain: "Mayor ahorro en tu factura mes a mes, tarifa fija predecible y respaldo básico ante apagones cortos.",
                        tradeoff:
                            "La batería incluida cubre apagones de menor duración. Si los cortes en tu zona son frecuentes o largos, podríamos ajustar el plan.",
                    },
                    green: {
                        name: "Plan Solar Limpio",
                        emoji: "leaf",
                        explanation:
                            "Este plan te conecta con energía 100% renovable de forma simple. Los paneles generan tu energía, nosotros los mantenemos, y tú reduces tu huella sin complicarte.",
                        gain: "Energía limpia desde tu hogar, tarifa fija sin sorpresas y la satisfacción de consumir de forma más responsable.",
                        tradeoff:
                            "La sostenibilidad puede convivir con ahorro y respaldo. Podemos ajustar el plan según tu prioridad principal.",
                    },
                };

                function openStartCheckCard() {
                    document.body.style.color = "var(--ink)";
                    home.classList.add("hidden");
                    resultsPage.classList.add("hidden");
                    formPage.classList.remove("hidden");
                    formPage.className = "form-page phase-1";
                    state.current = 0;
                    state.answers = {};
                    state.feedback = "";
                    updateBackground();
                    stepLabel.textContent = "Antes de empezar";
                    speech.textContent =
                        "Primero confirmemos si ya tienes un resultado guardado.";

                    if (progressTrack) {
                        progressTrack
                            .querySelectorAll(".progress-segment")
                            .forEach((segment) =>
                                segment.classList.remove("filled"),
                            );
                    }
                    if (progressEmojis) {
                        progressEmojis
                            .querySelectorAll("span")
                            .forEach((emoji) => {
                                emoji.innerHTML = iconSvg("circle", 14);
                                emoji.classList.remove("active");
                            });
                    }

                    questionCard.innerHTML = `
          <span class="block-label">${iconSvg("hand", 16)} Antes de empezar</span>
          <h2>¿Ya hiciste este formulario antes?</h2>
          <p class="hint">Si ya lo llenaste, podemos buscar tu resultado anterior con tu número de WhatsApp para que no tengas que repetir todo.</p>
          <div class="answers">
            <button class="answer-card" id="inlineAlreadyAnsweredBtn">
              <span class="answer-icon">${iconSvg("search", 22)}</span>
              <span class="answer-text">Sí, ya lo hice. Quiero ver mi resultado anterior</span>
            </button>
            <button class="answer-card" id="inlineNewFormBtn">
              <span class="answer-icon">${iconSvg("sparkles", 22)}</span>
              <span class="answer-text">No, quiero empezar de cero</span>
            </button>
          </div>
          <div class="form-actions">
            <button class="btn btn-secondary" id="inlineBackHomeBtn">← Volver al inicio</button>
            <div class="feedback"></div>
          </div>
        `;

                    document
                        .getElementById("inlineAlreadyAnsweredBtn")
                        .addEventListener("click", renderPhoneLookupCard);
                    document
                        .getElementById("inlineNewFormBtn")
                        .addEventListener("click", startForm);
                    document
                        .getElementById("inlineBackHomeBtn")
                        .addEventListener("click", showHome);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }

                function renderPhoneLookupCard() {
                    stepLabel.textContent = "Buscar resultado";
                    speech.textContent =
                        "Escribe el WhatsApp que usaste la primera vez y buscaré tu perfil.";
                    questionCard.innerHTML = `
          <span class="block-label">${iconSvg("search", 16)} Buscar resultado</span>
          <h2>Escribe tu WhatsApp</h2>
          <p class="hint">Usaremos este número solo para buscar el resultado que ya habías recibido.</p>
          <div class="input-group">
            <input id="inlineLookupPhoneInput" type="tel" placeholder="Ej: 3001234567" />
          </div>
          <p class="modal-error" id="inlineLookupError"></p>
          <div class="form-actions">
            <button class="btn btn-secondary" id="inlineBackToCheckBtn">← Atrás</button>
            <button class="btn btn-primary" id="inlineLookupResultBtn">Ver mi resultado anterior</button>
            <button class="btn btn-secondary" id="inlineStartAnywayBtn">Empezar de nuevo</button>
          </div>
        `;
                    const inlineInput = document.getElementById(
                        "inlineLookupPhoneInput",
                    );
                    document
                        .getElementById("inlineBackToCheckBtn")
                        .addEventListener("click", openStartCheckCard);
                    document
                        .getElementById("inlineStartAnywayBtn")
                        .addEventListener("click", startForm);
                    document
                        .getElementById("inlineLookupResultBtn")
                        .addEventListener(
                            "click",
                            findPreviousResultByPhoneInline,
                        );
                    inlineInput.addEventListener("keydown", (event) => {
                        if (event.key === "Enter")
                            findPreviousResultByPhoneInline();
                    });
                    setTimeout(() => inlineInput.focus(), 80);
                }

                async function findPreviousResultByPhoneInline() {
                    const input = document.getElementById(
                        "inlineLookupPhoneInput",
                    );
                    const errorBox =
                        document.getElementById("inlineLookupError");
                    const button = document.getElementById(
                        "inlineLookupResultBtn",
                    );
                    const typedPhone = normalizePhone(input?.value);

                    if (!typedPhone || typedPhone.length < 7) {
                        errorBox.textContent =
                            "Escribe un número de WhatsApp válido.";
                        return;
                    }

                    errorBox.textContent = "Buscando tu resultado...";
                    button.disabled = true;

                    try {
                        const { data, error } = await lookupLeadByWhatsapp(
                            input?.value || typedPhone,
                        );

                        if (error) throw error;

                        if (!data) {
                            errorBox.textContent =
                                "No encontré un resultado con ese WhatsApp. Puedes revisar el número o empezar de nuevo.";
                            return;
                        }

                        showPreviousResult(data);
                    } catch (error) {
                        console.error(
                            "Error buscando resultado anterior:",
                            error,
                        );
                        errorBox.textContent =
                            "No pude buscar el resultado. Revisa la policy SELECT de Supabase.";
                    } finally {
                        button.disabled = false;
                    }
                }

                function openStartCheckModal() {
                    if (!startCheckModal) return startForm();
                    lookupError.textContent = "";
                    lookupPhoneInput.value = "";
                    modalQuestionStep.classList.add("active");
                    modalPhoneStep.classList.remove("active");
                    startCheckModal.classList.remove("hidden");
                    startCheckModal.setAttribute("aria-hidden", "false");
                }

                function closeStartCheckModal() {
                    if (!startCheckModal) return;
                    startCheckModal.classList.add("hidden");
                    startCheckModal.setAttribute("aria-hidden", "true");
                }

                function showPhoneLookupStep() {
                    lookupError.textContent = "";
                    modalQuestionStep.classList.remove("active");
                    modalPhoneStep.classList.add("active");
                    setTimeout(() => lookupPhoneInput.focus(), 80);
                }

                function syncReturningMiniCard() {
                    if (!returningMiniCard) return;
                    const shouldShow =
                        !formPage.classList.contains("hidden") &&
                        state.current === 0;
                    returningMiniCard.classList.toggle("hidden", !shouldShow);
                    if (shouldShow && returningMiniError)
                        returningMiniError.textContent = "";
                }

                function hideReturningMiniCard() {
                    if (returningMiniCard)
                        returningMiniCard.classList.add("hidden");
                }

                async function findPreviousResultFromMiniCard() {
                    const rawPhone = returningPhoneInput?.value?.trim() || "";
                    const typedPhone = normalizePhone(rawPhone);
                    if (!typedPhone || typedPhone.length < 7) {
                        returningMiniError.textContent =
                            "Escribe un celular válido.";
                        return;
                    }

                    returningMiniError.textContent = "Buscando resultado...";
                    returningLookupBtn.disabled = true;

                    try {
                        const { data, error } =
                            await lookupLeadByWhatsapp(rawPhone);

                        if (error) throw error;

                        if (!data) {
                            returningMiniError.textContent =
                                "No encontré ese número. Puedes seguir el formulario normal.";
                            return;
                        }

                        hideReturningMiniCard();
                        showPreviousResult(data);
                    } catch (error) {
                        console.error(
                            "Error buscando resultado anterior:",
                            error,
                        );
                        returningMiniError.textContent =
                            "No pude buscarlo. Revisa que tengas la policy SELECT y mira la consola.";
                    } finally {
                        returningLookupBtn.disabled = false;
                    }
                }

                function normalizePhone(phone) {
                    return String(phone || "").replace(/\D/g, "");
                }

                function getPhoneCandidates(phone) {
                    const digits = normalizePhone(phone);
                    const candidates = new Set();

                    if (digits) candidates.add(digits);

                    // Colombia common formats:
                    // 3001234567 and 573001234567 should both be accepted.
                    if (digits.length === 10) candidates.add(`57${digits}`);
                    if (digits.startsWith("57") && digits.length === 12)
                        candidates.add(digits.slice(2));

                    return Array.from(candidates).filter(Boolean);
                }

                function phonesMatch(savedPhone, typedPhone) {
                    const saved = normalizePhone(savedPhone);
                    const typed = normalizePhone(typedPhone);
                    if (!saved || !typed) return false;

                    // Exact normalized match
                    if (saved === typed) return true;

                    // Colombia formats: 3001234567, 573001234567, +57 300 123 4567
                    const savedLast10 =
                        saved.length >= 10 ? saved.slice(-10) : saved;
                    const typedLast10 =
                        typed.length >= 10 ? typed.slice(-10) : typed;
                    return savedLast10 === typedLast10;
                }

                async function lookupLeadByWhatsapp(phone) {
                    const typed = normalizePhone(phone);
                    const candidates = getPhoneCandidates(phone);
                    if (!candidates.length) return { data: null, error: null };

                    const columns =
                        "id, name, whatsapp, email, profile_key, profile_name, profile_emoji, profile_explanation, profile_gain, profile_tradeoff, backup_hours, estimated_savings, created_at";

                    // 1) Fast search: exact candidates. Works when whatsapp was saved normalized.
                    const exactResult = await supabaseClient
                        .from("solar_leads")
                        .select(columns)
                        .in("whatsapp", candidates)
                        .order("created_at", { ascending: false })
                        .limit(1)
                        .maybeSingle();

                    if (exactResult.error) return exactResult;
                    if (exactResult.data) return exactResult;

                    // 2) Fallback search: read recent leads and compare normalized numbers in JS.
                    // This handles numbers saved as +57 300 123 4567, 300 1234567, etc.
                    const fallbackResult = await supabaseClient
                        .from("solar_leads")
                        .select(columns)
                        .order("created_at", { ascending: false })
                        .limit(500);

                    if (fallbackResult.error)
                        return { data: null, error: fallbackResult.error };

                    const match = (fallbackResult.data || []).find((lead) =>
                        phonesMatch(lead.whatsapp, typed),
                    );
                    return { data: match || null, error: null };
                }

                async function findPreviousResultByPhone() {
                    const rawPhone = lookupPhoneInput.value;
                    const typedPhone = normalizePhone(rawPhone);

                    if (!typedPhone || typedPhone.length < 7) {
                        lookupError.textContent =
                            "Escribe un número de WhatsApp válido.";
                        return;
                    }

                    lookupError.textContent = "Buscando tu resultado...";
                    lookupResultBtn.disabled = true;

                    try {
                        // Busca el lead más reciente con ese WhatsApp.
                        // IMPORTANTE: necesitas una policy SELECT en Supabase para que esto funcione.
                        const { data, error } =
                            await lookupLeadByWhatsapp(rawPhone);

                        if (error) throw error;

                        if (!data) {
                            lookupError.textContent =
                                "No encontré un resultado con ese WhatsApp. Puedes revisar el número o empezar de nuevo.";
                            return;
                        }

                        closeStartCheckModal();
                        showPreviousResult(data);
                    } catch (error) {
                        console.error(
                            "Error buscando resultado anterior:",
                            error,
                        );
                        lookupError.textContent =
                            "No pude buscar el resultado. Revisa que tengas la policy SELECT y mira la consola.";
                    } finally {
                        lookupResultBtn.disabled = false;
                    }
                }



                function getResultProfileKey(rawKey, profileName = "") {
                    const key = String(rawKey || "").toLowerCase().trim();
                    if (key.includes("resiliente") || key.includes("respaldo")) return "resiliente";
                    if (key.includes("green") || key.includes("verde") || key.includes("limpio")) return "green";
                    if (key.includes("optimizador") || key.includes("ahorrador") || key.includes("ahorro")) return "optimizador";
                    const name = String(profileName || "").toLowerCase().trim();
                    if (name.includes("respaldo") || name.includes("resiliente")) return "resiliente";
                    if (name.includes("verde") || name.includes("limpio") || name.includes("green")) return "green";
                    return "optimizador";
                }

                function getResultMetric(profileKey, savings, backup) {
                    const key = getResultProfileKey(profileKey);
                    if (key === "resiliente") {
                        return {
                            label: "Respaldo estimado",
                            title: "Podrías mantener tu hogar encendido hasta",
                            value: backup || "Por calcular",
                            note: "Ideal si tu prioridad es estar protegida ante apagones y mantener funcionando lo esencial de tu casa.",
                        };
                    }
                    if (key === "green") {
                        return {
                            label: "Impacto y ahorro estimado",
                            title: "Podrías empezar a ahorrar hasta",
                            value: savings || "Por calcular",
                            note: "Mientras reduces tu dependencia de energía convencional y das un paso hacia un hogar más limpio.",
                        };
                    }
                    return {
                        label: "Ahorro estimado",
                        title: "Podrías ahorrar hasta",
                        value: savings || "Por calcular",
                        note: "Estimado comparando tu consumo actual con una tarifa mensual más estable y predecible.",
                    };
                }

                function showPreviousResult(lead) {
                    updateBackground(true);
                    const profile = {
                        name: lead.profile_name || "Perfil solar",
                        emoji: lead.profile_emoji || "sun",
                        explanation:
                            lead.profile_explanation ||
                            "Este es el resultado que encontramos asociado a tu WhatsApp.",
                        gain:
                            lead.profile_gain ||
                            "Tu recomendación personalizada ya fue calculada anteriormente.",
                        tradeoff:
                            lead.profile_tradeoff ||
                            "Puedes revisarla o volver a hacer el quiz si tu situación cambió.",
                    };

                    formPage.classList.add("hidden");
                    home.classList.add("hidden");
                    resultsPage.classList.remove("hidden");
                    hideReturningMiniCard();

                    const resultProfileKey = getResultProfileKey(lead.profile_key, profile.name);
                    const resultMetric = getResultMetric(
                        resultProfileKey,
                        lead.estimated_savings || "Por calcular",
                        lead.backup_hours || "Por calcular",
                    );

                    resultsPage.innerHTML = `
          <section class="final-stage result-modern-stage page">
            <nav class="result-nav result-modern-nav">
              <div class="brand result-brand">
                <img src="https://mzfiuuohoeoqpsrqmcju.supabase.co/storage/v1/object/sign/imagenes%20timeline%20assesment/logo%20gdo%20positivo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZjJmNzAwMC04YTA2LTQ5NzYtYjJmNS05ZDljNWZhNDdmYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZW5lcyB0aW1lbGluZSBhc3Nlc21lbnQvbG9nbyBnZG8gcG9zaXRpdm8ucG5nIiwiaWF0IjoxNzc5MTUyMzg1LCJleHAiOjE4MTA2ODgzODV9.F_S64OV5Z_TLF4r6cdGCeA7Nu0HfrFPE8fHxjzupXiQ" alt="Logo GDO" class="logo-gdo" />
              </div>
              <button class="btn result-nav-btn" id="resultHomeBtn" type="button">Volver al inicio</button>
            </nav>

            <div class="final-content result-modern-content">
              <p class="result-kicker">${iconSvg("check", 16)} Tu propuesta anterior</p>

              <section class="result-hero-card">
                <p class="result-overline">Tu perfil solar GdO</p>
                <h1 class="result-profile-title">${profile.name}</h1>
                <p class="result-plan-text result-profile-lead">${profile.explanation}</p>

                <div class="result-actions-primary result-actions-under-title">
                  <button class="btn result-contact-main" id="mainCtaBtn">Contáctenme sobre este plan</button>
                  <button class="btn result-acquire-main" id="acquirePlanBtn" type="button">Adquirir plan</button>
                </div>
              </section>

              <section class="result-metric-card">
                <p class="result-overline">${resultMetric.label}</p>
                <h2 class="result-main-title">${resultMetric.title}</h2>
                <div class="result-savings-number">${resultMetric.value}</div>
                <p class="result-subcopy">${resultMetric.note}</p>
              </section>

              <div class="result-metrics-grid result-secondary-metrics">
                <div class="result-metric-box">
                  <span>Batería de respaldo</span>
                  <strong>${lead.backup_hours || "Por calcular"}</strong>
                </div>
                <div class="result-metric-box">
                  <span>Paneles en comodato</span>
                  <strong>${iconSvg("check", 18)} Incluidos</strong>
                </div>
              </div>

              <div class="profile-summary-row result-summary-row">
                <div class="profile-summary-card">
                  <strong>${iconSvg("check", 17)} Lo que ganas</strong>
                  <p>${profile.gain}</p>
                </div>
                <div class="profile-summary-card">
                  <strong>${iconSvg("scale", 17)} Lo que debes saber</strong>
                  <p>${profile.tradeoff}</p>
                </div>
              </div>

              <div class="result-actions-primary">
                <button class="btn result-simulator-main simulatorBtn" type="button">Ir al simulador</button>
              </div>

              <div class="result-bottom-actions">
                <button class="btn result-ghost-btn" id="restartBtn">Repetir quiz</button>
                <button class="btn result-ghost-btn" id="homeResultBtn">Volver al inicio</button>
              </div>
            </div>
          </section>
        `;

                    document
                        .getElementById("restartBtn")
                        .addEventListener("click", startForm);
                    document
                        .getElementById("homeResultBtn")
                        ?.addEventListener("click", showHome);
                    document
                        .getElementById("resultHomeBtn")
                        ?.addEventListener("click", showHome);
                    document
                        .getElementById("mainCtaBtn")
                        ?.addEventListener("click", () => {
                            const wa = lead.whatsapp || "";
                            if (wa) {
                                window.open(
                                    `https://wa.me/57${wa.replace(/\D/g, "").slice(-10)}?text=Hola%20GdO%20Solar%2C%20quiero%20conocer%20m%C3%A1s%20sobre%20mi%20plan%20personalizado`,
                                    "_blank",
                                );
                            } else {
                                alert(
                                    "Un asesor de GdO Solar te contactará pronto por WhatsApp.",
                                );
                            }
                        });
                    document
                        .getElementById("acquirePlanBtn")
                        ?.addEventListener("click", () => {
                            document.getElementById("mainCtaBtn")?.click();
                        });
                    document
                        .querySelectorAll(".simulatorBtn")
                        .forEach((btn) => {
                            btn.addEventListener("click", () =>
                                window.open(
                                    "https://subsolar-user-fit.vercel.app/",
                                    "_blank",
                                ),
                            );
                        });
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }

                function getMonthlySpendValue() {
                    const raw =
                        state.answers.monthlySpend?.value ??
                        state.answers.monthly_spend?.value ??
                        "";
                    const digits = String(raw).replace(/\D/g, "");
                    return Number(digits || 0);
                }

                function formatCOP(value) {
                    return `$${Math.round(value).toLocaleString("es-CO")}`;
                }

                function getMetricsForProfile(profileKey) {
                    const monthlySpend = getMonthlySpendValue();
                    const estimatedSavings =
                        monthlySpend > 0 ? monthlySpend * 0.23 : 0;

                    const backupByProfile = {
                        resiliente: "16 horas",
                        optimizador: "8 horas",
                        green: "6 horas",
                    };

                    return {
                        backup: backupByProfile[profileKey] || "8 horas",
                        savings:
                            monthlySpend > 0
                                ? `${formatCOP(estimatedSavings)} / mes`
                                : "Por calcular",
                        monthlySpend:
                            monthlySpend > 0
                                ? `${formatCOP(monthlySpend)} / mes`
                                : "No informado",
                    };
                }

                function startForm() {
                    document.body.style.color = "var(--ink)";
                    home.classList.add("hidden");
                    resultsPage.classList.add("hidden");
                    formPage.classList.remove("hidden");
                    formPage.className = "form-page phase-1";
                    state.current = 0;
                    state.answers = {};
                    state.feedback = "";
                    state.savedToSupabase = false;
                    renderQuestion();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }

                function resetLandingBackground() {
                    document.body.style.color = "var(--ink)";
                    document.body.style.background = `
          radial-gradient(circle at 8% 8%, rgba(255, 231, 122, .34), transparent 26%),
          radial-gradient(circle at 92% 2%, rgba(19, 167, 107, .18), transparent 28%),
          linear-gradient(180deg, var(--cream) 0%, #f8fdff 38%, #ffffff 70%, #f4fbf8 100%)
        `;
                }

                function showHome() {
                    resetLandingBackground();
                    document.body.style.color = "var(--ink)";
                    formPage.classList.add("hidden");
                    resultsPage.classList.add("hidden");
                    home.classList.remove("hidden");
                    hideReturningMiniCard();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }

                function renderQuestion() {
                    updateBackground();
                    const q = questions[state.current];
                    const total = questions.length;
                    progressTrack?.style.setProperty("--steps", total);
                    progressEmojis?.style.setProperty("--steps", total);
                    const progressPercent = (state.current / total) * 100;
                    progressBar.style.width = `${progressPercent}%`;
                    stepLabel.textContent = `${state.current + 1} / ${total}`;
                    speech.textContent = getMascotSpeech(q);

                    const emojis = progressEmojis
                        ? progressEmojis.querySelectorAll("span")
                        : [];
                    const segments = progressTrack
                        ? progressTrack.querySelectorAll(".progress-segment")
                        : [];
                    emojis.forEach((emoji, index) => {
                        // The bar only shows progress up to the current step.
                        // If the user goes back, future emojis disappear visually.
                        const answerIcon =
                            index <= state.current
                                ? getAnswerEmoji(index)
                                : null;
                        emoji.innerHTML = answerIcon
                            ? iconSvg(answerIcon, 16)
                            : iconSvg("circle", 14);
                        emoji.classList.toggle("active", Boolean(answerIcon));
                    });

                    segments.forEach((segment, index) => {
                        const hasCurrentAnswer =
                            index === state.current &&
                            Boolean(getAnswerEmoji(index));
                        const isPastStep = index < state.current;
                        segment.classList.toggle(
                            "filled",
                            isPastStep || hasCurrentAnswer,
                        );
                    });

                    syncReturningMiniCard();

                    questionCard.innerHTML = `
          <span class="block-label">${q.block}</span>
          <h2>${q.question}</h2>
          ${q.hint ? `<p class="hint">${q.hint}</p>` : ""}
          ${renderQuestionBody(q)}
          <div class="form-actions">
            <button class="btn btn-secondary" ${state.current === 0 ? 'disabled style="opacity:.45;cursor:not-allowed"' : ""} id="backBtn">← Atrás</button>
            <div class="feedback" id="feedback">${state.feedback || ""}</div>
            ${q.type === "single" ? "" : '<button class="btn btn-primary" id="nextBtn">Siguiente →</button>'}
          </div>
        `;

                    document
                        .getElementById("backBtn")
                        .addEventListener("click", goBack);

                    if (q.type === "single") {
                        document
                            .querySelectorAll(".answer-card")
                            .forEach((card) => {
                                card.addEventListener("click", () =>
                                    selectSingle(q, card.dataset.value),
                                );
                            });
                    }

                    if (q.type === "multi") {
                        const saved = state.answers[q.id]?.value || [];
                        document
                            .querySelectorAll(".answer-card")
                            .forEach((card) => {
                                if (saved.includes(card.dataset.value))
                                    card.classList.add("selected");
                                card.addEventListener("click", () => {
                                    card.classList.toggle("selected");
                                    const selected = [
                                        ...document.querySelectorAll(
                                            ".answer-card.selected",
                                        ),
                                    ].map((el) => el.dataset.value);
                                    state.answers[q.id] = {
                                        value: selected,
                                        score: selected
                                            .map(
                                                (text) =>
                                                    q.options.find(
                                                        (o) => o.text === text,
                                                    )?.score,
                                            )
                                            .filter(Boolean),
                                        icon:
                                            selected.length === 1
                                                ? q.options.find(
                                                      (o) =>
                                                          o.text ===
                                                          selected[0],
                                                  )?.icon
                                                : "✨",
                                    };
                                });
                            });
                        document
                            .getElementById("nextBtn")
                            .addEventListener("click", () => {
                                if (
                                    !state.answers[q.id] ||
                                    state.answers[q.id].value.length === 0
                                ) {
                                    setFeedback(
                                        "Elige al menos una opción para seguir 🙂",
                                    );
                                    return;
                                }
                                nextQuestion();
                            });
                    }

                    if (q.type === "text") {
                        const input = document.getElementById("textAnswer");
                        input.value = state.answers[q.id]?.value || "";
                        document
                            .getElementById("nextBtn")
                            .addEventListener("click", () => {
                                const value = input.value.trim();
                                if (!value) {
                                    setFeedback(
                                        "Por favor responde antes de continuar ✨",
                                    );
                                    return;
                                }
                                state.answers[q.id] = { value, icon: "💬" };
                                nextQuestion();
                            });
                    }

                    if (q.type === "number") {
                        const input = document.getElementById("numberAnswer");
                        input.value = state.answers[q.id]?.value || "";
                        input.addEventListener("input", () => {
                            input.value = input.value.replace(/[^0-9]/g, "");
                        });
                        document
                            .getElementById("nextBtn")
                            .addEventListener("click", () => {
                                const value = input.value.trim();
                                if (!value || Number(value) <= 0) {
                                    setFeedback(
                                        "Debes escribir un número válido para continuar 💡",
                                    );
                                    return;
                                }
                                state.answers[q.id] = { value, icon: "💡" };
                                nextQuestion();
                            });
                    }

                    if (q.type === "contact") {
                        const nextBtn = document.getElementById("nextBtn");
                        nextBtn.textContent = "Ver mi propuesta solar →";
                        nextBtn.addEventListener("click", () => {
                            const name = document
                                .getElementById("name")
                                .value.trim();
                            const whatsapp = document
                                .getElementById("whatsapp")
                                .value.trim();
                            const email = document
                                .getElementById("email")
                                .value.trim();
                            if (!name || !whatsapp) {
                                setFeedback(
                                    "Completa tu nombre y WhatsApp para ver tu perfil ✨",
                                );
                                return;
                            }
                            state.answers.contact = {
                                value: { name, whatsapp, email },
                                icon: "📩",
                            };
                            showResults();
                        });
                    }
                }

                function renderQuestionBody(q) {
                    if (q.type === "single" || q.type === "multi") {
                        return `<div class="answers">${q.options
                            .map(
                                (option) => `
            <button class="answer-card" data-value="${option.text}">
              <span class="answer-icon">${iconSvg(option.icon, 22)}</span>
              <span class="answer-text">${option.text}</span>
            </button>`,
                            )
                            .join("")}</div>`;
                    }
                    if (q.type === "text") {
                        return `<div class="input-group"><textarea id="textAnswer" placeholder="${q.placeholder || ""}"></textarea></div>`;
                    }
                    if (q.type === "number") {
                        return `<div class="input-group"><input id="numberAnswer" type="text" inputmode="numeric" pattern="[0-9]*" required placeholder="${q.placeholder || ""}" /></div>`;
                    }
                    if (q.type === "contact") {
                        return `
            <div class="input-group">
              ${q.fields.map((field) => `<input id="${field.name}" type="${field.type}" placeholder="${field.label}" ${field.required ? "required" : ""} />`).join("")}
            </div>
            <p class="privacy">${iconSvg("lock", 16)} Solo usamos tus datos para enviarte tu recomendación. Sin spam.</p>
          `;
                    }
                    return "";
                }

                function selectSingle(q, value) {
                    const selectedOption = q.options.find(
                        (option) => option.text === value,
                    );
                    state.answers[q.id] = {
                        value,
                        score: selectedOption?.score || null,
                        icon: selectedOption?.icon || "sparkles",
                    };
                    document
                        .querySelectorAll(".answer-card")
                        .forEach((card) => card.classList.remove("selected"));
                    [...document.querySelectorAll(".answer-card")]
                        .find((card) => card.dataset.value === value)
                        ?.classList.add("selected");
                    setFeedback("Perfecto, sigamos");
                    setTimeout(nextQuestion, 520);
                }

                function nextQuestion() {
                    state.feedback = "";
                    if (state.current < questions.length - 1) {
                        state.current += 1;
                        renderQuestion();
                    } else {
                        showResults();
                    }
                }

                function goBack() {
                    if (state.current > 0) {
                        state.current -= 1;
                        state.feedback = "";
                        renderQuestion();
                    }
                }

                function setFeedback(text) {
                    state.feedback = text;
                    const feedback = document.getElementById("feedback");
                    if (feedback) feedback.textContent = text;
                }

                function getAnswerEmoji(index) {
                    const question = questions[index];
                    if (!question) return null;
                    const answer = state.answers[question.id];
                    if (!answer) return null;

                    if (answer.icon) return answer.icon;

                    if (question.type === "single") {
                        return (
                            question.options.find(
                                (option) => option.text === answer.value,
                            )?.icon || "sparkles"
                        );
                    }

                    if (question.type === "multi") {
                        if (!answer.value || answer.value.length === 0)
                            return null;
                        if (answer.value.length === 1)
                            return (
                                question.options.find(
                                    (option) => option.text === answer.value[0],
                                )?.icon || "sparkles"
                            );
                        return "sparkles";
                    }

                    if (question.type === "text")
                        return answer.value ? "message" : null;
                    if (question.type === "number")
                        return answer.value ? "lightbulb" : null;
                    if (question.type === "contact") return "mail";
                    return "sparkles";
                }

                function getProfileVideoHTML(profileKey) {
                    const key = (profileKey || "").toLowerCase().trim();
                    const videos = {
                        resiliente:
                            "https://nlnmadhpatoiuzhmhcsu.supabase.co/storage/v1/object/sign/videos%20perfiles/Resiliente%20(1)%20(1).mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xMzFmMTE3Yy1iMDhkLTRmMTItOTBjNy0xM2IyOGJlNTVlNzMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlb3MgcGVyZmlsZXMvUmVzaWxpZW50ZSAoMSkgKDEpLm1wNCIsImlhdCI6MTc3Nzk0NjMxMywiZXhwIjoxNzgwNTM4MzEzfQ.na6BawX5F1yYD0sLUfWFxcLmirlnMHXXa-5uVxC0bBk",
                        optimizador:
                            "https://nlnmadhpatoiuzhmhcsu.supabase.co/storage/v1/object/sign/videos%20perfiles/optimizador%20(1)%20(1).mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xMzFmMTE3Yy1iMDhkLTRmMTItOTBjNy0xM2IyOGJlNTVlNzMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlb3MgcGVyZmlsZXMvb3B0aW1pemFkb3IgKDEpICgxKS5tcDQiLCJpYXQiOjE3Nzc5NDg1NzQsImV4cCI6MTgwOTQ4NDU3NH0.Mu7D788RwA6acrLJGcgdAULY2SnRX7wHrjGdrZAjprE",
                        green: "https://nlnmadhpatoiuzhmhcsu.supabase.co/storage/v1/object/sign/videos%20perfiles/Resiliente%20(1)%20(1).mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xMzFmMTE3Yy1iMDhkLTRmMTItOTBjNy0xM2IyOGJlNTVlNzMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlb3MgcGVyZmlsZXMvUmVzaWxpZW50ZSAoMSkgKDEpLm1wNCIsImlhdCI6MTc3Nzk0NzA5NiwiZXhwIjoxODA5NDgzMDk2fQ.IdFdHNPlBu8rnyYFHc07Km7a8psufR4RHf-38dtN43k",
                        verde: "https://nlnmadhpatoiuzhmhcsu.supabase.co/storage/v1/object/sign/videos%20perfiles/Resiliente%20(1)%20(1).mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xMzFmMTE3Yy1iMDhkLTRmMTItOTBjNy0xM2IyOGJlNTVlNzMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlb3MgcGVyZmlsZXMvUmVzaWxpZW50ZSAoMSkgKDEpLm1wNCIsImlhdCI6MTc3Nzk0NzA5NiwiZXhwIjoxODA5NDgzMDk2fQ.IdFdHNPlBu8rnyYFHc07Km7a8psufR4RHf-38dtN43k",
                    };

                    if (!videos[key]) return "";

                    return `
          <video class="profile-video" controls preload="metadata" playsinline>
            <source src="${videos[key]}" type="video/mp4">
            Tu navegador no soporta video.
          </video>
        `;
                }

                function calculateProfile() {
                    const scores = { resiliente: 0, optimizador: 0, green: 0 };

                    Object.values(state.answers).forEach((answer) => {
                        if (!answer.score) return;

                        if (Array.isArray(answer.score)) {
                            answer.score.forEach((score) => {
                                if (
                                    Object.prototype.hasOwnProperty.call(
                                        scores,
                                        score,
                                    )
                                ) {
                                    scores[score]++;
                                }
                            });
                        } else {
                            if (
                                Object.prototype.hasOwnProperty.call(
                                    scores,
                                    answer.score,
                                )
                            ) {
                                scores[answer.score]++;
                            }
                        }
                    });

                    // Desempate:
                    // resiliente primero porque respaldo ante apagones es una necesidad crítica.
                    // luego optimizador, luego green.
                    const priority = ["resiliente", "optimizador", "green"];
                    let winner = "optimizador";
                    let best = -1;

                    priority.forEach((profile) => {
                        if (scores[profile] > best) {
                            best = scores[profile];
                            winner = profile;
                        }
                    });

                    return winner;
                }

                function getFirstTimeFollowUpMessage(profileKey, profile) {
                    const contact = state.answers.contact?.value || {};
                    const userName = contact.name || "Hola";

                    const messages = {
                        resiliente: `¡Hola ${userName}! 👋 Sabemos que para ti la tranquilidad en casa es clave. En breve te contactaremos para hablar contigo sobre cómo la energía solar puede ayudarte a tener más respaldo y confianza en tu hogar.`,
                        optimizador: `¡Hola ${userName}! 💸 Vimos que tu prioridad es entender mejor tu factura y encontrar una forma más inteligente de usar la energía. Muy pronto te contactaremos para mostrarte cómo la energía solar podría ayudarte a optimizar tu consumo.`,
                        green: `¡Hola ${userName}! 🌿 Nos encanta que estés pensando en un hogar más sostenible. En breve te contactaremos para conversar sobre cómo la energía solar puede ayudarte a dar ese paso de forma simple y clara.`,
                        explorador: `¡Hola ${userName}! 🧭 Sabemos que estás explorando opciones y quieres entender antes de decidir. Muy pronto te contactaremos para explicarte cómo la energía solar podría adaptarse a tu hogar sin complicaciones.`,
                    };

                    return (
                        messages[profileKey] ||
                        `¡Hola ${userName}! ☀️ En breve te contactaremos para hablar más sobre cómo la energía solar puede transformar la forma en que tu hogar usa la energía.`
                    );
                }

                function showResults() {
                    updateBackground(true);
                    const profileKey = calculateProfile();
                    const profile = profileContent[profileKey];
                    const metrics = getMetricsForProfile(profileKey);

                    const normalizedKey = (profileKey || "")
                        .toLowerCase()
                        .trim();

                    const profileVideos = {
                        resiliente:
                            "https://nlnmadhpatoiuzhmhcsu.supabase.co/storage/v1/object/sign/videos%20perfiles/Resiliente%20(1)%20(1).mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xMzFmMTE3Yy1iMDhkLTRmMTItOTBjNy0xM2IyOGJlNTVlNzMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlb3MgcGVyZmlsZXMvUmVzaWxpZW50ZSAoMSkgKDEpLm1wNCIsImlhdCI6MTc3Nzk0NjMxMywiZXhwIjoxNzgwNTM4MzEzfQ.na6BawX5F1yYD0sLUfWFxcLmirlnMHXXa-5uVxC0bBk",
                        optimizador:
                            "https://nlnmadhpatoiuzhmhcsu.supabase.co/storage/v1/object/sign/videos%20perfiles/optimizador%20(1)%20(1).mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xMzFmMTE3Yy1iMDhkLTRmMTItOTBjNy0xM2IyOGJlNTVlNzMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlb3MgcGVyZmlsZXMvb3B0aW1pemFkb3IgKDEpICgxKS5tcDQiLCJpYXQiOjE3Nzc5NDg1NzQsImV4cCI6MTgwOTQ4NDU3NH0.Mu7D788RwA6acrLJGcgdAULY2SnRX7wHrjGdrZAjprE",
                        green: "https://nlnmadhpatoiuzhmhcsu.supabase.co/storage/v1/object/sign/videos%20perfiles/Resiliente%20(1)%20(1).mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xMzFmMTE3Yy1iMDhkLTRmMTItOTBjNy0xM2IyOGJlNTVlNzMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlb3MgcGVyZmlsZXMvUmVzaWxpZW50ZSAoMSkgKDEpLm1wNCIsImlhdCI6MTc3Nzk0NzA5NiwiZXhwIjoxODA5NDgzMDk2fQ.IdFdHNPlBu8rnyYFHc07Km7a8psufR4RHf-38dtN43k",
                    };

                    const videoHTML = profileVideos[normalizedKey]
                        ? `
            <div class="result-video-block">
              <p class="result-overline">Conoce más sobre tu plan</p>
              <video class="profile-video result-profile-video" controls autoplay muted playsinline preload="metadata">
                <source src="${profileVideos[normalizedKey]}" type="video/mp4">
              </video>
            </div>
          `
                        : "";

                    const firstTimeMessage = getFirstTimeFollowUpMessage(
                        profileKey,
                        profile,
                    );
                    formPage.classList.add("hidden");
                    home.classList.add("hidden");
                    resultsPage.classList.remove("hidden");
                    hideReturningMiniCard();

                    const resultMetric = getResultMetric(
                        profileKey,
                        metrics.savings,
                        metrics.backup,
                    );

                    resultsPage.innerHTML = `
          <section class="final-stage result-modern-stage page">
            <nav class="result-nav result-modern-nav">
              <div class="brand result-brand">
                <img src="https://mzfiuuohoeoqpsrqmcju.supabase.co/storage/v1/object/sign/imagenes%20timeline%20assesment/logo%20gdo%20positivo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZjJmNzAwMC04YTA2LTQ5NzYtYjJmNS05ZDljNWZhNDdmYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZW5lcyB0aW1lbGluZSBhc3Nlc21lbnQvbG9nbyBnZG8gcG9zaXRpdm8ucG5nIiwiaWF0IjoxNzc5MTUyMzg1LCJleHAiOjE4MTA2ODgzODV9.F_S64OV5Z_TLF4r6cdGCeA7Nu0HfrFPE8fHxjzupXiQ" alt="Logo GDO" class="logo-gdo" />
              </div>
              <button class="btn result-nav-btn" id="resultHomeBtn" type="button">Volver al inicio</button>
            </nav>

            <div class="final-content result-modern-content">
              <p class="result-kicker">${iconSvg("check", 16)} Propuesta personalizada lista</p>

              <section class="result-hero-card">
                <p class="result-overline">Tu perfil solar GdO</p>
                <h1 class="result-profile-title">${profile.name}</h1>
                <p class="result-plan-text result-profile-lead">${profile.explanation}</p>

                <div class="result-actions-primary result-actions-under-title">
                  <button class="btn result-contact-main" id="mainCtaBtn">Contáctenme</button>
                  <button class="btn result-acquire-main" id="acquirePlanBtn" type="button">Adquirir plan</button>
                </div>
              </section>

              <section class="result-metric-card">
                <p class="result-overline">${resultMetric.label}</p>
                <h2 class="result-main-title">${resultMetric.title}</h2>
                <div class="result-savings-number">${resultMetric.value}</div>
                <p class="result-subcopy">${resultMetric.note}</p>
              </section>

              <div class="result-metrics-grid result-secondary-metrics">
                <div class="result-metric-box">
                  <span>Batería de respaldo</span>
                  <strong>${metrics.backup}</strong>
                </div>
                <div class="result-metric-box">
                  <span>Paneles en comodato</span>
                  <strong>${iconSvg("check", 18)} Incluidos</strong>
                </div>
              </div>

              <div class="profile-summary-row result-summary-row">
                <div class="profile-summary-card">
                  <strong>${iconSvg("check", 17)} Lo que ganas</strong>
                  <p>${profile.gain}</p>
                </div>
                <div class="profile-summary-card">
                  <strong>${iconSvg("scale", 17)} Lo que debes saber</strong>
                  <p>${profile.tradeoff}</p>
                </div>
              </div>

              ${videoHTML}

              <p class="final-followup result-followup">${firstTimeMessage}</p>

              <div class="result-actions-primary">
                <button class="btn result-simulator-main simulatorBtn" type="button">Ir al simulador</button>
              </div>

              <p id="saveStatus" class="result-save-status">Guardando tu perfil...</p>

              <div class="result-bottom-actions">
                <button class="btn result-ghost-btn" id="restartBtn">Repetir quiz</button>
                <button class="btn result-ghost-btn" id="homeResultBtn">Volver al inicio</button>
              </div>
            </div>
          </section>
        `;

                    document
                        .getElementById("restartBtn")
                        .addEventListener("click", startForm);
                    document
                        .getElementById("homeResultBtn")
                        .addEventListener("click", showHome);
                    document
                        .getElementById("resultHomeBtn")
                        ?.addEventListener("click", showHome);
                    document
                        .getElementById("mainCtaBtn")
                        ?.addEventListener("click", () => {
                            const contact = state.answers.contact?.value || {};
                            const wa = contact.whatsapp || "";
                            if (wa) {
                                window.open(
                                    `https://wa.me/57${wa.replace(/\D/g, "").slice(-10)}?text=Hola%20GdO%20Solar%2C%20quiero%20conocer%20m%C3%A1s%20sobre%20mi%20plan%20personalizado`,
                                    "_blank",
                                );
                            } else {
                                alert(
                                    "Un asesor de GdO Solar te contactará pronto por WhatsApp.",
                                );
                            }
                        });
                    document
                        .getElementById("acquirePlanBtn")
                        ?.addEventListener("click", () => {
                            document.getElementById("mainCtaBtn")?.click();
                        });
                    document
                        .querySelectorAll(".simulatorBtn")
                        .forEach((btn) => {
                            btn.addEventListener("click", () =>
                                window.open(
                                    "https://subsolar-user-fit.vercel.app/",
                                    "_blank",
                                ),
                            );
                        });

                    if (!state.savedToSupabase) {
                        saveSubmissionToSupabase(profileKey, profile, metrics);
                    }

                    window.scrollTo({ top: 0, behavior: "smooth" });
                }

                function buildAnswersPayload(leadId) {
                    return questions
                        .filter((question) => state.answers[question.id])
                        .map((question, index) => {
                            const answer = state.answers[question.id];
                            const rawValue = answer.value;
                            const answerLabel = Array.isArray(rawValue)
                                ? rawValue.join(", ")
                                : String(rawValue ?? "");

                            return {
                                lead_id: leadId,
                                question_index: index + 1,
                                question_id: question.id,
                                question_block: question.block,
                                question_text: question.question,
                                question_type: question.type,
                                answer_value: rawValue,
                                answer_label: answerLabel,
                                answer_icon:
                                    answer.icon || getAnswerEmoji(index),
                                answer_score: answer.score || null,
                            };
                        });
                }

                async function saveSubmissionToSupabase(
                    profileKey,
                    profile,
                    metrics,
                ) {
                    const saveStatus = document.getElementById("saveStatus");

                    try {
                        const contact = state.answers.contact?.value || {};

                        // Generamos el ID en el navegador para NO depender de .select() después del insert.
                        // Con RLS, Supabase puede permitir INSERT pero bloquear SELECT; eso hacía que pareciera que no guardaba.
                        const leadId = crypto.randomUUID();

                        const leadPayload = {
                            id: leadId,
                            name: contact.name,
                            whatsapp: normalizePhone(contact.whatsapp),
                            email: contact.email || null,
                            profile_key: profileKey,
                            profile_name: profile.name,
                            profile_emoji: profile.emoji,
                            profile_explanation: profile.explanation,
                            profile_gain: profile.gain,
                            profile_tradeoff: profile.tradeoff,
                            backup_hours: metrics.backup,
                            estimated_savings: metrics.savings,
                            source: "gdo_solar_spa",
                        };

                        const { error: leadError } = await supabaseClient
                            .from("solar_leads")
                            .insert(leadPayload);

                        if (leadError) throw leadError;

                        const answersPayload = buildAnswersPayload(leadId);

                        const { error: answersError } = await supabaseClient
                            .from("solar_quiz_answers")
                            .insert(answersPayload);

                        if (answersError) throw answersError;

                        state.savedToSupabase = true;
                        if (saveStatus)
                            saveStatus.textContent =
                                "✅ Perfil guardado correctamente.";

                        // Enviar correo de gracias si el usuario dejó su email
                        if (contact.email) {
                            const templateParams = {
                                to_name: contact.name || "visitante",
                                to_email: contact.email,
                            };
                            console.log(
                                "📧 Enviando correo a:",
                                contact.email,
                                templateParams,
                            );
                            emailjs
                                .send(
                                    "service_x2uwy1b",
                                    "template_zydmo9h",
                                    templateParams,
                                )
                                .then(() =>
                                    console.log(
                                        "✅ Correo enviado correctamente",
                                    ),
                                )
                                .catch((err) =>
                                    console.error(
                                        "❌ EmailJS error:",
                                        JSON.stringify(err),
                                    ),
                                );
                        } else {
                            console.warn(
                                "⚠️ No se envió correo: el usuario no dejó email",
                            );
                        }
                    } catch (error) {
                        console.error("Error guardando en Supabase:", error);
                        if (saveStatus)
                            saveStatus.textContent =
                                "⚠️ No se pudo guardar en Supabase. Revisa URL, anon key, tablas y policies.";
                    }
                }

                function getMascotSpeech(q) {
                    const map = {
                        motivation:
                            "Empecemos por lo más importante: ¿qué te hizo pensar en energía solar?",
                        priority:
                            "Esto nos ayuda a definir qué plan se adapta mejor a tu hogar.",
                        homeUse:
                            "Cada hogar tiene un ritmo diferente. No hay respuestas malas.",
                        energyTime:
                            "El horario de consumo puede cambiar la recomendación del plan.",
                        billFeeling:
                            "Hablemos de tu factura — es lo que más transforma el servicio solar.",
                        outageFrequency:
                            "Ahora veamos qué tanto pesa el tema de los cortes.",
                        outageDuration:
                            "La duración de los cortes nos ayuda a definir la batería de respaldo.",
                        generator:
                            "Esto nos ayuda a entender si ya tienes algún apoyo cuando se va la luz.",
                        criticalLoads:
                            "Piensa en lo que de verdad te dolería perder en un apagón.",
                        acUse: "En ciudades calientes, el aire puede ser una carga muy importante.",
                        fridges:
                            "Las neveras son clave porque suelen estar encendidas todo el tiempo.",
                        concern:
                            "Cuéntame cualquier duda. Aquí no hay preguntas tontas.",
                        contact:
                            "Ya tengo tu propuesta lista. Déjame tus datos para enviártela personalizada.",
                    };
                    return map[q.id] || "Sigamos paso a paso.";
                }

                function updateBackground(isResult = false) {
                    document.body.style.transition =
                        "background 0.8s ease, color 0.3s ease";
                    formPage.classList.remove(
                        "phase-1",
                        "phase-2",
                        "phase-3",
                        "phase-4",
                    );

                    if (isResult) {
                        document.body.style.background = "#000";
                        document.body.style.color = "white";
                        return;
                    }

                    const step = state.current;
                    document.body.style.color = "var(--ink)";

                    if (step < 3) formPage.classList.add("phase-1");
                    else if (step < 7) formPage.classList.add("phase-2");
                    else if (step < 11) formPage.classList.add("phase-3");
                    else formPage.classList.add("phase-4");
                }

                document
                    .querySelectorAll("[data-start-form]")
                    .forEach((button) =>
                        button.addEventListener("click", startForm),
                    );

                if (returningLookupBtn)
                    returningLookupBtn.addEventListener(
                        "click",
                        findPreviousResultFromMiniCard,
                    );
                if (returningPhoneInput) {
                    returningPhoneInput.addEventListener("keydown", (event) => {
                        if (event.key === "Enter")
                            findPreviousResultFromMiniCard();
                    });
                }
                if (returningMiniClose)
                    returningMiniClose.addEventListener(
                        "click",
                        hideReturningMiniCard,
                    );

                if (closeStartModal)
                    closeStartModal.addEventListener(
                        "click",
                        closeStartCheckModal,
                    );
                if (newFormBtn)
                    newFormBtn.addEventListener("click", () => {
                        closeStartCheckModal();
                        startForm();
                    });
                if (alreadyAnsweredBtn)
                    alreadyAnsweredBtn.addEventListener(
                        "click",
                        showPhoneLookupStep,
                    );
                if (startAnywayBtn)
                    startAnywayBtn.addEventListener("click", () => {
                        closeStartCheckModal();
                        startForm();
                    });
                if (lookupResultBtn)
                    lookupResultBtn.addEventListener(
                        "click",
                        findPreviousResultByPhone,
                    );
                if (lookupPhoneInput) {
                    lookupPhoneInput.addEventListener("keydown", (event) => {
                        if (event.key === "Enter") findPreviousResultByPhone();
                    });
                }
                if (startCheckModal) {
                    startCheckModal.addEventListener("click", (event) => {
                        if (event.target === startCheckModal)
                            closeStartCheckModal();
                    });
                }

                document.querySelectorAll("[data-scroll]").forEach((button) => {
                    button.addEventListener("click", () => {
                        const target = document.getElementById(
                            button.dataset.scroll,
                        );
                        if (target)
                            target.scrollIntoView({ behavior: "smooth" });
                    });
                });
                if (homeBtn) homeBtn.addEventListener("click", showHome);

                const revealObserver = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting)
                                entry.target.classList.add("visible");
                        });
                    },
                    { threshold: 0.16 },
                );
                document
                    .querySelectorAll(".reveal")
                    .forEach((el) => revealObserver.observe(el));

                if (sunOrb && sunTip) {
                    sunOrb.addEventListener("click", () => {
                        sunTip.textContent =
                            "Tip: responde pensando en tu casa real, no en términos técnicos ✨";
                        sunTip.classList.toggle("show");
                        setTimeout(() => sunTip.classList.remove("show"), 3600);
                    });
                }

                const previewMessages = {
                    ahorro: {
                        emoji: "wallet",
                        text: "Con GdO Solar pagas una tarifa mensual fija. Nada de facturas que suben y bajan: sabes exactamente cuánto sale cada mes y cuánto te ahorras versus el servicio tradicional.",
                    },
                    respaldo: {
                        emoji: "battery",
                        text: "Todos nuestros planes incluyen una batería que se carga con energía solar. Cuando los paneles no están produciendo — o hay un apagón — la batería mantiene tu casa encendida.",
                    },
                    green: {
                        emoji: "leaf",
                        text: "Los paneles que generan tu energía son nuestros: nosotros nos encargamos de la instalación, el mantenimiento y el rendimiento. Tú solo disfrutas la energía limpia sin complicaciones.",
                    },
                };

                document
                    .querySelectorAll("[data-preview]")
                    .forEach((button) => {
                        button.addEventListener("click", () => {
                            const key = button.dataset.preview;
                            const data = previewMessages[key];
                            const card = document.getElementById("previewCard");

                            document
                                .querySelectorAll("[data-preview]")
                                .forEach((btn) =>
                                    btn.classList.remove("active"),
                                );
                            button.classList.add("active");

                            if (!card || !data) return;

                            card.classList.add("is-changing");

                            setTimeout(() => {
                                card.innerHTML = `<div class="preview-emoji">${iconSvg(data.emoji, 26)}</div><p>${data.text}</p>`;
                                card.classList.remove("is-changing");
                            }, 180);
                        });
                    });

                const quickTips = [
                    "Tip: con GdO Solar no compras los paneles — nosotros somos los dueños. Tú pagas una suscripción mensual fija 🏠",
                    "Tip: todos nuestros planes incluyen batería de respaldo. Cuando se va la luz, tu casa sigue encendida 🔋",
                    "Tip: a diferencia del servicio tradicional, nuestra tarifa no sube mes a mes. Es fija. Siempre. 💸",
                    "Tip: el quiz te dará un estimado de ahorro basado en lo que pagas hoy de energía 🧭",
                ];
                if (randomTip && sunTip) {
                    randomTip.addEventListener("click", () => {
                        sunTip.textContent =
                            quickTips[
                                Math.floor(Math.random() * quickTips.length)
                            ];
                        sunTip.classList.add("show");
                        setTimeout(() => sunTip.classList.remove("show"), 4200);
                    });
                }

                // Simulator-specific navigation only
                document
                    .querySelectorAll(
                        "button.simulatorBtn, a.simulatorBtn, [data-open-simulator]",
                    )
                    .forEach((btn) => {
                        btn.addEventListener("click", (event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            window.open(
                                "https://subsolar-user-fit.vercel.app/",
                                "_blank",
                            );
                        });
                    });

                // Simulator-only links. Form buttons keep using data-start-form.
                document
                    .querySelectorAll(
                        "button.simulatorBtn, a.simulatorBtn, span.simulatorBtn, [data-open-simulator]",
                    )
                    .forEach((btn) => {
                        btn.addEventListener("click", (event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            window.open(
                                "https://subsolar-user-fit.vercel.app/",
                                "_blank",
                            );
                        });
                    });

                if (dropTarget) {
                    document.querySelectorAll(".drag-chip").forEach((chip) => {
                        chip.addEventListener("dragstart", (event) =>
                            event.dataTransfer.setData(
                                "text/plain",
                                chip.textContent,
                            ),
                        );
                    });
                    dropTarget.addEventListener("dragover", (event) => {
                        event.preventDefault();
                        dropTarget.classList.add("drag-over");
                    });
                    dropTarget.addEventListener("dragleave", () =>
                        dropTarget.classList.remove("drag-over"),
                    );
                    dropTarget.addEventListener("drop", (event) => {
                        event.preventDefault();
                        const value = event.dataTransfer.getData("text/plain");
                        dropTarget.textContent = `Tu prioridad inicial: ${value}`;
                        dropTarget.classList.remove("drag-over");
                        dropTarget.classList.add("filled");
                        setTimeout(openStartCheckModal, 900);
                    });
                }
            
};



            function goToSimulator() {
                window.open("https://subsolar-user-fit.vercel.app/", "_blank");
            }

            // FIX resultHomeBtn navigation (delegated listener)
            document.addEventListener("click", function (e) {
                if (e.target && e.target.id === "resultHomeBtn") {
                    if (typeof showHome === "function") {
                        showHome();
                    }
                }
            });
        


            function goBackToLandingFromResult() {
                const home = document.getElementById("home");
                const formPage = document.getElementById("formPage");
                const resultsPage = document.getElementById("resultsPage");

                if (resultsPage) resultsPage.classList.add("hidden");
                if (formPage) formPage.classList.add("hidden");
                if (home) home.classList.remove("hidden");

                document.body.style.color = "var(--ink)";
                document.body.style.background = `
    radial-gradient(circle at 8% 8%, rgba(255, 231, 122, .34), transparent 26%),
    radial-gradient(circle at 92% 2%, rgba(19, 167, 107, .18), transparent 28%),
    linear-gradient(180deg, var(--cream) 0%, #f8fdff 38%, #ffffff 70%, #f4fbf8 100%)
  `;

                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        