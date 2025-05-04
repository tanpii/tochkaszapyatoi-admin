export type Book = {
    bookId: number;
    bookName: string;
    authorId: number;
    authorName: string;
    authorPhotoUrl: string;
    releaseYear: number;
    ageLimit: number;
    description: string;
    photoUrl: string;
    rating: number;
    status: BookStatus;
    genres: Genre[];
};

export type Genre = {
    genreId: number;
    genreName: string;
};

export enum BookStatus {
    AVAILABLE = "AVAILABLE",
    BOOKED = "BOOKED",
    READING = "READING",
    NOT_AVAILABLE = "NOT_AVAILABLE"
}

export type User = {
    uuid: string;
    email: string;
    firstName: string;
    lastName: string;
    birthDate: string[];
    photoUrl: string;
}

export type BookManagment = {
    book: Book;
    userData: User;
    dueDate: string;
}

export type BookManagmentPage = {
    total: number;
    managementBooks: BookManagment[];
}