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
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const checkAuth = async (): Promise<void> => {
    const response = await fetch("http://localhost:3000/users/isUserAuth", {
      credentials: "include",
    });
    response.status === 200 ? setIsAuth(true) : setIsAuth(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Nav />}>
        {/* <Route path="/register" element={<RegisterPage />} /> */}
        <Route index element={isAuth ? <Homepage /> : <LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/:id"
          element={isAuth ? <IndividualCardPage /> : <LoginPage />}
        />
      </Route>
    </Routes>
  );
}

export default App;
