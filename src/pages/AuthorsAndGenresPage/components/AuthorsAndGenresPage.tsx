import {useState} from 'react';
import {Pagination, Spin, Text} from '@gravity-ui/uikit';
import {useGetGenres} from '@/api/genre/genre';
import {useGetAuthors} from '@/api/author/author';
import {AuthorTable} from '@/components/AuthorTable';
import {GenreTable} from '@/components/GenreTable';
import block from 'bem-cn-lite';
import './AuthorsAndGenresPage.scss';

const b = block('authorsAndGenresPage');

const PAGE_SIZE = 20;

export const AuthorsAndGenresPage = () => {
    const [authorsPage, setAuthorsPage] = useState(1);

    const {data: authorsData, isLoading: loadingAuthors} = useGetAuthors(authorsPage - 1);
    const {data: genresData, isLoading: loadingGenres} = useGetGenres();

    const handlePageChangeAuthors = (newPage: number) => {
        setAuthorsPage(newPage);
    };

    return (
        <div className={b()}>
            {loadingAuthors ? (
                <Spin />
            ) : (
                <div className={b('table')}>
                    <Text variant="header-2">АВТОРЫ</Text>
                    <AuthorTable authors={authorsData?.authors || []} />
                    <Pagination
                        page={authorsPage}
                        pageSize={PAGE_SIZE}
                        total={authorsData?.total || 0}
                        onUpdate={handlePageChangeAuthors}
                    />
                </div>
            )}

            {loadingGenres ? (
                <Spin />
            ) : (
                <div className={b('table')}>
                    <Text variant="header-2">ЖАНРЫ</Text>
                    <GenreTable genres={genresData || []} />
                </div>
            )}
        </div>
    );
};

export default AuthorsAndGenresPage;
