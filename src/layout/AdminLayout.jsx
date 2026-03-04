import React, { useState } from 'react';
import { Layout, Drawer } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // ⬅️ para redirecionar
import SideNav from '../components/slider/SideNav';
import TopNav from '../components/slider/Topnav';
import SideRoute from '../routes/Routes';
import { Outlet } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const { Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const navigate = useNavigate();

  const token = localStorage.getItem("principal")
  const user = jwtDecode(token
);
  const menuItems = SideRoute(user.role);

  // 🔹 Lógica de logout
  const handleLogout = () => {
            
  };

  return (
    <Layout style={{ height: '100vh', overflow: 'hidden' }}>
      {/* Drawer (mobile) */}
      <AnimatePresence>
        {isMobile && drawerVisible && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Drawer
              title="Menu"
              placement="left"
              closable
              onClose={() => setDrawerVisible(false)}
              open={drawerVisible}
              width={220}
              bodyStyle={{ padding: 0 }}
            >
              <SideNav
                role={user.role}
                collapsed={false}
                onCollapse={() => setDrawerVisible(false)}
                onLogout={handleLogout} // 🔹 passa para o componente
              />
            </Drawer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sider (desktop) */}
      {!isMobile && (
        <motion.div
          initial={{ width: 220 }}
          animate={{ width: collapsed ? 80 : 220 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            height: '100vh',
            zIndex: 1000,
            overflow: 'hidden',
          }}
        >
          <SideNav
            role={user.role}
            collapsed={collapsed}
            onCollapse={setCollapsed}
            onLogout={handleLogout} // 🔹 também aqui
          />
        </motion.div>
      )}

      {/* Conteúdo principal */}
      <Layout
        style={{
          marginLeft: isMobile ? 0 : collapsed ? 80 : 220,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: isMobile ? 0 : collapsed ? 80 : 220,
            right: 0,
            zIndex: 900,
          }}
        >
          <TopNav
            collapsed={collapsed}
            onCollapse={setCollapsed}
            onOpenDrawer={() => setDrawerVisible(true)}
            isMobile={isMobile}
          />
        </div>

        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            overflowY: 'auto',
            height: 'calc(100vh - 64px)',
            background: '#fff',
            borderRadius: '10px',
            marginTop: 80,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
