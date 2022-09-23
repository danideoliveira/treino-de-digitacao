const express = require('express');
const path = require('path');
const app = express();
const routes = require('./routes');

app.use(express.urlencoded({extended: true}));

// Utilizando arquivos estáticos através de caminho absoluto
app.use(express.static(path.resolve(__dirname, 'public')));

// Definindo views e engine EJS
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Iniciando rotas
app.use(routes);

// Porta definida para o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
