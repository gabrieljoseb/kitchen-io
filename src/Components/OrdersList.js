import React from 'react';
import OrderItem from './OrderItem';
import './OrdersList.css';

class OrdersList extends React.Component {
  render() {
    const { orders, onStatusChange } = this.props;

    return (
      <div className="orders-list-container">
        <h1>Pedidos</h1>
        <ul className="orders-list">
          {orders.map(order => (
            <OrderItem key={order.numero_transacao} order={order} onStatusChange={onStatusChange} />
          ))}
        </ul>
      </div>
    );
  }
}

export default OrdersList;