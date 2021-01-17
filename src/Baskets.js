import React, { Component } from 'react';

class Baskets extends Component {
 
  render(){
        var baskets = this.props.baskets;
        return (
          <table>
            <tr>
              <th>Basket Number</th>
              <th>Total Pens</th>
              <th>Total Tshirts</th>
              <th>Total Mugs</th>
              <th>Basket Balance</th>
              <th>Delete</th>
            </tr>
            {baskets.map((basket, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{getPenNumber(basket.Items)}</td>
                <td>{getTshirtNumber(basket.Items)}</td>
                <td>{getMugsNumber(basket.Items)}</td>
                <td>{basket.Total}</td>
                <td><button onClick={() => this.deleteRow(index)}>Delete</button></td>

              </tr>
            ))}
          </table>
        );
  }

  deleteRow(index) {
    this.props.baskets.splice(index, 1);
    this.setState({});
    this.deleteBasket(index);
  }

  deleteBasket(index){
    var targetUrl ="http://localhost:8090/baskets/"+index+"/";
    const res= fetch(targetUrl,{
        method: 'DELETE',
        headers: {
                    'Content-Type': "application/json; charset=utf-8",
        },
        body: []
    })
    .then(res => res.json())
    .then(
      (result) => {
        if(result != null){
          console.log(result);
        }
    })
    .catch(error =>{
            console.log(error)
        });
  
  }
}

function getPenNumber(items){
  if(items == undefined)
    return 0;
  const pens = items.filter(item => item.ProductName === 'Pen');
  var pensCount = pens.length;
  return pensCount;
}

function getTshirtNumber(items){
  if(items == undefined)
    return 0;

  const tshirts = items.filter(item => item.ProductName === 'Tshirt');
  var tshirtsCount = tshirts.length;
  return tshirtsCount;
}

function getMugsNumber(items){
  if(items == undefined)
    return 0;
  const mugs = items.filter(item => item.ProductName === 'Mug');
  var mugsCount = mugs.length;
  return mugsCount;
}
  export default Baskets;