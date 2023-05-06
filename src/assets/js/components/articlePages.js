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
