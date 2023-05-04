//=======================================NAV======================================
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
//=====================================MODAL=======================================
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
    //when form is submitted cancel btn -> reply btn
    const cancelButton = this.closest('li').querySelector('.cancelBtn');
    if ( cancelButton != null) {
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
    const commentTitle = createElement('h5', 'comments__title');
    commentTitle.innerText = profileName;

    const commentDate = createElement('time', 'comments__date');
    let commentTime = new Date();
    commentTime = ComDate(commentTime);
    commentDate.innerText = `${commentTime[2]}.${commentTime[1]}.${commentTime[0]}.`;
    commentDate.setAttribute('dateTime', `${commentTime[0]}-${commentTime[1]}-${commentTime[2]}T${commentTime[3]}:${commentTime[4]}`);

    const commentText = createElement('div', 'comments__text');
    commentText.innerText = comText;

    const commentBtns = createElement('div', 'comments__btns commentBtns');
    const deleteBtn = createElement('button', 'comments__reply deleteBtn');
    deleteBtn.setAttribute('type', 'button');
    deleteBtn.innerText = 'удалить';
    const replyBtn = createElement('button', 'comments__reply replyBtn');
    replyBtn.setAttribute('type', 'button');
    replyBtn.innerText = 'ответить';

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

    if (!this.classList.contains('mainComForm')) {
        this.remove();
        //create hide btn for reply
        const parentComBtns = commentsList.closest('li').querySelector('.commentBtns');
        let hideBtn = parentComBtns.querySelector('.hideBtn');
        if (hideBtn == null) {
            hideBtn = createElement('button', 'comments__reply comments__reply--all hideBtn');
            hideBtn.innerText = 'скрыть ответы';
            hideBtn.addEventListener('click', hideHandler);
            parentComBtns.append(hideBtn);
        }
    }
    commentInput.value = '';
    commentInput.focus();

}

function createElement(tag, classEl) {
    const element = document.createElement(tag);
    classEl = classEl.split(' '); //classEl include classes separated by a space
    for (item of classEl) element.classList.add(item);
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
//=============================COMMENT BUTTONS================================
const replyButtons = document.querySelectorAll('.replyBtn');
const hideButtons = document.querySelectorAll('.hideBtn');

//reply btn event
replyButtons.forEach(item => {
    item.addEventListener('click', replyHandler);
});

function replyHandler(event) {
    event.preventDefault();
    const li = this.closest('li');
    let innerForm = li.querySelector('.commentForm'); //existing form in li
    let innerUl = li.querySelector('.commentsList');  //existing ul in li
    if (innerUl == null) {
        innerUl = createElement('ul', 'comments__list commentsList');
        li.append(innerUl);
    }
    if (innerForm == null) {
        innerForm = commentForm.cloneNode(true);
        innerForm.classList.remove('mainComForm');
        innerForm.style['margin-top'] = '1.5rem';
        innerUl.parentNode.insertBefore(innerForm, innerUl);
        this.classList.remove('replyBtn');
        this.classList.add('cancelBtn');
        this.innerText = 'отмена';
        this.addEventListener('click', cancelHandler, {once: true});
    }
    const commentInput = innerForm.querySelector('.commentInput');
    commentInput.focus();
    innerForm.addEventListener('submit', newCommentHandler);
}

//hide and show btns event
hideButtons.forEach(item => {
    item.addEventListener('click', hideHandler);
});

function hideHandler(event) {
    event.preventDefault();
    const innerUl = this.closest('li').querySelector('.commentsList');
    innerUl.classList.toggle('hide');
    this.innerText = innerUl.classList.contains('hide') ? 'показать ответы' : 'скрыть ответы';
}

//cancel btn
function cancelHandler() {
    const li = this.closest('li');
    li.querySelector('.commentForm').remove();
    if (li.querySelector('.commentsList').children[0] == undefined) li.querySelector('.commentsList').remove();
    this.classList.remove('cancelBtn');
    this.classList.add('replyBtn');
    this.innerText = 'ответить';
}