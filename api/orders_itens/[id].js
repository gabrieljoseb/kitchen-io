import pool from '../database.js';

module.exports = async (req, res) => {
    const client = await pool.connect();

    try {
        const numero_transacao = req.query.id;

        switch (req.method) {
            case 'GET':
                const { rows } = await client.query('SELECT * FROM pedidos_itens WHERE numero_transacao = $1', [numero_transacao]);
                if (rows.length > 0) {
                    res.json(rows);
                } else {
                    res.status(404).send('Item not found');
                }
                break;

            case 'DELETE':
                const deleteResult = await client.query('DELETE FROM pedidos_itens WHERE numero_transacao = $1', [numero_transacao]);
                if (deleteResult.rowCount > 0) {
                    res.status(204).send();
                } else {
                    res.status(404).send('Item not found');
                }
                break;

            default:
                res.setHeader('Allow', ['GET', 'DELETE']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (err) {
        res.status(500).send('Internal Server Error');
    } finally {
        client.release();
    }
};
