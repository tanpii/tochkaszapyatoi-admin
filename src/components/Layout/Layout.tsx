import {Footer} from '@gravity-ui/navigation';
import {Outlet} from 'react-router-dom';
import {PageHeader} from '../PageHeader';

import block from 'bem-cn-lite';
import './Layout.scss';
const b = block('layout');

export const Layout = () => {
    return (
        <div className={b()}>
            <PageHeader />
            <Outlet />
            <Footer className={b('footer')} copyright={`@ ${new Date().getFullYear()} "Точка с запятой"`} view="clear" />
        </div>
    );
};

export default Layout;
