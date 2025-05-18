import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import ListGroup from "react-bootstrap/ListGroup";

const Print_TechnologyBar = observer(() => {
    const {printer} = useContext(Context)
    return (
        <ListGroup>
            {printer.print_technologys.map(print_technology =>
                <ListGroup.Item
                    style={{cursor: 'pointer'}}
                    active={print_technology.id === printer.selectedPrint_Technology.id}
                    onClick={() => printer.setSelectedPrint_Technology(print_technology)}
                    key={print_technology.id}
                >
                    {print_technology.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default Print_TechnologyBar;
