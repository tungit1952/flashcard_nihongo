const axiosInstance = axios.create({
    withCredentials: true,
});
async function fetchTags() {
    try {
        return await axiosInstance.get('/api/tags');
    } catch (error) {
        console.error('fetchTags thất bại!', error);
    }
}
async function addTag(payload) {
    try {
        return await axiosInstance.post('/api/tags/create',payload);
    } catch (error) {
        console.error('addTag thất bại!', error);
    }
}

async function addVocabulary(payload) {
    try {
        return await axiosInstance.post('/api/vocabularies/create',payload);
    } catch (error) {
        console.error('addVocabulary thất bại!', error);
    }
}