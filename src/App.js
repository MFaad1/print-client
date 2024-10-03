import React from "react";
import RouterNavigation from "./config/router/navigation";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const App = () => {
  return (
    <div>
      <RouterNavigation />
      <ToastContainer />
    </div>
  );
};
export default App;
