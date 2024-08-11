import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((e) => [...e, item]);
    console.log(items);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 👜</h1>;
}

function Form({ onAddItems }) {
  const [desc, setDesc] = useState("");
  const [quan, setQuan] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!desc) return;

    const newItem = { description: desc, quantity: quan, packed: false, id: Date.now() };
    onAddItems(newItem);

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

function PackingList({ items }) {
  return (
    <div className="list">
      <ul>
        {items.map((element) => {
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
