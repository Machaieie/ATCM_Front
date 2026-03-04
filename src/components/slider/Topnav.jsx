import React from 'react';
import { Layout, Button, Avatar, Typography } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MenuOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Header } = Layout;
const { Text } = Typography;

const TopNav = ({ collapsed, onCollapse, onOpenDrawer, isMobile, user }) => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Header
        style={{
          background: '#fff',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #f0f0f0',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        {/* Botão de menu responsivo */}
        {isMobile ? (
          <Button
            type="text"
            icon={<MenuOutlined style={{ fontSize: 20 }} />}
            onClick={onOpenDrawer}
          />
        ) : (
          <Button
            type="text"
            icon={
              collapsed ? (
                <MenuUnfoldOutlined style={{ fontSize: 20 }} />
              ) : (
                <MenuFoldOutlined style={{ fontSize: 20 }} />
              )
            }
            onClick={() => onCollapse(!collapsed)}
          />
        )}      
      </Header>
    </motion.div>
  );
};

export default TopNav;
