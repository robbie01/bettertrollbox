export const unescapeText = text => {
  const el = document.createElement("div")
  el.innerHTML = text.replace(" ", "\u00A0")
  return el.textContent
}

export const unescapeText2 = text => {
  return text.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/ /g, "\u00A0").replace(/&#10;/g, "<br />")
}
