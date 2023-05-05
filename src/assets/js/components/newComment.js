//================================NEW COMMENT======================================
const commentForm = document.querySelector('.commentForm');
const commentFormH = commentForm.querySelector('.commentInput').offsetHeight;

const commentFormCopy = commentForm.cloneNode(true); //form copy for reply
commentFormCopy.classList.remove('mainComForm');
commentFormCopy.style['margin-top'] = '1.5rem';

//const profileName = document.getElementById('profileName').value;
const profileName = 'John Martin';
//const profileAvatar = document.getElementById('profileAvatar').src;
const profileAvatar = "https://placehold.it/40";

//comment submit
commentForm.addEventListener('submit', newCommentHandler);

function newCommentHandler(event) {
    event.preventDefault();
    //when reply form is submitted cancel btn -> reply btn
    if (!this.classList.contains('mainComForm')) {
        const cancelButton = this.closest('li').querySelector('.cancelBtn');
        cancelButton.removeEventListener('click', cancelHandler);
        cancelButton.classList.remove('cancelBtn');
        cancelButton.classList.add('replyBtn');
        cancelButton.innerText = 'ответить';
    }
    const commentInput = this.querySelector('.commentInput');
    const commentsList = this.nextElementSibling;
    const comText = commentInput.value; //text from input
    if (comText == '') {
        this.remove();
        if (commentsList.children[0] == undefined) commentsList.remove();
        return 0;
    }
    const newComment = createElement('li', 'comments__item');
    const commentHeader = createElement('div', 'comments__header');
    const commentImg = createElement('img', 'comments__img');
    commentImg.src = profileAvatar;
    const commentAuthor = createElement('div', 'comments__author');
    const commentTitle = createElement('h5', 'comments__title', profileName);

    //comment date
    let commentTime = new Date();
    commentTime = comDate(commentTime);
    const commentDate = createElement('time', 'comments__date', `${commentTime[2]}.${commentTime[1]}.${commentTime[0]}. ${commentTime[3]}:${commentTime[4]}`);
    commentDate.setAttribute('dateTime', `${commentTime[0]}-${commentTime[1]}-${commentTime[2]}T${commentTime[3]}:${commentTime[4]}`);

    const commentText = createElement('div', 'comments__text', comText);

    //reply and delete btns
    const commentBtns = createElement('div', 'comments__btns commentBtns');
    const deleteBtn = createElement('button', 'comments__reply deleteBtn', 'удалить');
    deleteBtn.setAttribute('type', 'button');
    const replyBtn = createElement('button', 'comments__reply replyBtn', 'ответить');
    replyBtn.setAttribute('type', 'button');

    //create .comments__item
    commentAuthor.append(commentTitle, commentDate);
    commentHeader.append(commentImg, commentAuthor);
    commentBtns.append(replyBtn, deleteBtn);
    //reply btn event
    replyBtn.addEventListener('click', replyHandler);
    //delete btn event
    deleteBtn.addEventListener('click', function() {
        const ul = this.closest('ul');
        this.closest('li').remove();
        if (ul.children[0] == undefined) {
            ul.closest('li').querySelector('.hideBtn').remove();
            ul.remove();
        }
    });

    newComment.append(commentHeader, commentText, commentBtns);
    commentsList.append(newComment);

    //remove form if it was for reply
    if (!this.classList.contains('mainComForm')) {
        this.remove();
        //create hide btn for reply
        const parentComBtns = commentsList.closest('li').querySelector('.commentBtns');
        let hideBtn = parentComBtns.querySelector('.hideBtn');
        if (hideBtn == null) {
            hideBtn = createElement('button', 'comments__reply comments__reply--all hideBtn', 'скрыть ответы');
            hideBtn.addEventListener('click', hideHandler);
            parentComBtns.append(hideBtn);
        }
    }

    commentInput.value = '';
    commentInput.focus();
}

function createElement(tag, classEl, inText = '') {
    const element = document.createElement(tag);
    classEl = classEl.split(' '); //classEl include classes separated by a space
    for (item of classEl) element.classList.add(item);
    element.innerText = inText;
    return element
}

function comDate(commentTime) { //commentTime = new Date
    const comYear = `${commentTime.getFullYear()}`;
    const comMonth = rigthTime(commentTime.getMonth()+1);
    const comDay = rigthTime(commentTime.getDate());
    const comHours = rigthTime(commentTime.getHours());
    const comMinutes = rigthTime(commentTime.getMinutes());
    return [comYear, comMonth, comDay, comHours, comMinutes]
}

function rigthTime(partTime) {
    return `${partTime}`.length == 1 ? `0${partTime}` : `${partTime}`
}
