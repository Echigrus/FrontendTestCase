import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, DatePicker, Form, Input, Row } from "antd";

const FormCommon = (): JSX.Element => {
    const [commonForm] = Form.useForm();

    function handleOk() {
        // Валидация, передача данных в store, навигация дальше
    }

    return (
        <Col className="ftc-common">
            <Row>
                <div className="ftc-icon">
                    <FontAwesomeIcon className="icon-blue" icon={faUser} />
                </div>
            </Row>
            <Row>
                <p className="ftc-primary-text">
                    Общие
                </p>
            </Row>
            <Row>
                <p className="ftc-secondary-text">
                    Введите свои персональные данные.
                </p>
            </Row>
            <Row>
                <Form
                    className="ftc-common-form"
                    form={commonForm}
                    layout="vertical"
                >
                    <Form.Item
                        className="pad-right"
                        name="surname"
                        label="Фамилия"
                        rules={[
                            { required: true, message: 'Пожалуйста, введите фамилию' },
                            { type: "string", min: 2, max: 60, message: 'От 2 до 60 символов' }
                        ]}
                    >
                        <Input placeholder="Васильев" />
                    </Form.Item>
                    <Form.Item
                        className="pad-left"
                        name="name"
                        label="Имя"
                        rules={[
                            { required: true, message: 'Пожалуйста, введите имя' },
                            { type: "string", min: 2, max: 60, message: 'От 2 до 60 символов' }
                        ]}
                    >
                        <Input placeholder="Иван" />
                    </Form.Item>
                    <Form.Item
                        className="pad-right"
                        name="patronymic"
                        label="Отчество"
                        rules={[
                            { type: "string", min: 0, max: 60, message: 'Не больше 60 символов' }
                        ]}
                    >
                        <Input placeholder="Сергеевич" />
                    </Form.Item>
                    <Form.Item
                        className="pad-left"
                        name="city"
                        label="Основной город"
                        rules={[
                            { required: true, message: 'Пожалуйста, выберите город' }
                        ]}
                    >
                        {/* TODO: Выбор города */}
                    </Form.Item>
                    <Form.Item
                        className="pad-right"
                        name="citizenship"
                        label="Гражданство"
                        rules={[
                            { required: true, message: 'Пожалуйста, укажите гражданство' }
                        ]}
                    >
                        {/* TODO: Выбор гражданства */}
                    </Form.Item>
                    <Form.Item
                        className="quarter-width pad-left pad-right"
                        name="male"
                        label="Пол"
                        rules={[
                            { required: true, message: 'Пожалуйста, выберите пол' }
                        ]}
                    >
                        {/* TODO: Выбор пола */}
                    </Form.Item>
                    <Form.Item
                        className="quarter-width pad-left"
                        name="dateOfBirth"
                        label="Дата рождения"
                        rules={[
                            { required: true, message: 'Пожалуйста, введите дату рождения' }
                        ]}
                    >
                        <DatePicker format="DD.MM.YYYY" />
                    </Form.Item>
                    <Form.Item
                        className="full-width"
                        name="placeOfBirth"
                        label="Место рождения (как указано в паспорте)"
                        rules={[
                            { required: true, message: 'Пожалуйста, введите место рождения' },
                            { type: "string", min: 2, max: 120, message: 'От 2 до 120 символов' }
                        ]}
                    >
                        <Input placeholder="Введите наименование региона и населенного пункта" />
                    </Form.Item>
                </Form>
            </Row>
            <Row className="align-corners">
                <Col>
                    <Button
                        type="default"
                    >
                        Отмена
                    </Button>
                </Col>
                <Col>
                    <Button
                        onClick={handleOk}
                        type="primary"
                    >
                        Далее
                    </Button>
                </Col>
            </Row>
        </Col>
    );
};

export { FormCommon };