'use strict'

/**
 * boot.js
 */

let app = new App();



window.onload = () => {

  const $app = new App();
  

  let page = document.querySelector('article.post');

  if (page && page.classList.contains('content-sobre')) {
    const $about = (typeof About === 'function') ? new About() : null;
  }
}