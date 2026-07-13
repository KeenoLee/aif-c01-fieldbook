"use strict";

(() => {
  const sources = {
    exam: ["AWS AIF-C01 exam guide", "https://d1.awsstatic.com/onedam/marketing-channels/website/aws/en_US/certification/approved/pdfs/docs-ai-practitioner/AWS-Certified-AI-Practitioner_Exam-Guide.pdf"],
    cloudTrail: ["CloudTrail logging for Amazon Bedrock", "https://docs.aws.amazon.com/bedrock/latest/userguide/logging-using-cloudtrail.html"],
    jumpStart: ["Deploy a SageMaker JumpStart model", "https://docs.aws.amazon.com/sagemaker/latest/dg/jumpstart-deploy.html"],
    knowledgeBases: ["How Bedrock Knowledge Bases work", "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-how-it-works.html"],
    quick: ["Generate a Quick Sight analysis with natural language", "https://docs.aws.amazon.com/quick/latest/userguide/generating-an-analysis.html"],
    inference: ["SageMaker inference hosting options", "https://docs.aws.amazon.com/sagemaker/latest/dg/hosting-faqs.html"],
    guardrails: ["Amazon Bedrock Guardrails components", "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-components.html"],
    customization: ["Amazon Bedrock model customization", "https://docs.aws.amazon.com/bedrock/latest/userguide/custom-models.html"],
    modelCards: ["Amazon SageMaker Model Cards", "https://docs.aws.amazon.com/sagemaker/latest/dg/model-cards.html"],
    canvas: ["Amazon SageMaker Canvas", "https://docs.aws.amazon.com/sagemaker/latest/dg/canvas.html"],
    groundTruth: ["SageMaker Ground Truth data labeling", "https://docs.aws.amazon.com/sagemaker/latest/dg/sms-data-labeling.html"],
    clarify: ["SageMaker Clarify model explainability", "https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-model-explainability.html"],
    responsibleAi: ["AWS responsible AI dimensions", "https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/responsible-ai.html"],
    healthScribe: ["AWS HealthScribe", "https://docs.aws.amazon.com/transcribe/latest/dg/health-scribe.html"],
    nova: ["Amazon Nova model categories", "https://docs.aws.amazon.com/nova/latest/userguide/what-is-nova.html"],
    novaReel: ["Amazon Nova Reel model card", "https://docs.aws.amazon.com/bedrock/latest/userguide/model-card-amazon-nova-reel.html"],
    stability: ["Stable Diffusion 3.5 Large on Bedrock", "https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters-diffusion-3-5-large.html"],
    s3Access: ["Configure access to Amazon S3 buckets for Amazon Bedrock", "https://docs.aws.amazon.com/bedrock/latest/userguide/s3-bucket-access.html"],
    callAnalytics: ["Analyzing call center audio with Call Analytics", "https://docs.aws.amazon.com/transcribe/latest/dg/call-analytics.html"],
    customOnDemand: ["Deploy a custom model for on-demand inference", "https://docs.aws.amazon.com/bedrock/latest/userguide/deploy-custom-model-on-demand.html"],
    glacier: ["Amazon S3 Glacier storage classes", "https://docs.aws.amazon.com/AmazonS3/latest/userguide/glacier-storage-classes.html"],
    promptAttack: ["Detect prompt attacks with Amazon Bedrock Guardrails", "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-prompt-attack.html"],
    jumpStartAccess: ["Restrict access to JumpStart gated models", "https://docs.aws.amazon.com/sagemaker/latest/dg/jumpstart-curated-hubs-gated-model-access.html"],
    cloudTrailLake: ["Working with AWS CloudTrail Lake", "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-lake.html"],
    agentEvaluation: ["Review metrics for RAG evaluations that use LLMs", "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-eval-llm-results.html"],
    sageMakerCatalog: ["Amazon SageMaker and Amazon DataZone", "https://docs.aws.amazon.com/datazone/latest/userguide/sagemaker-datazone.html"]
  };

  const refs = (...keys) => keys.map((key) => ({ title: sources[key][0], url: sources[key][1] }));
  const verified = (sourceKeys, details = {}) => ({
    status: "verified",
    verdict: "Cross-checked with current AWS sources",
    flags: [],
    sources: refs(...sourceKeys),
    ...details
  });
  const hotspot = (answerText, sourceKeys, details = {}) => verified(sourceKeys, {
    format: "matching / ordering",
    answers: ["Verified mapping"],
    answerText,
    ...details
  });

  const corrections = {
  106: verified(["exam"], {
    explanation: "ROUGE compares overlap between generated text and reference text. Among the listed metrics, it best measures how closely the rewritten output resembles the provided examples."
  }),
  96: verified(["exam"], {
    explanation: "The F1 score is the harmonic mean of precision and recall. It is useful when both false positives and false negatives matter, especially with imbalanced classes."
  }),
  92: verified(["exam"], {
    prompt: "A software company builds tools for customers. The company wants to use generative AI to increase software development productivity. Which solution meets this requirement?",
    options: [
      { label: "A", text: "Use a binary classification model to generate code reviews" },
      { label: "B", text: "Install a rule-based autocomplete tool in the company's developer tools" },
      { label: "C", text: "Install a forecasting tool to predict potential code issues" },
      { label: "D", text: "Use a generative AI code assistant to generate code from natural language" }
    ],
    explanation: "A generative AI code assistant can turn natural-language requests into code and help developers work more efficiently."
  }),
  91: verified(["modelCards"], {
    explanation: "Amazon SageMaker Model Cards provide standardized documentation for intended uses, training details, evaluation results, risk ratings, and other governance information, supporting model sharing and audits."
  }),
  88: verified(["exam"], {
    prompt: "A social media company wants to use a large language model (LLM) to summarize messages. The company has chosen several LLMs that are available on Amazon SageMaker JumpStart. The company wants to compare the toxicity of the models' outputs. Which strategy lets the company evaluate the LLMs with the LEAST operational overhead?"
  }),
  81: verified(["customization"], {
    prompt: "Which option is a benefit of continued pre-training for a foundation model (FM)?",
    explanation: "Continued pre-training adapts a foundation model by training it further on unlabeled domain data, which can improve performance on domain-relevant tasks. It is distinct from supervised fine-tuning."
  }),
  75: verified(["exam"], {
    prompt: "A company is building a chatbot to improve user experience. The company is using a large language model (LLM) from Amazon Bedrock for intent detection. The company wants to use few-shot learning to improve intent detection accuracy. Which additional data does the company need?"
  }),
  73: verified(["exam"], {
    explanation: "BERT-based models are well suited to masked-language modeling tasks because they use surrounding context to predict missing tokens."
  }),
  71: verified(["responsibleAi"], {
    options: [
      { label: "A", text: "Include fairness metrics in model evaluation" },
      { label: "B", text: "Adjust the temperature parameter without evaluating the effect" },
      { label: "C", text: "Modify the training data to mitigate bias" },
      { label: "D", text: "Maximize model complexity without testing generalization" },
      { label: "E", text: "Apply prompt engineering without any safety evaluation" }
    ],
    explanation: "Fairness metrics and bias mitigation in training data directly address responsible development. The other choices omit evaluation or introduce unrelated changes."
  }),
  66: verified(["s3Access"], {
    explanation: "Create a separate Amazon Bedrock service role for each team and restrict each role to that team's customer data. This enforces team-specific access through IAM rather than relying on a customer name supplied in a request."
  }),
  60: verified(["guardrails"], {
    prompt: "A company has built a chatbot that can respond to natural language questions with images. The company wants to ensure that the chatbot does not return inappropriate or unwanted images. Which solution will meet these requirements?"
  }),
  58: verified(["exam"], {
    options: [
      { label: "A", text: "Supervised learning with a manually curated dataset of good and bad responses" },
      { label: "B", text: "Reinforcement learning with rewards for positive customer feedback" },
      { label: "C", text: "Unsupervised learning to find clusters of similar customer inquiries" },
      { label: "D", text: "Supervised learning with a continuously updated FAQ database" }
    ]
  }),
  57: verified(["responsibleAi"], {
    prompt: "A company trained a security-camera model on a dataset that underrepresented people from a specific ethnic group. In production, the model disproportionately flags members of that group as potential thieves. Which type of bias is most directly associated with the unrepresentative training sample?",
    explanation: "Sampling bias occurs when the training data does not adequately represent the population on which the model is used."
  }),
  50: verified(["customOnDemand"], {
    prompt: "A company uses an Amazon Bedrock base model to summarize documents. The company has trained a compatible custom model and wants to invoke it with pay-as-you-go pricing. Which action should the company take?",
    options: [
      { label: "A", text: "Create an on-demand custom model deployment in Amazon Bedrock" },
      { label: "B", text: "Deploy the custom model to an Amazon SageMaker real-time endpoint" },
      { label: "C", text: "Register the model with Amazon SageMaker Model Registry" },
      { label: "D", text: "Grant model access in Amazon Bedrock" }
    ],
    explanation: "Supported custom models can be deployed for on-demand inference and invoked by using the deployment ARN. Provisioned Throughput remains another option for supported workloads, but it is no longer universally required."
  }),
  47: verified(["responsibleAi"], {
    prompt: "A social media company wants to use a large language model (LLM) for content moderation. The company wants to evaluate the LLM outputs for bias and potential discrimination against specific groups or individuals. Which data source should the company use with the LEAST administrative effort?"
  }),
  46: verified(["knowledgeBases"], {
    prompt: "A company wants to use large language models (LLMs) with Amazon Bedrock to develop a chat interface for the company's product manuals. The manuals are stored as PDF files. Which solution meets these requirements MOST cost-effectively?"
  }),
  27: verified(["inference"], {
    prompt: "A company has developed an ML model for image classification. The company wants to deploy the model to production so that a web application can use it. The company needs to host the model and serve predictions without managing the underlying infrastructure. Which solution meets these requirements?"
  }),
  19: verified(["customization"], {
    options: [
      { label: "A", text: "Provide labeled data with prompt and completion fields" },
      { label: "B", text: "Create a .txt training file that contains multiple lines in .csv format" },
      { label: "C", text: "Purchase Provisioned Throughput for Amazon Bedrock" },
      { label: "D", text: "Train the model on journals and textbooks" }
    ]
  }),
  18: verified(["exam"], {
    prompt: "An AI practitioner wants to use a foundation model (FM) to design a search application. The application must handle text and image queries. Which type of FM should the AI practitioner use to power the search application?",
    options: [
      { label: "A", text: "Multimodal embedding model" },
      { label: "B", text: "Text embedding model" },
      { label: "C", text: "Multimodal generation model" },
      { label: "D", text: "Image generation model" }
    ]
  }),
  16: verified(["callAnalytics"], {
    prompt: "A company is building a contact center application and wants to gain insights from customer conversations. The company wants to analyze the audio from customer calls and extract key information. Which solution meets these requirements?",
    options: [
      { label: "A", text: "Build a conversational chatbot by using Amazon Lex" },
      { label: "B", text: "Analyze call recordings by using Amazon Transcribe Call Analytics" },
      { label: "C", text: "Extract information from call recordings by using Amazon SageMaker Model Monitor" },
      { label: "D", text: "Create classification labels by using Amazon Comprehend" }
    ],
    explanation: "Amazon Transcribe Call Analytics analyzes contact center audio and can provide transcripts, sentiment, issue detection, call categorization, and call summaries."
  }),
  15: verified(["exam"], {
    prompt: "Which metric measures the runtime efficiency of operating AI models?"
  }),
  12: verified(["exam"], {
    prompt: "A company wants to use generative AI to increase developer productivity during software development. The company wants to use Amazon Q Developer. What can Amazon Q Developer do to help the company meet these requirements?"
  }),
  9: verified(["s3Access"], {
    prompt: "A company wants to use a foundation model (FM) on Amazon Bedrock for a chatbot. The FM needs to access data in an Amazon S3 bucket that is encrypted with an AWS KMS key (SSE-KMS). The FM cannot access the data because its service role lacks permission to use the key. Which solution meets these requirements?",
    explanation: "Grant the Amazon Bedrock service role permission to access the S3 data and decrypt it with the correct AWS KMS key. SSE-S3 uses Amazon S3 managed keys and does not require a customer KMS decrypt permission."
  }),
  };

  window.AIF_TEST_BANK_REVIEW = {
    auditDate: "2026-07-13",
    removed: {
      8: "Removed: SageMaker Ground Truth Plus support ended on June 30, 2026.",
      97: "Removed: the current Bedrock Stable Diffusion 3.5 interface does not expose the claimed CFG-scale control.",
      158: "Removed: Comprehend Medical extracts entities from unstructured clinical text; it does not perform the structured-record summarization described.",
      188: "Removed: the source maps explainable decisions to Transparency, but AWS defines Explainability and Transparency as separate responsible-AI dimensions.",
      265: "Removed: SageMaker Ground Truth Plus support ended on June 30, 2026."
    },
    questions: {
      ...corrections,
      26: verified(["cloudTrail"]),
      33: verified(["jumpStart"]),
      38: verified(["knowledgeBases"]),
      74: verified(["quick"], {
        explanation: "Amazon Q in Amazon Quick Sight can create analyses and visualizations from natural-language requests. QuickSight is now branded as Quick Sight within Amazon Quick."
      }),
      114: hotspot(
        "1. Define the business goal and frame the ML problem; 2. Develop, train, and evaluate the model; 3. Deploy the model; 4. Monitor the model.",
        ["exam"]
      ),
      120: verified(["knowledgeBases"]),
      125: hotspot(
        "Chatbot with minimal latency -> Real-time inference; Weekend processing of gigabytes of text -> Batch transform; Low-latency text API -> Real-time inference.",
        ["inference"]
      ),
      130: verified(["exam"]),
      135: hotspot(
        "Binary classification -> Supervised learning; Multiclass classification -> Supervised learning; K-means clustering -> Unsupervised learning; Dimensionality reduction -> Unsupervised learning.",
        ["exam"]
      ),
      143: hotspot(
        "Classification with no examples -> Zero-shot prompting; Classification after several examples -> Few-shot prompting; Ask for step-by-step reasoning -> Chain-of-thought prompting.",
        ["exam"]
      ),
      144: hotspot(
        "Hate, insults, violence, or misconduct -> Content filters; Illegal investment or legal-advice subjects -> Denied topics; Specific offensive terms -> Word filters; Ungrounded source-based responses -> Contextual grounding check.",
        ["guardrails"]
      ),
      155: hotspot(
        "Teach a new domain-specific task with labeled examples -> Fine-tuning; Expand a limited labeled dataset -> Data augmentation; Adapt domain knowledge with unlabeled data -> Continued pre-training.",
        ["customization", "exam"]
      ),
      170: verified(["modelCards"]),
      181: verified(["exam"]),
      185: hotspot(
        "Improve performance on specific tasks and examples -> Fine-tuning; Improve domain knowledge with domain documents -> Continued pre-training; Retrain with more unlabeled data over time -> Continued pre-training.",
        ["customization"]
      ),
      189: verified(["healthScribe"]),
      191: hotspot(
        "Prepare data through a visual interface without code -> SageMaker Canvas; Find a prebuilt fraud-detection solution -> SageMaker JumpStart; Create labeled datasets with human intervention -> SageMaker Ground Truth.",
        ["canvas", "jumpStart", "groundTruth"]
      ),
      225: verified(["groundTruth"], {
        explanation: "SageMaker Ground Truth provides managed labeling workflows and quality controls for producing higher-quality labeled datasets. AWS has announced that new-customer access closes on July 30, 2026; existing customers can continue using it."
      }),
      229: hotspot(
        "Manage model versions -> SageMaker Model Registry; Use the current model to make predictions without managing servers -> SageMaker Serverless Inference.",
        ["modelCards", "inference"]
      ),
      234: verified(["guardrails"], {
        prompt: "A financial services company wants its generative AI chatbot to detect and filter responses that are not grounded in supplied reference information. Which solution meets this requirement?",
        explanation: "Configure Amazon Bedrock Guardrails with contextual grounding checks. Guardrails can detect and filter ungrounded model responses; they reduce exposure to hallucinations but do not change or guarantee the behavior of the underlying foundation model."
      }),
      235: hotspot(
        "Generate high-quality product images -> Diffusion model; Generate contextually relevant slogans -> Transformer-based model; Detect and verify placement of brand elements -> Object detection model.",
        ["exam"],
        { explanation: "Diffusion models generate images, transformer-based models generate language, and object detection models locate named objects so their presence and placement can be verified." }
      ),
      245: hotspot(
        "Encrypt data and isolate the application on a private network -> Privacy and security; Evaluate effects on different population groups -> Fairness; Test with unexpected data -> Robustness.",
        ["responsibleAi"]
      ),
      250: verified(["canvas"]),
      254: verified(["exam"]),
      257: hotspot(
        "Apply human feedback to improve labeled data and models -> SageMaker Ground Truth; Implement responsible-AI safeguards -> Amazon Bedrock Guardrails; Detect bias in data and models -> SageMaker Clarify.",
        ["groundTruth", "guardrails", "clarify"],
        { explanation: "The mappings match the current AIF-C01 guide. AWS has announced new-customer access changes for Ground Truth and Clarify on July 30, 2026, while existing customers can continue using them." }
      ),
      264: hotspot(
        "Decide whether a text answer is correct -> Binary classification; Predict the number of species -> Regression; Predict a car model from several possible models -> Multiclass classification.",
        ["exam"]
      ),
      267: hotspot(
        "Assess model documentation and intended use for a business case -> Model Cards; Prepare data with a low-code interface -> Data Wrangler; Identify bias or imbalance -> Clarify.",
        ["modelCards", "clarify", "exam"]
      ),
      275: hotspot(
        "Measure recommendation engagement -> Click-through rate; Measure purchase value -> Average order value; Measure whether users return -> Retention rate.",
        ["exam"]
      ),
      276: verified(["clarify"]),
      280: hotspot(
        "Add external knowledge to an LLM -> Retrieval Augmented Generation (RAG); Perform an unseen task without examples -> Zero-shot learning; Perform a new task from a few examples -> Few-shot learning.",
        ["knowledgeBases", "exam"]
      ),
      283: hotspot(
        "Simulates human problem-solving capabilities -> Artificial intelligence; Learns from data to make predictions -> Machine learning; Uses multilayer neural networks -> Deep learning.",
        ["exam"]
      ),
      286: verified(["novaReel"], {
        explanation: "Amazon Nova Reel is the video-generation model among the options. AWS currently lists Nova Reel 1.0 as Legacy with an end-of-life date of September 30, 2026, so confirm the model lifecycle when designing a new workload."
      }),
      290: verified(["clarify"]),
      291: hotspot(
        "Sentiment analysis of social posts -> Text data; Recognize traffic signs -> Image data; Customer demographics and purchases -> Tabular data; Historical stock-price forecasting -> Time-series data.",
        ["exam"]
      ),
      295: verified(["knowledgeBases"]),
      300: hotspot(
        "Information that fits in one prompt -> Context window; Time to generate an output -> Latency; Simultaneous endpoint users or requests -> Concurrency.",
        ["exam", "inference"]
      ),
      307: verified(["stability"]),
      309: hotspot(
        "1. Define the business objective; 2. Process the data; 3. Develop and train the model; 4. Deploy the model.",
        ["exam"],
        { explanation: "The source-PDF answer image shows this order. Evaluation and monitoring remain important lifecycle activities even though they were not offered in this question's four choices." }
      ),
      311: hotspot(
        "Provide a small number of examples -> Few-shot prompting; Ask for a step-by-step process -> Chain-of-thought prompting; Provide no examples -> Zero-shot prompting.",
        ["exam"]
      ),
      313: hotspot(
        "1. Upload the text and image guides to Amazon S3; 2. Process the files with an Amazon Nova multimodal model; 3. Insert the extracted data into the product database.",
        ["nova"],
        { explanation: "The source-PDF answer image shows this ingestion order: store the files, process both modalities, then write the structured result to the database." }
      ),
      328: hotspot(
        "Least to most development effort: 1. Prompt engineering; 2. Retrieval Augmented Generation (RAG); 3. Fine-tuning; 4. Continued pre-training.",
        ["customization", "knowledgeBases", "exam"]
      ),
      334: verified(["jumpStart"]),
      344: verified(["nova"], {
        explanation: "Amazon Nova Pro accepts text, image, and video inputs and supports customization, making it the matching multimodal comprehension model among these options."
      }),
      350: hotspot(
        "Predict customer lifetime value -> Regression; Predict whether a customer will churn -> Binary classification; Group customers by similar behavior -> Clustering.",
        ["exam"],
        { explanation: "Customer lifetime value is numeric, churn is a yes/no outcome, and segmentation discovers natural groups without predefined labels." }
      ),
      351: hotspot(
        "1. Prepare and clean the data; 2. Train the model; 3. Evaluate the model; 4. Deploy the model.",
        ["exam"]
      ),
      366: hotspot(
        "Labeled task-specific data -> Fine-tuning; Large volumes of unlabeled domain data -> Continued pre-training; Transfer knowledge from a larger model to a smaller model -> Distillation.",
        ["customization"]
      ),
      368: verified(["exam"])
    }
  };
})();
