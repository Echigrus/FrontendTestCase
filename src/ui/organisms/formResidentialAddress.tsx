import { FormRoutes } from "@enums/formRoutes";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormStore } from "@store/formStore";
import { Button, Checkbox, Col, Form, Row, message } from "antd";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormAddress } from "./formAddress";
import { toJS } from "mobx";

type TProps = {
    store: FormStore
};

const FormResidentialAddress = observer(({ store }: TProps): JSX.Element => {
    const [messageApi, contextHolder] = message.useMessage();
    const [residentialForm] = Form.useForm();
    let navigate  = useNavigate();

    function handleOk() {
        if (store.addressesMatch) {
            store.changeResidentialAddress(toJS(store.getRegistrationAddress()));
            navigate(FormRoutes.Socials);
        }
        else {
            residentialForm.validateFields()
                .then((values) => {
                    if (values["noApartment"] != true && (values["apartment"] == 0 || values["apartment"] == null)) {
                        messageApi.error("Пожалуйста, введите номер квартиры");
                        return;
                    }
                    store.changeResidentialAddress(values);
                    navigate(FormRoutes.Socials);
                })
                .catch((errorInfo) => console.log(errorInfo));
        }
    }

    useEffect(() => {
        if (store.addressesMatch) {
            residentialForm.setFieldsValue(toJS(store.getRegistrationAddress()));
        }
        else {
            residentialForm.setFieldsValue(toJS(store.getResidentialAddress()));
        }
    }, [store.addressesMatch])

    return (
        <Col className="ftc-residential-address">
            { contextHolder }
            <Row>
                <Col>
                    <div className="ftc-icon">
                        <FontAwesomeIcon className="icon-blue" icon={faHouse} />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className="ftc-primary-text">
                        Адрес проживания
                    </p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className="ftc-secondary-text">
                        Введите свой действующий адрес проживания
                    </p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Checkbox
                        defaultChecked={store.addressesMatch}
                        onChange={(e) => {
                            if(e.target.checked) store.setEqualAddresses();
                            else store.setUnequalAddresses();
                        }}
                    >
                        Адрес регистрации и фактического проживания совпадают
                    </Checkbox>
                </Col>
            </Row>
            <Row>
                <FormAddress disabled={store.addressesMatch} form={residentialForm} />
            </Row>
            <Row className="align-corners">
                <Col>
                    <Button
                        onClick={() => navigate(FormRoutes.RegistrationAddress)}
                        type="default"
                    >
                        Назад
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
});

export { FormResidentialAddress };