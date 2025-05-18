import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Print_TechnologyBar from "../components/Print_TechnologyBar";
import BrandBar from "../components/BrandBar";
import PrinterList from "../components/PrinterList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchPrinters, fetchPrint_Technologys} from "../http/printerAPI";
import Pages from "../components/Pages";

const Shop = observer(() => {
    const {printer} = useContext(Context)

    useEffect(() => {
        fetchPrint_Technologys().then(data => printer.setPrint_Technologys(data))
        fetchBrands().then(data => printer.setBrands(data))
        fetchPrinters(null, null, 1, 3).then(data => {
            printer.setPrinters(data.rows)
            printer.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchPrinters(printer.selectedPrint_Technology.id, printer.selectedBrand.id, printer.page, 3    ).then(data => {
            printer.setPrinters(data.rows)
            printer.setTotalCount(data.count)
        })
    }, [printer.page, printer.selectedPrint_Technology, printer.selectedBrand,])

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <Print_TechnologyBar/>
                </Col>
                <Col md={9}>
                    <BrandBar/>
                    <PrinterList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;
