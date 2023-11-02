import React, { Component } from 'react';
import axios from 'axios';
import OrdersList from './Components/OrdersList';
import orders from './data/data';

class App extends Component {
  state = {
    orders: orders
  }

  componentDidMount() {
    this.fetchOrders();
  }

  fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/orders');
      this.setState({ orders: response.data });
    } catch (error) {
      console.error('Error fetching orders', error);
    }
  }

  handleStatusChange = () => {
    this.fetchOrders();
  }

  render() {
    return (
      <div className="App">
        <h1>Kitchen IO</h1>
        <OrdersList orders={this.state.orders} onStatusChange={this.handleStatusChange} />
      </div>
    );
  }
}

export default App;
