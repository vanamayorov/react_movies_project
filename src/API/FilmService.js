import { API_URL, API_KEY_3 } from '../config/config';

export default class FilmService {
    static async getFilms(sortBy, page) {
        const response = await fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${sortBy}&page=${page}&region=ru`);
        if (!response.ok) {
            throw new Error('Server error!');
        }
        const data = await response.json();
        return {results: data.results, pages: data.total_pages};
    }
}