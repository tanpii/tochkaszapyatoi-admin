import React, { useCallback } from 'react';
import { Button, TextInput, Text } from '@gravity-ui/uikit';
import { FileUpload } from '../FileUpload/FileUpload';
import { useAddAuthor } from '@/api/author/author';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import block from 'bem-cn-lite';
import './AddAuthorForm.scss';

const b = block('add-author-form');

const schema = yup.object().shape({
    authorName: yup
        .string()
        .required('Имя автора обязательно')
        .min(2, 'Имя автора должно содержать минимум 2 символа')
        .max(100, 'Имя автора не должно превышать 100 символов'),
    photo: yup.mixed<File>().required('Фото автора обязательно'),
});

type FormData = {
    authorName: string;
    photo: File;
};

const AddAuthorForm: React.FC = () => {
    const navigate = useNavigate();
    const [photo, setPhoto] = React.useState<File | null>(null);
    const addAuthorMutation = useAddAuthor();

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

    const handlePhotoChange = useCallback((file: File | null) => {
        setPhoto(file);
        if (file) {
            setValue('photo', file);
        }
    }, [setValue]);

    const onSubmit = useCallback(
        async (data: FormData) => {
            addAuthorMutation.mutate(
                { authorName: data.authorName, authorPhoto: data.photo },
                {
                    onSuccess: () => {
                        alert('Автор успешно добавлен');
                        navigate('/authorsAndGenres');
                    },
                    onError: (error) => {
                        console.error('Ошибка при добавлении автора:', error);
                        alert('Произошла ошибка при добавлении автора');
                    },
                }
            );
        },
        [addAuthorMutation, navigate]
    );

    return (
        <div className={b()}>
            <Text variant="header-1">Добавление нового автора</Text>
            <form onSubmit={handleSubmit(onSubmit)} className={b('form')}>
                <TextInput
                    label="Имя автора"
                    {...register('authorName')}
                    error={errors.authorName?.message}
                    size="l"
                />

                <FileUpload
                    placeholder="Добавить фото автора"
                    onFileChange={handlePhotoChange}
                    value={photo ? URL.createObjectURL(photo) : ''}
                />
                {errors.photo && <Text color="danger">{errors.photo.message}</Text>}

                <Button 
                    type="submit"
                    size="l" 
                    view="action"
                    loading={addAuthorMutation.isPending}
                >
                    Добавить автора
                </Button>
            </form>
        </div>
    );
};

export default AddAuthorForm;
