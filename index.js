require('dotenv').config()
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const jwt = require('express-jwt');
const expressValidator = require('express-validator');

const app = express();
app.disable('x-powered-by');
app.use('/api/', jwt({ secret: process.env.JWTSECRET }).unless({path: ['/login']}));
cors({ credentials: true, origin: true });
app.use(cors());
app.use(express.json());
app.use(expressValidator());

if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}

app.use('/', require('./server/root'));

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(403).send('<html><head><style>body {font-family: Helvetica, Arial, Sans-Serif;margin-top: 5em;}h1 {font-size: 3em;}h2 {font-size: 2em}</style></head></body><center><h1>Acesso Negado (Forbidden)</h1><h2>(╯°□°）╯︵ ┻━┻</h2><br>Não foi encontrado o token de autenticação necessário para interagir com a aplicação.<br>Execute o login para poder usar o aplicativo normalmente<br><h2>Erro: 401</h2></center></body></html>');
  }
  next(err);
});
//após tentar casar todas as rotas a ultima rota que sobrou é not found
app.get('*', (req, res) => {
  res.status(404).send('<html><head><style>body {font-family: Helvetica, Arial, Sans-Serif;margin-top: 5em;}h1 {font-size: 3em;}h2 {font-size: 2em}</style></head></body><center><h1>Página não encontrada (Not Found)</h1><h2>(╯°□°）╯︵ ┻━┻</h2><br>O endereço solicitado não foi encontrado nesse servidor.<br>Verifique o url e tente novamente<br><h2>Erro: 404</h2></center></body></html>');
});

module.exports = app;