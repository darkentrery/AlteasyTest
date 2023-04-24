

export interface Profile {
    column_name: string;
    is_visible: boolean;
}

export interface Book {
    id: number | null;
    name: string;
    title: string;
    author: string;
    description: string;
    price: number;
}