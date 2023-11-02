import React from 'react';
import axios from 'axios';
import './OrderItem.css';

class OrderItem extends React.Component {
  handleStatusChange = async (status) => {
    try {
      await axios.put(`http://localhost:3001/api/orders/${this.props.order.id}/status`, { status });
      this.props.onStatusChange(this.props.order.id, status);
    } catch (error) {
      console.error('Erro ao atualizar o status do pedido', error);
    }
  }

  getStatusColor = (status) => {
    switch (status) {
      case 'Pendente':
        return '#FFA500';
      case 'Em Preparo':
        return '#FFFF00';
      case 'Finalizado':
        return '#32CD32';
      case 'Cancelado':
        return '#FF0000';
      default:
        return '#FFFFFF';
    }
  };

  render() {
    const { order } = this.props;
    return (
      <li className="order-item" style={{ backgroundColor: this.getStatusColor(order.status) }}>
        <div>Número do Pedido: {order.id}</div>
        <div>
          Itens:
          <ul>
            {order.items.map(item => (
              <li key={item.id}>
                {item.name} - Quantidade: {item.quantity}
              </li>
            ))}
          </ul>
        </div>
        <div>Status: {order.status}</div>
        <button onClick={() => this.handleStatusChange('Pendente')}>Pendente</button>
        <button onClick={() => this.handleStatusChange('Em Preparo')}>Em Preparo</button>
        <button onClick={() => this.handleStatusChange('Finalizado')}>Finalizado</button>
        <button onClick={() => this.handleStatusChange('Cancelado')}>Cancelado</button>
      </li>
    );
  }
}

export default OrderItem;