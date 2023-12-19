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
      case "white":
        color = "White";
        break;
      case "red":
        color = "Red";
        break;
      case "blue":
        color = "Blue";
        break;
      case "black":
        color = "Black";
        break;
      case "green":
        color = "Green";
        break;
      case "multicolored":
        color = "multicolored";
        break;
      case "artifact":
        color = "artifact";
        break;
      case "land":
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

//FIX THIS TO BE THE NEW URLS
const convertSymbol = (symbol: string): string => {
  switch (symbol) {
    case "mythic":
      symbol = "mythic";
      break;
    case "rare":
      symbol = "rare";
      break;
    case "uncommon":
      symbol = "uncommon";
      break;
    case "common":
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
  if (string === "mythic") {
    return cards.filter((card) => card.rarity === "Mythic");
  } else if (string === "rare") {
    return cards.filter((card) => card.rarity === "Rare");
  } else if (string === "uncommon") {
    return cards.filter((card) => card.rarity === "Uncommon");
  } else if (string === "common") {
    return cards.filter((card) => card.rarity === "Common");
  } else if (string === "multi") {
    return cards.filter((card) => (card.color || []).length > 1);
  } else if (string === "black") {
    return cards.filter((card) => (card.color || []).includes("B"));
  } else if (string === "white") {
    return cards.filter((card) => (card.color || []).includes("W"));
  } else if (string === "blue") {
    return cards.filter((card) => (card.color || []).includes("U"));
  } else if (string === "green") {
    return cards.filter((card) => (card.color || []).includes("G"));
  } else if (string === "red") {
    return cards.filter((card) => (card.color || []).includes("R"));
  } else if (string === "artifact") {
    return cards.filter((card) => card.type.includes("Artifact"));
  } else {
    return cards.filter((card) => card.type.includes("Land"));
  }
};

const checkActiveFilters = (selector: string): (string | null | boolean)[] => {
  const container = document.querySelectorAll(selector);
  return Array.from(container).map(
    (element: Element): string | null | boolean => {
      if (element.classList.contains("active-filter")) {
        let childNode = element.childNodes[0] as HTMLButtonElement;
        return childNode.getAttribute("class");
      }
      return false;
    }
  );
};

const removeActiveFilters = (selector: string): void => {
  const container = document.querySelectorAll(selector);
  container.forEach((element: Element): void => {
    if (element.classList.contains("active-filter")) {
      element.classList.remove("active-filter");
    }
  });
};

const toggleActive = (
  e: Event | undefined,
  isActive: boolean,
  filteredCards: ApiResponseDataArray,
  cards: ApiResponseDataArray,
  setFilteredCards: React.Dispatch<React.SetStateAction<ApiResponseDataArray>>,
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>,
  type: "color" | "symbol"
) => {
  const target = e?.target as HTMLButtonElement;
  const parentNode = target.parentNode as HTMLButtonElement;
  const childNode = target.childNodes[0] as HTMLButtonElement;

  let attributeValue: string | null =
    target.getAttribute("src") || childNode.getAttribute("src");
  const activeFilterElement = target.getAttribute("src") ? parentNode : target;
  let filterType = type === "color" ? "-colors" : "";

  if (activeFilterElement.classList.contains("active-filter")) {
    setIsActive(false);
    if (isActive) {
      setFilteredCards(cards);
    } else {
      let alreadyFiltered = checkActiveFilters(
        `.symbol-circle${filterType}`
      ).filter((type) => typeof type === "string");
      let alreadyFilteredValue = alreadyFiltered[0];
      setFilteredCards(attributeFilter(alreadyFilteredValue, cards));
    }
  } else {
    setIsActive(true);
    if (checkActiveFilters(`.symbol-circle${filterType}`).includes(true)) {
      removeActiveFilters(`.symbol-circle${filterType}`);
    }

    let arr = [...filteredCards, ...attributeFilter(attributeValue, cards)];
    let newArr = [...new Set(arr)];

    newArr.sort(function (a, b) {
      return a.id - b.id;
    });
    let secondaryFilteredArray = attributeFilter(attributeValue, newArr);
    let alreadyFiltered = checkActiveFilters(
      `.symbol-circle${filterType}`
    ).filter((type) => typeof type === "string");
    let fullyFilteredArray = attributeFilter(
      alreadyFiltered[0],
      secondaryFilteredArray
    );
    setFilteredCards(fullyFilteredArray);
  }

  activeFilterElement.classList.toggle("active-filter");
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
  removeActiveFilters,
  checkActiveFilters,
  toggleActive,
  buttonColorSelector,
  buttonSymbolSelector,
  convertSymbol,
};
