export function Stats({ items }) {
  if (!items.length)
    return (
      <footer className="stats">
        {" "}
        <em>You need to add sth to list</em>;
      </footer>
    );

  const itemsPacked = items.filter((item) => item.packed).length;
  const itemsPercent = (itemsPacked / items.length) * 100;
  console.log(itemsPercent);

  return (
    <footer className="stats">
      {itemsPercent === 100 ? (
        "You got everything, ready to go!"
      ) : (
        <em>
          {" "}
          You Have {items.length} items on your list, you already packed {itemsPacked}, {!itemsPercent ? "0" : itemsPercent.toFixed(0)}%
        </em>
      )}
    </footer>
  );
}
