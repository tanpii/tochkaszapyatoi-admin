import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchManagement, fetchBase } from '../axios';

const BASE_URL = 'author';

export const useAddAuthor = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ authorName, authorPhoto }: { authorName: string; authorPhoto: File }) => {
            const formData = new FormData();
            formData.append('authorName', authorName);
            formData.append('authorPhoto', authorPhoto);
            return fetchManagement(BASE_URL, {
                method: 'POST',
                body: formData,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['authors'] });
        },
    });
};

export const useGetAuthors = (page: number) => {
    return useQuery({
        queryKey: ['authors', page],
        queryFn: () => fetchBase(`${BASE_URL}/list?page=${page}`, {
            method: 'GET',
        }),
    });
};
