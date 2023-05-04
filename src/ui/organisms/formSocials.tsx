import { FormRoutes } from "@enums/formRoutes";
import { faEnvelopesBulk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormStore } from "@store/formStore";
import { Button, Col, Row } from "antd";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";

type TProps = {
    store: FormStore
};

const FormSocials = observer(({ store }: TProps): JSX.Element => {
    let navigate  = useNavigate();

    async function handleOk() {
        
    }

    return (
        <Col className="ftc-socials">
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
                        disabled={store.ownershipForm == null}
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