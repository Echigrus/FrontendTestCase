import { Api } from "@api/api";
import { GlobalConstants } from "@constants/global";
import { FormRoutes } from "@enums/formRoutes";
import { faEnvelopesBulk, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormStore } from "@store/formStore";
import { Button, Col, Form, Input, Row, Select, Space, message } from "antd";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type TProps = {
    store: FormStore
};

const FormSocials = observer(({ store }: TProps): JSX.Element => {
    const [socialsForm] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    let navigate  = useNavigate();

    async function handleOk() {
        socialsForm.validateFields()
            .then(async (values) => {
                store.changeSocials(values.socials);
                const api = new Api(GlobalConstants.BaseUrl);
                try {
                    const result = await api.saveForm(
                        toJS(store.getCommonData()),
                        store.ownershipForm,
                        toJS(store.getEntrepeneurData()),
                        toJS(store.getCompanyData()),
                        toJS(store.getRegistrationAddress()),
                        store.addressesMatch,
                        toJS(store.getResidentialAddress()),
                        store.getSocials()
                    );
                    messageApi.success(result.data.data);
                } catch (error) {
                    messageApi.error(error.toString());
                }
            })
            .catch((errorInfo) => console.log(errorInfo));
    }

    useEffect(() => {
        socialsForm.setFieldsValue(toJS(store.getSocials()));
    }, []);

    return (
        <Col className="ftc-socials">
            { contextHolder }
            <Row>
                <Col>
                    <div className="ftc-icon">
                        <FontAwesomeIcon className="icon-blue" icon={faEnvelopesBulk} />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className="ftc-primary-text">
                        Социальные сети
                    </p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className="ftc-secondary-text">
                        Введите свои действующие ссылки на социальные сети и количество подписчиков.
                    </p>
                </Col>
            </Row>
            <Row>
                <Form
                    form={socialsForm}
                    layout="vertical"
                    name="ftc-socials-form"
                >
                    <Form.List
                        name="socials"
                        rules={[
                            {
                                validator: async (_, socials) => {
                                    if (!socials || socials.length < 1) {
                                        return Promise.reject(new Error('Минимум 1 профиль'));
                                    }
                                },
                            },
                        ]}
                    >   
                        {(fields, { add, remove }, { errors }) => (
                            <Col>
                                {fields.map((field, index) => (
                                    <Row key={field.key}>
                                        <Form.Item
                                            label="Сайт / Приложение"
                                            required={false}
                                        >
                                            <Space.Compact>
                                                <Form.Item
                                                    name={[field.key, 'website']}
                                                    rules={[{ required: true, message: "Пожалуйста, выберите сайт" }]}
                                                >
                                                    <Select 
                                                        options={GlobalConstants.SocialNetworks.map((sn) => {
                                                            return { value: sn.name, label: sn.name };
                                                        })}
                                                        placeholder="Выберите сайт"    
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    name={[field.key, 'profileLink']}
                                                    rules={[{ required: true, whitespace: true, message: "Пожалуйста, введите ссылку" }]}
                                                >
                                                    <Input placeholder="Введите ссылку" />
                                                </Form.Item>
                                            </Space.Compact>
                                            {fields.length > 1 ? (
                                                <Button 
                                                    className="delete-btn"
                                                    danger
                                                    icon={<FontAwesomeIcon icon={faMinus} />}
                                                    onClick={() => remove(field.name)}
                                                />
                                            ) : null}
                                        </Form.Item>
                                    </Row>
                                ))}
                                <Row>
                                    <Form.Item>
                                        <Button
                                            type="dashed"
                                            onClick={() => add()}
                                            icon={<FontAwesomeIcon icon={faPlus} />}
                                        >
                                            Добавить социальную сеть
                                        </Button>
                                        <Form.ErrorList errors={errors} />
                                    </Form.Item>
                                </Row>
                            </Col>
                        )}
                    </Form.List>
                </Form>
            </Row>
            <Row className="align-corners">
                <Col>
                    <Button
                        onClick={() => navigate(FormRoutes.ResidentialAddress)}
                        type="default"
                    >
                        Назад
                    </Button>
                </Col>
                <Col>
                    <Button
                        /* disabled={store.ownershipForm == null} */
                        onClick={handleOk}
                        type="primary"
                    >
                        Сохранить
                    </Button>
                </Col>
            </Row>
        </Col>
    );
});

export { FormSocials };