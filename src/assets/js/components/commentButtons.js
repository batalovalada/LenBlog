//=============================COMMENT BUTTONS================================
const replyButtons = document.querySelectorAll('.replyBtn');
const hideButtons = document.querySelectorAll('.hideBtn');
const showButtons = document.querySelectorAll('.showBtn');

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
        innerUl = createElement('ul', 'comments__list');
        innerUl.classList.add('commentsList');
        li.append(innerUl);
    }
    if (innerForm == null) {
        innerForm = commentForm.cloneNode(true);
        innerForm.classList.remove('mainComForm');
        innerForm.style['margin-top'] = '1.5rem';
        innerUl.parentNode.insertBefore(innerForm, innerUl)
    }
    const commentInput = innerForm.querySelector('.commentInput');
    commentInput.focus();
    innerForm.addEventListener('submit', newCommentHandler);
}

