const {connection} = require(`../config/db`);

const modelCliente = {

    selecionaTodosClientes: async () => {
        try {
            
            const conn = await connection();
            const [rows] = await conn.query('select * from contatos;');
            return rows;

        } catch (error) {
            throw error;
        }
    },

    selectOneCliente: async (nome) => {
        try {
            const conn = await connection();
            const sql = 'SELECT * FROM contatos WHERE nome=?;';
            const values = nome;
            const [rows] = await conn.query(sql, values);
            return rows;

        } catch (error) {
            throw error;
        }
    },
    // selectClienteNome: async (id) => {
    //     try {
    //         const conn = await connection();
    //         const sql = `SELECT * FROM clientes WHERE nome=?;`;
    //         const values = `${id}`;
    //         const [rows] = await conn.query(sql, values);
    //         return rows;

    //     } catch (error) {
    //         throw error;
    //     }
    // },

    insertCliente: async (cliente) => {
        try {
            const conn = await connection();
            const sql = 'INSERT INTO contatos(nome, tel_cel, tel_fixo, email) VALUES (?,?,?,?);';
            const values = [cliente.nome, cliente.tel_cel, cliente.tel_fixo, cliente.email];
            return await conn.query(sql, values);

        } catch (error) {
            throw error;
        }
    },
    updateCliente: async (id, cliente) => {
        try {
            const conn = await connection();
            const sql = 'UPDATE contatos SET nome=?, tel_cel=?, tel_fixo=?, email=? WHERE id=?';
            const values = [cliente.nome, cliente.tel_cel, cliente.tel_fixo, cliente.email, id];
            return await conn.query(sql, values);

        } catch (error) {
            throw error;
        }
    },
    deleteCliente: async (id) => {
        try {
            const conn = await connection();
            const sql = 'DELETE FROM contatos where id=?;';
            return await conn.query(sql, [id]);

        } catch (error) {
            throw error;
        }
    },
}

module.exports = modelCliente ;