(function () {
  const header = document.getElementById('header');
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  function onScroll() {
    header.classList.toggle('header--scrolled', window.scrollY > 20);
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
  var styleImage = document.getElementById('style-image');
  var styleTitle = document.getElementById('style-title');
  var styleDesc = document.getElementById('style-desc');
  var styleFeatures = document.getElementById('style-features');
  var stylePanel = document.getElementById('style-panel');
  var styleContent = document.querySelector('.decoration-styles__content');

  if (styleTabs.length && styleImage && styleDesc && styleFeatures) {
    function setActiveStyle(index) {
      var data = styleData[index];
      if (!data) return;

      styleTabs.forEach(function (tab, i) {
        var isActive = i === index;
        tab.classList.toggle('decoration-styles__tab--active', isActive);
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

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
  }

  var speciesSlider = document.getElementById('species-slider');
  var speciesTrack = document.getElementById('species-track');
  var speciesDots = document.getElementById('species-dots');

  if (speciesSlider && speciesTrack && speciesDots) {
    var speciesCards = speciesTrack.querySelectorAll('.species__card');
    var speciesPrev = speciesSlider.querySelector('.species__arrow--prev');
    var speciesNext = speciesSlider.querySelector('.species__arrow--next');
    var speciesIndex = 0;

    function getSpeciesPerView() {
      if (window.innerWidth < 600) return 1;
      if (window.innerWidth < 1200) return 2;
      return 3;
    }

    function getSpeciesMaxIndex() {
      return Math.max(0, speciesCards.length - getSpeciesPerView());
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

      var viewport = speciesTrack.parentElement;
      var gap = 24;
      var cardWidth = (viewport.offsetWidth - gap * (perView - 1)) / perView;

      speciesCards.forEach(function (card) {
        card.style.width = cardWidth + 'px';
        card.style.flexBasis = cardWidth + 'px';
      });

      speciesTrack.style.transform = 'translateX(' + (-speciesIndex * (cardWidth + gap)) + 'px)';

      if (speciesPrev) speciesPrev.disabled = speciesIndex === 0;
      if (speciesNext) speciesNext.disabled = speciesIndex >= maxIndex;

      speciesDots.querySelectorAll('.species__dot').forEach(function (dot, i) {
        dot.classList.toggle('species__dot--active', i === speciesIndex);
      });
    }

    function goToSpecies(index) {
      speciesIndex = Math.max(0, Math.min(index, getSpeciesMaxIndex()));
      updateSpeciesSlider();
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

    window.addEventListener('resize', function () {
      buildSpeciesDots();
      updateSpeciesSlider();
    });

    buildSpeciesDots();
    updateSpeciesSlider();
  }

  var projectGalleryImages = [
    { src: 'img/projects/1.jpg', alt: 'Проект AquaDT 1' },
    { src: 'img/projects/2.jpg', alt: 'Проект AquaDT 2' },
    { src: 'img/projects/3.jpg', alt: 'Проект AquaDT 3' },
    { src: 'img/projects/4.jpg', alt: 'Проект AquaDT 4' },
    { src: 'img/projects/5.jpg', alt: 'Проект AquaDT 5' },
    { src: 'img/projects/6.jpg', alt: 'Проект AquaDT 6' },
    { src: 'img/projects/7.jpg', alt: 'Проект AquaDT 7' },
    { src: 'img/projects/8.jpg', alt: 'Проект AquaDT 8' }
  ];

  var galleryModal = document.getElementById('gallery-modal');
  var galleryTrack = document.getElementById('gallery-track');
  var galleryViewport = document.getElementById('gallery-viewport');
  var galleryPrev = document.getElementById('gallery-prev');
  var galleryNext = document.getElementById('gallery-next');
  var galleryCounter = document.getElementById('gallery-counter');
  var galleryPhotos = document.querySelectorAll('.promo-split__photo');
  var galleryIndex = 0;
  var galleryTouchStartX = 0;
  var galleryTouchDeltaX = 0;

  if (galleryModal && galleryTrack && galleryViewport && projectGalleryImages.length) {
    projectGalleryImages.forEach(function (item) {
      var slide = document.createElement('div');
      slide.className = 'gallery-modal__slide';
      var img = document.createElement('img');
      img.src = item.src;
      img.alt = item.alt;
      img.loading = 'lazy';
      slide.appendChild(img);
      galleryTrack.appendChild(slide);
    });

    function updateGallery() {
      galleryTrack.style.transform = 'translateX(' + (-galleryIndex * 100) + '%)';
      if (galleryCounter) {
        galleryCounter.textContent = (galleryIndex + 1) + ' / ' + projectGalleryImages.length;
      }
      if (galleryPrev) galleryPrev.disabled = galleryIndex === 0;
      if (galleryNext) galleryNext.disabled = galleryIndex === projectGalleryImages.length - 1;
    }

    function openGallery(index) {
      galleryIndex = Math.max(0, Math.min(index, projectGalleryImages.length - 1));
      updateGallery();
      galleryModal.hidden = false;
      document.body.style.overflow = 'hidden';
    }

    function closeGallery() {
      galleryModal.hidden = true;
      document.body.style.overflow = '';
    }

    function goGallery(delta) {
      galleryIndex = Math.max(0, Math.min(galleryIndex + delta, projectGalleryImages.length - 1));
      updateGallery();
    }

    galleryPhotos.forEach(function (photo) {
      photo.addEventListener('click', function () {
        openGallery(Number(photo.dataset.index));
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
  var requestToast = document.getElementById('request-toast');
  var requestToastClose = document.getElementById('request-toast-close');
  var requestToastTimer;

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

  if (requestToastClose) {
    requestToastClose.addEventListener('click', hideRequestToast);
  }
})();
