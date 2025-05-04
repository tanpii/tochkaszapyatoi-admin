import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextInput, Text, Card } from '@gravity-ui/uikit';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import block from 'bem-cn-lite';
import { useVerifyManagementToken } from '../api/managementToken';
import './AdminAuth.scss';

const b = block('admin-auth');

const schema = yup.object().shape({
    token: yup.string().required('Токен обязателен'),
});

type FormData = yup.InferType<typeof schema>;

const AdminAuth: React.FC = () => {
    const navigate = useNavigate();
    const verifyToken = useVerifyManagementToken();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: FormData) => {
        verifyToken.mutate(data.token, {
            onSuccess: () => {
                localStorage.setItem('adminToken', data.token);
                navigate('/');
            },
            onError: () => {
                // Ошибка уже обрабатывается в хуке
            },
        });
    };

    return (
        <div className={b()}>
            <Card className={b('card')} view="raised">
                <Text variant="header-1" className={b('title')}>
                    Вход администратора
                </Text>
                <Text className={b('description')}>
                    Для входа в панель администратора введите токен доступа. 
                    Токен предоставляется системным администратором и необходим для управления контентом.
                </Text>
                <form onSubmit={handleSubmit(onSubmit)} className={b('form')}>
                    <TextInput
                        label="Токен администратора"
                        {...register('token')}
                        error={errors.token?.message || (verifyToken.isError ? 'Неверный токен' : '')}
                        type="password"
                        size="l"
                        placeholder="Введите токен доступа"
                    />
                    <Button
                        type="submit"
                        view="action"
                        size="l"
                        width="max"
                        loading={verifyToken.isPending}
                    >
                        Войти
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default AdminAuth; 