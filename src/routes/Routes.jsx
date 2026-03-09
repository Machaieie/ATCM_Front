import { TeamOutlined } from '@ant-design/icons';
import {
  DashboardOutlined,
  PeopleOutlined,
  ShoppingCartOutlined,
  StorefrontOutlined,
  FastfoodOutlined,
  MonetizationOnOutlined,
  Settings,
  EventAvailableOutlined,
  ConfirmationNumberOutlined
} from '@mui/icons-material';

/**
 * Retorna os itens do menu com base no papel do usuário
 */
const SideRoute = (role) => {
  if (!role) return [];

  const normalizedRole = role.toUpperCase();

  const routes = [
    {
      id: 1,
      label: 'Dashboard',
      link: '/dashboard',
      roles: ['ADMIN', 'SUPER_ADMIN'],
      icon: <DashboardOutlined />
    },
    {
      id: 2,
      label: 'Eventos',
      link: '/eventos',
      roles: ['ADMIN', 'EMPLOYEE', 'CLIENT'],
      icon: <EventAvailableOutlined />
    },
     {
      id: 2,
      label: 'Compras',
      link: '/compras',
      roles: ['ADMIN', 'EMPLOYEE', 'CLIENT'],
      icon: <EventAvailableOutlined />
    },
    {
      id: 3,
      label: 'Bilhetes',
      link: '/bilhetes',
      roles: ['ADMIN', 'EMPLOYEE', 'CLIENT'],
      icon: <ConfirmationNumberOutlined />
    },
    {
      id: 6,
      label: 'Movimentos',
      link: '/movimentos',
      roles: ['ADMIN'],
      icon: <MonetizationOnOutlined />
    },
    {
      id: 7,
      label: 'Usuários',
      link: '/users',
      roles: ['ADMIN'],
      icon: <PeopleOutlined />
    },
    {
      id: 8,
      label: 'Configurações',
      link: '/configuracoes',
      roles: ['ADMIN', 'EMPLOYEE'],
      icon: <Settings />
    }
  ];

  return routes.filter(route =>
    route.roles.includes(normalizedRole)
  );
};

export default SideRoute;