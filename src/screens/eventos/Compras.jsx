import React, { useEffect, useState } from "react";
import { Row, Col, Input, DatePicker, Select, Button, Space, message, Modal, Form, Radio, Divider } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import axiosInstance from "../../httpCommom";
import EventCard from "../../components/cards/EventCard";
import { toast } from "react-toastify";

const { Option } = Select;

const Compras = () => {
  const [events, setEvents] = useState([]);
  const [nome, setNome] = useState("");
  const [data, setData] = useState(null);
  const [estado, setEstado] = useState(null);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // ✅ Buscar eventos
  const fetchEvents = async () => {
    try {
      const params = {
        nome: nome || undefined,
        data: data ? dayjs(data).format("YYYY-MM-DD") : undefined,
        estado: estado || undefined,
      };
      const { data: res } = await axiosInstance.get("/events", { params });
      setEvents(res.content);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao carregar eventos");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Abrir modal de compra
  const handleBuy = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

const handlePayment = async (values) => {
  try {
    // 1️⃣ Chama a API de pagamento
    const paymentPayload = {
      eventId: selectedEvent.id,
      metodoPagamento: values.metodoPagamento,
      valor: values.tipo === "VIP" ? selectedEvent.precoVip : selectedEvent.precoNormal
    };

    const paymentRes = await axiosInstance.post("/payments/pagar", paymentPayload);
    console.log("payment => ",paymentRes)
    if ( paymentRes.status === 200) {
      toast.success("Pagamento confirmado!");

      // 2️⃣ Chama a API para comprar o bilhete e gerar o PDF
      const ticketPayload = {
        eventId: selectedEvent.id,
        tipo: values.tipo,
        formato: "PDF"
      };
console.log("response err ",ticketPayload)
      const ticketRes = await axiosInstance.post("/tickets/buy", ticketPayload, {
        responseType: "blob" // importante para arquivos PDF
      });
      console.log("response err ",ticketRes)
      // 3️⃣ Baixa automaticamente o PDF
      const url = window.URL.createObjectURL(new Blob([ticketRes.data], { type: 'application/pdf' }));
      const a = document.createElement("a");
      a.href = url;
      a.download = `${selectedEvent.name}-bilhete.pdf`;
      a.click();

      setIsModalOpen(false);
      form.resetFields();
    }
  } catch (err) {
    console.error(err);
    message.error("Erro no pagamento ou geração do bilhete");
  }
};

  return (
    <div style={{ padding: 24 }}>
      {/* FILTROS */}
      <Space wrap style={{ marginBottom: 24 }}>
        <Input
          placeholder="Nome do evento"
          prefix={<SearchOutlined />}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{ width: 200 }}
        />

        <DatePicker
          placeholder="Data"
          value={data}
          onChange={(d) => setData(d)}
        />

        <Select
          placeholder="Estado"
          value={estado}
          allowClear
          style={{ width: 150 }}
          onChange={(v) => setEstado(v)}
        >
          <Option value="ATIVO">ATIVO</Option>
          <Option value="INATIVO">INATIVO</Option>
        </Select>

        <Button type="primary" onClick={fetchEvents}>
          Filtrar
        </Button>
      </Space>

      <Divider />

      {/* LISTA DE EVENTOS */}
      <Row gutter={[24, 24]}>
        {events.map((event) => (
          <Col key={event.id} xs={24} sm={12} md={8} lg={8}>
            <EventCard event={event} onBuy={handleBuy} />
          </Col>
        ))}
      </Row>

      {/* MODAL DE PAGAMENTO */}
      <Modal
        title={`Comprar Bilhete - ${selectedEvent?.name}`}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        okText="Pagar"
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handlePayment}>
          <Form.Item
            label="Tipo de Bilhete"
            name="tipo"
            rules={[{ required: true }]}
          >
            <Radio.Group>
              <Radio value="NORMAL">Normal</Radio>
              <Radio value="VIP">VIP</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Método de Pagamento"
            name="metodoPagamento"
            rules={[{ required: true }]}
          >
            <Select placeholder="Selecione o método de pagamento">
              <Option value="MPESA">M-Pesa</Option>
              <Option value="EMOLA">eMola</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Compras;