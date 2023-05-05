//=============================TEXTAREA=============================
const textarea = document.querySelectorAll('[data-resize]');

textarea.forEach(item => {
    let textareaHeight = item.offsetHeight;
    item.addEventListener('input', event => {
        let $this = event.target;
        $this.style.height = textareaHeight + 'px';
        $this.style.height = $this.scrollHeight + 'px';
    });
});

/*
function textareaHandler() {
    this.style.height = textareaHeight + 'px';
    this.style.height = this.scrollHeight + 'px';
}
*/
