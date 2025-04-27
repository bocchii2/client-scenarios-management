import React, { useEffect, useState } from "react";
import useUserStore from "../../../store/user";
const Avatar = ({ size = "small", draggable = false }) => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user.imgUrl) {
      setAvatarUrl(user.imgUrl);
    } else {
      setAvatarUrl("https://example.com/default-avatar.jpg");
    }
  }, [user.imgUrl]);
  return (
    <picture className="select-none pointer-events-none">
      <img
        src={avatarUrl}
        draggable={draggable}
        alt="User Avatar"
        className={`rounded-full select-none border-2 border-red-300 ${
          size === "small"
            ? "w-10 h-10"
            : size === "medium"
            ? "w-16 h-16"
            : size === "large"
            ? "w-24 h-24"
            : ""
        }`}
      />
    </picture>
  );
};

export default Avatar;
