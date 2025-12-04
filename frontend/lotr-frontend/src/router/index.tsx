import { Routes, Route } from "react-router";
import { Homepage, Layout } from "../pages";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
