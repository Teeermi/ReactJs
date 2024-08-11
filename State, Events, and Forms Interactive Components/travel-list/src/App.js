import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((e) => [...e, item]);
    console.log(items);
  }
  function handleDeleteItem(id) {
    setItems((e) => items.filter((i) => i.id !== id));
  }
  function handleToggleItem(id) {
    //kiedy ktos kliknie checbox to wysle nam id ktore kliknal
    //pozniej uzywamy mapa na wsszystkich itemach i jesli
    // nasz id jest rowne z element.id to zwroci nowy object ze
    // zmieninym packed a jesli nie to zwroci po prostu object
    setItems((e) => items.map((i) => (i.id === id ? { ...i, packed: !i.packed } : i)));
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} />
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

function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((element) => {
          return <Item element={element} key={element.id} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} />;
        })}
      </ul>
    </div>
  );
}

function Item({ element, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={element.packed}
        onChange={() => {
          onToggleItem(element.id);
        }}
      ></input>
      <span style={element.packed ? { textDecoration: "line-through" } : {}}>
        {element.quantity} {element.description}
      </span>
      <button onClick={(e) => onDeleteItem(element.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return <footer className="stats">You Have</footer>;
}

export default App;
