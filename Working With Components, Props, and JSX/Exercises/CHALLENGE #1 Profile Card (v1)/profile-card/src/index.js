import React from "react"; //importujemy reacta
import ReactDOM from "react-dom/client"; //importujemy react dom
import "./styles.css"; //importujemy css

const skills = [
  {
    skill: "HTML+CSS",
    level: "advanced",
    color: "#2662EA",
  },
  {
    skill: "JavaScript",
    level: "advanced",
    color: "#EFD81D",
  },
  {
    skill: "Web Design",
    level: "advanced",
    color: "#C3DCAF",
  },
  {
    skill: "Git and GitHub",
    level: "intermediate",
    color: "#E84F33",
  },
  {
    skill: "React",
    level: "advanced",
    color: "#60DAFB",
  },
  {
    skill: "Svelte",
    level: "beginner",
    color: "#FF3B00",
  },
];

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

function SkillList() {
  return (
    <div className="skill-list">
      <Skill />
    </div>
  );
}

function Skill() {
  return skills.map((element) => (
    <div className="skill" style={{ backgroundColor: element.color }}>
      {element.level === "advanced" ? "ADV " : ""}
      {element.level === "intermediate" ? "INT " : ""}
      {element.level === "beginner" ? "BEG " : ""}
      {element.skill}
    </div>
  ));
}

const root = ReactDOM.createRoot(document.getElementById("root")); // tutaj tworzymy root

//i renderujemy root na naszym appie
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
