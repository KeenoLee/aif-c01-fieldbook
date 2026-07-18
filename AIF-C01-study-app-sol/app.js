"use strict";

const STORAGE_KEY = "aif-c01-fieldbook-v2";

const domains = [
  {
    id: "d1",
    short: "Domain 1",
    name: "Fundamentals of AI and ML",
    weight: 20,
    color: "#2e6e50",
    summary: "Recognize learning types, task types, data, the ML lifecycle, inference choices, and useful metrics.",
    concepts: [
      ["Learning types", "Supervised uses labels; unsupervised finds patterns without labels; reinforcement learning uses rewards and penalties."],
      ["Task choice", "Classification predicts a category, regression a number, clustering unlabeled groups, and forecasting future values over time."],
      ["Data", "Know structured, semi-structured, unstructured, labeled, and unlabeled data."],
      ["Training vs inference", "Training teaches from data. Inference uses a trained model to predict or generate."],
      ["Inference modes", "Real-time is immediate, batch handles bulk offline work, asynchronous handles longer jobs, and serverless suits variable traffic."],
      ["Metrics", "Accuracy can hide minority-class failure. Precision measures positive prediction quality; recall measures positive coverage; F1 balances both."]
    ],
    trap: "Do not choose a sophisticated service before identifying the basic task. A category is classification; a numeric value is regression."
  },
  {
    id: "d2",
    short: "Domain 2",
    name: "Fundamentals of Generative AI",
    weight: 24,
    color: "#236b8e",
    summary: "Understand foundation-model vocabulary, GenAI strengths and limits, token economics, context, and agent components.",
    concepts: [
      ["Foundation models", "Broadly trained models can be adapted to many tasks. LLMs focus on language; multimodal models work across media."],
      ["Tokens and context", "Tokens are model text units. The context window limits the input and output considered in one request."],
      ["Embeddings", "Embeddings are numeric representations of meaning; vectors enable semantic similarity search."],
      ["GenAI limits", "Expect possible hallucination, nondeterminism, limited interpretability, latency, and token-driven cost."],
      ["Context engineering", "The full context can include system instructions, retrieved documents, history, tool outputs, memory, and task state."],
      ["Agents", "An agent combines a model with instructions, tools, memory, and workflow orchestration to complete tasks."]
    ],
    trap: "Longer prompts and outputs are not free. More tokens, larger models, and larger context windows can increase cost and latency."
  },
  {
    id: "d3",
    short: "Domain 3",
    name: "Applications of Foundation Models",
    weight: 28,
    color: "#bc3b32",
    summary: "Choose models and customization methods, build grounded applications, manage prompts, and evaluate outcomes.",
    concepts: [
      ["Model selection", "Balance task, modality, quality, latency, cost, context, language, compliance, customization, and regional availability."],
      ["RAG", "Retrieve relevant external knowledge and place it in context. Use it for current, private, or citable information."],
      ["Prompt methods", "Zero-shot gives no example, one-shot gives one, and few-shot gives several. Templates standardize recurring prompts."],
      ["Inference controls", "Lower temperature is more focused and predictable; output length affects size, cost, and latency."],
      ["Customization ladder", "Start with prompting; use RAG for knowledge, fine-tuning for behavior, continued pretraining for deeper domain adaptation, and distillation for a smaller model."],
      ["Evaluation", "Use human review, benchmark sets, automated metrics, LLM-as-a-judge, A/B tests, and business outcomes."]
    ],
    trap: "Use RAG when the issue is changing knowledge. Use fine-tuning when the issue is model behavior, style, or task performance."
  },
  {
    id: "d4",
    short: "Domain 4",
    name: "Responsible AI",
    weight: 14,
    color: "#685382",
    summary: "Spot bias, fairness, robustness, explainability, overfitting, legal risk, and the need for human oversight.",
    concepts: [
      ["Bias and fairness", "Bias can enter through unrepresentative data, historical unfairness, labels, sampling, or design choices."],
      ["Subgroup analysis", "Compare performance across demographic or business-relevant groups instead of relying only on one aggregate score."],
      ["Fit", "Overfitting performs well on training data but poorly on new data. Underfitting performs poorly even on training data."],
      ["Explainability", "Transparency exposes how a model works; explainability provides reasons or interpretable signals for decisions."],
      ["Human review", "Use human-in-the-loop controls for low-confidence, sensitive, or high-impact decisions."],
      ["Lifecycle responsibility", "Document intended use, evaluate, monitor after deployment, and revisit legal and compliance requirements."]
    ],
    trap: "An accurate aggregate score does not prove fairness. Look for subgroup performance and representative data."
  },
  {
    id: "d5",
    short: "Domain 5",
    name: "Security, Compliance, and Governance",
    weight: 14,
    color: "#b37b16",
    summary: "Apply least privilege, encryption, private access, logging, governance, grounding, and shared responsibility.",
    concepts: [
      ["Access and encryption", "Use IAM least privilege, encrypt at rest and in transit, and use private connectivity where appropriate."],
      ["AI threats", "Recognize prompt injection, data leakage, toxic output, hallucination, and unauthorized access."],
      ["Grounding", "RAG, citations, validation, confidence checks, and human review can reduce unsupported high-risk output."],
      ["Governance", "Track lineage, catalogs, lifecycle, residency, retention, quality, integrity, logging, and access."],
      ["Audit evidence", "CloudTrail records API activity, Config tracks configuration, Audit Manager collects evidence, and Artifact provides reports and agreements."],
      ["Shared responsibility", "AWS secures the cloud; customers secure their data, identities, configurations, prompts, applications, outputs, and compliance choices."]
    ],
    trap: "CloudTrail is the API audit trail; CloudWatch is operational monitoring. KMS manages keys; Macie discovers sensitive data in S3."
  }
];

const studyDays = [
  {
    label: "Day 1",
    title: "Build the language",
    color: "#2e6e50",
    goal: "Understand core AI/ML and GenAI concepts well enough to classify a scenario before looking at services.",
    focus: "Domains 1 and 2",
    checkpoint: "Explain task types, tokens, embeddings, and why GenAI can be nondeterministic.",
    tasks: [
      ["Separate AI, ML, deep learning, and GenAI", "Create a one-sentence definition and example for each.", "20 min"],
      ["Drill task and learning types", "Choose classification, regression, clustering, forecasting, supervised, or unsupervised from cues.", "25 min"],
      ["Trace training through monitoring", "Review the ML lifecycle and match real-time, batch, asynchronous, and serverless inference.", "20 min"],
      ["Learn GenAI building blocks", "Review foundation models, tokens, embeddings, vectors, chunking, and context windows.", "30 min"],
      ["Map the core AI services", "Distinguish Bedrock, SageMaker AI, Comprehend, Transcribe, Translate, Lex, Polly, Rekognition, and Textract.", "25 min"]
    ]
  },
  {
    label: "Day 2",
    title: "Own the largest domain",
    color: "#bc3b32",
    goal: "Make confident foundation-model choices from business constraints and explain why the alternatives do not fit.",
    focus: "Domain 3",
    checkpoint: "Explain RAG vs fine-tuning, vector storage, prompt risks, model selection, and evaluation.",
    tasks: [
      ["Use the model-selection checklist", "Compare task, modality, quality, latency, cost, context, language, compliance, and region.", "25 min"],
      ["Practice prompt patterns", "Apply role, task, context, constraints, format, zero-shot, one-shot, few-shot, and templates.", "25 min"],
      ["Draw a RAG request", "Follow chunking to embeddings, semantic retrieval, model context, grounded answer, and citations.", "30 min"],
      ["Choose the customization method", "Use prompting first, RAG for knowledge, fine-tuning for behavior, and distillation for efficiency.", "30 min"],
      ["Evaluate beyond one metric", "Pair human review and benchmark data with ROUGE, BLEU, BERTScore, satisfaction, completion, cost, or A/B tests.", "25 min"]
    ]
  },
  {
    label: "Day 3",
    title: "Govern, test, repair",
    color: "#685382",
    goal: "Finish responsible AI and governance, then convert every missed practice question into a decision rule.",
    focus: "Domains 4 and 5 plus practice",
    checkpoint: "Identify the risk, the control, the AWS service, and the customer's responsibility in a scenario.",
    tasks: [
      ["Audit fairness and fit", "Review bias sources, subgroup analysis, explainability, overfitting, and underfitting.", "25 min"],
      ["Match safeguards to risks", "Connect guardrails, human review, monitoring, model cards, and Clarify to their purposes.", "25 min"],
      ["Secure the AI path", "Review IAM, KMS, Macie, PrivateLink, input validation, data minimization, and output filtering.", "25 min"],
      ["Separate audit and monitoring tools", "Distinguish CloudTrail, CloudWatch, Config, Audit Manager, Artifact, Inspector, and Trusted Advisor.", "20 min"],
      ["Take and repair the practice exam", "For each miss, write: I chose X, but the cue points to Y because...", "35 min"]
    ]
  }
];

const services = [
  ["Amazon Bedrock", "Build generative AI applications with foundation models.", "foundation models, GenAI app"],
  ["Bedrock Knowledge Bases", "Create managed RAG over organizational data.", "grounding, current documents, citations"],
  ["Bedrock Agents", "Orchestrate model reasoning with tools and actions.", "tool use, API action, workflow"],
  ["Bedrock Guardrails", "Apply configurable safeguards to GenAI inputs and outputs.", "content filter, denied topics, safety"],
  ["Bedrock Model Evaluation", "Evaluate foundation models with automated or human methods.", "compare FM quality"],
  ["Bedrock Prompt Management", "Store, version, and reuse prompt templates.", "prompt version, reusable template"],
  ["Amazon SageMaker AI", "Build, train, deploy, and manage ML models.", "custom ML lifecycle"],
  ["SageMaker JumpStart", "Start from pretrained models and solution templates.", "pretrained model, quick start"],
  ["SageMaker Clarify", "Detect bias and explain model predictions.", "bias, feature attribution, explainability"],
  ["SageMaker Model Monitor", "Monitor deployed models for quality and drift.", "production drift, model quality"],
  ["SageMaker Model Cards", "Document model purpose, risk, and evaluation details.", "model documentation, intended use"],
  ["Amazon Augmented AI", "Create human review workflows for ML decisions.", "human-in-the-loop, low confidence"],
  ["Amazon Comprehend", "Extract entities, sentiment, and insights from text.", "natural language insights"],
  ["Amazon Transcribe", "Convert speech to text.", "audio to transcript"],
  ["Amazon Translate", "Translate text between languages.", "text language translation"],
  ["Amazon Polly", "Convert text to natural-sounding speech.", "text to voice"],
  ["Amazon Lex", "Build conversational chat and voice bots.", "conversational interface"],
  ["Amazon Rekognition", "Analyze images and video.", "objects, faces, visual moderation"],
  ["Amazon Textract", "Extract text, forms, tables, and structure from documents.", "scanned forms, PDF tables"],
  ["Amazon Personalize", "Build real-time personalized recommendations.", "recommend products or content"],
  ["Amazon Kendra", "Search enterprise content with natural language.", "enterprise document search"],
  ["Amazon OpenSearch Service", "Support search and vector retrieval workloads.", "semantic search, vector store"],
  ["AWS IAM", "Control identities and permissions with least privilege.", "access control, role, policy"],
  ["AWS KMS", "Create and manage encryption keys.", "key management, encryption"],
  ["Amazon Macie", "Discover and protect sensitive data in Amazon S3.", "PII discovery in S3"],
  ["AWS CloudTrail", "Record AWS API activity for auditing.", "who called which API"],
  ["Amazon CloudWatch", "Collect operational logs, metrics, and alarms.", "runtime monitoring, alarm"],
  ["AWS Config", "Track resource configuration and compliance state.", "configuration history, compliance"],
  ["AWS Audit Manager", "Collect and organize evidence for audits.", "audit evidence"],
  ["AWS Artifact", "Access AWS compliance reports and agreements.", "compliance report, agreement"],
  ["AWS PrivateLink", "Privately connect a VPC to supported services.", "private network access"],
  ["Amazon Inspector", "Scan workloads for software vulnerabilities and exposure.", "vulnerability scanning"],
  ["AWS Trusted Advisor", "Recommend improvements for cost, security, performance, and reliability.", "best-practice recommendation"]
];

const scenarios = [
  { id: "s1", domain: "d1", prompt: "A bank predicts whether each transaction is fraudulent or legitimate.", instruction: "Which ML task is the cleanest fit?", answers: ["Regression", "Classification", "Clustering", "Forecasting"], correct: 1, rationale: "The output is one of two categories, so this is classification.", contrast: "Regression predicts a numeric value; clustering discovers groups without predefined labels." },
  { id: "s2", domain: "d1", prompt: "A retailer wants customer segments, but it has no segment labels.", instruction: "Which approach matches the available data?", answers: ["Supervised regression", "Unsupervised clustering", "Reinforcement learning", "Batch translation"], correct: 1, rationale: "Clustering finds similar groups in unlabeled data and is an unsupervised learning task.", contrast: "Supervised methods require labeled targets." },
  { id: "s3", domain: "d1", prompt: "A company scores ten million records every night for a morning report.", instruction: "Which inference pattern best matches this workload?", answers: ["Real-time", "Batch", "Asynchronous interactive", "Streaming speech"], correct: 1, rationale: "Batch inference processes many records together when an immediate per-request response is unnecessary.", contrast: "Real-time inference is for immediate responses such as fraud checks or chat." },
  { id: "s4", domain: "d2", prompt: "Users send the same prompt twice and receive slightly different useful answers.", instruction: "Which GenAI characteristic explains this?", answers: ["Data residency", "Nondeterminism", "Encryption", "Underfitting"], correct: 1, rationale: "Foundation-model generation can be nondeterministic, so repeated prompts may produce different outputs.", contrast: "Lower temperature can make responses more focused and predictable, but generation is not a database lookup." },
  { id: "s5", domain: "d2", prompt: "A search system must retrieve passages that are similar in meaning, not only exact keywords.", instruction: "What representation enables semantic similarity?", answers: ["Encryption keys", "Embeddings", "IAM policies", "Labels"], correct: 1, rationale: "Embeddings represent semantic meaning numerically so vectors can be compared for similarity.", contrast: "Chunking determines searchable passage size; embeddings provide the semantic representation." },
  { id: "s6", domain: "d2", prompt: "An assistant calls an order API, checks inventory, and remembers task state across steps.", instruction: "Which concept best describes the system?", answers: ["Agentic AI", "Unsupervised clustering", "Image diffusion", "Batch inference"], correct: 0, rationale: "An agent combines a model with instructions, tools, memory, and workflow steps.", contrast: "A model alone generates output; tool use and orchestration make this an agentic workflow." },
  { id: "s7", domain: "d3", prompt: "An HR assistant must answer from policies that change every week and show sources.", instruction: "Which customization approach should lead?", answers: ["RAG", "Fine-tuning", "Continued pretraining", "Higher temperature"], correct: 0, rationale: "RAG grounds answers in current external documents and can provide source traceability without retraining.", contrast: "Fine-tuning changes behavior; it is not the best way to keep frequently changing facts current." },
  { id: "s8", domain: "d3", prompt: "A support model knows the facts but repeatedly ignores the company's required response format.", instruction: "What is the lowest-cost first step?", answers: ["Continued pretraining", "Prompt template with explicit format", "A larger vector database", "Increase temperature"], correct: 1, rationale: "Prompt engineering is usually the fastest, lowest-cost starting point for output behavior and format.", contrast: "Escalate to fine-tuning only if prompting is insufficient; RAG solves a knowledge problem." },
  { id: "s9", domain: "d3", prompt: "A creative writing assistant produces answers that are too random and inconsistent.", instruction: "Which inference change should the team try?", answers: ["Raise temperature", "Lower temperature", "Remove constraints", "Increase output length"], correct: 1, rationale: "Lower temperature generally makes output more focused and predictable.", contrast: "Output length controls response size, cost, and latency, not randomness directly." },
  { id: "s10", domain: "d3", prompt: "A team compares two summarization models for lexical overlap with reference summaries.", instruction: "Which metric is commonly associated with this task?", answers: ["ROUGE", "IAM", "KMS", "Precision for fraud"], correct: 0, rationale: "ROUGE is commonly used to compare overlap for summarization.", contrast: "No single metric proves business value; combine automated metrics with human and outcome evaluation." },
  { id: "s11", domain: "d3", prompt: "A capable model meets quality needs, but cost and latency are too high at scale.", instruction: "Which method can teach a smaller model to imitate it?", answers: ["Distillation", "RAG", "Chunking", "Prompt injection"], correct: 0, rationale: "Distillation trains a smaller model to imitate a larger one, often reducing cost and latency.", contrast: "RAG supplies knowledge; it does not by itself make the underlying model smaller." },
  { id: "s12", domain: "d4", prompt: "A hiring model has good overall accuracy but performs worse for one demographic group.", instruction: "Which analysis is most important next?", answers: ["Increase token count", "Subgroup performance analysis", "Use a larger context window", "Disable monitoring"], correct: 1, rationale: "Subgroup analysis reveals performance differences hidden by an aggregate metric.", contrast: "Overall accuracy alone is not evidence of fairness." },
  { id: "s13", domain: "d4", prompt: "A model performs extremely well on training data and poorly on new applications.", instruction: "What is the likely problem?", answers: ["Underfitting", "Overfitting", "Grounding", "Tokenization"], correct: 1, rationale: "Overfitting means the model learned the training data too closely and does not generalize.", contrast: "Underfitting performs poorly even on the training data." },
  { id: "s14", domain: "d5", prompt: "An auditor asks who changed a model endpoint policy and which API call was used.", instruction: "Which service provides the audit history?", answers: ["Amazon CloudWatch", "AWS CloudTrail", "Amazon Macie", "AWS KMS"], correct: 1, rationale: "AWS CloudTrail records AWS API activity and supports this audit question.", contrast: "CloudWatch monitors operational logs, metrics, and alarms; it is not the primary API activity trail." },
  { id: "s15", domain: "d5", prompt: "A security team needs to discover PII stored in Amazon S3 before using documents for AI.", instruction: "Which service maps directly to this need?", answers: ["AWS KMS", "Amazon Macie", "AWS Config", "Amazon Polly"], correct: 1, rationale: "Amazon Macie discovers and helps protect sensitive data in Amazon S3.", contrast: "KMS manages encryption keys; encryption does not discover which objects contain PII." }
];

const flashcards = [
  ["d1", "Classification vs regression?", "Classification predicts a category. Regression predicts a numeric value."],
  ["d1", "When is clustering appropriate?", "When you need to discover groups or segments in unlabeled data."],
  ["d1", "Training vs inference?", "Training teaches a model from data. Inference uses the trained model to predict or generate."],
  ["d1", "Why can accuracy mislead?", "With imbalanced classes, high overall accuracy can hide poor minority-class performance."],
  ["d1", "Precision vs recall?", "Precision asks how many predicted positives were correct. Recall asks how many actual positives were found."],
  ["d1", "Batch vs real-time inference?", "Batch processes bulk offline work. Real-time returns an immediate response per request."],
  ["d2", "What is an embedding?", "A numeric representation of semantic meaning."],
  ["d2", "What is a context window?", "The amount of input and output a model can consider in one request."],
  ["d2", "What is hallucination?", "An incorrect or unsupported model output presented as if it were valid."],
  ["d2", "What drives token-based cost?", "Input and output length, request volume, context size, and model choice."],
  ["d2", "What makes an AI system agentic?", "A model combined with instructions, tools, memory, and workflow orchestration."],
  ["d2", "Token, chunk, vector: distinguish them.", "A token is a model text unit; a chunk is a document passage; a vector is the numeric form used for similarity."],
  ["d3", "RAG or fine-tuning for weekly policy updates?", "RAG. The issue is current external knowledge."],
  ["d3", "RAG or fine-tuning for consistent brand behavior?", "Try prompt templates first; use fine-tuning if behavior still needs adaptation."],
  ["d3", "What does lower temperature do?", "It generally makes output more focused and predictable."],
  ["d3", "What does a vector database store?", "Embeddings used for semantic similarity search."],
  ["d3", "Zero-shot vs few-shot prompting?", "Zero-shot provides no examples. Few-shot provides multiple examples."],
  ["d3", "When is distillation useful?", "When a smaller model should imitate a larger model to reduce cost or latency."],
  ["d3", "ROUGE, BLEU, BERTScore?", "ROUGE is common for summarization overlap, BLEU for translation overlap, and BERTScore for semantic similarity."],
  ["d3", "What is prompt injection?", "Malicious input that tries to override system instructions or intended behavior."],
  ["d4", "Which AWS tool helps detect bias and explain predictions?", "SageMaker Clarify."],
  ["d4", "Which service supports human review workflows?", "Amazon Augmented AI, also called Amazon A2I."],
  ["d4", "Overfitting vs underfitting?", "Overfitting fails to generalize from training data. Underfitting performs poorly even on training data."],
  ["d4", "Why use subgroup analysis?", "To find performance or fairness differences hidden by aggregate metrics."],
  ["d4", "What belongs in a model card?", "Intended use, model details, risks, limitations, and evaluation information."],
  ["d5", "CloudTrail or CloudWatch for API audit history?", "CloudTrail records API activity. CloudWatch handles operational logs, metrics, and alarms."],
  ["d5", "Macie or KMS for sensitive-data discovery?", "Macie discovers sensitive data in S3. KMS manages encryption keys."],
  ["d5", "What does shared responsibility mean for AI?", "AWS secures the cloud; customers secure data, access, configurations, prompts, apps, outputs, monitoring, and compliance."],
  ["d5", "How can high-risk hallucination be reduced?", "Use grounding, citations, validation, confidence checks, restricted sources, and human review."],
  ["d5", "Config, Audit Manager, or Artifact?", "Config tracks resource compliance; Audit Manager collects audit evidence; Artifact provides compliance reports and agreements."]
].map(([domain, prompt, answer], index) => ({ id: `c${index + 1}`, domain, prompt, answer }));

const quizQuestions = [
  ["d1", "A company predicts next month's demand as a numeric quantity. Which ML task is most appropriate?", ["Classification", "Regression", "Clustering", "Dimensionality reduction"], 1, "A numeric target is a regression task. Forecasting is the time-oriented use case, commonly implemented as numeric prediction."],
  ["d1", "A retailer groups shoppers by buying behavior without predefined labels. Which learning type fits?", ["Supervised learning", "Unsupervised learning", "Reinforcement learning", "Transfer learning"], 1, "Grouping without labels is unsupervised learning, typically clustering."],
  ["d1", "Which statement best describes inference?", ["Preparing labels for training", "Teaching a model from data", "Using a trained model to produce a prediction or output", "Encrypting a model endpoint"], 2, "Inference is the use of a trained model to make predictions or generate outputs."],
  ["d1", "Which metric measures the proportion of actual positive cases that a model correctly identifies?", ["Precision", "Recall", "F1 score", "Accuracy"], 1, "Recall is TP / (TP + FN), the proportion of actual positive cases that the model correctly identifies."],
  ["d1", "Millions of records must be scored overnight with no immediate user response. Which inference type fits?", ["Real-time", "Batch", "Conversational", "Streaming"], 1, "Batch inference is appropriate for bulk offline scoring."],
  ["d2", "What is an embedding?", ["An AWS billing unit", "A numeric representation of meaning", "A retention policy", "An access token"], 1, "Embeddings represent semantic meaning numerically."],
  ["d2", "What does a model's context window constrain?", ["The AWS account region", "The input and output considered in one request", "The number of IAM roles", "Only the training dataset size"], 1, "The context window limits how much input and output the model can consider in a request."],
  ["d2", "Which is a known limitation of generative AI?", ["Outputs are always deterministic", "Outputs can contain unsupported information", "It cannot process text", "It has no runtime cost"], 1, "A model can hallucinate incorrect or unsupported information."],
  ["d2", "Which change usually increases token-based cost?", ["Shorter responses", "Longer prompts and outputs", "Fewer requests", "Using less context"], 1, "More input and output tokens generally increase cost."],
  ["d2", "A system uses a model, tools, memory, and workflow steps to complete a task. What is it?", ["A vector only", "Agentic AI", "Clustering", "Batch training"], 1, "Agents combine models with tools, instructions, memory, and orchestration."],
  ["d2", "Which model type can work with text and images in the same task?", ["Multimodal model", "Regression model only", "IAM policy", "Vector database"], 0, "A multimodal model processes or generates more than one modality."],
  ["d3", "A chatbot must answer from the latest internal HR policies and cite sources. What is usually best?", ["RAG with a knowledge base", "Fine-tune on old tickets", "Increase temperature", "Use image generation"], 0, "RAG grounds output in current external documents and supports source traceability."],
  ["d3", "A team wants more predictable foundation-model responses. What should it usually try?", ["Increase temperature", "Lower temperature", "Increase output length", "Remove all instructions"], 1, "Lower temperature generally produces more focused and predictable output."],
  ["d3", "Which is the best low-cost first step for enforcing a consistent output format?", ["Prompt engineering", "Continued pretraining", "Distillation", "Build a new model"], 0, "Prompt engineering is usually the fastest and lowest-cost starting point."],
  ["d3", "What does a vector database store for semantic retrieval?", ["IAM users", "Embeddings", "Encryption keys", "Only exact keywords"], 1, "Vector databases store embeddings for semantic similarity search."],
  ["d3", "Which metric is commonly associated with summarization overlap?", ["ROUGE", "IAM", "VPC", "KMS"], 0, "ROUGE is commonly used for summarization overlap."],
  ["d3", "What is prompt injection?", ["Compressing a prompt", "Malicious input intended to override instructions", "Encrypting embeddings", "A batch inference method"], 1, "Prompt injection attempts to override intended instructions through malicious input."],
  ["d3", "A large model has acceptable quality but excessive cost and latency. Which method can create a smaller imitator?", ["RAG", "Distillation", "Chunking", "Guardrails"], 1, "Distillation trains a smaller model to imitate a larger one."],
  ["d4", "A model is accurate overall but performs poorly for one demographic group. What should the team examine?", ["Only aggregate accuracy", "Subgroup performance", "Token price", "Network bandwidth"], 1, "Subgroup analysis can reveal fairness problems hidden by aggregate results."],
  ["d4", "A model performs well on training data and poorly on new data. What is likely?", ["Underfitting", "Overfitting", "Grounding", "Translation"], 1, "This is the classic sign of overfitting."],
  ["d4", "Which service helps detect bias and explain SageMaker model predictions?", ["Amazon Macie", "SageMaker Clarify", "AWS Artifact", "Amazon Polly"], 1, "SageMaker Clarify supports bias detection and explainability."],
  ["d5", "Which service records AWS API activity for audit purposes?", ["Amazon CloudWatch", "AWS CloudTrail", "Amazon Lex", "AWS KMS"], 1, "CloudTrail records AWS API activity."],
  ["d5", "Which service helps discover sensitive data such as PII in Amazon S3?", ["AWS KMS", "Amazon Macie", "AWS Config", "Amazon Polly"], 1, "Macie discovers and helps protect sensitive data in S3."],
  ["d5", "Which feature most directly provides configurable safeguards for GenAI inputs and outputs?", ["Bedrock Guardrails", "AWS Budgets", "S3 Glacier", "Route 53"], 0, "Bedrock Guardrails applies safeguards such as content controls to GenAI applications."],
  ["d5", "Which statement best describes AWS shared responsibility?", ["AWS owns all customer data decisions", "Customers secure AWS data centers", "AWS secures the cloud; customers secure what they build and configure in it", "Customers have no AI security duties"], 2, "AWS is responsible for security of the cloud; customers are responsible for security in the cloud."]
].map(([domain, question, answers, correct, explanation], index) => ({ id: `q${index + 1}`, domain, question, answers, correct, explanation }));

const EXAM_QUESTION_TOTAL = 65;
const MOCK_EXAM_SECONDS = 90 * 60;

const questionDomainSignals = {
  d1: [
    [10, /supervised|unsupervised|reinforcement learning|classification|regression|clustering|forecasting/],
    [8, /precision|recall|f1(?: score)?|confusion matrix|true positive|false positive|mean squared|root mean/],
    [7, /training data|test data|validation data|model training|inference|machine learning lifecycle|ml lifecycle|feature engineering/],
    [5, /structured data|unstructured data|labeled data|unlabeled data|deep learning|neural network|decision tree/]
  ],
  d2: [
    [10, /foundation model|large language model|\bllm|generative ai|genai|transformer|diffusion model|multimodal/],
    [9, /tokenization|\btokens?\b|context window|embedding|vector representation|semantic meaning/],
    [7, /hallucination|nondetermin|pretrained model|agentic ai|ai agent/],
    [5, /natural language processing|computer vision|foundation-model lifecycle/]
  ],
  d3: [
    [12, /retrieval.augmented|\brag\b|knowledge base|fine-tun|continued pretrain|distillation/],
    [10, /prompt engineering|prompt template|zero-shot|one-shot|few-shot|chain.of.thought|temperature|top.p|top.k/],
    [9, /model evaluation|rouge|bleu|bertscore|human evaluation|model selection|benchmark/],
    [7, /vector database|semantic search|chunking|grounding|bedrock agents?|prompt management/],
    [5, /amazon bedrock|foundation model application|fm application/]
  ],
  d4: [
    [13, /bias|fairness|responsible ai|sagemaker clarify|explainab|interpretab|transparen/],
    [10, /human.in.the.loop|human review|augmented ai|amazon a2i|model cards?|overfitting|underfitting/],
    [8, /toxic|toxicity|harmful content|legal risk|ethical|subgroup|inclusive/],
    [6, /robustness|accountability|deterministic/]
  ],
  d5: [
    [13, /\biam\b|identity and access|least privilege|\bkms\b|cloudtrail|cloudwatch|amazon macie|aws config|audit manager|aws artifact|privatelink/],
    [11, /security|compliance|governance|encryption|data privacy|data residency|data lineage|data retention/],
    [10, /prompt injection|jailbreak|personally identifiable|\bpii\b|sensitive data|access control|shared responsibility/],
    [8, /guardrails?|content filter|vpc endpoint|network isolation|audit trail/]
  ]
};

const rawTestBankPayload = window.AIF_TEST_BANK || {
  meta: { total: 0, answers: 0, explanations: 0, reviewed: 0, note: 0, caution: 0, claimedTotal: 385, disclaimer: "Question bank data is unavailable." },
  questions: []
};
const testBankReview = window.AIF_TEST_BANK_REVIEW || { auditDate: "", removed: {}, questions: {} };
const removedBankQuestions = new Set(Object.keys(testBankReview.removed).map(Number));

function cleanHotspotPrompt(prompt) {
  return prompt
    .replace(/^HOTSPOT\s+/i, "")
    .replace(/\s+Hot Area:.*$/i, "")
    .trim();
}

const auditedBankQuestions = rawTestBankPayload.questions
  .filter((question) => !removedBankQuestions.has(question.number))
  .map((question) => {
    const audit = testBankReview.questions[question.number];
    if (!audit) {
      return {
        ...question,
        status: testBankReview.reviewedAll ? "reviewed" : "imported",
        verdict: testBankReview.reviewedAll ? "Reviewed against the AIF-C01 scope and current AWS guidance" : "Imported without extraction flags",
        sources: []
      };
    }
    return {
      ...question,
      ...audit,
      prompt: audit.prompt || (audit.format ? cleanHotspotPrompt(question.prompt) : question.prompt),
      answers: audit.answers || question.answers,
      explanation: audit.explanation || question.explanation,
      sources: audit.sources || []
    };
  });

const testBankPayload = {
  meta: {
    ...rawTestBankPayload.meta,
    total: auditedBankQuestions.length,
    answers: auditedBankQuestions.filter((question) => question.answers.length > 0).length,
    explanations: auditedBankQuestions.filter((question) => question.explanation).length,
    imported: auditedBankQuestions.filter((question) => question.status === "imported").length,
    reviewed: auditedBankQuestions.filter((question) => question.status === "reviewed").length,
    verified: auditedBankQuestions.filter((question) => question.status === "verified").length,
    needsReview: auditedBankQuestions.filter((question) => question.status === "needs-review").length,
    removed: removedBankQuestions.size,
    auditDate: testBankReview.auditDate,
    disclaimer: `${auditedBankQuestions.length} questions retained. ${removedBankQuestions.size} misleading or obsolete items were removed. The full bank was reviewed for wording, answer plausibility, and AIF-C01 scope; changed or time-sensitive items were cross-checked with current official AWS documentation on ${testBankReview.auditDate}.`
  },
  questions: auditedBankQuestions
};
const testBankQuestions = testBankPayload.questions;

function inferQuestionDomain(question) {
  const text = `${question.prompt || ""} ${question.answerText || ""}`.toLowerCase();
  let selectedDomain = null;
  let selectedScore = 0;

  domains.forEach((domain) => {
    const score = questionDomainSignals[domain.id].reduce((total, [weight, pattern]) => total + (pattern.test(text) ? weight : 0), 0);
    if (score > selectedScore) {
      selectedDomain = domain.id;
      selectedScore = score;
    }
  });

  return selectedDomain;
}

function allocateExamQuestions(total) {
  const allocation = domains.map((domain, index) => {
    const exact = total * domain.weight / 100;
    return { domain: domain.id, count: Math.floor(exact), fraction: exact % 1, index };
  });
  let remaining = total - allocation.reduce((sum, item) => sum + item.count, 0);

  [...allocation]
    .sort((a, b) => b.fraction - a.fraction || a.index - b.index)
    .forEach((item) => {
      if (remaining <= 0) return;
      allocation.find((entry) => entry.domain === item.domain).count += 1;
      remaining -= 1;
    });

  return allocation;
}

function shuffleItems(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

const examBlueprint = allocateExamQuestions(EXAM_QUESTION_TOTAL);
const reviewedExamQuestionPool = testBankQuestions
  .filter((question) => (
    question.options.length >= 2
    && question.answers.length >= 1
    && question.answers.every((answer) => question.options.some((option) => option.label === answer))
  ))
  .map((question) => ({ ...question, domain: inferQuestionDomain(question) }))
  .filter((question) => question.domain);
const curatedPracticePool = quizQuestions.map((question) => ({
  id: `practice-${question.id}`,
  number: null,
  domain: question.domain,
  prompt: question.question,
  options: question.answers.map((text, index) => ({ label: String.fromCharCode(65 + index), text })),
  answers: [String.fromCharCode(65 + question.correct)],
  answerText: question.answers[question.correct],
  explanation: question.explanation
}));
const practiceQuestionPool = [...reviewedExamQuestionPool, ...curatedPracticePool];

const defaultProgress = () => ({
  pathDone: [],
  scenarioAnswers: {},
  cardStatus: {},
  bankReviewed: [],
  bestExam: null,
  examAttempts: 0,
  bestMock: null,
  mockAttempts: 0,
  quickDone: false
});

function loadProgress() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!parsed || typeof parsed !== "object") return defaultProgress();
    const progress = { ...defaultProgress(), ...parsed };
    if (!Array.isArray(progress.bankReviewed)) progress.bankReviewed = [];
    return progress;
  } catch (error) {
    return defaultProgress();
  }
}

const state = {
  progress: loadProgress(),
  selectedDomain: "d3",
  selectedDay: 0,
  labFilter: "all",
  labIndex: 0,
  cardFilter: "all",
  cardIndex: 0,
  cardRevealed: false,
  cardOrder: flashcards.map((card) => card.id),
  bankFilter: "all",
  bankIndex: 0,
  bankRevealed: false,
  bankSelection: [],
  bankSubmitted: false,
  exam: {
    running: false,
    questions: [],
    index: 0,
    score: 0,
    answers: [],
    answered: false,
    selection: [],
    draftSelections: {}
  },
  mock: {
    running: false,
    questions: [],
    index: 0,
    selections: {},
    deadline: null,
    timerId: null
  }
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
  } catch (error) {
    showToast("Progress could not be saved in this browser.");
  }
}

function domainById(id) {
  return domains.find((domain) => domain.id === id);
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

function calculateReadiness() {
  const pathRatio = state.progress.pathDone.length / 15;
  const scenarioEntries = Object.values(state.progress.scenarioAnswers);
  const attemptedRatio = scenarioEntries.length / scenarios.length;
  const scenarioCorrectRatio = scenarioEntries.filter((item) => item.correct).length / scenarios.length;
  const retained = Object.values(state.progress.cardStatus).filter((value) => value === "retained").length;
  const cardRatio = retained / flashcards.length;
  const examRatio = state.progress.bestExam ? state.progress.bestExam.percent / 100 : 0;
  return Math.round(pathRatio * 30 + attemptedRatio * 10 + scenarioCorrectRatio * 15 + cardRatio * 20 + examRatio * 25);
}

function updateReadiness() {
  const value = calculateReadiness();
  $("#readinessValue").textContent = `${value}%`;
  $("#readinessBar").style.width = `${value}%`;
}

function switchView(id, updateHash = true) {
  const target = document.getElementById(id) || document.getElementById("today");
  $$(".view").forEach((view) => {
    const active = view === target;
    view.hidden = !active;
    view.classList.toggle("is-active", active);
  });
  $$(".nav-tab").forEach((button) => {
    const active = button.dataset.view === target.id;
    button.classList.toggle("is-active", active);
    if (active) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
  if (updateHash && location.hash !== `#${target.id}`) history.replaceState(null, "", `#${target.id}`);
  window.scrollTo({ top: 0, behavior: updateHash ? "smooth" : "auto" });
}

function renderToday() {
  const scenarioEntries = Object.values(state.progress.scenarioAnswers);
  const scenarioCorrect = scenarioEntries.filter((item) => item.correct).length;
  const retained = Object.values(state.progress.cardStatus).filter((value) => value === "retained").length;
  $("#pulsePath").textContent = `${state.progress.pathDone.length} / 15`;
  $("#pulseScenarios").textContent = `${scenarioEntries.length} / ${scenarios.length}`;
  $("#pulseCards").textContent = `${retained} / ${flashcards.length}`;
  $("#pulseBank").textContent = `${state.progress.bankReviewed.length} / ${testBankPayload.meta.total}`;
  $("#pulseExam").textContent = state.progress.bestExam ? `${state.progress.bestExam.percent}%` : "Not taken";
  $("#pulseMock").textContent = state.progress.bestMock ? `${state.progress.bestMock.percent}%` : "Not taken";

  let recommendation;
  if (state.progress.pathDone.length < 5) {
    recommendation = {
      title: "Build the language",
      reason: "Start with Day 1 vocabulary so service questions have a clear conceptual base.",
      time: "20 min",
      jump: "path",
      action: "Continue Day 1",
      steps: ["Task types", "GenAI terms", "Core services"]
    };
  } else if (scenarioEntries.length < 8) {
    recommendation = {
      title: "Practice the highest-weight decisions",
      reason: "Scenario practice turns Domain 3 distinctions into retrieval, not recognition.",
      time: "18 min",
      jump: "lab",
      action: "Start scenario drill",
      steps: ["Read the cue", "Eliminate distractors", "Explain the contrast"]
    };
  } else if (retained < 18) {
    recommendation = {
      title: "Strengthen active recall",
      reason: "You have scenario exposure. Now say the distinction before revealing it.",
      time: "15 min",
      jump: "cards",
      action: "Review flashcards",
      steps: ["Answer aloud", "Mark honestly", "Repeat weak cards"]
    };
  } else if (!state.progress.bestExam) {
    recommendation = {
      title: "Take a weighted practice exam",
      reason: "You have enough coverage to measure domain-level recall under a full mixed set.",
      time: "25 min",
      jump: "exam",
      action: "Start practice exam",
      steps: ["Answer once", "Read explanations", "Repair every miss"]
    };
  } else {
    const weakest = getWeakestDomain();
    recommendation = {
      title: `Repair ${weakest.short}`,
      reason: `${weakest.name} is currently your weakest measured exam domain.`,
      time: "15 min",
      jump: "map",
      action: "Review weak domain",
      steps: ["Review distinctions", "Drill cues", "Retest later"]
    };
  }

  $("#nextTitle").textContent = recommendation.title;
  $("#nextReason").textContent = recommendation.reason;
  $("#nextTime").textContent = recommendation.time;
  $("#nextAction").textContent = recommendation.action;
  $("#nextAction").dataset.jump = recommendation.jump;
  $("#nextSteps").innerHTML = recommendation.steps.map((step, index) => `<div class="next-step"><span>0${index + 1}</span><strong>${step}</strong></div>`).join("");
  $("#todayMessage").textContent = calculateReadiness() < 40 ? "Build a base, then prove recall with short decisions." : "Keep converting familiar ideas into answers you can defend.";
  updateReadiness();
}

function getWeakestDomain() {
  if (!state.progress.bestExam || !state.progress.bestExam.byDomain) return domains[2];
  return domains.reduce((weakest, domain) => {
    const current = state.progress.bestExam.byDomain[domain.id];
    const weak = state.progress.bestExam.byDomain[weakest.id];
    const currentRatio = current ? current.correct / current.total : 0;
    const weakRatio = weak ? weak.correct / weak.total : 0;
    return currentRatio < weakRatio ? domain : weakest;
  }, domains[0]);
}

function renderWeightTrack() {
  $("#weightTrack").innerHTML = domains.map((domain) => `
    <button class="weight-block${state.selectedDomain === domain.id ? " is-selected" : ""}" type="button" data-domain="${domain.id}" style="--domain-color:${domain.color};flex:${domain.weight}" aria-pressed="${state.selectedDomain === domain.id}">
      <strong>${domain.weight}%</strong><span>D${domain.id.slice(1)} ${domain.name}</span>
    </button>
  `).join("");
  renderDomainBrief();
}

function renderDomainBrief() {
  const domain = domainById(state.selectedDomain);
  $("#domainBrief").innerHTML = `<strong>${domain.name}</strong><p>${domain.summary}</p><span>Approx. ${Math.round(65 * domain.weight / 100)} of 65</span>`;
  $$(".weight-block").forEach((button) => {
    const active = button.dataset.domain === domain.id;
    button.classList.toggle("is-selected", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function renderPath() {
  const done = new Set(state.progress.pathDone);
  $("#pathPercent").textContent = `${Math.round(done.size / 15 * 100)}%`;
  $("#daySwitcher").innerHTML = studyDays.map((day, index) => {
    const dayDone = day.tasks.filter((task, taskIndex) => done.has(`d${index + 1}t${taskIndex + 1}`)).length;
    return `<button class="day-tab${index === state.selectedDay ? " is-active" : ""}" type="button" role="tab" aria-selected="${index === state.selectedDay}" data-day="${index}"><span>${day.label} / ${dayDone} of 5 done</span><strong>${day.title}</strong></button>`;
  }).join("");
  renderDaySheet();
}

function renderDaySheet() {
  const day = studyDays[state.selectedDay];
  const done = new Set(state.progress.pathDone);
  $("#daySheet").style.setProperty("--day-color", day.color);
  $("#daySheet").innerHTML = `
    <div class="day-overview">
      <p class="label">${day.label}</p>
      <h3>${day.title}</h3>
      <p>${day.goal}</p>
      <dl class="day-focus">
        <dt>Primary focus</dt><dd>${day.focus}</dd>
        <dt>End-of-day checkpoint</dt><dd>${day.checkpoint}</dd>
      </dl>
    </div>
    <div class="task-list">
      ${day.tasks.map((task, index) => {
        const id = `d${state.selectedDay + 1}t${index + 1}`;
        const checked = done.has(id);
        return `<label class="task-row${checked ? " is-done" : ""}"><input type="checkbox" data-task="${id}" ${checked ? "checked" : ""} /><span class="task-copy"><strong>${task[0]}</strong><span>${task[1]}</span></span><time>${task[2]}</time></label>`;
      }).join("")}
    </div>`;
}

function renderDomainMap() {
  $("#domainIndex").innerHTML = domains.map((domain, index) => `
    <button class="domain-index-button${state.selectedDomain === domain.id ? " is-active" : ""}" type="button" data-map-domain="${domain.id}" style="--domain-color:${domain.color}">
      <span class="domain-number">${index + 1}</span><strong>${domain.name}</strong><small>${domain.weight}%</small>
    </button>`).join("");
  renderDomainSheet();
}

function renderDomainSheet() {
  const domain = domainById(state.selectedDomain);
  const sheet = $("#domainSheet");
  sheet.style.setProperty("--domain-color", domain.color);
  sheet.innerHTML = `
    <div class="domain-sheet__header"><div><p class="label">${domain.short}</p><h3>${domain.name}</h3></div><span class="domain-weight-large">${domain.weight}%</span></div>
    <p class="domain-summary">${domain.summary}</p>
    <div class="concept-columns">${domain.concepts.map(([name, copy]) => `<div class="concept-item"><strong>${name}</strong><p>${copy}</p></div>`).join("")}</div>
    <div class="exam-trap"><strong>Exam distinction</strong><p>${domain.trap}</p></div>`;
  $$(".domain-index-button").forEach((button) => button.classList.toggle("is-active", button.dataset.mapDomain === domain.id));
}

function renderServices() {
  const query = $("#serviceSearch").value.trim().toLowerCase();
  const matches = services.filter((service) => service.join(" ").toLowerCase().includes(query));
  $("#serviceList").innerHTML = matches.map(([name, use, cue]) => `<article class="service-row"><h4>${name}</h4><p>${use}<small>${cue}</small></p></article>`).join("");
  $("#serviceEmpty").hidden = matches.length > 0;
}

function renderLabFilters() {
  const filters = [{ id: "all", label: "All domains" }, ...domains.map((domain, index) => ({ id: domain.id, label: `D${index + 1}` }))];
  $("#labFilter").innerHTML = filters.map((filter) => `<button class="segment-button${state.labFilter === filter.id ? " is-active" : ""}" type="button" data-lab-filter="${filter.id}" aria-pressed="${state.labFilter === filter.id}">${filter.label}</button>`).join("");
}

function filteredScenarios() {
  return scenarios.filter((scenario) => state.labFilter === "all" || scenario.domain === state.labFilter);
}

function renderLab() {
  renderLabFilters();
  const entries = Object.values(state.progress.scenarioAnswers);
  const correct = entries.filter((item) => item.correct).length;
  $("#labAccuracy").textContent = entries.length ? `${Math.round(correct / entries.length * 100)}%` : "--";
  const list = filteredScenarios();
  if (state.labIndex >= list.length) state.labIndex = 0;
  const scenario = list[state.labIndex];
  const domain = domainById(scenario.domain);
  const saved = state.progress.scenarioAnswers[scenario.id];
  $("#drillDomain").textContent = `${domain.short} / ${domain.weight}%`;
  $("#drillPosition").textContent = `${state.labIndex + 1} of ${list.length}`;
  $("#drillPrompt").textContent = scenario.prompt;
  $("#drillInstruction").textContent = scenario.instruction;
  $("#drillAnswers").innerHTML = scenario.answers.map((answer, index) => {
    let className = "answer-button";
    if (saved && index === scenario.correct) className += " is-correct";
    if (saved && index === saved.selected && !saved.correct) className += " is-wrong";
    return `<button class="${className}" type="button" data-drill-answer="${index}" ${saved ? "disabled" : ""}><span class="answer-marker">${String.fromCharCode(65 + index)}</span><span>${answer}</span></button>`;
  }).join("");
  const rationale = $("#drillRationale");
  rationale.hidden = !saved;
  rationale.classList.toggle("is-wrong", saved && !saved.correct);
  rationale.innerHTML = saved ? `<strong>${saved.correct ? "Correct call." : "Review the cue."}</strong><p>${scenario.rationale}</p><p class="contrast"><strong>Why the distractor loses:</strong> ${scenario.contrast}</p>` : "";
  $("#previousDrill").disabled = list.length <= 1;
  $("#nextDrill").textContent = state.labIndex === list.length - 1 ? "Back to first" : "Next scenario";
}

function selectDrillAnswer(index) {
  const scenario = filteredScenarios()[state.labIndex];
  const correct = index === scenario.correct;
  state.progress.scenarioAnswers[scenario.id] = { selected: index, correct };
  saveProgress();
  renderLab();
  renderToday();
  showToast(correct ? "Correct. Keep the cue." : "Logged for review. Read the contrast.");
}

function filteredCards() {
  const ordered = state.cardOrder.map((id) => flashcards.find((card) => card.id === id)).filter(Boolean);
  if (state.cardFilter === "all") return ordered;
  if (state.cardFilter === "work") return ordered.filter((card) => state.progress.cardStatus[card.id] !== "retained");
  return ordered.filter((card) => card.domain === state.cardFilter);
}

function renderCardFilters() {
  const filters = [{ id: "all", label: "All 30" }, { id: "work", label: "Needs work" }, ...domains.map((domain, index) => ({ id: domain.id, label: `D${index + 1}` }))];
  $("#cardFilter").innerHTML = filters.map((filter) => `<button class="segment-button${state.cardFilter === filter.id ? " is-active" : ""}" type="button" data-card-filter="${filter.id}" aria-pressed="${state.cardFilter === filter.id}">${filter.label}</button>`).join("");
}

function renderCard() {
  renderCardFilters();
  let list = filteredCards();
  if (!list.length) {
    state.cardFilter = "all";
    list = filteredCards();
    showToast("That deck is clear. Showing all cards.");
    renderCardFilters();
  }
  if (state.cardIndex >= list.length) state.cardIndex = 0;
  const card = list[state.cardIndex];
  const domain = domainById(card.domain);
  const retained = Object.values(state.progress.cardStatus).filter((value) => value === "retained").length;
  const needsWork = Object.values(state.progress.cardStatus).filter((value) => value === "work").length;
  $("#flashcard").style.setProperty("--card-color", domain.color);
  $("#cardDomain").textContent = `${domain.short} / ${domain.name}`;
  $("#cardCount").textContent = `${state.cardIndex + 1} / ${list.length}`;
  $("#cardPrompt").textContent = card.prompt;
  $("#cardPrompt").hidden = state.cardRevealed;
  $("#cardAnswer").textContent = card.answer;
  $("#cardAnswer").hidden = !state.cardRevealed;
  $("#cardReveal").textContent = state.cardRevealed ? "Show prompt" : "Show answer";
  $("#cardRetained").textContent = String(retained);
  $("#deckProgressBar").style.width = `${Math.round(retained / flashcards.length * 100)}%`;
  $("#deckSummary").textContent = `${retained} retained / ${needsWork} marked for review / ${flashcards.length - retained - needsWork} unmarked`;
}

function moveCard(offset) {
  const list = filteredCards();
  state.cardIndex = (state.cardIndex + offset + list.length) % list.length;
  state.cardRevealed = false;
  renderCard();
}

function markCard(status) {
  const card = filteredCards()[state.cardIndex];
  state.progress.cardStatus[card.id] = status;
  saveProgress();
  renderToday();
  if (state.cardFilter === "work" && status === "retained") {
    state.cardIndex = Math.min(state.cardIndex, Math.max(filteredCards().length - 1, 0));
  } else {
    moveCard(1);
    return;
  }
  state.cardRevealed = false;
  renderCard();
}

function bankFilterDefinitions() {
  const meta = testBankPayload.meta;
  return [
    { id: "all", label: `All ${meta.total}` },
    { id: "imported", label: `Imported ${meta.imported}` },
    { id: "verified", label: `Verified ${meta.verified}` },
    { id: "needs-review", label: `Needs review ${meta.needsReview}` }
  ].filter((filter) => filter.id === "all" || !filter.label.endsWith(" 0"));
}

function filteredBankQuestions() {
  const query = $("#bankSearch").value.trim().toLowerCase();
  return testBankQuestions.filter((question) => {
    const statusMatch = state.bankFilter === "all" || question.status === state.bankFilter;
    if (!statusMatch) return false;
    if (!query) return true;
    const searchable = [
      String(question.number),
      question.prompt,
      question.answerText,
      question.explanation,
      question.verdict,
      ...question.options.map((option) => option.text)
    ].join(" ").toLowerCase();
    return searchable.includes(query);
  });
}

function renderBankFilters() {
  $("#bankFilter").innerHTML = bankFilterDefinitions().map((filter) => `
    <button class="segment-button${state.bankFilter === filter.id ? " is-active" : ""}" type="button" data-bank-filter="${filter.id}" aria-pressed="${state.bankFilter === filter.id}">${filter.label}</button>
  `).join("");
}

function bankHasSelectableAnswer(question) {
  const optionLabels = new Set(question.options.map((option) => option.label));
  return question.answers.length > 0 && question.answers.every((answer) => optionLabels.has(answer));
}

function resetBankAnswerState() {
  state.bankRevealed = false;
  state.bankSelection = [];
  state.bankSubmitted = false;
}

function sameBankAnswers(selected, expected) {
  return selected.length === expected.length && selected.every((answer) => expected.includes(answer));
}

function renderBank() {
  const meta = testBankPayload.meta;
  $("#bankRecoveredTotal").textContent = String(meta.total);
  $("#bankDisclaimer").textContent = meta.disclaimer;
  $("#bankReviewedCount").textContent = String(state.progress.bankReviewed.length);
  renderBankFilters();

  const questions = filteredBankQuestions();
  if (state.bankIndex >= questions.length) state.bankIndex = 0;
  $("#bankMatchCount").textContent = `${questions.length} ${questions.length === 1 ? "match" : "matches"}`;
  $("#bankEmpty").hidden = questions.length > 0;

  const list = $("#bankList");
  list.innerHTML = "";
  const fragment = document.createDocumentFragment();
  const reviewed = new Set(state.progress.bankReviewed);
  questions.forEach((question, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `bank-list-button${index === state.bankIndex ? " is-active" : ""}${reviewed.has(question.id) ? " is-reviewed" : ""}`;
    button.dataset.bankId = question.id;
    button.setAttribute("aria-current", index === state.bankIndex ? "true" : "false");

    const number = document.createElement("span");
    number.className = "bank-list-number";
    number.textContent = `Q${question.number}`;
    const copy = document.createElement("span");
    copy.className = "bank-list-copy";
    copy.textContent = question.prompt || "Question text needs source-PDF review.";
    const dot = document.createElement("span");
    dot.className = `quality-dot quality-dot--${question.status}`;
    dot.setAttribute("aria-label", question.verdict);
    button.append(number, copy, dot);
    fragment.appendChild(button);
  });
  list.appendChild(fragment);

  const detail = $("#bankQuestion");
  if (!questions.length) {
    detail.hidden = true;
    return;
  }
  detail.hidden = false;
  const question = questions[state.bankIndex];
  $("#bankQuestionNumber").textContent = `Question ${question.number}${question.format ? ` · ${question.format}` : ""}`;
  const verdict = $("#bankVerdict");
  verdict.textContent = question.verdict;
  verdict.className = `quality-badge quality-badge--${question.status}`;
  $("#bankPrompt").textContent = question.prompt || "Question text needs source-PDF review.";
  const hasSelectableAnswer = bankHasSelectableAnswer(question);
  const isMultipleAnswer = question.answers.length > 1 && hasSelectableAnswer;
  const selection = new Set(state.bankSelection);
  const selectionHint = $("#bankSelectionHint");
  selectionHint.textContent = hasSelectableAnswer
    ? isMultipleAnswer
      ? "Select all answers that apply, then submit."
      : "Select one answer, then submit."
    : "Answer checking is unavailable for this item. Use Reveal answer & explanation.";

  const options = $("#bankOptions");
  options.innerHTML = "";
  if (question.options.length) {
    question.options.forEach((option) => {
      const isSelected = selection.has(option.label);
      const isAnswer = question.answers.includes(option.label);
      const row = document.createElement("button");
      row.type = "button";
      row.dataset.bankOption = option.label;
      row.className = [
        "bank-option",
        isSelected ? "is-selected" : "",
        (state.bankRevealed || state.bankSubmitted) && isAnswer ? "is-answer" : "",
        state.bankSubmitted && isSelected && !isAnswer ? "is-wrong" : ""
      ].filter(Boolean).join(" ");
      row.setAttribute("aria-pressed", String(isSelected));
      row.setAttribute("aria-describedby", "bankSelectionHint");
      row.disabled = state.bankRevealed || state.bankSubmitted || !hasSelectableAnswer;
      const letter = document.createElement("span");
      letter.className = "bank-option__letter";
      letter.textContent = option.label;
      const text = document.createElement("span");
      text.textContent = option.text;
      row.append(letter, text);
      options.appendChild(row);
    });
  } else {
    const missing = document.createElement("p");
    missing.className = "empty-state";
    missing.textContent = question.format
      ? "This matching or ordering item was image-based in the PDF. Its answer mapping has been recovered and verified below."
      : "Answer options could not be reliably recovered from the PDF text layer.";
    options.appendChild(missing);
  }

  const response = $("#bankResponse");
  response.hidden = !state.bankSubmitted && !state.bankRevealed;
  response.className = "bank-response";
  if (state.bankSubmitted) {
    const isCorrect = sameBankAnswers(state.bankSelection, question.answers);
    response.classList.add(isCorrect ? "is-correct" : "is-wrong");
    response.textContent = isCorrect
      ? "Correct. Your selection matches the answer key."
      : `Not quite. The answer key is ${question.answers.join(", ")}.`;
  } else if (state.bankRevealed) {
    response.classList.add("is-revealed");
    response.textContent = "Answer revealed. Review the explanation below.";
  }

  $("#bankAnswerPanel").hidden = !state.bankRevealed;
  const answerLetters = question.answers.join(", ");
  $("#bankAnswer").textContent = question.format
    ? question.answerText
    : answerLetters
    ? `${answerLetters}${question.answerText ? ` - ${question.answerText}` : ""}`
    : "Answer key not recovered - verify in the source PDF.";
  $("#bankExplanation").textContent = question.explanation || "No explanation was recoverable for this question.";
  const flags = $("#bankFlags");
  flags.hidden = question.flags.length === 0;
  flags.textContent = question.flags.length ? `Review flags: ${question.flags.join(" | ")}` : "";
  const sourceList = $("#bankSources");
  sourceList.innerHTML = "";
  sourceList.hidden = !question.sources.length;
  question.sources.forEach((source) => {
    const link = document.createElement("a");
    link.href = source.url;
    link.target = "_blank";
    link.rel = "noreferrer noopener";
    link.textContent = source.title;
    sourceList.appendChild(link);
  });
  $("#revealBankAnswer").textContent = state.bankRevealed ? "Hide answer & explanation" : "Reveal answer & explanation";
  const submitButton = $("#submitBankAnswer");
  submitButton.disabled = !hasSelectableAnswer || state.bankSelection.length === 0 || state.bankSubmitted || state.bankRevealed;
  submitButton.textContent = state.bankSubmitted ? "Answer submitted" : "Submit answer";

  const isReviewed = reviewed.has(question.id);
  const reviewButton = $("#markBankReviewed");
  reviewButton.textContent = isReviewed ? "Reviewed" : "Mark reviewed";
  reviewButton.setAttribute("aria-pressed", String(isReviewed));
  $("#bankPosition").textContent = `${state.bankIndex + 1} of ${questions.length}`;
  $("#previousBankQuestion").disabled = questions.length <= 1;
  $("#nextBankQuestion").disabled = questions.length <= 1;

  const activeListItem = $(".bank-list-button.is-active", list);
  if (activeListItem) activeListItem.scrollIntoView({ block: "nearest" });
}

function moveBankQuestion(offset) {
  const questions = filteredBankQuestions();
  if (!questions.length) return;
  state.bankIndex = (state.bankIndex + offset + questions.length) % questions.length;
  resetBankAnswerState();
  renderBank();
}

function selectBankOption(label) {
  const question = filteredBankQuestions()[state.bankIndex];
  if (!question || !bankHasSelectableAnswer(question) || state.bankSubmitted || state.bankRevealed) return;
  if (question.answers.length === 1) {
    state.bankSelection = [label];
  } else {
    const selection = new Set(state.bankSelection);
    if (selection.has(label)) selection.delete(label);
    else selection.add(label);
    state.bankSelection = Array.from(selection);
  }
  renderBank();
}

function submitBankAnswer() {
  const question = filteredBankQuestions()[state.bankIndex];
  if (!question || !bankHasSelectableAnswer(question)) {
    showToast("This item does not have a selectable answer key. Use Reveal answer & explanation.");
    return;
  }
  if (!state.bankSelection.length) {
    showToast("Select an answer before submitting.");
    return;
  }
  state.bankSubmitted = true;
  renderBank();
}

function toggleBankReviewed() {
  const question = filteredBankQuestions()[state.bankIndex];
  if (!question) return;
  const reviewed = new Set(state.progress.bankReviewed);
  if (reviewed.has(question.id)) reviewed.delete(question.id);
  else reviewed.add(question.id);
  state.progress.bankReviewed = Array.from(reviewed);
  saveProgress();
  renderBank();
  renderToday();
  showToast(reviewed.has(question.id) ? "Question marked reviewed." : "Question returned to review queue.");
}

function renderExamMix() {
  $("#examMix").innerHTML = examBlueprint.map((item) => {
    const domain = domainById(item.domain);
    return `<div><dt>${domain.short} · ${domain.weight}%</dt><dd>${item.count} Q</dd></div>`;
  }).join("");
}

function startExam() {
  const questions = buildWeightedQuestionSet(practiceQuestionPool);
  if (questions.length !== EXAM_QUESTION_TOTAL) {
    showToast("The reviewed bank does not contain enough questions for this practice attempt.");
    return;
  }
  state.exam = { running: true, questions, index: 0, score: 0, answers: [], answered: false, selection: [], draftSelections: {} };
  $("#examStart").hidden = true;
  $("#resultsSheet").hidden = true;
  $("#examSheet").hidden = false;
  renderExamQuestion();
}

function renderExamQuestion() {
  const item = state.exam.questions[state.exam.index];
  const domain = domainById(item.domain);
  const savedAnswer = state.exam.answers.find((answer) => answer.questionId === item.id);
  state.exam.answered = Boolean(savedAnswer);
  state.exam.selection = savedAnswer
    ? [...savedAnswer.selected]
    : [...(state.exam.draftSelections[item.id] || [])];
  $("#examPosition").textContent = `Question ${state.exam.index + 1} of ${state.exam.questions.length}`;
  $("#examScore").textContent = `${state.exam.score} correct`;
  $("#examProgressBar").style.width = `${(state.exam.index + (savedAnswer ? 1 : 0)) / state.exam.questions.length * 100}%`;
  $("#examDomain").textContent = `${domain.short} / ${domain.name}${item.number ? ` · Bank Q${item.number}` : " · Curated"}`;
  $("#examQuestion").textContent = item.prompt;
  $("#examSelectionHint").textContent = savedAnswer
    ? "Answer recorded. Review the explanation or continue navigating."
    : item.answers.length > 1
      ? `Select ${item.answers.length} answers. Feedback appears after your final choice.`
      : "Select one answer for immediate feedback.";
  $("#examRationale").hidden = true;
  $("#examRationale").innerHTML = "";
  $("#previousExamQuestion").disabled = state.exam.index === 0;
  $("#nextExamQuestion").hidden = !savedAnswer;
  $("#nextExamQuestion").textContent = state.exam.index === state.exam.questions.length - 1 ? "See results" : "Next question";
  renderExamAnswerOptions();
  if (savedAnswer) renderExamRationale(item, savedAnswer);
  else $("#examAnswers .answer-button")?.focus();
}

function renderExamAnswerOptions() {
  const item = state.exam.questions[state.exam.index];
  const container = $("#examAnswers");
  container.innerHTML = "";
  item.options.forEach((option) => {
    const selected = state.exam.selection.includes(option.label);
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.dataset.examAnswer = option.label;
    button.setAttribute("aria-pressed", String(selected));
    if (!state.exam.answered && selected) button.classList.add("is-selected");
    if (state.exam.answered && item.answers.includes(option.label)) button.classList.add("is-correct");
    if (state.exam.answered && selected && !item.answers.includes(option.label)) button.classList.add("is-wrong");
    button.disabled = state.exam.answered;

    const marker = document.createElement("span");
    marker.className = "answer-marker";
    marker.textContent = option.label;
    const text = document.createElement("span");
    text.textContent = option.text;
    button.append(marker, text);
    container.append(button);
  });
}

function selectExamAnswer(label) {
  if (state.exam.answered) return;
  const item = state.exam.questions[state.exam.index];
  if (item.answers.length === 1) {
    state.exam.selection = [label];
    state.exam.draftSelections[item.id] = [...state.exam.selection];
    gradeExamAnswer();
    return;
  }

  if (state.exam.selection.includes(label)) {
    state.exam.selection = state.exam.selection.filter((answer) => answer !== label);
  } else {
    state.exam.selection = [...state.exam.selection, label];
  }
  state.exam.draftSelections[item.id] = [...state.exam.selection];
  renderExamAnswerOptions();
  if (state.exam.selection.length === item.answers.length) gradeExamAnswer();
}

function gradeExamAnswer() {
  if (state.exam.answered) return;
  const item = state.exam.questions[state.exam.index];
  const correct = sameBankAnswers(state.exam.selection, item.answers);
  state.exam.answered = true;
  if (correct) state.exam.score += 1;
  const savedAnswer = { questionId: item.id, domain: item.domain, selected: [...state.exam.selection], correct };
  state.exam.answers.push(savedAnswer);
  renderExamAnswerOptions();
  $("#examScore").textContent = `${state.exam.score} correct`;
  $("#examProgressBar").style.width = `${(state.exam.index + 1) / state.exam.questions.length * 100}%`;
  renderExamRationale(item, savedAnswer);
  $("#nextExamQuestion").hidden = false;
  $("#nextExamQuestion").textContent = state.exam.index === state.exam.questions.length - 1 ? "See results" : "Next question";
  $("#nextExamQuestion").focus();
}

function renderExamRationale(item, savedAnswer) {
  const rationale = $("#examRationale");
  rationale.hidden = false;
  rationale.classList.toggle("is-wrong", !savedAnswer.correct);
  rationale.innerHTML = `<strong>${savedAnswer.correct ? "Correct." : `Review this one. The correct ${item.answers.length === 1 ? "answer is" : "answers are"} ${escapeHTML(item.answers.join(" and "))}.`}</strong><p>${escapeHTML(item.explanation || "No explanation is available.")}</p>`;
}

function previousExamQuestion() {
  if (!state.exam.running || state.exam.index === 0) return;
  state.exam.index -= 1;
  renderExamQuestion();
}

function nextExamQuestion() {
  if (!state.exam.answered) return;
  if (state.exam.index < state.exam.questions.length - 1) {
    state.exam.index += 1;
    renderExamQuestion();
  } else {
    finishExam();
  }
}

function finishExam() {
  const percent = Math.round(state.exam.score / state.exam.questions.length * 100);
  const byDomain = {};
  domains.forEach((domain) => {
    const answers = state.exam.answers.filter((answer) => answer.domain === domain.id);
    byDomain[domain.id] = { correct: answers.filter((answer) => answer.correct).length, total: answers.length };
  });
  state.progress.examAttempts += 1;
  if (!state.progress.bestExam || percent > state.progress.bestExam.percent) {
    state.progress.bestExam = { percent, score: state.exam.score, byDomain };
  }
  saveProgress();
  state.exam.running = false;
  $("#examSheet").hidden = true;
  renderResults(percent, byDomain);
  renderToday();
}

function renderResults(percent, byDomain) {
  const misses = state.exam.answers.filter((answer) => !answer.correct);
  const weakest = domains.reduce((weak, domain) => {
    const ratio = byDomain[domain.id].correct / byDomain[domain.id].total;
    const weakRatio = byDomain[weak.id].correct / byDomain[weak.id].total;
    return ratio < weakRatio ? domain : weak;
  }, domains[0]);
  const resultMessage = percent >= 80 ? "Strong practice result. Repair the misses, then retest for consistency." : percent >= 68 ? "A useful middle result. Your misses now define the next study block." : "Good diagnostic data. Rebuild the weakest distinctions before another attempt.";
  const sheet = $("#resultsSheet");
  sheet.hidden = false;
  sheet.innerHTML = `
    <div class="result-hero"><div class="result-score">${percent}%</div><div><p class="label">Attempt complete</p><h3>${state.exam.score} of ${state.exam.questions.length} correct</h3><p>${resultMessage}</p><p><strong>Next focus:</strong> ${weakest.name}</p></div></div>
    <div class="domain-results">${domains.map((domain) => `<div class="domain-result" style="--domain-color:${domain.color}"><strong>${byDomain[domain.id].correct}/${byDomain[domain.id].total}</strong><span>${domain.name}</span></div>`).join("")}</div>
    <div class="review-list"><h4>${misses.length ? "Repair these decisions" : "No misses in this attempt"}</h4>${misses.map((miss) => {
      const question = state.exam.questions.find((item) => item.id === miss.questionId);
      const selectedText = question.options.filter((option) => miss.selected.includes(option.label)).map((option) => option.text).join("; ");
      const correctText = question.options.filter((option) => question.answers.includes(option.label)).map((option) => option.text).join("; ");
      return `<div class="review-row"><strong>${escapeHTML(question.prompt)}</strong><p><b>Your answer:</b> ${escapeHTML(selectedText)}<br><b>Correct answer:</b> ${escapeHTML(correctText)}<br>${escapeHTML(question.explanation || "No explanation is available.")}</p></div>`;
    }).join("")}</div>
    <button class="button button--primary" type="button" id="resultsRestart">Take another attempt</button>`;
  $("#resultsRestart").addEventListener("click", startExam);
}

function resetExamView() {
  state.exam = { running: false, questions: [], index: 0, score: 0, answers: [], answered: false, selection: [], draftSelections: {} };
  $("#examStart").hidden = false;
  $("#examSheet").hidden = true;
  $("#resultsSheet").hidden = true;
}

function escapeHTML(value) {
  return String(value || "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  })[character]);
}

function renderMockMix() {
  $("#mockMix").innerHTML = examBlueprint.map((item) => {
    const domain = domainById(item.domain);
    return `<div><dt>${domain.short} · ${domain.weight}%</dt><dd>${item.count} Q</dd></div>`;
  }).join("");
}

function buildWeightedQuestionSet(questionPool = reviewedExamQuestionPool) {
  const selected = [];
  for (const item of examBlueprint) {
    const candidates = questionPool.filter((question) => question.domain === item.domain);
    if (candidates.length < item.count) return [];
    selected.push(...shuffleItems(candidates).slice(0, item.count));
  }
  return shuffleItems(selected);
}

function mockSecondsRemaining() {
  if (!state.mock.deadline) return MOCK_EXAM_SECONDS;
  return Math.max(0, Math.ceil((state.mock.deadline - Date.now()) / 1000));
}

function formatMockTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(totalSeconds % 3600 / 60);
  const seconds = totalSeconds % 60;
  return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateMockTimer() {
  if (!state.mock.running) return;
  const remaining = mockSecondsRemaining();
  const timer = $("#mockTimer");
  timer.textContent = formatMockTime(remaining);
  timer.classList.toggle("is-urgent", remaining <= 300);
  if (remaining === 0) finishMockExam(true);
}

function startMockTimer() {
  clearInterval(state.mock.timerId);
  updateMockTimer();
  state.mock.timerId = window.setInterval(updateMockTimer, 1000);
}

function startMockExam() {
  const questions = buildWeightedQuestionSet();
  if (questions.length !== EXAM_QUESTION_TOTAL) {
    showToast("The reviewed bank does not contain enough domain-tagged questions for this mock.");
    return;
  }

  clearInterval(state.mock.timerId);
  state.mock = {
    running: true,
    questions,
    index: 0,
    selections: {},
    deadline: Date.now() + MOCK_EXAM_SECONDS * 1000,
    timerId: null
  };
  $("#mockStart").hidden = true;
  $("#mockResults").hidden = true;
  $("#mockWorkspace").hidden = false;
  startMockTimer();
  renderMockQuestion();
}

function mockQuestionIsComplete(question) {
  return (state.mock.selections[question.id] || []).length === question.answers.length;
}

function renderMockNavigator() {
  const grid = $("#mockQuestionGrid");
  grid.innerHTML = state.mock.questions.map((question, index) => {
    const current = index === state.mock.index;
    const complete = mockQuestionIsComplete(question);
    return `<button class="mock-question-number${current ? " is-current" : ""}${complete ? " is-answered" : ""}" type="button" data-mock-index="${index}" data-mock-domain="${question.domain}" aria-label="Question ${index + 1}${complete ? ", answered" : ", unanswered"}"${current ? " aria-current=\"step\"" : ""}>${index + 1}</button>`;
  }).join("");
}

function renderMockQuestion() {
  if (!state.mock.running) return;
  const question = state.mock.questions[state.mock.index];
  const domain = domainById(question.domain);
  const selected = state.mock.selections[question.id] || [];
  const complete = state.mock.questions.filter(mockQuestionIsComplete).length;

  $("#mockPosition").textContent = `Question ${state.mock.index + 1} of ${state.mock.questions.length}`;
  $("#mockAnswered").textContent = `${complete} answered · ${state.mock.questions.length - complete} remaining`;
  $("#mockDomain").textContent = `${domain.short} / ${domain.name} · Bank Q${question.number}`;
  $("#mockQuestion").textContent = question.prompt;
  $("#mockSelectionHint").textContent = question.answers.length > 1
    ? `Select ${question.answers.length} answers. Your choices are not scored until submission.`
    : "Select one answer. Your choice is not scored until submission.";

  const answerContainer = $("#mockAnswers");
  answerContainer.innerHTML = "";
  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.className = `answer-button${selected.includes(option.label) ? " is-selected" : ""}`;
    button.type = "button";
    button.dataset.mockAnswer = option.label;
    button.setAttribute("aria-pressed", String(selected.includes(option.label)));

    const marker = document.createElement("span");
    marker.className = "answer-marker";
    marker.textContent = option.label;
    const text = document.createElement("span");
    text.textContent = option.text;
    button.append(marker, text);
    answerContainer.append(button);
  });

  $("#previousMockQuestion").disabled = state.mock.index === 0;
  $("#nextMockQuestion").textContent = state.mock.index === state.mock.questions.length - 1 ? "Submit mock exam" : "Next question";
  renderMockNavigator();
}

function selectMockAnswer(label) {
  if (!state.mock.running) return;
  const question = state.mock.questions[state.mock.index];
  const selected = [...(state.mock.selections[question.id] || [])];

  if (question.answers.length === 1) {
    state.mock.selections[question.id] = [label];
  } else if (selected.includes(label)) {
    state.mock.selections[question.id] = selected.filter((item) => item !== label);
  } else if (selected.length < question.answers.length) {
    state.mock.selections[question.id] = [...selected, label];
  } else {
    showToast(`Select no more than ${question.answers.length} answers.`);
    return;
  }

  renderMockQuestion();
}

function moveMockQuestion(offset) {
  if (!state.mock.running) return;
  if (offset > 0 && state.mock.index === state.mock.questions.length - 1) {
    submitMockExam();
    return;
  }
  state.mock.index = Math.max(0, Math.min(state.mock.questions.length - 1, state.mock.index + offset));
  renderMockQuestion();
  $("#mockAnswers .answer-button")?.focus();
}

function mockQuestionIsCorrect(question) {
  const selected = [...(state.mock.selections[question.id] || [])].sort();
  const correct = [...question.answers].sort();
  return selected.length === correct.length && selected.every((answer, index) => answer === correct[index]);
}

function submitMockExam() {
  if (!state.mock.running) return;
  const unanswered = state.mock.questions.filter((question) => !mockQuestionIsComplete(question)).length;
  const detail = unanswered ? ` ${unanswered} questions are incomplete.` : "";
  if (!window.confirm(`Submit this mock exam?${detail}`)) return;
  finishMockExam(false);
}

function finishMockExam(timedOut) {
  if (!state.mock.running) return;
  clearInterval(state.mock.timerId);
  const correct = state.mock.questions.filter(mockQuestionIsCorrect).length;
  const percent = Math.round(correct / state.mock.questions.length * 100);
  const byDomain = {};

  domains.forEach((domain) => {
    const questions = state.mock.questions.filter((question) => question.domain === domain.id);
    byDomain[domain.id] = {
      correct: questions.filter(mockQuestionIsCorrect).length,
      total: questions.length
    };
  });

  state.progress.mockAttempts += 1;
  if (!state.progress.bestMock || percent > state.progress.bestMock.percent) {
    state.progress.bestMock = { percent, score: correct, byDomain };
  }
  saveProgress();
  state.mock.running = false;
  $("#mockWorkspace").hidden = true;
  renderMockResults({ correct, percent, byDomain, timedOut });
  renderToday();
  if (timedOut) showToast("Time expired. Your completed answers were submitted.");
}

function renderMockResults({ correct, percent, byDomain, timedOut }) {
  const unanswered = state.mock.questions.filter((question) => !mockQuestionIsComplete(question)).length;
  const misses = state.mock.questions.filter((question) => !mockQuestionIsCorrect(question));
  const weakest = domains.reduce((weak, domain) => {
    const ratio = byDomain[domain.id].correct / byDomain[domain.id].total;
    const weakRatio = byDomain[weak.id].correct / byDomain[weak.id].total;
    return ratio < weakRatio ? domain : weak;
  }, domains[0]);
  const sheet = $("#mockResults");
  sheet.hidden = false;
  sheet.innerHTML = `
    <div class="result-hero">
      <div class="result-score">${percent}%</div>
      <div>
        <p class="label">${timedOut ? "Time expired" : "Mock submitted"}</p>
        <h3>${correct} of ${state.mock.questions.length} correct</h3>
        <p>${unanswered ? `${unanswered} incomplete ${unanswered === 1 ? "question was" : "questions were"} scored as incorrect. ` : ""}This raw percentage is diagnostic and is not an AWS scaled score.</p>
        <p><strong>Next focus:</strong> ${escapeHTML(weakest.name)}</p>
      </div>
    </div>
    <div class="domain-results">${domains.map((domain) => `<div class="domain-result" style="--domain-color:${domain.color}"><strong>${byDomain[domain.id].correct}/${byDomain[domain.id].total}</strong><span>${domain.name}</span></div>`).join("")}</div>
    <div class="review-list">
      <h4>${misses.length ? `Review ${misses.length} missed or incomplete decisions` : "No misses in this attempt"}</h4>
      ${misses.map((question) => {
        const selected = state.mock.selections[question.id] || [];
        const selectedText = question.options.filter((option) => selected.includes(option.label)).map((option) => `${option.label}. ${option.text}`).join("; ") || "No complete answer";
        const correctText = question.options.filter((option) => question.answers.includes(option.label)).map((option) => `${option.label}. ${option.text}`).join("; ");
        return `<div class="review-row"><strong>Bank Q${question.number}: ${escapeHTML(question.prompt)}</strong><p><b>Your answer:</b> ${escapeHTML(selectedText)}<br><b>Correct answer:</b> ${escapeHTML(correctText)}<br>${escapeHTML(question.explanation || "No explanation is available.")}</p></div>`;
      }).join("")}
    </div>
    <button class="button button--primary" type="button" id="mockResultsRestart">Take another mock</button>`;
  $("#mockResultsRestart").addEventListener("click", startMockExam);
}

function resetMockView(force = false) {
  if (state.mock.running && !force && !window.confirm("End this mock exam and discard the current answers?")) return;
  clearInterval(state.mock.timerId);
  state.mock = {
    running: false,
    questions: [],
    index: 0,
    selections: {},
    deadline: null,
    timerId: null
  };
  $("#mockStart").hidden = false;
  $("#mockWorkspace").hidden = true;
  $("#mockResults").hidden = true;
  $("#mockTimer").textContent = formatMockTime(MOCK_EXAM_SECONDS);
  $("#mockTimer").classList.remove("is-urgent");
}

function bindEvents() {
  $$(".nav-tab").forEach((button) => button.addEventListener("click", () => switchView(button.dataset.view)));
  document.addEventListener("click", (event) => {
    const jump = event.target.closest("[data-jump]");
    if (jump) switchView(jump.dataset.jump);
  });

  $("#weightTrack").addEventListener("click", (event) => {
    const button = event.target.closest("[data-domain]");
    if (!button) return;
    state.selectedDomain = button.dataset.domain;
    renderDomainBrief();
  });

  $("#quickCheckActions").addEventListener("click", (event) => {
    const button = event.target.closest("[data-quick]");
    if (!button || state.progress.quickDone) return;
    const correct = button.dataset.quick === "rag";
    state.progress.quickDone = true;
    saveProgress();
    button.classList.add(correct ? "is-correct" : "is-wrong");
    const right = $("[data-quick='rag']");
    right.classList.add("is-correct");
    $$("[data-quick]").forEach((item) => item.disabled = true);
    $("#quickFeedback").textContent = "RAG. The problem is current knowledge. Fine-tuning is better suited to behavior or task adaptation.";
  });

  $("#resetProgress").addEventListener("click", () => {
    if (!window.confirm("Reset the study path, drills, cards, and exam history?")) return;
    state.progress = defaultProgress();
    saveProgress();
    state.cardFilter = "all";
    state.cardIndex = 0;
    state.cardRevealed = false;
    state.bankFilter = "all";
    state.bankIndex = 0;
    resetBankAnswerState();
    renderAll();
    resetExamView();
    resetMockView(true);
    showToast("Progress reset.");
  });

  $("#daySwitcher").addEventListener("click", (event) => {
    const button = event.target.closest("[data-day]");
    if (!button) return;
    state.selectedDay = Number(button.dataset.day);
    renderPath();
  });

  $("#daySheet").addEventListener("change", (event) => {
    const checkbox = event.target.closest("[data-task]");
    if (!checkbox) return;
    const done = new Set(state.progress.pathDone);
    if (checkbox.checked) done.add(checkbox.dataset.task);
    else done.delete(checkbox.dataset.task);
    state.progress.pathDone = Array.from(done);
    saveProgress();
    renderPath();
    renderToday();
  });

  $("#domainIndex").addEventListener("click", (event) => {
    const button = event.target.closest("[data-map-domain]");
    if (!button) return;
    state.selectedDomain = button.dataset.mapDomain;
    renderDomainSheet();
  });

  $("#serviceSearch").addEventListener("input", renderServices);

  $("#labFilter").addEventListener("click", (event) => {
    const button = event.target.closest("[data-lab-filter]");
    if (!button) return;
    state.labFilter = button.dataset.labFilter;
    state.labIndex = 0;
    renderLab();
  });
  $("#drillAnswers").addEventListener("click", (event) => {
    const button = event.target.closest("[data-drill-answer]");
    if (button) selectDrillAnswer(Number(button.dataset.drillAnswer));
  });
  $("#previousDrill").addEventListener("click", () => {
    const list = filteredScenarios();
    state.labIndex = (state.labIndex - 1 + list.length) % list.length;
    renderLab();
  });
  $("#nextDrill").addEventListener("click", () => {
    const list = filteredScenarios();
    state.labIndex = (state.labIndex + 1) % list.length;
    renderLab();
  });
  $("#resetLab").addEventListener("click", () => {
    state.progress.scenarioAnswers = {};
    saveProgress();
    state.labIndex = 0;
    renderLab();
    renderToday();
    showToast("Scenario history reset.");
  });

  $("#cardFilter").addEventListener("click", (event) => {
    const button = event.target.closest("[data-card-filter]");
    if (!button) return;
    state.cardFilter = button.dataset.cardFilter;
    state.cardIndex = 0;
    state.cardRevealed = false;
    renderCard();
  });
  $("#flashcard").addEventListener("click", () => {
    state.cardRevealed = !state.cardRevealed;
    renderCard();
  });
  $("#previousCard").addEventListener("click", () => moveCard(-1));
  $("#nextCard").addEventListener("click", () => moveCard(1));
  $("#needsWorkCard").addEventListener("click", () => markCard("work"));
  $("#retainCard").addEventListener("click", () => markCard("retained"));
  $("#shuffleCards").addEventListener("click", () => {
    state.cardOrder = [...state.cardOrder].sort(() => Math.random() - 0.5);
    state.cardIndex = 0;
    state.cardRevealed = false;
    renderCard();
    showToast("Deck shuffled.");
  });

  $("#bankSearch").addEventListener("input", () => {
    state.bankIndex = 0;
    resetBankAnswerState();
    renderBank();
  });
  $("#bankFilter").addEventListener("click", (event) => {
    const button = event.target.closest("[data-bank-filter]");
    if (!button) return;
    state.bankFilter = button.dataset.bankFilter;
    state.bankIndex = 0;
    resetBankAnswerState();
    renderBank();
  });
  $("#bankList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-bank-id]");
    if (!button) return;
    const questions = filteredBankQuestions();
    const index = questions.findIndex((question) => question.id === button.dataset.bankId);
    if (index < 0) return;
    state.bankIndex = index;
    resetBankAnswerState();
    renderBank();
  });
  $("#bankOptions").addEventListener("click", (event) => {
    const button = event.target.closest("[data-bank-option]");
    if (button) selectBankOption(button.dataset.bankOption);
  });
  $("#submitBankAnswer").addEventListener("click", submitBankAnswer);
  $("#revealBankAnswer").addEventListener("click", () => {
    state.bankRevealed = !state.bankRevealed;
    renderBank();
  });
  $("#markBankReviewed").addEventListener("click", toggleBankReviewed);
  $("#previousBankQuestion").addEventListener("click", () => moveBankQuestion(-1));
  $("#nextBankQuestion").addEventListener("click", () => moveBankQuestion(1));

  $("#startExam").addEventListener("click", startExam);
  $("#restartExam").addEventListener("click", resetExamView);
  $("#examAnswers").addEventListener("click", (event) => {
    const button = event.target.closest("[data-exam-answer]");
    if (button) selectExamAnswer(button.dataset.examAnswer);
  });
  $("#previousExamQuestion").addEventListener("click", previousExamQuestion);
  $("#nextExamQuestion").addEventListener("click", nextExamQuestion);

  $("#startMock").addEventListener("click", startMockExam);
  $("#restartMock").addEventListener("click", () => resetMockView(false));
  $("#submitMock").addEventListener("click", submitMockExam);
  $("#mockAnswers").addEventListener("click", (event) => {
    const button = event.target.closest("[data-mock-answer]");
    if (button) selectMockAnswer(button.dataset.mockAnswer);
  });
  $("#mockQuestionGrid").addEventListener("click", (event) => {
    const button = event.target.closest("[data-mock-index]");
    if (!button || !state.mock.running) return;
    state.mock.index = Number(button.dataset.mockIndex);
    renderMockQuestion();
  });
  $("#previousMockQuestion").addEventListener("click", () => moveMockQuestion(-1));
  $("#nextMockQuestion").addEventListener("click", () => moveMockQuestion(1));

  document.addEventListener("keydown", (event) => {
    const activeView = $(".view.is-active");
    if (!activeView || /INPUT|TEXTAREA|SELECT/.test(event.target.tagName)) return;
    if (activeView.id === "bank") {
      if (event.key === "ArrowLeft") moveBankQuestion(-1);
      else if (event.key === "ArrowRight") moveBankQuestion(1);
      return;
    }
    if (activeView.id === "mock" && state.mock.running) {
      if (event.key === "ArrowLeft") moveMockQuestion(-1);
      else if (event.key === "ArrowRight") moveMockQuestion(1);
      return;
    }
    if (activeView.id !== "cards") return;
    if (event.code === "Space") {
      event.preventDefault();
      state.cardRevealed = !state.cardRevealed;
      renderCard();
    } else if (event.key === "ArrowLeft") moveCard(-1);
    else if (event.key === "ArrowRight") moveCard(1);
    else if (event.key === "1") markCard("work");
    else if (event.key === "2") markCard("retained");
  });
}

function restoreQuickCheck() {
  if (!state.progress.quickDone) return;
  $("[data-quick='rag']").classList.add("is-correct");
  $$("[data-quick]").forEach((item) => item.disabled = true);
  $("#quickFeedback").textContent = "RAG. The problem is current knowledge. Fine-tuning is better suited to behavior or task adaptation.";
}

function renderAll() {
  renderToday();
  renderWeightTrack();
  renderPath();
  renderDomainMap();
  renderServices();
  renderLab();
  renderCard();
  renderBank();
  renderExamMix();
  renderMockMix();
  restoreQuickCheck();
  updateReadiness();
}

function init() {
  bindEvents();
  renderAll();
  const initialView = location.hash.replace("#", "");
  switchView(document.getElementById(initialView) ? initialView : "today", false);
}

init();
