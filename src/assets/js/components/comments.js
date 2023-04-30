//COMMENTS

//comment submit
const commentForm = document.getElementById('commentForm');
const commentInput = document.getElementById('commentInput');
const commentsList = document.getElementById('commentsList');
//const profileName = document.getElementById('profileName').value;
const profileName = 'John Martin';
//const profileAvatar = document.getElementById('profileAvatar').src;
const profileAvatar = "https://placehold.it/40";

commentForm.addEventListener('submit', commentFormHandler);

function commentFormHandler(event) {
    event.preventDefault();
    const comText = commentInput.value; //text from input

    const newComment = document.createElement('li');
    newComment.classList.add('comments__item');

    const commentHeader = document.createElement('div');
    commentHeader.classList.add('comments__header');

    const commentImg = document.createElement('img');
    commentImg.classList.add('comments__img');
    commentImg.src = profileAvatar;

    const commentAuthor = document.createElement('div');
    commentAuthor.classList.add('comments__author');
    const commentTitle = document.createElement('h5');
    commentTitle.classList.add('comments__title');
    commentTitle.innerText = profileName;
    const commentDate = document.createElement('time');
    commentDate.classList.add('comments__date');
    let commentTime = new Date();
    let comYear = commentTime.getFullYear();
    let comMonth = `${commentTime.getMonth()+1}`.length == 1 ? `0${commentTime.getMonth()+1}` : `${commentTime.getMonth()+1}`;
    let comDay = `${commentTime.getDate()}`.length == 1 ? `0${commentTime.getDate()}` : `${commentTime.getDate()}`;
    let comHours = commentTime.getHours();
    let comMinutes = commentTime.getMinutes();
    commentDate.innerText = `${comDay}.${comMonth}.${comYear}.`;
    commentDate.setAttribute('dateTime', `${comYear}-${comMonth}-${comDay}T${comHours}:${comMinutes}`);

    const commentText = document.createElement('div');
    commentText.classList.add('comments__text');
    commentText.innerText = comText;

    const commentBtns = document.createElement('div');
    commentBtns.classList.add('comments__btns');
    const commentBtn = document.createElement('button');
    commentBtn.classList.add('comments__reply');
    commentBtn.setAttribute('type', 'button');
    commentBtn.innerText = 'удалить комментарий';

    //create .comments__item
    commentAuthor.append(commentTitle);
    commentAuthor.append(commentDate);

    commentHeader.append(commentImg);
    commentHeader.append(commentAuthor);

    commentBtns.append(commentBtn);

    newComment.append(commentHeader);
    newComment.append(commentText);
    newComment.append(commentBtns);

    commentsList.append(newComment);

    commentInput.value = '';
    commentInput.focus();
}

