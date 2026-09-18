import React, { useState } from 'react';

// --- TRANSLATIONS DICTIONARY ---
const translations = {
  en: {
    title: "AI Odyssey: Deep Learning Explorer",
    subtitle: "Give your computer a Super Brain! 🧠",
    toggleText: "తెలుగు",
    steps: [
      { id: 1, title: "1. Basics", subtitle: "Definition & How it Works" },
      { id: 2, title: "2. Intermediate", subtitle: "Neural Networks, Activations & Libraries" },
      { id: 3, title: "3. Advanced", subtitle: "CNN, RNN & GenAI Revolution" }
    ],
    step1Header: "Deep Learning Fundamentals",
    step1Desc: "Understand how deep learning mimics the human brain to learn automatically from massive data.",
    defTitle: "1. Definition",
    defText: "While standard Machine Learning requires manual human help (Feature Engineering), Deep Learning analyzes massive amounts of data automatically and extracts patterns by itself using multi-layered Artificial Neural Networks (ANN).",
    howTitle: "2. How it Works (The Child Learning Analogy)",
    howText: "Just like small children learn to recognize a cat or dog when parents repeatedly show them examples, Deep Learning allows computers to process countless photos and videos to independently identify objects.",
    appsTitle: "3. Real-world Applications",
    apps: [
      { name: "Facial Recognition", desc: "Unlocking phones using face detection." },
      { name: "Autonomous Vehicles", desc: "Self-driving cars navigating surroundings." },
      { name: "Voice Assistants", desc: "Google Assistant and Alexa understanding speech." },
      { name: "GenAI & Translation", desc: "ChatGPT and Google Translate modern power." }
    ],
    step2Header: "Intermediate Core Mechanics",
    step2Desc: "Peek inside the inner workings of Deep Learning models.",
    nnTitle: "1. Neural Networks (ANN) - Fruit Identification Example",
    nnLayers: [
      { name: "Input Layer", desc: "Receives raw data like color (red/yellow) and shape." },
      { name: "Hidden Layers", desc: "Deep analytical layers comparing patterns ('Red + Round = Apple?')." },
      { name: "Output Layer", desc: "Delivers the final prediction ('It is definitely an Apple!')." }
    ],
    actTitle: "2. Activation Functions (Theater Security Guard Analogy)",
    activations: [
      { name: "ReLU", desc: "Strict gate: Passes positive values through, blocks (zeros out) negative values for fast learning." },
      { name: "Sigmoid", desc: "Binary check: Gives probability between 0 and 1 (e.g., Pass/Fail)." },
      { name: "Softmax", desc: "Multi-choice selector: Chooses the highest probability option when there are 3+ choices (Tea, Coffee, Milk)." }
    ],
    libTitle: "3. Python Libraries (The LEGO Toy Box)",
    libraries: [
      { name: "TensorFlow", desc: "Google's heavy-duty industrial builder blocks." },
      { name: "Keras", desc: "User-friendly, simple wrapper layer for quick coding." },
      { name: "PyTorch", desc: "Meta's researcher-favorite toolkit for easy debugging." }
    ],
    step3Header: "Advanced AI Revolution",
    step3Desc: "Explore computer vision, memory sequences, and creative generative intelligence.",
    advItems: [
      { 
        title: "1. CNN (Computer Eye Sight)", 
        desc: "Breaks images down into grids/filters. First layers spot edges, middle layers find shapes (noses, eyes), and final layers recognize the full face or medical X-ray abnormality." 
      },
      { 
        title: "2. RNN & LSTM (Memory & Sequence)", 
        desc: "Unlike standard networks, these have memory to remember past words in a sentence to predict the next word accurately. Used in Google Translate and predictive keyboard typing." 
      },
      { 
        title: "3. Transformers & GenAI (Modern Creative Leap)", 
        desc: "Powered by the Attention Mechanism to process entire sentences at once. Powers ChatGPT for text writing and Midjourney/DALL-E for instant image creation from words." 
      }
    ],
    quizTitle: "Knowledge Check Quiz 🎯",
    quizQuestions: [
      {
        q: "Which layer in a Neural Network performs deep analysis of patterns?",
        options: ["Input Layer", "Hidden Layers", "Output Layer", "Activation Gate"],
        correct: 1,
        explanation: "Hidden layers are deep inside the network and analyze complex patterns."
      },
      {
        q: "Which AI architecture gives 'computer eye sight' for image recognition?",
        options: ["RNN", "CNN", "LSTM", "Standard ANN"],
        correct: 1,
        explanation: "CNN (Convolutional Neural Networks) excels at computer vision and image processing."
      }
    ],
    correctMsg: "Correct! 🎉 Excellent job.",
    incorrectMsg: "Not quite. Try again! 💡",
    footerText: "Designed for Students • Bilingual Deep Learning Learning Module"
  },
  te: {
    title: "ఏఐ ఒడిస్సీ: డీప్ లెర్నింగ్ ఎక్స్‌ప్లోరర్",
    subtitle: "మీ కంప్యూటర్‌కు ఒక 'సూపర్ బ్రెయిన్' ఇవ్వండి! 🧠",
    toggleText: "English",
    steps: [
      { id: 1, title: "1. బేసిక్స్", subtitle: "నిర్వచనం & పనిచేసే విధానం" },
      { id: 2, title: "2. ఇంటర్మీడియట్", subtitle: "న్యూరల్ నెట్‌వర్క్స్, యాక్టివేషన్స్ & లైబ్రరీలు" },
      { id: 3, title: "3. అడ్వాన్స్‌డ్", subtitle: "CNN, RNN & జెనరేటివ్ AI విప్లవం" }
    ],
    step1Header: "డీప్ లెర్నింగ్ ప్రాథమిక భావనలు",
    step1Desc: "మానవ మెదడును పోలి ఉండే డీప్ లెర్నింగ్ పెద్ద డేటా నుండి ఎలా స్వయంగా నేర్చుకుంటుందో తెలుసుకోండి.",
    defTitle: "1. డెఫినిషన్ (Definition)",
    defText: "సాధారణ మెషిన్ లెర్నింగ్‌కు మనుషుల సహాయం (Feature Engineering) కొద్దిగా అవసరం అవుతుంది. కానీ డీప్ లెర్నింగ్ పెద్ద మొత్తంలో ఉన్న డేటాను విశ్లేషించి, కృత్రిమ న్యూరల్ నెట్‌వర్క్స్ (ANN) ద్వారా స్వయంగా నేర్చుకుంటుంది.",
    howTitle: "2. ఇది ఎలా పనిచేస్తుంది? (చిన్నపిల్లల లెర్నింగ్ ఉదాహరణ)",
    howText: "చిన్నపిల్లలు అమ్మ లేదా నాన్న రోజూ 'ఇది కుక్క, ఇది పిల్లి' అని చూపిస్తుంటే మెదడు గుర్తుపెట్టుకున్నట్లే, డీప్ లెర్నింగ్ మ్యాజిక్ వల్ల కంప్యూటర్లు కూడా అవే స్వయంగా వస్తువులను గుర్తిస్తాయి.",
    appsTitle: "3. వాడకం / అనువర్తనాలు (Real-world Applications)",
    apps: [
      { name: "ఫేషియల్ రికగ్నిషన్", desc: "ఫోటోలలో ముఖాలను గుర్తించి లాక్ అన్‌లాక్ చేయడం." },
      { name: "సెల్ఫ్ డ్రైవింగ్ కార్లు", desc: "డ్రైవర్ లేకుండా నడిచే కార్లలో పరిసరాలను గమనించడానికి." },
      { name: "వాయిస్ అసిస్టెంట్లు", desc: "గూగుల్ అసిస్టెంట్ మరియు అలెక్సా మాటలను అర్థం చేసుకోవడానికి." },
      { name: "లాంగ్వేజ్ ట్రాన్స్‌లేషన్ & GenAI", desc: "చాట్‌జిపిటి మరియు గూగుల్ ట్రాన్స్లేట్ ఆధునిక టెక్నాలజీ." }
    ],
    step2Header: "ఇంటర్మీడియట్ కోర్ మెకానిక్స్",
    step2Desc: "డీప్ లెర్నింగ్ మోడల్స్ లోపల అసలు ఏం జరుగుతుందో లోతుగా పరిశీలిద్దాం.",
    nnTitle: "1. న్యూరల్ నెట్‌వర్క్స్ (ANN) - పండును గుర్తించడం ఉదాహరణ",
    nnLayers: [
      { name: "ఇన్‌పుట్ లేయర్ (Input Layer)", desc: "పండు రంగు, ఆకారం వంటి ప్రాథమిక సమాచారాన్ని స్వీకరిస్తుంది." },
      { name: "హిడెన్ లేయర్స్ (Hidden Layers)", desc: "లోపలి ఆలోచన లాంటిది; రంగులను, ఆకారాలను పోల్చి పరిశీలిస్తుంది." },
      { name: "అవుట్‌పుట్ లేయర్ (Output Layer)", desc: "తుది నిర్ణయం బయటికి ఇస్తుంది ('ఇది ఆపిల్ పండే!')." }
    ],
    actTitle: "2. యాక్టివేషన్ ఫంక్షన్లు (సినిమా థియేటర్ సెక్యూరిటీ గార్డ్ ఉదాహరణ)",
    activations: [
      { name: "ReLU", desc: "పాజిటివ్ విలువలను పంపి, నెగటివ్ విలువలను సున్నా చేసే కఠినమైన గేట్." },
      { name: "Sigmoid", desc: "ఫలితాన్ని 0 మరియు 1 మధ్య సంభావ్యత (අవును/కాదు) రూపంలో ఇస్తుంది." },
      { name: "Softmax", desc: "ఒకటికి మించి ఎక్కువ ఆప్షన్లు ఉన్నప్పుడు సరైన దాన్ని ఎంచుకోవడానికి సహాయపడుతుంది." }
    ],
    libTitle: "3. పైథాన్ లైబ్రరీలు (లెగో బొమ్మల పెట్టె ఉదాహరణ)",
    libraries: [
      { name: "TensorFlow", desc: "గూగుల్ సంస్థ అభివృద్ధి చేసిన అత్యంత శక్తివంతమైన లైబ్రరీ." },
      { name: "Keras", desc: "కోడింగ్ సులభంగా తక్కువ లైన్లలో రాయడానికి ఉపయోగపడే యూజర్ ఫ్రెండ్లీ లేయర్." },
      { name: "PyTorch", desc: "ఫేస్‌బుక్ (Meta) రూపొందించిన రీసెర్చ్ & డీబగ్గింగ్ అనుకూల టూల్." }
    ],
    step3Header: "అడ్వాన్స్‌డ్ AI విప్లవం",
    step3Desc: "కంప్యూటర్ చూపు, జ్ఞాపకశక్తి మరియు సృజనాత్మకతను ఇస్తాయో అడ్వాన్స్‌డ్ దశ.",
    advItems: [
      { 
        title: "1. CNN (కంప్యూటర్ కంటి చూపు)", 
        desc: "ఫోటోను చిన్న భాగాలుగా విడదీస్తుంది. అంచులు, ఆకారాలు గుర్తించి తుది వస్తువును కచ్చితంగా చెబుతుంది. (ఉదా: ఫేస్ అన్‌లాక్, ఎక్స్-రే స్కానింగ్)." 
      },
      { 
        title: "2. RNN & LSTM (జ్ఞాపకశక్తి మరియు వరుస క్రమం)", 
        desc: "గతంలో ఏం మాట్లాడామో గుర్తుంచుకుని తదుపరి పదాన్ని అంచనా వేస్తుంది. (ఉదా: గూగుల్ ట్రాన్స్‌లేట్, ఆటో-సజెషన్స్)." 
      },
      { 
        title: "3. ట్రాన్స్‌ఫార్మర్స్ & GenAI (ఆధునిక విప్లవం)", 
        desc: "అటెన్షన్ మెకానిజమ్ ద్వారా కొత్తగా సృష్టించడం నేర్చుకుంది. (ఉదా: ChatGPT తో వ్యాసాలు, Midjourney తో బొమ్మలు)." 
      }
    ],
    quizTitle: "జ్ఞాన పరీక్ష క్విజ్ 🎯",
    quizQuestions: [
      {
        q: "న్యూరల్ నెట్‌వర్క్‌లో డేటాలోని సంక్లిష్ట నమూనాలను విశ్లేషించే ప్రధాన భాగం ఏది?",
        options: ["ఇన్‌పుట్ లేయర్", "హిడెన్ లేయర్స్", "అవుట్‌పుట్ లేయర్", "యాక్టివేషన్ గేట్"],
        correct: 1,
        explanation: "హిడెన్ లేయర్స్ లోపల డేటాను లోతుగా విశ్లేషిస్తాయి కాబట్టి దీనిని డీప్ లెర్నింగ్ అంటారు."
      },
      {
        q: "కంప్యూటర్‌కు 'కంటి చూపు' (ఇమేజ్ గుర్తింపు) ప్రసాదించే అల్గారిథమ్ ఏది?",
        options: ["RNN", "CNN", "LSTM", "సాధారణ ANN"],
        correct: 1,
        explanation: "CNN (Convolutional Neural Networks) ఇమేజ్ రికగ్నిషన్ మరియు కంప్యూటర్ విజన్‌లో వాడతారు."
      }
    ],
    correctMsg: "సరిగ్గా చెప్పారు! 🎉 అద్భుతం.",
    incorrectMsg: "పర్వాలేదు, మరొకసారి ప్రయత్నించండి! 💡",
    footerText: "విద్యార్థుల కోసం ప్రత్యేకంగా రూపొందించబడింది • ద్విభాషా డీప్ లెర్నింగ్ యాప్"
  }
};

export default function DeepLearningApp() {
  const [lang, setLang] = useState('te'); // Default to Telugu as per user preference context
  const [activeStep, setActiveStep] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizFeedback, setQuizFeedback] = useState({});

  const t = translations[lang];

  const handleOptionSelect = (qIdx, optIdx) => {
    setQuizAnswers({ ...quizAnswers, [qIdx]: optIdx });
    const isCorrect = optIdx === t.quizQuestions[qIdx].correct;
    setQuizFeedback({
      ...quizFeedback,
      [qIdx]: isCorrect ? t.correctMsg : t.incorrectMsg
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white pb-16">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 p-2 rounded-xl text-white font-bold text-xl shadow-lg shadow-indigo-500/30">
            🤖
          </div>
          <div>
            <h1 className="text-lg font-extrabold bg-gradient-to-r from-indigo-400 to-teal-400 bg-clip-text text-transparent">
              {t.title}
            </h1>
            <p className="text-xs text-slate-400">{t.subtitle}</p>
          </div>
        </div>

        {/* Language Toggle Button */}
        <button
          onClick={() => setLang(lang === 'en' ? 'te' : 'en')}
          className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-md active:scale-95"
        >
          <span>🌐</span>
          <span>{t.toggleText}</span>
        </button>
      </nav>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 pt-8">
        
        {/* Step Navigation Tabs */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {t.steps.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveStep(s.id)}
              className={`p-4 rounded-2xl text-left transition-all border ${
                activeStep === s.id
                  ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-lg shadow-indigo-600/10'
                  : 'bg-slate-800/50 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <div className="font-bold text-sm sm:text-base">{s.title}</div>
              <div className="text-xs opacity-75 hidden sm:block mt-1">{s.subtitle}</div>
            </button>
          ))}
        </div>

        {/* STEP 1 CONTENT */}
        {activeStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-gradient-to-br from-indigo-900/40 to-slate-800/60 border border-indigo-500/30 p-6 rounded-3xl shadow-xl">
              <h2 className="text-2xl font-bold text-indigo-300 mb-2">{t.step1Header}</h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{t.step1Desc}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Definition */}
              <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-3xl shadow-lg">
                <div className="text-2xl mb-3">📖</div>
                <h3 className="text-lg font-bold text-teal-300 mb-2">{t.defTitle}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{t.defText}</p>
              </div>

              {/* How it works */}
              <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-3xl shadow-lg">
                <div className="text-2xl mb-3">👶</div>
                <h3 className="text-lg font-bold text-teal-300 mb-2">{t.howTitle}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{t.howText}</p>
              </div>
            </div>

            {/* Applications */}
            <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-3xl shadow-lg">
              <h3 className="text-lg font-bold text-amber-300 mb-4 flex items-center space-x-2">
                <span>🚀</span>
                <span>{t.appsTitle}</span>
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {t.apps.map((app, idx) => (
                  <div key={idx} className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700/50">
                    <h4 className="font-semibold text-indigo-200 text-sm">{app.name}</h4>
                    <p className="text-xs text-slate-400 mt-1">{app.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2 CONTENT */}
        {activeStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-gradient-to-br from-teal-900/40 to-slate-800/60 border border-teal-500/30 p-6 rounded-3xl shadow-xl">
              <h2 className="text-2xl font-bold text-teal-300 mb-2">{t.step2Header}</h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{t.step2Desc}</p>
            </div>

            {/* Neural Networks breakdown */}
            <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-3xl shadow-lg">
              <h3 className="text-lg font-bold text-indigo-300 mb-4">🧠 {t.nnTitle}</h3>
              <div className="space-y-3">
                {t.nnLayers.map((layer, idx) => (
                  <div key={idx} className="flex items-start space-x-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-700/40">
                    <span className="bg-indigo-600/30 text-indigo-300 px-3 py-1 rounded-xl text-xs font-bold">
                      0{idx + 1}
                    </span>
                    <div>
                      <h4 className="font-semibold text-slate-200 text-sm">{layer.name}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{layer.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activation Functions */}
            <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-3xl shadow-lg">
              <h3 className="text-lg font-bold text-amber-300 mb-4">🚪 {t.actTitle}</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {t.activations.map((act, idx) => (
                  <div key={idx} className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700/50 flex flex-col justify-between">
                    <div>
                      <span className="text-xs bg-amber-500/20 text-amber-300 font-bold px-2.5 py-1 rounded-lg">
                        {act.name}
                      </span>
                      <p className="text-xs text-slate-300 mt-3 leading-relaxed">{act.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Python Libraries */}
            <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-3xl shadow-lg">
              <h3 className="text-lg font-bold text-teal-300 mb-4">📦 {t.libTitle}</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {t.libraries.map((lib, idx) => (
                  <div key={idx} className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700/50">
                    <h4 className="font-bold text-teal-200 text-sm">{lib.name}</h4>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">{lib.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3 CONTENT */}
        {activeStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-gradient-to-br from-purple-900/40 to-slate-800/60 border border-purple-500/30 p-6 rounded-3xl shadow-xl">
              <h2 className="text-2xl font-bold text-purple-300 mb-2">{t.step3Header}</h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{t.step3Desc}</p>
            </div>

            <div className="space-y-4">
              {t.advItems.map((item, idx) => (
                <div key={idx} className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-3xl shadow-lg flex items-start space-x-4">
                  <span className="text-2xl bg-purple-600/20 p-3 rounded-2xl border border-purple-500/30">
                    {idx === 0 ? '👁️' : idx === 1 ? '📝' : '⚡'}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-purple-200 mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* QUIZ SECTION */}
        <div className="mt-12 bg-slate-800/40 border border-indigo-500/30 p-6 sm:p-8 rounded-3xl shadow-xl">
          <h3 className="text-xl font-bold text-indigo-300 mb-6 flex items-center space-x-2">
            <span>🎯</span>
            <span>{t.quizTitle}</span>
          </h3>

          <div className="space-y-8">
            {t.quizQuestions.map((q, qIdx) => (
              <div key={qIdx} className="bg-slate-900/60 p-5 rounded-2xl border border-slate-700/50">
                <p className="font-semibold text-slate-200 text-sm sm:text-base mb-4">
                  {qIdx + 1}. {q.q}
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = quizAnswers[qIdx] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleOptionSelect(qIdx, optIdx)}
                        className={`p-3 rounded-xl text-left text-xs sm:text-sm font-medium transition-all border ${
                          isSelected
                            ? optIdx === q.correct
                              ? 'bg-emerald-600/30 border-emerald-500 text-emerald-200 shadow-md'
                              : 'bg-rose-600/30 border-rose-500 text-rose-200 shadow-md'
                            : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {quizFeedback[qIdx] && (
                  <div className={`mt-4 p-3 rounded-xl text-xs sm:text-sm font-semibold border ${
                    quizAnswers[qIdx] === q.correct
                      ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300'
                      : 'bg-rose-950/50 border-rose-500/40 text-rose-300'
                  }`}>
                    {quizFeedback[qIdx]} <span className="opacity-75 block text-[11px] font-normal mt-1">{q.explanation}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-xs text-slate-500 border-t border-slate-800 pt-6">
          <p>{t.footerText}</p>
        </footer>

      </main>
    </div>
  );
}