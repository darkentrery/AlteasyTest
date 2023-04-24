import {useEffect, useState} from "react";
import BookService from "../../services/bookService";
import TableComponent from "../tableComponent/TableComponent";
import {ProfileComponent} from "../profileComponent/ProfileComponent";
import {Book, Profile} from "../../interfaces/interfaces";


const BodyComponent = () => {
    const [books, setBooks] = useState<Array<Book>>([]);
    const [profiles, setProfiles] = useState<Array<Profile>>([]);

    useEffect(() => {
        BookService.getBooks().then((response) => {
            console.log(response.data)
            setBooks(response.data.books);
            setProfiles(response.data.profiles);
        })
    }, [])

    return (
        <div className={"body-component"}>
            <TableComponent books={books}/>
            <ProfileComponent profiles={profiles} setProfiles={setProfiles}/>
        </div>
    )
}

export default BodyComponent;