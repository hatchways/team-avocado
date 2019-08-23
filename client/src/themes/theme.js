export const colors = {
  brand: "#FF510C",
  brandLight: "#FF743D",
  secondary: "#1f1f1f",
  error: "#ff4444",
  bgcolor: "#F8F8FE",
  brandTransparent: "#FF743D4D",
  background: "#f8f8fe",
  faint: "rgba(0,0,0,0.1)"
};

export const typography = {
  fontFamily: '"Montserrat"'
};

const spacing = 10,
  spacingUnit = "px";

export const layout = {
  spacing: n => `${n * spacing}${spacingUnit}`,
  navHeight: "75px"
};
