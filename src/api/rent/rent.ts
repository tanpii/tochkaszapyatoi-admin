import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchManagement } from '../axios';

// Базовый URL для работы с арендой
const BASE_URL = 'rent';

// Принятие аренды книги по её идентификатору
export const useAcceptRent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (bookId: number) => 
            fetchManagement(`${BASE_URL}/${bookId}`, {
                method: 'POST',
                body: JSON.stringify({}),
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['books'] });
        },
    });
};

// Завершение аренды книги по её идентификатору
export const useEndRent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (bookId: number) => 
            fetchManagement(`${BASE_URL}/${bookId}`, {
                method: 'DELETE',
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['books'] });
        },
    });
};
