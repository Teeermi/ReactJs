import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
import StarRating from "./StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating maxRating={5} messeges={["Terrible", "bad", "okay", "good", "amazing"]} />
    <StarRating maxRating={5} defaultRating={10} onSetRating={10} />
  </React.StrictMode>
);
