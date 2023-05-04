//======================================NEW COMMENT======================================
const commentForm = document.querySelector('.commentForm');
//const profileName = document.getElementById('profileName').value;
const profileName = 'John Martin';
//const profileAvatar = document.getElementById('profileAvatar').src;
const profileAvatar = "https://placehold.it/40";

//comment submit
commentForm.addEventListener('submit', newCommentHandler);

function newCommentHandler(event) {
    event.preventDefault();
    const commentInput = this.querySelector('.commentInput');
    const commentsList = this.nextElementSibling;
    const comText = commentInput.value; //text from input

    const newComment = createElement('li', 'comments__item');
    const commentHeader = createElement('div', 'comments__header');
    const commentImg = createElement('img', 'comments__img');
    commentImg.src = profileAvatar;
    const commentAuthor = createElement('div', 'comments__author');
    const commentTitle = createElement('h5', 'comments__title');
    commentTitle.innerText = profileName;

    const commentDate = createElement('time', 'comments__date');
    let commentTime = new Date();
    commentTime = ComDate(commentTime);
    commentDate.innerText = `${commentTime[2]}.${commentTime[1]}.${commentTime[0]}.`;
    commentDate.setAttribute('dateTime', `${commentTime[0]}-${commentTime[1]}-${commentTime[2]}T${commentTime[3]}:${commentTime[4]}`);

    const commentText = createElement('div', 'comments__text');
    commentText.innerText = comText;

    const commentBtns = createElement('div', 'comments__btns');
    const deleteBtn = createElement('button', 'comments__reply');
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.setAttribute('type', 'button');
    deleteBtn.innerText = 'удалить';
    const replyBtn = createElement('button', 'comments__reply');
    replyBtn.classList.add('replyBtn');
    replyBtn.setAttribute('type', 'button');
    replyBtn.innerText = 'ответить';

    //create .comments__item
    commentAuthor.append(commentTitle);
    commentAuthor.append(commentDate);

    commentHeader.append(commentImg);
    commentHeader.append(commentAuthor);

    commentBtns.append(replyBtn);
    //reply btn event
    replyBtn.addEventListener('click', replyHandler);
    commentBtns.append(deleteBtn);
    //delete btn event
    deleteBtn.addEventListener('click', function() {
        this.closest('li').remove();
    });

    newComment.append(commentHeader);
    newComment.append(commentText);
    newComment.append(commentBtns);

    commentsList.append(newComment);

    if (!this.classList.contains('mainComForm')) {
        this.remove();
    }
    commentInput.value = '';
    commentInput.focus();

}

function createElement(tag, classEl) {
    const element = document.createElement(tag);
    element.classList.add(classEl);
    return element
}

function ComDate(commentTime) {
    const comYear = commentTime.getFullYear();
    const comMonth = `${commentTime.getMonth()+1}`.length == 1 ? `0${commentTime.getMonth()+1}` : `${commentTime.getMonth()+1}`;
    const comDay = `${commentTime.getDate()}`.length == 1 ? `0${commentTime.getDate()}` : `${commentTime.getDate()}`;
    const comHours = commentTime.getHours();
    const comMinutes = commentTime.getMinutes();
    return [comYear, comMonth, comDay, comHours, comMinutes]
}
