import { Routes, Route } from "react-router";
import { Homepage, IndividualCardPage, Layout, LoginPage } from "../pages";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="/cards/:id" element={<IndividualCardPage />} />
        <Route path="login" element={<LoginPage login/>} />
        <Route path="signup" element={<LoginPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
