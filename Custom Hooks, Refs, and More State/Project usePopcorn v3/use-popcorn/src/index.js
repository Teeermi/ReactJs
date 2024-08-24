import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import StarRating from "./StarRating";

// function Test() {
//   const [movieRating, setMovieRating] = useState(0);
//   return (
//     <div>
//       <StarRating maxRating={5} defaultRating={10} onSetRating={10} setMovieRating={setMovieRating} />
//       <p>Rating set to {movieRating}</p>
//     </div>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating maxRating={5} messeges={["Terrible", "bad", "okay", "good", "amazing"]} />
    <StarRating maxRating={5} defaultRating={5} onSetRating={10} /> */}
    {/* <Test /> */}
  </React.StrictMode>
);
