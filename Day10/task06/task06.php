<?php
require __DIR__ . '/../common.php';
method('POST');
$fields = productInputs($_POST);
$type = $fields[0];
$brand = $fields[1];
$price = input($_POST, 'price');
$number = input($_POST, 'number');
foreach (['price' => $price, 'number' => $number] as $field => $value) {
    if (!preg_match('/^[0-9]+$/D', $value) || filter_var($value, FILTER_VALIDATE_INT, ['options' => ['min_range' => 0]]) === false) {
        reply(['error' => "Error ($value): $field must be a non-negative integer."], 400);
    }
}
$pdo = db();
// Verifier et enregistrer ensemble : une transaction evite les doublons simultanes.
$pdo->exec('BEGIN IMMEDIATE');
try {
    $existing = rows($pdo, 'SELECT id FROM products WHERE type = ? COLLATE NOCASE AND brand = ? COLLATE NOCASE', [$type, $brand]);
    if ($existing) {
        $query = $pdo->prepare('UPDATE products SET price = ?, stock = ? WHERE type = ? COLLATE NOCASE AND brand = ? COLLATE NOCASE');
        $query->execute([(int)$price, (int)$number, $type, $brand]);
        $action = 'updated';
    } else {
        $query = $pdo->prepare('INSERT INTO products (type, brand, price, stock) VALUES (?, ?, ?, ?)');
        $query->execute([strtolower($type), strtolower($brand), (int)$price, (int)$number]);
        $action = 'created';
    }
    $pdo->exec('COMMIT');
} catch (Throwable $error) {
    $pdo->exec('ROLLBACK');
    throw $error;
}
if ($action === 'created') {
    reply(['message' => "Product $action successfully.", 'action' => $action], 201);
}

reply(['message' => "Product $action successfully.", 'action' => $action]);
