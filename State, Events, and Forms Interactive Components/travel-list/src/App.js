import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 👜</h1>;
}

function Form() {
  const [desc, setDesc] = useState("");
  const [quan, setQuan] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    const newItem = { description: desc, quantity: quan, packed: false, id: Date.now() };

    if (!desc) return;

    setDesc("");
    setQuan(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for trip</h3>
      <select value={quan} onChange={(e) => setQuan(+e.target.value)}>
        {Array.from({ length: 20 }, (nar, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input type="text" placeholder="Item..." value={desc} onChange={(e) => setDesc(e.target.value)}></input>
      <button>Add</button>
    </form>
  );
}

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((element) => {
          return <Item element={element} key={element.id} />;
        })}
      </ul>
    </div>
  );
}

function Item({ element }) {
  return (
    <li>
      <span style={element.packed ? { textDecoration: "line-through" } : {}}>
        {element.quantity} {element.description}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats() {
  return <footer className="stats">You Have</footer>;
}

export default App;
