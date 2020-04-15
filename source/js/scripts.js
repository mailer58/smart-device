'use strict';

// show/hide elements of site:

var display = {
  BLOCK: 'block',
  FLEX: 'flex'
};

var sectionsButton = document.querySelector('#sections-button');
var sections = document.querySelector('#sections');

var contactsButton = document.querySelector('#contacts-button');
var contacts = document.querySelector('#contacts');


var toggleBlock = function (btn, block, displayMode) {

  block.classList.toggle('opened');

  if (block.classList.contains('opened')) {
    block.style.display = displayMode;
    btn.style.backgroundImage = 'url("img/minus.svg")';
  } else {
    block.style.display = 'none';
    btn.style.backgroundImage = 'url("img/plus.svg")';
  }
};

var toggleSections = toggleBlock.bind(null, sectionsButton, sections, display.FLEX);
var toggleContacts = toggleBlock.bind(null, contactsButton, contacts, display.BLOCK);

sectionsButton.addEventListener('click', toggleSections);
contactsButton.addEventListener('click', toggleContacts);

