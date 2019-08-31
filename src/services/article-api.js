import axios from 'axios';

// const BASE_URL = 'https://simple-blog-api.crew.red/posts';
// const DEFAULT_QUERY = 'posts';
const BASE_URL = 'https://hn.algolia.com/api/v1/search?query=';

export const fetchArticles = (query = 'react') => axios.get(BASE_URL + query);
