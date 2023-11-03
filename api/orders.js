import pool from './database.js';

module.exports = async (req, res) => {
    const client = await pool.connect();

    try {
        const { nome_cliente, status, numero_transacao } = req.body;

        switch (req.method) {
            case 'GET':
                const { rows } = await client.query('SELECT * FROM pedidos ORDER BY 1 DESC');
                res.json(rows);
                break;

            case 'POST':
                const result = await client.query('INSERT INTO pedidos (numero_transacao, nome_cliente, status) VALUES ($1, $2, $3)',
                    [numero_transacao, nome_cliente, status]);
                res.json(result.rows[0]);
                break;

            // case 'PUT':
            //     const updateResult = await client.query('UPDATE pedidos SET status = $1 WHERE numero_transacao = $2',
            //         [status, numero_transacao]);

            //     if (updateResult.rows.length > 0) {
            //         res.json(updateResult.rows[0]);
            //     } else {
            //         res.status(404).send('Order not found');
            //     }
            //     break;

            case 'DELETE':
                await client.query('DELETE FROM pedidos WHERE numero_transacao = $1', [numero_transacao]);
                res.status(204).send();
                break;

            default:
                res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (err) {
        res.status(500).send('Internal Server Error');
    } finally {
        client.release();
    }
};
