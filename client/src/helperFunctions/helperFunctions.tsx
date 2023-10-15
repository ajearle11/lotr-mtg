import OneRingLoad from "../public/one-ring-load.gif";
import { ApiResponseDataArray } from "../interfaces/";

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
      case "M":
        color = "multicolored";
        break;
      case "A":
        color = "artifact";
        break;
      case "L":
        color = "land";
        break;
      default:
        color = "colorless";
        break;
    }

    valueToPrint = valueToPrint + color + " ";
  });

  return valueToPrint.trimEnd();
};

const convertSymbol = (symbol: string): string => {
  switch (symbol) {
    case "m":
      symbol = "mythic";
      break;
    case "r":
      symbol = "rare";
      break;
    case "u":
      symbol = "uncommon";
      break;
    case "c":
      symbol = "common";
      break;
    default:
      symbol = "";
      break;
  }

  return symbol;
};

const loadingAnimation = (): JSX.Element => {
  return (
    <div
      style={{
        height: "calc(100vh - 150px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        style={{
          width: "250px",
          height: "250px",
          borderRadius: "1000px",
        }}
        src={OneRingLoad}
      />
    </div>
  );
};

const attributeFilter = (
  string: string | null | boolean,
  cards: ApiResponseDataArray
): ApiResponseDataArray => {
  if (string === "/src/public/ltr-m.png") {
    return cards.filter((card) => card.rarity === "Mythic");
  } else if (string === "/src/public/ltr-r.png") {
    return cards.filter((card) => card.rarity === "Rare");
  } else if (string === "/src/public/ltr-u.png") {
    return cards.filter((card) => card.rarity === "Uncommon");
  } else {
    return cards.filter((card) => card.rarity === "Common");
  }
};

const colorFilter = (
  string: string | null | boolean,
  cards: ApiResponseDataArray
): ApiResponseDataArray => {
  if (string === "/src/public/Multicolored.png") {
    return cards.filter((card) => (card.color || []).length > 1);
  } else if (string === "/src/public/B.png") {
    return cards.filter((card) => (card.color || []).includes("B"));
  } else if (string === "/src/public/W.png") {
    return cards.filter((card) => (card.color || []).includes("W"));
  } else if (string === "/src/public/U.png") {
    return cards.filter((card) => (card.color || []).includes("U"));
  } else if (string === "/src/public/G.png") {
    return cards.filter((card) => (card.color || []).includes("G"));
  } else if (string === "/src/public/R.png") {
    return cards.filter((card) => (card.color || []).includes("R"));
  } else if (string === "/src/public/Artifact.png") {
    return cards.filter((card) => card.type.includes("Artifact"));
  } else {
    console.log(string)
    return cards.filter((card) => card.type.includes("Land"));
  }
};

const checkActiveSymbolFilters = (): (string | null | boolean)[] => {
  const container = document.querySelectorAll(".symbol-circle");
  const array: (string | null | boolean)[] = [];
  container.forEach((element: Element): void => {
    if (element.classList.contains("active-filter")) {
      let childNode = element.childNodes[0] as HTMLButtonElement;
      array.push(childNode.getAttribute("src"));
      array.push(true);
    } else {
      array.push(false);
    }
  });
  return array;
};

const checkActiveColorFilters = (): (string | null | boolean)[] => {
  const container = document.querySelectorAll(".symbol-circle-colors");
  const array: (string | null | boolean)[] = [];
  container.forEach((element: Element): void => {
    if (element.classList.contains("active-filter")) {
      let childNode = element.childNodes[0] as HTMLButtonElement;
      array.push(childNode.getAttribute("src"));
      array.push(true);
    } else {
      array.push(false);
    }
  });
  return array;
};

const removeActiveSymbolFilters = (): void => {
  const container = document.querySelectorAll(".symbol-circle");
  container.forEach((element: Element): void => {
    if (element.classList.contains("active-filter")) {
      element.classList.remove("active-filter");
    }
  });
};

const removeActiveColorFilters = (): void => {
  const container = document.querySelectorAll(".symbol-circle-colors");
  container.forEach((element: Element): void => {
    if (element.classList.contains("active-filter")) {
      element.classList.remove("active-filter");
    }
  });
};

const toggleActiveSymbol = (
  e: Event | undefined,
  isActiveColor: boolean,
  isActiveSymbol: boolean,
  filteredCards: ApiResponseDataArray,
  cards: ApiResponseDataArray,
  setFilteredCards: React.Dispatch<React.SetStateAction<ApiResponseDataArray>>,

  setIsActiveSymbol: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const target = e?.target as HTMLButtonElement;
  const parentNode = target.parentNode as HTMLButtonElement;
  const childNode = target.childNodes[0] as HTMLButtonElement;

  let attributeValue: string | null = "";

  if (target.getAttribute("src") === null) {
    attributeValue = childNode.getAttribute("src");

    if (target.classList.contains("active-filter")) {
      setIsActiveSymbol(false);

      if (!isActiveColor && isActiveSymbol) {
        setFilteredCards(cards);
      } else {
        let colorAlreadyFiltered = checkActiveColorFilters().filter(
          (type) => typeof type === "string"
        );
        let colorAlreadyFilteredValue = colorAlreadyFiltered[0];
        setFilteredCards(colorFilter(colorAlreadyFilteredValue, cards));
      }
    } else {
      setIsActiveSymbol(true);
      if (checkActiveSymbolFilters().includes(true)) {
        removeActiveSymbolFilters();
      }
      if (isActiveColor) {
        let arr = [...filteredCards, ...attributeFilter(attributeValue, cards)];
        let newArr = [...new Set(arr)];

        newArr.sort(function (a, b) {
          return a.id - b.id;
        });
        let secondaryFilteredArray = attributeFilter(attributeValue, newArr);
        let symbolAlreadyFiltered = checkActiveColorFilters().filter(
          (type) => typeof type === "string"
        );
        let fullyFilteredArray = colorFilter(
          symbolAlreadyFiltered[0],
          secondaryFilteredArray
        );
        setFilteredCards(fullyFilteredArray);
      } else {
        setFilteredCards(attributeFilter(attributeValue, cards));
      }
    }
  } else {
    if (parentNode.classList.contains("active-filter")) {
      setIsActiveSymbol(false);

      if (!isActiveColor && isActiveSymbol) {
        setFilteredCards(cards);
      } else {
        let colorAlreadyFiltered = checkActiveColorFilters().filter(
          (type) => typeof type === "string"
        );
        let colorAlreadyFilteredValue = colorAlreadyFiltered[0];
        setFilteredCards(colorFilter(colorAlreadyFilteredValue, cards));
      }
    } else {
      setIsActiveSymbol(true);
      attributeValue = target.getAttribute("src");
      if (checkActiveSymbolFilters().includes(true)) {
        removeActiveSymbolFilters();
      }
      if (isActiveColor) {
        let arr = [...filteredCards, ...attributeFilter(attributeValue, cards)];
        let newArr = [...new Set(arr)];
        newArr.sort(function (a, b) {
          return a.id - b.id;
        });

        let secondaryFilteredArray = attributeFilter(attributeValue, newArr);
        let symbolAlreadyFiltered = checkActiveColorFilters().filter(
          (type) => typeof type === "string"
        );
        let fullyFilteredArray = colorFilter(
          symbolAlreadyFiltered[0],
          secondaryFilteredArray
        );
        setFilteredCards(fullyFilteredArray);
      } else {
        setFilteredCards(attributeFilter(attributeValue, cards));
      }
    }
  }

  if (target.childNodes.length > 0) {
    target.classList.toggle("active-filter");
  } else {
    parentNode.classList.toggle("active-filter");
  }
};

const toggleActiveColor = (
  e: Event | undefined,
  isActiveColor: boolean,
  isActiveSymbol: boolean,
  filteredCards: ApiResponseDataArray,
  cards: ApiResponseDataArray,
  setFilteredCards: React.Dispatch<React.SetStateAction<ApiResponseDataArray>>,
  setIsActiveColor: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const target = e?.target as HTMLButtonElement;
  const parentNode = target.parentNode as HTMLButtonElement;
  const childNode = target.childNodes[0] as HTMLButtonElement;

  let attributeValue: string | null = "";

  if (target.getAttribute("src") === null) {
    attributeValue = childNode.getAttribute("src");

    if (target.classList.contains("active-filter")) {
      setIsActiveColor(false);

      if (isActiveColor && !isActiveSymbol) {
        setFilteredCards(cards);
      } else {
        let symbolAlreadyFiltered = checkActiveSymbolFilters().filter(
          (type) => typeof type === "string"
        );
        let symbolAlreadyFilteredValue = symbolAlreadyFiltered[0];
        setFilteredCards(attributeFilter(symbolAlreadyFilteredValue, cards));
      }
    } else {
      setIsActiveColor(true);
      if (checkActiveColorFilters().includes(true)) {
        removeActiveColorFilters();
      }

      if (isActiveSymbol) {
        let arr = [...filteredCards, ...colorFilter(attributeValue, cards)];
        let newArr = [...new Set(arr)];

        newArr.sort(function (a, b) {
          return a.id - b.id;
        });
        let secondaryFilteredArray = colorFilter(attributeValue, newArr);
        let symbolAlreadyFiltered = checkActiveSymbolFilters().filter(
          (type) => typeof type === "string"
        );
        let fullyFilteredArray = attributeFilter(
          symbolAlreadyFiltered[0],
          secondaryFilteredArray
        );
        setFilteredCards(fullyFilteredArray);
      } else {
        setFilteredCards(colorFilter(attributeValue, cards));
      }
    }
  } else {
    if (parentNode.classList.contains("active-filter")) {
      setIsActiveColor(false);

      if (isActiveColor && !isActiveSymbol) {
        setFilteredCards(cards);
      } else {
        let symbolAlreadyFiltered = checkActiveSymbolFilters().filter(
          (type) => typeof type === "string"
        );
        let symbolAlreadyFilteredValue = symbolAlreadyFiltered[0];
        setFilteredCards(attributeFilter(symbolAlreadyFilteredValue, cards));
      }
    } else {
      setIsActiveColor(true);
      attributeValue = target.getAttribute("src");
      if (checkActiveColorFilters().includes(true)) {
        removeActiveColorFilters();
      }

      if (isActiveSymbol) {
        let arr = [...filteredCards, ...colorFilter(attributeValue, cards)];
        let newArr = [...new Set(arr)];

        newArr.sort(function (a, b) {
          return a.id - b.id;
        });
        let secondaryFilteredArray = colorFilter(attributeValue, newArr);
        let symbolAlreadyFiltered = checkActiveSymbolFilters().filter(
          (type) => typeof type === "string"
        );
        let fullyFilteredArray = attributeFilter(
          symbolAlreadyFiltered[0],
          secondaryFilteredArray
        );
        setFilteredCards(fullyFilteredArray);
      } else {
        setFilteredCards(colorFilter(attributeValue, cards));
      }
    }
  }
  if (target.childNodes.length > 0) {
    target.classList.toggle("active-filter");
  } else {
    parentNode.classList.toggle("active-filter");
  }
};

const buttonColorSelector = (color: string) => {
  const colorContainerElements = document.querySelectorAll(
    ".symbol-circle-colors"
  ) as NodeListOf<HTMLButtonElement>;

  if (color === "white") {
    colorContainerElements[0].click();
  } else if (color === "blue") {
    colorContainerElements[1].click();
  } else if (color === "black") {
    colorContainerElements[2].click();
  } else if (color === "green") {
    colorContainerElements[3].click();
  } else if (color === "red") {
    colorContainerElements[4].click();
  } else if (color === "multicolored") {
    colorContainerElements[5].click();
  } else if (color === "artifact") {
    colorContainerElements[6].click();
  } else if (color === "land") {
    colorContainerElements[7].click();
  } else {
    null;
  }
};

const buttonSymbolSelector = (symbol: string) => {
  const symbolContainerElements = document.querySelectorAll(
    ".symbol-circle"
  ) as NodeListOf<HTMLButtonElement>;

  if (symbol === "mythic") {
    symbolContainerElements[0].click();
  } else if (symbol === "rare") {
    symbolContainerElements[1].click();
  } else if (symbol === "uncommon") {
    symbolContainerElements[2].click();
  } else if (symbol === "common") {
    symbolContainerElements[3].click();
  } else {
    null;
  }
};

export {
  addToString,
  convertColor,
  loadingAnimation,
  attributeFilter,
  checkActiveSymbolFilters,
  removeActiveSymbolFilters,
  colorFilter,
  checkActiveColorFilters,
  removeActiveColorFilters,
  toggleActiveSymbol,
  toggleActiveColor,
  buttonColorSelector,
  buttonSymbolSelector,
  convertSymbol,
};
