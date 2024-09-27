export default function (symbol: string) {
  const split: string[] = symbol.split("");
  let symbolCollected = false;
  let dateCollected = false;
  let typeCollected = false;
  let type = "";
  const symbolChars = [];
  const dateChars = [];
  const wholeChars = [];
  const decimalChars = [];

  for (let i = 0; i < split.length; i++) {
    const char = split[i];

    if (!symbolCollected) {
      if (!isANumber(char)) {
        symbolChars.push(char);
      } else {
        symbolCollected = true;
      }
    }

    if (symbolCollected) {
      if (!dateCollected) {
        if (isANumber(char)) {
          dateChars.push(char);
        } else {
          dateCollected = true;
        }
      }
    }

    if (symbolCollected && dateCollected) {
      if (!typeCollected) {
        type = char;
        typeCollected = true;
      } else {
        wholeChars.length > 4 ? decimalChars.push(char) : wholeChars.push(char);
      }
    }
  }

  const wholeActual: string[] = [];
  let bool = true;
  wholeChars.forEach((e) => {
    if (bool) {
      if (e !== "0") {
        bool = false;
        wholeActual.push(e);
      }
    } else {
      wholeActual.push(e);
    }
  });

  const hundrethsOnly = decimalChars.slice(0, 1);
  const decimalLabel = hundrethsOnly.includes("0")
    ? ""
    : `.${hundrethsOnly.join("")}`;

  const label = `${symbolChars.join("")} ${wholeActual.join(
    ""
  )}${decimalLabel}${type} ${convertToDateFormat(dateChars.join(""))}`;

  return label;
}

const isANumber = (char: string) => !isNaN(Number(char));

function convertToDateFormat(dateStr: string) {
  const day = parseInt(dateStr.substring(0, 2));
  const month = parseInt(dateStr.substring(2, 4));
  return `${month}/${day}`;
}
