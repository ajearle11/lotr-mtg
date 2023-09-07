// import { useState } from "react";

import "./App.css";

function App() {
  interface Hello {
    statement: string;
  }

  const showCards = (number: number, statement: Hello): string => {
    return number + 1 + statement.statement;
  };

  let helloObj = { statement: "Hiya" };

  return (
    <>
      <p>{showCards(1, helloObj)}</p>
    </>
  );
}

export default App;
