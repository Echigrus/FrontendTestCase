import { FormRoutes } from "@enums/formRoutes";
import { Space, Steps } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const FSteps = (): JSX.Element => {
    let location = useLocation();
    const [currentStep, setCurrentStep] = useState<number>(0);

    useEffect(() => {
        switch (location.pathname) {
            case FormRoutes.Common:
                setCurrentStep(0);
                break;
            case FormRoutes.OwnershipForm:
                setCurrentStep(1);
                break;
            case FormRoutes.RegistrationAddress:
                setCurrentStep(2);
                break;
            case FormRoutes.ResidentialAddress:
                setCurrentStep(3);
                break;
            case FormRoutes.Socials:
                setCurrentStep(4);
                break;
            default:
                setCurrentStep(0);
                break;
        }
    }, [location?.pathname]);

    return (
        <Space 
            className="ftc-steps"
            direction="vertical"
            size={20}
        >
            <p className="ftc-primary-text">
                Создание аккаунта
            </p>
            <p className="ftc-secondary-text">
                Заполните все пункты данной формы и нажмите кнопку "Сохранить".
            </p>
            <Steps 
                current={currentStep}
                direction={"vertical"}
                items={[
                    {
                        title: "Общие",
                    },
                    {
                        title: "Форма собственности",
                    },
                    {
                        title: "Адрес регистрации",
                    },
                    {
                        title: "Адрес проживания",
                    },
                    {
                        title: "Социальные сети",
                    },
                ]}
            />
        </Space>
    );
};

export { FSteps };