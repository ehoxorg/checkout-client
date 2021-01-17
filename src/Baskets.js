import React, {Component} from 'react';

class Baskets extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        baskets: []
      };
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
              this.setState({
                isLoaded: true,
                baskets: result.baskets
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
  
    render() {
      const { error, isLoaded, baskets: baskets } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
          <ul>
            {baskets.map(basket => (
              <li key={basket.total}>
                 {basket.items}
              </li>
            ))}
          </ul>
        );
      }
    }
  }

  export default Baskets;