/**
 * Configuración centralizada del storage de Laravel
 */

const LARAVEL_STORAGE_URL =
  import.meta.env.REACT_APP_STORAGE_URL || "http://localhost:8000/storage";

/**
 * Construye la URL completa de una imagen almacenada en Laravel
 * @param {string} path - Ruta relativa de la imagen (ej: "profile-images/archivo.jpg")
 * @returns {string|undefined} - URL completa o undefined si path es vacío
 */
export const getStorageUrl = (path) => {
  if (!path) return undefined;
  return `${LARAVEL_STORAGE_URL}/${path}`;
};

export default LARAVEL_STORAGE_URL;
