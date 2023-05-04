import { FormRoutes } from "@enums/formRoutes";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormStore } from "@store/formStore";
import { Button, Checkbox, Col, Form, Row } from "antd";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormAddress } from "./formAddress";

type TProps = {
    store: FormStore
};

const FormResidentialAddress = observer(({ store }: TProps): JSX.Element => {
    const [residentialForm] = Form.useForm();
    let navigate  = useNavigate();

    function handleOk() {

    }

    useEffect(() => {
        residentialForm.setFieldsValue(store.getResidentialAddress());
    }, []);

    return (
        <Col className="ftc-residential-address">
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