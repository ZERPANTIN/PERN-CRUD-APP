import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import PrinterItem from "./PrinterItem";

const PrinterList = observer(() => {
    const {printer} = useContext(Context)

    return (
        <Row className="d-flex">
            {printer.printers.map(printer =>
                <PrinterItem key={printer.id} printer={printer}/>
            )}
        </Row>
    );
});

export default PrinterList;
