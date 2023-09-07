import { Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/";
import "./App.css";

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      {/* <Route path="/summary" element={<FinalPage />} /> */}
    </Routes>
  );
}

export default App;
