import { useState } from "react";
import { Item } from "./Item";

export function PackingList({ items, onDeleteItem, onToggleItem, onDeleteItems }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItem;

  if (sortBy === "input") sortedItem = items;

  if (sortBy === "description") {
    sortedItem = items.slice().sort((a, b) => a.description.localeCompare(b.description));
  }

  if (sortBy === "packed") {
    sortedItem = items.slice().sort((a, b) => +a.packed - +b.packed);
  }

  return (
    <>
      <div className="list">
        <ul>
          {sortedItem.map((element) => {
            return <Item element={element} key={element.id} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} />;
          })}
        </ul>

        <div className="actions">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value={"input"}>Sort by the input</option>
            <option value={"description"}>by description</option>
            <option value={"packed"}>by packed</option>
          </select>
          <button onClick={onDeleteItems}>Clear list</button>
        </div>
      </div>
    </>
  );
}
