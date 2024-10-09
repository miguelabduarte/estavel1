import React, { useState, useEffect } from 'react';
import './Clientes.css';

let ipcRenderer;
if (window && window.process && window.process.type) {
  ipcRenderer = window.require('electron').ipcRenderer;
}

const Clientes = () => {
  const [clientes, setClientes] = useState([]);

  const carregarClientes = () => {
    if (ipcRenderer) {
      ipcRenderer.invoke('get-clientes').then((result) => {
        setClientes(result);
      });
    }
  };

  useEffect(() => {
    carregarClientes();
  }, []);

  return (
    <div className="clientes-container">
      <h1>Lista de Clientes</h1>
      <button onClick={carregarClientes} className="refresh-button">
        Atualizar lista
      </button>
      <table className="clientes-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telemóvel</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.nome}</td>
              <td>{cliente.telemovel}</td>
              <td>{cliente.email}</td>
              <td>
                <button className="edit-button">Editar</button>
                <button className="delete-button">Apagar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Clientes; 
