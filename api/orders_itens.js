import pool from './database.js';

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const client = await pool.connect();

    try {
        const { id, items } = req.body;
        const query = 'INSERT INTO pedidos_itens (numero_transacao, nome, preco, quantidade) VALUES ($1, $2, $3, $4)';

        // Crie um array de promessas para as operações de inserção com validação individual
        const insertPromises = items.map(item => {
            if (!item.title || !item.unit_price || !item.quantity) {
                // Se algum dos campos necessários estiver faltando, rejeite a promessa
                return Promise.reject(new Error('Dados do item incompletos ou inválidos.'));
            }
            const values = [id, item.title, item.unit_price, item.quantity];
            return client.query(query, values);
        });

        // Use Promise.allSettled para esperar todas as promessas serem resolvidas ou rejeitadas
        const results = await Promise.allSettled(insertPromises);

        // Verifique se alguma das promessas foi rejeitada
        const rejected = results.filter(result => result.status === 'rejected');

        if (rejected.length > 0) {
            // Se alguma inserção falhar, envie um erro com detalhes
            res.status(500).send({
                message: 'Algumas inserções falharam',
                errors: rejected.map(r => r.reason.message),
            });
        } else {
            // Se todas as inserções forem bem-sucedidas, envie uma resposta de sucesso
            res.status(200).send('Todos os itens foram inseridos com sucesso.');
        }
    } catch (err) {
        console.error('API error:', err);
        res.status(500).send('Erro interno do servidor');
    } finally {
        // Sempre libere o cliente no bloco finally
        client.release();
    }
};
