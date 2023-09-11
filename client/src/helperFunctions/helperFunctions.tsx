const addToString = (string: string): string => {
  if (string.length === 3) {
    return string;
  } else if (string.length === 2) {
    return "0" + string;
  } else {
    return "00" + string;
  }
};

export { addToString };
