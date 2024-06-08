import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, CardMedia, Snackbar, useMediaQuery, useTheme } from '@mui/material';

interface BookItemProps {
    book: { title: string; author: string; coverPhotoURL: string; readingLevel: string };
    action: () => void;
    actionLabel: string;
}

const BookItem: React.FC<BookItemProps> = ({ book, action, actionLabel }) => {
    const [showToast, setShowToast] = useState(false);
    const theme = useTheme();
    const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const imageSize = isSmScreen ? 130 : 100; // Adjust image size based on screen size
    const typographyVariant = isSmScreen ? 'subtitle1' : 'h6'; // Adjust typography variant based on screen size

    const handleAction = () => {
        action();
        setShowToast(true);
    };

    const handleCloseToast = () => {
        setShowToast(false);
    };

    const imagePath = new URL(`../${book.coverPhotoURL}`, import.meta.url).href;

    return (
        <Card style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardMedia
                component="img"
                image={imagePath}
                alt={book.title}
                style={{ width: '100%', height: imageSize }}
            />
            <CardContent style={{ flex: 1, textAlign: 'left' }}>
                <Typography variant={typographyVariant} style={{ marginBottom: 4 }}>{book.title}</Typography>
                <Typography variant="subtitle2" style={{ color: '#335c6e', fontSize: isSmScreen ? '0.8rem' : '0.6rem' }}>by {book.author}</Typography>
                <Button variant="contained" color="primary" onClick={handleAction} style={{ backgroundColor: '#53c2c2', color: '#fff', marginTop: 8 }}>
                    {actionLabel}
                </Button>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={showToast}
                    autoHideDuration={3000}
                    onClose={handleCloseToast}
                    message={`${book.title} added to reading list`}
                    style={{ color: '#4caf50' }}
                />
            </CardContent>
        </Card>
    );
};

export default BookItem;
