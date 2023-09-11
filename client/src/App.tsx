import { Routes, Route } from "react-router-dom";
import { Homepage, IndividualCardPage } from "./pages/";
import "./App.css";

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/:id" element={<IndividualCardPage />} />
    </Routes>
  );
}

export default App;
