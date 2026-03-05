import { useState, useContext } from "react";
import { Card, Form, Input, Button, Typography, Modal, message } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
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
      await login(values.username, values.password);
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
        
      }}
    >
      <Card
        style={{
          width: 380,
          borderRadius: 20,
          backgroundColor: "#1C1C1C",
          boxShadow: "0 0 40px rgba(0, 255, 136, 0.2)",
          border: "1px solid rgba(0,255,136,0.2)",
        }}
        bodyStyle={{ padding: 32 }}
      >
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <Title
            level={3}
            style={{
              marginBottom: 0,
              color: "#00FF88",
              letterSpacing: 1,
            }}
          >
            ATCM Drift Hub
          </Title>
          <Text style={{ color: "#A0A0A0" }}>
            Plataforma de Venda de Bilhetes
          </Text>
        </div>

        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            name="username"
            label={<span style={{ color: "#A0A0A0" }}>Utilizador</span>}
            rules={[{ required: true, message: "Insira seu usuário!" }]}
          >
            <Input
              prefix={<UserOutlined style={{ color: "#00FF88" }} />}
              placeholder="usuário"
              style={{
                backgroundColor: "#262626",
                border: "1px solid #333",
                color: "#fff",
              }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={<span style={{ color: "#A0A0A0" }}>Senha</span>}
            rules={[{ required: true, message: "Insira sua senha!" }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "#00FF88" }} />}
              placeholder="********"
              style={{
                backgroundColor: "#262626",
                border: "1px solid #333",
                color: "#fff",
              }}
            />
          </Form.Item>

          <div style={{ textAlign: "right", marginBottom: 16 }}>
            <Button
              type="link"
              style={{ padding: 0, color: "#00FF88" }}
              onClick={() => setIsModalVisible(true)}
            >
              Esqueceu a senha?
            </Button>
          </div>

          <Form.Item>
            <Button
              htmlType="submit"
              block
              loading={loading}
              style={{
                backgroundColor: "#00FF88",
                border: "none",
                fontWeight: "bold",
                color: "#000",
                height: 45,
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#00cc6a")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#00FF88")
              }
            >
              Entrar
            </Button>
          </Form.Item>
        </Form>
      </Card>

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
            <Input
              prefix={<MailOutlined />}
              placeholder="Digite seu e-mail"
            />
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