import { FormRoutes } from "@enums/formRoutes";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormStore } from "@store/formStore";
import { Col, Row, Button, Select, Form, message } from "antd";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormEntrepreneur } from "./formEntrepreneur";
import { FormCompany } from "./formCompany";
import { Loader } from "@atoms/loader";
import { sendRequest } from "@api/sendRequest";
import { ImageUploadResp } from "@api/responseModels/imageUploadResp";
import { toJS } from "mobx";

type TProps = {
    store: FormStore
};

const FormOwnership = observer(({ store }: TProps): JSX.Element => {
    const [messageApi, contextHolder] = message.useMessage();
    let navigate  = useNavigate();
    const [entrepreneurForm] = Form.useForm();
    const [companyForm] = Form.useForm();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function validateValues(): Promise<any> {
        let newValues = null;
        if (store.ownershipForm == "entrepreneur") {
            newValues = await entrepreneurForm.validateFields()
                .then((values) => {
                    return values;
                })
                .catch((errorInfo) => console.log(errorInfo));
        } else if (store.ownershipForm == "company") {
            newValues = companyForm.validateFields()
                .then((values) => {
                    return values;
                })
                .catch((errorInfo) => console.log(errorInfo));
        }
        if (newValues?.errorFields) return null;
        return newValues;
    }

    async function sendImage(img: File): Promise<string> {
        const formData = new FormData();
        formData.append("img", img);
        const sendImg = await sendRequest<ImageUploadResp>('/upload-img', formData);
        if (sendImg.errorMessages) throw sendImg.errorMessages;
        return sendImg.data.url;
    }

    async function handleOk() {
        let newValues = await validateValues();
        if (newValues == null) return;
        setIsLoading(true);
        if (store.ownershipForm == "entrepreneur") {
            try {
                const urlScanINN = await sendImage(newValues['scanINN']);
                const urlScanOGRNIP = await sendImage(newValues['scanOGRNIP']);
                const urlLeaseContract = newValues['noLeaseContract'] 
                    ? null 
                    : await sendImage(newValues['leaseContract']);
                const urlScanEGRIP = await sendImage(newValues['scanEGRIP']);
                store.changeEntrepreneurData({
                    ...newValues,
                    scanINN: urlScanINN,
                    scanOGRNIP: urlScanOGRNIP,
                    scanEGRIP: urlScanEGRIP,
                    leaseContract: urlLeaseContract
                });
                navigate(FormRoutes.RegistrationAddress);
            } catch (err) {
                messageApi.error(err);
            }
        }
        else {
            try {
                const urlScanINN = await sendImage(newValues['scanINN']);
                const urlScanOGRN = await sendImage(newValues['scanOGRN']);
                store.changeCompanyData({
                    ...newValues,
                    scanINN: urlScanINN,
                    scanOGRN: urlScanOGRN
                });
                navigate(FormRoutes.RegistrationAddress);
            } catch (err) {
                messageApi.error(err);
            }
        }
        setIsLoading(false);
    }

    function setValues() {
        switch(store.ownershipForm) {
            case "entrepreneur":
                entrepreneurForm.setFieldsValue(toJS(store.getEntrepeneurData()));
                break;
            case "company":
                companyForm.setFieldsValue(toJS(store.getCompanyData()));
                break;
            default: 
                entrepreneurForm.resetFields();
                companyForm.resetFields();
                break;
        }
    }

    useEffect(() => {
        setValues();
    }, [store.ownershipForm]);

    useEffect(() => {
        setValues();
    }, [])

    return (
        <Col className="ftc-ownership">
            { contextHolder }
            { isLoading && <Loader />}
            <Row>
                <Col>
                    <div className="ftc-icon">
                        <FontAwesomeIcon className="icon-blue" icon={faPhone} />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className="ftc-primary-text">
                        Форма собственности
                    </p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className="ftc-secondary-text">
                        Введите форму собственности и заполните данные.
                    </p>
                </Col>
            </Row>
            <Row>
                <Col className="three-quarters-width">
                    <Select 
                        className="full-width"
                        defaultValue={store.ownershipForm}
                        onSelect={(val) => store.changeOwnershipForm(val)}
                        options={[
                            {
                                value: "entrepreneur",
                                label: "Индивидуальный предприниматель (ИП)"
                            },
                            {
                                value: "company",
                                label: "Общество с ограниченной ответственностью (ООО)"
                            }
                        ]}
                        placeholder="Выбрать"
                    />
                </Col>
            </Row>
            {
                store.ownershipForm == "entrepreneur" && (
                    <Row>
                        <FormEntrepreneur form={entrepreneurForm} store={store} />
                    </Row>
                )
            }
            {
                store.ownershipForm == "company" && (
                    <Row>
                        <FormCompany form={companyForm} messageApi={messageApi} setIsLoading={setIsLoading} store={store} />
                    </Row>
                )
            }
            <Row className="align-corners">
                <Col>
                    <Button
                        onClick={() => navigate(FormRoutes.Common)}
                        type="default"
                    >
                        Назад
                    </Button>
                </Col>
                <Col>
                    <Button
                        disabled={store.ownershipForm == null}
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

export { FormOwnership };