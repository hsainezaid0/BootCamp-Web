export function countGs(str) {
  let cpt = 0;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === "G" || str[i] === "g") {
      cpt++;
    }
  }

  return cpt;
}