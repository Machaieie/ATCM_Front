import { useState, useContext } from "react";
import { Card, Form, Input, Button, Typography, Modal, message } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import axiosInstance from "../../httpCommom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
const { Title, Text } = Typography;

const Login = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);


    const handleLogin = async (values) => {
    setLoading(true);
    try {
      const decodedUser = await login(values.username, values.password);
     
     
    } catch (error) {
      console.error(error);
      toast.error("Usuário ou senha inválidos!");
    } finally {
      setLoading(false);
    }
  };
    const handleForgotPassword = (values) => {
        message.success(`E-mail de recuperação enviado para ${values.email}`);
        setIsModalVisible(false);
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 16,
            }}
        >
            <Card
                style={{
                    width: 380,
                    borderRadius: 16,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                }}
            >
                <div style={{ textAlign: "center", marginBottom: 24 }}>
                    <Title level={3} style={{ marginBottom: 0, color: "#386641" }}>
                        Farmacia Valente
                    </Title>
                    <Text type="secondary">Acesse sua conta</Text>
                </div>

                {/* --- Formulário de Login --- */}
                <Form layout="vertical" onFinish={handleLogin}>
                    <Form.Item
                        name="username"
                        label="Usuário"
                        rules={[{ required: true, message: "Insira seu usuário!" }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="usuário" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Senha"
                        rules={[{ required: true, message: "Insira sua senha!" }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="********" />
                    </Form.Item>

                    <div style={{ textAlign: "right", marginBottom: 16 }}>
                        <Button
                            type="link"
                            style={{ padding: 0,color:"#386641" }}
                            onClick={() => setIsModalVisible(true)}
                        >
                            Esqueceu a senha?
                        </Button>
                    </div>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            loading={loading}
                            style={{ background: "#386641" }}
                        >
                            Entrar
                        </Button>
                    </Form.Item>
                </Form>
            </Card>

            {/* --- Modal de Recuperação de Senha --- */}
            <Modal
                title="Recuperar Senha"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form layout="vertical" onFinish={handleForgotPassword}>
                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[{ required: true, message: "Insira seu e-mail!" }]}
                    >
                        <Input prefix={<MailOutlined />} placeholder="Digite seu e-mail" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Enviar E-mail de Recuperação
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Login;
