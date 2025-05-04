import React, { useState } from 'react';
import {BookManagment, BookStatus, Genre} from '@/api/types';
import {
    Button,
    Flex,
    Icon,
    Table,
    TableDataItem,
    TableSettingsData,
    withTableActions,
    withTableSettings,
    TableActionConfig,
} from '@gravity-ui/uikit';
import {useDeleteBook} from '@/api/book/book';
import block from 'bem-cn-lite';
import './BookTable.scss';
import {CircleCheckFill, CircleXmarkFill, TrashBin} from '@gravity-ui/icons';
import {useAcceptRent, useEndRent} from '@/api/rent';
import {mapBookStatus} from '@/helpers/mapBookStatus';

const b = block('bookTable');
const TableWithActionsAndSettings = withTableSettings(withTableActions(Table));

const columns = [
    {id: 'bookId', name: 'ID книги'},
    {id: 'bookName', name: 'Название книги'},
    {id: 'authorName', name: 'Автор'},
    {
        id: 'bookPhotoUrl',
        name: 'Обложка',
        template: (book: TableDataItem) => {
            return <img className={b('bookImg')} src={book.bookPhotoUrl} alt={book.bookName} />;
        },
    },
    {
        id: 'status',
        name: 'Статус',
        template: (book: TableDataItem) => {
            return mapBookStatus(book.status);
        },
    },
    {id: 'firstName', name: 'Имя пользователя'},
    {id: 'lastName', name: 'Фамилия пользователя'},
    {id: 'email', name: 'Почта'},
    {id: 'dueDate', name: 'Дедлайн'},
    {id: 'ageLimit', name: 'Возрастное ограничение'},
    {id: 'rating', name: 'Рейтинг'},
    {
        id: 'genres',
        name: 'Жанры',
        template: (book: TableDataItem) => {
            return book.genres.map((genre: Genre) => genre.genreName).join(', ');
        },
    },
    {id: 'releaseYear', name: 'Год выпуска'},
];

export interface BookTableProps {
    books: BookManagment[];
}

export const BookTable: React.FC<BookTableProps> = ({books}) => {
    const [settings, setSettings] = useState<TableSettingsData>([]);
    const deleteBookMutation = useDeleteBook();
    const acceptRentMutation = useAcceptRent();
    const endRentMutation = useEndRent();

    const handleDelete = async (bookId: number) => {
        try {
            await deleteBookMutation.mutateAsync(bookId);
            alert('Книга успешно удалена');
        } catch (error) {
            console.error('Ошибка при удалении книги:', error);
        }
    };

    const handleAcceptRent = async (bookId: number) => {
        try {
            await acceptRentMutation.mutateAsync(bookId);
            alert('Книга успешно выдана читателю');
        } catch (error) {
            console.error('Ошибка при принятии аренды:', error);
        }
    };

    const handleEndRent = async (bookId: number) => {
        try {
            await endRentMutation.mutateAsync(bookId);
            alert('Книга возвращена читателем');
        } catch (error) {
            console.error('Ошибка при завершении аренды:', error);
        }
    };

    const getRowActions = (book: TableDataItem) => {
        const actions: TableActionConfig<TableDataItem>[] = [];
        
        actions.push({
            text: 'Удалить книгу',
            icon: <Icon data={TrashBin} />,
            handler: () => handleDelete(book.bookId),
        });

        if (book.status === BookStatus.BOOKED) {
            actions.push({
                text: 'Книга выдана читателю',
                icon: <Icon data={CircleCheckFill} />,
                handler: () => handleAcceptRent(book.bookId),
            });
        }

        if (book.status === BookStatus.READING) {
            actions.push({
                text: 'Книга возвращена читателем',
                icon: <Icon data={CircleXmarkFill} />,
                handler: () => handleEndRent(book.bookId),
            });
        }

        return actions;
    };

    const tableData = books.filter((data) => data.book.status !== BookStatus.NOT_AVAILABLE).map(({book, userData, dueDate}) => ({
        bookId: book.bookId,
        bookName: book.bookName,
        authorName: book.authorName,
        releaseYear: book.releaseYear,
        ageLimit: book.ageLimit,
        bookPhotoUrl: book.photoUrl,
        rating: book.rating,
        status: book.status,
        genres: book.genres,
        email: userData?.email,
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        dueDate: dueDate,
    }));

    return (
        <TableWithActionsAndSettings
            className={b()}
            data={tableData}
            columns={columns}
            getRowActions={(item) => getRowActions(item)}
            settings={settings}
            updateSettings={(newSettings) => {
                setSettings(newSettings);
                return Promise.resolve();
            }}
            renderControls={({ onApply }) => (
                <Flex gapRow="1" direction="column">
                    <Button
                        view="outlined"
                        onClick={() => {
                            onApply();
                            setSettings([]);
                        }}
                    >
                        Сбросить
                    </Button>
                    <Button view="action" onClick={onApply}>
                        Применить
                    </Button>
                </Flex>
            )}
            rowActionsSize="l"
            emptyMessage="Книги не найдены"
        />
    );
};
