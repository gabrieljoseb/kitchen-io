const orders = [
    {
      id: 1,
      status: 'Pendente',
      items: [
        { id: 1, name: 'Pizza Margherita', quantity: 2, price: 30.00 },
        { id: 2, name: 'Coca-Cola 350ml', quantity: 2, price: 5.00 },
      ],
    },
    {
      id: 2,
      status: 'Em Preparo',
      items: [
        { id: 3, name: 'Hamburguer Gourmet', quantity: 1, price: 20.00 },
        { id: 4, name: 'Batata Frita Média', quantity: 1, price: 10.00 },
      ],
    },
    {
      id: 3,
      status: 'Finalizado',
      items: [
        { id: 5, name: 'Lasanha Bolonhesa', quantity: 1, price: 35.00 },
        { id: 6, name: 'Suco de Laranja Natural', quantity: 1, price: 7.00 },
      ],
    },
    {
      id: 4,
      status: 'Cancelado',
      items: [
        { id: 7, name: 'Pizza 4 Queijos', quantity: 1, price: 35.00 },
        { id: 8, name: 'Guaraná 2L', quantity: 1, price: 8.00 },
      ],
    },
  ];
  
  export default orders;
  