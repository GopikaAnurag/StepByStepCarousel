import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState } from "react";
import { FaFileAlt, FaCheckCircle } from "react-icons/fa";

const StepByStepCarousel = ({ steps, carouselSettings }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef] = useKeenSlider({
    breakpoints: {
      "(min-width: 1024px)": {
        slides: { perView: 2, spacing: 20 },
      },
      "(min-width: 640px)": {
        slides: { perView: 1.5, spacing: 15 },
      },
    },
    slides: {
      perView: carouselSettings.minimumSlidesToShow,
      spacing: 10,
    },
    rubberband: false,
    dragSpeed: carouselSettings.dragSpeed,
    slideChanged: (s) => setCurrentSlide(s.track.details.rel),
  });

  const progress = ((currentSlide + 1) / steps.length) * 100;

  return (
    <div style={{ padding: "2rem" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <p style={{ textTransform: "uppercase", fontSize: "0.85rem", color: "#2563eb", fontWeight: 600 }}>
          SAUDI PCC ONLINE PROCESS
        </p>
        <h2 style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#1e293b", marginTop: "0.25rem" }}>
          Step-by-Step Process
        </h2>
      </div>

      {/* Carousel */}
      <div ref={sliderRef} className="keen-slider">
        {steps.map((step, index) => (
          <div
            key={index}
            className="keen-slider__slide"
            style={{
              position: "relative",
              backgroundColor: step.slideBackgroundColor,
              padding: "1rem",
              borderRadius: "1rem",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "row",
              gap: "0.75rem",
              alignItems: "flex-start",
              width: "100%",
              height: `${carouselSettings.slideHeight}px`,
            }}
          >
            {/* STEP Badge (Top-right corner) */}
            <div
              style={{
                position: "absolute",
                top: "0.5rem",
                right: "0.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.2rem",
                background: "#eef4ff",
                padding: "0.3rem 0.5rem",
                borderRadius: "1rem",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "#2563eb",
                zIndex: 10,
              }}
            >
              <FaFileAlt style={{ fontSize: "1.1rem" }} />
              <span>STEP {step.step.toString().padStart(2, "0")}</span>
            </div>

            {/* Left-side Image */}
            <img
              src={step.image}
              alt={`Step ${step.step}`}
              style={{
                width: "40%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "0.5rem",
              }}
            />

            {/* Right-side Content */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", color: step.titleColor, marginBottom: "0.5rem" }}>
                {step.title}
              </h3>
              <p style={{ marginBottom: "0.5rem", fontSize: "0.95rem", color: step.descriptionColor }}>
                {step.description}
              </p>
              <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                {step.checklist.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "0.9rem",
                      color: step.checklistColor,
                      marginBottom: "0.25rem",
                    }}
                  >
                    <FaCheckCircle style={{ marginRight: "0.5rem" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Line Progress Bar */}
      <div style={{ width: "100%", maxWidth: "700px", margin: "1.5rem auto 0" }}>
        <div style={{ width: "100%", height: "6px", background: "#e2e8f0", borderRadius: "4px", overflow: "hidden" }}>
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "#2563eb",
              transition: "width 0.3s ease",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StepByStepCarousel;
