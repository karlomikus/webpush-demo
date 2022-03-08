<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Laravel</title>
    </head>
    <body class="antialiased">
        <button id="enable-push">Enable push notifications</button>
        <button id="disable-push">Disable push notifications</button>
        <br>
        <a href="/notifications/send">Send a notification</a>
        <script src="/js/main.js"></script>
    </body>
</html>
