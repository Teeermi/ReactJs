export function Item({ element, onDeleteItem, onToggleItem }) {
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
