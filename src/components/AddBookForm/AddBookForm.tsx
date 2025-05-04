import React, { useCallback } from 'react';
import { Button, TextInput, TextArea, Text } from '@gravity-ui/uikit';
import { useAddNewBook } from '@/api/book/book';
import { FileUpload } from '../FileUpload/FileUpload';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import block from 'bem-cn-lite';
import './AddBookForm.scss';

const b = block('add-book-form');

const schema = yup.object().shape({
    authorId: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .required('ID автора обязателен')
        .positive('ID автора должен быть положительным числом'),
    bookName: yup.string().required('Название книги обязательно'),
    releaseYear: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .required('Год выпуска обязателен')
        .min(1900, 'Год выпуска должен быть не раньше 1900')
        .max(new Date().getFullYear(), 'Год выпуска не может быть в будущем'),
    ageLimit: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .required('Возрастное ограничение обязательно')
        .min(0, 'Возрастное ограничение не может быть отрицательным'),
    description: yup.string().required('Описание книги обязательно'),
    genres: yup.string().required('Жанры обязательны'),
    photo: yup.mixed<File>().required('Фото книги обязательно'),
});

type FormData = {
    authorId: number;
    bookName: string;
    releaseYear: number;
    ageLimit: number;
    description: string;
    genres: string;
    photo: File;
};

export const AddBookForm: React.FC = () => {
    const navigate = useNavigate();
    const [photo, setPhoto] = React.useState<File | null>(null);
    const addBookMutation = useAddNewBook();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            photo: undefined,
        },
    });

    const handleFileChange = useCallback((file: File | null) => {
        setPhoto(file);
        if (file) {
            setValue('photo', file);
        }
    }, [setValue]);

    const onSubmit = useCallback(
        async (data: FormData) => {
            const genresArray = data.genres
                .split(',')
                .map((genre) => parseInt(genre.trim(), 10))
                .filter(Boolean);

            const formData = new FormData();
            formData.append('bookName', data.bookName);
            formData.append('releaseYear', data.releaseYear.toString());
            formData.append('ageLimit', data.ageLimit.toString());
            formData.append('description', data.description);
            formData.append('photo', data.photo);
            formData.append('genres', genresArray.join(', '));

            addBookMutation.mutate(
                { authorId: data.authorId, request: formData },
                {
                    onSuccess: () => {
                        alert('Книга успешно добавлена');
                        navigate('/books');
                    },
                    onError: (error) => {
                        console.error('Ошибка при добавлении книги:', error);
                        alert('Произошла ошибка при добавлении книги');
                    },
                }
            );
        },
        [addBookMutation, navigate]
    );

    return (
        <div className={b()}>
            <Text variant="header-1">Добавление новой книги</Text>
            <form onSubmit={handleSubmit(onSubmit)} className={b('form')}>
                <TextInput
                    label="ID автора"
                    {...register('authorId', { valueAsNumber: true })}
                    error={errors.authorId?.message}
                    type="number"
                    size="l"
                />
                <TextInput
                    label="Название книги"
                    {...register('bookName')}
                    error={errors.bookName?.message}
                    size="l"
                />
                <TextInput
                    label="Год выпуска"
                    {...register('releaseYear', { valueAsNumber: true })}
                    error={errors.releaseYear?.message}
                    type="number"
                    size="l"
                />
                <TextInput
                    label="Возрастное ограничение"
                    {...register('ageLimit', { valueAsNumber: true })}
                    error={errors.ageLimit?.message}
                    type="number"
                    size="l"
                />
                <TextArea
                    placeholder="Описание книги"
                    {...register('description')}
                    error={errors.description?.message}
                    size="l"
                />
                <FileUpload
                    placeholder="Добавить фото книги"
                    onFileChange={handleFileChange}
                    value={photo ? URL.createObjectURL(photo) : ''}
                />
                {errors.photo && <Text color="danger">{errors.photo.message}</Text>}
                <TextInput
                    label="Жанры (через запятую)"
                    {...register('genres')}
                    error={errors.genres?.message}
                    size="l"
                />
                <Button
                    type="submit"
                    size="l"
                    view="action"
                    loading={addBookMutation.isPending}
                >
                    Добавить книгу
                </Button>
            </form>
        </div>
    );
};
