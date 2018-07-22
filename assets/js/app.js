'use strict'

class App {

  constructor() {

    this.body = document.querySelector('body');
  }

  bodyClass(cssClass) {

    this.body.classList.add(cssClass);
  }

}