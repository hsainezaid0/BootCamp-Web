<?php
require __DIR__ . '/../common.php';
// Le chat utilise une base separee de celle des produits.
$pdo = new PDO('sqlite:' . __DIR__ . '/../chat.db');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
$pdo->exec('PRAGMA busy_timeout = 5000');
$pdo->exec('CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, message TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)');
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim(input($_POST, 'name'));
    $message = trim(input($_POST, 'message'));
    if ($name === '' || mb_strlen($name) > 50 || $message === '' || mb_strlen($message) > 1000) {
        reply(['error' => 'Enter a name (1–50 characters) and message (1–1000 characters).'], 400);
    }
    $query = $pdo->prepare('INSERT INTO messages (name, message) VALUES (?, ?)');
    $query->execute([$name, $message]);
    reply(['message' => 'Message sent.'], 201);
}
method('GET');
reply(['messages' => rows($pdo, 'SELECT * FROM (SELECT id, name, message, created_at FROM messages ORDER BY id DESC LIMIT 200) ORDER BY id ASC')]);
