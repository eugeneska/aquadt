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

ob_start(function ($html) use ($canonical, $noindex) {
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

    return is_string($updated) ? $updated : $html;
});

$oldDir = __DIR__ . '/old';
chdir($oldDir);
$_SERVER['SCRIPT_FILENAME'] = $oldDir . '/index.php';
$_SERVER['SCRIPT_NAME'] = '/old/index.php';
$_SERVER['PHP_SELF'] = '/old/index.php';
require $oldDir . '/index.php';
