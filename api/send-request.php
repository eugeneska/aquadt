<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Метод не поддерживается'], JSON_UNESCAPED_UNICODE);
    exit;
}

require_once __DIR__ . '/load-env.php';
require_once __DIR__ . '/smtp.php';

load_env(dirname(__DIR__) . '/.env');

function read_json_body(): array
{
    $raw = file_get_contents('php://input');
    if (!is_string($raw) || $raw === '') {
        return $_POST;
    }

    $decoded = json_decode($raw, true);

    return is_array($decoded) ? $decoded : $_POST;
}

function clean_field($value, int $maxLength): string
{
    $value = is_string($value) ? trim($value) : '';
    if ($value === '') {
        return '';
    }

    if (function_exists('mb_substr')) {
        return mb_substr($value, 0, $maxLength);
    }

    return substr($value, 0, $maxLength);
}

function interest_label(string $value): string
{
    $map = [
        'aquarium' => 'Аквариум под ключ',
        'service' => 'Обслуживание',
        'redesign' => 'Переоформление',
        'repair' => 'Ремонт',
        'consultation' => 'Консультация',
    ];

    return $map[$value] ?? $value;
}

function escape_html(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function source_label(string $source): string
{
    return $source === 'modal' ? 'модальное окно' : 'форма на странице';
}

function build_message(array $data): string
{
    $lines = [
        '📩 Новая заявка с сайта',
        '',
        '👤 Имя: ' . $data['name'],
        '📞 Телефон: ' . $data['phone'],
    ];

    if ($data['city'] !== '') {
        $lines[] = '🏙 Город: ' . $data['city'];
    }

    if ($data['interest'] !== '') {
        $lines[] = '🎯 Тип интереса: ' . interest_label($data['interest']);
    }

    if ($data['comment'] !== '') {
        $lines[] = '💬 Комментарий: ' . $data['comment'];
    }

    $lines[] = '📋 Источник: ' . source_label($data['source']);

    return implode("\n", $lines);
}

function build_telegram_message(array $data): string
{
    $message = "📩 <b>Новая заявка с сайта</b>\n\n"
        . '👤 <b>Имя:</b> ' . escape_html($data['name']) . "\n"
        . '📞 <b>Телефон:</b> ' . escape_html($data['phone']);

    if ($data['city'] !== '') {
        $message .= "\n" . '🏙 <b>Город:</b> ' . escape_html($data['city']);
    }

    if ($data['interest'] !== '') {
        $message .= "\n" . '🎯 <b>Тип интереса:</b> ' . escape_html(interest_label($data['interest']));
    }

    if ($data['comment'] !== '') {
        $message .= "\n" . '💬 <b>Комментарий:</b> ' . escape_html($data['comment']);
    }

    $message .= "\n" . '📋 <b>Источник:</b> ' . escape_html(source_label($data['source']));

    return $message;
}

function send_telegram(string $message): bool
{
    $token = env('TELEGRAM_BOT_TOKEN');
    $chatId = env('TELEGRAM_CHAT_ID');

    if (!$token || !$chatId) {
        return false;
    }

    $payload = http_build_query([
        'chat_id' => $chatId,
        'text' => $message,
        'parse_mode' => 'HTML',
    ]);

    $url = 'https://api.telegram.org/bot' . $token . '/sendMessage';
    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
            'content' => $payload,
            'timeout' => 15,
            'ignore_errors' => true,
        ],
    ]);

    $response = @file_get_contents($url, false, $context);
    if ($response === false) {
        return false;
    }

    $json = json_decode($response, true);

    return is_array($json) && !empty($json['ok']);
}

function send_email(string $subject, string $body): bool
{
    $to = env('MAIL_TO');
    if (!$to) {
        return false;
    }

    $smtpHost = env('SMTP_HOST');
    if ($smtpHost) {
        return smtp_send_mail([
            'host' => $smtpHost,
            'port' => env('SMTP_PORT', '587'),
            'user' => env('SMTP_USER'),
            'pass' => env('SMTP_PASS'),
            'from' => env('MAIL_FROM', env('SMTP_USER')),
            'from_name' => env('MAIL_FROM_NAME', 'Сайт'),
        ], $to, $subject, $body);
    }

    $from = env('MAIL_FROM', 'noreply@' . ($_SERVER['HTTP_HOST'] ?? 'localhost'));
    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'From: ' . $from,
    ];

    return @mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, implode("\r\n", $headers));
}

$input = read_json_body();

$data = [
    'name' => clean_field($input['name'] ?? '', 120),
    'phone' => clean_field($input['phone'] ?? '', 40),
    'city' => clean_field($input['city'] ?? '', 120),
    'interest' => clean_field($input['interest'] ?? '', 40),
    'comment' => clean_field($input['comment'] ?? '', 2000),
    'source' => clean_field($input['source'] ?? 'page', 20),
];

if ($data['name'] === '' || $data['phone'] === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Укажите имя и телефон'], JSON_UNESCAPED_UNICODE);
    exit;
}

$plainMessage = build_message($data);
$telegramMessage = build_telegram_message($data);

$telegramOk = send_telegram($telegramMessage);
$emailOk = send_email('📩 Новая заявка с сайта', $plainMessage);

if (!$telegramOk && !$emailOk) {
    http_response_code(500);
    echo json_encode([
        'ok' => false,
        'error' => 'Не удалось отправить заявку. Проверьте настройки в .env',
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if (!$telegramOk || !$emailOk) {
    http_response_code(207);
    echo json_encode([
        'ok' => true,
        'warning' => 'Заявка отправлена частично: ' . (!$telegramOk ? 'Telegram' : 'почта') . ' недоступен',
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

echo json_encode(['ok' => true], JSON_UNESCAPED_UNICODE);
