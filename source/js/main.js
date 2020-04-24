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
var form = document.querySelector('#form');
var userName = document.querySelector('.question__user-name');
var questionText = document.querySelector('#question-text');
var formModal = document.querySelector('.call__form');
var userNameModal = document.querySelector('.call__user-name');
var modalText = document.querySelector('.call__textarea');
var promoWrapper = document.querySelector('.page-header__promo-wrapper');

/* ------------------------------------------------------------------ */
// show/hide elements of footer:
var toggleBlock = function (btn, block, displayMode) {

  var openedeBlocks = document.getElementsByClassName('opened');
  if (openedeBlocks.length) {
    var openedElements = Array.from(openedeBlocks);
    openedElements.forEach(function (element) {
      if (element.className !== block.className) {
        element.style.display = display.NONE;
        element.classList.remove('opened');
        var button = element.id + '-button';
        button = document.getElementById(button);

        button.classList.remove('page-footer__minus-button');
        button.classList.add('page-footer__plus-button');
      }
    });
  }

  block.classList.toggle('opened');

  if (block.classList.contains('opened')) {
    block.style.display = displayMode;
    btn.classList.remove('page-footer__plus-button');
    btn.classList.add('page-footer__minus-button');

  } else {
    block.style.display = display.NONE;
    btn.classList.add('page-footer__plus-button');
    btn.classList.remove('page-footer__minus-button');
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

  } else if (window.matchMedia('(min-width: 1024px)').matches) {
    promoWrapper.style.background = 'url("img/circuit@1x-desktop.png") ' + rasterShift + ' 171px no-repeat, url("img/triangles-top.svg") ' + svgShift + ' 186px no-repeat';
  }
};

if (window.matchMedia('(min-width: 1024px)').matches) {
  alignElements();
}

window.addEventListener('resize', function () {
  if (window.matchMedia('(min-width: 320px)').matches) {
    promoWrapper.style.background = 'url("img/circuit@1x-mobile.png") 26px 31px no-repeat, url("img/triangles-top-mobile.svg") 165px 8px no-repeat';
  }

  if (window.matchMedia('(min-width: 768px)').matches) {
    sections.style.display = display.FLEX;
    contacts.style.display = display.BLOCK;
    promoWrapper.style.background = 'url("img/circuit@1x-tablet.png") 510px 41px no-repeat, url("img/triangles-top-mobile.svg") 457px 11px no-repeat';

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
// local storage:

var isStorageSupport = true;
var storageName = '';
var storagePhone;
var storageQuestionText;

try {
  storageName = localStorage.getItem('userName');
  storagePhone = localStorage.getItem('phoneMain');
  storageQuestionText = localStorage.getItem('questionText');
} catch (err) {
  isStorageSupport = false;
}

form.addEventListener('submit', function (evt) {
  evt.preventDefault();
  if (isStorageSupport) {
    localStorage.setItem('userName', userName.value);
    localStorage.setItem('phoneMain', phoneMain.value);
    localStorage.setItem('questionText', questionText.value);
  }
});

formModal.addEventListener('submit', function (evt) {
  evt.preventDefault();
  if (isStorageSupport) {
    localStorage.setItem('userName', userNameModal.value);
    localStorage.setItem('phoneMain', phoneModal.value);
    localStorage.setItem('questionText', modalText.value);
  }
  hideForm();
});

if (storageName) {
  userName.value = storageName;
  phoneMain.value = storagePhone;
  questionText.value = storageQuestionText;
  userNameModal.value = storageName;
  phoneModal.value = storagePhone;
  modalText.value = storageQuestionText;
}
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

  if (!userNameModal.value) {
    userNameModal.focus();
  }

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
var infoSectionPosition = infoSection.getBoundingClientRect().top - 20;

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


