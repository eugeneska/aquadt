<?php

function site_asset_version()
{
    return '20260918b';
}

function site_head(array $opts)
{
    $title = $opts['title'];
    $description = $opts['description'];
    $canonical = $opts['canonical'];
    $v = site_asset_version();
    ?>
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo htmlspecialchars($title, ENT_QUOTES, 'UTF-8'); ?></title>
  <meta name="description" content="<?php echo htmlspecialchars($description, ENT_QUOTES, 'UTF-8'); ?>">
  <link rel="canonical" href="<?php echo htmlspecialchars($canonical, ENT_QUOTES, 'UTF-8'); ?>">
  <meta property="og:type" content="website">
  <meta property="og:title" content="<?php echo htmlspecialchars($title, ENT_QUOTES, 'UTF-8'); ?>">
  <meta property="og:description" content="<?php echo htmlspecialchars($description, ENT_QUOTES, 'UTF-8'); ?>">
  <meta property="og:url" content="<?php echo htmlspecialchars($canonical, ENT_QUOTES, 'UTF-8'); ?>">
  <meta property="og:image" content="https://aquadt.by/img/newback.jpg">
  <meta property="og:site_name" content="Aqua Design Technology">
  <meta property="og:locale" content="ru_RU">
  <link rel="icon" href="/img/favicon.png" type="image/png">
  <link rel="preload" as="font" type="font/woff2" href="/fonts/manrope-cyrillic.woff2" crossorigin>
  <link rel="preload" as="font" type="font/woff2" href="/fonts/cormorant-cyrillic.woff2" crossorigin>
  <link rel="preload" href="/styles.css?v=<?php echo $v; ?>" as="style">
  <link rel="stylesheet" href="/styles.css?v=<?php echo $v; ?>">
  <script type="application/ld+json">
<?php echo json_encode(site_local_business_schema(), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT); ?>
  </script>
<?php if (!empty($opts['faq'])) : ?>
  <script type="application/ld+json">
<?php echo json_encode(site_faq_schema($opts['faq']), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT); ?>
  </script>
<?php endif; ?>
  <script type="text/javascript">
    window.dataLayer = window.dataLayer || [];
    (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=112425138', 'ym');
    ym(112425138, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
  </script>
  <noscript><div><img src="https://mc.yandex.ru/watch/112425138" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
</head>
    <?php
}

function site_local_business_schema()
{
    return [
        '@context' => 'https://schema.org',
        '@type' => 'LocalBusiness',
        'name' => 'Aqua Design Technology',
        'alternateName' => 'AquaDT',
        'url' => 'https://aquadt.by/',
        'telephone' => '+375293748726',
        'image' => 'https://aquadt.by/img/newlogo.png',
        'address' => [
            '@type' => 'PostalAddress',
            'addressLocality' => 'Минск',
            'addressCountry' => 'BY',
        ],
        'areaServed' => [
            ['@type' => 'City', 'name' => 'Минск'],
            ['@type' => 'Country', 'name' => 'Беларусь'],
        ],
    ];
}

function site_faq_schema(array $faq)
{
    $entities = [];
    foreach ($faq as $item) {
        $entities[] = [
            '@type' => 'Question',
            'name' => $item['q'],
            'acceptedAnswer' => [
                '@type' => 'Answer',
                'text' => $item['a'],
            ],
        ];
    }

    return [
        '@context' => 'https://schema.org',
        '@type' => 'FAQPage',
        'mainEntity' => $entities,
    ];
}

function site_header()
{
    ?>
<body class="inner-page">
  <header class="header" id="header">
    <div class="container header__inner">
      <a href="/" class="header__logo">
        <picture>
          <source type="image/webp" srcset="/img/newlogo.webp">
          <img src="/img/newlogo.png" alt="Aqua Design Technology" class="header__logo-img" width="160" height="60">
        </picture>
      </a>

      <nav class="header__nav" id="nav">
        <ul class="header__menu">
          <li><a href="/#aquariums" class="header__link">Аквариумы</a></li>
          <li><a href="/#styles" class="header__link">Стили</a></li>
          <li><a href="/service" class="header__link">Обслуживание</a></li>
          <li><a href="/#stages" class="header__link">Этапы работы</a></li>
        </ul>
        <div class="header__nav-cta">
          <a href="tel:+375293748726" class="header__call header__call--nav">
            <span class="header__call-label">Позвонить</span>
            <span class="header__call-number">+375 (29) 374-87-26</span>
          </a>
          <a href="#request" class="btn btn--primary btn--lg">Рассчитать стоимость</a>
        </div>
      </nav>

      <div class="header__actions header__actions--desktop">
        <div class="header__icons">
          <a href="https://www.instagram.com/1aquadt.by" target="_blank" rel="noopener noreferrer" class="header__icon-link" aria-label="Instagram">
            <img src="/img/inst.svg" alt="" width="24" height="24" aria-hidden="true">
          </a>
          <a href="https://t.me/aquadt" target="_blank" rel="noopener noreferrer" class="header__icon-link" aria-label="Telegram">
            <img src="/img/tg.svg" alt="" width="24" height="24" aria-hidden="true">
          </a>
          <a href="https://api.whatsapp.com/send?phone=375296565242" target="_blank" rel="noopener noreferrer" class="header__icon-link" aria-label="WhatsApp">
            <img src="/img/wa.svg" alt="" width="24" height="24" aria-hidden="true">
          </a>
        </div>
        <a href="tel:+375293748726" class="header__call">
          <span class="header__call-label">Позвонить</span>
          <span class="header__call-number">+375 (29) 374-87-26</span>
        </a>
      </div>

      <a href="tel:+375293748726" class="header__bar-phone">+375&nbsp;(29)&nbsp;374-87-26</a>

      <button class="header__burger" id="burger" aria-label="Открыть меню" aria-expanded="false">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>
    <?php
}

function site_footer()
{
    $v = site_asset_version();
    ?>
  <footer class="footer">
    <div class="container">
      <div class="footer__grid">
        <div class="footer__brand">
          <a href="/" class="footer__logo">
            <img src="/img/logo.svg" alt="Aqua Design Technology" class="footer__logo-img" width="160" height="40">
          </a>
          <p class="footer__desc">Проектируем, изготавливаем, оформляем, устанавливаем и&nbsp;обслуживаем аквариумы для квартир, домов, офисов и&nbsp;коммерческих пространств.</p>
          <a href="tel:+375293748726" class="footer__phone">
            <img src="/img/phone.svg" alt="" class="footer__phone-icon" width="24" height="24" aria-hidden="true">
            +375 (29) 374-87-26
          </a>
        </div>
        <nav class="footer__nav" aria-label="Навигация">
          <p class="footer__nav-title">Навигация</p>
          <ul class="footer__menu">
            <li><a href="/#aquariums" class="footer__link">Аквариумы</a></li>
            <li><a href="/service" class="footer__link">Обслуживание</a></li>
            <li><a href="/stabilized-moss" class="footer__link">Стабилизированный мох</a></li>
            <li><a href="/#request" class="footer__link">Заявка</a></li>
          </ul>
        </nav>
      </div>
      <div class="footer__bottom">
        <p class="footer__legal">УНП&nbsp;193451285 от&nbsp;30.07.2020</p>
        <p class="footer__copy">© Aqua Design Technology, Беларусь, Минск</p>
      </div>
    </div>
  </footer>

  <button type="button" class="phone-fab" id="phone-fab" aria-label="Связаться с нами">
    <svg class="phone-fab__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5.5 4.5H8.5L10 9.5L7.5 11C8.571 13.6715 10.3285 15.429 13 16.5L14.5 14L19.5 15.5V18.5C19.5 19.0523 19.0523 19.5 18.5 19.5C10.0736 19.5 3.5 12.9264 3.5 4.5C3.5 3.94772 3.94772 3.5 4.5 3.5H5.5V4.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>

  <script src="/script.js?v=<?php echo $v; ?>" defer></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    function loadAnalytics() {
      if (window.__analyticsLoaded) return;
      window.__analyticsLoaded = true;
      var ga = document.createElement('script');
      ga.async = true;
      ga.src = 'https://www.googletagmanager.com/gtag/js?id=G-7N2G4D6KNZ';
      ga.onload = function () {
        gtag('js', new Date());
        gtag('config', 'G-7N2G4D6KNZ');
      };
      document.head.appendChild(ga);
    }
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadAnalytics, { timeout: 4000 });
    } else {
      window.addEventListener('load', function () {
        setTimeout(loadAnalytics, 1200);
      });
    }
  </script>
</body>
</html>
    <?php
}

function site_request_section($interestDefault = '')
{
    ?>
  <section class="request" id="request">
    <div class="container">
      <div class="request__layout">
        <div class="request__intro">
          <h2 class="request__title">Оставьте заявку</h2>
          <p class="request__subtitle">Расскажите кратко о&nbsp;задаче&nbsp;— мы свяжемся с&nbsp;вами и&nbsp;подберём решение.</p>
        </div>
        <div class="request__panel">
          <form class="request__form" id="request-form" novalidate>
            <div class="request__field">
              <label class="request__label" for="request-name">Имя</label>
              <input class="request__input" type="text" id="request-name" name="name" autocomplete="name" required placeholder="Как к вам обращаться">
            </div>
            <div class="request__row">
              <div class="request__field">
                <label class="request__label" for="request-phone">Телефон</label>
                <input class="request__input" type="tel" id="request-phone" name="phone" autocomplete="tel" inputmode="tel" required placeholder="+375 (__) ___-__-__" maxlength="19">
              </div>
              <div class="request__field">
                <label class="request__label" for="request-city">Город</label>
                <input class="request__input" type="text" id="request-city" name="city" autocomplete="address-level2" required placeholder="Минск">
              </div>
            </div>
            <div class="request__field">
              <label class="request__label" for="request-interest">Тип интереса</label>
              <select class="request__input request__select" id="request-interest" name="interest" required>
                <option value="" disabled<?php echo $interestDefault === '' ? ' selected' : ''; ?>>Выберите вариант</option>
                <option value="aquarium"<?php echo $interestDefault === 'aquarium' ? ' selected' : ''; ?>>Аквариум под заказ</option>
                <option value="service"<?php echo $interestDefault === 'service' ? ' selected' : ''; ?>>Обслуживание</option>
                <option value="moss"<?php echo $interestDefault === 'moss' ? ' selected' : ''; ?>>Декор из стабилизированного мха</option>
                <option value="redesign"<?php echo $interestDefault === 'redesign' ? ' selected' : ''; ?>>Переоформление</option>
                <option value="repair"<?php echo $interestDefault === 'repair' ? ' selected' : ''; ?>>Ремонт</option>
                <option value="consultation"<?php echo $interestDefault === 'consultation' ? ' selected' : ''; ?>>Консультация</option>
              </select>
            </div>
            <div class="request__field">
              <label class="request__label" for="request-comment">Комментарий</label>
              <textarea class="request__textarea" id="request-comment" name="comment" rows="4" placeholder="Кратко опишите задачу или пожелания"></textarea>
            </div>
            <button type="submit" class="btn btn--primary btn--lg request__submit">Отправить заявку</button>
          </form>
        </div>
      </div>
    </div>
  </section>
  <div class="request-toast" id="request-toast" hidden role="status" aria-live="polite">
    <div class="request-toast__inner">
      <p class="request-toast__text">Спасибо! Мы получили вашу заявку и&nbsp;свяжемся с&nbsp;вами для консультации.</p>
      <button type="button" class="request-toast__close" id="request-toast-close" aria-label="Закрыть сообщение">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
  </div>
    <?php
}

function site_faq_block($title, array $faq)
{
    ?>
  <section class="why-us" id="faq">
    <div class="container">
      <div class="why-us__layout">
        <div class="why-us__intro">
          <p class="why-us__label">Вопросы и ответы</p>
          <h2 class="why-us__title"><?php echo $title; ?></h2>
        </div>
        <div class="why-us__faq" id="why-us-faq">
<?php foreach ($faq as $i => $item) :
    $n = $i + 1;
    $open = $i === 0;
    ?>
          <div class="why-us__item<?php echo $open ? ' why-us__item--open' : ''; ?>">
            <button type="button" class="why-us__question" id="why-us-q-<?php echo $n; ?>" aria-expanded="<?php echo $open ? 'true' : 'false'; ?>" aria-controls="why-us-a-<?php echo $n; ?>">
              <span class="why-us__question-text"><?php echo htmlspecialchars($item['q'], ENT_QUOTES, 'UTF-8'); ?></span>
              <span class="why-us__icon" aria-hidden="true"></span>
            </button>
            <div class="why-us__answer" id="why-us-a-<?php echo $n; ?>" role="region" aria-labelledby="why-us-q-<?php echo $n; ?>">
              <div class="why-us__answer-inner">
                <p><?php echo $item['html']; ?></p>
              </div>
            </div>
          </div>
<?php endforeach; ?>
        </div>
      </div>
    </div>
  </section>
    <?php
}
