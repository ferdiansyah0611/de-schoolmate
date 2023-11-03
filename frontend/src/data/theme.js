
const THEME = ["bg-moonlit-asteroid", "bg-lawrencium", "bg-celestial"];

function readableTheme(name) {
  const withoutPrefix = name.replace("bg-", "");
  const words = withoutPrefix.split("-");
  const capitalizedWords = words.map(word => {
    const firstLetter = word.charAt(0).toUpperCase();
    const restOfWord = word.slice(1);
    return firstLetter + restOfWord;
  });
  const finalName = capitalizedWords.join(" ");
  return finalName;
}
function changeTheme(name) {
  THEME.forEach((color) => {
    if (color === name) return;
    document.body.classList.remove(color);
  })
  document.body.classList.add(name);
}
function useEffectTheme() {
  document.body.classList.add(THEME[Math.floor(Math.random() * THEME.length)]);
  return() => {
    THEME.forEach((color) => {
      document.body.classList.remove(color);
    });
  }
}

export { THEME, readableTheme, changeTheme, useEffectTheme };