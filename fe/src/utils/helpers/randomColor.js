export function getRandomGoogleColor() {
  const googleColors = ["#4285F4", "#EA4335", "#FBBC05", "#34A853"];
  return googleColors[Math.floor(Math.random() * googleColors.length)];
}
