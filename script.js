(function () {
  const header = document.getElementById('header');
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  var hero = document.getElementById('hero');
  var heroPin = document.querySelector('.hero-pin');
  var heroInner = hero ? hero.querySelector('.hero__inner') : null;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function updateHeroParallax() {
    if (!hero || !heroPin || reduceMotion.matches) return;

    var viewHeight = window.innerHeight || hero.offsetHeight;
    var scrollY = Math.max(window.scrollY, 0);
    var overlapProgress = Math.min(scrollY / viewHeight, 1);
    var pinBottom = heroPin.getBoundingClientRect().bottom;

    if (pinBottom <= viewHeight + 1) {
      hero.classList.add('hero--released');
    } else {
      hero.classList.remove('hero--released');
    }

    if (heroInner) {
      heroInner.style.opacity = String(1 - overlapProgress * 0.5);
    }
  }

  function onScroll() {
    header.classList.toggle('header--scrolled', window.scrollY > 20);
    updateHeroParallax();
  }

  function closeMenu() {
    burger.classList.remove('header__burger--active');
    nav.classList.remove('header__nav--open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function openMenu() {
    burger.classList.add('header__burger--active');
    nav.classList.add('header__nav--open');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  burger.addEventListener('click', function () {
    if (nav.classList.contains('header__nav--open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateHeroParallax, { passive: true });
  onScroll();

  var styleData = [
    {
      title: 'Псевдоморе',
      image: 'img/styles/1.jpg',
      desc: 'Яркая и\u00a0декоративная эстетика морского рифа в\u00a0пресной воде\u00a0— идеальный баланс между эффектностью и\u00a0простотой обслуживания.',
      features: [
        'Яркие рыбки',
        'Искусственные кораллы',
        'Светлый декор',
        'Ощущение тропического рифа'
      ]
    },
    {
      title: 'Природный стиль',
      image: 'img/styles/2.jpg',
      desc: 'Аквариум, вдохновлённый природными ландшафтами\u00a0— спокойная эстетика живой природы для гармоничного интерьера.',
      features: [
        'Натуральные коряги',
        'Камни',
        'Спокойные природные оттенки',
        'Ощущение фрагмента реки или озера'
      ]
    },
    {
      title: 'Hardscape',
      image: 'img/styles/3.jpg',
      desc: 'Строгая композиция, где главную роль играет структура ландшафта\u00a0— минималистичный и\u00a0выразительный интерьерный акцент.',
      features: [
        'Камни, коряги, грунт',
        'Чёткая композиция',
        'Минимум лишних элементов',
        'Выразительный ландшафт'
      ]
    },
    {
      title: 'Морской стиль',
      image: 'img/styles/4.jpg',
      desc: 'Премиальный вариант с\u00a0атмосферой настоящего кораллового рифа\u00a0— для тех, кто хочет максимально впечатляющий аквариум.',
      features: [
        'Коралловый риф',
        'Морские рыбы',
        'Насыщенные цвета',
        'Премиальная сложная система'
      ]
    },
    {
      title: 'Японский стиль с живыми растениями',
      image: 'img/styles/5.jpg',
      desc: 'Акваскейп как цельная подводная композиция\u00a0— гармония, баланс и\u00a0философия Nature Aquarium в\u00a0вашем интерьере.',
      features: [
        'Подводный сад',
        'Живые растения',
        'Баланс и гармония',
        'Композиция в духе природного пейзажа'
      ]
    }
  ];

  var styleTabs = document.querySelectorAll('.decoration-styles__tab');
  var styleSelect = document.getElementById('style-select');
  var styleImage = document.getElementById('style-image');
  var styleTitle = document.getElementById('style-title');
  var styleDesc = document.getElementById('style-desc');
  var styleFeatures = document.getElementById('style-features');
  var stylePanel = document.getElementById('style-panel');
  var styleContent = document.querySelector('.decoration-styles__content');

  if (styleImage && styleDesc && styleFeatures && (styleTabs.length || styleSelect)) {
    if (styleSelect) {
      styleData.forEach(function (data, i) {
        var option = document.createElement('option');
        option.value = String(i);
        option.textContent = data.title;
        styleSelect.appendChild(option);
      });
    }

    function setActiveStyle(index) {
      var data = styleData[index];
      if (!data) return;

      styleTabs.forEach(function (tab, i) {
        var isActive = i === index;
        tab.classList.toggle('decoration-styles__tab--active', isActive);
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      if (styleSelect) {
        styleSelect.value = String(index);
      }

      stylePanel.setAttribute('aria-labelledby', 'style-tab-' + index);

      styleImage.classList.add('decoration-styles__image--fade');
      if (styleContent) {
        styleContent.classList.add('decoration-styles__content--fade');
      }

      window.setTimeout(function () {
        styleImage.src = data.image;
        styleImage.alt = data.title;
        styleImage.classList.remove('decoration-styles__image--fade');

        if (styleTitle) {
          styleTitle.textContent = data.title;
        }

        styleDesc.textContent = data.desc;

        styleFeatures.innerHTML = '';
        data.features.forEach(function (feature) {
          var li = document.createElement('li');
          li.textContent = feature;
          styleFeatures.appendChild(li);
        });

        if (styleContent) {
          styleContent.classList.remove('decoration-styles__content--fade');
        }
      }, 150);
    }

    styleTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        setActiveStyle(Number(tab.dataset.index));
      });
    });

    if (styleSelect) {
      styleSelect.addEventListener('change', function () {
        setActiveStyle(Number(styleSelect.value));
      });
    }
  }

  var speciesSlider = document.getElementById('species-slider');
  var speciesTrack = document.getElementById('species-track');
  var speciesDots = document.getElementById('species-dots');

  if (speciesSlider && speciesTrack && speciesDots) {
    var speciesCards = speciesTrack.querySelectorAll('.species__card');
    var speciesPrev = speciesSlider.querySelector('.species__arrow--prev');
    var speciesNext = speciesSlider.querySelector('.species__arrow--next');
    var speciesViewport = speciesTrack.parentElement;
    var speciesIndex = 0;
    var speciesGap = 24;

    function isSpeciesMobileScroll() {
      return window.innerWidth < 600;
    }

    function getSpeciesPerView() {
      if (isSpeciesMobileScroll()) return 1;
      if (window.innerWidth < 1200) return 2;
      return 3;
    }

    function getSpeciesMaxIndex() {
      if (isSpeciesMobileScroll()) {
        return Math.max(0, speciesCards.length - 1);
      }
      return Math.max(0, speciesCards.length - getSpeciesPerView());
    }

    function updateSpeciesDots() {
      speciesDots.querySelectorAll('.species__dot').forEach(function (dot, i) {
        dot.classList.toggle('species__dot--active', i === speciesIndex);
      });
    }

    function buildSpeciesDots() {
      speciesDots.innerHTML = '';
      var total = getSpeciesMaxIndex() + 1;
      for (var i = 0; i < total; i++) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'species__dot' + (i === speciesIndex ? ' species__dot--active' : '');
        dot.setAttribute('aria-label', 'Слайд ' + (i + 1));
        dot.dataset.index = String(i);
        speciesDots.appendChild(dot);
      }
    }

    function updateSpeciesSlider() {
      var perView = getSpeciesPerView();
      var maxIndex = getSpeciesMaxIndex();

      if (speciesIndex > maxIndex) {
        speciesIndex = maxIndex;
      }

      if (isSpeciesMobileScroll()) {
        speciesCards.forEach(function (card) {
          card.style.width = '';
          card.style.flexBasis = '';
        });
        speciesTrack.style.transform = 'none';
        if (speciesPrev) speciesPrev.disabled = true;
        if (speciesNext) speciesNext.disabled = true;
        updateSpeciesDots();
        return;
      }

      var cardWidth = (speciesViewport.offsetWidth - speciesGap * (perView - 1)) / perView;

      speciesCards.forEach(function (card) {
        card.style.width = cardWidth + 'px';
        card.style.flexBasis = cardWidth + 'px';
      });

      speciesTrack.style.transform = 'translateX(' + (-speciesIndex * (cardWidth + speciesGap)) + 'px)';

      if (speciesPrev) speciesPrev.disabled = speciesIndex === 0;
      if (speciesNext) speciesNext.disabled = speciesIndex >= maxIndex;

      updateSpeciesDots();
    }

    function goToSpecies(index) {
      speciesIndex = Math.max(0, Math.min(index, getSpeciesMaxIndex()));

      if (isSpeciesMobileScroll() && speciesViewport) {
        var targetCard = speciesCards[speciesIndex];
        if (targetCard) {
          speciesViewport.scrollTo({
            left: targetCard.offsetLeft,
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
          });
        }
        updateSpeciesDots();
        return;
      }

      updateSpeciesSlider();
    }

    function syncSpeciesIndexFromScroll() {
      if (!isSpeciesMobileScroll() || !speciesViewport) return;

      var viewportCenter = speciesViewport.scrollLeft + speciesViewport.offsetWidth / 2;
      var nearestIndex = 0;
      var nearestDistance = Infinity;

      speciesCards.forEach(function (card, index) {
        var cardCenter = card.offsetLeft + card.offsetWidth / 2;
        var distance = Math.abs(cardCenter - viewportCenter);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });

      if (nearestIndex !== speciesIndex) {
        speciesIndex = nearestIndex;
        updateSpeciesDots();
      }
    }

    if (speciesPrev) {
      speciesPrev.addEventListener('click', function () {
        goToSpecies(speciesIndex - 1);
      });
    }

    if (speciesNext) {
      speciesNext.addEventListener('click', function () {
        goToSpecies(speciesIndex + 1);
      });
    }

    speciesDots.addEventListener('click', function (event) {
      var dot = event.target.closest('.species__dot');
      if (!dot) return;
      goToSpecies(Number(dot.dataset.index));
    });

    if (speciesViewport) {
      speciesViewport.addEventListener('scroll', syncSpeciesIndexFromScroll, { passive: true });
    }

    window.addEventListener('resize', function () {
      buildSpeciesDots();
      updateSpeciesSlider();
    });

    buildSpeciesDots();
    updateSpeciesSlider();
  }

  var gallerySets = {
    projects: [
      { src: 'img/projects/1.jpg', alt: 'Проект AquaDT 1' },
      { src: 'img/projects/2.jpg', alt: 'Проект AquaDT 2' },
      { src: 'img/projects/3.jpg', alt: 'Проект AquaDT 3' },
      { src: 'img/projects/4.jpg', alt: 'Проект AquaDT 4' },
      { src: 'img/projects/5.jpg', alt: 'Проект AquaDT 5' },
      { src: 'img/projects/6.jpg', alt: 'Проект AquaDT 6' },
      { src: 'img/projects/7.jpg', alt: 'Проект AquaDT 7' },
      { src: 'img/projects/8.jpg', alt: 'Проект AquaDT 8' }
    ],
    works: [
      { src: 'img/gallery/1.jpg', alt: 'Аквариум AquaDT — проект 1' },
      { src: 'img/gallery/2.jpg', alt: 'Аквариум AquaDT — проект 2' },
      { src: 'img/gallery/3.jpg', alt: 'Аквариум AquaDT — проект 3' },
      { src: 'img/gallery/4.jpg', alt: 'Аквариум AquaDT — проект 4' },
      { src: 'img/gallery/5.jpg', alt: 'Аквариум AquaDT — проект 5' },
      { src: 'img/gallery/6.jpg', alt: 'Аквариум AquaDT — проект 6' },
      { src: 'img/gallery/7.jpg', alt: 'Аквариум AquaDT — проект 7' },
      { src: 'img/gallery/8.jpg', alt: 'Аквариум AquaDT — проект 8' },
      { src: 'img/gallery/9.jpg', alt: 'Аквариум AquaDT — проект 9' },
      { src: 'img/gallery/10.jpg', alt: 'Аквариум AquaDT — проект 10' },
      { src: 'img/gallery/11.jpg', alt: 'Аквариум AquaDT — проект 11' },
      { src: 'img/gallery/12.jpg', alt: 'Аквариум AquaDT — проект 12' },
      { src: 'img/gallery/13.jpg', alt: 'Аквариум AquaDT — проект 13' },
      { src: 'img/gallery/14.jpg', alt: 'Аквариум AquaDT — проект 14' },
      { src: 'img/gallery/15.jpg', alt: 'Аквариум AquaDT — проект 15' },
      { src: 'img/gallery/16.jpg', alt: 'Аквариум AquaDT — проект 16' },
      { src: 'img/gallery/17.jpg', alt: 'Аквариум AquaDT — проект 17' },
      { src: 'img/gallery/18.jpg', alt: 'Аквариум AquaDT — проект 18' }
    ]
  };

  var galleryModal = document.getElementById('gallery-modal');
  var galleryTrack = document.getElementById('gallery-track');
  var galleryViewport = document.getElementById('gallery-viewport');
  var galleryPrev = document.getElementById('gallery-prev');
  var galleryNext = document.getElementById('gallery-next');
  var galleryCounter = document.getElementById('gallery-counter');
  var galleryTriggers = document.querySelectorAll('[data-gallery-set]');
  var currentGallerySet = 'projects';
  var builtGallerySet = null;
  var galleryIndex = 0;
  var galleryTouchStartX = 0;
  var galleryTouchDeltaX = 0;

  if (galleryModal && galleryTrack && galleryViewport && galleryTriggers.length) {
    function getGalleryImages() {
      return gallerySets[currentGallerySet] || [];
    }

    function buildGalleryTrack(setName) {
      var images = gallerySets[setName];
      if (!images) return;

      galleryTrack.innerHTML = '';
      images.forEach(function (item) {
        var slide = document.createElement('div');
        slide.className = 'gallery-modal__slide';
        var img = document.createElement('img');
        img.src = item.src;
        img.alt = item.alt;
        img.loading = 'lazy';
        slide.appendChild(img);
        galleryTrack.appendChild(slide);
      });

      builtGallerySet = setName;
    }

    function updateGallery() {
      var images = getGalleryImages();
      galleryTrack.style.transform = 'translateX(' + (-galleryIndex * 100) + '%)';
      if (galleryCounter) {
        galleryCounter.textContent = (galleryIndex + 1) + ' / ' + images.length;
      }
      if (galleryPrev) galleryPrev.disabled = galleryIndex === 0;
      if (galleryNext) galleryNext.disabled = galleryIndex >= images.length - 1;
    }

    function openGallery(setName, index) {
      if (!gallerySets[setName]) return;

      currentGallerySet = setName;
      if (builtGallerySet !== setName) {
        buildGalleryTrack(setName);
      }

      var images = getGalleryImages();
      galleryIndex = Math.max(0, Math.min(index, images.length - 1));
      updateGallery();
      galleryModal.hidden = false;
      document.body.style.overflow = 'hidden';
    }

    function closeGallery() {
      galleryModal.hidden = true;
      document.body.style.overflow = '';
    }

    function goGallery(delta) {
      var images = getGalleryImages();
      galleryIndex = Math.max(0, Math.min(galleryIndex + delta, images.length - 1));
      updateGallery();
    }

    galleryTriggers.forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        openGallery(trigger.dataset.gallerySet, Number(trigger.dataset.galleryIndex));
      });
    });

    galleryModal.querySelectorAll('[data-gallery-close]').forEach(function (el) {
      el.addEventListener('click', closeGallery);
    });

    if (galleryPrev) {
      galleryPrev.addEventListener('click', function () {
        goGallery(-1);
      });
    }

    if (galleryNext) {
      galleryNext.addEventListener('click', function () {
        goGallery(1);
      });
    }

    galleryViewport.addEventListener('touchstart', function (event) {
      if (!event.changedTouches.length) return;
      galleryTouchStartX = event.changedTouches[0].clientX;
      galleryTouchDeltaX = 0;
    }, { passive: true });

    galleryViewport.addEventListener('touchmove', function (event) {
      if (!event.changedTouches.length) return;
      galleryTouchDeltaX = event.changedTouches[0].clientX - galleryTouchStartX;
    }, { passive: true });

    galleryViewport.addEventListener('touchend', function () {
      if (Math.abs(galleryTouchDeltaX) < 40) return;
      if (galleryTouchDeltaX < 0) {
        goGallery(1);
      } else {
        goGallery(-1);
      }
      galleryTouchDeltaX = 0;
    });

    document.addEventListener('keydown', function (event) {
      if (galleryModal.hidden) return;
      if (event.key === 'Escape') closeGallery();
      if (event.key === 'ArrowLeft') goGallery(-1);
      if (event.key === 'ArrowRight') goGallery(1);
    });
  }

  var requestForm = document.getElementById('request-form');
  var requestPhone = document.getElementById('request-phone');
  var requestModal = document.getElementById('request-modal');
  var requestModalForm = document.getElementById('request-modal-form');
  var requestModalPhone = document.getElementById('request-modal-phone');
  var requestModalName = document.getElementById('request-modal-name');
  var requestToast = document.getElementById('request-toast');
  var requestToastClose = document.getElementById('request-toast-close');
  var requestToastTimer;
  var phonePrefix = '+375 (';

  function extractPhoneDigits(value) {
    var digits = value.replace(/\D/g, '');
    if (digits.indexOf('375') === 0) {
      return digits.slice(3, 12);
    }
    return digits.slice(0, 9);
  }

  function formatPhoneValue(digits) {
    if (!digits.length) return '';

    var formatted = phonePrefix + digits.slice(0, 2);
    if (digits.length <= 2) return formatted;

    formatted += ') ' + digits.slice(2, 5);
    if (digits.length <= 5) return formatted;

    formatted += '-' + digits.slice(5, 7);
    if (digits.length <= 7) return formatted;

    return formatted + '-' + digits.slice(7, 9);
  }

  function initPhoneMask(phoneInput) {
    if (!phoneInput) return;

    function applyPhoneMask() {
      phoneInput.value = formatPhoneValue(extractPhoneDigits(phoneInput.value));
    }

    function validatePhone() {
      var digits = extractPhoneDigits(phoneInput.value);
      if (!digits.length) {
        phoneInput.setCustomValidity('');
        return;
      }
      if (digits.length < 9) {
        phoneInput.setCustomValidity('Введите номер телефона полностью');
        return;
      }
      phoneInput.setCustomValidity('');
    }

    phoneInput.addEventListener('focus', function () {
      if (!phoneInput.value) {
        phoneInput.value = phonePrefix;
      }
    });

    phoneInput.addEventListener('input', function () {
      applyPhoneMask();
      validatePhone();
    });

    phoneInput.addEventListener('blur', function () {
      if (!extractPhoneDigits(phoneInput.value).length) {
        phoneInput.value = '';
      }
      validatePhone();
    });

    phoneInput.addEventListener('keydown', function (event) {
      if (event.key !== 'Backspace') return;
      if (extractPhoneDigits(phoneInput.value).length === 0) {
        phoneInput.value = '';
      }
    });
  }

  initPhoneMask(requestPhone);
  initPhoneMask(requestModalPhone);

  function hideRequestToast() {
    if (!requestToast) return;
    requestToast.classList.remove('request-toast--visible');
    window.setTimeout(function () {
      requestToast.hidden = true;
    }, 350);
  }

  function showRequestToast() {
    if (!requestToast) return;
    window.clearTimeout(requestToastTimer);
    requestToast.hidden = false;
    window.requestAnimationFrame(function () {
      requestToast.classList.add('request-toast--visible');
    });
    requestToastTimer = window.setTimeout(hideRequestToast, 6000);
  }

  if (requestForm && requestToast) {
    requestForm.addEventListener('submit', function (event) {
      event.preventDefault();

      if (!requestForm.reportValidity()) return;

      requestForm.reset();
      showRequestToast();
    });
  }

  function openRequestModal() {
    if (!requestModal) return;

    closeMenu();
    requestModal.hidden = false;
    document.body.style.overflow = 'hidden';

    window.requestAnimationFrame(function () {
      if (requestModalName) {
        requestModalName.focus();
      }
    });
  }

  function closeRequestModal() {
    if (!requestModal) return;

    requestModal.hidden = true;

    if (galleryModal && !galleryModal.hidden) return;
    document.body.style.overflow = '';
  }

  if (requestModal) {
    document.querySelectorAll('a.btn[href="#request"]').forEach(function (trigger) {
      trigger.addEventListener('click', function (event) {
        event.preventDefault();
        openRequestModal();
      });
    });

    requestModal.querySelectorAll('[data-request-close]').forEach(function (el) {
      el.addEventListener('click', closeRequestModal);
    });
  }

  if (requestModalForm && requestToast) {
    requestModalForm.addEventListener('submit', function (event) {
      event.preventDefault();

      if (!requestModalForm.reportValidity()) return;

      requestModalForm.reset();
      closeRequestModal();
      showRequestToast();
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    if (requestModal && !requestModal.hidden) {
      closeRequestModal();
    }
  });

  if (requestToastClose) {
    requestToastClose.addEventListener('click', hideRequestToast);
  }

  var faqRoot = document.getElementById('why-us-faq');

  if (faqRoot) {
    var faqItems = faqRoot.querySelectorAll('.why-us__item');

    faqItems.forEach(function (item) {
      var question = item.querySelector('.why-us__question');
      if (!question) return;

      question.addEventListener('click', function () {
        var isOpen = item.classList.contains('why-us__item--open');

        faqItems.forEach(function (other) {
          other.classList.remove('why-us__item--open');
          var otherQuestion = other.querySelector('.why-us__question');
          if (otherQuestion) {
            otherQuestion.setAttribute('aria-expanded', 'false');
          }
        });

        if (!isOpen) {
          item.classList.add('why-us__item--open');
          question.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  var revealSelectors = [
    '.hero__feature',
    '.services__header',
    '.services__item',
    '.custom-order__content',
    '.custom-order__image',
    '.species__header',
    '.species__slider',
    '.decoration-styles__header',
    '.decoration-styles__layout',
    '.forwho__header',
    '.forwho__card',
    '.maintenance__content',
    '.maintenance__services-wrap',
    '.works-gallery__header',
    '.works-gallery__item',
    '.works-gallery__cta',
    '.work-stages__header',
    '.work-stages__step',
    '.why-us__intro',
    '.why-us__faq',
    '.promo-split__panel',
    '.request__intro',
    '.request__panel',
    '.footer__brand',
    '.footer__nav',
    '.footer__bottom'
  ];

  var revealElements = document.querySelectorAll(revealSelectors.join(', '));

  if (revealElements.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var staggerGroups = [
      { parent: '.hero__features', child: '.hero__feature' },
      { parent: '.services__grid', child: '.services__item' },
      { parent: '.forwho__grid', child: '.forwho__card' },
      { parent: '.works-gallery__grid', child: '.works-gallery__item' },
      { parent: '.work-stages__timeline', child: '.work-stages__step' }
    ];

    revealElements.forEach(function (el) {
      el.classList.add('reveal');
    });

    staggerGroups.forEach(function (group) {
      var parent = document.querySelector(group.parent);
      if (!parent) return;

      parent.querySelectorAll(group.child).forEach(function (child, index) {
        child.style.setProperty('--reveal-delay', (index * 70) + 'ms');
      });
    });

    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('reveal--visible');
        revealObserver.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  }
})();
