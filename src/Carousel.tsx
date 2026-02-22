import { useMemo, useState } from "react";
import "./Carousel.css";

const SLIDE_TRANSITION_DURATION = 1000 as const;

const Carousel = () => {
  const [slides, setSlides] = useState([
    {
      id: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=500&fit=crop",
    },
    {
      id: 2,
      imageUrl:
        "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=800&h=500&fit=crop",
    },
    {
      id: 3,
      imageUrl:
        "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=800&h=500&fit=crop",
    },
    {
      id: 4,
      imageUrl:
        "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800&h=500&fit=crop",
    },
    {
      id: 5,
      imageUrl:
        "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=800&h=500&fit=crop",
    },
    {
      id: 6,
      imageUrl:
        "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=800&h=500&fit=crop",
    },
  ]);

  const [activeSlide, setActiveSlide] = useState(0);
  const [leavingSlide, setLeavingSlide] = useState<number | null>(null);
  const [enteringSlide, setEnteringSlide] = useState<number | null>(null);

  const [direction, setDirection] = useState<"prev" | "next" | null>(null);

  const [isTransitioning, setIsTransitioning] = useState(false);

  const handlePrevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection("prev");
    setCountActiveSlide(
      countActiveSlide - 1 === 0 ? slides.length : countActiveSlide - 1,
    );

    setLeavingSlide(activeSlide);
    setEnteringSlide(activeSlide === 0 ? slides.length - 1 : activeSlide - 1);

    setTimeout(() => {
      setIsTransitioning(false);
      setDirection(null);
      setLeavingSlide(null);
      setEnteringSlide(null);
      setActiveSlide((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
    }, SLIDE_TRANSITION_DURATION);
  };

  const handleNextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection("next");
    setCountActiveSlide(
      countActiveSlide + 1 > slides.length ? 1 : countActiveSlide + 1,
    );

    setLeavingSlide(activeSlide);
    setEnteringSlide(activeSlide + 1 === slides.length ? 0 : activeSlide + 1);

    setTimeout(() => {
      setIsTransitioning(false);
      setDirection(null);
      setLeavingSlide(null);
      setEnteringSlide(null);
      setActiveSlide((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
    }, SLIDE_TRANSITION_DURATION);
  };

  const getSlideClass = (id: number) => {
    let classes = "slide";

    if (id === slides[activeSlide].id) {
      classes += " active";
    }

    if (leavingSlide != null && id === slides[leavingSlide]?.id) {
      classes += " leaving";
    }

    if (enteringSlide != null && id === slides[enteringSlide]?.id) {
      classes += " entering";
    }

    return classes;
  };

  const visibleSlides = useMemo(() => {
    if (isTransitioning && enteringSlide != null) {
      return [slides[activeSlide], slides[enteringSlide]];
    }
    return [slides[activeSlide]];
  }, [activeSlide, slides, isTransitioning, enteringSlide]);

  const [countActiveSlide, setCountActiveSlide] = useState(1);

  return (
    <div style={{ width: "80vw" }}>
      <div className="carousel">
        <div
          className={
            "slides-container" +
            (isTransitioning ? " transitioning-" + direction : "")
          }
          aria-live="polite"
        >
          {visibleSlides.map((slide) => {
            return (
              <div
                role="group"
                className={getSlideClass(slide.id)}
                key={slide.id}
              >
                <img src={slide.imageUrl} alt="Slide" />
              </div>
            );
          })}
        </div>
        <div className="slider-navigation">
          <button onClick={handlePrevSlide}> &lt;&lt; </button>
          <span className="slider-navigation-count">
            {countActiveSlide} of {slides.length}{" "}
          </span>
          <button onClick={handleNextSlide}> &gt;&gt; </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
