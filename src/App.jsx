import React from 'react';
import { useState } from 'react';


const groceryItems = [
  {
    id: 1,
    name: 'Kopi Bubuk',
    quantity: 2,
    checked: true,
  },
  {
    id: 2,
    name: 'Gula Pasir',
    quantity: 5,
    checked: false,
  },
  {
    id: 3,
    name: 'Air Mineral',
    quantity: 3,
    checked: false,
  },
];


function Header() {
  return <h1>Catatan Belanjaku 📝</h1>;
}


function Form({onAddItem}) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);

  const quantityNum = [...Array(10)].map((_, i) => (
    <option value={i+1} key={i+1}>{i+1}</option>
  ));


  function handleSubmit(e) {
    e.preventDefault();

    if (!name) return
    const newItem = {
      name:name, quantity:quantity, checked: false, id:Date.now(),
    }; 

    onAddItem(newItem);

    // console.log(newItem);
    setName('')
    setQuantity(1)
    
  }

  return(
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Hari ini belanja apa kita?</h3>
      <div>
        <select onChange={(e) => setQuantity(Number(e.target.value))}>{quantityNum}</select>
        <input type="text" placeholder="nama barang..." value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <button>Tambah</button>
    </form>
  );
}

function Item({item, onDeleteItem, onToggleItem}) {
  return(
    <li key={item.id}>
      <input type="checkbox" checked={item.checked} onChange={() => onToggleItem(item.id)} />
        <span style={item.checked ? { textDecoration: 'line-through' } : {}}>
          {item.quantity} {item.name}
        </span>
      <button onClick={() => onDeleteItem(item.id)}>&times;</button>
    </li>
  );
}


function GroceryList({items, onDeleteItem, onToggleItem, onClearItems}){
  const [sortBy, setSortBy] = useState('input');

  let sortedItems;

  switch (sortBy) {
    case 'name':
      sortedItems = items.slice().sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'checked':
      sortedItems = items.slice().sort((a, b) => a.checked - b.checked);
      break;
    default:
      sortedItems = items;
      break;
  }
  return(
    <>
      <div className="list">
        <ul>
          {sortedItems.map((item) => (
            <Item item={item} key={item.id} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem}/>
          ))}
        </ul>
      </div>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Urutkan berdasarkan urutan input</option>
          <option value="name">Urutkan berdasarkan nama barang</option>
          <option value="checked">Urutkan berdasarkan ceklis</option>
        </select>
        <button onClick={onClearItems}>Bersihkan Daftar</button>
      </div>
    </>
  );
}



function Footer({items}) {
  if (items.length === 0) return <footer className='stats'>Daftar Belanja Masih</footer>
  const totalItems = items.length;
  const checkedItems = items.filter((item) => item.checked).length;
  const precentage = Math.round((checkedItems / totalItems) * 100);
  return <footer className="stats">Ada {totalItems} barang di daftar belanjaan, {checkedItems} barang sudah dibeli {precentage}%</footer>
}



function App() {
  

  // memasukan groceryItems kedalam isi dan menjadi agar isi items menjadi groceryItems
  const [items, setItems] = useState(groceryItems);

  // memasukan item kedalam items
  function handleAddItem(item) {
    // console.log([...items, item])
    // set items jadi item
    setItems([...items, item])
  }

  function handleToggleItem(id) {
    setItems((items) => items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)));
  }

  

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }


  function handleClearItems() {
    setItems([]);
  }

  return (
    <div className="app">
      <Header/>
      <Form onAddItem={handleAddItem}/>
      <GroceryList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} onClearItems={handleClearItems}/>
      <Footer items={items} />
    </div>
  );
}

export default App;

// 1:10:12   : https://www.youtube.com/watch?v=HX2kAHnCEjY
