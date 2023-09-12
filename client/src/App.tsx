// import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Homepage, IndividualCardPage, LoginPage } from "./pages/";
import "./App.css";

function App(): JSX.Element {
  // const checkAuth = async (): Promise<void> => {
  //   const response = await fetch("http://localhost:3000/users/isUserAuth");
  //   const data = await response.json();
  //   console.log(data);
  // };

  // useEffect(() => {
  //   checkAuth();
  // }, []);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/register" element={<RegisterPage />} /> */}
      <Route path="/" element={<Homepage />} />
      <Route path="/:id" element={<IndividualCardPage />} />
    </Routes>
  );
}

export default App;
