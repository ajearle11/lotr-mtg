const addToString = (string: string): string => {
  if (string.length === 3) {
    return string;
  } else if (string.length === 2) {
    return "0" + string;
  } else {
    return "00" + string;
  }
};

//In generic format for my own reference. Not truly generic. Where string is would be type T, but the logic in the function causes the issue for what I want
// const convertColor = <T,>(value: Array<T>): T => {
const convertColor = (value: Array<string>): string => {
  let valueToPrint = "";

  value.forEach((color): void => {
    switch (color) {
      case "W":
        color = "White";
        break;
      case "R":
        color = "Red";
        break;
      case "U":
        color = "Blue";
        break;
      case "B":
        color = "Black";
        break;
      case "G":
        color = "Green";
        break;
      default:
        color = "Colourless";
        break;
    }

    valueToPrint = valueToPrint + color + " ";
  });

  return valueToPrint.trimEnd();
};

export { addToString, convertColor };
