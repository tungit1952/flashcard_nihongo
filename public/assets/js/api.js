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
        return await axiosInstance.post('/api/tags/create', payload);
    } catch (error) {
        console.error('addTag thất bại!', error);
    }
}

async function addVocabulary(payload) {
    try {
        const formData = new FormData();
        formData.append('word', payload.word);
        formData.append('translation', payload.translation);
        formData.append('audio', payload.audio);
        formData.append('tags', JSON.stringify(payload.tags));
        formData.append('example', payload.example);
        return await axiosInstance.post('/api/vocabularies/create', payload, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
    } catch (error) {
        console.error('addVocabulary thất bại!', error);
    }
}

