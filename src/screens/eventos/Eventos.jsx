import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Input,
  DatePicker,
  Select,
  Button,
  Space,
  message,
  Modal,
  Form,
  TimePicker,
  Divider
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axiosInstance from "../../httpCommom";
import EventCard from "../../components/cards/EventCard";
import { toast } from "react-toastify";
const { Option } = Select;

const Eventos = () => {

  const [events, setEvents] = useState([]);
  const [nome, setNome] = useState("");
  const [data, setData] = useState(null);
  const [estado, setEstado] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const fetchEvents = async () => {

    try {

      const params = {
        nome: nome || undefined,
        data: data || undefined,
        estado: estado || undefined,
      };

      const { data: res } = await axiosInstance.get("/events", { params });

      setEvents(res.content);

    } catch (err) {
      console.error(err);
      message.error("Erro ao carregar eventos");
    }

  };
  const handleCreateEvent = async (values) => {
    try {

      const payload = {
        name: values.name,
        description: values.description,
        date: values.date.format("YYYY-MM-DD"),
        time: values.time.format("HH:mm"),
        location: values.location,
        precoNormal: Number(values.precoNormal),
        precoVip: Number(values.precoVip),
        lotacaoTotal: Number(values.lotacaoTotal)
      };
      console.log("payload ", payload)
      const response = await axiosInstance.post("/events/criar", payload);
console.log("response ", response)
      if (response.status == 200) {
        toast.success("Evento criado com sucesso");

        setIsModalOpen(false);
        form.resetFields();

        fetchEvents();
      }



    } catch (err) {
      console.error(err);
      toast.error("Erro ao criar evento");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleBuy = (event) => {
    message.success(`Comprar bilhete para ${event.name}`);
  };

  return (
    <div style={{ padding: 24 }}>

      <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        <Col>
          <Button type="primary" onClick={() => setIsModalOpen(true)}>
            Novo Evento
          </Button>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Input
            placeholder="Nome do evento"
            prefix={<SearchOutlined />}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={{ width: "100%" }}
          />
        </Col>

        <Col xs={24} sm={12} md={8} lg={6}>
          <DatePicker
            placeholder="Data"
            style={{ width: "100%" }}
            onChange={(d) => setData(d)}
          />
        </Col>

        <Col xs={24} sm={12} md={8} lg={6}>
          <Select
            placeholder="Estado"
            style={{ width: "100%" }}
            allowClear
            onChange={(v) => setEstado(v)}
          >
            <Option value="ATIVO">ATIVO</Option>
            <Option value="INATIVO">INATIVO</Option>
          </Select>
        </Col>

        <Col xs={24} sm={12} md={8} lg={6}>
          <Button
            type="primary"
            style={{ width: "100%" }}
            onClick={fetchEvents}
          >
            Filtrar
          </Button>
        </Col>

      </Row>
      <Divider />
      {/* EVENTOS */}
      <Row gutter={[24, 24]}>

        {events.map((event) => (
          <Col
            key={event.id}
            xs={24}
            sm={12}
            md={8}
            lg={8}
          >
            <EventCard event={event} onBuy={handleBuy} />
          </Col>
        ))}

      </Row>

      <Modal
        title="Cadastrar Novo Evento"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >

        <Form
          layout="vertical"
          form={form}
          onFinish={handleCreateEvent}
        >

          <Form.Item
            label="Nome do Evento"
            name="name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Descrição"
            name="description"
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            label="Data"
            name="date"
            rules={[{ required: true }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Hora"
            name="time"
            rules={[{ required: true }]}
          >
            <TimePicker style={{ width: "100%" }} format="HH:mm" />
          </Form.Item>

          <Form.Item
            label="Local"
            name="location"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Preço Normal"
            name="precoNormal"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Preço VIP"
            name="precoVip"
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Lotação Total"
            name="lotacaoTotal"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Criar Evento
          </Button>

        </Form>

      </Modal>

    </div>
  );
};

export default Eventos;