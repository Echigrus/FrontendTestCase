import { GlobalConstants } from '../constants/global';
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from 'antd';
import { App } from '../ui/pages/app';
import { BrowserRouter as Router } from 'react-router-dom';

import "../utils/configureMobX";
import 'antd/dist/reset.css';
import '../styles/style.scss';
import ru from 'antd/es/locale/ru_RU';

export const render = () => {
    const container = document.getElementById(GlobalConstants.MainRoot);
    const root = createRoot(container);
    root.render(
        <ConfigProvider locale={ru}>
            <Router>
                <App />
            </Router>
        </ConfigProvider>
    );
};

render();