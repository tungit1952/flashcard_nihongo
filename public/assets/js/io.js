$(document).ready(function () {
    $('.select-muti').select2({
        placeholder: 'Lựa chọn'
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const createTagModal = document.getElementById('createTagModal');
    const openCreateTagModalBtn = document.getElementById('openCreateTagModalBtn');
    const closeCreateTagModalBtn = document.getElementById('closeCreateTagModalBtn');
    const keyInputTag = document.getElementById('key_input_tag');
    const descriptionInputTag = document.getElementById('description_input_tag');
    openCreateTagModalBtn.onclick = function () {
        createTagModal.classList.remove('hidden');
    }
    closeCreateTagModalBtn.onclick = function () {
        keyInputTag.value = '';
        descriptionInputTag.value = '';
        createTagModal.classList.add('hidden');
    }

    createTagModal.onclick = function (event) {
        if (event.target === createTagModal) {
            createTagModal.classList.add('hidden');
        }
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const createVocabularyModal = document.getElementById('createVocabularyModal');
    const openCreateVocabularyModalBtn = document.getElementById('openCreateVocabularyModalBtn');
    const closeCreateVocabularyModalBtn = document.getElementById('closeCreateVocabularyModalBtn');
    openCreateVocabularyModalBtn.onclick = function () {
        createVocabularyModal.classList.remove('hidden');
    }
    closeCreateVocabularyModalBtn.onclick = function () {
        createVocabularyModal.classList.add('hidden');
    }

    createVocabularyModal.onclick = function (event) {
        if (event.target === createTagModal) {
            createVocabularyModal.classList.add('hidden');
        }
    }
});

async function updateTagsInVocabulary() {
    let tags = []
    const tagsContainer = document.querySelector('#tags_container');
    tagsContainer.innerHTML = '';
    const response = await fetchTags()
    tags = response.data
    tags.map(tag => {
        const tagElement = document.createElement('div');
        tagElement.className = 'flex cursor-pointer items-center gap-x-1 rounded-md h-[35px] px-4 ';
        tagElement.setAttribute('onclick', `pushParamKey('${tag.key}')`);
        tagElement.innerHTML = `<span class="text-sm font-medium">#${tag.key}</span>`;
        tagsContainer.appendChild(tagElement);
    })
    await updateActiveTag()
}

async function updateListInVocabulary() {
    let vocabularies = []
    const vocabTableBody = document.getElementById('vocabTableBody');
    const response = await fetchVocabularies()
    vocabularies = response.data
    vocabTableBody.innerHTML = '';
    vocabularies.forEach(vocab => {
        const row = document.createElement('tr');
        row.innerHTML = `
                <td class="p-4 border-b border-slate-200">
                    <div class="flex items-center gap-3">
                        <div class="flex flex-col">
                            <p class="text-sm font-semibold text-slate-700">${vocab.word}</p>
                        </div>
                    </div>
                </td>
                <td class="p-4 border-b border-slate-200">
                    <div class="flex flex-col">
                        <p class="text-sm font-semibold text-slate-700">${vocab.translation}</p>
                    </div>
                </td>
                <td class="p-4 border-b border-slate-200">
                       <p class="text-sm font-semibold text-slate-700">${vocab.reading}</p>
                </td>
                <td class="p-4 border-b border-slate-200">
                    <i onclick="playAudio(${vocab.audio})" class="ri-volume-down-fill text-[1.25rem] text-[#126265] cursor-pointer"></i>
                </td>
                <td class="p-4 border-b border-slate-200">
                    <div class="flex gap-[10px]">
                        <i class="ri-search-eye-line text-[1.15rem] text-[#126265] cursor-pointer"></i>
                        <i onclick="removeRecordInVocabulary(${vocab._id})" class="ri-delete-bin-6-line text-[1.15rem] text-red-700 cursor-pointer"></i>
                    </div>
                </td>
            `;
        const deleteIcon = row.querySelector('.ri-delete-bin-6-line');
        const audioIcon = row.querySelector('.ri-volume-down-fill');
        deleteIcon.addEventListener('click', () => removeRecordInVocabulary(vocab._id));
        audioIcon.addEventListener('click', () => playAudio(vocab.audio));

        vocabTableBody.appendChild(row);
    });
}
function playAudio(mp3Url) {
    const audio = new Audio(mp3Url);
    audio.play()
        .then(() => {
            console.log("Đang phát audio...");
        })
        .catch(error => {
            console.error("Không thể phát audio:", error);
        });
}
async function removeRecordInVocabulary(id) {
    console.log(id)
    const deleteRecord = await deleteVocabulary(id)
    await updateListInVocabulary()
}

function updateActiveTag() {
    const allTags = document.querySelectorAll('#tags_container > div');
    const newParams = new URLSearchParams(window.location.search);
    const currentTags = newParams.get('tags') ? newParams.get('tags').split('-') : [];
    allTags.forEach(tagElement => {
        const tagKey = tagElement.textContent.trim();
        if (currentTags.includes(tagKey.substring(1))) {
            tagElement.classList.add('tag_active');
        } else {
            tagElement.classList.remove('tag_active');
        }
    });
}

function pushParamKey(key) {
    const newParams = new URLSearchParams(window.location.search);
    let currentTags = newParams.get('tags') || '';
    let tagsArray = currentTags ? currentTags.split('-') : [];
    if (tagsArray.includes(key)) {
        tagsArray = tagsArray.filter(tag => tag !== key);
    } else {
        tagsArray.push(key);
    }
    if (tagsArray.length > 0) {
        newParams.set('tags', tagsArray.join('-'));
    } else {
        newParams.delete('tags');
    }
    const queryString = newParams.toString();
    const newUrl = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname;
    history.pushState(null, '', newUrl);
    updateActiveTag(key);
}