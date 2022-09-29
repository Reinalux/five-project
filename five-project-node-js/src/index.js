/**
 * Métodos HTTP:
 * 
 * GET: Buscar informações do back-end
 * POST: Criar uma informação no back-end
 * PUT: Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 */

/**
 * Tipos de parâmetros:
 * 
 * Query Params: Filtros e paginação
 * Route Params: Identificar recursos (Atualizar/Deletar)
 * Request Body: Conteúdo para criar ou editar  um recurso (JSON)
 */

/** Middleware:
 * 
 * Interceptador de requisições que pode interromper uma requisição
 * ou alterar dados de uma requisição 
*/

const express = require('express');
const { uuid, isUuid } = require('uuidv4');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
/** 
  A linha abaixo aplica o midlleware para todas as rotas iniciadas
  por /projects/:id (Alteração e deleção).
  Com ela poderia ser retirado o nome da função dos métodos put e delete
*/
app.use('/clientes/:id', validateclienteId);

const clientes = [];

// Função que mostra logs para exemplificar midlleware
function logRequests(request, response, next) {
  const {method, url} =request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.log(logLabel);

  next();

}

app.use(logRequests); // Chama a função (midlleware) logRequests

function validateclienteId(request, response, next){
  const { id } = request.params;

  if (!isUuid(id)) 
     return (response.status(400).json({ error: 'Invalid cliente ID. (Middleware)' }));

  return next();

}

// Listagem de usuários
//logradouro, numero, complemento, bairro, cidade, estado, cep
app.get('/clientes', (request, response) => {
  const { email, cpf, telefone, logradouro, numero, complemento, bairro, cidade, estado, cep } = request.query;

  
  // Filtro (Query inserida no insomnia) por email
  results = email ?
  clientes.filter(cliente => cliente.email.includes(email)) :
    clientes;
  // Filtro (Query inserida no insomnia) por email
    results = cpf ?
    clientes.filter(cliente => cliente.cpf.includes(cpf)) :
    clientes;
  // Filtro (Query inserida no insomnia) por email
      results = telefone ?
      clientes.filter(cliente => cliente.telefone.includes(telefone)) :
      clientes;
  // Filtro (Query inserida no insomnia) por email
        results = logradouro ?
        clientes.filter(cliente => cliente.logradouro.includes(logradouro)) :
        clientes;
// Filtro (Query inserida no insomnia) por email
results = numero ?
clientes.filter(cliente => cliente.numero.includes(numero)) :
clientes;
// Filtro (Query inserida no insomnia) por email
results = complemento ?
clientes.filter(cliente => cliente.complemento.includes(complemento)) :
clientes;
// Filtro (Query inserida no insomnia) por email
results = bairro ?
clientes.filter(cliente => cliente.bairro.includes(bairro)) :
clientes;
// Filtro (Query inserida no insomnia) por email
results = cidade ?
clientes.filter(cliente => cliente.cidade.includes(cidade)) :
clientes;
// Filtro (Query inserida no insomnia) por email
results = estado ?
clientes.filter(cliente => cliente.estado.includes(estado)) :
clientes;
// Filtro (Query inserida no insomnia) por email
results = cep ?
clientes.filter(cliente => cliente.cep.includes(cep)) :
clientes;

  return response.json(results);
});

// Inclusão de usuários
app.post('/clientes', (request, response) => {
  const { email, cpf, telefone, logradouro, numero, complemento, bairro, cidade, estado, cep  } = request.body;
  const id = uuid();

  const cliente = { id, email, cpf, telefone, logradouro, numero, complemento, bairro, cidade, estado, cep };
  clientes.push(cliente);

  return response.json(cliente);
});

// Alteração de usuários
app.put('/clientes/:id', validateclienteId, (request, response) => {
  const { id } = request.params;
  const { cpf, email, telefone, logradouro, numero, complemento, bairro, cidade, estado, cep  } = request.body;

  clienteIndex = clientes.findIndex(cliente => cliente.id === id);

  if (clienteIndex < 0) {
    return response.status(400).json({ error: 'cliente not Found'});
  }

  const cliente = { id,  email, cpf, telefone, logradouro, numero, complemento, bairro, cidade, estado, cep };

  clientes[clienteIndex] = cliente;

  return response.json(cliente);
});

// Deleção de usuários
app.delete('/clientes/:id', validateclienteId, (request, response) => {
  const { id } = request.params;

  clienteIndex = clientes.findIndex(cliente => cliente.id === id);

  if (clienteIndex < 0) {
    return response.status(400).json({ error: 'cliente not Found'});
  }

  clientes.splice(clienteIndex, 1);

  return response.json({ 'delete': 'Successfully' });

});

app.listen(3333, () => {
  console.log('Servidor iniciado.')
});