import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Survey from "./pages/Survey";
import ViewSurveys from "./pages/ViewSurveys";
import EditSurvey from "./pages/EditSurvey";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/survey/:id/edit" element={<EditSurvey />} />   {/* edit */}
        <Route path="/surveys" element={<ViewSurveys />} />
      </Routes>
    </>
  );
}
