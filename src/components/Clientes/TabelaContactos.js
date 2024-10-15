import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import './TabelaContactos.css'; // Certifique-se de que o caminho está correto

Modal.setAppElement('#root'); // Necessário para acessibilidade

const TabelaContactos = () => {
    const [contatos, setContatos] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentContact, setCurrentContact] = useState({ nome: '', telefone: '', email: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const containerRef = useRef(null);

    // Função para ordenar contatos alfabeticamente
    const ordenarContatos = (contatos) => {
        return contatos.sort((a, b) => a.nome.localeCompare(b.nome));
    };

    // Função para carregar contatos do localStorage
    const loadContactsFromLocalStorage = () => {
        const savedContacts = localStorage.getItem('contactList');
        if (savedContacts) {
            return JSON.parse(savedContacts); // Converte de volta para o formato de array
        }
        return [];
    };

    // Carregar contatos quando o componente é montado
    useEffect(() => {
        const savedContacts = loadContactsFromLocalStorage();
        setContatos(ordenarContatos(savedContacts));
    }, []);

    // Função para salvar contatos no localStorage
    const saveContactsToLocalStorage = (newContacts) => {
        localStorage.setItem('contactList', JSON.stringify(newContacts));
    };

    const handleEditClick = (index) => {
        setCurrentContact(contatos[index]);
        setEditIndex(index);
        setIsEditing(true);
        setModalIsOpen(true);
    };

    const handleDeleteClick = (index) => {
        const novosContatos = contatos.filter((_, i) => i !== index);
        const contatosOrdenados = ordenarContatos(novosContatos);
        setContatos(contatosOrdenados);
        saveContactsToLocalStorage(contatosOrdenados); // Salva os contatos atualizados no localStorage
    };

    const handleAddClick = () => {
        setCurrentContact({ nome: '', telefone: '', email: '' });
        setIsEditing(false);
        setModalIsOpen(true); // Abre o modal corretamente
    };

    const handleModalSubmit = (event) => {
        event.preventDefault(); // Previne envio de formulário padrão
        if (isEditing) {
            const novosContatos = [...contatos];
            novosContatos[editIndex] = currentContact;
            const contatosOrdenados = ordenarContatos(novosContatos);
            setContatos(contatosOrdenados);
            saveContactsToLocalStorage(contatosOrdenados); // Salva os contatos atualizados no localStorage
        } else {
            const novosContatos = ordenarContatos([...contatos, currentContact]);
            setContatos(novosContatos);
            saveContactsToLocalStorage(novosContatos); // Salva os contatos atualizados no localStorage
        }
        setModalIsOpen(false); // Fecha o modal após salvar
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentContact(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <div>
            <div className="header-container">
                <h1>Clientes</h1>
                <button onClick={handleAddClick}>Adicionar Contato</button>
            </div>
            <div className="container" ref={containerRef}>
                <table className="content-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Telemóvel</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordenarContatos(contatos).map((contato, index) => (
                            <tr key={index}>
                                <td>{contato.nome}</td>
                                <td>{contato.telefone}</td>
                                <td>{contato.email}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button onClick={() => handleEditClick(index)}>Editar</button>
                                        <button onClick={() => handleDeleteClick(index)}>Apagar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal para adicionar/editar contatos */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Adicionar/Editar Contato"
                className="ReactModal__Content"
                overlayClassName="ReactModal__Overlay"
                closeTimeoutMS={600} // Define a duração da animação de fechamento
            >
                {/* Botão X no canto superior direito */}
                <button className="modal-close-button" onClick={() => setModalIsOpen(false)}>X</button>

                <h2>{isEditing ? "Editar Contato" : "Adicionar Contato"}</h2>
                <form onSubmit={handleModalSubmit}>
                    <label>
                        Nome:
                        <input 
                            type="text" 
                            name="nome" 
                            value={currentContact.nome} 
                            onChange={handleInputChange} 
                            placeholder="Digite o nome" 
                            required // Exige que o campo seja preenchido
                        />
                    </label>
                    <br />
                    <label>
                        Telemóvel:
                        <input 
                            type="text" 
                            name="telefone" 
                            value={currentContact.telefone} 
                            onChange={handleInputChange} 
                            placeholder="Digite o telemóvel" 
                            required // Exige que o campo seja preenchido
                        />
                    </label>
                    <br />
                    <label>
                        Email:
                        <input 
                            type="email" 
                            name="email" 
                            value={currentContact.email} 
                            onChange={handleInputChange} 
                            placeholder="Digite o email" 
                            required // Exige que o campo seja preenchido
                        />
                    </label>
                    <br />

                    {/* Botões lado a lado */}
                    <div className="button-group">
                        <button type="submit">
                            {isEditing ? "Salvar Alterações" : "Adicionar Contato"}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default TabelaContactos;
