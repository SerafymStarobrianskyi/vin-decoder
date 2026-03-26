import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import VariablesPage from "./pages/VariablesPage";
import VariableDetailsPage from "./pages/VariableDetailsPage";

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/variables" element={<VariablesPage />}/>
      <Route path="/variables/:variableId" element={<VariableDetailsPage/>} />
    </Routes>
  )
}