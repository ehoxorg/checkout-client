import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, {Component} from 'react';
import Baskets from './Baskets';
import {Form, Col, Row, Container, Button}  from 'react-bootstrap';

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
    var targetUrl = "http://localhost:8090/baskets/"
    +this.state.basketNumber+"/products/"+this.state.product+"/";
    fetch(targetUrl ,{
      method: 'PUT',
      headers: {
                  'Content-Type': "application/json; charset=utf-8",
      },
      body: []
  })
      .then(res => res.json())
      .then(
        (result) => {
          if(result == null){
            this.setState({
              isLoaded: true
            });
          } else {
            console.log(result);
            var updatedBaskets = this.state.baskets;
            updatedBaskets[this.state.basketNumber] = result;
            this.setState({
              isLoaded: true,
              baskets: updatedBaskets
            });
          }
          
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
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
    <Container fluid>
      <Row>
        <Col>
          <h1>Checkout Client</h1>
        </Col>
      </Row>
      <Row>
        <Col style={{textAlign: "center"}}>
          <Button block variant="primary" size="lg" onClick={createBasket}>New Basket</Button>
        </Col>
      </Row>
      <Row>
        <Col style={{textAlign: "center"}}>
          <h2>Baskets Available</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Baskets baskets={this.state.baskets}/>
        </Col>
      </Row>
      <Row>
        <Col style={{textAlign: "center"}}>
          <h2>Add Item to Basket</h2>
        </Col>
      </Row>
      <Form onSubmit={e => { e.preventDefault(); }}>
      <Form.Group>
      <Form.Label for="baskets">Choose a basket: </Form.Label>
      <Form.Control as="select" name="baskets" onChange={this.handleBasketSelectChange} id="baskets">
        {this.state.baskets.map((basket, index) => (
          <option value={index}>Basket no. {index+1}</option>
        ))}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label for="products">Choose a product: </Form.Label>
        <Form.Control as="select" onChange={this.handleProductSelectChange} name="products" id="products">
          <option value="1">Pen</option>
          <option value="2">Tshirt</option>
          <option value="3">Mug</option>
        </Form.Control>
      </Form.Group>
      <Button block variant="primary" onClick={this.addProduct}>Add Item</Button>
      </Form>
    </Container>
  );
}


}
export default App;
