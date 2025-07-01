import { useRef, useEffect, useState } from "react";
import { FaFileAlt, FaCheckCircle } from "react-icons/fa";
import "../App.css";

const StepByStepCarousel = ({ steps, carouselSettings, title }) => {
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragged, setDragged] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [dimensions, setDimensions] = useState({
    slideWidth: carouselSettings.slideWidth,
    slideHeight: carouselSettings.slideHeight,
    fontScale: 1,
  });

  const SCROLL_SPEED = 7;

  useEffect(() => {
    const updateDimensions = () => {
      const containerWidth = carouselRef.current?.offsetWidth || window.innerWidth;
      const fullSlideWidth = carouselSettings.slideWidth;
      const requiredWidth = fullSlideWidth * carouselSettings.minimumSlidesToShow;

      if (containerWidth < requiredWidth) {
        const adjustedWidth = containerWidth / carouselSettings.minimumSlidesToShow;
        const fontScale = adjustedWidth / fullSlideWidth;
        setDimensions({
          slideWidth: adjustedWidth,
          slideHeight: (adjustedWidth * 250) / fullSlideWidth,
          fontScale,
        });
      } else {
        setDimensions({
          slideWidth: fullSlideWidth,
          slideHeight: (fullSlideWidth * 250) / fullSlideWidth,
          fontScale: 1,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [carouselSettings]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragged(false);
    setStartX(e.pageX);
    setScrollLeftPos(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const scrollDistance = e.pageX - startX;
    if (Math.abs(scrollDistance) > 5) setDragged(true);
    carouselRef.current.scrollLeft = scrollLeftPos - scrollDistance * carouselSettings.dragSpeed;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setTimeout(() => setDragged(false), 100);
  };

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const onWheel = (e) => {
      if (!isActive) return;
      const scrollAmount = (e.deltaX || e.deltaY) * SCROLL_SPEED;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) e.preventDefault();
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, [isActive]);

  useEffect(() => {
    const handleKey = (e) => {
      if (!isActive) return;
      if (e.key === "ArrowLeft") {
        carouselRef.current.scrollBy({
          left: -carouselSettings.keyScrollSpeed,
          behavior: "smooth",
        });
      } else if (e.key === "ArrowRight") {
        carouselRef.current.scrollBy({
          left: carouselSettings.keyScrollSpeed,
          behavior: "smooth",
        });
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isActive, carouselSettings]);

  useEffect(() => {
    const container = carouselRef.current;
    const updateProgress = () => {
      const scrollLeft = container.scrollLeft;
      const scrollMax = container.scrollWidth - container.clientWidth;
      const percent = scrollMax > 0 ? (scrollLeft / scrollMax) * 100 : 0;
      setScrollProgress(percent);
    };

    container.addEventListener("scroll", updateProgress);
    return () => container.removeEventListener("scroll", updateProgress);
  }, []);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({
      left: -dimensions.slideWidth,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({
      left: dimensions.slideWidth,
      behavior: "smooth",
    });
  };

  return (
    <div
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      style={{
        height: "100%",
        padding: "0.5rem",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      {title && (
        <h2
          style={{
            textAlign: "center",
            fontSize: `${1.1 * dimensions.fontScale}rem`,
            marginBottom: "0.3rem",
            marginTop: 0,
          }}
        >
          {title}
        </h2>
      )}

      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <p
          style={{
            textTransform: "uppercase",
            fontSize: `${0.8 * dimensions.fontScale}rem`,
            color: "#2563eb",
            fontWeight: 600,
          }}
        >
          SAUDI PCC ONLINE PROCESS
        </p>
        <h2
          style={{
            fontSize: `${1.5 * dimensions.fontScale}rem`,
            fontWeight: "bold",
            color: "#1e293b",
            marginTop: "0.25rem",
          }}
        >
          Step-by-Step Process
        </h2>
      </div>

      {/* Arrows */}
      <div style={{ position: "relative" }}>
        <button
          onClick={scrollLeft}
          style={{
            position: "absolute",
            top: "40%",
            left: "-1rem",
            zIndex: 10,
            fontSize: "2rem",
            background: "transparent",
            color: "#000",
            border: "none",
            cursor: "pointer",
          }}
          aria-label="Scroll Left"
        >
          ‹
        </button>
        <button
          onClick={scrollRight}
          style={{
            position: "absolute",
            top: "40%",
            right: "-1rem",
            zIndex: 10,
            fontSize: "2rem",
            background: "transparent",
            color: "#000",
            border: "none",
            cursor: "pointer",
          }}
          aria-label="Scroll Right"
        >
          ›
        </button>

        <div
          ref={carouselRef}
          className="no-scrollbar"
          style={{
            display: "flex",
            overflowX: "auto",
            scrollBehavior: "smooth",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            gap: "1rem",
            paddingBottom: "0.5rem",
            cursor: isDragging ? "grabbing" : "grab",
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {steps.map((step, index) => (
            <div
              key={index}
              onClick={(e) => {
                if (dragged) e.preventDefault();
              }}
              style={{
                flex: "0 0 auto",
                width: `${dimensions.slideWidth}px`,
                height: `${dimensions.slideHeight}px`,
                backgroundColor: step.slideBackgroundColor,
                padding: "1rem",
                borderRadius: "1rem",
                boxShadow: "0 0 8px rgba(0,0,0,0.08)",
                display: "flex",
                flexDirection: "row",
                gap: "0.75rem",
                alignItems: "flex-start",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "0.5rem",
                  right: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  background: "#eef4ff",
                  padding: "0.35rem 0.6rem",
                  borderRadius: "1rem",
                  fontSize: `${0.75 * dimensions.fontScale}rem`,
                  fontWeight: 600,
                  color: "#2563eb",
                }}
              >
                <FaFileAlt style={{ fontSize: `${1 * dimensions.fontScale}rem` }} />
                <span>STEP {step.step.toString().padStart(2, "0")}</span>
              </div>

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
              <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <h3
                  style={{
                    fontSize: `${1.1 * dimensions.fontScale}rem`,
                    fontWeight: "bold",
                    color: step.titleColor,
                    marginBottom: "0.4rem",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: `${0.9 * dimensions.fontScale}rem`,
                    color: step.descriptionColor,
                    marginBottom: "0.4rem",
                  }}
                >
                  {step.description}
                </p>
                <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                  {step.checklist.map((item, i) => (
                    <li
                      key={i}
                      style={{
                        fontSize: `${0.85 * dimensions.fontScale}rem`,
                        color: step.checklistColor,
                        display: "flex",
                        alignItems: "center",
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
      </div>

      {/* Progress Bar */}
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          margin: "1rem auto 0",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "6px",
            background: "#e2e8f0",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${scrollProgress}%`,
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
