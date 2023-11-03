import React, { Component } from 'react';
import axios from 'axios';
import OrdersList from './Components/OrdersList';

class App extends Component {
  state = {
    orders: []
  }

  componentDidMount() {
    this.fetchOrders();
  }

  fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/orders');
      const ordersWithItems = await Promise.all(response.data.map(async order => {
        const itemsResponse = await axios.get(`http://localhost:3000/api/orders_itens/${order.numero_transacao}`);
        order.items = itemsResponse.data;
        return order;
      }));
      this.setState({ orders: ordersWithItems });
    } catch (error) {
      console.error('Error fetching orders or items', error);
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
