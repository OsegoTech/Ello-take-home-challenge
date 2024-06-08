import React, { useState, useEffect } from "react";
import { gql, useQuery } from '@apollo/client';
import { CircularProgress, Container, Typography, Button } from "@mui/material";
import SearchBar from "./components/SearchBar";
import BookList from "./components/BookList";
import ReadingList from "./components/ReadingList";

const BOOK_QUERY = gql`
    query Books {
        books {
            author
            coverPhotoURL
            readingLevel
            title
        }
    }
`;

const App: React.FC = () => {
    const { loading, error, data } = useQuery(BOOK_QUERY);
    const [readingList, setReadingList] = useState<Array<any>>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showReadingListLink, setShowReadingListLink] = useState(false);

    useEffect(() => {
        setShowReadingListLink(readingList.length > 0);
    }, [readingList]);

    const addBook = (book: any) => {
        setReadingList((prevList) => [...prevList, book]);
    };

    const removeBook = (title: string) => {
        setReadingList((prevList) => prevList.filter((book) => book.title !== title));
    };

    const handleSearchTermChange = (term: string) => {
        setSearchTerm(term);
    };

    if (loading) return <p><CircularProgress /></p>;
    if (error) return <p>Error: {error.message}</p>;

    const scrollToReadingList = () => {
        const readingListSection = document.getElementById('reading-list');
        if (readingListSection) {
            const topOffset = readingListSection.getBoundingClientRect().top;
            window.scrollTo({ top: window.pageYOffset + topOffset - 20, behavior: 'smooth' });
        }
    };


    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const filteredBooks = searchTerm
        ? data.books.filter((book: any) =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : data.books;

    return (
        <Container>
            <Typography variant={"h2"} gutterBottom style={{ color: '#335c6e', fontWeight: 'bold' }}>
                Ello Teacher
            </Typography>
            <SearchBar books={data.books} addBook={addBook} onSearchTermChange={handleSearchTermChange} />
            <Typography variant="h5" gutterBottom style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', marginTop: '1rem' }}>
                <span style={{ flex: 1 }}>All Books</span>
                {showReadingListLink && (
                    <span variant="h5" onClick={scrollToReadingList} style={{ marginLeft: '10px', color: '#335c6e'}}>
                        View Reading List
                    </span>
                )}
            </Typography>
            <BookList books={filteredBooks} addBook={addBook} />
            <Typography id="reading-list" variant="h3" gutterBottom style={{ color: '#335c6e', fontWeight: 'bold' }}>
                Reading List
            </Typography>
            <ReadingList  readingList={readingList} removeBook={removeBook} />
            <Button variant="text" onClick={scrollToTop} style={{ color: 'white', position: 'fixed', bottom: '20px', right: '20px',backgroundColor: '#28b8b8' }}>
                Scroll To Top
            </Button>
        </Container>
    );
};

export default App;
