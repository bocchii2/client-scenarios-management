import React, { useEffect, useRef, useState } from "react";
import { MdPerson } from "react-icons/md";
import useAuthGuard from "../../../hooks/useAuthGuard";
import { getStorageUrl } from "../../../config/storage";

const sizeMap = {
  small: "w-10 h-10",
  medium: "w-16 h-16",
  large: "w-24 h-24",
};

const iconSizeMap = {
  small: "w-6 h-6",
  medium: "w-10 h-10",
  large: "w-12 h-12",
};

const Avatar = ({
  size = "small",
  draggable = false,
  src,                   // nueva prop controlada para la imagen
  image = "",            // compat: alias del src previo
  editable = false,      // activa el click para cambiar imagen
  accept = "image/*",
  disabled = false,
  className = "",
  ariaLabel = "Cambiar foto de perfil",
  onChange,              // callback(file, previewUrl)
}) => {
  const inputRef = useRef(null);
  const { user } = useAuthGuard();

  const fallback =
    src || image || user?.imgUrl;

  const [previewUrl, setPreviewUrl] = useState(fallback);
  const [hasImage, setHasImage] = useState(!!fallback);

  useEffect(() => {
    // Mantener sincronizado si cambia src externamente
    if (src || image || user?.imgUrl) {
      setPreviewUrl(src || image || user?.imgUrl);
      setHasImage(true);
    } else {
      setHasImage(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, image, user?.imgUrl]);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handlePick = () => {
    if (!editable || disabled) return;
    inputRef.current?.click();
  };

  const handleKey = (e) => {
    if (!editable || disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handlePick();
    }
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const nextUrl = URL.createObjectURL(file);
    // liberar URL anterior si era blob
    if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(nextUrl);
    setHasImage(true);
    onChange?.(file, nextUrl);
  };

  const sizeClass =
    typeof size === "string" ? sizeMap[size] || sizeMap.small : "";
  const isInteractive = editable && !disabled;

  return (
    <div className={`inline-flex items-center ${className}`}>
      <button
        type="button"
        className={`relative rounded-full border-2 border-gray-300 overflow-hidden
          ${sizeClass}
          ${isInteractive ? "cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500" : "cursor-default"}
          ${!hasImage ? "bg-gray-200 flex items-center justify-center" : ""}
        `}
        onClick={handlePick}
        onKeyDown={handleKey}
        aria-label={editable ? ariaLabel : "Foto de perfil"}
        aria-disabled={disabled}
      >
        {hasImage ? (
          <img
            src={previewUrl}
            draggable={draggable}
            alt="Foto de perfil"
            className="w-full h-full object-cover select-none"
          />
        ) : (
          <MdPerson className={`${iconSizeMap[size] || iconSizeMap.small} text-gray-400`} />
        )}

        {editable && (
          <span
            className={`absolute inset-0 flex items-center justify-center text-white text-xs font-medium
              bg-black/0 hover:bg-black/40 transition-colors ${disabled ? "pointer-events-none" : ""}
            `}
          >
            Cambiar
          </span>
        )}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFile}
        hidden
        disabled={disabled}
      />
    </div>
  );
};

export default Avatar;
