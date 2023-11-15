import pool from './database.js';

module.exports = async (req, res) => {
    const client = await pool.connect();

    try {
        switch (req.method) {
            case 'GET':
                const { rows } = await client.query('SELECT * FROM pedidos ORDER BY data_criacao DESC');
                res.json(rows);
                break;

            case 'POST':
                const result = await client.query('INSERT INTO pedidos (numero_transacao, external_reference, status) VALUES ($1, $2, $3)',
                    [req.body.numero_transacao, req.body.external_reference, req.body.status]);
                res.json(result.rows[0]);
                break;

            default:
                res.setHeader('Allow', ['GET', 'POST']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (err) {
        console.log('API error: ' + err)
        res.status(500).send('Internal Server Error');
    } finally {
        client.release();
    }
};
