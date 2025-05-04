import { useState } from 'react';
import { Pagination, Spin } from '@gravity-ui/uikit';
import { useGetManagementBooksPage } from '@/api/book/book';
import { BookTable } from '@/components/BookTable';
import { BooksFilter } from '@/components/BooksFilter';
import block from 'bem-cn-lite';
import './BooksPage.scss';

const b = block('booksPage');
const PAGE_SIZE = 20;

export const BooksPage = () => {
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState<{
        bookTitle?: string;
        author?: string;
        genreIds?: number[];
    }>({});

    const { data, isLoading } = useGetManagementBooksPage(
        page - 1,
        filters.bookTitle,
        filters.author,
        filters.genreIds
    );

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleFilterChange = (newFilters: {
        bookTitle?: string;
        author?: string;
        genreIds?: number[];
    }) => {
        setFilters(newFilters);
    };

    return (
        <div className={b()}>
            <BooksFilter onConfirm={handleFilterChange} />

            {isLoading ? (
                <Spin />
            ) : (
                <div className={b('table')}>
                    <BookTable books={data?.managementBooks || []} />
                </div>
            )}

            <Pagination
                page={page}
                pageSize={PAGE_SIZE}
                total={data?.total || 0}
                onUpdate={handlePageChange}
            />
        </div>
    );
};

export default BooksPage;
