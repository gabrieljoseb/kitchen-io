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
      // Obter os pedidos
      const ordersResponse = await axios.get('/api/orders');
      const orders = ordersResponse.data;

      // Obter os itens dos pedidos
      const itemsPromises = orders.map(order =>
        axios.get(`/api/orders_itens/${order.numero_transacao}`)
      );
      const itemsResponses = await Promise.all(itemsPromises);

      // Associar itens aos pedidos
      const ordersWithItems = orders.map((order, index) => ({
        ...order,
        items: itemsResponses[index].data,
      }));

      // Obter detalhes do cliente para cada pedido
      const clientDetailsPromises = ordersWithItems.map(order =>
        axios.get(`https://cardap-io.vercel.app/api/client/${order.external_reference}`)
      );
      const clientDetailsResponses = await Promise.all(clientDetailsPromises);

      // Associar detalhes do cliente aos pedidos
      const ordersWithItemsAndClients = ordersWithItems.map((order, index) => ({
        ...order,
        cliente: clientDetailsResponses[index].data,
      }));

      this.setState({ orders: ordersWithItemsAndClients });
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
    }
  }

  handleStatusChange = (numero_transacao, novoStatus) => {
    this.setState(prevState => ({
      orders: prevState.orders.map(order =>
        order.numero_transacao === numero_transacao
          ? { ...order, status: novoStatus }
          : order
      )
    }));
  }

  render() {
    return (
      <div className="App">
        <OrdersList orders={this.state.orders} onStatusChange={this.handleStatusChange} />
      </div>
    );
  }
}

export default App;
