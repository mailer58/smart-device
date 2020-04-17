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

/* ------------------------------------------------------------------ */
// align elements of background of the header:

var MAX_TITLE_RIGHT_POS = 1013; // for resolution 1920px
var rasterInintPos = 811;
var svgInitPos = 823;
var titleRightBorderInitPos = 764;


var alignElements = function () {
  var promoWrapper = document.querySelector('.page-header__promo-wrapper');
  var headerTitle = document.querySelector('.page-header__title');
  var titleRightBorder = headerTitle.getBoundingClientRect().right;
  var rasterShift = rasterInintPos;

  var svgShift;
  var diff;

  svgShift = svgInitPos;

  if (window.matchMedia('(min-width: 1221px)').matches) {
    diff = titleRightBorder - titleRightBorderInitPos;
    svgShift = svgInitPos + diff;

    rasterShift = rasterInintPos + diff;
  }

  rasterShift = rasterShift + 'px';
  svgShift = svgShift + 'px';

  if (window.matchMedia('(min-width: 1921px)').matches) {
    diff = MAX_TITLE_RIGHT_POS - titleRightBorderInitPos;

    rasterShift = rasterInintPos + diff;
    rasterShift = rasterShift + 'px';

    diff = MAX_TITLE_RIGHT_POS - titleRightBorderInitPos;
    svgShift = svgInitPos + diff;
    svgShift = svgShift + 'px';

    promoWrapper.style.background = 'url("../img/circuit@1x-desktop.png") ' + rasterShift + ' 171px no-repeat, url("../img/triangles-top.svg") ' + svgShift + ' 186px no-repeat';

  } else {
    promoWrapper.style.background = 'url("../img/circuit@1x-desktop.png") ' + rasterShift + ' 171px no-repeat, url("../img/triangles-top.svg") ' + svgShift + ' 186px no-repeat';
  }
};

if (window.matchMedia('(min-width: 1024px)').matches) {
  alignElements();
  window.addEventListener('resize', alignElements);
}
