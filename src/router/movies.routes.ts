import { Router } from "express";
const database = require('./database')
const moviesModule = Router()

// Selecionar todos os filmes
moviesModule.get('/', (req, res) => {
    database
    .select()
    .table('filmes')
    .then((data: any) => {
        res.json({message: "filmes selecionados", filmes: data})
    })
    .catch((err: any) => {
        res.json({message: "Falha ao selecionar filmes", erro: err})
    })
})

// Inserir novo filme
moviesModule.post('/', (req, res) => {
    const movies = req.body
    database
    .insert(movies)
    .into('filmes')
    .then((data: any) => {
        res.json({message: "Filme inserido com sucesso!", filme: data})
    }) 
    .catch((err: any) => {
        res.json({message: "Falha ao inserir filme", erro: err})
    })
})

// Selecionar um filme pelo diretor
moviesModule.get('/diretor', (req, res) => {
    const fil_diretor = req.body.fil_diretor
    database
    .where({fil_diretor: fil_diretor})
    .table('filmes')
    .then((data: any) => {
        res.json({message: "Filmes encontrados", filmes: data})
    })
    .catch((err: any) => {
        res.json({message: "Falha ao encontrar filmes", erro: err})
    })
})

// Selecionar um filme pelo gênero
moviesModule.get('/genero', (req, res) => {
    const fil_genero = req.body.fil_genero
    database
    .where({fil_genero: fil_genero})
    .table('filmes')
    .then((data: any) => {
        res.json({message: "Filmes encontrados", filmes: data})
    })
    .catch((err: any) => {
        res.json({message: "Falha ao encontrar filmes", erro: err})
    })
})

// Atualizar um filme pelo id

moviesModule.put('/:id', (req, res) => {
    const fil_id = req.params.id;
    const filme = req.body
    database
    .where({fil_id: fil_id})
    .update(filme)
    .table('filmes')
    .then((data: any) => {
        res.json({message: "Filme atualizado com sucesso!", filme: data})
    })
    .catch((err: any) => {
        res.json({message: "Falha ao atualizar filme", erro: err})
    })
})

moviesModule.delete('/:id', (req, res) => {
    const fil_id = req.params.id 
    database
    .where({fil_id: fil_id})
    .delete()
    .table('filmes')
    .then((data: any) => {
        res.json({message: "Filme excluído com sucesso!", filme: data})
    })
    .catch((err: any) => {
        res.json({message: "Falha ao excluir um filme", erro: err})
    })
})

export default moviesModule;