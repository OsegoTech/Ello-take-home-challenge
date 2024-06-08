import React from 'react';
import BookItem from './BookItem';
import {Grid} from "@mui/material";

interface ReadingListProps {
    readingList: Array<{ title: string; author: string; coverPhotoURL: string; readingLevel: string }>;
    removeBook: (title: string) => void;
}

const ReadingList: React.FC<ReadingListProps> = ({ readingList, removeBook }) => {
    return (
        <Grid container spacing={2}>
            {readingList.map((book, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <BookItem key={index} book={book} action={() => removeBook(book.title)} actionLabel="Remove" />
                </Grid>
            ))}
        </Grid>
    );
};

export default ReadingList;
