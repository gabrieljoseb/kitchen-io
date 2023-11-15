import pool from '../database.js';

module.exports = async (req, res) => {
    const client = await pool.connect();

    try {
        const externalReference = req.query.id; // Obtenha o external_reference do parâmetro da URL

        if (req.method === 'GET') {
            // Busca os dados do cliente com base no external_reference
            const { rows } = await client.query('SELECT * FROM cliente WHERE external_reference = $1', [externalReference]);
            if (rows.length > 0) {
                res.json(rows[0]); // Retorna o primeiro resultado
            } else {
                res.status(404).send('Cliente não encontrado');
            }
        } else {
            // Se não for um método GET, retorne o cabeçalho 'Allow' com os métodos permitidos
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Método ${req.method} Não Permitido`);
        }
    } catch (err) {
        console.error('Erro na API:', err);
        res.status(500).send('Erro Interno do Servidor');
    } finally {
        client.release();
    }
};
