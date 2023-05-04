//=============================COMMENT BUTTONS================================
const replyButtons = document.querySelectorAll('.replyBtn');
const hideButtons = document.querySelectorAll('.hideBtn');
const showButtons = document.querySelectorAll('.showBtn');

replyButtons.forEach(item => {
    item.addEventListener('click', replyHandler);
});

function replyHandler(event) {
    event.preventDefault();
    const li = this.closest('li');
    const ulChild = createElement('ul', 'comments__list'); //reply ul
    const commentFormCopy = commentForm.cloneNode(true);
    commentFormCopy.classList.remove('mainComForm');
    commentFormCopy.style['margin-top'] = '1.5rem';
    li.append(commentFormCopy);
    const commentInput = commentFormCopy.querySelector('.commentInput');
    commentInput.focus();
    li.append(ulChild);
    commentFormCopy.addEventListener('submit', newCommentHandler);
}
