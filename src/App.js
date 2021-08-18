import React, { useState } from 'react';
import './App.css';
import { coffees as coffeeData, desserts as dessertData } from './data.js';
import { ListSort } from './ListSort';

function App() {
  const [coffees, setCoffees] = useState(coffeeData);
  const [desserts, setDesserts] = useState(dessertData);

  return (
    <div className="app">
      <div className="list">
        <ListSort
          items={coffees}
          setItems={setCoffees}
          renderItem={item => (<div>
            <div className="title">{item.blend_name}</div>
            <div className="desc">{item.origin}</div>
          </div>)} />
      </div>
      
      <div className="list">
        <ListSort
          items={desserts}
          setItems={setDesserts}
          renderItem={item => (<div>
            <div className="title">{item.variety}</div>
            <div className="desc">{item.topping}</div>
          </div>)} />
      </div>
    </div>
  );
}

export default App;
