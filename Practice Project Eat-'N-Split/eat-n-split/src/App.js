import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [showForm, setShowForm] = useState(false);

  function handlerShowForm() {
    setShowForm((e) => !e);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        {showForm && <FormAddFriend />}
        <Button onClick={handlerShowForm}>{showForm ? "Close" : "Add friend"}</Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendsList() {
  const friends = initialFriends;
  return (
    <ul>
      {friends.map((e) => (
        <Friend friend={e} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && <p className="red">You own money</p>}
      {friend.balance > 0 && <p className="green">Own you a money</p>}
      {friend.balance === 0 && <p className="grey">Even</p>}

      <Button>Select</Button>
    </li>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label>👤Friend name</label>
      <input type="text"></input>

      <label>📷 Image url</label>
      <input type="text" />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>

      <label>💷 Bill value</label>
      <input type="text" />

      <label>💷 Your cost</label>
      <input type="text" />

      <label>💷 X</label>
      <input type="text" disabled />

      <label>💰 Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>

      <Button>Add</Button>
    </form>
  );
}
