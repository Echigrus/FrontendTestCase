import { Common } from "@classes/commonFunctions";
import { GlobalConstants } from "@constants/global";
import { FormRoutes } from "@enums/formRoutes";
import { faPerson, faPersonDress, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormStore } from "@store/formStore";
import { Button, Col, DatePicker, Form, Input, Popconfirm, Radio, Row, Select } from "antd";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type TProps = {
    store: FormStore
};

const FormCommon = observer(({ store }: TProps): JSX.Element => {
    const [commonForm] = Form.useForm();
    let navigate  = useNavigate();
    const namePattern = /^([a-zA-Zа-яА-ЯёЁ]+([-']{1}[a-zA-Zа-яА-ЯёЁ]+)*){1,3}$/;

    function handleOk() {
        commonForm.validateFields()
            .then((values) => {
                let newValues = values;
                if (values.patronymic == "") newValues.patronymic = null;
                store.changeCommonData(newValues);
                navigate(FormRoutes.OwnershipForm);
            })
            .catch((errorInfo) => console.log(errorInfo));
    }

    useEffect(() => {
        commonForm.setFieldsValue(toJS(store.getCommonData()));
    }, []);

    return (
        <Col className="ftc-common">
            <Row>
                <Col>
                    <div className="ftc-icon">
                        <FontAwesomeIcon className="icon-blue" icon={faUser} />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className="ftc-primary-text">
                        Общие
                    </p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className="ftc-secondary-text">
                        Введите свои персональные данные.
                    </p>
                </Col>
            </Row>
            <Row>
                <Form
                    className="ftc-common-form"
                    form={commonForm}
                    layout="vertical"
                >
                    <Row>
                        <Col className="half-width">
                            <Form.Item
                                name="surname"
                                label="Фамилия"
                                rules={[
                                    { required: true, message: 'Пожалуйста, введите фамилию', pattern: namePattern },
                                    { type: "string", min: 2, max: 60, message: 'От 2 до 60 символов', whitespace: true }
                                ]}
                            >
                                <Input placeholder="Васильев" />
                            </Form.Item>
                        </Col>
                        <Col className="half-width">
                            <Form.Item
                                name="name"
                                label="Имя"
                                rules={[
                                    { required: true, message: 'Пожалуйста, введите имя', pattern: namePattern },
                                    { type: "string", min: 2, max: 60, message: 'От 2 до 60 символов', whitespace: true }
                                ]}
                            >
                                <Input placeholder="Иван" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="half-width">
                            <Form.Item
                                name="patronymic"
                                label="Отчество"
                                rules={[
                                    { type: "string", min: 0, max: 60, message: 'Не больше 60 символов', whitespace: true }
                                ]}
                            >
                                <Input placeholder="Сергеевич" />
                            </Form.Item>
                        </Col>
                        <Col className="half-width">
                            <Form.Item
                                name="city"
                                label="Основной город"
                                rules={[
                                    { required: true, message: 'Пожалуйста, выберите город' }
                                ]}
                            >
                                <Select 
                                    options={GlobalConstants.Cities.map((val) => {
                                        return { value: val, label: val };
                                    })}
                                    placeholder="Выберите город"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="half-width">
                            <Form.Item
                                name="citizenship"
                                label="Гражданство"
                                rules={[
                                    { required: true, message: 'Пожалуйста, укажите гражданство' }
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
                        <Col className="quarter-width">
                            <Form.Item
                                name="male"
                                label="Пол"
                                rules={[
                                    { required: true, message: 'Пожалуйста, выберите пол' }
                                ]}
                            >
                                <Radio.Group className="ftc-common-male" buttonStyle="solid">
                                    <Radio.Button value={true}>
                                        <Row>
                                            <Col>
                                                <FontAwesomeIcon icon={faPerson} />
                                            </Col>
                                            <Col>
                                                М
                                            </Col>
                                        </Row>
                                    </Radio.Button>
                                    <Radio.Button value={false}>
                                        <Row>
                                            <Col>
                                                <FontAwesomeIcon icon={faPersonDress} />
                                            </Col>
                                            <Col>
                                                Ж
                                            </Col>
                                        </Row>
                                    </Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col className="quarter-width">
                            <Form.Item
                                name="dateOfBirth"
                                label="Дата рождения"
                                rules={[
                                    { required: true, message: 'Пожалуйста, введите дату рождения' },
                                    { validator: Common.dateValidator }
                                ]}
                            >
                                <DatePicker format="DD.MM.YYYY" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="full-width">
                            <Form.Item
                                name="placeOfBirth"
                                label="Место рождения (как указано в паспорте)"
                                rules={[
                                    { required: true, message: 'Пожалуйста, введите место рождения' },
                                    { type: "string", min: 2, max: 120, message: 'От 2 до 120 символов', whitespace: true }
                                ]}
                            >
                                <Input placeholder="Введите наименование региона и населенного пункта" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Row>
            <Row className="align-corners">
                <Col>
                    <Popconfirm
                        title="Удалить данные?"
                        description="Это действие опустошит всю анкету"
                        okText="Да"
                        cancelText="Нет"
                        onConfirm={() => {
                            store.clear();
                            commonForm.resetFields();
                            commonForm.setFieldsValue(store.getCommonData());
                        }}
                    >
                        <Button
                            type="default"
                        >
                            Отмена
                        </Button>
                    </Popconfirm>
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
});

export { FormCommon };