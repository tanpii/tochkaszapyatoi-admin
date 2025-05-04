import React from 'react';
import {Table, TableDataItem} from '@gravity-ui/uikit';
import block from 'bem-cn-lite';
import './AuthorTable.scss';

const b = block('authorTable');

const columns = [
    {id: 'authorId', name: 'ID автора'},
    {id: 'authorName', name: 'Имя автора'},
    {
        id: 'photoUrl',
        name: 'Фото',
        template: (author: TableDataItem) => {
            return <img className={b('authorImg')} src={author.photoUrl} alt={author.authorName} />;
        },
    },
];

export const AuthorTable: React.FC<{authors: any}> = ({authors}) => {
    return <Table className={b()} data={authors || []} columns={columns} />;
};
