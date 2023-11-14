import pool from '../database.js';

module.exports = async (req, res) => {
    const client = await pool.connect();

    try {
        const numero_transacao = req.query.id;
        const status = req.body.status;

        switch (req.method) {
            case 'GET':
                const { rows } = await client.query('SELECT * FROM pedidos WHERE numero_transacao = $1', [numero_transacao]);
                if (rows.length > 0) {
                    res.json(rows);
                } else {
                    res.status(404).send('Item not found');
                }
                break;
            case 'PUT':
                const updateResult = await client.query('UPDATE pedidos SET status = $1 WHERE numero_transacao = $2 RETURNING *',
                    [status, numero_transacao]);

                if (updateResult.rows.length > 0) {
                    res.json(updateResult.rows);
                } else {
                    res.status(404).send('Order not found');
                }
                break;

            default:
                res.setHeader('Allow', ['GET', 'PUT']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (err) {
        res.status(500).send('Internal Server Error');
    } finally {
        client.release();
    }
};
