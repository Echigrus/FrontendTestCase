import { Common } from "@classes/commonFunctions";
import { FormInstance, Form, Col, Input, Row, DatePicker } from "antd";

type TProps = {
    form: FormInstance
};

const FormCompany = ({ form }: TProps): JSX.Element => {
    return (
        <Form
            className="ftc-company-form"
            form={form}
            layout="vertical"
        >
            <Row>
                <Col className="three-quarters-width">
                    <Form.Item
                        name="fullName"
                        label="Наименование полное"
                        rules={[
                            { required: true, message: "Пожалуйста, введите полное наименование общества" },
                            { type: "string", min: 2, max: 100, whitespace: true, message: "От 2 до 100 символов" }
                        ]}
                    >
                        <Input placeholder="ООО &ldquo;Тульская пряничная компания&rdquo;" />
                    </Form.Item>
                </Col>
                <Col className="quarter-width">
                    <Form.Item
                        name="shortName"
                        label="Сокращение"
                        rules={[
                            { required: true, message: "Пожалуйста, введите сокращение" },
                            { type: "string", min: 2, max: 20, whitespace: true, message: "От 2 до 20 символов" }
                        ]}
                    >
                        <Input placeholder="ООО &ldquo;ТПК&rdquo;" />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col className="quarter-width">
                    <Form.Item
                        name="registrationDate"
                        label="Дата регистрации"
                        rules={[
                            { required: true, message: 'Пожалуйста, введите дату регистрации' },
                            { validator: Common.dateValidator }
                        ]}
                    >
                        <DatePicker format="DD.MM.YYYY" />
                    </Form.Item>
                </Col>
                <Col className="quarter-width">
                    <Form.Item
                        name="INN"
                        label="ИНН"
                        rules={[
                            { required: true, type: "string", pattern: /^\d{10}$/, message: "Пожалуйста, введите ИНН" }
                        ]}
                    >
                        {/* TODO: при заполнении подгружать информацию */}
                        <Input placeholder="XXXXXXXXXXX" />
                    </Form.Item>
                </Col>
                <Col className="half-width">
                    <Form.Item
                        name="scanINN"
                        label="Скан ИНН"
                        rules={[
                            { required: true, message: "Пожалуйста, прикрепите скан ИНН" }
                        ]}
                    >
                        {/* TODO: загрузка файла */}
                    </Form.Item>
                </Col>
            </Row>
            <Row>
            <Col className="quarter-width">
                    <Form.Item
                        name="OGRN"
                        label="ОГРН"
                        rules={[
                            { required: true, type: "string", pattern: /^\d{13}$/, message: "Пожалуйста, введите ОГРН" }
                        ]}
                    >
                        <Input placeholder="XXXXXXXXXXXXX" />
                    </Form.Item>
                </Col>
                <Col className="half-width">
                    <Form.Item
                        name="scanOGRN"
                        label="Скан ОГРН"
                        rules={[
                            { required: true, message: "Пожалуйста, прикрепите скан ОГРН" }
                        ]}
                    >
                        {/* TODO: загрузка файла */}
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export { FormCompany };