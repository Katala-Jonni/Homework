'use strict';

const articles = document.querySelector('.tabs-content').children;
const tabs = document.querySelector('.tabs-nav');
const tabsChildren = tabs.children;
const startTab = tabs.firstElementChild;
tabs.removeChild(startTab);

Array.from(articles).forEach((child) => {
    const clone = startTab.cloneNode(true);
    const childTab = tabs.appendChild(clone);
    childTab.firstElementChild.textContent = child.dataset.tabTitle;
    childTab.firstElementChild.classList = `fa ${child.dataset.tabIcon}`;
    child.classList.add('hidden');
});

Array.from(tabsChildren).forEach(child => child.addEventListener('click', activeTab));

function activeTab() {
    Array.from(tabsChildren).forEach(child => child.classList.remove('ui-tabs-active'));
    this.classList.add('ui-tabs-active');
    activeArticle(this);
}

function activeArticle(article) {
    const activeArticle = Array.from(articles).find(child => article.textContent === child.dataset.tabTitle);
    Array.from(articles).forEach(child => child.classList.add('hidden'));
    activeArticle.classList.remove('hidden');
}
onLoad(articles[0], tabs.children[0]);

function onLoad(article, firstTab) {
    article.classList.remove('hidden');
    firstTab.classList.add('ui-tabs-active');
}