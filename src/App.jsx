import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Brain, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ChevronRight, 
  Layers, 
  Cpu, 
  Eye, 
  Clock, 
  Wand2, 
  Code2, 
  Lightbulb, 
  BookOpen, 
  Flame, 
  ShieldCheck, 
  Sliders, 
  ArrowRight,
  Zap
} from 'lucide-react';

// --- BILINGUAL TRANSLATIONS & KNOWLEDGE BASE ---
const translations = {
  en: {
    langCode: 'en-US',
    title: "AI Odyssey: Deep Learning Explorer",
    subtitle: "Give your computer a Super Brain! 🧠",
    toggleText: "తెలుగు",
    readAloud: "Listen",
    stopReading: "Stop Audio",
    steps: [
      { id: 1, title: "1. Basics", subtitle: "Definition & How it Works", icon: BookOpen },
      { id: 2, title: "2. Intermediate", subtitle: "Neural Networks, Activations & Libraries", icon: Cpu },
      { id: 3, title: "3. Advanced", subtitle: "CNN, RNN & GenAI Revolution", icon: Sparkles }
    ],
    step1Header: "Deep Learning Fundamentals",
    step1Desc: "Understand how deep learning mimics the human brain to learn automatically from massive data without manual feature crafting.",
    defTitle: "1. Definition",
    defText: "While standard Machine Learning requires manual human help (Feature Engineering), Deep Learning analyzes massive amounts of data automatically and extracts patterns by itself using multi-layered Artificial Neural Networks (ANN).",
    mlVsDl: {
      mlTitle: "Traditional ML",
      mlDesc: "Requires human engineers to manually label edges, shapes, and features.",
      dlTitle: "Deep Learning (ANN)",
      dlDesc: "Learns raw features autonomously across hidden layers from thousands of photos."
    },
    howTitle: "2. How it Works (The Child Learning Analogy)",
    howText: "Just like small children learn to recognize a cat or dog when parents repeatedly show them examples, Deep Learning allows computers to process countless photos and videos to independently identify objects.",
    analogyStep1: "Parent points: 'That furry friend is a Cat 🐱'",
    analogyStep2: "Child's brain notices pointy ears, whiskers, meow sound",
    analogyStep3: "Next time child sees a new cat, they shout: 'Cat!' without needing instructions",
    appsTitle: "3. Real-world Applications",
    apps: [
      { name: "Facial Recognition", desc: "Unlocking smartphones using instant 3D face detection.", tag: "Vision" },
      { name: "Autonomous Vehicles", desc: "Self-driving cars navigating traffic, pedestrians, and signals.", tag: "Robotics" },
      { name: "Voice Assistants", desc: "Google Assistant and Alexa understanding natural human speech.", tag: "NLP" },
      { name: "GenAI & Translation", desc: "ChatGPT writing code and Google Translate bridging languages in real-time.", tag: "Transformers" }
    ],
    step2Header: "Intermediate Core Mechanics",
    step2Desc: "Peek inside the inner architecture of Deep Learning models and test how signals flow.",
    nnTitle: "1. Neural Networks (ANN) - Fruit Identification Simulator",
    nnSubtitle: "Experiment with inputs and watch real-time predictions compute through layers:",
    nnLayers: [
      { name: "Input Layer", desc: "Receives raw features: Color (Red/Yellow/Green) and Shape (Round/Crescent/Oval)." },
      { name: "Hidden Layers", desc: "Deep analytical matrix comparing patterns: 'Red + Round = Apple?'." },
      { name: "Output Layer", desc: "Delivers the final prediction with probability confidence scores." }
    ],
    actTitle: "2. Activation Functions (Theater Security Guard Analogy)",
    actDesc: "Activation functions decide whether a neuron's signal is strong enough to pass to the next layer, just like a theater guard checks admission tickets.",
    activations: [
      { 
        name: "ReLU", 
        formula: "f(x) = max(0, x)", 
        desc: "Strict gate: Passes positive values through, blocks (zeros out) negative values for lightning-fast training.",
        guard: "If you have a valid positive ticket, enter! If negative, stay outside."
      },
      { 
        name: "Sigmoid", 
        formula: "f(x) = 1 / (1 + e⁻ˣ)", 
        desc: "Binary probability curve: Compresses any value between 0 and 1 (Ideal for Yes/No, Pass/Fail).",
        guard: "Gives a percentage likelihood of entrance (0% to 100%)."
      },
      { 
        name: "Softmax", 
        formula: "σ(z)ᵢ = eᶻⁱ / Σ eᶻʲ", 
        desc: "Multi-choice selector: Converts arbitrary scores into probabilities that sum up to exactly 1.0 (100%).",
        guard: "When picking between Apple, Orange, or Banana, assigns % to each choice."
      }
    ],
    libTitle: "3. Python Libraries (The LEGO Toy Box)",
    libDesc: "Pre-built Python frameworks give you specialized LEGO bricks to construct neural networks in minutes.",
    libraries: [
      { 
        name: "TensorFlow", 
        creator: "Google Brain",
        codeSnippet: "import tensorflow as tf\nmodel = tf.keras.Sequential([...])",
        desc: "Industrial-grade powerhouse designed for large-scale production, servers, and mobile deployment." 
      },
      { 
        name: "Keras", 
        creator: "Open Source / TF Core",
        codeSnippet: "from tensorflow.keras.layers import Dense\nmodel.add(Dense(64, activation='relu'))",
        desc: "High-level, user-friendly API layer allowing rapid prototyping with minimal lines of code." 
      },
      { 
        name: "PyTorch", 
        creator: "Meta AI",
        codeSnippet: "import torch\nimport torch.nn as nn\noutput = model(inputs)",
        desc: "The favorite of AI researchers worldwide thanks to dynamic computation graphs and intuitive debugging." 
      }
    ],
    step3Header: "Advanced AI Revolution",
    step3Desc: "Explore computer vision, sequential memory networks, and creative generative intelligence.",
    advItems: [
      { 
        title: "1. CNN (Computer Vision - Eye Sight)", 
        badge: "Image Processing",
        icon: Eye,
        desc: "Convolutional Neural Networks break images into pixels & filters. Early layers spot raw edges, middle layers assemble shapes (ears, wheels), and final dense layers recognize full faces or medical tumors.",
        highlight: "Used in: MRI Scans, Autonomous Tesla Vision, Face ID"
      },
      { 
        title: "2. RNN & LSTM (Memory & Sequence)", 
        badge: "Sequential Data",
        icon: Clock,
        desc: "Standard networks treat inputs independently. RNNs & LSTMs have internal memory loops that remember preceding words to predict the next word or time-series stock movement.",
        highlight: "Used in: Predictive Keyboards, Google Translate, Siri"
      },
      { 
        title: "3. Transformers & GenAI (Creative Leap)", 
        badge: "Modern Revolution",
        icon: Wand2,
        desc: "Driven by Self-Attention mechanisms, Transformers process entire texts simultaneously instead of word-by-word. This breakthrough powers ChatGPT, Claude, and Midjourney image synthesis.",
        highlight: "Used in: ChatGPT, Gemini, Copilot, DALL-E 3"
      }
    ],
    quizTitle: "Interactive Knowledge Check 🎯",
    quizSubtitle: "Test your understanding. Earn a perfect score to trigger a celebration!",
    quizQuestions: [
      {
        q: "Which layer in a Neural Network performs deep analysis of patterns?",
        options: ["Input Layer", "Hidden Layers", "Output Layer", "Activation Gate"],
        correct: 1,
        explanation: "Hidden layers are placed between input and output layers to iteratively compute high-level pattern representations."
      },
      {
        q: "Which AI architecture gives 'computer eye sight' for image recognition?",
        options: ["RNN", "CNN", "LSTM", "Standard ANN"],
        correct: 1,
        explanation: "CNN (Convolutional Neural Networks) uses specialized 2D filter kernels engineered for spatial computer vision."
      },
      {
        q: "What does the ReLU activation function do to negative input values?",
        options: ["Inverts them to positive", "Multiplies them by 10", "Turns them into 0 (zeros them out)", "Squares them"],
        correct: 2,
        explanation: "ReLU sets all negative values to zero (f(x) = max(0, x)), leaving positive values intact to avoid saturation."
      },
      {
        q: "Which architecture powers modern Large Language Models like ChatGPT and Gemini?",
        options: ["Linear Regression", "Decision Trees", "Transformers with Self-Attention", "K-Means"],
        correct: 2,
        explanation: "Transformers utilize self-attention mechanisms to process long sequences and context in parallel."
      }
    ],
    scoreText: "Score",
    tryAgain: "Restart Quiz",
    perfectScoreMsg: "Outstanding! 🎉 100% Perfect score! You're a Deep Learning pioneer.",
    correctMsg: "Correct! 🎉 Excellent job.",
    incorrectMsg: "Not quite. Check the insight below! 💡",
    footerText: "Designed for Students & Engineers • Bilingual Deep Learning Interactive Portal"
  },
  te: {
    langCode: 'te-IN',
    title: "ఏఐ ఒడిస్సీ: డీప్ లెర్నింగ్ ఎక్స్‌ప్లోరర్",
    subtitle: "మీ కంప్యూటర్‌కు ఒక 'సూపర్ బ్రెయిన్' ఇవ్వండి! 🧠",
    toggleText: "English",
    readAloud: "వినండి (ఆడియో)",
    stopReading: "ఆడియో ఆపండి",
    steps: [
      { id: 1, title: "1. బేసిక్స్", subtitle: "నిర్వచనం & పనిచేసే విధానం", icon: BookOpen },
      { id: 2, title: "2. ఇంటర్మీడియట్", subtitle: "న్యూరల్ నెట్‌వర్క్స్, యాక్టివేషన్స్ & లైబ్రరీలు", icon: Cpu },
      { id: 3, title: "3. అడ్వాన్స్‌డ్", subtitle: "CNN, RNN & జెనరేటివ్ AI విప్లవం", icon: Sparkles }
    ],
    step1Header: "డీప్ లెర్నింగ్ ప్రాథమిక భావనలు",
    step1Desc: "మానవ మెదడును పోలి ఉండే డీప్ లెర్నింగ్ పెద్ద డేటా నుండి ఎలా స్వయంగా నేర్చుకుంటుందో సులభంగా తెలుసుకోండి.",
    defTitle: "1. డెఫినిషన్ (Definition)",
    defText: "సాధారణ మెషిన్ లెర్నింగ్‌కు మనుషుల సహాయం (Feature Engineering) అవసరం అవుతుంది. కానీ డీప్ లెర్నింగ్ పెద్ద మొత్తంలో ఉన్న డేటాను స్వయంగా విశ్లేషించి, కృత్రిమ న్యూరల్ నెట్‌వర్క్స్ (ANN) ద్వారా నమూనాలను నేర్చుకుంటుంది.",
    mlVsDl: {
      mlTitle: "సాధారణ ML",
      mlDesc: "ఫీచర్లు (రంగు, అంచులు) మనుషులే స్వయంగా గుర్తించి కంప్యూటర్‌కు చెప్పాలి.",
      dlTitle: "డీప్ లెర్నింగ్ (ANN)",
      dlDesc: "లక్షల ఫోటోలు చూపిస్తే చాలు, స్వయంగా హిడెన్ లేయర్స్ ద్వారా ఫీచర్లు నేర్చుకుంటుంది."
    },
    howTitle: "2. ఇది ఎలా పనిచేస్తుంది? (చిన్నపిల్లల లెర్నింగ్ ఉదాహరణ)",
    howText: "చిన్నపిల్లలు అమ్మ లేదా నాన్న రోజూ 'ఇది కుక్క, ఇది పిల్లి' అని చూపిస్తుంటే మెదడు గుర్తుపెట్టుకున్నట్లే, డీప్ లెర్నింగ్ ద్వారా కంప్యూటర్లు కూడా స్వయంగా వస్తువులను గుర్తిస్తాయి.",
    analogyStep1: "తల్లిదండ్రులు చూపిస్తారు: 'ఇది పిల్లి 🐱'",
    analogyStep2: "పిల్లల మెదడు చెవులు, మీసాలు, మ్యావ్ అరుపులను గమనిస్తుంది",
    analogyStep3: "మరుసటిసారి సరికొత్త పిల్లిని చూడగానే: 'పిల్లి!' అని గుర్తిస్తుంది",
    appsTitle: "3. వాడకం / అనువర్తనాలు (Real-world Applications)",
    apps: [
      { name: "ఫేషియల్ రికగ్నిషన్", desc: "స్మార్ట్‌ఫోన్‌లో ముఖాన్ని క్షణాల్లో గుర్తించి స్క్రీన్ లాక్ తీయడం.", tag: "విజన్" },
      { name: "సెల్ఫ్ డ్రైవింగ్ కార్లు", desc: "డ్రైవర్ లేకుండా నడిచే కార్లలో పరిసరాలు, రోడ్డు సిగ్నల్స్ గమనించడానికి.", tag: "రోబోటిక్స్" },
      { name: "వాయిస్ అసిస్టెంట్లు", desc: "గూగుల్ అసిస్టెంట్ మరియు అలెక్సా మన మాటలను అర్థం చేసుకోవడానికి.", tag: "NLP" },
      { name: "లాంగ్వేజ్ ట్రాన్స్‌లేషన్ & GenAI", desc: "ChatGPT సమాధానాలు రాయడానికి, గూగుల్ ట్రాన్స్లేట్ ఒక భాష నుండి మరొక భాషకు మార్చడానికి.", tag: "ట్రాన్స్‌ఫార్మర్స్" }
    ],
    step2Header: "ఇంటర్మీడియట్ కోర్ మెకానిక్స్",
    step2Desc: "డీప్ లెర్నింగ్ మోడల్స్ లోపల అసలు ఏం జరుగుతుందో ఇంటరాక్టివ్ సిమ్యులేటర్ ద్వారా పరిశీలిద్దాం.",
    nnTitle: "1. న్యూరల్ నెట్‌వర్క్స్ (ANN) - పండును గుర్తించే సిమ్యులేటర్",
    nnSubtitle: "రంగు, ఆకారాన్ని ఎంచుకోండి మరియు సిగ్నల్ ఎలా ప్రవహిస్తుందో ప్రత్యక్షంగా చూడండి:",
    nnLayers: [
      { name: "ఇన్‌పుట్ లేయర్ (Input Layer)", desc: "పండు రంగు (ఎరుపు/పసుపు/ఆకుపచ్చ) మరియు ఆకారం వంటి సమాచారాన్ని స్వీకరిస్తుంది." },
      { name: "హిడెన్ లేయర్స్ (Hidden Layers)", desc: "లోపలి ఆలోచనా కేంద్రం; రంగులను, ఆకారాలను పోల్చి నమూనాలను గణిస్తుంది ('ఎరుపు + గుండ్రంగా = ఆపిల్?')." },
      { name: "అవుట్‌పుట్ లేయర్ (Output Layer)", desc: "తుది ఫలితాన్ని సంభావ్యత శాతంతో బయటికి ఇస్తుంది ('ఇది ఆపిల్ పండే!')." }
    ],
    actTitle: "2. యాక్టివేషన్ ఫంక్షన్లు (సినిమా థియేటర్ సెక్యూరిటీ గార్డ్ ఉదాహరణ)",
    actDesc: "న్యూరాన్ లోని సమాచారం ముందుకు వెళ్లాలో లేదో నిర్ణయించే గేట్ కీపర్లు ఇవి; సరిగ్గా సినిమా హాల్ గార్డ్ లాగా టికెట్ ఉంటేనే లోపలికి అనుమతిస్తాయి.",
    activations: [
      { 
        name: "ReLU", 
        formula: "f(x) = max(0, x)", 
        desc: "పాజిటివ్ విలువలను మాత్రమే ముందుకు పంపి, నెగటివ్ విలువలను పూర్తిగా సున్నా (0) చేసే కఠినమైన గేట్.",
        guard: "పాజిటివ్ టికెట్ ఉంటేనే లోపలికి! నెగటివ్ అయితే బయటే ఆపేస్తుంది."
      },
      { 
        name: "Sigmoid", 
        formula: "f(x) = 1 / (1 + e⁻ˣ)", 
        desc: "ఫలితాన్ని 0 మరియు 1 మధ్య సంభావ్యత (అవును / కాదు) రూపంలోకి మారుస్తుంది.",
        guard: "లోపలికి వెళ్లే అవకాశం ఎంత శాతం (0% నుండి 100%) ఉందో చెబుతుంది."
      },
      { 
        name: "Softmax", 
        formula: "σ(z)ᵢ = eᶻⁱ / Σ eᶻʲ", 
        desc: "ఎక్కువ ఆప్షన్లు ఉన్నప్పుడు (ఆపిల్, అరటి, నిమ్మ), అన్నింటి శాతాల మొత్తం 100% అయ్యేలా సరైన దాన్ని ఎంచుకుంటుంది.",
        guard: "మూడు కంటే ఎక్కువ పండ్లలో ఏది సరైనదో శాతాల ప్రకారం నిర్ణయిస్తుంది."
      }
    ],
    libTitle: "3. పైథాన్ లైబ్రరీలు (లెగో బొమ్మల పెట్టె ఉదాహరణ)",
    libDesc: "రెడీమేడ్ పైథాన్ టూల్స్ ద్వారా మీరు అతి తక్కువ కోడింగ్‌తో న్యూరల్ నెట్‌వర్క్ నిర్మించవచ్చు.",
    libraries: [
      { 
        name: "TensorFlow", 
        creator: "గూగుల్ బ్రెయిన్",
        codeSnippet: "import tensorflow as tf\nmodel = tf.keras.Sequential([...])",
        desc: "గూగుల్ రూపొందించిన అత్యంత శక్తివంతమైన ఇండస్ట్రియల్ స్థాయి డీప్ లెర్నింగ్ లైబ్రరీ." 
      },
      { 
        name: "Keras", 
        creator: "ఓపెన్ సోర్స్ / TF భాగం",
        codeSnippet: "from tensorflow.keras.layers import Dense\nmodel.add(Dense(64, activation='relu'))",
        desc: "యూజర్ ఫ్రెండ్లీ లేయర్; చాలా తక్కువ లైన్ల కోడింగ్‌తో నెట్‌వర్క్‌ను రూపొందించవచ్చు." 
      },
      { 
        name: "PyTorch", 
        creator: "మెటా (ఫేస్‌బుక్ AI)",
        codeSnippet: "import torch\nimport torch.nn as nn\noutput = model(inputs)",
        desc: "రీసెర్చర్లు మరియు యూనివర్సిటీలలో విరివిగా వాడే డైనమిక్ మరియు సులభమైన డీబగ్గింగ్ టూల్." 
      }
    ],
    step3Header: "అడ్వాన్స్‌డ్ AI విప్లవం",
    step3Desc: "కంప్యూటర్ చూపు, జ్ఞాపకశక్తి మరియు సృజనాత్మకతను ఇచ్చే ఆధునిక అల్గారిథమ్స్ పరిశీలించండి.",
    advItems: [
      { 
        title: "1. CNN (కంప్యూటర్ కంటి చూపు - Vision)", 
        badge: "ఇమేజ్ ప్రాసెసింగ్",
        icon: Eye,
        desc: "ఫోటోను చిన్న పిక్సెల్స్ మరియు ఫిల్టర్లుగా విభజిస్తుంది. మొదటి లేయర్స్ అంచులను, మధ్య లేయర్స్ ఆకారాలను, చివరి లేయర్స్ పూర్తి ముఖాన్ని గుర్తిస్తాయి.",
        highlight: "ఉపయోగం: ఎక్స్-రే స్కాన్లు, సెల్ఫ్ డ్రైవింగ్ కార్లు, ఫేస్ అన్‌లాక్"
      },
      { 
        title: "2. RNN & LSTM (జ్ఞాపకశక్తి మరియు వరుస క్రమం)", 
        badge: "సీక్వెన్షియల్ డేటా",
        icon: Clock,
        desc: "సాధారణ నెట్‌వర్క్స్ లాగా కాకుండా, ముందు మాట్లాడిన పదాలను గుర్తుపెట్టుకుని తదుపరి పదాన్ని అంచనా వేస్తాయి.",
        highlight: "ఉపయోగం: గూగుల్ ట్రాన్స్‌లేట్, ఆటో-టైపింగ్ సజెషన్స్"
      },
      { 
        title: "3. ట్రాన్స్‌ఫార్మర్స్ & GenAI (సృజనాత్మక విప్లవం)", 
        badge: "ఆధునిక సృష్టి",
        icon: Wand2,
        desc: "అటెన్షన్ మెకానిజమ్ ద్వారా ఒక వాక్యంలోని అన్ని పదాల సంబంధాన్ని ఒకేసారి విశ్లేషిస్తాయి. ChatGPT మరియు Midjourney దీని ఆధారంగానే పనిచేస్తాయి.",
        highlight: "ఉపయోగం: ChatGPT, Gemini, Copilot, DALL-E"
      }
    ],
    quizTitle: "జ్ఞాన పరీక్ష క్విజ్ 🎯",
    quizSubtitle: "మీ పరిజ్ఞానాన్ని పరీక్షించండి. అన్ని సరైన సమాధానాలు ఇచ్చి సర్టిఫైడ్ అవ్వండి!",
    quizQuestions: [
      {
        q: "న్యూరల్ నెట్‌వర్క్‌లో డేటాలోని సంక్లిష్ట నమూనాలను విశ్లేషించే ప్రధాన భాగం ఏది?",
        options: ["ఇన్‌పుట్ లేయర్", "హిడెన్ లేయర్స్", "అవుట్‌పుట్ లేయర్", "యాక్టివేషన్ గేట్"],
        correct: 1,
        explanation: "హిడెన్ లేయర్స్ (Hidden Layers) డేటాలోని సంక్లిష్ట నమూనాలను లోతుగా విశ్లేషిస్తాయి కాబట్టి దీనిని డీప్ లెర్నింగ్ అంటారు."
      },
      {
        q: "కంప్యూటర్‌కు 'కంటి చూపు' (ఇమేజ్ గుర్తింపు) ప్రసాదించే అల్గారిథమ్ ఏది?",
        options: ["RNN", "CNN", "LSTM", "సాధారణ ANN"],
        correct: 1,
        explanation: "CNN (Convolutional Neural Networks) ఇమేజ్ రికగ్నిషన్ మరియు కంప్యూటర్ విజన్ కోసం ప్రత్యేకంగా రూపొందించబడింది."
      },
      {
        q: "ReLU యాక్టివేషన్ ఫంక్షన్ నెగటివ్ విలువలను ఏం చేస్తుంది?",
        options: ["పాజిటివ్‌గా మారుస్తుంది", "10తో గుణిస్తుంది", "సున్నా (0) గా మారుస్తుంది", "స్క్వేర్ చేస్తుంది"],
        correct: 2,
        explanation: "ReLU ఫార్ములా f(x) = max(0, x); నెగటివ్ విలువలు వస్తే వాటిని సున్నా (0) గా చేసి ఆపివేస్తుంది."
      },
      {
        q: "ChatGPT మరియు ఆధునిక GenAI మోడల్స్ వెనుక ఉన్న ప్రధాన ఆర్కిటెక్చర్ ఏది?",
        options: ["లీనియర్ రిగ్రెషన్", "డెసిషన్ ట్రీస్", "ట్రాన్స్‌ఫార్మర్స్ (Self-Attention)", "కె-మీన్స్"],
        correct: 2,
        explanation: "ట్రాన్స్‌ఫార్మర్స్ (Transformers) లోని సెల్ఫ్-అటెన్షన్ ద్వారా పదాల మధ్య సంబంధాలను ఒకేసారి కంప్యూటర్ వేగంగా అర్థం చేసుకుంటుంది."
      }
    ],
    scoreText: "స్కోరు",
    tryAgain: "మరలా ప్రయత్నించండి",
    perfectScoreMsg: "అద్భుతం! 🎉 100% సరైన సమాధానాలు! మీరు డీప్ లెర్నింగ్ మాస్టర్ అయ్యారు.",
    correctMsg: "సరిగ్గా చెప్పారు! 🎉 అద్భుతం.",
    incorrectMsg: "పర్వాలేదు, క్రింద ఇచ్చిన వివరణను చూడండి! 💡",
    footerText: "విద్యార్థులు & ఇంజనీర్ల కోసం ప్రత్యేకంగా రూపొందించబడింది • ద్విభాషా డీప్ లెర్నింగ్ పోర్టల్"
  }
};

export default function DeepLearningApp() {
  const [lang, setLang] = useState('en'); // Default to English with immediate Telugu toggle
  const [activeStep, setActiveStep] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizFeedback, setQuizFeedback] = useState({});
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Interactive ANN Fruit Classifier state
  const [fruitColor, setFruitColor] = useState('Red');
  const [fruitShape, setFruitShape] = useState('Round');

  // Interactive Activation Function Simulator state
  const [actInputValue, setActInputValue] = useState(1.5);
  const [selectedActivation, setSelectedActivation] = useState('ReLU');

  const t = translations[lang];

  // Stop speech synthesis when language or step changes
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [lang, activeStep]);

  // Audio Speech Synthesis handler
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert("Speech synthesis is not supported in this browser.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    let textToSpeak = '';
    if (activeStep === 1) {
      textToSpeak = `${t.step1Header}. ${t.defTitle}: ${t.defText}. ${t.howTitle}: ${t.howText}`;
    } else if (activeStep === 2) {
      textToSpeak = `${t.step2Header}. ${t.nnTitle}. ${t.actTitle}: ${t.actDesc}`;
    } else {
      textToSpeak = `${t.step3Header}. ${t.step3Desc}`;
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = t.langCode;
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  // Fruit Classifier Inference logic
  const calculateFruitPrediction = () => {
    // Red + Round = Apple
    // Yellow + Crescent = Banana
    // Yellow + Round / Oval = Lemon
    // Green + Round = Watermelon
    if (fruitColor === 'Red' && fruitShape === 'Round') {
      return { label: lang === 'en' ? 'Apple 🍎' : 'ఆపిల్ 🍎', confidence: 96, alt: 'Strawberry (4%)' };
    }
    if (fruitColor === 'Yellow' && fruitShape === 'Crescent') {
      return { label: lang === 'en' ? 'Banana 🍌' : 'అరటిపండు 🍌', confidence: 98, alt: 'Mango (2%)' };
    }
    if (fruitColor === 'Yellow' && (fruitShape === 'Round' || fruitShape === 'Oval')) {
      return { label: lang === 'en' ? 'Lemon 🍋' : 'నిమ్మకాయ 🍋', confidence: 92, alt: 'Sweet Lime (8%)' };
    }
    if (fruitColor === 'Green' && fruitShape === 'Round') {
      return { label: lang === 'en' ? 'Watermelon 🍉' : 'పుచ్చకాయ 🍉', confidence: 94, alt: 'Guava (6%)' };
    }
    if (fruitColor === 'Purple') {
      return { label: lang === 'en' ? 'Grapes / Plum 🍇' : 'ద్రాక్ష / ప్లమ్ 🍇', confidence: 91, alt: 'Berry (9%)' };
    }
    return { label: lang === 'en' ? 'Exotic Fruit 🥝' : 'ప్రత్యేక పండు 🥝', confidence: 85, alt: 'Kiwi (15%)' };
  };

  const prediction = calculateFruitPrediction();

  // Activation calculation
  const computeActivation = (func, x) => {
    if (func === 'ReLU') {
      return Math.max(0, x).toFixed(2);
    }
    if (func === 'Sigmoid') {
      return (1 / (1 + Math.exp(-x))).toFixed(3);
    }
    if (func === 'Softmax') {
      // simulate a 3-class softmax with inputs [x, 0, -x]
      const exp1 = Math.exp(x);
      const exp2 = Math.exp(0);
      const exp3 = Math.exp(-x);
      const sum = exp1 + exp2 + exp3;
      return `${((exp1 / sum) * 100).toFixed(1)}%`;
    }
    return x;
  };

  // Quiz Handling
  const handleOptionSelect = (qIdx, optIdx) => {
    const updatedAnswers = { ...quizAnswers, [qIdx]: optIdx };
    setQuizAnswers(updatedAnswers);

    const isCorrect = optIdx === t.quizQuestions[qIdx].correct;
    setQuizFeedback({
      ...quizFeedback,
      [qIdx]: isCorrect ? t.correctMsg : t.incorrectMsg
    });

    // Check if all answered correctly for confetti
    const allAnswered = Object.keys(updatedAnswers).length === t.quizQuestions.length;
    if (allAnswered) {
      const allCorrect = t.quizQuestions.every((q, idx) => updatedAnswers[idx] === q.correct);
      if (allCorrect) {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizFeedback({});
  };

  const calculateScore = () => {
    let score = 0;
    t.quizQuestions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correct) score++;
    });
    return score;
  };

  const score = calculateScore();
  const allAnswered = Object.keys(quizAnswers).length === t.quizQuestions.length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white pb-20 relative overflow-hidden">
      
      {/* Dynamic Background Glow Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between transition-all shadow-lg shadow-black/20">
        <div className="flex items-center space-x-3.5">
          <div className="bg-gradient-to-tr from-indigo-600 to-teal-500 p-2.5 rounded-2xl text-white shadow-lg shadow-indigo-500/25 flex items-center justify-center">
            <Brain className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base sm:text-lg font-black bg-gradient-to-r from-indigo-400 via-teal-300 to-purple-400 bg-clip-text text-transparent">
                {t.title}
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full">
                Interactive Portal
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">{t.subtitle}</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Audio Speech Read-aloud button */}
          <button
            onClick={handleToggleSpeech}
            title={isSpeaking ? t.stopReading : t.readAloud}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              isSpeaking
                ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 animate-pulse'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-teal-400" />}
            <span className="hidden sm:inline">{isSpeaking ? t.stopReading : t.readAloud}</span>
          </button>

          {/* Bilingual Language Switcher */}
          <button
            onClick={() => setLang(lang === 'en' ? 'te' : 'en')}
            className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-indigo-600/30 transition-all active:scale-95 border border-indigo-400/30"
          >
            <span className="text-sm">🌐</span>
            <span>{t.toggleText}</span>
          </button>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        
        {/* Step Navigation Tabs */}
        <nav aria-label="Learning Progression" className="grid grid-cols-3 gap-2.5 sm:gap-4">
          {t.steps.map((s) => {
            const Icon = s.icon;
            const isActive = activeStep === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveStep(s.id)}
                className={`p-3.5 sm:p-4 rounded-2xl text-left transition-all border relative overflow-hidden group ${
                  isActive
                    ? 'bg-indigo-950/40 border-indigo-500 text-indigo-300 shadow-xl shadow-indigo-950/40'
                    : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-teal-400 to-indigo-500" />
                )}
                <div className="flex items-center space-x-2 mb-1">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                  <div className="font-bold text-xs sm:text-sm tracking-wide">{s.title}</div>
                </div>
                <div className="text-[11px] sm:text-xs opacity-75 hidden sm:block truncate">{s.subtitle}</div>
              </button>
            );
          })}
        </nav>

        {/* ======================================================== */}
        {/* STEP 1: BASICS */}
        {/* ======================================================== */}
        {activeStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            {/* Hero Card */}
            <div className="bg-gradient-to-br from-indigo-950/70 via-slate-900/80 to-slate-900/60 border border-indigo-500/30 p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="max-w-2xl">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Module 01</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                  {t.step1Header}
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {t.step1Desc}
                </p>
              </div>
            </div>

            {/* Side-by-Side: Definition & Child Learning Analogy */}
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Definition with ML vs DL comparison */}
              <div className="bg-slate-900/70 border border-slate-800 p-6 rounded-3xl shadow-lg flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center space-x-2.5 mb-3">
                    <span className="p-2 rounded-xl bg-teal-500/10 text-teal-400 text-lg">📖</span>
                    <h3 className="text-lg font-bold text-teal-300">{t.defTitle}</h3>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    {t.defText}
                  </p>
                </div>

                {/* Comparison Pill Card */}
                <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80 space-y-3">
                  <div className="flex items-start space-x-2 text-xs">
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-bold shrink-0">
                      {t.mlVsDl.mlTitle}
                    </span>
                    <span className="text-slate-400">{t.mlVsDl.mlDesc}</span>
                  </div>
                  <div className="flex items-start space-x-2 text-xs">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 font-bold shrink-0">
                      {t.mlVsDl.dlTitle}
                    </span>
                    <span className="text-slate-300">{t.mlVsDl.dlDesc}</span>
                  </div>
                </div>
              </div>

              {/* Child Learning Analogy with Timeline steps */}
              <div className="bg-slate-900/70 border border-slate-800 p-6 rounded-3xl shadow-lg flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center space-x-2.5 mb-3">
                    <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 text-lg">👶</span>
                    <h3 className="text-lg font-bold text-amber-300">{t.howTitle}</h3>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    {t.howText}
                  </p>
                </div>

                {/* Visual Step Cards */}
                <div className="space-y-2 bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/80">
                  <div className="flex items-center space-x-3 text-xs text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-indigo-600/30 text-indigo-300 flex items-center justify-center font-bold text-[10px]">1</span>
                    <span>{t.analogyStep1}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-teal-600/30 text-teal-300 flex items-center justify-center font-bold text-[10px]">2</span>
                    <span>{t.analogyStep2}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs text-emerald-300">
                    <span className="w-5 h-5 rounded-full bg-emerald-600/30 text-emerald-300 flex items-center justify-center font-bold text-[10px]">3</span>
                    <span>{t.analogyStep3}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Applications Grid */}
            <div className="bg-slate-900/70 border border-slate-800 p-6 rounded-3xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-indigo-300 flex items-center space-x-2">
                  <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">🚀</span>
                  <span>{t.appsTitle}</span>
                </h3>
                <span className="text-xs text-slate-400 font-medium">Everyday Tech</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {t.apps.map((app, idx) => (
                  <div 
                    key={idx} 
                    className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 hover:border-indigo-500/40 transition-all hover:translate-y-[-2px] group"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="font-bold text-white text-sm group-hover:text-indigo-300 transition-colors">
                        {app.name}
                      </h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-medium border border-slate-700/50">
                        {app.tag}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{app.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 2: INTERMEDIATE */}
        {/* ======================================================== */}
        {activeStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            {/* Hero Card */}
            <div className="bg-gradient-to-br from-teal-950/70 via-slate-900/80 to-slate-900/60 border border-teal-500/30 p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="max-w-2xl">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-3">
                  <Cpu className="w-3.5 h-3.5 text-teal-400" />
                  <span>Module 02</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                  {t.step2Header}
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {t.step2Desc}
                </p>
              </div>
            </div>

            {/* INTERACTIVE ANN FRUIT CLASSIFIER SIMULATOR */}
            <div className="bg-slate-900/70 border border-indigo-500/30 p-6 rounded-3xl shadow-xl space-y-6">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <Brain className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-lg font-bold text-white">{t.nnTitle}</h3>
                </div>
                <p className="text-xs text-slate-400">{t.nnSubtitle}</p>
              </div>

              {/* Interactive Inputs & Signal Flow */}
              <div className="grid lg:grid-cols-3 gap-6 bg-slate-950/70 p-5 rounded-2xl border border-slate-800">
                
                {/* 1. INPUT LAYER CONTROLS */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-xs font-bold text-indigo-300 uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                    <span>Layer 1: Raw Inputs</span>
                  </div>
                  
                  {/* Fruit Color selector */}
                  <div>
                    <label className="block text-xs text-slate-400 font-semibold mb-2">
                      {lang === 'en' ? 'Select Fruit Color:' : 'పండు రంగును ఎంచుకోండి:'}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Red', 'Yellow', 'Green', 'Purple'].map((c) => (
                        <button
                          key={c}
                          onClick={() => setFruitColor(c)}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                            fruitColor === c
                              ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          {c === 'Red' ? '🔴 ' : c === 'Yellow' ? '🟡 ' : c === 'Green' ? '🟢 ' : '🟣 '}
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Fruit Shape selector */}
                  <div>
                    <label className="block text-xs text-slate-400 font-semibold mb-2">
                      {lang === 'en' ? 'Select Fruit Shape:' : 'పండు ఆకారాన్ని ఎంచుకోండి:'}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Round', 'Crescent', 'Oval'].map((s) => (
                        <button
                          key={s}
                          onClick={() => setFruitShape(s)}
                          className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all ${
                            fruitShape === s
                              ? 'bg-teal-600 text-white border-teal-400 shadow-md shadow-teal-600/30'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2. HIDDEN LAYERS VISUALIZER */}
                <div className="flex flex-col justify-center items-center space-y-3 p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-center relative">
                  <div className="text-xs font-bold text-teal-300 uppercase tracking-wider mb-2">
                    Layer 2: Hidden Pattern Matcher
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex flex-col space-y-2">
                      <div className="w-10 h-10 rounded-full bg-indigo-500/20 border-2 border-indigo-400 flex items-center justify-center text-[10px] font-bold text-indigo-300 animate-pulse">
                        N1
                      </div>
                      <div className="w-10 h-10 rounded-full bg-indigo-500/20 border-2 border-indigo-400 flex items-center justify-center text-[10px] font-bold text-indigo-300 animate-pulse">
                        N2
                      </div>
                    </div>
                    <ArrowRight className="w-6 h-6 text-slate-600 animate-pulse" />
                    <div className="flex flex-col space-y-2">
                      <div className="w-10 h-10 rounded-full bg-teal-500/20 border-2 border-teal-400 flex items-center justify-center text-[10px] font-bold text-teal-300 animate-pulse">
                        H1
                      </div>
                      <div className="w-10 h-10 rounded-full bg-teal-500/20 border-2 border-teal-400 flex items-center justify-center text-[10px] font-bold text-teal-300 animate-pulse">
                        H2
                      </div>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight mt-2">
                    {lang === 'en' 
                      ? `Weights & Biases calculated: [Color: ${fruitColor}] × [Shape: ${fruitShape}]` 
                      : `వెయిట్స్ & బయసెస్ గణింపు: [రంగు: ${fruitColor}] × [ఆకారం: ${fruitShape}]`}
                  </p>
                </div>

                {/* 3. OUTPUT PREDICTION */}
                <div className="flex flex-col justify-between space-y-3 p-4 bg-slate-900/90 rounded-xl border border-teal-500/30">
                  <div>
                    <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-3">
                      Layer 3: Output Classification
                    </div>
                    <div className="text-center py-4 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="text-3xl mb-1">{prediction.label.split(' ')[1] || '🍎'}</div>
                      <div className="text-lg font-black text-white">{prediction.label}</div>
                      <div className="text-xs text-emerald-400 font-bold mt-1">
                        {prediction.confidence}% Confidence
                      </div>
                    </div>
                  </div>

                  {/* Confidence Bar */}
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                      <span>Top Prediction: {prediction.confidence}%</span>
                      <span>Alternative: {prediction.alt}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 transition-all duration-500 rounded-full"
                        style={{ width: `${prediction.confidence}%` }}
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* Layer Explanations */}
              <div className="grid md:grid-cols-3 gap-3 pt-2">
                {t.nnLayers.map((layer, idx) => (
                  <div key={idx} className="bg-slate-950/50 p-3.5 rounded-2xl border border-slate-800/80">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="w-5 h-5 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-bold flex items-center justify-center">
                        0{idx + 1}
                      </span>
                      <h4 className="font-bold text-slate-200 text-xs">{layer.name}</h4>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{layer.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ACTIVATION FUNCTIONS PLAYGROUND */}
            <div className="bg-slate-900/70 border border-slate-800 p-6 rounded-3xl shadow-lg space-y-6">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <h3 className="text-lg font-bold text-amber-300">{t.actTitle}</h3>
                </div>
                <p className="text-xs text-slate-400">{t.actDesc}</p>
              </div>

              {/* Interactive Slider & Function Selector */}
              <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex space-x-2">
                    {['ReLU', 'Sigmoid', 'Softmax'].map((fn) => (
                      <button
                        key={fn}
                        onClick={() => setSelectedActivation(fn)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                          selectedActivation === fn
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {fn}
                      </button>
                    ))}
                  </div>

                  {/* Numeric Input Slider */}
                  <div className="flex items-center space-x-3 text-xs">
                    <span className="text-slate-400">Input (x):</span>
                    <input
                      type="range"
                      min="-5"
                      max="5"
                      step="0.5"
                      value={actInputValue}
                      onChange={(e) => setActInputValue(parseFloat(e.target.value))}
                      className="w-32 accent-amber-400 cursor-pointer"
                    />
                    <span className="font-mono font-bold text-amber-300 w-10 text-right">
                      {actInputValue > 0 ? `+${actInputValue}` : actInputValue}
                    </span>
                  </div>
                </div>

                {/* Output Display Card */}
                <div className="flex items-center justify-between p-4 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="text-xs">
                    <span className="text-slate-400 font-mono">
                      Calculation: {selectedActivation}({actInputValue}) = 
                    </span>
                    <span className="font-mono font-bold text-amber-300 text-base ml-2">
                      {computeActivation(selectedActivation, actInputValue)}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 italic hidden sm:inline">
                    {selectedActivation === 'ReLU' && (actInputValue <= 0 ? 'Negative clamped to 0' : 'Passes unchanged')}
                    {selectedActivation === 'Sigmoid' && 'Probability between 0 and 1'}
                    {selectedActivation === 'Softmax' && 'Normalized class probability'}
                  </span>
                </div>
              </div>

              {/* Cards Grid */}
              <div className="grid md:grid-cols-3 gap-4">
                {t.activations.map((act, idx) => (
                  <div key={idx} className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs bg-amber-500/15 text-amber-300 font-bold px-2 py-0.5 rounded-md border border-amber-500/20">
                          {act.name}
                        </span>
                        <code className="text-[10px] text-slate-400 font-mono bg-slate-900 px-1.5 py-0.5 rounded">
                          {act.formula}
                        </code>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed mb-3">{act.desc}</p>
                    </div>
                    <div className="text-[11px] text-amber-400/90 bg-amber-950/20 border border-amber-500/20 p-2.5 rounded-xl flex items-start space-x-1.5">
                      <span>🛡️</span>
                      <span>{act.guard}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PYTHON LIBRARIES LEGO BOX */}
            <div className="bg-slate-900/70 border border-slate-800 p-6 rounded-3xl shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-teal-300 flex items-center space-x-2">
                    <Code2 className="w-5 h-5 text-teal-400" />
                    <span>{t.libTitle}</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">{t.libDesc}</p>
                </div>
                <span className="text-xs text-teal-400 font-semibold hidden sm:inline">Python 3.x Ecosystem</span>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {t.libraries.map((lib, idx) => (
                  <div key={idx} className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 hover:border-teal-500/40 transition-all flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-extrabold text-teal-200 text-sm">{lib.name}</h4>
                        <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">
                          {lib.creator}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed mt-2">{lib.desc}</p>
                    </div>
                    
                    {/* Code Snippet Box */}
                    <pre className="text-[10px] font-mono bg-slate-900/90 text-teal-300 p-2.5 rounded-xl border border-slate-800 overflow-x-auto">
                      <code>{lib.codeSnippet}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 3: ADVANCED */}
        {/* ======================================================== */}
        {activeStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            {/* Hero Card */}
            <div className="bg-gradient-to-br from-purple-950/70 via-slate-900/80 to-slate-900/60 border border-purple-500/30 p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="max-w-2xl">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>Module 03</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                  {t.step3Header}
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {t.step3Desc}
                </p>
              </div>
            </div>

            {/* Architecture Spotlight Cards */}
            <div className="space-y-4">
              {t.advItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={idx} 
                    className="bg-slate-900/70 border border-slate-800 hover:border-purple-500/40 p-6 rounded-3xl shadow-lg transition-all flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-5 group"
                  >
                    <div className="p-3.5 rounded-2xl bg-purple-500/15 border border-purple-500/30 text-purple-300 shrink-0 group-hover:scale-105 transition-transform">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2.5 mb-1.5">
                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-200 transition-colors">
                          {item.title}
                        </h3>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-2.5">
                        {item.desc}
                      </p>
                      <div className="inline-flex items-center space-x-1.5 text-xs text-teal-400 font-medium bg-teal-950/30 px-2.5 py-1 rounded-lg border border-teal-500/20">
                        <Zap className="w-3 h-3 text-teal-300" />
                        <span>{item.highlight}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* INTERACTIVE KNOWLEDGE CHECK QUIZ HUB */}
        {/* ======================================================== */}
        <section aria-label="Knowledge Quiz" className="mt-12 bg-slate-900/60 border border-indigo-500/30 p-6 sm:p-8 rounded-3xl shadow-2xl relative">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center space-x-2.5">
                <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 text-lg">🎯</span>
                <h3 className="text-xl sm:text-2xl font-black text-white">{t.quizTitle}</h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">{t.quizSubtitle}</p>
            </div>

            {/* Score Display & Reset */}
            <div className="flex items-center space-x-3">
              <div className="px-4 py-2 rounded-2xl bg-slate-950 border border-slate-800 flex items-center space-x-2 text-sm font-bold">
                <span className="text-slate-400">{t.scoreText}:</span>
                <span className="text-indigo-400">{score}</span>
                <span className="text-slate-600">/</span>
                <span className="text-slate-300">{t.quizQuestions.length}</span>
              </div>
              {Object.keys(quizAnswers).length > 0 && (
                <button
                  onClick={resetQuiz}
                  className="flex items-center space-x-1 px-3 py-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
                  title="Reset"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.tryAgain}</span>
                </button>
              )}
            </div>
          </div>

          {/* Perfect Score Celebration Banner */}
          {allAnswered && score === t.quizQuestions.length && (
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-teal-900/50 to-indigo-950/80 border border-emerald-500/40 flex items-center space-x-3 text-emerald-300 animate-fadeIn">
              <Award className="w-6 h-6 text-emerald-400 shrink-0 animate-bounce" />
              <div className="text-xs sm:text-sm font-bold">
                {t.perfectScoreMsg}
              </div>
            </div>
          )}

          {/* Quiz Cards List */}
          <div className="space-y-6">
            {t.quizQuestions.map((q, qIdx) => {
              const hasAnswered = quizAnswers[qIdx] !== undefined;
              const isSelectedCorrect = hasAnswered && quizAnswers[qIdx] === q.correct;

              return (
                <div 
                  key={qIdx} 
                  className="bg-slate-950/70 p-5 sm:p-6 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-all space-y-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-bold text-white text-sm sm:text-base leading-snug">
                      <span className="text-indigo-400 mr-2">{qIdx + 1}.</span>
                      {q.q}
                    </p>
                    {hasAnswered && (
                      <span className="shrink-0">
                        {isSelectedCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <XCircle className="w-5 h-5 text-rose-400" />
                        )}
                      </span>
                    )}
                  </div>

                  {/* Options 2x2 Grid */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = quizAnswers[qIdx] === optIdx;
                      let btnStyle = 'bg-slate-900/90 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700';

                      if (isSelected) {
                        if (optIdx === q.correct) {
                          btnStyle = 'bg-emerald-600/25 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-950/50';
                        } else {
                          btnStyle = 'bg-rose-600/25 border-rose-500 text-rose-200 shadow-md shadow-rose-950/50';
                        }
                      } else if (hasAnswered && optIdx === q.correct) {
                        // show the correct one if user picked wrong
                        btnStyle = 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300/80';
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleOptionSelect(qIdx, optIdx)}
                          className={`p-3.5 rounded-xl text-left text-xs sm:text-sm font-medium transition-all border flex items-center justify-between group ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Explanation */}
                  {quizFeedback[qIdx] && (
                    <div className={`p-3.5 rounded-xl text-xs sm:text-sm font-semibold border flex items-start space-x-2.5 ${
                      quizAnswers[qIdx] === q.correct
                        ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                        : 'bg-rose-950/40 border-rose-500/30 text-rose-300'
                    }`}>
                      <Lightbulb className="w-4 h-4 shrink-0 mt-0.5 text-amber-300" />
                      <div>
                        <div>{quizFeedback[qIdx]}</div>
                        <div className="opacity-80 text-[11px] font-normal mt-1 leading-relaxed text-slate-300">
                          {q.explanation}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 text-center text-xs text-slate-500 border-t border-slate-900 pt-8 pb-4">
          <p className="font-medium">{t.footerText}</p>
          <p className="text-[10px] text-slate-600 mt-1">
            Built with React 18, Vite, Tailwind CSS & HTML5 Web Speech API
          </p>
        </footer>

      </main>
    </div>
  );
}
