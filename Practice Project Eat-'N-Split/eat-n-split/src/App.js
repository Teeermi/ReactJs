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
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState("");

  function handlerShowForm() {
    setShowForm((e) => !e);
  }

  function handleAddFriend(friend) {
    console.log();
    setFriends((e) => [...e, friend]);
    handlerShowForm();
  }

  function handleSelection(friend) {
    setSelectedFriend((selected) => (selected.id === friend.id ? "" : friend));
    setShowForm(false);
  }

  function handleSplitBill(value) {
    setFriends((friends) => friends.map((f) => (f.id === selectedFriend.id ? { ...f, balance: f.balance + value } : f)));
    setSelectedFriend("");
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} handleSelection={handleSelection} selectedFriend={selectedFriend} />
        {showForm && <FormAddFriend handleAddFriend={handleAddFriend} />}
        <Button onClick={handlerShowForm}>{showForm ? "Close" : "Add friend"}</Button>
      </div>

      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} handleSplitBill={handleSplitBill} />}
    </div>
  );
}

function FriendsList({ friends, handleSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map((e) => (
        <Friend friend={e} selectedFriend={selectedFriend} handleSelection={handleSelection} />
      ))}
    </ul>
  );
}

function Friend({ friend, handleSelection, selectedFriend }) {
  const isSelected = friend.id === selectedFriend.id;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && <p className="red">You own money</p>}
      {friend.balance > 0 && <p className="green">Own you a money</p>}
      {friend.balance === 0 && <p className="grey">Even</p>}

      <Button onClick={() => handleSelection(friend)}>{isSelected ? "Close" : "Select"}</Button>
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

function FormAddFriend({ handleAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();

    const newFriend = {
      name,
      image: `${image}?=${id}`,
      balance: 0,
      id,
    };
    handleAddFriend(newFriend);

    setImage("https://i.pravatar.cc/48");
    setName("");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👤Friend name</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>

      <label>📷 Image url</label>
      <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend, handleSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  const paidByFriend = bill - paidByUser;

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !paidByUser) return;
    handleSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💷 Bill value</label>
      <input type="text" value={bill} onChange={(e) => setBill(+e.target.value)} />

      <label>💷 Your cost</label>
      <input type="text" value={paidByUser} onChange={(e) => setPaidByUser(+e.target.value > bill ? paidByUser : +e.target.value)} />

      <label>💷 {selectedFriend.name} expenses</label>
      <input type="text" disabled value={paidByFriend} />

      <label>💰 Who is paying the bill</label>
      <select value={whoIsPaying} onChange={(e) => setWhoIsPaying(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Add</Button>
    </form>
  );
}