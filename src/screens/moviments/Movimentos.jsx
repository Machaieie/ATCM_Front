import React, { useState, useEffect } from 'react';
import {
    Flex,
    Space,
    Table,
    Tag,
    Divider,
    Button,
    Modal,
    Form,
    Input,
    Select,
    message,
    Row,
    Col,
    Card
} from 'antd';
import axiosInstance from '../../httpCommom';


const Movimentos = () => {

    const [moviments, setMoviments] = useState([]);

    useEffect(() => {
        loadMoviments();
    }, []);


    const loadMoviments = async () => {
        const res = await axiosInstance.get('stock-moviments');
        console.log("movimentos ", res)
        setMoviments(res.data.content);
    };


    const columns = [
        {
            title: 'Produto',
            dataIndex: 'product',
            key: 'product',
        },
        {
            title: 'Quantidade',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Descrição',
            dataIndex: 'notes',
            key: 'notes',
        },
        {
            title: 'Tipo de Movimento',
            dataIndex: 'movimentType',
            key: 'movimentType',
        },
        {
            title: 'Usuario',
            dataIndex: 'user',
            key: 'user',
        },
        {
            title: 'Data',
            dataIndex: 'date',
            key: 'date',
        },




    ];

    return (
        <div>
            <Row>
                <Col></Col>
            </Row>
            <Divider />
            <Table
                rowKey="id"
                dataSource={moviments}
                columns={columns}
            />
        </div>
    );
};


export default Movimentos;