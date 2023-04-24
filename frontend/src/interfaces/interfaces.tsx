

export interface Profile extends Map<string, any> {
    column_name: string;
    is_visible: boolean;
}

export interface Book {
    name: string;
    title: string;
    author: string;
    description: string;
    price: number;
}