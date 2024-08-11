import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import { PackingList } from "./PackingList";
import { Stats } from "./Stats";

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

  function handleDeleteItems() {
    const confirmed = window.confirm("You want to delete all?");

    if (!confirmed) return;
    setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} onDeleteItems={handleDeleteItems} />
      <Stats items={items} />
    </div>
  );
}

export default App;
