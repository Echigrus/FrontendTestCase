import { FormRoutes } from "@enums/formRoutes";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormStore } from "@store/formStore";
import { Col, Row, Button, Select, Form } from "antd";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormEntrepreneur } from "./formEntrepreneur";
import { FormCompany } from "./formCompany";

type TProps = {
    store: FormStore
};

const FormOwnership = observer(({ store }: TProps): JSX.Element => {
    let navigate  = useNavigate();
    const [entrepreneurForm] = Form.useForm();
    const [companyForm] = Form.useForm();

    async function handleOk() {

    }

    useEffect(() => {
        switch(store.ownershipForm) {
            case "entrepreneur":
                entrepreneurForm.setFieldsValue(store.getEntrepeneurData());
                break;
            case "company":
                companyForm.setFieldsValue(store.getCompanyData());
                break;
            default: 
                entrepreneurForm.resetFields();
                companyForm.resetFields();
                break;
        }
    }, [store.ownershipForm]);

    return (
        <Col className="ftc-ownership">
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
                        <FormEntrepreneur form={entrepreneurForm} />
                    </Row>
                )
            }
            {
                store.ownershipForm == "company" && (
                    <Row>
                        <FormCompany form={companyForm} />
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