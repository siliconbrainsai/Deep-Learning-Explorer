export const translations = {
  en: {
    langCode: 'en-US',
    title: "AI Odyssey: Deep Learning Explorer",
    subtitle: "Give your computer a Super Brain! 🧠",
    toggleText: "తెలుగు",
    readAloud: "Listen",
    stopReading: "Stop Audio",
    portalTag: "Interactive Portal",
    audienceToggle: {
      label: "Perspective:",
      student: "Student Mode (Intuitive Visuals)",
      engineer: "Engineer Mode (Math & Arch)"
    },
    steps: [
      { id: 1, title: "1. Basics", subtitle: "Definition & How it Works" },
      { id: 2, title: "2. Intermediate", subtitle: "Neural Networks, Activations & Libraries" },
      { id: 3, title: "3. Advanced", subtitle: "CNN, RNN & GenAI Revolution" }
    ],

    // --- MODULE 01 ---
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

    // --- MODULE 02 ---
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

    // --- MODULE 03: ADVANCED AI REVOLUTION ---
    step3Header: "Module 03: Advanced AI Revolution",
    step3Subtitle: "Explore cutting-edge architectures powering computer vision, sequential memory, and generative intelligence.",
    mod3Nav: {
      cnn: "1. CNN (Computer Vision)",
      rnn: "2. RNN & LSTM (Memory)",
      transformer: "3. Transformers & GenAI (Creativity)"
    },

    // Section 1: CNN
    cnn: {
      title: "CNN (Computer Vision - Eye Sight)",
      badge: "Spatial Feature Extraction",
      ttsText: "Convolutional Neural Networks, or CNN, give computers eyesight. They break down images using 3 by 3 kernels, strides, and pooling to detect edges, shapes, and complex objects layer by layer.",
      studentAnalogy: "Think of a CNN like your own eyes and visual cortex. When you spot a cat, your eyes don't process the whole animal at once. First, your retina picks up high-contrast edges and whiskers. Next, visual areas assemble curves into ears and eyes. Finally, your brain synthesizes everything into 'Cat!'",
      description: "Convolutional Neural Networks (CNN) revolutionize computer vision by sliding specialized mathematical filters (kernels) across images to extract hierarchical spatial features—from basic pixel gradients to full semantic entities.",
      
      filterTypes: {
        edge: "Edge Detection (Sobel)",
        sharpen: "Sharpening Filter",
        blur: "Gaussian Blur",
        ridge: "Ridge / Contour Filter"
      },

      pipelineStages: [
        { name: "1. Raw Pixels", desc: "Input matrix representing pixel luminance (0-255)." },
        { name: "2. 3x3 Conv Kernel", desc: "Slides across pixels computing dot products to detect directional gradients." },
        { name: "3. ReLU Gate", desc: "Zeroes out negative activations to preserve only activated features." },
        { name: "4. Max Pooling (2x2)", desc: "Downsamples feature map by taking maximum values, achieving spatial translation invariance." },
        { name: "5. Fully Connected", desc: "Flattens high-level representations into class confidence probabilities." }
      ],

      engineeringDetails: {
        title: "Engineering Specs & Hyperparameters",
        stride: {
          name: "Stride (S)",
          desc: "The step size by which the kernel shifts across the input matrix. Stride = 1 produces detailed overlapping feature maps; Stride = 2 downsizes spatial resolution by half."
        },
        padding: {
          name: "Padding (P)",
          desc: "Adding border zeros around the image. 'Same' padding maintains output spatial dimensions (W x H), while 'Valid' padding allows dimensions to shrink."
        },
        formula: {
          name: "Output Spatial Dimension",
          math: "O = ⌊(W - K + 2P) / S⌋ + 1",
          desc: "Where W is input width, K is kernel size, P is padding, and S is stride."
        },
        pooling: {
          name: "Max Pooling (2x2)",
          desc: "Reduces spatial dimension by 75% (halves width and height) while retaining the strongest signal activations and drastically slashing parameter count."
        },
        dense: {
          name: "Fully Connected (FC)",
          desc: "Flattens multi-channel 2D feature maps into a 1D vector connected to Softmax neurons to output categorical probabilities."
        }
      },

      realWorld: [
        {
          name: "MRI & Medical Scans",
          role: "Tumor & Pathology Segmentation",
          desc: "Detects micro-calcifications, brain lesions, and organ boundaries in DICOM imaging with superhuman precision using U-Net architectures.",
          icon: "Activity"
        },
        {
          name: "Tesla Autopilot",
          role: "Multi-Camera 360° Vision",
          desc: "Processes 8 simultaneous camera feeds at 36 fps via HydraNet CNN backbones to detect lanes, vehicles, pedestrians, and depth in real time.",
          icon: "Car"
        },
        {
          name: "Apple Face ID",
          role: "Biometric 3D Depth Map",
          desc: "Projects 30,000 infrared dots onto the user's face, passing depth maps through Siamese CNN embeddings to verify identity in under 150ms.",
          icon: "ScanFace"
        }
      ]
    },

    // Section 2: RNN & LSTM
    rnn: {
      title: "RNN & LSTM (Memory & Sequence)",
      badge: "Temporal Recurrent Memory",
      ttsText: "Recurrent Neural Networks and Long Short-Term Memory networks process sequences with internal memory loops. LSTMs solve the vanishing gradient problem using cell state conveyor belts and gates.",
      studentAnalogy: "Imagine reading a mystery novel. You can't understand sentence number five if you completely forget who the detective was in sentence number one! Standard neural networks suffer from total amnesia after each word. RNNs maintain an internal diary (hidden state) where each word updates the running summary.",
      description: "Unlike feedforward networks that treat every input independently, Recurrent Neural Networks (RNN) possess cyclic feedback loops that pass hidden state vectors from step (t-1) to step (t). LSTMs solve the notorious Vanishing Gradient Problem using an additive Cell State conveyor belt.",
      
      sampleSentence: ["The", "quick", "brown", "fox", "jumps", "over", "the"],
      predictedWords: [
        { word: "lazy", prob: "78%", match: "Top prediction ('lazy dog')" },
        { word: "sleeping", prob: "14%", match: "Contextual alternative" },
        { word: "fence", prob: "8%", match: "Spatial alternative" }
      ],

      vanishingGradientExp: {
        title: "The Vanishing Gradient Bottleneck",
        problem: "In vanilla RNNs, backpropagating gradients through long sequences requires repeatedly multiplying weight matrices (W_hh). If eigenvalues < 1, gradients shrink exponentially toward 0, causing the network to forget tokens from earlier in the sentence.",
        solution: "LSTM (Long Short-Term Memory) introduces a constant error carousel called the Cell State (C_t) regulated by three multiplicative sigmoid gates:"
      },

      lstmGates: [
        {
          name: "Forget Gate (f_t)",
          formula: "f_t = σ(W_f · [h_{t-1}, x_t] + b_f)",
          desc: "Decides what percentage of old information to discard from the cell state (0 = throw away completely, 1 = retain completely)."
        },
        {
          name: "Input Gate (i_t)",
          formula: "i_t = σ(W_i · [h_{t-1}, x_t] + b_i) * tanh(C̃_t)",
          desc: "Decides which new candidate values (C̃_t) are worth writing into the long-term memory."
        },
        {
          name: "Cell State Update (C_t)",
          formula: "C_t = f_t * C_{t-1} + i_t * C̃_t",
          desc: "The linear information highway! Because gradients flow additively across time, gradients do not vanish exponentially."
        },
        {
          name: "Output Gate (o_t)",
          formula: "o_t = σ(W_o · [h_{t-1}, x_t] + b_o); h_t = o_t * tanh(C_t)",
          desc: "Filters the cell state through tanh to output the new hidden state h_t for prediction and next time step."
        }
      ],

      realWorld: [
        {
          name: "Predictive Keyboards",
          role: "Next-Word Anticipation",
          desc: "Smart keyboards (Gboard, iOS) track your typed character sequences to recommend the next likely word or complete emojis dynamically.",
          icon: "Keyboard"
        },
        {
          name: "Google Translate",
          role: "Seq2Seq Neural Translation",
          desc: "Encoder-decoder RNN/LSTM architectures map variable-length Telugu sentences into dense thought vectors before decoding into English.",
          icon: "Languages"
        },
        {
          name: "Siri & Voice Assistants",
          role: "Streaming Speech-to-Text",
          desc: "Ingests continuous audio waveform frequencies across millisecond slices to align acoustic signals into phonemes and language tokens.",
          icon: "Mic"
        }
      ]
    },

    // Section 3: Transformers & GenAI
    transformer: {
      title: "Transformers & GenAI (Creative Leap)",
      badge: "Self-Attention Revolution",
      ttsText: "Transformers process entire documents simultaneously using Self-Attention. Hover over words to see how the model calculates attention weights between tokens like it and bank.",
      studentAnalogy: "Imagine an exam hall where a student can highlight every clue across 50 pages simultaneously, drawing glowing highlighter lines between related clues. Instead of reading word-by-word like an RNN, Transformers absorb the entire paragraph at once and immediately understand that 'it' refers to 'the bank' because of the word 'flooded'.",
      description: "Introduced in Google's landmark paper 'Attention Is All You Need' (2017), the Transformer architecture eliminated recurrent bottlenecks by calculating dynamic pairwise Self-Attention weights across all tokens in parallel.",
      
      sampleSentences: [
        {
          id: 1,
          text: "The bank was closed because it was flooded",
          focusWord: "it",
          keyWeights: {
            "The": 0.05,
            "bank": 0.74,
            "was": 0.04,
            "closed": 0.28,
            "because": 0.12,
            "it": 1.0,
            "flooded": 0.62
          },
          explanation: "In this context, 'it' heavily attends to 'bank' (0.74) and 'flooded' (0.62), instantly resolving the coreference to the financial institution affected by water rather than a river bank."
        },
        {
          id: 2,
          text: "The animal did not cross the street because it was too tired",
          focusWord: "it",
          keyWeights: {
            "The": 0.04,
            "animal": 0.82,
            "did": 0.03,
            "not": 0.08,
            "cross": 0.18,
            "the": 0.04,
            "street": 0.14,
            "because": 0.11,
            "it": 1.0,
            "was": 0.05,
            "too": 0.15,
            "tired": 0.68
          },
          explanation: "Because the adjective is 'tired', the attention mechanism binds 'it' strongly to 'animal' (0.82). If the sentence ended in 'too wide', attention would shift to 'street'!"
        }
      ],

      mathBreakdown: {
        title: "The Self-Attention Equation",
        formula: "Attention(Q, K, V) = softmax((Q · Kᵀ) / √d_k) · V",
        qkv: [
          { name: "Query (Q)", desc: "What the current token is searching for ('Who or what am I referring to?')." },
          { name: "Key (K)", desc: "The identity index card that each token advertises ('I am a financial bank')." },
          { name: "Value (V)", desc: "The contextual content payload that gets retrieved and weighted." },
          { name: "Scaling Factor (√d_k)", desc: "Prevents the dot products from growing excessively large in high dimensions, keeping softmax gradients stable." }
        ],
        multiHead: "Multi-Head Attention: Projects Q, K, and V into h (e.g., 8, 32, or 128) distinct subspace heads simultaneously, allowing the network to track syntax, semantics, and coreference in parallel."
      },

      realWorld: [
        {
          name: "ChatGPT (GPT-4o)",
          role: "Autoregressive LLM",
          desc: "Trillion-parameter decoder-only transformer generating human-level reasoning, code synthesis, and multi-turn dialogue.",
          icon: "Bot"
        },
        {
          name: "Google Gemini",
          role: "Native Multimodal Transformer",
          desc: "Processes interleaved text, video frames, audio spectrograms, and code directly inside an expansive 2-million-token context window.",
          icon: "Sparkles"
        },
        {
          name: "GitHub Copilot",
          role: "Contextual Code Intelligence",
          desc: "Analyzes open repository tabs, docstrings, and function signatures to autocomplete entire algorithms with sub-second latency.",
          icon: "Code2"
        },
        {
          name: "DALL-E 3 & Midjourney",
          role: "Diffusion Transformers (DiT)",
          desc: "Combines text transformer embeddings with diffusion denoising backbones to generate photorealistic art from natural language prompts.",
          icon: "Palette"
        }
      ]
    },

    // --- MODULE 03 QUIZ ---
    quizTitle: "Module 03 Knowledge Check Quiz 🎯",
    quizSubtitle: "Test your mastery of Advanced Deep Learning concepts. Score 4/4 to unlock the confetti celebration!",
    scoreText: "Score",
    tryAgain: "Restart Quiz",
    perfectScoreMsg: "Outstanding! 🎉 4/4 Perfect score! You've mastered Advanced Deep Learning architectures.",
    correctMsg: "Correct! 🎉 Excellent job.",
    incorrectMsg: "Not quite. Check the engineering explanation below! 💡",
    toastTitles: {
      correct: "Correct Answer! 🌟",
      incorrect: "Incorrect Selection 💡"
    },
    quizQuestions: [
      {
        q: "Which layer in a Neural Network performs deep analysis of patterns?",
        options: ["Input Layer", "Hidden Layers", "Output Layer", "Activation Gate"],
        correct: 1,
        explanation: "Hidden Layers sit between the input and output layers. They perform iterative matrix multiplications and feature extractions to detect complex hierarchical patterns."
      },
      {
        q: "Which AI architecture gives 'computer eye sight' for image recognition?",
        options: ["RNN", "CNN", "LSTM", "Standard ANN"],
        correct: 1,
        explanation: "CNN (Convolutional Neural Networks) utilizes 2D spatial kernels, pooling, and feature hierarchies engineered specifically for computer vision."
      },
      {
        q: "What does the ReLU activation function do to negative input values?",
        options: [
          "Inverts them to positive values",
          "Multiplies them by 10",
          "Turns them into 0 (zeros them out)",
          "Squares them exponentially"
        ],
        correct: 2,
        explanation: "ReLU follows the mathematical formula f(x) = max(0, x). For any negative value (x < 0), it outputs exactly 0, preventing gradient saturation."
      },
      {
        q: "Which architecture powers modern Large Language Models like ChatGPT and Gemini?",
        options: [
          "Linear Regression",
          "Decision Trees",
          "Transformers with Self-Attention",
          "K-Means Clustering"
        ],
        correct: 2,
        explanation: "Transformers rely on the Self-Attention mechanism to process entire text sequences in parallel, computing contextual relationships between tokens."
      }
    ],

    // Footer
    footerTagline: "Designed for Students & Engineers • Bilingual Deep Learning Interactive Portal",
    footerTech: "Built with React 18, Vite, Tailwind CSS & HTML5 Web Speech API"
  },

  te: {
    langCode: 'te-IN',
    title: "ఏఐ ఒడిస్సీ: డీప్ లెర్నింగ్ ఎక్స్‌ప్లోరర్",
    subtitle: "మీ కంప్యూటర్‌కు ఒక 'సూపర్ బ్రెయిన్' ఇవ్వండి! 🧠",
    toggleText: "English",
    readAloud: "వినండి (ఆడియో)",
    stopReading: "ఆడియో ఆపండి",
    portalTag: "ఇంటరాక్టివ్ పోర్టల్",
    audienceToggle: {
      label: "దృక్కోణం:",
      student: "విద్యార్థి మోడ్ (దృశ్య అవగాహన)",
      engineer: "ఇంజనీర్ మోడ్ (గణితం & ఆర్కిటెక్చర్)"
    },
    steps: [
      { id: 1, title: "1. బేసిక్స్", subtitle: "నిర్వచనం & పనిచేసే విధానం" },
      { id: 2, title: "2. ఇంటర్మీడియట్", subtitle: "న్యూరల్ నెట్‌వర్క్స్, యాక్టివేషన్స్ & లైబ్రరీలు" },
      { id: 3, title: "3. అడ్వాన్స్‌డ్", subtitle: "CNN, RNN & జెనరేటివ్ AI విప్లవం" }
    ],

    // --- MODULE 01 ---
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

    // --- MODULE 02 ---
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

    // --- MODULE 03: ADVANCED AI REVOLUTION (TELUGU) ---
    step3Header: "మాడ్యూల్ 03: అడ్వాన్స్‌డ్ AI విప్లవం",
    step3Subtitle: "కంప్యూటర్ చూపు, కాలక్రమ జ్ఞాపకశక్తి మరియు ఆధునిక సృజనాత్మక విప్లవాన్ని అందించే డీప్ లెర్నింగ్ ఆర్కిటెక్చర్లు పరిశీలించండి.",
    mod3Nav: {
      cnn: "1. CNN (కంప్యూటర్ విజన్)",
      rnn: "2. RNN & LSTM (మెమరీ)",
      transformer: "3. ట్రాన్స్‌ఫార్మర్స్ & GenAI (సృజనాత్మకత)"
    },

    // Section 1: CNN (Telugu)
    cnn: {
      title: "CNN (కంప్యూటర్ విజన్ - దృష్టి)",
      badge: "స్పేషియల్ ఫీచర్ గుర్తింపు",
      ttsText: "కన్వొల్యూషనల్ న్యూరల్ నెట్‌వర్క్స్ కంప్యూటర్‌కు కంటి చూపును ఇస్తాయి. ఇవి ఇమేజ్‌లను 3 బై 3 ఫిల్టర్లు, స్ట్రైడ్స్ మరియు పూలింగ్ ద్వారా విడగొట్టి అంచులు మరియు ఆకారాలను గుర్తిస్తాయి.",
      studentAnalogy: "మీ కళ్లు మరియు మెదడు ఒక పిల్లిని ఎలా గుర్తిస్తాయో ఊహించుకోండి. కంటి రెటీనా మొదట పిల్లి అంచులు, మీసాలు, చెవులను విడివిడిగా గుర్తిస్తుంది. ఆ తర్వాత మెదడు ఆ భాగాలన్నింటినీ కలిపి 'ఇది పిల్లి!' అని గుర్తిస్తుంది. CNN కూడా సరిగ్గా అలాగే పనిచేస్తుంది!",
      description: "కన్వొల్యూషనల్ న్యూరల్ నెట్‌వర్క్స్ (CNN) డిజిటల్ ఫోటోలను పిక్సెల్స్ గా మార్చి, చిన్న గణిత ఫిల్టర్ల (కర్నల్స్) ద్వారా అంచులు, ఆకారాలు మరియు సంపూర్ణ వస్తువులను గుర్తిస్తాయి.",

      filterTypes: {
        edge: "అంచుల గుర్తింపు (Sobel Edge)",
        sharpen: "షార్పెనింగ్ ఫిల్టర్",
        blur: "బ్లర్ ఫిల్టర్ (Gaussian Blur)",
        ridge: "రిడ్జ్ / సరిహద్దుల ఫిల్టర్"
      },

      pipelineStages: [
        { name: "1. రా పిక్సెల్స్", desc: "ఫోటోలోని కాంతి తీవ్రతను తెలిపే సంఖ్యల గ్రిడ్ (0-255)." },
        { name: "2. 3x3 ఫిల్టర్ (కర్నల్)", desc: "పిక్సెల్స్ పై కదులుతూ అంచులు, కోణాలను స్పష్టంగా గుర్తిస్తుంది." },
        { name: "3. ReLU గేట్", desc: "నెగటివ్ విలువలను సున్నా (0) చేసి ముఖ్యమైన ఫీచర్లను మాత్రమే ఉంచుతుంది." },
        { name: "4. మ్యాక్స్ పూలింగ్ (2x2)", desc: "అతి ముఖ్యమైన భాగాలను ఉంచి, ఇమేజ్ సైజును 75% తగ్గిస్తుంది." },
        { name: "5. ఫుల్లీ కనెక్టెడ్ లేయర్", desc: "చివరి డెసిషన్ లేయర్ ద్వారా ఇది ఏ వస్తువో శాతాలలో చెబుతుంది." }
      ],

      engineeringDetails: {
        title: "ఇంజనీరింగ్ వివరాలు & పారామితులు",
        stride: {
          name: "స్ట్రైడ్ (Stride - S)",
          desc: "ఫిల్టర్ ఇమేజ్ పై ఎన్ని పిక్సెల్స్ దూరం కదులుతుందో తెలిపే సంఖ్య. Stride = 1 అయితే అన్ని పిక్సెల్స్ కవర్ అవుతాయి; Stride = 2 అయితే ఇమేజ్ రిజల్యూషన్ సగానికి తగ్గుతుంది."
        },
        padding: {
          name: "ప్యాడింగ్ (Padding - P)",
          desc: "ఇమేజ్ అంచులలో సున్నాలు (Zeros) చేర్చడం. 'Same' ప్యాడింగ్ ఇమేజ్ సైజు మారకుండా ఉంచుతుంది; 'Valid' ప్యాడింగ్ లో సైజు తగ్గుతుంది."
        },
        formula: {
          name: "అవుట్‌పుట్ సైజు ఫార్ములా",
          math: "O = ⌊(W - K + 2P) / S⌋ + 1",
          desc: "W అంటే ఇన్‌పుట్ వెడల్పు, K అంటే కర్నల్ సైజు, P అంటే ప్యాడింగ్, S అంటే స్ట్రైడ్."
        },
        pooling: {
          name: "మ్యాక్స్ పూలింగ్ (Max Pooling)",
          desc: "2x2 గ్రిడ్ లోని గరిష్ట విలువను మాత్రమే ఎంచుకోవడం ద్వారా నెట్‌వర్క్ కంప్యూటేషన్ భారాన్ని భారీగా తగ్గిస్తుంది."
        },
        dense: {
          name: "ఫుల్లీ కనెక్టెడ్ (Dense)",
          desc: "చివరి లేయర్‌లో 2D ఫీచర్ మ్యాప్స్ ను 1D వెక్టర్‌గా మార్చి సాఫ్ట్‌మ్యాక్స్ ద్వారా ఫైనల్ ప్రిడిక్షన్ ఇస్తుంది."
        }
      },

      realWorld: [
        {
          name: "MRI & మెడికల్ స్కాన్లు",
          role: "కణితి (Tumor) మరియు ఎక్స్-రే విశ్లేషణ",
          desc: "క్యాన్సర్ కణితులు, ఊపిరితిత్తుల ఇన్ఫెక్షన్లను రేడియాలజిస్టుల కంటే వేగంగా U-Net ఆర్కిటెక్చర్ ద్వారా గుర్తిస్తుంది.",
          icon: "Activity"
        },
        {
          name: "టెస్లా ఆటోపైలట్",
          role: "360° కెమెరా కంప్యూటర్ విజన్",
          desc: "8 కెమెరాల వీడియోలను సెకనుకు 36 సార్లు విశ్లేషిస్తూ రోడ్డు మార్గాలు, కార్లు, పాదచారులను లైవ్ లో ట్రాక్ చేస్తుంది.",
          icon: "Car"
        },
        {
          name: "ఆపిల్ ఫేస్ ID",
          role: "బయోమెట్రిక్ 3D ఫేస్ మ్యాపింగ్",
          desc: "30,000 ఇన్‌ఫ్రారెడ్ చుక్కలతో మీ ముఖాన్ని స్కాన్ చేసి 150 మిల్లీసెకన్లలో ఫోన్ అన్‌లాక్ చేస్తుంది.",
          icon: "ScanFace"
        }
      ]
    },

    // Section 2: RNN & LSTM (Telugu)
    rnn: {
      title: "RNN & LSTM (మెమరీ & సీక్వెన్స్)",
      badge: "క్రమానుగత జ్ఞాపకశక్తి",
      ttsText: "రికరెంట్ న్యూరల్ నెట్‌వర్క్స్ మరియు ఎల్‌ఎస్‌టిఎం లు మునుపటి పదాలను గుర్తుంచుకుని తదుపరి పదాన్ని అంచనా వేస్తాయి. ఎల్‌ఎస్‌టిఎం లోని మూడు గేట్లు మెమరీని కోల్పోకుండా కాపాడతాయి.",
      studentAnalogy: "మీరు ఒక కథ చదువుతున్నప్పుడు మొదటి వాక్యంలో హీరో పేరు మర్చిపోతే చివరి వాక్యం అర్థం కాదు కదా! సాధారణ నెట్‌వర్క్స్ ప్రతి పదాన్ని విడివిడిగా చూస్తాయి. కానీ RNN తన డైరీలో (Hidden State) మునుపటి పదాల జ్ఞాపకాలను భద్రపరుచుకుని ముందుకు సాగుతుంది.",
      description: "ఇన్‌పుట్‌లను స్వతంత్రంగా భావించే సాధారణ నెట్‌వర్క్‌లలా కాకుండా, RNN లలో అంతర్గత లూప్‌లు ఉంటాయి. LSTM లు 'వ్యానిషింగ్ గ్రేడియంట్' సమస్యను పరిష్కరించి సుదీర్ఘ వాక్యాలను కూడా సులభంగా గుర్తుంచుకుంటాయి.",

      sampleSentence: ["The", "quick", "brown", "fox", "jumps", "over", "the"],
      predictedWords: [
        { word: "lazy", prob: "78%", match: "అత్యంత ఖచ్చితమైన పదం ('lazy dog')" },
        { word: "sleeping", prob: "14%", match: "సందర్భానుసార పదం" },
        { word: "fence", prob: "8%", match: "స్థల సంబంధిత పదం" }
      ],

      vanishingGradientExp: {
        title: "వ్యానిషింగ్ గ్రేడియంట్ సమస్య (Vanishing Gradient)",
        problem: "సాధారణ RNN లలో వాక్యం పెద్దదయ్యే కొద్దీ బరువులు (Weights) పదేపదే గుణించబడి గ్రేడియంట్ సున్నాకి దగ్గరవుతుంది. దీనివల్ల మొదట్లో వచ్చిన పదాలను నెట్‌వర్క్ పూర్తిగా మర్చిపోతుంది.",
        solution: "LSTM (Long Short-Term Memory) లో 'సెల్ స్టేట్' (కన్వేయర్ బెల్ట్) మరియు మూడు సిగ్మాయిడ్ గేట్లు ఉండి సమాచారాన్ని చెరిగిపోకుండా నిలుపుతాయి:"
      },

      lstmGates: [
        {
          name: "ఫర్గెట్ గేట్ (Forget Gate - f_t)",
          formula: "f_t = σ(W_f · [h_{t-1}, x_t] + b_f)",
          desc: "పాత సమాచారంలో దేనిని మర్చిపోవాలో నిర్ణయిస్తుంది (0 = పూర్తిగా తీసివేయి, 1 = అలాగే ఉంచు)."
        },
        {
          name: "ఇన్‌పుట్ గేట్ (Input Gate - i_t)",
          formula: "i_t = σ(W_i · [h_{t-1}, x_t] + b_i) * tanh(C̃_t)",
          desc: "కొత్తగా వచ్చిన సమాచారంలో ఎంత భాగం మెమరీలో రాయాలో నిర్ణయిస్తుంది."
        },
        {
          name: "సెల్ స్టేట్ అప్‌డేట్ (Cell State - C_t)",
          formula: "C_t = f_t * C_{t-1} + i_t * C̃_t",
          desc: "ఇన్ఫర్మేషన్ హైవే! సంకలన రూపంలో సమాచారం ప్రవహించడం వల్ల సిగ్నల్ సున్నా అవ్వదు."
        },
        {
          name: "అవుట్‌పుట్ గేట్ (Output Gate - o_t)",
          formula: "o_t = σ(W_o · [h_{t-1}, x_t] + b_o); h_t = o_t * tanh(C_t)",
          desc: "మెమరీలోని ముఖ్యమైన భాగాన్ని బయటికి తీసి తదుపరి స్టెప్‌కు పంపుతుంది."
        }
      ],

      realWorld: [
        {
          name: "ప్రిడిక్టివ్ కీబోర్డులు",
          role: "తదుపరి పదాన్ని ముందే ఊహించడం",
          desc: "మొబైల్ కీబోర్డులు (Gboard) మీరు టైప్ చేసిన పదాల ఆధారంగా తర్వాత వచ్చే సరైన పదాన్ని లేదా ఎమోజీని సూచిస్తాయి.",
          icon: "Keyboard"
        },
        {
          name: "గూగుల్ ట్రాన్స్‌లేట్",
          role: "భాషల అనువాదం (Seq2Seq)",
          desc: "తెలుగు వాక్యాన్ని పూర్తిగా విని, దాని సారాంశాన్ని ఒక థాట్ వెక్టర్‌గా మార్చి ఖచ్చితమైన ఆంగ్లంలోకి అనువదిస్తుంది.",
          icon: "Languages"
        },
        {
          name: "సిరి & వాయిస్ అసిస్టెంట్లు",
          role: "లైవ్ స్పీచ్-టు-టెక్స్ట్",
          desc: "మానవ స్వర తరంగాలను మైక్రోసెకన్లలో గ్రహించి పదాలుగా మారుస్తుంది.",
          icon: "Mic"
        }
      ]
    },

    // Section 3: Transformers & GenAI (Telugu)
    transformer: {
      title: "Transformers & GenAI (సృజనాత్మక విప్లవం)",
      badge: "సెల్ఫ్-అటెన్షన్ విప్లవం",
      ttsText: "ట్రాన్స్‌ఫార్మర్స్ సెల్ఫ్-అటెన్షన్ ద్వారా ఒక వాక్యంలోని అన్ని పదాలను ఒకేసారి ప్రాసెస్ చేస్తాయి. పదాలపై కర్సర్ ఉంచి అటెన్షన్ కనెక్షన్లను గమనించండి.",
      studentAnalogy: "ఒక విద్యార్థి 50 పేజీల పాఠ్యపుస్తకంలోని ఆధారాలన్నింటినీ ఒకే చూపులో చూస్తూ, హైలైటర్‌తో సంబంధం ఉన్న పదాలను కలుపుతున్నట్లు ఊహించుకోండి. RNN లాగా పదం తర్వాత పదం కాకుండా, ట్రాన్స్‌ఫార్మర్స్ మొత్తం పేరాగ్రాఫ్‌ను ఒకేసారి చదివి 'it' అనే పదం 'bank' కు సంబంధించినదని 'flooded' అనే పదం ద్వారా వెంటనే గుర్తిస్తాయి!",
      description: "2017లో గూగుల్ ప్రచురించిన 'Attention Is All You Need' పరిశోధనా పత్రం AI ప్రపంచాన్ని మార్చివేసింది. ఇందులో మొత్తం వాక్యాన్ని సమాంతరంగా (Parallel) ఒకేసారి విశ్లేషిస్తారు.",

      sampleSentences: [
        {
          id: 1,
          text: "The bank was closed because it was flooded",
          focusWord: "it",
          keyWeights: {
            "The": 0.05,
            "bank": 0.74,
            "was": 0.04,
            "closed": 0.28,
            "because": 0.12,
            "it": 1.0,
            "flooded": 0.62
          },
          explanation: "'it' అనే పదం 'bank' (0.74) మరియు 'flooded' (0.62) లతో బలంగా ముడిపడి ఉంది; కాబట్టి ఇది నది ఒడ్డు కాదు, వరద ముంచెత్తిన బ్యాంక్ భవనం అని మోడల్ నిర్ధారిస్తుంది."
        },
        {
          id: 2,
          text: "The animal did not cross the street because it was too tired",
          focusWord: "it",
          keyWeights: {
            "The": 0.04,
            "animal": 0.82,
            "did": 0.03,
            "not": 0.08,
            "cross": 0.18,
            "the": 0.04,
            "street": 0.14,
            "because": 0.11,
            "it": 1.0,
            "was": 0.05,
            "too": 0.15,
            "tired": 0.68
          },
          explanation: "'tired' (అలసిపోయింది) అనే పదం ఉంది కాబట్టి 'it' నేరుగా 'animal' (0.82) కు చెందుతుంది. ఒకవేళ 'too wide' (చాలా వెడల్పు) అని ఉంటే 'street' కు ప్రాధాన్యం ఇచ్చేది!"
        }
      ],

      mathBreakdown: {
        title: "సెల్ఫ్-అటెన్షన్ గణిత సూత్రం",
        formula: "Attention(Q, K, V) = softmax((Q · Kᵀ) / √d_k) · V",
        qkv: [
          { name: "క్వెరీ (Query - Q)", desc: "ప్రస్తుత పదం ఏం వెతుకుతోందో తెలిపే వెక్టర్ ('నాకు ఎవరితో సంబంధం ఉంది?')." },
          { name: "కీ (Key - K)", desc: "ప్రతి పదం తన గుర్తింపును ప్రకటించే ఐడీ కార్డు ('నేను ఆర్థిక బ్యాంక్‌ను')." },
          { name: "వాల్యూ (Value - V)", desc: "ఆ పదం మోసే అసలైన సమాచార నిధి." },
          { name: "స్కేలింగ్ ఫ్యాక్టర్ (√d_k)", desc: "సంఖ్యలు మరీ పెద్దవైపోకుండా అదుపులో ఉంచే గణిత స్థిరాంకం." }
        ],
        multiHead: "మల్టీ-హెడ్ అటెన్షన్: ఒకే వాక్యాన్ని వ్యాకరణం, అర్థం మరియు సందర్భం వంటి బహుళ కోణాల్లో ఒకేసారి విశ్లేషిస్తుంది."
      },

      realWorld: [
        {
          name: "ChatGPT (GPT-4o)",
          role: "ఆటోరిగ్రెసివ్ భాషా మోడల్",
          desc: "ట్రిలియన్ పారామీటర్లతో మనుషుల కంటే వేగంగా కోడింగ్ రాయడం, వ్యాసాలు రూపొందించడం చేస్తుంది.",
          icon: "Bot"
        },
        {
          name: "గూగుల్ జెమినీ (Gemini)",
          role: "మల్టీమోడల్ నేటివ్ ట్రాన్స్‌ఫార్మర్",
          desc: "వచనం, వీడియో, ఆడియో మరియు కోడ్‌ను ఒకేసారి 20 లక్షల టోకెన్ల సందర్భంలో విశ్లేషిస్తుంది.",
          icon: "Sparkles"
        },
        {
          name: "గిట్‌హబ్ కోపైలట్ (Copilot)",
          role: "కోడ్ సజెషన్ అసిస్టెంట్",
          desc: "మీ ప్రాజెక్ట్ ఫైళ్లను అర్థం చేసుకుని పూర్తి ఫంక్షన్లను క్షణాల్లో ఆటోకంప్లీట్ చేస్తుంది.",
          icon: "Code2"
        },
        {
          name: "DALL-E 3 & మిడ్‌జర్నీ",
          role: "డిఫ్యూజన్ ట్రాన్స్‌ఫార్మర్ బొమ్మలు",
          desc: "మనం ఇచ్చే మాటల వర్ణనను అత్యంత అద్భుతమైన కళాఖండాలుగా మరియు ఫొటోలుగా మారుస్తుంది.",
          icon: "Palette"
        }
      ]
    },

    // --- MODULE 03 QUIZ (TELUGU) ---
    quizTitle: "జ్ఞాన పరీక్ష క్విజ్ (మాడ్యూల్ 03) 🎯",
    quizSubtitle: "అడ్వాన్స్‌డ్ డీప్ లెర్నింగ్ భావనలపై మీ పట్టును పరీక్షించుకోండి. 4/4 స్కోర్ సాధించి కాన్ఫెట్టి సంబరం చేసుకోండి!",
    scoreText: "స్కోరు",
    tryAgain: "మరలా ప్రయత్నించండి",
    perfectScoreMsg: "అద్భుతం! 🎉 4/4 నూటికి నూరు శాతం సరైన సమాధానాలు! మీరు అడ్వాన్స్‌డ్ AI మాస్టర్ అయ్యారు.",
    correctMsg: "సరిగ్గా చెప్పారు! 🎉 అద్భుతం.",
    incorrectMsg: "పర్వాలేదు, క్రింద ఇచ్చిన ఇంజనీరింగ్ వివరణను చూడండి! 💡",
    toastTitles: {
      correct: "సరైన సమాధానం! 🌟",
      incorrect: "తప్పు సమాధానం 💡"
    },
    quizQuestions: [
      {
        q: "న్యూరల్ నెట్‌వర్క్‌లో డేటాలోని సంక్లిష్ట నమూనాలను విశ్లేషించే ప్రధాన భాగం ఏది?",
        options: ["ఇన్‌పుట్ లేయర్", "హిడెన్ లేయర్స్", "అవుట్‌పుట్ లేయర్", "యాక్టివేషన్ గేట్"],
        correct: 1,
        explanation: "హిడెన్ లేయర్స్ (Hidden Layers) ఇన్‌పుట్ మరియు అవుట్‌పుట్ మధ్య ఉంటాయి. ఇవి డేటాలోని సంక్లిష్ట నమూనాలను బహుళ లేయర్లలో లోతుగా విశ్లేషిస్తాయి."
      },
      {
        q: "కంప్యూటర్‌కు 'కంటి చూపు' (ఇమేజ్ గుర్తింపు) ప్రసాదించే అల్గారిథమ్ ఏది?",
        options: ["RNN", "CNN", "LSTM", "సాధారణ ANN"],
        correct: 1,
        explanation: "CNN (Convolutional Neural Networks) ఇమేజ్‌లలోని పిక్సెల్స్, అంచులు మరియు ఆకారాలను గుర్తించి కంప్యూటర్‌కు కంటి చూపును ఇస్తుంది."
      },
      {
        q: "ReLU యాక్టివేషన్ ఫంక్షన్ నెగటివ్ ఇన్‌పుట్ విలువలను ఏం చేస్తుంది?",
        options: [
          "పాజిటివ్ విలువలుగా మారుస్తుంది",
          "10తో గుణిస్తుంది",
          "సున్నా (0) గా మారుస్తుంది (Zeros them out)",
          "స్క్వేర్ చేస్తుంది"
        ],
        correct: 2,
        explanation: "ReLU సూత్రం f(x) = max(0, x). ఏదైనా నెగటివ్ విలువ (x < 0) వస్తే దానిని నేరుగా సున్నా (0) చేస్తుంది."
      },
      {
        q: "ChatGPT మరియు గూగుల్ జెమినీ వంటి ఆధునిక లార్జ్ లాంగ్వేజ్ మోడల్స్ వెనుక ఉన్న ప్రధాన ఆర్కిటెక్చర్ ఏది?",
        options: [
          "లీనియర్ రిగ్రెషన్",
          "డెసిషన్ ట్రీస్",
          "ట్రాన్స్‌ఫార్మర్స్ (Self-Attention తో)",
          "కె-మీన్స్ క్లస్టరింగ్"
        ],
        correct: 2,
        explanation: "ట్రాన్స్‌ఫార్మర్స్ లోని సెల్ఫ్-అటెన్షన్ మెకానిజమ్ వాక్యాలలోని అన్ని పదాల సంబంధాన్ని ఒకేసారి విశ్లేషించి అద్భుతమైన AI ప్రతిస్పందనలను సృష్టిస్తుంది."
      }
    ],

    // Footer
    footerTagline: "విద్యార్థులు & ఇంజనీర్ల కోసం ప్రత్యేకంగా రూపొందించబడింది • ద్విభాషా డీప్ లెర్నింగ్ ఇంటరాక్టివ్ పోర్టల్",
    footerTech: "Built with React 18, Vite, Tailwind CSS & HTML5 Web Speech API"
  }
};
