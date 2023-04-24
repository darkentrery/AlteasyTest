import axios from 'axios';
import {Book, Profile} from "../interfaces/interfaces";


const API_URL: string = "http://127.0.0.1:8000/api";

const getCookie = (name: string): string | null => {
	let cookieValue = null;
	if (document.cookie && document.cookie !== '') {
		let cookies = document.cookie.split(';');
		for (let i = 0; i < cookies.length; i++) {
			let cookie = cookies[i].trim();
			// Does this cookie string begin with the name we want?
			if (cookie.substring(0, name.length + 1) === (name + '=')) {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
};

const csrftoken: string | null = getCookie('csrftoken');

const getRequest = (url: string) => {
	return axios.get(API_URL + url, {headers: {
		'Content-Type': 'application/json',
		'X-CSRFToken': csrftoken,
	}})
		.then((response) => {
			return response;
		})
		.catch((error) => {
			return error.response;
		});
};

const postRequest = (url: string, data: Book | Profile | Array<Book>) => {
	return axios.post(API_URL + url, data, {headers: {
		'Content-Type': 'application/json',
		'X-CSRFToken': csrftoken,
	}})
		.then((response) => {
			return response;
		})
		.catch((error) => {
			return error.response;
		});
}

const BookService = {
	getBooks() { return getRequest('/get-books/'); },
	changeProfile(data: Profile) { return postRequest('/change-profile/', data) },
	updateBooks(data: Array<Book>) { return postRequest('/update-books/', data) },
	createBook(data: Book) { return postRequest('/create-book/', data) },
	deleteBooks(data: Array<Book>) { return postRequest('/delete-books/', data) },
}

export default BookService;