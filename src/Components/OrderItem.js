import React from 'react';
import axios from 'axios';
import './OrderItem.css';

class OrderItem extends React.Component {
  handleStatusChange = async (status, numero_transacao) => {
    try {
      await axios.put(`/api/orders/${numero_transacao}`, { status: status });
      this.props.onStatusChange(numero_transacao, status);
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
        return '#000000';
    }
  };

  render() {
    const { order } = this.props;
    return (
      <li className="order-item" style={{ backgroundColor: this.getStatusColor(order.status) }}>
        <div>Pedido: #{order.numero_transacao}</div>
        <div>
          Itens:
          <ul>
            {order.items && order.items.map(item => (
              <li key={item.id}>
                {item.nome} - Quantidade: {item.quantidade}
              </li>
            ))}
          </ul>
        </div>
        <div>Status: {order.status}</div>
        <div className="button-container">
          <button onClick={() => this.handleStatusChange('Pendente', order.numero_transacao)}>Pendente</button>
          <button onClick={() => this.handleStatusChange('Em Preparo', order.numero_transacao)}>Em Preparo</button>
          <button onClick={() => this.handleStatusChange('Finalizado', order.numero_transacao)}>Finalizado</button>
          <button onClick={() => this.handleStatusChange('Cancelado', order.numero_transacao)}>Cancelado</button>
        </div>
      </li>
    );
  }
}

export default OrderItem;
