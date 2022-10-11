import express from 'express';
import path from 'path';
const app = express();
import routes from './routes.js';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.urlencoded({extended: true}));

// Utilizando arquivos estáticos através de caminho absoluto
app.use(express.static(path.join(__dirname, 'public')));

// Definindo views e engine EJS
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Iniciando rotas definidas
app.use(routes);

// Porta definida para o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
