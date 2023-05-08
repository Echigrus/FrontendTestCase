import { Common } from "@classes/commonFunctions";
import { ImgUploader } from "@molecules/imgUploader";
import { FormStore } from "@store/formStore";
import { FormInstance, Form, Row, Col, Input, DatePicker, Checkbox } from "antd";
import React from "react";

type TProps = {
    form: FormInstance,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    store: FormStore
};

const FormEntrepreneur = ({ form, setIsLoading, store }: TProps): JSX.Element => {
    return (
        <Form
            className="ftc-entrepreneur-form"
            form={form}
            layout="vertical"
        >
            <Row>
                <Col className="quarter-width">
                    <Form.Item
                        name="INN"
                        label="ИНН"
                        rules={[
                            { required: true, type: "string", pattern: /^\d{10}$/, message: "Пожалуйста, введите ИНН" }
                        ]}
                    >
                        <Input placeholder="XXXXXXXXXX" />
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
                        <ImgUploader
                            onImageSelect={(file) => {
                                form.setFieldValue("scanINN", file);
                                store.changeEntrepreneurData({
                                    ...store.getEntrepeneurData(),
                                    scanINN: file
                                });
                            }}
                            onImageDelete={() => {
                                form.setFieldValue("scanINN", null);
                                store.changeEntrepreneurData({
                                    ...store.getEntrepeneurData(),
                                    scanINN: null
                                });
                            }}
                        />
                    </Form.Item>
                </Col>
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
            </Row>
            <Row>
                <Col className="half-width">
                    <Form.Item
                        name="OGRNIP"
                        label="ОГРНИП"
                        rules={[
                            { required: true, type: "string", pattern: /^\d{15}$/, message: "Пожалуйста, введите ОГРНИП" }
                        ]}
                    >
                        <Input placeholder="XXXXXXXXXXXXXXXX" />
                    </Form.Item>
                </Col>
                <Col className="half-width">
                    <Form.Item
                        name="scanOGRNIP"
                        label="Скан ОГРНИП"
                        rules={[
                            { required: true, message: "Пожалуйста, прикрепите скан ОГРНИП" }
                        ]}
                    >
                        {/* TODO: загрузка файла */}
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col className="half-width">
                    <Form.Item
                        name="leaseContract"
                        label="Скан договора аренды помещения (офиса)"
                    >
                        {/* TODO: загрузка файла */}
                    </Form.Item>
                </Col>
                <Col className="half-width">
                    <Form.Item
                        name="scanEGRIP"
                        label="Скан выписки из ЕГРИП (не старше 3 месяцев)"
                        rules={[
                            { required: true, message: "Пожалуйста, прикрепите скан выписки из ЕГРИП" }
                        ]}
                    >
                        {/* TODO: загрузка файла */}
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col className="quarter-width">
                    <Form.Item name="noLeaseContract">
                        <Checkbox>Нет договора</Checkbox>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export { FormEntrepreneur };