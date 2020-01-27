'use strict';
// Simply adds or removes the "show" class in repsponse to the burger being clicked.
function toggleNavBarBurger() {
  const nav = document.getElementById('navbarNav');
  toggleShow(nav);
}

function togglePostDropDown() {
  const postDropDown = document.getElementById('post-drop-down');
  const postMenuLink = document.getElementById('post-menu-link');
  toggleShow(postDropDown);
  toggleShow(postMenuLink);
}

function toggleShow(element) {
  const show = 'show';
  if (element.classList.contains(show)) {
    element.classList.remove(show);
  } else {
    element.classList.add(show);
  }
}
// Uses an asynchronous XHR request to read the raw nav.html file and replace the <navelement> with it.
(async () => {
  const tag = 'navElement';
  const resp = await httpRequestWrapper('nav.html');
  const el = document.getElementsByTagName(tag)[0];
  if (!el) {
    console.error(`${tag} element is not defined!`);
  }
  el.outerHTML = resp;
})();
