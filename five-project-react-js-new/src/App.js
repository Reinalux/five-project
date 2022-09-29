import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import api from './services/api';


import backgroundImage from './assets/123.jpg';
import { Form } from './styles';

export default function App(){
  const [clientes, setclientes ] = useState([]);
  const [newcpf, setNewcpf] = useState('');
  const [newemail, setNewemail] = useState('');
  const [newtelefone, setNewtelefone] = useState('');
  const [newlogradouro, setNewlogradouro] = useState('');
  const [newnumero, setNewnumero] = useState('');
  const [newcomplemento, setNewcomplemento] = useState('');
  const [newbairro, setNewbairro] = useState('');
  const [newcidade, setNewcidade] = useState('');
  const [newestado, setNewestado] = useState('');
  const [newcep, setNewcep] = useState('');
  //logradouro, numero, complemento, bairro, cidade, estado, cep
  // useState retorna um array com 2 posicoes
  // 
  // 1. variavel com seu valor inicial 
  // 2. função para atualizacao deste valor 

  useEffect(() => {
    api.get('clientes').then(response => {
      setclientes(response.data);
    });
  }, []);

  function handleInputChangeNewcpf(e) {
    setNewcpf(e.target.value);
  }

  function handleInputChangeNewemail(e) {
    setNewemail(e.target.value);
  }
  function handleInputChangeNewtelefone(e) {
    setNewtelefone(e.target.value);
  }
 //logradouro, numero, complemento, bairro, cidade, estado, cep
function handleInputChangeNewlogradouro(e) {
  setNewlogradouro(e.target.value);
}

function handleInputChangeNewnumero(e) {
  setNewnumero(e.target.value);
}

function handleInputChangeNewcomplemento(e) {
  setNewcomplemento(e.target.value);
}

function handleInputChangeNewbairro(e) {
  setNewbairro(e.target.value);
}

function handleInputChangeNewcidade(e) {
  setNewcidade(e.target.value);
}

function handleInputChangeNewestado(e) {
  setNewestado(e.target.value);
}
function handleInputChangeNewcep(e) {
  setNewcep(e.target.value);
}

  async function addNewcliente(e) {
    e.preventDefault(); /* Evita o refresh na página */
    setNewcpf(newcpf);
    setNewemail(newemail);
    setNewtelefone(newtelefone);
    setNewlogradouro(newlogradouro);
    setNewnumero(newnumero);
    setNewcomplemento(newcomplemento);
    setNewcidade(newcidade);
    setNewbairro(newbairro);
    setNewestado(newestado);
    setNewcep(newcep);
    const response = await api.post('clientes', {
      cpf: `${newcpf}`,
      email: `${newemail}`,
      telefone: `${newtelefone}`,
      logradouro: `${newlogradouro}`,
      numero: `${newnumero}`,
      complemento: `${newcomplemento}`,
      cidade: `${newcidade}`,
      bairro: `${newbairro}`,
      estado: `${newestado}`,
      cep: `${newcep}`
    });

    const cliente = response.data;

    console.log(cliente);

    setclientes([...clientes, cliente]); // spread operator
    setNewcpf('');
    setNewemail('');
    setNewtelefone('');
    setNewlogradouro('');
    setNewnumero('');
    setNewcomplemento('');
    setNewcidade('');
    setNewbairro('');
    setNewestado('');
    setNewcep('');	
  }

  return (
    <Form>
      <img width={200} src={backgroundImage} />
      <br/>
      <input
            type="text"
            placeholder="Informe o email do cliente"
            value={newemail}
            onChange={handleInputChangeNewemail}
            /> 
      <br/>
      <input
            type="text"
            placeholder="Informe o cpf do cliente"
            value={newcpf}
            onChange={handleInputChangeNewcpf}
            />     
      <br/>
      <input
            type="text"
            placeholder="informe o telefone do cliente"
            value={newtelefone}
            onChange={handleInputChangeNewtelefone}
            />
        <br/>
      <input
            type="text"
            placeholder="informe o logradouro"
            value={newlogradouro}
            onChange={handleInputChangeNewlogradouro}
            />
         <br/> 
      <input
            type="text"
            placeholder="informe o numero"
            value={newnumero}
            onChange={handleInputChangeNewnumero}
            />
         <br/> 
      <input
            type="text"
            placeholder="informe o complemento"
            value={newcomplemento}
            onChange={handleInputChangeNewcomplemento}
            />
         <br/> 
      <input
            type="text"
            placeholder="informe o bairro"
            value={newbairro}
            onChange={handleInputChangeNewbairro}
            />
         <br/> 
      <input
            type="text"
            placeholder="informe o cidade"
            value={newcidade}
            onChange={handleInputChangeNewcidade}
            />
         <br/> 
      <input
            type="text"
            placeholder="informe o estado"
            value={newestado}
            onChange={handleInputChangeNewestado}
            />
         <br/> 
      <input
            type="text"
            placeholder="informe o cep"
            value={newcep}
            onChange={handleInputChangeNewcep}
            />
         <br/> 



      <Header title="clientes">
        <ul>
          {clientes.map(cliente => 
          <li key={cliente.id}>
            <span>{`cpf: `+cliente.cpf}</span>
            <span>{`email: `+cliente.email}</span>
            <span>{`telefone: `+cliente.telefone}</span>
            <span>{`logradouro: `+cliente.logradouro}</span>
            <span>{`numero: `+cliente.numero}</span>
            <span>{`complemento: `+cliente.complemento}</span>
            <span>{`bairro: `+cliente.bairro}</span>
            <span>{`cidade: `+cliente.cidade}</span>
            <span>{`estado: `+cliente.estado}</span>
            <span>{`cep: `+cliente.cep}</span>
            </li>)}
        </ul>
      </Header>
      <br/>
      <button type="button" 
              onClick={addNewcliente}>Adicionar cliente</button>
    </Form>
  );
}