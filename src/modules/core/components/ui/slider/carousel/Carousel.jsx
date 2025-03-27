import { useState } from "react";
import CarouselItem from "./CarouselItem";
import CarouselControls from "./CarouselControls";

const Carousel = ({ items, width = "600px", height = "300px" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      className={`
        h-[${height}px] w-[${width}px]
        relative  mx-auto overflow-hidden max-h-[600px]
      `}
    >
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item) => (
          <CarouselItem key={item.id} item={item} height={height} />
        ))}
      </div>
      <CarouselControls onNext={nextSlide} onPrev={prevSlide} />
    </div>
  );
};

export default Carousel;
