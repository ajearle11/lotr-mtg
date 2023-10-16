import { Routes, Route } from "react-router-dom";
import {
  Homepage,
  IndividualCardPage,
  LoginPage,
  RegisterPage,
} from "./pages/";
import { Nav } from "./components/";
import "./App.css";
import { useSelector } from "react-redux";
import { RootState } from "./store";

function App(): JSX.Element {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  return (
    <Routes>
      {!isAuth ? (
        <>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Nav />}>
            <Route index element={<Homepage />} />

            <Route path="/:id" element={<IndividualCardPage />} />
          </Route>
        </>
      )}
    </Routes>
  );
}

export default App;
