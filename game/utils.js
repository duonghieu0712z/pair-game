export function shuffle(array) {
  // for (let index = array.length - 1; index > 0; index--) {
  //   const randomIndex = Math.trunc(Math.random() * (index + 1));
  //   [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
  // }
  return array;
}

export function tween(target, props) {
  return gsap.to(target, props);
}
