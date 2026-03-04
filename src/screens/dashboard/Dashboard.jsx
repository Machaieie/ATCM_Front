import React, { useEffect, useState } from 'react';
import {
    Row,
    Col,
    Card,
    Statistic,
    Table,
    Typography,
    Spin,
    DatePicker
} from 'antd';
import {
    ArrowUpOutlined,
    DollarOutlined,
    ShoppingCartOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import { Column, Pie } from '@ant-design/plots';
import axiosInstance from '../../httpCommom';
import dayjs from 'dayjs';

const { Title } = Typography;
const { RangePicker } = DatePicker;

const Dashboard = () => {

    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({});
    const [salesByDay, setSalesByDay] = useState([]);
    const [bestProducts, setBestProducts] = useState([]);
    const [bestSuppliers, setBestSuppliers] = useState([]);

    const [dateRange, setDateRange] = useState([
        dayjs().subtract(6, 'day'),
        dayjs()
    ]);

    // 🔥 carregar dashboard
    const loadDashboard = async () => {
        setLoading(true);

        try {
            // stats
            const dashboardRes = await axiosInstance.get('dashboard');

            setStats(dashboardRes.data.stats);
            setBestProducts(dashboardRes.data.bestProducts);
            setBestSuppliers(dashboardRes.data.bestSuppliers);

            // gráfico vendas
            const salesRes = await axiosInstance.get('dashboard/sales-range', {
                params: {
                    start: dateRange[0].format('YYYY-MM-DD'),
                    end: dateRange[1].format('YYYY-MM-DD')
                }
            });
            console.log("vendas ",salesRes)

            // 🔥 formato esperado pelo gráfico
            const formatted = salesRes.data.map(item => ({
                day: item.date,
                value: item.total
            }));

            setSalesByDay(formatted);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDashboard();
    }, [dateRange]);

    // 📊 gráfico coluna
    const columnConfig = {
        data: salesByDay,
        xField: 'day',
        yField: 'value',
        height: 250,
        label: { position: 'top' }
    };

    // 🥧 pie fornecedores
    const pieConfig = {
        data: bestSuppliers,
        angleField: 'value',
        colorField: 'supplier',
        radius: 0.9,
        label: {
            type: 'inner',
            offset: '-30%',
            content: '{value} MT',
        },
    };

    return (
        <Spin spinning={loading}>
            <div style={{ padding: 24 }}>
                <Title level={3}>Dashboard da Farmácia</Title>

                {/* 🔥 filtro por data */}
                <RangePicker
                    value={dateRange}
                    onChange={(dates) => setDateRange(dates)}
                    style={{ marginBottom: 20 }}
                />

                {/* 🔹 Cards */}
                <Row gutter={16}>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Hoje"
                                value={stats?.today || 0}
                                suffix="MT"
                                prefix={<DollarOutlined />}
                            />
                        </Card>
                    </Col>

                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Esta Semana"
                                value={stats?.week || 0}
                                suffix="MT"
                                prefix={<ArrowUpOutlined />}
                            />
                        </Card>
                    </Col>

                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Este Mês"
                                value={stats?.month || 0}
                                suffix="MT"
                                prefix={<ShoppingCartOutlined />}
                            />
                        </Card>
                    </Col>

                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Este Ano"
                                value={stats?.year || 0}
                                suffix="MT"
                                prefix={<TeamOutlined />}
                            />
                        </Card>
                    </Col>
                </Row>

                {/* 🔹 Gráficos */}
                <Row gutter={16} style={{ marginTop: 24 }}>
                    <Col span={12}>
                        <Card title="Vendas por Período">
                            <Column {...columnConfig} />
                        </Card>
                    </Col>

                    <Col span={12}>
                        <Card title="Fornecedores com Mais Vendas">
                            <Pie {...pieConfig} />
                        </Card>
                    </Col>
                </Row>

                {/* 🔹 Tabela */}
                <Row style={{ marginTop: 24 }}>
                    <Col span={24}>
                        <Card title="Produtos Mais Vendidos">
                            <Table
                                rowKey="name"
                                dataSource={bestProducts}
                                pagination={false}
                                columns={[
                                    {
                                        title: 'Produto',
                                        dataIndex: 'name',
                                    },
                                    {
                                        title: 'Quantidade Vendida',
                                        dataIndex: 'quantity',
                                    },
                                    {
                                        title: 'Receita (MT)',
                                        dataIndex: 'revenue',
                                        render: v => `${v} MT`
                                    },
                                ]}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        </Spin>
    );
};

export default Dashboard;