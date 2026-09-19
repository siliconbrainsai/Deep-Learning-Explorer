export const glossaryItems = [
  {
    term: "Supervised Learning",
    termTe: "పర్యవేక్షక అభ్యాసం (Supervised)",
    category: "Pillars",
    studentAnalogyEn: "Like a teacher grading homework with an answer key. The model sees questions along with correct answers until it learns to answer new tests.",
    studentAnalogyTe: "జవాబు పత్రంతో కూడిన పరీక్ష లాంటిది. ప్రశ్నలు మరియు సరైన సమాధానాలు రెండింటినీ చూపిస్తూ కంప్యూటర్‌కు నేర్పిస్తారు.",
    engineerMathEn: "Learning a mapping function f: X -> Y that minimizes expected empirical risk R(f) = E[L(f(x), y)] over labeled dataset D = {(x_i, y_i)}.",
    engineerMathTe: "లేబుల్ చేయబడిన డేటాసెట్ D = {(x_i, y_i)} పై ఎంపిక చేసిన లాస్ ఫంక్షన్‌ను మినిమైజ్ చేస్తూ మ్యాపింగ్ ఫంక్షన్ f(X) -> Y ను కనుగొనే ప్రక్రియ."
  },
  {
    term: "Unsupervised Learning",
    termTe: "స్వయంప్రతిపత్తి అభ్యాసం (Unsupervised)",
    category: "Pillars",
    studentAnalogyEn: "Like sorting laundry into darks and lights without anyone telling you the categories. You group items by color and fabric similarities.",
    studentAnalogyTe: "ఎవరి సహాయం లేకుండా బట్టలను రంగుల వారీగా విడదీయడం లాంటిది. కంప్యూటర్ స్వయంగా డేటాలోని పోలికలను వెతికి గ్రూపులుగా మారుస్తుంది.",
    engineerMathEn: "Inferring underlying probability density p(x) or latent representations z in unlabeled data X without supervisor targets (e.g., K-Means, PCA, Autoencoders).",
    engineerMathTe: "ఎటువంటి లేబుల్స్ లేని డేటా X నుండి అంతర్గత నమూనాలను లేదా లేటెంట్ రెప్రజెంటేషన్లను కనుగొనడం."
  },
  {
    term: "Gradient Descent",
    termTe: "గ్రేడియంట్ డిసెంట్ (ఆప్టిమైజేషన్)",
    category: "Optimization",
    studentAnalogyEn: "Like walking down a foggy mountain blindfolded. You feel which way the slope goes downward and take small careful steps until you reach the valley floor.",
    studentAnalogyTe: "పొగమంచుతో నిండిన కొండపై నుండి క్రిందికి దిగడం లాంటిది. ప్రతి అడుగు లోయ వైపు జాగ్రత్తగా వేస్తూ లోయ దిగువకు చేరుకోవడమే గ్రేడియంట్ డిసెంట్.",
    engineerMathEn: "First-order iterative optimization algorithm: θ_{t+1} = θ_t - η · ∇_θ L(θ_t), updating weights in the opposite direction of the loss gradient with learning rate η.",
    engineerMathTe: "ఫస్ట్-ఆర్డర్ ఆప్టిమైజేషన్ ఆల్గారిథమ్: θ_{t+1} = θ_t - η · ∇_θ L(θ_t), ఇది లెర్నింగ్ రేట్ η ద్వారా బరువులను సరైన మార్గంలో అప్‌డేట్ చేస్తుంది."
  },
  {
    term: "Overfitting",
    termTe: "ఓవర్‌ఫిట్టింగ్ (అధిక అభ్యాసం)",
    category: "Evaluation",
    studentAnalogyEn: "Like memorizing textbook practice exam questions word-for-word instead of learning the concept. You get 100% on homework but fail when the teacher changes a number.",
    studentAnalogyTe: "పాఠం అర్థం చేసుకోకుండా బట్టీ పట్టడం లాంటిది. చదివిన ప్రశ్న వస్తే 100 మార్కులు వస్తాయి, కానీ కొద్దిగా మార్చినా అసలు రాయలేకపోవడం.",
    engineerMathEn: "High variance condition where model capacity exceeds task complexity, achieving near-zero training error E_train ≈ 0 but failing to generalize with high generalization gap (E_val >> E_train).",
    engineerMathTe: "ట్రైనింగ్ డేటాలో సున్నా ఎర్రర్ వచ్చి, కొత్త టెస్ట్ డేటా వచ్చినప్పుడు అధిక ఎర్రర్ (High Variance) వచ్చే సాంకేతిక లోపం."
  },
  {
    term: "Activation Function (ReLU)",
    termTe: "యాక్టివేషన్ ఫంక్షన్ (ReLU)",
    category: "Deep Learning",
    studentAnalogyEn: "A strict security turnstile. If your score is positive, you pass straight through unchanged. If negative, you get stopped and reset to zero.",
    studentAnalogyTe: "సినిమా హాల్ సెక్యూరిటీ గేట్ లాంటిది. పాజిటివ్ టికెట్ ఉంటే లోపలికి అనుమతిస్తుంది, నెగటివ్ అయితే అక్కడే సున్నా చేసి ఆపివేస్తుంది.",
    engineerMathEn: "Piecewise linear non-linear activation: f(x) = max(0, x), preventing gradient saturation for x > 0 with constant derivative f'(x) = 1, drastically reducing vanishing gradients.",
    engineerMathTe: "గణిత సూత్రం f(x) = max(0, x); పాజిటివ్ విలువలకు డెరివేటివ్ 1 గా ఉంటూ న్యూరల్ నెట్‌వర్క్ వేగంగా నేర్చుకోవడానికి సహాయపడుతుంది."
  },
  {
    term: "Self-Attention",
    termTe: "సెల్ఫ్-అటెన్షన్ (Self-Attention)",
    category: "Transformers",
    studentAnalogyEn: "A student reading a paragraph with a multi-colored highlighter, instantly drawing glowing connection lines between pronouns like 'it' and the noun 'bank' on the other side of the page.",
    studentAnalogyTe: "ఒక పేరాగ్రాఫ్ చదువుతున్నప్పుడు ఒక పదం (ఉదా: 'it') పేజీలోని ఏ ఇతర పదాలతో (ఉదా: 'bank') ముడిపడి ఉందో హైలైటర్‌తో అనుసంధానం చేయడం లాంటిది.",
    engineerMathEn: "Attention(Q, K, V) = softmax((Q · K^T) / √d_k) · V, computing pairwise all-to-all similarity matrices scaled by embedding dimensionality factor √d_k.",
    engineerMathTe: "Attention(Q, K, V) = softmax((Q · K^T) / √d_k) · V, ఒక వాక్యంలోని అన్ని టోకెన్ల మధ్య సంబంధాలను సమాంతరంగా గణించే ఆధునిక ట్రాన్స్‌ఫార్మర్ సూత్రం."
  },
  {
    term: "FastAPI ASGI Microservice",
    termTe: "ఫాస్ట్‌ఏపీఐ మైక్రోసర్వీస్",
    category: "Production",
    studentAnalogyEn: "A lightning-fast drive-through restaurant window. As soon as a customer orders an AI prediction, it takes the order, serves the result in milliseconds, and moves to the next car.",
    studentAnalogyTe: "అత్యంత వేగవంతమైన రెస్టారెంట్ డ్రైవ్-త్రూ లాంటిది. క్షణాల్లో రిక్వెస్ట్ స్వీకరించి మిల్లీసెకన్లలో ప్రిడిక్షన్ ఫలితాన్ని అందిస్తుంది.",
    engineerMathEn: "Asynchronous Server Gateway Interface (ASGI) Python framework utilizing Starlette and Pydantic for high-concurrency non-blocking I/O, serving ML model inferences with sub-2ms P99 latencies.",
    engineerMathTe: "అసింక్రోనస్ పైథాన్ ఫ్రేమ్‌వర్క్; అత్యధిక కాన్‌కరెన్సీతో డీప్ లెర్నింగ్ మోడల్స్ యొక్క ఇన్ఫరెన్స్ ఫలితాలను అతి తక్కువ లేటెన్సీతో ప్రొడక్షన్‌లో సర్వ్ చేయడానికి ఉపయోగపడుతుంది."
  }
];
