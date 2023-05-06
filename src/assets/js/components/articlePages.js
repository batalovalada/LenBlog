//==============================ARTICLE PAGES=================================
const acrticlePages = document.querySelectorAll('.articlePages');

acrticlePages.forEach(item => {
    const acrticlePage = item;
    const pagination = item.querySelectorAll('[data-page]');
    const pageCount = pagination.length-2;
    pagination.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            const pageId = this.dataset.page;
            let page = acrticlePage.querySelector(pageId);

            //number of page that is currently active
            let activeNowPageId;
            pagination.forEach(item => {
                if (item.classList.contains('active')) activeNowPageId = item.dataset.page;
            });

            //make all pages inactive
            pagination.forEach(item => {
                item.classList.remove('active');
                const hidePageId = item.dataset.page;
                if (hidePageId !='.nextPage' && hidePageId !='.previousPage') acrticlePage.querySelector(hidePageId).classList.remove('show');
            });

            //make necessary page active
            if (/\d+/gi.test(pageId)) {
                this.classList.add('active');
            } else if (pageId == '.nextPage' || pageId == '.previousPage') {
                activeNowPageId = movePage(activeNowPageId, pageId, pageCount);
                page = acrticlePage.querySelector(activeNowPageId);
                pagination.forEach(item => {
                    if (item.dataset.page == activeNowPageId) item.classList.add('active')
                });
            }
            page.classList.add('show');
        });
    });
});


function movePage(activeNowPageId, pageId, pageCount) {
    let num = activeNowPageId.match(/\d+/gi);
    num = num[0];
    if (pageId == '.nextPage' && num < pageCount) num++;
    if (pageId == '.previousPage' && num > 1) num--;
    return activeNowPageId.replace(/\d+/gi, `${num}`);
}










