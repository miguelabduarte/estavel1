import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // Para obter a página atual
import './Sidebar.css';
import { ReactComponent as DashboardIcon } from './assets/icons/dashboard.svg'; // Ícone padrão
import { ReactComponent as DashboardHoverIcon } from './assets/icons/dashboard-hover.svg'; // Ícone no estado hover
import { ReactComponent as ClientesIcon } from './assets/icons/clientes.svg';
import { ReactComponent as ClientesHoverIcon } from './assets/icons/clientes-hover.svg';
import { ReactComponent as OrcamentosIcon } from './assets/icons/orcamento.svg';
import { ReactComponent as OrcamentosHoverIcon } from './assets/icons/orcamento-hover.svg';
import { ReactComponent as ObrasIcon } from './assets/icons/obras.svg'; // Novo ícone
import { ReactComponent as ObrasHoverIcon } from './assets/icons/obras-hover.svg'; // Novo ícone hover
import { ReactComponent as FinancasIcon } from './assets/icons/financas.svg'; // Novo ícone
import { ReactComponent as FinancasHoverIcon } from './assets/icons/financas-hover.svg'; // Novo ícone hover
import { ReactComponent as InventarioIcon } from './assets/icons/inventario.svg'; // Novo ícone
import { ReactComponent as InventarioHoverIcon } from './assets/icons/inventario-hover.svg'; // Novo ícone hover
import { ReactComponent as EstatisticasIcon } from './assets/icons/estatisticas.svg'; // Novo ícone
import { ReactComponent as EstatisticasHoverIcon } from './assets/icons/estatisticas-hover.svg'; // Novo ícone hover
import logoImageMenu from './assets/icons/joaquimduartelogofull.png';


function Sidebar() {
  const location = useLocation(); // Obter a página atual
  const [hoveredItem, setHoveredItem] = useState(null); // Estado para armazenar o item que está sendo "hovered"

  // Funções de hover para definir qual item está sendo "hovered"
  const handleMouseEnter = (item) => setHoveredItem(item);
  const handleMouseLeave = () => setHoveredItem(null);

  return (
    
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={logoImageMenu} alt="LogoMenu" className="sidebar-logo" />
      </div>
      <ul>
        <li className="sidebar-item">
          <a
            href="/"
            className="sidebar-icon"
            onMouseEnter={() => handleMouseEnter('dashboard')}
            onMouseLeave={handleMouseLeave}
          >
            {location.pathname === '/' || hoveredItem === 'dashboard' ? (
              <DashboardHoverIcon className="full-button" />
            ) : (
              <DashboardIcon className="full-button" />
            )}
          </a>
        </li>
        <li className="sidebar-item">
          <a
            href="/Clientes"
            className="sidebar-icon"
            onMouseEnter={() => handleMouseEnter('clientes')}
            onMouseLeave={handleMouseLeave}
          >
            {location.pathname === '/Clientes' || hoveredItem === 'clientes' ? (
              <ClientesHoverIcon className="full-button" />
            ) : (
              <ClientesIcon className="full-button" />
            )}
          </a>
        </li>
        <li className="sidebar-item">
          <a
            href="/Orcamentos"
            className="sidebar-icon"
            onMouseEnter={() => handleMouseEnter('orcamentos')}
            onMouseLeave={handleMouseLeave}
          >
            {location.pathname === '/Orcamentos' || hoveredItem === 'orcamentos' ? (
              <OrcamentosHoverIcon className="full-button" />
            ) : (
              <OrcamentosIcon className="full-button" />
            )}
          </a>
        </li>
        <li className="sidebar-item">
          <a
            href="/Obras"
            className="sidebar-icon"
            onMouseEnter={() => handleMouseEnter('obras')}
            onMouseLeave={handleMouseLeave}
          >
            {location.pathname === '/Obras' || hoveredItem === 'obras' ? (
              <ObrasHoverIcon className="full-button" />
            ) : (
              <ObrasIcon className="full-button" />
            )}
          </a>
        </li>
        <li className="sidebar-item">
          <a
            href="/Financas"
            className="sidebar-icon"
            onMouseEnter={() => handleMouseEnter('financas')}
            onMouseLeave={handleMouseLeave}
          >
            {location.pathname === '/Financas' || hoveredItem === 'financas' ? (
              <FinancasHoverIcon className="full-button" />
            ) : (
              <FinancasIcon className="full-button" />
            )}
          </a>
        </li>
        <li className="sidebar-item">
          <a
            href="/Inventario"
            className="sidebar-icon"
            onMouseEnter={() => handleMouseEnter('inventario')}
            onMouseLeave={handleMouseLeave}
          >
            {location.pathname === '/Inventario' || hoveredItem === 'inventario' ? (
              <InventarioHoverIcon className="full-button" />
            ) : (
              <InventarioIcon className="full-button" />
            )}
          </a>
        </li>
        <li className="sidebar-item">
          <a
            href="/Estatisticas"
            className="sidebar-icon"
            onMouseEnter={() => handleMouseEnter('estatisticas')}
            onMouseLeave={handleMouseLeave}
          >
            {location.pathname === '/Estatisticas' || hoveredItem === 'estatisticas' ? (
              <EstatisticasHoverIcon className="full-button" />
            ) : (
              <EstatisticasIcon className="full-button" />
            )}
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
