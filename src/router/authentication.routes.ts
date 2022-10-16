import { Router } from 'express';
let database = require('./database')
const authenticationModule = Router()

// Selecionar todos os usuários
authenticationModule.get('/', (req, res) => {
    database.select().table('usuarios')
    .then((data: any) => {
        res.json({message: 'Usuários encontrados!', usuarios: data})
    })
    .catch((err: any) => {
        res.json({message: "Falha ao encontrar usuários", erro: err })
    })
})

// Inserir um usuário
authenticationModule.post('/', async (req, res) => {
    const usuario = req.body
    database.insert(usuario).into('usuarios')
    .then((data: any) => res.json({message: 'Usuário inserido com sucesso!', data: data}))
    .catch((err: any) => res.json({message: 'Falha ao inserir usuário', erro: err}));
})

// Selecionar  um usuário via email
authenticationModule.get('/:email', (req, res) => {
    const usu_email = req.params.email
    database.where({usu_email: usu_email}).table('usuarios')
    .then((data: any) => {
        res.json({message: 'Usuário encontrado', usuario: data})
    })
    .catch((err: any) => {
        res.json({message: 'Falha ao encontrar usuário', erro: err})
    })
})

// Excluir um usuário via ID
authenticationModule.delete('/:id', (req, res) => {
    const usu_id = req.params.id
    database.where({usu_id: usu_id})
    .delete()
    .table('usuarios')
    .then((data: any) => {
        res.json({message: 'Usuário excluído com sucesso!', usuario: data})
    })
    .catch((err: any) => {
        res.json({message: "Falha ao excluir um usuário", erro: err})
    })
})

// Atualizar um usuário via ID
authenticationModule.put('/:id', (req, res) => {
    const usu_id = req.params.id;
    const usuario = req.body

    database
    .where({usu_id: usu_id})
    .update(usuario)
    .table('usuarios')
    .then((data: any) => {
        res.json({message: "Usuário atualizado com sucesso", usuario: data})
    })
    .catch((err: any) => {
        res.json({message: "Falha ao atualizar um usuário", erro: err})
    })
})


export default authenticationModule