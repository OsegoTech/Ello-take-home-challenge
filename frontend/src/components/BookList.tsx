import React from 'react';
import BookItem from './BookItem';
import { Grid } from "@mui/material";

interface BookListProps {
    books: Array<{ title: string; author: string; coverPhotoURL: string; readingLevel: string }>;
    addBook: (book: any) => void;
}

const BookList: React.FC<BookListProps> = ({ books, addBook }) => {
    return (
        <Grid container spacing={2}>
            {books.map((book, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <BookItem key={index} book={book} action={() => addBook(book)} actionLabel="Add" />
                </Grid>
            ))}
        </Grid>
    );
};

export default BookList;

