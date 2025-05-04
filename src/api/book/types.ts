export interface AddBookRequest {
    bookName: string;
    releaseYear: number;
    ageLimit: number;
    description: string;
    photo: File;
    genres: number[];
}
