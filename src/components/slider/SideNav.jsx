import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Avatar, Typography, Button } from 'antd';
import { Link, useLocation,useNavigate} from 'react-router-dom';
import SideRoute from '../../routes/Routes';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';

import axiosInstance from '../../httpCommom';

const { Sider } = Layout;
const { Text } = Typography;

const SideNav = ({ role, collapsed, onCollapse, onLogout }) => {
  const location = useLocation();
  const menuItems = SideRoute(role);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("principal"));

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");

      localStorage.removeItem("accessToken");

      navigate("/");
    } catch (error) {
      console.error("Erro no logout:", error);
    }
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      collapsedWidth={80}
      trigger={null}
      width={220}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        height: '100vh',
        background: '#0f0f0f',
        borderRight: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        overflow: 'hidden',
      }}
    >
      {/* --- Avatar + nome do usuário --- */}
      <div
        style={{
          padding: '16px 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderBottom: '1px solid #1f1f1f',
          transition: '0.3s',
        }}
      >
        <Avatar
          size={collapsed ? 40 : 64}
          src={user?.photo || null}
          icon={!user?.photo && <UserOutlined />}
          style={{ backgroundColor: '#FFD700',color: '#000' }}
        />
        {!collapsed && (
          <Text
            strong
            style={{
              marginTop: 8,
              fontSize: 14,
              color: '#fff',
              textAlign: 'center',
            }}
          >
            {user.user.sub || 'Usuário'}
          </Text>
        )}
      </div>

      {/* --- Menu lateral (scrollável) --- */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[location.pathname]}
          items={menuItems.map((item) => ({
            key: item.link || item.label,
            icon: item.icon,
            label: item.link ? <Link to={item.link}>{item.label}</Link> : item.label,
            children: item.children?.map((child) => ({
              key: child.link,
              icon: child.icon,
              label: <Link to={child.link}>{child.label}</Link>,
            })),
          }))}
          style={{
            background: '#0f0f0f',
            borderRight: 'none',
            color: '#fff',
          }}
        />
      </div>

      {/* --- Botão de logout fixo --- */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          borderTop: '1px solid #1f1f1f',
          background: '#001529',
          textAlign: 'center',
          padding: '16px',
        }}
      >
        <Button
          type="text"
          icon={<LogoutOutlined style={{ color: '#fff' }} />}
          onClick={() => handleLogout()}
          style={{
            color: '#ff4d4f',
            width: '100%',
            justifyContent: collapsed ? 'center' : 'flex-start',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'transparent',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          {!collapsed && 'Sair'}
        </Button>
      </div>
    </Sider>
  );
};

SideNav.propTypes = {
  role: PropTypes.string.isRequired,
  collapsed: PropTypes.bool,
  onCollapse: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    photo: PropTypes.string,
  }),
  onLogout: PropTypes.func.isRequired,
};

export default SideNav;
