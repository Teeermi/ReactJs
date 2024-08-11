import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import { PackingList } from "./PackingList";
import { Stats } from "./Stats";

function App() {
  const [items, setItems] = useState([]); //tworzymy state z rzeczami w tabeli

  function handleAddItems(item) {
    // tutaj tworzymy funckje ktora doda item do tabeli
    setItems((e) => [...e, item]); //rozbijamy tabele po czym dodajemy nowy item,
  }
  function handleDeleteItem(id) {
    // tworzymy funkcje z usuwaniem itemu
    setItems((e) => items.filter((i) => i.id !== id)); //jesli znajdzie id takie same jakie przeslalismy to usunie to zwroci wszystko oprocz tej rzeczy
  }
  function handleToggleItem(id) {
    //kiedy ktos kliknie checbox to wysle nam id ktore kliknal
    //pozniej uzywamy mapa na wsszystkich itemach i jesli
    // nasz id jest rowne z element.id to zwroci nowy object ze
    // zmieninym packed a jesli nie to zwroci po prostu object
    setItems((e) => items.map((i) => (i.id === id ? { ...i, packed: !i.packed } : i)));
  }

  function handleDeleteItems() {
    //usuwanie calej tabeli
    const confirmed = window.confirm("You want to delete all?");

    if (!confirmed) return;
    setItems([]);
  }

  // tutaj podajemy wszystkie funckje do naszych komponentow
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
