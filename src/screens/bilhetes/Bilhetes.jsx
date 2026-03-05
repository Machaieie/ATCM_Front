import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Select,
  Input,
  DatePicker,
  Space,
  message,
  Modal,
} from "antd";
import { SearchOutlined, CalendarOutlined } from "@ant-design/icons";
import axiosInstance from "../../httpCommom";
import dayjs from "dayjs";

const { Option } = Select;

const Bilhetes = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState("");
  const [data, setData] = useState(null);
  const [estado, setEstado] = useState(null);
  const [ticketType, setTicketType] = useState("NORMAL");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [buying, setBuying] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const params = {
        nome: nome || undefined,
        data: data ? data.format("YYYY-MM-DD") : undefined,
        estado: estado || undefined,
      };
      const { data: res } = await axiosInstance.get("/events", { params });
      setEvents(res.content);
    } catch (err) {
      console.error(err);
      message.error("Erro ao carregar eventos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleBuy = async (eventId) => {
    setBuying(true);
    try {
      const payload = {
        eventId,
        tipo: ticketType,
        formato: "FISICO", // ou DIGITAL
      };
      await axiosInstance.post("/tickets/buy", payload);
      message.success("Bilhete comprado com sucesso!");
      fetchEvents(); // Atualiza contagem de bilhetes
    } catch (err) {
      console.error(err);
      message.error("Erro ao comprar bilhete");
    } finally {
      setBuying(false);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      {/* Filtros */}
      <Card style={{ marginBottom: 24 }}>
        <Space wrap>
          <Input
            placeholder="Nome do evento"
            prefix={<SearchOutlined />}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={{ width: 200 }}
          />
          <DatePicker
            placeholder="Data do evento"
            prefix={<CalendarOutlined />}
            value={data}
            onChange={(d) => setData(d)}
          />
          <Select
            placeholder="Estado"
            value={estado}
            onChange={(val) => setEstado(val)}
            style={{ width: 150 }}
            allowClear
          >
            <Option value="ATIVO">ATIVO</Option>
            <Option value="INATIVO">INATIVO</Option>
          </Select>
          <Button type="primary" onClick={fetchEvents}>
            Filtrar
          </Button>
        </Space>
      </Card>

      {/* Lista de eventos */}
      <Row gutter={[16, 16]}>
        {events.map((event) => (
          <Col xs={24} sm={12} md={8} lg={6} key={event.id}>
            <Card
              title={event.name}
              bordered={false}
              style={{ borderRadius: 12 }}
              extra={
                <span>
                  {event.bilhetesVendidos || 0}/{event.lotacaoTotal}
                </span>
              }
            >
              <p>{event.description}</p>
              <p>
                <strong>Data:</strong>{" "}
                {dayjs(event.date).format("DD/MM/YYYY")}{" "}
                <strong>Hora:</strong> {event.time}
              </p>
              <p>
                <strong>Local:</strong> {event.location}
              </p>
              <p>
                <strong>Preço Normal:</strong> MZN{" "}
                {event.precoNormal?.toLocaleString()} |{" "}
                <strong>VIP:</strong> MZN {event.precoVip?.toLocaleString()}
              </p>

              <Space style={{ marginTop: 12 }}>
                <Select
                  value={ticketType}
                  onChange={setTicketType}
                  style={{ width: 120 }}
                >
                  <Option value="NORMAL">Normal</Option>
                  <Option value="VIP">VIP</Option>
                </Select>
                <Button
                  type="primary"
                  onClick={() => handleBuy(event.id)}
                  loading={buying}
                  disabled={event.bilhetesVendidos >= event.lotacaoTotal}
                >
                  Comprar
                </Button>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      {events.length === 0 && !loading && (
        <div style={{ textAlign: "center", marginTop: 50, color: "#888" }}>
          Nenhum evento disponível
        </div>
      )}
    </div>
  );
};

export default Bilhetes;