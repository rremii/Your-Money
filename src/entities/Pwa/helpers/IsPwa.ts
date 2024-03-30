export const IsPwa = () => {
  return ["fullscreen", "standalone", "minimal-ui"].some(
    (displayMode) => window.matchMedia("(display-mode: " + displayMode + ")").matches
  )
}