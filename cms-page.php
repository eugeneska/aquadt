<?php

$allowed = [
    'pseudo-sea',
    'sea',
    'nature',
    'form',
    'payment',
    'ponds',
    'thanks',
];

$path = isset($_GET['ws_path']) ? (string) $_GET['ws_path'] : '';
if (!in_array($path, $allowed, true)) {
    http_response_code(404);
    exit;
}

$canonical = 'https://aquadt.by/' . $path;
$noindex = ($path === 'thanks');

header('Link: <' . $canonical . '>; rel="canonical"');
if ($noindex) {
    header('X-Robots-Tag: noindex, follow');
}

ob_start(function ($html) use ($canonical, $noindex, $path) {
    if ($html === '' || stripos($html, '<head') === false) {
        return $html;
    }

    if (!preg_match('/rel=["\']canonical["\']/i', $html)) {
        $tag = '<link rel="canonical" href="' . htmlspecialchars($canonical, ENT_QUOTES, 'UTF-8') . '">';
        $updated = preg_replace('/<head\b[^>]*>/i', '$0' . "\n        " . $tag, $html, 1);
        if (is_string($updated)) {
            $html = $updated;
        }
    }

    if ($noindex && !preg_match('/<meta\b[^>]*name=["\']robots["\']/i', $html)) {
        $tag = '<meta name="robots" content="noindex, follow">';
        $updated = preg_replace('/<head\b[^>]*>/i', '$0' . "\n        " . $tag, $html, 1);
        if (is_string($updated)) {
            $html = $updated;
        }
    }

    $updated = preg_replace_callback(
        '#<script\b[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>#is',
        function ($matches) {
            $json = preg_replace('/,\s*([}\]])/', '$1', $matches[1]);
            if (!is_string($json)) {
                return $matches[0];
            }

            return str_replace($matches[1], $json, $matches[0]);
        },
        $html
    );

    if (!is_string($updated)) {
        $updated = $html;
    }

    if ($path === 'payment') {
        $seoTitle = 'Рассчитать стоимость аквариума на заказ в Минске | AquaDT';
        $seoDesc = 'Бесплатно рассчитаем предварительную стоимость аквариума по вашим размерам: форма, оборудование, отделка и монтаж. Заполните параметры проекта — AquaDT.';
        $titleTag = '<title>' . htmlspecialchars($seoTitle, ENT_QUOTES, 'UTF-8') . '</title>';
        $descTag = '<meta name="description" content="' . htmlspecialchars($seoDesc, ENT_QUOTES, 'UTF-8') . '">';

        // Удаляем все существующие title и meta description, затем вставляем по одному.
        $clean = preg_replace('#<title\b[^>]*>.*?</title>\s*#is', '', $updated);
        if (is_string($clean)) {
            $clean = preg_replace('/<meta\b[^>]*name=["\']description["\'][^>]*>\s*/i', '', $clean);
        }
        if (is_string($clean)) {
            $withSeo = preg_replace('/<head\b[^>]*>/i', '$0' . "\n        " . $titleTag . "\n        " . $descTag, $clean, 1);
            if (is_string($withSeo)) {
                $updated = $withSeo;
            }
        }
    }

    if ($path === 'payment' && strpos($updated, '>аквариумы на заказ в Минске<') === false) {
        $needle = 'а результаты расчета будут отправлены на ваш электронный адрес.';
        $replacement = 'а результаты расчета будут отправлены на ваш электронный адрес. Если нужны <a href="https://aquadt.by/">аквариумы на заказ в Минске</a>, укажите город и параметры модели.';
        $linked = str_replace($needle, $replacement, $updated);
        if (is_string($linked)) {
            $updated = $linked;
        }
    }

    return $updated;
});

$oldDir = __DIR__ . '/old';
chdir($oldDir);
$_SERVER['SCRIPT_FILENAME'] = $oldDir . '/index.php';
$_SERVER['SCRIPT_NAME'] = '/old/index.php';
$_SERVER['PHP_SELF'] = '/old/index.php';
require $oldDir . '/index.php';
