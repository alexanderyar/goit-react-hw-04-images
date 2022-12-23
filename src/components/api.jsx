import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api/';
// axios.defaults.headers.common['x-api-key'] = process.env.REACT_APP_API_KEY;

export const fetchImagesByString = async (imageDescription, pageNumber) => {
   
    const response = await axios.get('?key=30268576-7fd9a425996a39e9f84907e22',
        {
            params: {
                q: imageDescription,
                per_page: 12,
                page: pageNumber
            }
        })
   
    console.log(response.data)
    return response.data
}