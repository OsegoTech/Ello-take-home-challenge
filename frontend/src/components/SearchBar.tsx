import React, { useState, useEffect, useRef } from 'react';
import { TextField, List, ListItem, ListItemText, Paper, Typography, Box, InputAdornment, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

interface SearchBarProps {
    books: Array<{ title: string; author: string; coverPhotoURL: string; readingLevel: string }>;
    addBook: (book: any) => void;
    onSearchTermChange: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ books, addBook, onSearchTermChange }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBooks, setFilteredBooks] = useState<Array<any>>([]);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (searchTerm) {
            const results = books.filter((book) =>
                book.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredBooks(results);
            setShowResults(true);
        } else {
            setFilteredBooks([]);
            setShowResults(false);
        }

        // Notify the parent component about the search term change
        onSearchTermChange(searchTerm);
    }, [searchTerm, books, onSearchTermChange]);

    const getCoverImagePath = (coverPhotoURL: string) => {
        try {
            return new URL(`../${coverPhotoURL}`, import.meta.url).href;
        } catch (err) {
            console.error(`Image not found: ${coverPhotoURL}`, err);
            return ''; // Or provide a default image path
        }
    };

    // Detect clicks outside the search results
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [searchRef]);

    // Handle key down events to detect Enter key press
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            setShowResults(false);
        }
    };

    // Handle click on the clear icon
    const handleClear = () => {
        setSearchTerm('');
        setFilteredBooks([]);
        onSearchTermChange('');
    };

    const handleItemClick = (book: any) => {
        addBook(book);
        setShowResults(false); // Close the search results when a book is clicked
    };

    return (
        <div style={{ position: 'relative' }} ref={searchRef}>
            <TextField
                label="Search for books"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={handleClear}
                                aria-label="clear search"
                                edge="end"
                            >
                                <ClearIcon />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
            {showResults && (
                <Paper
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        zIndex: 1,
                        maxHeight: 200,
                        overflowY: 'auto',
                        marginTop: '8px',
                    }}
                >
                    <List>
                        {filteredBooks.map((book, index) => (
                            <ListItem button key={index} onClick={() => handleItemClick(book)}>
                                <Box
                                    component="div"
                                    sx={{
                                        width: 60,
                                        height: 60,
                                        marginRight: 2,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundImage: `url(${getCoverImagePath(book.coverPhotoURL)})`,
                                    }}
                                />
                                <ListItemText primary={book.title} secondary={book.author} />
                            </ListItem>
                        ))}
                        {filteredBooks.length === 0 && (
                            <ListItem>
                                <Typography variant="body2" color="textSecondary" align="center" style={{ width: '100%' }}>
                                    No results found.
                                </Typography>
                            </ListItem>
                        )}
                    </List>
                </Paper>
            )}
        </div>
    );
};

export default SearchBar;
