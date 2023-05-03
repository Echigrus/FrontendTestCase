import { FormRoutes } from "@enums/formRoutes";
import { FSteps } from "@molecules/steps";
import { FormCommon } from "@organisms/formCommon";
import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

const App = (): JSX.Element => {
    let navigate  = useNavigate();
    let location = useLocation();

    useEffect(() => {
        if (location?.pathname == '/') navigate(FormRoutes.Common);
    }, [location.pathname]);

    function getBody(): JSX.Element {
        return (
            <Routes>
                <Route path={FormRoutes.Common} element={<FormCommon />} />
                <Route path={FormRoutes.OwnershipForm} element={<></>} />
                <Route path={FormRoutes.RegistrationAddress} element={<></>} />
                <Route path={FormRoutes.ResidentialAddress} element={<></>} />
                <Route path={FormRoutes.Socials} element={<></>} />
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