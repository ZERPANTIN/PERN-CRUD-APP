import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreatePrinter from "../components/modals/CreatePrinter";
import CreatePrint_Technology from "../components/modals/CreatePrint_Technology";

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false)
    const [print_technologyVisible, setPrint_TechnologyVisible] = useState(false)
    const [printerVisible, setPrinterVisible] = useState(false)

    return (
        <Container className="d-flex flex-column">
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setPrint_TechnologyVisible(true)}
            >
                Добавить тип
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setBrandVisible(true)}
            >
                Добавить бренд
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setPrinterVisible(true)}
            >
                Добавить устройство
            </Button>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreatePrinter show={printerVisible} onHide={() => setPrinterVisible(false)}/>
            <CreatePrint_Technology show={print_technologyVisible} onHide={() => setPrint_TechnologyVisible(false)}/>
        </Container>
    );
};

export default Admin;
