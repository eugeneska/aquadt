<?php

function smtp_read_response($socket)
{
    $response = '';

    while (($line = fgets($socket, 515)) !== false) {
        $response .= $line;
        if (isset($line[3]) && $line[3] === ' ') {
            break;
        }
    }

    return $response;
}

function smtp_expect($socket, $codes)
{
    $response = smtp_read_response($socket);
    $code = (int) substr($response, 0, 3);

    return in_array($code, $codes, true);
}

function smtp_command($socket, $command, $codes)
{
    fwrite($socket, $command . "\r\n");

    return smtp_expect($socket, $codes);
}

function smtp_send_mail($config, $to, $subject, $body)
{
    $host = isset($config['host']) ? $config['host'] : '';
    $port = (int) (isset($config['port']) ? $config['port'] : 587);
    $user = isset($config['user']) ? $config['user'] : '';
    $pass = isset($config['pass']) ? $config['pass'] : '';
    $from = isset($config['from']) ? $config['from'] : $user;
    $fromName = isset($config['from_name']) ? $config['from_name'] : 'AquaDT';

    if ($host === '' || $user === '' || $pass === '' || $from === '' || $to === '') {
        return false;
    }

    $socket = @stream_socket_client(
        'tcp://' . $host . ':' . $port,
        $errno,
        $errstr,
        20,
        STREAM_CLIENT_CONNECT
    );

    if (!$socket) {
        return false;
    }

    stream_set_timeout($socket, 20);

    if (!smtp_expect($socket, array(220))) {
        fclose($socket);
        return false;
    }

    $ehloHost = 'localhost';
    if (!smtp_command($socket, 'EHLO ' . $ehloHost, array(250))) {
        fclose($socket);
        return false;
    }

    if (!smtp_command($socket, 'STARTTLS', array(220))) {
        fclose($socket);
        return false;
    }

    $cryptoMethod = STREAM_CRYPTO_METHOD_TLS_CLIENT;
    if (defined('STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT')) {
        $cryptoMethod |= STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT;
    }

    if (!stream_socket_enable_crypto($socket, true, $cryptoMethod)) {
        fclose($socket);
        return false;
    }

    if (!smtp_command($socket, 'EHLO ' . $ehloHost, array(250))) {
        fclose($socket);
        return false;
    }

    if (!smtp_command($socket, 'AUTH LOGIN', array(334))) {
        fclose($socket);
        return false;
    }

    if (!smtp_command($socket, base64_encode($user), array(334))) {
        fclose($socket);
        return false;
    }

    if (!smtp_command($socket, base64_encode($pass), array(235))) {
        fclose($socket);
        return false;
    }

    if (!smtp_command($socket, 'MAIL FROM:<' . $from . '>', array(250))) {
        fclose($socket);
        return false;
    }

    if (!smtp_command($socket, 'RCPT TO:<' . $to . '>', array(250, 251))) {
        fclose($socket);
        return false;
    }

    if (!smtp_command($socket, 'DATA', array(354))) {
        fclose($socket);
        return false;
    }

    $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    $encodedFromName = '=?UTF-8?B?' . base64_encode($fromName) . '?=';
    $headers = array(
        'From: ' . $encodedFromName . ' <' . $from . '>',
        'To: <' . $to . '>',
        'Subject: ' . $encodedSubject,
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
    );

    $message = implode("\r\n", $headers) . "\r\n\r\n" . $body . "\r\n.";
    fwrite($socket, $message . "\r\n");

    if (!smtp_expect($socket, array(250))) {
        fclose($socket);
        return false;
    }

    smtp_command($socket, 'QUIT', array(221));
    fclose($socket);

    return true;
}
