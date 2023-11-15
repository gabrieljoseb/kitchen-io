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
        return '#FFBC80'; // Pastel orange
      case 'Em Preparo':
        return '#FFFDA1'; // Pastel yellow
      case 'Finalizado':
        return '#98FB98'; // Pastel green
      case 'Cancelado':
        return '#FF6B6B'; // Pastel red
      default:
        return '#D3D3D3'; // Light gray for default or unknown status
    }
  };

  render() {
    const { order } = this.props;
    const { cliente } = order;

    return (
      <li className="order-item" style={{ backgroundColor: this.getStatusColor(order.status) }}>
        <div>Pedido: #{order.numero_transacao}</div>
        <div>Cliente: {cliente.nome} - Mesa: {cliente.mesa_id}</div>
        <div>
          Itens:
          <ul>
            {order.items && order.items.map(item => (
              <li key={item.id}>
                {item.nome} - Quantidade: {item.quantidade} - Preço: {item.preco}
              </li>
            ))}
          </ul>
        </div>
        <div className='status'>Status: {order.status}</div>
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
