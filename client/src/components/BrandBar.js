import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Card, Row, Button } from "react-bootstrap";

const BrandBar = observer(() => {
    const { printer } = useContext(Context);

    const handleBrandClick = (brand) => {
        // Если кликаем на уже выбранный бренд - сбрасываем выбор
        if (brand.id === printer.selectedBrand.id) {
            printer.setSelectedBrand({});
        } else {
            printer.setSelectedBrand(brand);
        }
    };

    const resetBrandFilter = () => {
        printer.setSelectedBrand({});
    };

    return (
        <div className="mb-4">
            {/* Кнопка "Все бренды" */}
            <Button
                variant={printer.selectedBrand.id ? "outline-secondary" : "secondary"}
                className="mb-3"
                onClick={resetBrandFilter}
                size="sm"
            >
                {printer.selectedBrand.id ? "Сбросить фильтр" : "Все бренды"}
            </Button>

            {/* Список брендов */}
            <Row className="d-flex flex-wrap g-2">
                {printer.brands.map(brand => (
                    <Card
                        key={brand.id}
                        className="p-3 flex-grow-0"
                        style={{
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            minWidth: '120px'
                        }}
                        onClick={() => handleBrandClick(brand)}
                        border={brand.id === printer.selectedBrand.id ? 'primary' : 'light'}
                        bg={brand.id === printer.selectedBrand.id ? 'primary' : ''}
                        text={brand.id === printer.selectedBrand.id ? 'white' : 'dark'}
                    >
                        <div className="d-flex justify-content-center">
                            {brand.name}
                        </div>
                    </Card>
                ))}
            </Row>
        </div>
    );
});

export default BrandBar;