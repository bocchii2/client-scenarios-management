import React from "react";
import { Link } from "react-router-dom";

const Breadcrum = ({ arrayOfUriPath, currentLocationLabel }) => {
  return (
    <div>
      {arrayOfUriPath.map((p, index) => (
        <div key={index} className="inline-block">
          <Link
            key={p}
            to={`/${p}`}
            className={`${
              index == arrayOfUriPath.length - 1
                ? "text-blue-600 font-semibold"
                : "text-gray-600 font-light"
            } cursor-pointer select-none px-2 `}
          >
            {currentLocationLabel
              ? index == arrayOfUriPath.length - 1
                ? currentLocationLabel.toUpperCase()
                : p.toUpperCase()
              : index == 0
              ? p.toUpperCase()
              : p.toUpperCase()}
          </Link>
          <span className="select-none text-blue-600"> / </span>
        </div>
      ))}
    </div>
  );
};

export default Breadcrum;
