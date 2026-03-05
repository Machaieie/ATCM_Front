import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Input,
  DatePicker,
  Select,
  Button,
  Space,
  Tag,
  message,
} from "antd";
import {
  SearchOutlined,
  CalendarOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import axiosInstance from "../../httpCommom";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
const { Option } = Select;

const Eventos = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState("");
  const [data, setData] = useState(null);
  const [estado, setEstado] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchEvents = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const params = {
        page: page - 1, // Spring Page começa do 0
        size: pageSize,
        nome: nome || undefined,
        data: data ? data.format("YYYY-MM-DD") : undefined,
        estado: estado || undefined,
      };

      const { data: res } = await axiosInstance.get("/events", { params });

      setEvents(res.content);
      setPagination({
        current: res.number + 1,
        pageSize: res.size,
        total: res.totalElements,
      });
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

  const handleTableChange = (pag) => {
    fetchEvents(pag.current, pag.pageSize);
  };

  const handleFilter = () => {
    fetchEvents(1, pagination.pageSize);
  };

  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Data",
      dataIndex: "date",
      key: "date",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Hora",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Local",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Preço Normal",
      dataIndex: "precoNormal",
      key: "precoNormal",
      render: (preco) => `MZN ${preco.toLocaleString()}`,
    },
    {
      title: "Preço VIP",
      dataIndex: "precoVip",
      key: "precoVip",
      render: (preco) => `MZN ${preco.toLocaleString()}`,
    },
    {
      title: "Lotação",
      dataIndex: "lotacaoTotal",
      key: "lotacaoTotal",
      render: (lotacao, record) =>
        `${record.bilhetesVendidos || 0} / ${lotacao}`,
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      render: (estado) => (
        <Tag color={estado === "ATIVO" ? "green" : "red"}>{estado}</Tag>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Card
        title={
          <Space>
            <FilterOutlined />
            Filtros de Eventos
          </Space>
        }
        style={{ marginBottom: 24 }}
      >
        <Space style={{ marginBottom: 16 }} wrap>
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

          <Button type="primary" onClick={handleFilter}>
            Filtrar
          </Button>
        </Space>
      </Card>

      <Table
        columns={columns}
        dataSource={events}
        rowKey="id"
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default Eventos;