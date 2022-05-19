export const API_URL = "https://api.themoviedb.org/3";

export const API_KEY_3 = "35b29316bf428e3fd0c951349a822ba2";

export const API_KEY_4 =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNWIyOTMxNmJmNDI4ZTNmZDBjOTUxMzQ5YTgyMmJhMiIsInN1YiI6IjYyODYwNjgxYmYwOWQxMDA1MjkwNTFjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NFTtGOWZWhsrM09iWq5OIt5J9QhrKHqIu15wplLVlM4";

export const endPoints = {
    getFilms: "/discover/movie",
    getToken: "/authentication/token/new",
    validateWithLogin: "/authentication/token/validate_with_login",
    getSession: "/authentication/session/new",
    account: "/account",
    deleteSession: "/authentication/session"
}    

export const fetchApi = (url, options = {}) => {
    return new Promise((res, rej) => {
        fetch(url, options)
            .then(response => {
                if (response.status < 400) {
                    return response.json();
                }

                throw response;
            })
            .then(data => {
                res(data);
            })
            .catch(response => {
                response.json().then(error => {
                    rej(error);
                })
            });
    });
}