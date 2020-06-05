export function getStoryAddress(mod: string, story: string) {
  return `http://localhost:6006/iframe.html?id=${mod}--${story}`;
}
