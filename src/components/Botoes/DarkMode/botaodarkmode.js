import React from 'react';
import './botaodarkmode.css'; // Importa os estilos do botão
import IconSol from './IconSol.svg'; 
import IconLua from './IconLua.svg';

const BotaoDarkMode = ({ theme, toggleDarkMode }) => {
    return (
        <div className="botao-dark-mode-container">
            <input type="checkbox" id="darkmode-toggle" className="darkmode-toggle" onChange={toggleDarkMode} />
            <label htmlFor="darkmode-toggle" className="darkmode-label">
                <img src={IconSol} alt="Ícone Sol" className="icon" />
                <img src={IconLua} alt="Ícone Lua" className="icon" />
            </label>
        </div>
    );
};

export default BotaoDarkMode;

