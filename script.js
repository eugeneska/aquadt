(function () {
  const header = document.getElementById('header');
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  var hero = document.getElementById('hero');
  var heroPin = document.querySelector('.hero-pin');
  var heroInner = hero ? hero.querySelector('.hero__inner') : null;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  var heroMobileBreakpoint = window.matchMedia('(max-width: 960px), (hover: none) and (pointer: coarse)');
  var navMobileBreakpoint = window.matchMedia('(max-width: 960px)');

  function updateHeroParallax() {
    if (!hero || !heroPin) return;

    if (reduceMotion.matches || heroMobileBreakpoint.matches) {
      hero.classList.remove('hero--released');
      if (heroInner) {
        heroInner.style.opacity = '';
      }
      return;
    }

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
    updateStylesScrollPin();
  }

  function updateNavInert() {
    if (!navMobileBreakpoint.matches) {
      nav.removeAttribute('inert');
      return;
    }

    if (!nav.classList.contains('header__nav--open')) {
      nav.setAttribute('inert', '');
    }
  }

  function closeMenu() {
    burger.classList.remove('header__burger--active');
    nav.classList.remove('header__nav--open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    updateNavInert();
  }

  function openMenu() {
    burger.classList.add('header__burger--active');
    nav.classList.add('header__nav--open');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    nav.removeAttribute('inert');
  }

  updateNavInert();
  navMobileBreakpoint.addEventListener('change', updateNavInert);

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
  heroMobileBreakpoint.addEventListener('change', updateHeroParallax);
  onScroll();

  var styleData = [
    {
      title: 'Псевдоморе',
      image: 'img/styles/1.webp',
      width: 1486,
      height: 618,
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
      image: 'img/styles/2.webp',
      width: 1120,
      height: 840,
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
      image: 'img/styles/3.webp',
      width: 826,
      height: 400,
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
      image: 'img/styles/4.webp',
      width: 826,
      height: 400,
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
      image: 'img/styles/5.webp',
      width: 826,
      height: 400,
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
  var styleMobileList = document.getElementById('style-mobile-list');
  var stylesPin = document.getElementById('styles-pin');
  var currentStyleIndex = 0;
  var stylesPinBreakpoint = window.matchMedia('(min-width: 961px)');
  var setActiveStyle = function () {};

  function buildStyleMobileList() {
    if (!styleMobileList) return;

    styleMobileList.innerHTML = '';

    styleData.forEach(function (data) {
      var card = document.createElement('article');
      card.className = 'decoration-styles__card';

      var imageWrap = document.createElement('div');
      imageWrap.className = 'decoration-styles__image-wrap';

      var image = document.createElement('img');
      image.className = 'decoration-styles__image';
      image.src = data.image;
      image.alt = data.title;
      image.loading = 'lazy';
      image.width = data.width;
      image.height = data.height;
      image.decoding = 'async';
      imageWrap.appendChild(image);

      var content = document.createElement('div');
      content.className = 'decoration-styles__content';

      var title = document.createElement('h3');
      title.className = 'decoration-styles__panel-title';
      title.textContent = data.title;

      var desc = document.createElement('p');
      desc.className = 'decoration-styles__desc';
      desc.textContent = data.desc;

      var featuresTitle = document.createElement('p');
      featuresTitle.className = 'decoration-styles__features-title';
      featuresTitle.textContent = 'Визуальные характеристики';

      var features = document.createElement('ul');
      features.className = 'decoration-styles__features';
      data.features.forEach(function (feature) {
        var li = document.createElement('li');
        li.textContent = feature;
        features.appendChild(li);
      });

      var cta = document.createElement('a');
      cta.href = 'https://www.instagram.com/1aquadt.by';
      cta.target = '_blank';
      cta.rel = 'noopener noreferrer';
      cta.className = 'btn btn--outline btn--lg decoration-styles__cta';

      var ctaIcon = document.createElement('img');
      ctaIcon.src = 'img/inst.svg';
      ctaIcon.alt = '';
      ctaIcon.className = 'btn__icon';
      ctaIcon.width = 22;
      ctaIcon.height = 22;
      ctaIcon.setAttribute('aria-hidden', 'true');
      cta.appendChild(ctaIcon);
      cta.appendChild(document.createTextNode('Посмотреть примеры работ в Instagram'));

      content.appendChild(title);
      content.appendChild(desc);
      content.appendChild(featuresTitle);
      content.appendChild(features);
      content.appendChild(cta);

      card.appendChild(imageWrap);
      card.appendChild(content);
      styleMobileList.appendChild(card);
    });
  }

  function isStylesPinActive() {
    return Boolean(stylesPin && stylesPinBreakpoint.matches && !reduceMotion.matches);
  }

  function getStylesSection() {
    return stylesPin ? stylesPin.querySelector('.decoration-styles') : null;
  }

  function measureStylesSectionHeight() {
    var section = getStylesSection();
    if (!section) return window.innerHeight;
    return Math.max(section.offsetHeight, window.innerHeight);
  }

  function getStylesScrollRange() {
    if (!stylesPin) return 0;

    var sectionHeight = measureStylesSectionHeight();
    return Math.max(0, stylesPin.offsetHeight - sectionHeight);
  }

  function updateStylesPinHeight() {
    if (!stylesPin) return;

    if (isStylesPinActive()) {
      var sectionHeight = measureStylesSectionHeight();
      var step = window.innerHeight;
      var pinHeight = sectionHeight + Math.max(0, styleData.length - 1) * step;

      stylesPin.style.height = pinHeight + 'px';
      stylesPin.style.setProperty('--styles-count', String(styleData.length));
    } else {
      stylesPin.style.height = '';
      stylesPin.style.removeProperty('--styles-count');
    }
  }

  function getStyleIndexFromScroll() {
    if (!stylesPin) return 0;

    var rect = stylesPin.getBoundingClientRect();
    var scrollRange = getStylesScrollRange();

    if (scrollRange <= 0) return 0;

    var scrolled = -rect.top;
    var progress = Math.min(Math.max(scrolled / scrollRange, 0), 1);

    if (styleData.length <= 1) return 0;

    return Math.min(
      styleData.length - 1,
      Math.round(progress * (styleData.length - 1))
    );
  }

  function updateStylesScrollPin() {
    if (!isStylesPinActive()) return;
    setActiveStyle(getStyleIndexFromScroll(), { animate: true });
  }

  function scrollToStyleIndex(index) {
    if (!stylesPin || !isStylesPinActive()) {
      setActiveStyle(index);
      return;
    }

    var scrollRange = getStylesScrollRange();
    var progress = styleData.length > 1 ? index / (styleData.length - 1) : 0;
    var target = stylesPin.offsetTop + progress * scrollRange;

    window.scrollTo({
      top: target,
      behavior: reduceMotion.matches ? 'auto' : 'smooth'
    });
  }

  if (styleImage && styleDesc && styleFeatures && (styleTabs.length || styleSelect)) {
    buildStyleMobileList();

    if (styleSelect) {
      styleData.forEach(function (data, i) {
        var option = document.createElement('option');
        option.value = String(i);
        option.textContent = data.title;
        styleSelect.appendChild(option);
      });
    }

    setActiveStyle = function (index, options) {
      options = options || {};
      var data = styleData[index];
      if (!data) return;

      if (index === currentStyleIndex && !options.force) return;
      currentStyleIndex = index;

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
        if (data.width && data.height) {
          styleImage.setAttribute('width', String(data.width));
          styleImage.setAttribute('height', String(data.height));
        }
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

        updateStylesPinHeight();
      }, 150);
    }

    styleTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var index = Number(tab.dataset.index);
        if (isStylesPinActive()) {
          scrollToStyleIndex(index);
        } else {
          setActiveStyle(index);
        }
      });
    });

    if (styleSelect) {
      styleSelect.addEventListener('change', function () {
        setActiveStyle(Number(styleSelect.value));
      });
    }

    updateStylesPinHeight();
    updateStylesScrollPin();

    var stylesSection = getStylesSection();
    if (stylesSection && 'ResizeObserver' in window) {
      var stylesResizeObserver = new ResizeObserver(function () {
        updateStylesPinHeight();
      });
      stylesResizeObserver.observe(stylesSection);
    }

    stylesPinBreakpoint.addEventListener('change', function () {
      updateStylesPinHeight();
      updateStylesScrollPin();
    });

    window.addEventListener('resize', updateStylesPinHeight, { passive: true });
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
      { src: 'img/projects/1.webp', alt: 'Проект AquaDT 1' },
      { src: 'img/projects/2.webp', alt: 'Проект AquaDT 2' },
      { src: 'img/projects/3.webp', alt: 'Проект AquaDT 3' },
      { src: 'img/projects/4.webp', alt: 'Проект AquaDT 4' },
      { src: 'img/projects/5.webp', alt: 'Проект AquaDT 5' },
      { src: 'img/projects/6.webp', alt: 'Проект AquaDT 6' },
      { src: 'img/projects/7.webp', alt: 'Проект AquaDT 7' },
      { src: 'img/projects/8.webp', alt: 'Проект AquaDT 8' }
    ],
    works: [
      { src: 'img/gallery/1.webp', alt: 'Аквариум AquaDT — проект 1' },
      { src: 'img/gallery/2.webp', alt: 'Аквариум AquaDT — проект 2' },
      { src: 'img/gallery/3.webp', alt: 'Аквариум AquaDT — проект 3' },
      { src: 'img/gallery/4.webp', alt: 'Аквариум AquaDT — проект 4' },
      { src: 'img/gallery/5.webp', alt: 'Аквариум AquaDT — проект 5' },
      { src: 'img/gallery/6.webp', alt: 'Аквариум AquaDT — проект 6' },
      { src: 'img/gallery/7.webp', alt: 'Аквариум AquaDT — проект 7' },
      { src: 'img/gallery/8.webp', alt: 'Аквариум AquaDT — проект 8' },
      { src: 'img/gallery/9.webp', alt: 'Аквариум AquaDT — проект 9' },
      { src: 'img/gallery/10.webp', alt: 'Аквариум AquaDT — проект 10' },
      { src: 'img/gallery/11.webp', alt: 'Аквариум AquaDT — проект 11' },
      { src: 'img/gallery/12.webp', alt: 'Аквариум AquaDT — проект 12' },
      { src: 'img/gallery/13.webp', alt: 'Аквариум AquaDT — проект 13' },
      { src: 'img/gallery/14.webp', alt: 'Аквариум AquaDT — проект 14' },
      { src: 'img/gallery/15.webp', alt: 'Аквариум AquaDT — проект 15' },
      { src: 'img/gallery/16.webp', alt: 'Аквариум AquaDT — проект 16' },
      { src: 'img/gallery/17.webp', alt: 'Аквариум AquaDT — проект 17' },
      { src: 'img/gallery/18.webp', alt: 'Аквариум AquaDT — проект 18' },
      { src: 'img/gallery/19.webp', alt: 'Аквариум AquaDT — проект 19' },
      { src: 'img/gallery/20.webp', alt: 'Аквариум AquaDT — проект 20' },
      { src: 'img/gallery/21.webp', alt: 'Аквариум AquaDT — проект 21' },
      { src: 'img/gallery/22.webp', alt: 'Аквариум AquaDT — проект 22' },
      { src: 'img/gallery/23.webp', alt: 'Аквариум AquaDT — проект 23' },
      { src: 'img/gallery/24.webp', alt: 'Аквариум AquaDT — проект 24' },
      { src: 'img/gallery/25.webp', alt: 'Аквариум AquaDT — проект 25' },
      { src: 'img/gallery/26.webp', alt: 'Аквариум AquaDT — проект 26' },
      { src: 'img/gallery/27.webp', alt: 'Аквариум AquaDT — проект 27' },
      { src: 'img/gallery/28.webp', alt: 'Аквариум AquaDT — проект 28' },
      { src: 'img/gallery/29.webp', alt: 'Аквариум AquaDT — проект 29' },
      { src: 'img/gallery/30.webp', alt: 'Аквариум AquaDT — проект 30' },
      { src: 'img/gallery/31.webp', alt: 'Аквариум AquaDT — проект 31' },
      { src: 'img/gallery/32.webp', alt: 'Аквариум AquaDT — проект 32' },
      { src: 'img/gallery/33.webp', alt: 'Аквариум AquaDT — проект 33' },
    ]
  };

  var galleryModal = document.getElementById('gallery-modal');
  var galleryTrack = document.getElementById('gallery-track');
  var galleryViewport = document.getElementById('gallery-viewport');
  var galleryPrev = document.getElementById('gallery-prev');
  var galleryNext = document.getElementById('gallery-next');
  var galleryCounter = document.getElementById('gallery-counter');
  var currentGallerySet = 'projects';
  var builtGallerySet = null;
  var galleryIndex = 0;
  var galleryTouchStartX = 0;
  var galleryTouchDeltaX = 0;

  var worksCoverflow = document.getElementById('works-coverflow');
  var worksCoverflowTrack = document.getElementById('works-coverflow-track');
  var worksCoverflowViewport = document.getElementById('works-coverflow-viewport');
  var worksCoverflowPrev = document.getElementById('works-coverflow-prev');
  var worksCoverflowNext = document.getElementById('works-coverflow-next');

  if (worksCoverflow && worksCoverflowTrack && gallerySets.works) {
    var worksCoverflowIndex = 0;
    var worksCoverflowSlides = [];
    var worksCoverflowTouchStartX = 0;
    var worksCoverflowTouchDeltaX = 0;
    var worksCoverflowScales = [1, 0.8, 0.66, 0.54];
    var worksCoverflowOpacities = [1, 0.78, 0.55, 0.38];

    function getWorksCoverflowVisibleRange() {
      return window.innerWidth < 768 ? 1 : 3;
    }

    function getWorksCoverflowSlideStyle(offset) {
      var distance = Math.abs(offset);
      var range = getWorksCoverflowVisibleRange();
      var scaleIndex = Math.min(distance, worksCoverflowScales.length - 1);

      if (distance > range) {
        return { hidden: true };
      }

      return {
        hidden: false,
        offset: offset,
        scale: worksCoverflowScales[scaleIndex],
        opacity: worksCoverflowOpacities[scaleIndex],
        z: 10 - distance
      };
    }

    function buildWorksCoverflow() {
      worksCoverflowTrack.innerHTML = '';
      worksCoverflowSlides = [];

      gallerySets.works.forEach(function (item, index) {
        var slide = document.createElement('button');
        slide.type = 'button';
        slide.className = 'works-gallery__slide';
        slide.dataset.gallerySet = 'works';
        slide.dataset.galleryIndex = String(index);
        slide.setAttribute('aria-label', 'Фото ' + (index + 1) + ' из ' + gallerySets.works.length);

        var img = document.createElement('img');
        img.src = item.src;
        img.alt = item.alt;
        img.loading = index < 7 ? 'eager' : 'lazy';
        img.decoding = 'async';
        img.width = 800;
        img.height = 600;
        slide.appendChild(img);

        slide.addEventListener('click', function (event) {
          if (index !== worksCoverflowIndex) {
            event.stopImmediatePropagation();
            goWorksCoverflow(index);
          }
        });

        worksCoverflowTrack.appendChild(slide);
        worksCoverflowSlides.push(slide);
      });
    }

    function updateWorksCoverflow() {
      var range = getWorksCoverflowVisibleRange();
      var maxIndex = gallerySets.works.length - 1;

      worksCoverflowSlides.forEach(function (slide, index) {
        var offset = index - worksCoverflowIndex;
        var style = getWorksCoverflowSlideStyle(offset);

        slide.classList.toggle('works-gallery__slide--active', offset === 0);
        slide.classList.toggle('works-gallery__slide--hidden', style.hidden);
        slide.setAttribute('aria-hidden', style.hidden ? 'true' : 'false');
        slide.tabIndex = offset === 0 ? 0 : -1;

        if (style.hidden) {
          slide.style.removeProperty('--slide-offset');
          slide.style.removeProperty('--slide-scale');
          slide.style.removeProperty('--slide-opacity');
          slide.style.removeProperty('--slide-z');
          return;
        }

        slide.style.setProperty('--slide-offset', String(style.offset));
        slide.style.setProperty('--slide-scale', String(style.scale));
        slide.style.setProperty('--slide-opacity', String(style.opacity));
        slide.style.setProperty('--slide-z', String(style.z));
      });

      if (worksCoverflowPrev) {
        worksCoverflowPrev.disabled = worksCoverflowIndex === 0;
      }
      if (worksCoverflowNext) {
        worksCoverflowNext.disabled = worksCoverflowIndex >= maxIndex;
      }
    }

    function goWorksCoverflow(index) {
      worksCoverflowIndex = Math.max(0, Math.min(index, gallerySets.works.length - 1));
      updateWorksCoverflow();
    }

    if (worksCoverflowPrev) {
      worksCoverflowPrev.addEventListener('click', function () {
        goWorksCoverflow(worksCoverflowIndex - 1);
      });
    }

    if (worksCoverflowNext) {
      worksCoverflowNext.addEventListener('click', function () {
        goWorksCoverflow(worksCoverflowIndex + 1);
      });
    }

    if (worksCoverflowViewport) {
      worksCoverflowViewport.addEventListener('touchstart', function (event) {
        if (!event.changedTouches.length) return;
        worksCoverflowTouchStartX = event.changedTouches[0].clientX;
        worksCoverflowTouchDeltaX = 0;
      }, { passive: true });

      worksCoverflowViewport.addEventListener('touchmove', function (event) {
        if (!event.changedTouches.length) return;
        worksCoverflowTouchDeltaX = event.changedTouches[0].clientX - worksCoverflowTouchStartX;
      }, { passive: true });

      worksCoverflowViewport.addEventListener('touchend', function () {
        if (Math.abs(worksCoverflowTouchDeltaX) < 40) return;
        if (worksCoverflowTouchDeltaX < 0) {
          goWorksCoverflow(worksCoverflowIndex + 1);
        } else {
          goWorksCoverflow(worksCoverflowIndex - 1);
        }
        worksCoverflowTouchDeltaX = 0;
      });
    }

    worksCoverflow.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goWorksCoverflow(worksCoverflowIndex - 1);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        goWorksCoverflow(worksCoverflowIndex + 1);
      }
    });

    window.addEventListener('resize', updateWorksCoverflow);

    buildWorksCoverflow();
    updateWorksCoverflow();
  }

  if (galleryModal && galleryTrack && galleryViewport) {
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

    document.addEventListener('click', function (event) {
      var trigger = event.target.closest('[data-gallery-set]');
      if (!trigger) return;
      openGallery(trigger.dataset.gallerySet, Number(trigger.dataset.galleryIndex));
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
  var requestToastText = requestToast ? requestToast.querySelector('.request-toast__text') : null;
  var requestToastClose = document.getElementById('request-toast-close');
  var requestToastTimer;
  var requestEndpoint = 'api/send-request.php';
  var requestSuccessMessage = 'Спасибо! Мы получили вашу заявку и\u00a0свяжемся с\u00a0вами для консультации.';
  var requestErrorMessage = 'Не удалось отправить заявку. Попробуйте позже или позвоните нам.';
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
    requestToast.classList.remove('request-toast--visible', 'request-toast--error');
    window.setTimeout(function () {
      requestToast.hidden = true;
    }, 350);
  }

  function showRequestToast(message, isError) {
    if (!requestToast) return;
    window.clearTimeout(requestToastTimer);

    if (requestToastText) {
      requestToastText.textContent = message || requestSuccessMessage;
    }

    requestToast.classList.toggle('request-toast--error', !!isError);
    requestToast.hidden = false;
    window.requestAnimationFrame(function () {
      requestToast.classList.add('request-toast--visible');
    });
    requestToastTimer = window.setTimeout(hideRequestToast, isError ? 8000 : 6000);
  }

  function getFormFieldValue(form, name) {
    var field = form.elements[name];
    if (!field) return '';
    return typeof field.value === 'string' ? field.value.trim() : '';
  }

  function setFormSubmitting(form, isSubmitting) {
    var submitButton = form.querySelector('[type="submit"]');
    if (!submitButton) return;

    submitButton.disabled = isSubmitting;
    submitButton.setAttribute('aria-busy', isSubmitting ? 'true' : 'false');
  }

  function submitRequestForm(form, source) {
    if (!form.reportValidity()) {
      return Promise.resolve(false);
    }

    var payload = {
      name: getFormFieldValue(form, 'name'),
      phone: getFormFieldValue(form, 'phone'),
      city: getFormFieldValue(form, 'city'),
      interest: getFormFieldValue(form, 'interest'),
      comment: getFormFieldValue(form, 'comment'),
      source: source
    };

    setFormSubmitting(form, true);

    return fetch(requestEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(function (response) {
        return response.json().catch(function () {
          return { ok: false };
        }).then(function (data) {
          if (!response.ok && !data.ok) {
            throw new Error(data.error || requestErrorMessage);
          }
          return data;
        });
      })
      .then(function (data) {
        form.reset();
        showRequestToast(data.warning || requestSuccessMessage, false);
        return true;
      })
      .catch(function () {
        showRequestToast(requestErrorMessage, true);
        return false;
      })
      .finally(function () {
        setFormSubmitting(form, false);
      });
  }

  if (requestForm && requestToast) {
    requestForm.addEventListener('submit', function (event) {
      event.preventDefault();
      submitRequestForm(requestForm, 'page');
    });
  }

  var requestModalAlt = document.getElementById('request-modal-alt');
  var phoneFab = document.getElementById('phone-fab');

  function openRequestModal(showPhoneAlt) {
    if (!requestModal) return;

    closeMenu();
    requestModal.hidden = false;
    document.body.style.overflow = 'hidden';

    if (requestModalAlt) {
      requestModalAlt.hidden = !showPhoneAlt;
    }

    window.requestAnimationFrame(function () {
      if (requestModalName) {
        requestModalName.focus();
      }
    });
  }

  function closeRequestModal() {
    if (!requestModal) return;

    requestModal.hidden = true;

    if (requestModalAlt) {
      requestModalAlt.hidden = true;
    }

    if (galleryModal && !galleryModal.hidden) return;
    document.body.style.overflow = '';
  }

  if (requestModal) {
    document.querySelectorAll('a.btn[href="#request"]').forEach(function (trigger) {
      trigger.addEventListener('click', function (event) {
        event.preventDefault();
        openRequestModal(false);
      });
    });

    requestModal.querySelectorAll('[data-request-close]').forEach(function (el) {
      el.addEventListener('click', closeRequestModal);
    });
  }

  if (phoneFab) {
    phoneFab.addEventListener('click', function () {
      openRequestModal(true);
    });
  }

  if (requestModalForm && requestToast) {
    requestModalForm.addEventListener('submit', function (event) {
      event.preventDefault();

      submitRequestForm(requestModalForm, 'modal').then(function (sent) {
        if (sent) {
          closeRequestModal();
        }
      });
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
