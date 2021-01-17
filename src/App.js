import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import Baskets from './Baskets';

class App extends Component {

  state = {
    baskets: []
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
          console.log(this.state);
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
    </div>
  );
}
}
export default App;
