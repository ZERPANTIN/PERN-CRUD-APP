import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import bigStar from '../assets/bigStar.png'
import {useParams, useNavigate} from 'react-router-dom' // Добавили useNavigate
import {fetchOnePrinter, deletePrinter} from "../http/printerAPI"; // Добавили deletePrinter

const PrinterPage = () => {
    const [printer, setPrinter] = useState({info: []})
    const {id} = useParams()
    const navigate = useNavigate() // Добавили навигацию

    useEffect(() => {
        fetchOnePrinter(id).then(data => setPrinter(data))
    }, [id]) // Добавили id в зависимости

    const handleDelete = async () => {
        if (window.confirm('Вы действительно хотите удалить этот принтер?')) {
            try {
                await deletePrinter(id)
                navigate('/') // Переход на главную после удаления
            } catch (e) {
                alert('Ошибка при удалении: ' + e.response?.data?.message)
            }
        }
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + printer.img}/>
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>{printer.name}</h2>
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{background: `url(${bigStar}) no-repeat center center`, width:240, height: 240, backgroundSize: 'cover', fontSize:64}}
                        >
                            {printer.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <h3>От: {printer.price} руб.</h3>
                        <Button variant={"outline-dark"}>Добавить в корзину</Button>
                        <Button
                            variant={"outline-danger"}
                            onClick={handleDelete}
                            className="mt-2"
                        >
                            Удалить принтер
                        </Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Характеристики</h1>
                {printer.info.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default PrinterPage;