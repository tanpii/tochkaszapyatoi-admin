import React from 'react';
import {Table} from '@gravity-ui/uikit';
import block from 'bem-cn-lite';
import './GenreTable.scss';

const b = block('genreTable');

const columns = [
    {id: 'genreId', name: 'ID жанра'},
    {id: 'genreName', name: 'Название жанра'},
];

export const GenreTable: React.FC<{genres: any}> = ({genres}) => {
    return <Table className={b()} data={genres || []} columns={columns} />;
};
