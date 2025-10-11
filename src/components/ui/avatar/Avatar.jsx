import { useEffect, useState } from "react";
import { useCombinedStore } from "../../../store/userInstituteBounded";
const Avatar = ({ size = "small", draggable = false, image = "" }) => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const user = useCombinedStore((state) => state.user);

  useEffect(() => {
    if (user.imgUrl) {
      setAvatarUrl(user.imgUrl);
    } else {
      setAvatarUrl("https://i.ibb.co/jPmh0S0C/billie-eilish-1.jpg");
    }
  }, [user.imgUrl]);

  return (
    <picture className="select-none pointer-events-none">
      <img
        src={avatarUrl}
        draggable={draggable}
        alt="User Avatar"
        className={`rounded-full select-none border-2 border-gray-300 ${
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
