import StepByStepCarousel from "./Components/StepByStepCarosel";

function App() {
  const steps = [
    {
      step: 1,
      title: "Submit Required Documents",
      description: "We need any one of the following:",
      checklist: [
        "Iqama Copy",
        "OR Iqama Number",
        "OR First Saudi Visa copy from your passport",
        "Bio page of your passport",
      ],
      image:
        "https://project251.hrstride.academy/wp-content/uploads/2025/06/ChatGPT-Image-Jun-27-2025-01_00_44-AM.png",
      titleColor: "#0E0E52",
      descriptionColor: "#666B8A",
      checklistColor: "#0082F4",
      slideBackgroundColor: "#F8F9FC",
    },
    {
      step: 2,
      title: "Record Check & Verification",
      description: "We access Saudi police records to:",
      checklist: [
        "Confirm your file",
        "Retrieve fingerprint & photo records",
      ],
      image:
        "https://project251.hrstride.academy/wp-content/uploads/2025/06/ChatGPT-Image-Jun-27-2025-01_10_06-AM.png",
      titleColor: "#0E0E52",
      descriptionColor: "#666B8A",
      checklistColor: "#0082F4",
      slideBackgroundColor: "#F8F9FC",
    },
     {
    step: 3,
    title: "Issuance of Saudi PCC",
    description: "Final Saudi PCC issued with the official seal.",
    checklist: [
      "Attestation by MOFA (if requested)",
      "Courier or soft copy delivery"
    ],
    image: "https://project251.hrstride.academy/wp-content/uploads/2025/06/ChatGPT-Image-Jun-27-2025-01_12_54-AM.png",
    titleColor: "#0E0E52",
    descriptionColor: "#666B8A",
    checklistColor: "#0082F4",
    slideBackgroundColor: "#F8F9FC"
  },
  {
    step: 4,
    title: "Translation Services (if required)",
    description: "We offer translation for official use:",
    checklist: [
      "Arabic to English translation",
      "Certified translator approval"
    ],
    image: "https://project251.hrstride.academy/wp-content/uploads/2025/06/ChatGPT-Image-Jun-27-2025-01_15_46-AM.png",
    titleColor: "#0E0E52",
    descriptionColor: "#666B8A",
    checklistColor: "#0082F4",
    slideBackgroundColor: "#F8F9FC"
  },
  {
    step: 5,
    title: "MOFA Attestation",
    description: "We help with Ministry of Foreign Affairs Attestation:",
    checklist: [
      "Document submission to MOFA",
      "Collection and confirmation"
    ],
    image: "https://project251.hrstride.academy/wp-content/uploads/2025/06/ChatGPT-Image-Jun-27-2025-01_00_44-AM.png",
    titleColor: "#0E0E52",
    descriptionColor: "#666B8A",
    checklistColor: "#0082F4",
    slideBackgroundColor: "#F8F9FC"
  },
  {
    step: 6,
    title: "Courier Service Setup",
    description: "Secure delivery of your documents via trusted courier partners.",
    checklist: [
      "Domestic & international shipping",
      "Tracking details shared"
    ],
    image: "https://project251.hrstride.academy/wp-content/uploads/2025/06/ChatGPT-Image-Jun-27-2025-01_10_06-AM.png",
    titleColor: "#0E0E52",
    descriptionColor: "#666B8A",
    checklistColor: "#0082F4",
    slideBackgroundColor: "#F8F9FC"
  },
  {
    step: 7,
    title: "Customer Support",
    description: "Dedicated help for every stage of the process.",
    checklist: [
      "Phone, Email & WhatsApp assistance",
      "Real-time status updates"
    ],
    image: "https://project251.hrstride.academy/wp-content/uploads/2025/06/ChatGPT-Image-Jun-27-2025-01_12_54-AM.png",
    titleColor: "#0E0E52",
    descriptionColor: "#666B8A",
    checklistColor: "#0082F4",
    slideBackgroundColor: "#F8F9FC"
  },
  {
    step: 8,
    title: "Data Security Assurance",
    description: "Your data is safe with us.",
    checklist: [
      "End-to-end encryption",
      "No third-party access"
    ],
    image: "https://project251.hrstride.academy/wp-content/uploads/2025/06/ChatGPT-Image-Jun-27-2025-01_15_46-AM.png",
    titleColor: "#0E0E52",
    descriptionColor: "#666B8A",
    checklistColor: "#0082F4",
    slideBackgroundColor: "#F8F9FC"
  },
  {
    step: 9,
    title: "Soft Copy Archival",
    description: "We provide you with soft copies for your records.",
    checklist: [
      "PDF & image format",
      "Secure cloud storage link (optional)"
    ],
    image: "https://project251.hrstride.academy/wp-content/uploads/2025/06/ChatGPT-Image-Jun-27-2025-01_00_44-AM.png",
    titleColor: "#0E0E52",
    descriptionColor: "#666B8A",
    checklistColor: "#0082F4",
    slideBackgroundColor: "#F8F9FC"
  },
  {
    step: 10,
    title: "Completion & Feedback",
    description: "Once complete, we welcome your feedback.",
    checklist: [
      "Quick rating system",
      "Optional testimonial submission"
    ],
    image: "https://project251.hrstride.academy/wp-content/uploads/2025/06/ChatGPT-Image-Jun-27-2025-01_10_06-AM.png",
    titleColor: "#0E0E52",
    descriptionColor: "#666B8A",
    checklistColor: "#0082F4",
    slideBackgroundColor: "#F8F9FC"
  }
  ];

  const carouselSettings = {
    slideWidth: 380,
    slideHeight: 420,
    minimumSlidesToShow: 1.25,
    scrollSpeed: 500, // ms
    keyScrollSpeed: 300,
    dragSpeed: 0.85,
  };

  return (
    <div style={{ paddingBottom: "4rem" }}>
      <h1 style={{ textAlign: "center", fontSize: "2rem", margin: "2rem 0" }}>
        Step-by-Step Carousel #1
      </h1>
      <StepByStepCarousel steps={steps} carouselSettings={carouselSettings} />

      <h1 style={{ textAlign: "center", fontSize: "2rem", margin: "3rem 0 2rem" }}>
        Step-by-Step Carousel #2
      </h1>
      <StepByStepCarousel steps={steps} carouselSettings={carouselSettings} />
    </div>
  );
}

export default App;
