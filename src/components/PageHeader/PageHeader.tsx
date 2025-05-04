import {useNavigate} from 'react-router-dom';
import {Button, Text} from '@gravity-ui/uikit';

import block from 'bem-cn-lite';
import './PageHeader.scss';
const b = block('pageHeader');

export const PageHeader = () => {
    const navigate = useNavigate();

    const onNavigationClick = (path: string) => {
        navigate(path);
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/auth');
    };

    return (
        <header className={b()}>
            <div className={b('name')} onClick={() => onNavigationClick('/')}>
                <Text variant="header-2">ТОЧКА С ЗАПЯТОЙ;</Text>
                <Text variant="subheader-1">ПАНЕЛЬ АДМИНИСТРАТОРА</Text>
            </div>
            <div className={b('buttons')}>
                <Button
                    view="action"
                    size="l"
                    onClick={() => onNavigationClick('/books')}
                    disabled={window.location.pathname === '/books'}
                >
                    Таблица книг
                </Button>
                <Button
                    view="action"
                    size="l"
                    onClick={() => onNavigationClick('/authorsAndGenres')}
                    disabled={window.location.pathname === '/authorsAndGenres'}
                >
                    Таблицы авторов и жанров
                </Button>
                <Button
                    view="action"
                    size="l"
                    onClick={() => onNavigationClick('/add')}
                    disabled={window.location.pathname === '/add'}
                >
                    Внесение данных
                </Button>
                <Button
                    view="outlined-danger"
                    size="l"
                    onClick={handleLogout}
                >
                    Выйти
                </Button>
            </div>
        </header>
    );
};

export default PageHeader;
