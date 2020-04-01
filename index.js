const fs = require("fs");
const path = require("path");

function withSortedLetters(string) {
  return string.split("").sort().join("");
}

const dataFileFullPath = path.resolve(__dirname, "liste.de.mots.francais.frgut.txt");

let data = fs.readFileSync(dataFileFullPath, "utf8")
  .split("\n")
  .map(str => str.trim().normalize("NFD").replace(/[\u0300-\u036f]|-/g, "").toLowerCase());

const bySortedLetters = data.reduce((acc, word) => {
  const wordWithSortedLetters = withSortedLetters(word);
  if (!acc[wordWithSortedLetters]) {
    acc[wordWithSortedLetters] = [word];
  } else {
    acc[wordWithSortedLetters].push(word);
  }
  return acc;
}, {});


const finalData = Object.values(bySortedLetters);

console.log("Anagrams:", finalData);