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