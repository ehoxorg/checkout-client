import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import Baskets from './Baskets';

class App extends Component {

  render(){

  const createBasket = () => {
    var targetUrl ='http://localhost:8090/baskets/'
    const res= fetch(targetUrl,{
        method: 'POST',
        headers: {
                    'Content-Type': "application/json; charset=utf-8",
        },
        body: []
    }, { mode: 'no-cors'})
    .then(response => console.log(response.json()))
    .catch(error =>{
            console.log(error)
        });

  };
 
  return (
    <div>
      <h1>Checkout Client</h1>
      <ol>
        <li>
          <span>TOTAL: </span>
          <span className="total">25.00</span>
        </li>
      </ol>
     <Baskets/>
      <button onClick={createBasket}>New Basket</button>
    </div>
  );
}
}
export default App;
