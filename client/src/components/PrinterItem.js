import React from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import star from '../assets/star.png'
import {useNavigate} from "react-router-dom"
import {PRINTER_ROUTE} from "../utils/consts";

const PrinterItem = ({printer}) => {
    const navigate = useNavigate()
    return (
        <Col md={3} className={"mt-3"} onClick={() => navigate(PRINTER_ROUTE + '/' + printer.id)}>
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + printer.img}/>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <div>{printer.rating}</div>
                        <Image width={18} height={18} src={star}/>
                    </div>
                </div>
                <div>{printer.name}</div>
            </Card>
        </Col>
    );
};

export default PrinterItem;
