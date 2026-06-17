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
  var styleDesc = document.getElementById('style-desc');
  var styleFeatures = document.getElementById('style-features');
  var stylePanel = document.getElementById('style-panel');

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
      window.setTimeout(function () {
        styleImage.src = data.image;
        styleImage.alt = data.title;
        styleImage.classList.remove('decoration-styles__image--fade');
      }, 150);

      styleDesc.textContent = data.desc;

      styleFeatures.innerHTML = '';
      data.features.forEach(function (feature) {
        var li = document.createElement('li');
        li.textContent = feature;
        styleFeatures.appendChild(li);
      });
    }

    styleTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        setActiveStyle(Number(tab.dataset.index));
      });
    });
  }
})();
