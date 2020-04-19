/* eslint-disable no-undef, new-cap */
'use strict';

var ESC_KEYCODE = 27;

var display = {
  BLOCK: 'block',
  FLEX: 'flex',
  NONE: 'none'
};

var phone = {
  MAIN: 'phone-main',
  MODAL: 'phone-modal'
};

var sectionsButton = document.querySelector('#sections-button');
var sections = document.querySelector('#sections');
var contactsButton = document.querySelector('#contacts-button');
var contacts = document.querySelector('#contacts');
var callButton = document.querySelector('#call-order');
var popupForm = document.querySelector('#call-form');
var closeButton = document.querySelector('#popup-close');
var overlay = document.querySelector('#overlay');
var consultationLink = document.querySelector('#consultation-link');
var question = document.querySelector('.question__wrapper');
var infoSection = document.querySelector('.info__item');
var scrollButton = document.querySelector('.page-header__scroll');
var phoneModal = document.querySelector('#phone-modal');
var phoneMain = document.querySelector('#phone-main');

/* ------------------------------------------------------------------ */
// show/hide elements of footer:
var toggleBlock = function (btn, block, displayMode) {

  var hideElements = function (element) {
    element.style.display = display.NONE;
    element.classList.remove('opened');
    var minusButtonId = element.id + '-button';
    minusButtonId = document.getElementById(minusButtonId);
    minusButtonId.style.backgroundImage = 'url("img/plus.svg")';
  };

  var openedeBlocks = document.getElementsByClassName('opened');
  if (openedeBlocks.length) {
    var openedElements = Array.from(openedeBlocks);
    openedElements.forEach(function (element) {
      if (element.className !== block.className) {
        hideElements(element);
      }
    });
  }

  block.classList.toggle('opened');

  if (block.classList.contains('opened')) {
    block.style.display = displayMode;
    btn.style.backgroundImage = 'url("img/minus.svg")';
  } else {
    block.style.display = display.NONE;
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

    promoWrapper.style.background = 'url("img/circuit@1x-desktop.png") ' + rasterShift + ' 171px no-repeat, url("img/triangles-top.svg") ' + svgShift + ' 186px no-repeat';

  } else {
    promoWrapper.style.background = 'url("img/circuit@1x-desktop.png") ' + rasterShift + ' 171px no-repeat, url("img/triangles-top.svg") ' + svgShift + ' 186px no-repeat';
  }
};

if (window.matchMedia('(min-width: 1024px)').matches) {
  alignElements();
}

window.addEventListener('resize', function () {
  if (window.matchMedia('(min-width: 768px)').matches) {
    sections.style.display = display.FLEX;
    contacts.style.display = display.BLOCK;
  } else if (window.matchMedia('(max-width: 767px)').matches) {
    var blocks = [sections, contacts];
    blocks.forEach(function (block) {
      if (!block.classList.contains('opened')) {
        block.style.display = display.NONE;
      }
    });
  }
  if (window.matchMedia('(min-width: 1024px)').matches) {
    alignElements();
  }
});


/* ------------------------------------------------------------------ */
// show/close modal form:

var onCloseButtonClick = function (evt) {
  evt.preventDefault();
  hideForm();
};

var onEscKeyDown = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    hideForm();
  }
};

var onOverlayClick = function (evt) {
  if (evt.target.id === 'overlay') {
    hideForm();
  }
};

var hideForm = function () {
  popupForm.style.display = display.NONE;
  overlay.style.display = display.NONE;
  document.body.classList.remove('overflow-hidden');

  closeButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onEscKeyDown);
  document.removeEventListener('click', onOverlayClick);
};

callButton.addEventListener('click', function (evt) {
  evt.preventDefault();

  overlay.style.display = display.BLOCK;
  popupForm.style.display = display.BLOCK;
  document.body.classList.add('overflow-hidden');

  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onEscKeyDown);
  document.addEventListener('click', onOverlayClick);
});

/* ------------------------------------------------------------------ */
// scroll:
var smoothScrollTo = function () {
  var timer;
  var start;
  var factor;

  return function (target, duration) {
    var offset = window.pageYOffset;
    var delta = target - window.pageYOffset;
    start = Date.now();
    factor = 0;

    if (timer) {
      clearInterval(timer);
    }

    function step() {
      var y;
      factor = (Date.now() - start) / duration;
      if (factor >= 1) {
        clearInterval(timer);
        factor = 1;
      }
      y = factor * delta + offset;
      window.scrollBy(0, y - window.pageYOffset);
    }

    timer = setInterval(step, 10);
    return timer;
  };
};

var questionPosition = question.getBoundingClientRect().top;
var infoSectionPosition = infoSection.getBoundingClientRect().top;

var smoothScrollToForm = smoothScrollTo().bind(null, questionPosition, 700);
var smoothScrollToInfo = smoothScrollTo().bind(null, infoSectionPosition, 800);

consultationLink.addEventListener('click', smoothScrollToForm);
scrollButton.addEventListener('click', smoothScrollToInfo);

/* ------------------------------------------------------------------ */
// phone mask:

var phoneMainMask = IMask(phoneMain, {mask: '+{7}(000)000-00-00'});

var phoneModalMask = IMask(phoneModal, {mask: '+{7}(000)000-00-00'});

var onInputFocus = function (evt) {
  var mask = evt.target.id === phone.MAIN ? phoneMainMask : phoneModalMask;
  if (!evt.target.value) {
    mask.value = '+7';
  }
};

phoneMain.addEventListener('focus', onInputFocus);
phoneModal.addEventListener('focus', onInputFocus);


