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
