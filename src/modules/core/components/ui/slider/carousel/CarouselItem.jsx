import React from "react";

const CarouselItem = ({ item, height = "300px" }) => {
  return (
    <div className="w-full flex-shrink-0">
      <img
        src={item.imageSrc}
        alt={item.title}
        className="w-full object-cover rounded-lg"
        style={{ height }}
      />
    </div>
  );
};

export default CarouselItem;
