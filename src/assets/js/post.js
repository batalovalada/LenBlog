//=================================POST=======================================
const firstPage = document.getElementById('page1');
const addPostForm = document.getElementById('add-post_form');
const postPattern = document.querySelector('.article__item--text').cloneNode(true);

addPostForm.addEventListener('submit', newPostHandler)

function  newPostHandler() {
    event.preventDefault();
    const newArticle = postPattern.cloneNode(true);

    const articleTitle = this.querySelector('#add-post-input');
    const articleText = this.querySelector('#add-post-textarea');
    let articleType = this.querySelector('input[name="add-post_type"]:checked').value;

    //fill the post with content
    const articleDate = newArticle.querySelector('.article__date');
    let postDate = new Date();
    postDate = getDate(postDate);
    articleDate.innerText = `${postDate[2]}.${postDate[1]}.${postDate[0]}.`;
    articleDate.setAttribute('dateTime', `${postDate[0]}-${postDate[1]}-${postDate[2]}T${postDate[3]}:${postDate[4]}`);

    newArticle.querySelector('.article__title').innerText = articleTitle.value;
    newArticle.querySelector('.article__text').innerText = articleText.value;
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
    firstPage.prepend(newArticle)

    //clear form
    articleTitle.value = '';
    articleText.value = '';

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
