const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.get('/', function (req, res) {
    // res.setHeader('Access-Control-Allow-Origin', '*')
    res.send ('ZecaInfo')
})

// const lista_produtos = [
//     {
//         "titulo": "Red Nike",
//         "foto":"https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxzaG9lfGVufDB8MHx8fDE3MjEwNDEzNjd8MA&ixlib=rb-4.0.3&q=80&w=1080",
//         "descricao": "Tênis leve, com design versátil e acabamento moderno, perfeito para acompanhar sua rotina.",
//         "preco": 499.00,
//         "avaliacao": 5
//     },
//     {
//         "titulo": "Blue Nike",
//         "foto":"https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=1080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         "descricao": "Modelo confortável, resistente e ideal para quem busca um visual urbano sem abrir mão do bem-estar.",
//         "preco": 699.00,
//         "avaliacao": 3
//     },
//     {
//         "titulo": "Black Nike",
//         "foto":"https://images.unsplash.com/photo-1643584549066-fc993fc9cb43?q=80&w=1080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         "descricao": "Tênis com ajuste confortável, visual clean e solado que garante estabilidade em cada passo.",
//         "preco": 799.00,
//         "avaliacao": 4
//     }
// ]

// const lista_produtos = require ('./dados.json')

const lista_produtos = require ('./dados.json')

let mysql = require ('mysql')
let conexao = mysql.createConnection({
    // host: "localhost",
    // user: "root",
    // password: "",
    // database: "bd_loja"
    host: "108.179.193.209",
    user: "gutoxa27_alunos",
    password: "JD_eXLNHp1ZG",
    database: "gutoxa27_bd_loja"

    
// host: "108.179.193.209",
// banco: "gutoxa27_bd_loja",
// usuario: "gutoxa27_alunos",
// senha: "JD_eXLNHp1ZG"
})

conexao.connect(function (erro){
    if (erro){
        console.log ("Deu ruim na conexão \n");
        throw erro;
    } else{
        console.log("Conexão deu bom \n")
    }
})



// Read All - [GET] / produtos

app.get("/produtos", function (req, res){
    // res.setHeader('Access-Control-Allow-Origin', '*')
    // res.send(lista_produtos)
    conexao.query("SELECT * FROM `produtos` ORDER BY `avaliacao` ASC", function (erro, lista_produtos, campos){
        res.send(lista_produtos)
    })
})

app.post("/produto/", function (req, res) {
console.dir(req.body)
    const { titulo, preco, descricao, avaliacao, foto, categoria } = req.body;
    conexao.query(`
        INSERT INTO produtos(titulo, foto, descricao, preco, avaliacao, categoria)
        values('${titulo}','${foto}','${descricao}',${preco}, ${avaliacao}, '${categoria}')`,
        function (erro, resultado) {
            if (erro) {
                res.json(erro);
            }
            res.send(resultado.insertId);
        });
})

app.get("/unidades", function (req, res){
    // res.setHeader('Access-Control-Allow-Origin', '*')
    // res.send(lista_unidades)
    conexao.query("SELECT * FROM `unidades`", function (erro, lista_unidades, campos){
        res.send(lista_unidades)
    })
})

app.post("/unidades", function (req, res) {

    const { 
        nome_da_loja, 
        endereco, 
        email, 
        telefone, 
        foto, 
        latitude, 
        longitude 
    } = req.body;

    conexao.query(
        `
        INSERT INTO unidades
        (nome_da_loja, foto, endereco, email, telefone, latitude, longitude)
        VALUES ('${nome_da_loja}','${foto}','${endereco}', '${email}', '${telefone}','${latitude}', '${longitude}')
    `,
        function (erro, resultado) {
            if (erro) {
                res.json(erro);
            }

            res.send(resultado.insertId);
        }
    );
});


app.get("/produtos/:categoria",function (req, res){
    // res.setHeader('Access-Control-Allow-Origin','*')
    const categoria = req.params.categoria
    conexao.query(`SELECT * FROM produtos where categoria='${categoria}'`, function (erro, lista_produtos, campos){
        res.send(lista_produtos)
    })
})

app.get("/produtos/:categoria/:ordem",function (req, res){
    // res.setHeader('Access-Control-Allow-Origin','*')
    const categoria = req.params.categoria
    const ordem = req.params.ordem
    conexao.query(`SELECT * FROM produtos where categoria='${categoria}' order by ${ordem}`, function (erro, lista_produtos, campos){
        res.send(lista_produtos)

    })
})




app.listen (3000)


// 1- trazer apenas 12 primeiros produtos 
// 2- trazer apenas produtos que comecem com a letra a 
// 3- trazer apenas produtos que tenham o preço de 410 
// 4- trazer apenas produtos com avaliação 4 e 5 
// 5- trazer apenas produtos com avaliação 1 e 5 
// 6- trazer apenas produtos entre id 21 e 32 
// 7- trazer apenas os 12 últimos produtos 
// 8- trazer apenas os 12 primeiros produtos com avaliação 5 
// 9- trazer todo os produtos em ordem de preço do menor para o maior 
// 10- trazer todo os produtos em ordem de avaliação do menor para o maior.