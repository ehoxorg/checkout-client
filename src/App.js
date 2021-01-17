import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import Baskets from './Baskets';

class App extends Component {



  constructor(props) {
    super(props);

    this.state = {
      baskets: [],
      product: 1, 
      basketNumber: 0
    }

    this.handleProductSelectChange = this.handleProductSelectChange.bind(this);
    this.handleBasketSelectChange = this.handleBasketSelectChange.bind(this);
    this.addProduct = this.addProduct.bind(this);
  }

  addProduct() {
    console.log("product: " + this.state.product);
    console.log("basketNumber: " + this.state.basketNumber);
  }

  handleProductSelectChange(e) {
    this.setState({product: e.target.value});
  }
  
  handleBasketSelectChange(e) {
    this.setState({basketNumber: e.target.value});
  }
 


  componentDidMount() {
    fetch("http://localhost:8090/baskets/")
      .then(res => res.json())
      .then(
        (result) => {
          if(result == null){
            this.setState({
              isLoaded: true,
              baskets: []
            });
          } else {
            console.log(result);
            this.setState({
              isLoaded: true,
              baskets: result
            });
          }
          
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }




 

  render(){

  const createBasket = () => {
    var targetUrl ='http://localhost:8090/baskets/'
    const res= fetch(targetUrl,{
        method: 'POST',
        headers: {
                    'Content-Type': "application/json; charset=utf-8",
        },
        body: []
    })
    .then(res => res.json())
    .then(
      (result) => {
        if(result != null){
          var newBaskets = this.state.baskets;
          newBaskets.push(result);
          this.setState({baskets: newBaskets});
        }
    })
    .catch(error =>{
            console.log(error)
        });

  };
 
  return (
    <div>
      <h1>Checkout Client</h1>
      <h2>Baskets Available</h2>
     <Baskets baskets={this.state.baskets}/>
      <button onClick={createBasket}>New Basket</button>
      <h2>Add Item to Basket</h2>
      <form onSubmit={e => { e.preventDefault(); }}>
      <div>
      <label for="baskets">Choose a basket: </label>
        <select name="baskets" onChange={this.handleBasketSelectChange} id="baskets">
        {this.state.baskets.map((basket, index) => (
          <option value={index}>Basket no. {index+1}</option>
        ))}
        </select>
      </div>
      <div>
        <label for="products">Choose a product: </label>
        <select onChange={this.handleProductSelectChange} name="products" id="products">
          <option value="1">Pen</option>
          <option value="2">Tshirt</option>
          <option value="3">Mug</option>
        </select>
      </div>
      <button onClick={() => this.addProduct()}>Add Item</button>
      </form>
    </div>
  );
}


}
export default App;
