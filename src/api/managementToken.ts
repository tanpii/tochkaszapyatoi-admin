import { useMutation } from '@tanstack/react-query';
import { fetchAuth } from './axios';

export const useVerifyManagementToken = () => {
    return useMutation({
        mutationFn: (token: string) => 
            fetchAuth('management/token/verify', {
                method: 'POST',
                body: JSON.stringify({ token }),
            }),
    });
}; 