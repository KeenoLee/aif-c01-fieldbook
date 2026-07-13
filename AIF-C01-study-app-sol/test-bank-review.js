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
    stability: ["Stable Diffusion 3.5 Large on Bedrock", "https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters-diffusion-3-5-large.html"]
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
