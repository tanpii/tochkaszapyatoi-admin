import { useQuery } from '@tanstack/react-query';
import { fetchBase } from '../axios';

export const useGetGenres = () => {
    return useQuery({
        queryKey: ['genres'],
        queryFn: () => fetchBase('genre', {
            method: 'GET',
        }),
    });
};
