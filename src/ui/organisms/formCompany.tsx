import { Api } from "@api/api";
import { Common } from "@classes/commonFunctions";
import { GlobalConstants } from "@constants/global";
import { ImgUploader } from "@molecules/imgUploader";
import { FormStore } from "@store/formStore";
import { FormInstance, Form, Col, Input, Row, DatePicker, Space, Button } from "antd";
import React from "react";
import * as dayjs from 'dayjs';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { MessageInstance } from "antd/es/message/interface";

type TProps = {
    form: FormInstance,
    messageApi: MessageInstance,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    store: FormStore
};

const FormCompany = ({ form, messageApi, setIsLoading, store }: TProps): JSX.Element => {
    async function onSubmitINN() {
        const inn = form.getFieldValue('INN');
        if (inn == null || inn == '') {
            messageApi.error("Пожалуйста, введите ИНН");
            return;
        }
        if (!RegExp(/^\d{10}$/).test(inn)) {
            messageApi.error("ИНН не соответствует формату");
            return;
        }
        setIsLoading(true);
        try {
            const api = new Api(GlobalConstants.CompanyInfoUrl, GlobalConstants.ApiKey);
            const result = await api.getCompanyInfo(inn);
            if (result.errorMessages) throw result.errorMessages;
            if (result.data.suggestions.length == 0) throw "Не удалось найти компанию";
            let formValues = form.getFieldsValue();
            formValues['fullName'] = result.data.suggestions[0].data.name.full_with_opf;
            formValues['shortName'] = result.data.suggestions[0].data.name.short_with_opf;
            formValues['OGRN'] = result.data.suggestions[0].data.ogrn;
            formValues['dateOfRegistration'] = dayjs(result.data.suggestions[0].data.state.registration_date);
            form.setFieldsValue(formValues);
        } catch (err) {
            messageApi.error(err)
        }
        setIsLoading(false);
    }

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
                        name="dateOfRegistration"
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
                    <Form.Item label="ИНН" required>
                        <Space.Compact className="inn-space-compact">
                            <Form.Item
                                className="inn-control"
                                name="INN"
                                rules={[
                                    { required: true, type: "string", pattern: /^\d{10}$/, message: "Пожалуйста, введите ИНН" }
                                ]}
                            >
                                <Input 
                                    placeholder="XXXXXXXXXXX"    
                                />
                            </Form.Item>
                            <Button
                                icon={<FontAwesomeIcon icon={faCheck} />}
                                onClick={onSubmitINN} 
                                type="primary"
                            />
                        </Space.Compact>
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
                            photoSrc={store.getCompanyData().scanINN?.toString()}
                            onImageSelect={(file) => {
                                form.setFieldValue("scanINN", file);
                                store.changeCompanyData({
                                    ...store.getCompanyData(),
                                    scanINN: file
                                });
                            }}
                            onImageDelete={() => {
                                form.setFieldValue("scanINN", null);
                                store.changeCompanyData({
                                    ...store.getCompanyData(),
                                    scanINN: null
                                });
                            }}
                        />
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
                        <ImgUploader
                            photoSrc={store.getCompanyData().scanOGRN?.toString()}
                            onImageSelect={(file) => {
                                form.setFieldValue("scanOGRN", file);
                                store.changeCompanyData({
                                    ...store.getCompanyData(),
                                    scanOGRN: file
                                });
                            }}
                            onImageDelete={() => {
                                form.setFieldValue("scanOGRN", null);
                                store.changeCompanyData({
                                    ...store.getCompanyData(),
                                    scanOGRN: null
                                });
                            }}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export { FormCompany };
