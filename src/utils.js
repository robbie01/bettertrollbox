export const unescapeText = text => {
  const el = document.createElement('div')
  el.innerHTML = text
  return el.textContent
}
