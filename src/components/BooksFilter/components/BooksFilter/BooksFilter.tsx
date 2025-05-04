import { useState, useCallback } from 'react';
import { Button, Icon, TextInput } from '@gravity-ui/uikit';
import { Magnifier } from '@gravity-ui/icons';
import GenreFilter from '../GenreFilter/GenreFilter';
import { useForm } from 'react-hook-form';
import block from 'bem-cn-lite';
import './BooksFilter.scss';

const b = block('booksFilter');

export interface BooksFilterProps {
    onConfirm: (filters: { bookTitle?: string; author?: string; genreIds?: number[] }) => void;
}

export const BooksFilter = ({ onConfirm }: BooksFilterProps) => {
    const [genresLocal, setGenresLocal] = useState<number[]>([]);

    const {
        register,
        handleSubmit,
        reset,
    } = useForm<{ bookTitle: string; author: string }>();

    const handleConfirm = useCallback((data: { bookTitle: string; author: string }) => {
        onConfirm({ 
            bookTitle: data.bookTitle || undefined, 
            author: data.author || undefined, 
            genreIds: genresLocal 
        });
    }, [genresLocal, onConfirm]);

    const handleReset = useCallback(() => {
        reset();
        setGenresLocal([]);
        onConfirm({ bookTitle: '', author: '', genreIds: [] });
    }, [onConfirm, reset]);

    return (
        <div className={b()}>
            <form onSubmit={handleSubmit(handleConfirm)} className={b('filters')}>
                <TextInput
                    placeholder={'Название книги'}
                    startContent={<Icon data={Magnifier} />}
                    {...register('bookTitle')}
                    hasClear
                />
                <TextInput
                    placeholder={'Автор'}
                    startContent={<Icon data={Magnifier} />}
                    {...register('author')}
                    hasClear
                />
                <div className={b('genres_container')}>
                    <GenreFilter selectedGenres={genresLocal} onChange={setGenresLocal} />
                </div>
            </form>
            <div className={b('buttons')}>
                <Button onClick={handleSubmit(handleConfirm)} view="action" type="submit">
                    Применить
                </Button>
                <Button onClick={handleReset} view="action" type="reset">
                    Сбросить
                </Button>
            </div>
        </div>
    );
};

export default BooksFilter;
