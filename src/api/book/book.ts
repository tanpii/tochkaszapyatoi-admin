import { BookStatus } from '../types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchManagement } from '../axios';

const BASE_URL = 'book';

// Добавление новой книги
export const useAddNewBook = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ authorId, request }: { authorId: number; request: FormData }) =>
            fetchManagement(`${BASE_URL}/${authorId}`, {
                method: 'POST',
                body: request,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['books'] });
        },
    });
};

// Удаление книги по идентификатору
export const useDeleteBook = () => {
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

// Получение страницы книг по статусу
export const useGetManagementBooksPageWithStatus = (
    status: BookStatus,
    page: number,
    bookName?: string,
    author?: string,
    genres?: number[]
) => {
    const params = new URLSearchParams({
        page: page.toString(),
        ...(bookName && { bookName }),
        ...(author && { author }),
        ...(genres && genres.length > 0 && { genres: genres.join(',') }),
    });

    return useQuery({
        queryKey: ['books', status, page, bookName, author, genres],
        queryFn: () =>
            fetchManagement(`${BASE_URL}/${status}?${params}`, {
                method: 'GET',
            }),
    });
};

export const useGetManagementBooksPage = (
    page: number,
    bookName?: string,
    author?: string,
    genres?: number[]
) => {
    const params = new URLSearchParams({
        page: page.toString(),
        ...(bookName && { bookName }),
        ...(author && { author }),
        ...(genres && genres.length > 0 && { genres: genres.join(',') }),
    });

    return useQuery({
        queryKey: ['books', page, bookName, author, genres],
        queryFn: () => 
            fetchManagement(`${BASE_URL}?${params}`, {
                method: 'GET',
            }),
    });
};
