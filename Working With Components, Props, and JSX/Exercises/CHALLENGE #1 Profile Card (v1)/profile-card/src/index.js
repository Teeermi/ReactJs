import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function App() {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />
        {/* Should contain one Skill component
        for each web dev skill that you have,
        customized with props */}
        <SkillList />
      </div>
    </div>
  );
}

function Avatar() {
  return <img className="avatar" src="https://i.redd.it/kfonn294tw4c1.jpg" alt="" />;
}

function Intro() {
  return (
    <div>
      <h1>Olaf Krawczyk</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt repellat corrupti rem doloremque quibusdam perspiciatis sint laudantium consequatur,
        cumque inventore harum quas, iste ea est sed quasi, quo qui quia?
      </p>
    </div>
  );
}

function SkillList(params) {
  return (
    <div className="skill-list">
      <Skill name="HTML" color="red" />
      <Skill name="CSS" color="blue" />
      <Skill name="JavaScript" color="purple" />
      <Skill name="ReactJs" color="yellow" />
      <Skill name="Github" color="green" />
    </div>
  );
}

function Skill(params) {
  return (
    <div className="skill" style={{ backgroundColor: params.color }}>
      {params.name}
    </div>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
