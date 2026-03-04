import React, { useState, useEffect } from "react";
import { Tabs, Form, Input, InputNumber, Button, Card, message } from "antd";
import axios from "axios";

const { TabPane } = Tabs;

const Configuracoes = () => {
  const [formUser] = Form.useForm();
  const [formPassword] = Form.useForm();
  const [formSistema] = Form.useForm();

  const [config, setConfig] = useState(null);

  // 👉 Carregar configurações ao iniciar
  useEffect(() => {
    axios.get("/api/configuracoes")
      .then(res => {
        setConfig(res.data);
        formSistema.setFieldsValue({
          nomeEmpresa: res.data.nomeEmpresa,
          endereco: res.data.endereco,
          telefone: res.data.telefone,
          email: res.data.email,
          taxaMensalidade: res.data.taxaMensalidade
        });
      })
      .catch(err => console.error(err));
  }, [formSistema]);

  const handleSaveUser = (values) => {
    console.log("Dados do usuário atualizados:", values);
    // Chamar API de atualização do usuário
  };

  const handleChangePassword = (values) => {
    console.log("Senha alterada:", values);
    // Chamar API de troca de senha
  };

  const handleSaveSistema = (values) => {
    console.log("Configurações do sistema atualizadas:", values);

    if (!config) return;

    axios.put(`/api/configuracoes/${config.id}`, values)
      .then(res => {
        message.success("Configurações atualizadas com sucesso!");
        setConfig(res.data);
      })
      .catch(err => {
        console.error(err);
        message.error("Erro ao atualizar configurações.");
      });
  };

  return (
    <Card title="Configurações" style={{ maxWidth: 700, margin: "30px auto" }}>
      <Tabs defaultActiveKey="1">
        {/* Aba Editar Dados */}
        <TabPane tab="Editar Dados" key="1">
          <Form layout="vertical" form={formUser} onFinish={handleSaveUser}>
            <Form.Item
              label="Nome Completo"
              name="nome"
              rules={[{ required: true, message: "Informe seu nome" }]}
            >
              <Input placeholder="Digite seu nome" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Informe seu email" }]}
            >
              <Input type="email" placeholder="Digite seu email" />
            </Form.Item>

            <Form.Item label="Telefone" name="telefone">
              <Input placeholder="Número de telefone" />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Salvar Alterações
            </Button>
          </Form>
        </TabPane>

        {/* Aba Trocar Senha */}
        <TabPane tab="Trocar Senha" key="2">
          <Form layout="vertical" form={formPassword} onFinish={handleChangePassword}>
            <Form.Item
              label="Senha Atual"
              name="senhaAtual"
              rules={[{ required: true, message: "Informe a senha atual" }]}
            >
              <Input.Password placeholder="Senha atual" />
            </Form.Item>

            <Form.Item
              label="Nova Senha"
              name="novaSenha"
              rules={[
                { required: true, message: "Informe a nova senha" },
                { min: 6, message: "A senha deve ter pelo menos 6 caracteres" },
              ]}
            >
              <Input.Password placeholder="Nova senha" />
            </Form.Item>

            <Form.Item
              label="Confirmar Nova Senha"
              name="confirmarSenha"
              dependencies={["novaSenha"]}
              rules={[
                { required: true, message: "Confirme a nova senha" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("novaSenha") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("As senhas não coincidem");
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirmar nova senha" />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Alterar Senha
            </Button>
          </Form>
        </TabPane>

        {/* Aba Configurações do Sistema */}
        <TabPane tab="Configurações do Sistema" key="3">
          <Form layout="vertical" form={formSistema} onFinish={handleSaveSistema}>
            <Form.Item
              label="Nome da Empresa"
              name="nomeEmpresa"
              rules={[{ required: true, message: "Informe o nome da empresa" }]}
            >
              <Input placeholder="Nome da empresa" />
            </Form.Item>

            <Form.Item
              label="Endereço"
              name="endereco"
            >
              <Input placeholder="Endereço da empresa" />
            </Form.Item>

            <Form.Item
              label="Telefone"
              name="telefone"
            >
              <Input placeholder="Telefone da empresa" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ type: "email", message: "Informe um email válido" }]}
            >
              <Input placeholder="Email da empresa" />
            </Form.Item>

            <Form.Item
              label="Taxa de Mensalidade"
              name="taxaMensalidade"
              rules={[{ required: true, message: "Informe a taxa de mensalidade" }]}
            >
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                formatter={value => `MT ${value}`}
                parser={value => value.replace("MT", "")}
              />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Salvar Configurações
            </Button>
          </Form>
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default Configuracoes;
