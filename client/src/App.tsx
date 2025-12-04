import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import {
  Homepage,
  IndividualCardPage,
  LoginPage,
  RegisterPage,
} from "./pages/";
import { Nav } from "./components/";
import "./App.css";

function App(): JSX.Element {
  // const [isAuth, setIsAuth] = useState<boolean>(false);
  // const checkAuth = async (): Promise<void> => {
  //   const response = await fetch(
  //     "https://lotr-mtg-collector.onrender.com/users/isUserAuth",
  //     {
  //       credentials: "include",
  //     }
  //   );
  //   response.status === 200 ? setIsAuth(true) : setIsAuth(false);
  // };

  // useEffect(() => {
  //   checkAuth();
  // }, []);

  return (
    <Routes>
     
        <>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<RegisterPage />} />
        </>
    
    </Routes>
  );
}

export default App;
