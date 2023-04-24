import {FC} from "react";
import {Book} from "../../interfaces/interfaces";


interface TableProps {
    books: Book[] | [];
}

const TableComponent: FC<TableProps> = ({books}) => {

    return (
        <div className={"table-component"}>
            <div className={"table-head"}>
                <div className={"cell cell-1"}>Name</div>
                <div className={"cell cell-2"}>Title</div>
                <div className={"cell cell-3"}>Author</div>
                <div className={"cell cell-4"}>Description</div>
                <div className={"cell cell-5"}>Price</div>
            </div>
            <div className={"table-body"}>
                {books.map((book, i) => (
                    <div className={"row"} key={i}>
                        <div className={"cell cell-1"}>{book.name}</div>
                        <div className={"cell cell-2"}>{book.title}</div>
                        <div className={"cell cell-3"}>{book.author}</div>
                        <div className={"cell cell-4"}>{book.description}</div>
                        <div className={"cell cell-5"}>{book.price}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TableComponent;