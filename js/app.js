//DOM
const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const copyEl = document.getElementById("copy");

const randomFunc = {
  lower: getLower,
  upper: getUpper,
  number: getNumber,
  symbol: getSymbol,
};



copyEl.addEventListener("click", () => {
  const textArea = document.createElement("textarea");
  const password = resultEl.innerText;

  if (!password) {
    return;
  }
  textArea.value = password;
  document.body.appendChild(textArea);
  textArea.select();
  document.execComand("copy");
  textArea.remove();
  alert("Contraseña Copiada");
});

generate.addEventListener("click", () => {
  const length = +lengthEl.value;
  const isUpper = uppercaseEl.checked;
  const isLower = lowercaseEl.checked;
  const isNumber = numbersEl.checked;
  const isSymbol = symbolsEl.checked;

  resultEl.innerText = generatePassword(
    isLower,
    isUpper,
    isNumber,
    isSymbol,
    length
  );
});

//Funcion de la contraseña..
function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = "";

  const typesCount = lower + upper + number + symbol;
  const typeArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  if (typesCount === 0) {
    return "";
  }

  for (let i = 0; i < length; i += typesCount) {
    typeArr.forEach((type) => {
      const funcName = Object.keys(type)[0];

      generatedPassword += randomFunc[funcName]();
    });
  }
  const finalPass = generatedPassword.slice(0, length);
  return finalPass;
}

//Generador de funciones....

function getLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getSymbol() {
  const symbols = "!@#$%^&*(){}[]=><?/.,;:";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// console.log(getSymbol())
