import {ChangeEvent, FC, useEffect, useState} from "react";
import {Book, Profile} from "../../interfaces/interfaces";
import BookService from "../../services/bookService";


interface TableProps {
    books: Book[] | [];
    setBooks: (callback: Array<Book>) => void;
    profiles: Profile[] | [];
}

const TableComponent: FC<TableProps> = ({books, setBooks, profiles}) => {
    let firstState: Book = {
        id: null,
        name: '',
        title: '',
        author: '',
        description: '',
        price: 0
    }
    const [newBook, setNewBook] = useState<Book>(firstState);
    const [errorBook, setErrorBook] = useState<Book>(firstState);
    const [addBook, setAddBook] = useState<boolean>(false);
    const [selectBooks, setSelectBooks] = useState<Array<number>>([]);
    const [hiddens, setHiddens] = useState<Array<string>>([]);

    useEffect(() => {
        let array: Array<string> = [];
        profiles.forEach(profile => {
            if (!profile.is_visible) array.push(profile.column_name);
        })
        setHiddens(array);
    }, [profiles])

    const changeName = (e: ChangeEvent<HTMLInputElement>): void => {
        let value: string = e.currentTarget.value.slice(0, 20);
        // @ts-ignore
        const {id: id} = e.currentTarget.parentElement;
        let array: Array<Book> = [...books];
        array[id].name = value;
        setBooks(array);
    }

    const changeAuthor = (e: ChangeEvent<HTMLInputElement>): void => {
        let value: string = e.currentTarget.value.slice(0, 30);
        // @ts-ignore
        const {id: id} = e.currentTarget.parentElement;
        let array: Array<Book> = [...books];
        array[id].author = value;
        setBooks(array);
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>): void => {
        let value: string = e.currentTarget.value.slice(0, 30);
        // @ts-ignore
        const {id: id} = e.currentTarget.parentElement;
        let array: Array<Book> = [...books];
        array[id].title = value;
        setBooks(array);
    }

    const changeDescription = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        let value: string = e.currentTarget.value.slice(0, 512);
        // @ts-ignore
        const {id: id} = e.currentTarget.parentElement;
        let array: Array<Book> = [...books];
        array[id].description = value;
        setBooks(array);
    }

    const changePrice = (e: ChangeEvent<HTMLInputElement>): void => {
        let value: string = e.currentTarget.value.replace(/\D/g, "").slice(0, 5);
        // @ts-ignore
        const {id: id} = e.currentTarget.parentElement;
        let array: Array<Book> = [...books];
        array[id].price = Number(value);
        setBooks(array);
    }

    const updateBooks = (): void => {
        BookService.updateBooks(books).then((response => {
            setBooks(response.data);
        }))
    }

    const addNewBook = (): void => {
        setAddBook(!addBook);
        setNewBook(firstState);
        setErrorBook(firstState);
    }

    const changeNewName = (e: ChangeEvent<HTMLInputElement>): void => {
        let value: string = e.currentTarget.value.slice(0, 20);
        let book: Book = {...newBook};
        book.name = value;
        setNewBook(book);
    }

    const changeNewAuthor = (e: ChangeEvent<HTMLInputElement>): void => {
        let value: string = e.currentTarget.value.slice(0, 30);
        let book: Book = {...newBook};
        book.author = value;
        setNewBook(book);
    }

    const changeNewTitle = (e: ChangeEvent<HTMLInputElement>): void => {
        let value: string = e.currentTarget.value.slice(0, 30);
        let book: Book = {...newBook};
        book.title = value;
        setNewBook(book);
    }

    const changeNewDescription = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        let value: string = e.currentTarget.value.slice(0, 512);
        let book: Book = {...newBook};
        book.description = value;
        setNewBook(book);
    }

    const changeNewPrice = (e: ChangeEvent<HTMLInputElement>): void => {
        let value: string = e.currentTarget.value.replace(/\D/g, "").slice(0, 5);
        let book: Book = {...newBook};
        book.price = Number(value);
        setNewBook(book);
    }

    const createBook = (): void => {
        if (addBook) {
            BookService.createBook(newBook).then(response => {
                if (response.status === 200) {
                    setBooks(response.data);
                    setNewBook(firstState);
                    setAddBook(false);
                    setErrorBook(firstState);
                } else {
                    let error: Book = firstState;
                    if (response.data.name !== undefined) error.name = "Empty field!"
                    if (response.data.title !== undefined) error.title = "Empty field!"
                    if (response.data.author !== undefined) error.author = "Empty field!"
                    setErrorBook(error);
                }
            })
        }
    }

    const selectBook = (e: ChangeEvent<HTMLInputElement>): void => {
        let array: Array<number> = [];
        // @ts-ignore
        const {id: id} = e.currentTarget.parentElement;
        if (selectBooks.includes(Number(id))) {
            selectBooks.map(obj => {
                if (Number(id) !== obj) array.push(obj);
            })
        } else {
            array = [...selectBooks];
            array.push(Number(id));
        }
        setSelectBooks(array);
    }

    const deleteBooks = (): void => {
        let array: Array<Book> = [];
        books.forEach((book, i) => {
            if (selectBooks.includes(i)) array.push(book);
        })
        BookService.deleteBooks(array).then(response => {
            setBooks(response.data);
            setSelectBooks([]);
        })
    }


    return (
        <div className={"table-component"}>
            <div className={"table-head"}>
                <div className={`cell cell-1 ${hiddens.includes('name') ? 'hidden': ''}`}>Name</div>
                <div className={`cell cell-2 ${hiddens.includes('title') ? 'hidden': ''}`}>Title</div>
                <div className={`cell cell-3 ${hiddens.includes('author') ? 'hidden': ''}`}>Author</div>
                <div className={`cell cell-4 ${hiddens.includes('description') ? 'hidden': ''}`}>Description</div>
                <div className={`cell cell-5 ${hiddens.includes('price') ? 'hidden': ''}`}>Price</div>
            </div>
            <div className={"table-body"}>
                {books.map((book, i) => (
                    <div className={"row"} key={i} id={i.toString()}>
                        <input className={`cell cell-1 ${hiddens.includes('name') ? 'hidden': ''}`} value={book.name} onChange={changeName}/>
                        <input className={`cell cell-2 ${hiddens.includes('title') ? 'hidden': ''}`} value={book.title} onChange={changeTitle}/>
                        <input className={`cell cell-3 ${hiddens.includes('author') ? 'hidden': ''}`} value={book.author} onChange={changeAuthor}/>
                        <textarea className={`cell cell-4 ${hiddens.includes('description') ? 'hidden': ''}`} value={book.description} onChange={changeDescription}></textarea>
                        <input className={`cell cell-5 ${hiddens.includes('price') ? 'hidden': ''}`} value={book.price} onChange={changePrice}/>
                        <input className={`cell cell-6`} type="checkbox" checked={selectBooks.includes(i) ? true : false} onChange={selectBook}/>
                    </div>
                ))}
            </div>
            <div className={"btns"}>
                <span className={"btn"} onClick={updateBooks}>Update books</span>
                <span className={"btn"} onClick={addNewBook}>Add new book</span>
                <span className={"btn"} onClick={createBook}>Save new book</span>
                <span className={"btn"} onClick={deleteBooks}>Delete books</span>
            </div>
            <div className={`table-head ${addBook ? '' : 'hidden'}`}>
                <div className={"cell cell-1"}>Name</div>
                <div className={"cell cell-2"}>Title</div>
                <div className={"cell cell-3"}>Author</div>
                <div className={"cell cell-4"}>Description</div>
                <div className={"cell cell-5"}>Price</div>
            </div>
            <div className={`table-body ${addBook ? '' : 'hidden'}`}>
                <div className={"row"}>
                    <input className={"cell cell-1"} value={newBook.name} onChange={changeNewName}/>
                    <input className={"cell cell-2"} value={newBook.title} onChange={changeNewTitle}/>
                    <input className={"cell cell-3"} value={newBook.author} onChange={changeNewAuthor}/>
                    <textarea className={"cell cell-4"} value={newBook.description} onChange={changeNewDescription}></textarea>
                    <input className={"cell cell-5"} value={newBook.price} onChange={changeNewPrice}/>
                </div>
                <div className={"row error"}>
                    <span className={"cell cell-1"}>{errorBook.name}</span>
                    <span className={"cell cell-2"}>{errorBook.title}</span>
                    <span className={"cell cell-3"}>{errorBook.author}</span>
                    <span className={"cell cell-4"}></span>
                    <span className={"cell cell-5"}></span>
                </div>
            </div>
        </div>
    )
}

export default TableComponent;