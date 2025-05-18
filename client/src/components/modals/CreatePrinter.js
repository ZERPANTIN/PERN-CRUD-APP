import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form, Row, Col} from "react-bootstrap";
import {Context} from "../../index";
import {createPrinter, fetchBrands, fetchPrinters, fetchPrint_Technologys} from "../../http/printerAPI";
import {observer} from "mobx-react-lite";

const CreatePrinter = observer(({show, onHide}) => {
    const {printer} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])
    const [preview, setPreview] = useState(null) // Для превью изображения

    useEffect(() => {
        fetchPrint_Technologys().then(data => printer.setPrint_Technologys(data))
        fetchBrands().then(data => printer.setBrands(data))
    }, [])

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const selectFile = e => {
        const selectedFile = e.target.files[0]
        if (selectedFile) {
            setFile(selectedFile)
            // Создаем превью для отображения
            const reader = new FileReader()
            reader.onload = () => {
                setPreview(reader.result)
            }
            reader.readAsDataURL(selectedFile)
        }
    }

    const addPrinter = () => {
        if (!file) {
            alert('Пожалуйста, выберите изображение устройства')
            return
        }

        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', printer.selectedBrand.id)
        formData.append('print_technologyId', printer.selectedPrint_Technology.id)
        formData.append('info', JSON.stringify(info))

        createPrinter(formData).then(data => {
            setName('')
            setPrice(0)
            setFile(null)
            setPreview(null)
            setInfo([])
            onHide()
        })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить устройство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Dropdown className="mt-2 mb-2">
                            <Dropdown.Toggle variant="outline-secondary">
                                {printer.selectedPrint_Technology.name || "Выберите технологию печати"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {printer.print_technologys.map(print_technology =>
                                    <Dropdown.Item
                                        onClick={() => printer.setSelectedPrint_Technology(print_technology)}
                                        key={print_technology.id}
                                    >
                                        {print_technology.name}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>

                    <Form.Group>
                        <Dropdown className="mt-2 mb-2">
                            <Dropdown.Toggle variant="outline-secondary">
                                {printer.selectedBrand.name || "Выберите бренд"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {printer.brands.map(brand =>
                                    <Dropdown.Item
                                        onClick={() => printer.setSelectedBrand(brand)}
                                        key={brand.id}
                                    >
                                        {brand.name}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="mt-3"
                            placeholder="Введите название устройства"
                        />
                    </Form.Group>

                    <Form.Control
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Введите стоимость устройства"
                        print_technology="number"
                    />

                    <Form.Group>
                        <Form.Label>Изображение устройства</Form.Label>
                        <Form.Control
                            type="file"
                            onChange={selectFile}
                        />
                        {preview && (
                            <div className="mt-2">
                                <img
                                    src={preview}
                                    alt="Предпросмотр"
                                    style={{maxHeight: '150px'}}
                                />
                            </div>
                        )}
                    </Form.Group>

                    <hr/>
                    <Button
                        variant="outline-secondary"
                        onClick={addInfo}
                        className="mb-3"
                    >
                        Добавить новое свойство
                    </Button>

                    {info.map(i =>
                        <Row className="mt-2" key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.title}
                                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                    placeholder="Название свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.description}
                                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                    placeholder="Описание свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    variant="outline-danger"
                                    onClick={() => removeInfo(i.number)}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addPrinter}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreatePrinter;