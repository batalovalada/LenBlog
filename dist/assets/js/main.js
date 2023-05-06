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
//==============================ARTICLE PAGES=================================
const acrticlePages = document.querySelectorAll('.articlePages');
const pageCount = 3;

acrticlePages.forEach(item => {
    const acrticlePage = item;
    const pagination = item.querySelectorAll('[data-page]');
    pagination.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            const pageId = this.dataset.page;
            let page = acrticlePage.querySelector(pageId);
            let activeNowPageId;
            pagination.forEach(item => {
                if (item.classList.contains('active')) activeNowPageId = item.dataset.page;
            });
            pagination.forEach(item => {
                item.classList.remove('active');
                const hidePageId = item.dataset.page;
                if (hidePageId !='#nextPage' && hidePageId !='#previousPage') acrticlePage.querySelector(hidePageId).classList.remove('show');
            });
            if (/\d+/gi.test(pageId)) {
                this.classList.add('active');
            } else if (pageId == '#nextPage') {
                let num = activeNowPageId.match(/\d+/gi);
                num = num[0];
                if (num < pageCount) num++;
                activeNowPageId = activeNowPageId.replace(/\d+/gi, `${num}`);
                page = acrticlePage.querySelector(activeNowPageId);
                pagination.forEach(item => {
                    if (item.dataset.page == activeNowPageId) item.classList.add('active')
                });

            } else if (pageId == '#previousPage') {
                let num = activeNowPageId.match(/\d+/gi);
                num = num[0];
                if (num > 1) num--;
                activeNowPageId = activeNowPageId.replace(/\d+/gi, `${num}`);
                page = acrticlePage.querySelector(activeNowPageId);
                pagination.forEach(item => {
                    if (item.dataset.page == activeNowPageId) item.classList.add('active')
                });
            }
            page.classList.add('show');
        });
    });
});
//=============================TEXTAREA=============================
const textarea = document.querySelectorAll('[data-resize]');

textarea.forEach(item => {
    let textareaHeight = item.offsetHeight;
    item.addEventListener('input', event => {
        let $this = event.target;
        $this.style.height = textareaHeight + 'px';
        $this.style.height = $this.scrollHeight + 2 + 'px';
    });
});
//=========================VALIDATION============================
function formValidation(form) {
    /* Remove Error */
    function removeError(input) {
        const parent = input.parentNode;

        if (parent.classList.contains('form__error')) {
            parent.querySelector('.form__error-label').remove();
            parent.classList.remove('form__error');
        }
    }


    /* Create Error */
    function createError(input, errorText) {
        const parent = input.parentNode;
        const errorLabel = document.createElement('label');

        errorLabel.classList.add('form__error-label');
        errorLabel.textContent = errorText;
        parent.classList.add('form__error');
        parent.append(errorLabel);

    }

    let result = true;
    const allInputs = form.querySelectorAll('input, textarea');

    for (const input of allInputs) {
        removeError(input);

        if (input.dataset.email == "true") {
            if (!input.value.match(/[-.\w]+@([\w-]+\.)+[\w-]+/g)) {
                removeError(input);
                createError(input, 'Email введён неверно!');
                result = false;
            }
        }

        if (input.dataset.required == "true") {
            if (input.value == "") {
                removeError(input);
                createError(input, 'Поле не заполнено!');
                result = false;
            }
        }
    }

    return result
}


document.getElementById('messageForm').addEventListener('submit', function(event) {
    event.preventDefault();
    if (formValidation(this) == true) {
        alert('Сообшение отправлено успешно!');
    }
});
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
    commentInput.style.height = commentFormH + 'px';
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
        innerForm = commentFormCopy.cloneNode(true); //copy of main comment form
        innerUl.parentNode.insertBefore(innerForm, innerUl);
        //during input reply btn -> cancel btn
        this.classList.remove('replyBtn');
        this.classList.add('cancelBtn');
        this.innerText = 'отмена';
        this.addEventListener('click', cancelHandler, {once: true});
    }
    const inputForm = innerForm.querySelector('.commentInput');
    inputForm.addEventListener('input', event => {
        let $this = event.target;
        $this.style.height = commentFormH + 'px';
        $this.style.height = $this.scrollHeight + 2 + 'px';
    });
    inputForm.focus();
    innerForm.addEventListener('submit', newCommentHandler);
    inputForm.value = '';
    inputForm.style.height = commentFormH + 'px';
}

//hide btn event
hideButtons.forEach(item => {
    item.addEventListener('click', hideHandler);
});

function hideHandler(event) {
    event.preventDefault();
    const innerUl = this.closest('li').querySelector('.commentsList');
    innerUl.classList.toggle('hide');
    this.innerText = innerUl.classList.contains('hide') ? 'показать ответы' : 'скрыть ответы';
}

//cancel btn handler
function cancelHandler() {
    const li = this.closest('li');
    li.querySelector('.commentForm').remove();
    if (li.querySelector('.commentsList').children[0] == undefined) li.querySelector('.commentsList').remove();
    this.classList.remove('cancelBtn');
    this.classList.add('replyBtn');
    this.innerText = 'ответить';
}