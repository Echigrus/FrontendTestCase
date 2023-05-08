import { FormRoutes } from "@enums/formRoutes";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormStore } from "@store/formStore";
import { Button, Col, Form, Row } from "antd";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormAddress } from "./formAddress";

type TProps = {
    store: FormStore
};

const FormRegistrationAddress = observer(({ store }: TProps): JSX.Element => {
    const [registrationForm] = Form.useForm();
    let navigate  = useNavigate();

    function handleOk() {
        registrationForm.validateFields()
            .then((values) => {
                store.changeResidentialAddress(values);
                navigate(FormRoutes.ResidentialAddress);
            })
            .catch((errorInfo) => console.log(errorInfo));
    }

    useEffect(() => {
        registrationForm.setFieldsValue(store.getRegistrationAddress());
    }, []);

    return (
        <Col className="ftc-registration-address">
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