import { FormRoutes } from "@enums/formRoutes";
import { FSteps } from "@molecules/steps";
import { FormCommon } from "@organisms/formCommon";
import { FormOwnership } from "@organisms/formOwnership";
import { FormRegistrationAddress } from "@organisms/formRegistrationAddress";
import { FormResidentialAddress } from "@organisms/formResidentialAddress";
import { FormSocials } from "@organisms/formSocials";
import { FormStore } from "@store/formStore";
import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { Routes, Route, Navigate } from "react-router-dom";

const formStore = new FormStore();

const App = (): JSX.Element => {
    function getBody(): JSX.Element {
        return (
            <Routes>
                <Route path="/" element={<Navigate to={FormRoutes.Common} replace={true} />} />
                <Route path={FormRoutes.Common} element={<FormCommon store={formStore} />} />
                <Route path={FormRoutes.OwnershipForm} element={<FormOwnership store={formStore} />} />
                <Route path={FormRoutes.RegistrationAddress} element={<FormRegistrationAddress store={formStore} />} />
                <Route path={FormRoutes.ResidentialAddress} element={<FormResidentialAddress store={formStore} />} />
                <Route path={FormRoutes.Socials} element={<FormSocials store={formStore} />} />
                <Route path="*" element={<Navigate to="/" replace={true} />} />
            </Routes>
        );
    }

    return (
        <Layout>
            <Sider
                breakpoint="lg"
                className="ftc-app-sider"
                collapsedWidth={"0"}
                theme="light"
                width="33%"
            >
                <FSteps />
            </Sider>
            <Layout id="ftc-app-content">
                <Content>
                    {getBody()}
                </Content>
            </Layout>
        </Layout>
    );
};

export { App };