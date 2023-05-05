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
