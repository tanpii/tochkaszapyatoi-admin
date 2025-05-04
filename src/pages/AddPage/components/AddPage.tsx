import {useState} from 'react';
import {AddBookForm} from '@/components/AddBookForm/AddBookForm';
import AddAuthorForm from '@/components/AddAuthorForm/AddAuthorForm';
import {Text, Tabs} from '@gravity-ui/uikit';
import block from 'bem-cn-lite';
import './AddPage.scss';

const b = block('addPage');

export const AddPage = () => {
    const [activeTab, setActiveTab] = useState('addBook');

    const tabs = [
        {id: 'addBook', title: 'Добавить книгу'},
        {id: 'addAuthor', title: 'Добавить автора'},
    ];

    return (
        <div className={b()}>
            <Text variant="header-2">УПРАВЛЕНИЕ ДОБАВЛЕНИЕМ</Text>
            <Tabs
                className={b('tabs')}
                activeTab={activeTab}
                onSelectTab={setActiveTab}
                items={tabs}
                size="l"
            />
            <div className={b('form')}>
                {activeTab === 'addBook' && (
                    <>
                        <AddBookForm />
                    </>
                )}
                {activeTab === 'addAuthor' && (
                    <>
                        <AddAuthorForm />
                    </>
                )}
            </div>
        </div>
    );
};

export default AddPage;
