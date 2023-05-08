import { FormRoutes } from "@enums/formRoutes";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormStore } from "@store/formStore";
import { Button, Col, Form, Row, message } from "antd";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormAddress } from "./formAddress";
import { toJS } from "mobx";

type TProps = {
    store: FormStore
};

const FormRegistrationAddress = observer(({ store }: TProps): JSX.Element => {
    const [messageApi, contextHolder] = message.useMessage();
    const [registrationForm] = Form.useForm();
    let navigate  = useNavigate();

    function handleOk() {
        registrationForm.validateFields()
            .then((values) => {
                if (values["noApartment"] != true 
                    && (values["apartment"] == 0 || values["apartment"] == null)) {
                    messageApi.error("Пожалуйста, введите номер квартиры");
                    return;
                }
                store.changeRegistrationAddress(values);
                navigate(FormRoutes.ResidentialAddress);
            })
            .catch((errorInfo) => console.log(errorInfo));
    }

    useEffect(() => {
        registrationForm.setFieldsValue(toJS(store.getRegistrationAddress()));
    }, []);

    return (
        <Col className="ftc-registration-address">
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
                        Адрес регистрации
                    </p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className="ftc-secondary-text">
                        Введите свой действующий адрес прописки
                    </p>
                </Col>
            </Row>
            <Row>
                <FormAddress disabled={false} form={registrationForm} />
            </Row>
            <Row className="align-corners">
                <Col>
                    <Button
                        onClick={() => navigate(FormRoutes.OwnershipForm)}
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

export { FormRegistrationAddress };