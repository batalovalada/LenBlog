//NAV
const navBtn = document.getElementById('navToggle');
const nav = document.getElementById('nav');
const page = document.getElementById('page');
const body = document.body;

navBtn.addEventListener('click', event => {
    if (body.classList.contains('show-nav')) {
        closeNav();
    } else {
        showNav();
    }
});


function showNav() {
    let mask = document.createElement('div');
    mask.classList.add('page__mask');
    mask.addEventListener('click', closeNav);
    page.appendChild(mask);
    body.classList.add('show-nav');
}

function closeNav() {
    body.classList.remove('show-nav');
    document.querySelector('.page__mask').remove();
}
//MODAL
const modalBtn = document.querySelectorAll('[data-modal]');
const modalClose = document.querySelectorAll('.modal__close');
const modal = document.querySelectorAll('.modal');

//open modal
modalBtn.forEach(item => {
    item.addEventListener('click', event => {
        let $this = event.currentTarget;
        let modalId = $this.getAttribute('data-modal');
        let modal = document.getElementById(modalId);
        let modalInner = modal.querySelector('.modal__inner');

        modalInner.addEventListener('click', event => {
            event.stopPropagation();
        });

        modal.classList.add('show');
        body.classList.add('no-scroll');

        setTimeout(() => {
            modalInner.style.transform = 'none';
            modalInner.style.opacity = '1';
        }, 1);

    });
});


//close modal
modalClose.forEach(item => {
    item.addEventListener('click', event => {
        let currentModal = event.currentTarget.closest('.modal');
        closeModal(currentModal);
    });
});


modal.forEach(item => {
    item.addEventListener('click', event => {
        let currentModal = event.currentTarget;
        closeModal(currentModal);
    });
});

function closeModal(currentModal) {
    let modalInner = currentModal.querySelector('.modal__inner');
    modalInner.removeAttribute('style');

    setTimeout(() => {
        currentModal.classList.remove('show');
        body.classList.remove('no-scroll');
    }, 200);
}
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