import React from "react"; //importujemy reacta
import ReactDOM from "react-dom/client"; //importujemy react dom
import "./index.css"; //importujemy css

const pizzaData = [
  //tabela
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  //nasze główne miejsce robieni
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />{" "}
      {
        //rozbijamy poszególne funkcje i umiejscawiamy je w divie
      }
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1 className="header">React Pizza</h1>{" "}
      {
        //tworzymy header z napisem
      }
    </header>
  );
}

function Menu() {
  return (
    <main className="menu">
      <h2>Our Menu</h2>
      <ul className="pizzas">
        {pizzaData.map((pizza) => (
          <Pizza pizzaObj={pizza} key={pizza.name} />
        ))}
        {
          // tworzymy nasz main w którym znajduje się lista i robimy mapa przez
          //nasza tabele z danymi i dla każdego elementu robimy nowy element
          //listy
          //tylko map działa
          // nastpenie przesylamy poszegolny element tabeli
          // key jest od reacta, trzeba przeslac cos orginalnego
        }
      </ul>
    </main>
  );
}

function Pizza(props) {
  // przesylamy props z naszego mapa i na nim tworzymy element listy
  // na tym object
  return (
    <li className="pizza">
      <img src={props.pizzaObj.photoName} alt=""></img>
      <div>
        <h3>{props.pizzaObj.name}</h3>
        <p>{props.pizzaObj.ingredients}</p>
        <span>{props.pizzaObj.price}</span>
      </div>
    </li>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  console.log(isOpen);

  //tutaj sprawdzamy godzine i sprawdzamy czy jest teraz zamkniete czy otwarte

  // if (hour >= openHour && hour <= closeHour) {
  //   alert("OPEN");
  // } else {
  //   alert("CLOSE");
  // }

  return <footer className="footer"> {new Date().toLocaleTimeString()} We are open</footer>;
}

const root = ReactDOM.createRoot(document.getElementById("root")); // tutaj tworzymy root

//i renderujemy root na naszym appie
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
