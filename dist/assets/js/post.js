//=================================POST=======================================
const firstPage = document.getElementById('page1');
const addPostForm = document.getElementById('add-post_form');
const textareaHeight = document.getElementById('add-post-textarea').offsetHeight;
const addPostFile = document.getElementById('add-post-file');
const deleteFileBtn = document.getElementById('deleteFile');

//create post pattern
const postPattern = createElement('article', 'article__item');
const postContent = createElement('div', 'article__content');
const postTitle = createElement('h3', 'article__title');
const postFooter = `<div class="article__footer">
                            <ul class="article__data">
                                <li><a class="article__link" href="#"></a></li>
                                <li>
                                    <svg class="article__icon" id="date-acticle" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.1875 14.0625H10.9375V7.8125H14.0625V10.9375H17.1875V14.0625ZM23.4375 1.5625V23.4375H1.5625V1.5625H23.4375ZM20.3125 4.6875H4.6875V20.3125H20.3125V4.6875Z"/>
                                    </svg>
                                    <time class="article__date" datetime=""></time>
                                </li>
                            </ul>
                        </div>`;

postContent.append(postTitle);
postContent.insertAdjacentHTML('beforeend', postFooter);
postPattern.append(postContent);

//.article__text pattern
const postText = createElement('div', 'article__text');

//.article__header pattern
const postHeader = createElement('div', 'article__header');
const postImg = `<img class="article__img" src="" alt="">`;
postHeader.insertAdjacentHTML('beforeend', postImg);


//===========================show file from input==================
addPostFile.addEventListener('input', postFileHandler);
deleteFileBtn.addEventListener('click', event => {
    event.preventDefault();
    fileClear();
});
//=============================add post event======================
addPostForm.addEventListener('submit', newPostHandler);

//========================handlers=================================
function postFileHandler() {
    const formPreview = document.querySelector('.add-post__preview');
    const fileModalImg = document.querySelector('.modal__file-img');
    const formPreviewImg = formPreview.querySelector('.add-post__preview-img');
    const formPreviewLink = formPreview.querySelector('.add-post__preview-link');

    formPreview.classList.remove('hide');
    const reader = new FileReader();
    reader.onloadend = function () {
        formPreviewImg.src = reader.result;
        fileModalImg.src = reader.result;
    }
    if (this.files[0]) {
        reader.readAsDataURL(this.files[0]);
    } else {
        formPreviewImg.src = '';
        fileModalImg.src = '';
    }

    formPreviewLink.innerText = this.value;
    formPreviewLink.title = this.value;
    formPreviewImg.alt = this.value;
    formPreviewImg.title = this.value;
    fileModalImg.alt = this.value;

}

function  newPostHandler(event) {
    event.preventDefault();
    const newArticle = postPattern.cloneNode(true);

    //inputs
    const articleTitle = this.querySelector('#add-post-input');
    const articleText = this.querySelector('#add-post-textarea');
    let articleFoto = this.querySelector('#add-post-file').files[0];
    let articleType = this.querySelector('input[name="add-post_type"]:checked').value;

    //check post type
    if (articleText.value == '' && articleFoto != undefined) {
        newArticle.classList.add('article__item--image');
    } else if (articleText.value != '' && articleFoto == undefined) {
        newArticle.classList.add('article__item--text');
    }

    //fill the post with content
    const articleDate = newArticle.querySelector('.article__date');
    let postDate = new Date();
    postDate = getDate(postDate);
    articleDate.innerText = `${postDate[2]}.${postDate[1]}.${postDate[0]}.`;
    articleDate.setAttribute('dateTime', `${postDate[0]}-${postDate[1]}-${postDate[2]}T${postDate[3]}:${postDate[4]}`);

    newArticle.querySelector('.article__title').innerText = articleTitle.value;

    //.article__item--image hasn't .article__text
    //.article__item--text hasn't .article__header
    if (!newArticle.classList.contains('article__item--image')) {
        newArticle.querySelector('.article__title').after(postText.cloneNode(true));
        newArticle.querySelector('.article__text').innerText = articleText.value;
    }

    if (!newArticle.classList.contains('article__item--text')) {
        newArticle.prepend(postHeader.cloneNode(true));
        const reader = new FileReader();
        reader.onloadend = function () {
            newArticle.querySelector('.article__img').src = reader.result;
        }
        if (articleFoto) {
            reader.readAsDataURL(articleFoto);
        } else {
            newArticle.querySelector('.article__img').src = '';
        }
        newArticle.querySelector('.article__img').alt = articleTitle.value;
    }

    //article category
    newArticle.querySelector('.article__link').href = articleType + '.html';
    switch(true) {
        case articleType == 'experience':
            articleType = 'Личный опыт'
            break;
        case articleType == 'guide':
            articleType = 'Путеводитель'
            break;
        case articleType == 'manual':
            articleType = 'Методичка'
            break;
        case articleType == 'recommended':
            articleType = 'Рекомендуемое'
            break;
    }
    newArticle.querySelector('.article__link').innerText = articleType;

    //put post on the first page
    firstPage.prepend(newArticle);

    //clear form
    articleTitle.value = '';
    articleText.value = '';
    fileClear();
    document.getElementById('add-post-textarea').style.height = textareaHeight + 'px';
}

//================file input clear===============================
function fileClear() {
    const formPreview = document.querySelector('.add-post__preview');
    const formPreviewImg = document.querySelector('.add-post__preview-img');
    const formPreviewLink = document.querySelector('.add-post__preview-link');
    document.querySelector('#add-post-file').value = '';
    formPreviewImg.src = '';
    formPreviewImg.alt = '';
    formPreviewImg.title = '';
    formPreviewLink.innerText = '';
    formPreviewLink.title = '';
    formPreview.classList.add('hide');
}


//=========================DATE=============================
function getDate(Time) { //Time = new Date
    const Year = `${Time.getFullYear()}`;
    const Month = rigthTime(Time.getMonth()+1);
    const Day = rigthTime(Time.getDate());
    const Hours = rigthTime(Time.getHours());
    const Minutes = rigthTime(Time.getMinutes());
    return [Year, Month, Day, Hours, Minutes]
}

function rigthTime(partTime) {
    return `${partTime}`.length == 1 ? `0${partTime}` : `${partTime}`
}

//=================Create Element function======================
function createElement(tag, classEl='', inText = '') {
    const element = document.createElement(tag);
    classEl = classEl.split(' '); //classEl include classes separated by a space
    for (item of classEl) element.classList.add(item);
    element.innerText = inText;
    return element
}