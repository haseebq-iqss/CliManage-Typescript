import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Landing from "../pages/Landing/Landing";
import Project from "../pages/Project/Project";
import NotFound from "../pages/NotFound/NotFound";

function MainNavigator() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/project/:pid" element={<Project />} />
      </Routes>
    </AnimatePresence>
  );
}

export default MainNavigator;
