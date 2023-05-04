import { Common } from "@classes/commonFunctions";
import { GlobalConstants } from "@constants/global";
import { Checkbox, Col, DatePicker, Form, FormInstance, Input, Row, Select } from "antd";

type TProps = {
    disabled: boolean,
    form: FormInstance
};

const FormAddress = ({ disabled, form }: TProps): JSX.Element => {
    return (
        <Form
            className="ftc-address-form"
            disabled={disabled}
            form={form}
            layout="vertical"
        >
            <Row>
                <Col className="half-width">
                    <Form.Item
                        name="country"
                        label="Страна"
                        rules={[
                            { required: true, message: "Пожалуйста, выберите страну" }
                        ]}
                    >
                        <Select 
                            options={GlobalConstants.Countries.map((val) => {
                                return { value: val, label: val };
                            })}
                            placeholder="Выберите страну"
                        />
                    </Form.Item>
                </Col>
                <Col className="half-width">
                    <Form.Item
                        name="region"
                        label="Регион"
                        rules={[
                            { required: true, message: "Пожалуйста, выберите регион" }
                        ]}
                    >
                        <Select 
                            options={GlobalConstants.Regions.map((val) => {
                                return { value: val, label: val };
                            })}
                            placeholder="Выберите регион"
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col className="half-width">
                    <Form.Item
                        name="city"
                        label="Город / Населенный пункт"
                        rules={[
                            { required: true, message: "Пожалуйста, введите населенный пункт" },
                            { min: 2, max: 60, pattern: null, message: "" }
                        ]}
                    >
                        <Input placeholder="Введите населенный пункт" />
                    </Form.Item>
                </Col>
                <Col className="half-width">
                    <Form.Item
                        name="street"
                        label="Улица"
                        rules={[
                            { required: true, message: "Пожалуйста, введите улицу" },
                            { min: 2, max: 60, pattern: null, message: "" }
                        ]}
                    >
                        <Input placeholder="Введите улицу" />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col className="eighth-width">
                    <Form.Item
                        name="house"
                        label="Дом"
                        rules={[
                            { required: true, message: "Пожалуйста, введите населенный пункт", pattern: null }
                        ]}
                    >
                        <Input placeholder="0" type="number" />
                    </Form.Item>
                </Col>
                <Col className="eighth-width">
                    <Form.Item
                        name="apartment"
                        label="Квартира"
                        rules={[
                            {}
                        ]}
                    >
                        <Input placeholder="0" type="number" />
                    </Form.Item>
                </Col>
                <Col className="quarter-width">
                    <Form.Item name="noApartment">
                        <Checkbox>Нет квартиры</Checkbox>
                    </Form.Item>
                </Col>
                <Col className="quarter-width">
                    <Form.Item
                        name="dateOfRegistration"
                        label="Дата прописки"
                        rules={[
                            { required: true, message: 'Пожалуйста, введите дату прописки' },
                            { validator: Common.dateValidator }
                        ]}
                    >
                        <DatePicker format="DD.MM.YYYY" />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export { FormAddress };