import {Select, Skeleton, Text} from '@gravity-ui/uikit';
import {useGetGenres} from '@/api/genre/genre';
import {Genre} from '@/api/types';

export interface GenreFilterProps {
    selectedGenres?: number[];
    onChange: (newGenreIds: number[]) => void;
}

export const GenreFilter = ({selectedGenres, onChange}: GenreFilterProps) => {
    const {data: genreData, isLoading, error} = useGetGenres();

    const genreFilters = (genreData as Genre[])?.map(({genreId, genreName}: {genreId: number; genreName: string}) => ({
        value: genreId.toString(),
        content: genreName,
    })) || [];

    const handleGenreChange = (newGenreIds: string[]) => {
        onChange(newGenreIds.map((id) => Number(id)));
    };

    if (isLoading) {
        return <Skeleton />;
    }

    if (error) {
        return <Text>Ошибка загрузки</Text>;
    }

    return (
        <Select
            placeholder={'Жанр книги'}
            multiple={true}
            options={genreFilters}
            filterable={true}
            width={200}
            value={selectedGenres?.map((id) => id.toString())}
            onUpdate={handleGenreChange}
        />
    );
};

export default GenreFilter;
