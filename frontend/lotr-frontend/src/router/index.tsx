import { Routes, Route, useLocation } from "react-router";
import { Homepage, IndividualCardPage, Layout, LoginPage } from "../pages";
import { AnimatePresence } from "framer-motion";
import { PageFade } from "../utils/FadeInWrapper";

const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <PageFade>
                <Homepage />
              </PageFade>
            }
          />
          <Route
            path="/cards/:id"
            element={
              <PageFade>
                <IndividualCardPage />
              </PageFade>
            }
          />
          <Route
            path="login"
            element={
              <PageFade>
                <LoginPage login />
              </PageFade>
            }
          />
          <Route
            path="signup"
            element={
              <PageFade>
                <LoginPage />
              </PageFade>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
