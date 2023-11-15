import pool from './database.js';

module.exports = async (req, res) => {
    const client = await pool.connect();

    try {
        if (req.method === 'POST') {
            const { id, items } = req.body;

            let query = 'INSERT INTO pedidos_itens (numero_transacao, nome, preco, quantidade) VALUES ($1, $2, $3, $4)';
            for (let item of items) {
                let values = [id, item.title, item.unit_price, item.quantity];
                await client.query(query, values);
            }
            res.status(200);
        }
        else {
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (err) {
        console.log('API error: ' + err)
        res.status(500).send('Internal Server Error');
    } finally {
        client.release();
    }
};
