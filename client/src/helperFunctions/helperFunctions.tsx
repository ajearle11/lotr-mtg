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
      default:
        color = "Colourless";
        break;
    }

    valueToPrint = valueToPrint + color + " ";
  });

  return valueToPrint.trimEnd();
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
  string: string | null,
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
  string: string | null,
  cards: ApiResponseDataArray
): ApiResponseDataArray => {
  if (string === "/src/public/Multicolored.png") {
    console.log("ya");
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
    return cards.filter((card) => card.type.includes("Land"));
  }
};

const checkActiveSymbolFilters = (): boolean[] => {
  const container = document.querySelectorAll(".symbol-circle");
  const array: boolean[] = [];
  container.forEach((element: Element): void => {
    if (element.classList.contains("active-filter")) {
      array.push(true);
    } else {
      array.push(false);
    }
  });
  return array;
};

const checkActiveColorFilters = (): boolean[] => {
  const container = document.querySelectorAll(".symbol-circle-colors");
  const array: boolean[] = [];
  container.forEach((element: Element): void => {
    if (element.classList.contains("active-filter")) {
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
};
