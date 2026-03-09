import React, { useState, useEffect } from "react";
import {
    Table,
    Button,
    Modal,
    Form,
    Input,
    Select,
    Tag,
    Space,
    Switch,
} from "antd";
import { LockOutlined } from '@ant-design/icons';
import axiosInstance from '../../httpCommom';
import { toast } from 'react-toastify';

const { Option } = Select;

const Users = () => {
    const [form] = Form.useForm();
    const [openModal, setOpenModal] = useState(false);
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await axiosInstance.get("auth/users");
            console.log("response ", response.data)
            setUsers(response.data)
        } catch {
        }
    }

      useEffect(() => {
       
        fetchUsers();
      }, []);

    const filteredUsers = users.filter(
        (u) =>
            u.fullname.toLowerCase().includes(search.toLowerCase()) ||
            u.username.toLowerCase().includes(search.toLowerCase())
    );

    // 💾 Registrar novo usuário
    const handleSaveUser = () => {
        form.validateFields().then((values) => {
            const novo = {

                fullName: values.fullName,
                username: values.username,
                password: values.password,
                phone: values.phone,
                email: values.email,
                role: values.role,

            };

            setUsers([...users, novo]);
            setOpenModal(false);
            form.resetFields();
        });
    };


    const toggleUserStatus = (id) => {
        const updated = users.map((u) =>
            u.id === id ? { ...u, estado: !u.estado } : u
        );
        setUsers(updated);
    };

    const columns = [
        {
            title: "Nome Completo",
            dataIndex: "fullname",
            key: "fullname",
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "Telefone",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
            render: (role) => (
                <Tag color={role === "ADMIN" ? "red" : "blue"}>{role}</Tag>
            ),
        },
        {
            title: "Status",
            dataIndex: "estado",
            key: "estado",
            render: (_, record) =>
                record.estado ? (
                    <Tag color="green">Ativo</Tag>
                ) : (
                    <Tag color="volcano">Inativo</Tag>
                ),
        },
        {
            title: "Ações",
            key: "acoes",
            render: (_, record) => (
                <Space>
                    <Switch
                        checked={record.estado}
                        onChange={() => toggleUserStatus(record.id)}
                        checkedChildren="Ativo"
                        unCheckedChildren="Inativo"
                    />
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: 20 }}>
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 20,
                }}
            >
                <h1 style={{ fontSize: 22, fontWeight: "bold" }}>
                    Gestão de Usuários
                </h1>

                <Button
                    type="primary"
                    size="large"
                    onClick={() => setOpenModal(true)}
                >
                    + Novo Usuário
                </Button>
            </div>

            {/* Campo de pesquisa */}
            <div style={{ marginBottom: 20 }}>
                <Input
                    placeholder="Pesquisar por nome ou username..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    allowClear
                    style={{ width: 300 }}
                />
            </div>

            {/* Tabela */}
            <Table
                columns={columns}
                dataSource={filteredUsers}
                rowKey="id"
                pagination={{ pageSize: 5 }}
            />

            {/* Modal de Registro */}
            <Modal
                title="Registrar Novo Usuário"
                open={openModal}
                onCancel={() => setOpenModal(false)}
                onOk={handleSaveUser}
                okText="Salvar"
                cancelText="Cancelar"
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="fullName"
                        label="Nome Completo"
                        rules={[{ required: true, message: "Digite o nome completo" }]}
                    >
                        <Input placeholder="Ex: João Manuel" />
                    </Form.Item>

                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[{ required: true, message: "Digite o username" }]}
                    >
                        <Input placeholder="Ex: joaomanuel" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Senha"

                        rules={[{ required: true, message: "Digite a senha" }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="********" />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="Telefone"
                        rules={[
                            { required: true, message: "Digite o telefone" },
                            {
                                pattern: /\+258(8[726345])\d{6}$/,
                                message: "Formato válido: +2588X...",
                            },
                        ]}
                    >
                        <Input placeholder="+25884XXXXXX" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: "Digite o email" },
                            { type: "email", message: "Email inválido" },
                        ]}
                    >
                        <Input placeholder="exemplo@email.com" />
                    </Form.Item>

                    <Form.Item
                        name="role"
                        label="Papel (Role)"
                        rules={[{ required: true, message: "Selecione um papel" }]}
                    >
                        <Select placeholder="Selecione">
                            <Option value="ADMIN">ADMIN</Option>
                            <Option value="EMPLOYEE">Funcionario</Option>
                             <Option value="CLIENT">Cliente</Option>

                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Users;

