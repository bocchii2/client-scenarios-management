/**
 * Colores institucionales de la Universidad
 * Usar SCREAMING_SNAKE_CASE para constantes (Clean Code)
 * 
 * Estos colores representan la identidad visual de la institución:
 * - PRIMARY: Color principal (azul institucional) - usado en headers, botones principales
 * - SECONDARY: Color secundario (gris oscuro) - usado en textos, bordes
 * - ACCENT: Color de acento (rojo) - usado para alertas, CTAs, highlights
 */

// Colores base institucionales
export const UNIVERSITY_PRIMARY_COLOR = '#004987';    // Azul institucional
export const UNIVERSITY_SECONDARY_COLOR = '#4A4A49';  // Gris oscuro
export const UNIVERSITY_ACCENT_COLOR = '#FF0000';     // Rojo

// Variaciones de tonalidad (útil para hovers, bordes, fondos)
export const UNIVERSITY_PRIMARY_DARK = '#003366';     // Azul más oscuro
export const UNIVERSITY_PRIMARY_LIGHT = '#0066B3';    // Azul más claro
export const UNIVERSITY_ACCENT_DARK = '#CC0000';      // Rojo más oscuro
export const UNIVERSITY_ACCENT_LIGHT = '#FF3333';     // Rojo más claro

// Objeto con todos los colores para fácil importación
export const UNIVERSITY_COLORS = {
  primary: UNIVERSITY_PRIMARY_COLOR,
  primaryDark: UNIVERSITY_PRIMARY_DARK,
  primaryLight: UNIVERSITY_PRIMARY_LIGHT,
  secondary: UNIVERSITY_SECONDARY_COLOR,
  accent: UNIVERSITY_ACCENT_COLOR,
  accentDark: UNIVERSITY_ACCENT_DARK,
  accentLight: UNIVERSITY_ACCENT_LIGHT,
};

// Exportación por defecto para conveniencia
export default UNIVERSITY_COLORS;
