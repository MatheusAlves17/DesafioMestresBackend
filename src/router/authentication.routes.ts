import { Router } from 'express';
import { sign } from 'jsonwebtoken';
import authConfig from '../../src/auth'
const bcrypt = require('bcryptjs');
const database = require('./database')
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

    const salt = bcrypt.genSaltSync(10);
    const senhaCriptografada = bcrypt.hashSync(usuario.usu_senha, salt)
    
    usuario.usu_senha = senhaCriptografada
    
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

authenticationModule.post('/login', async (req: any, res: any) => {
    
    const {usu_email, usu_senha} = req.body
    
    database
    .where({usu_email: usu_email})
    .table('usuarios')
    .then((data: any) => {
        if(!data){
            res.status(400).json({message: "Credenciais inválidas"})
        }
        const compareSenha = bcrypt.compareSync(usu_senha, data[0].usu_senha)                    
        if(!compareSenha){
            res.status(400).json({message: "Credenciais inválidas"})
        }
        else if(compareSenha){
            const token = sign({},authConfig.jwt.secret,{
                subject: String(data[0].usu_id),
                expiresIn: authConfig.jwt.expiredIn
            })
            res.json({usuario: data[0], token: token})
        }
    })
    .catch((err: any) => {
        res.json({erro: err})
    })
})

export default authenticationModule