<?php
require __DIR__ . '/../common.php';
method('GET');
$fields = productInputs($_GET);
$type = $fields[0];
$brand = $fields[1];
$pdo = db();
if (!rows($pdo, 'SELECT id FROM products WHERE type = ? COLLATE NOCASE LIMIT 1', [$type])) {
    reply(['error' => "Error ($type): this type doesn't exist in our shop."], 400);
}
if (!rows($pdo, 'SELECT id FROM products WHERE type = ? COLLATE NOCASE AND brand = ? COLLATE NOCASE LIMIT 1', [$type, $brand])) {
    reply(['error' => "Error ($brand): this brand doesn't exist in our database."], 400);
}
$price = input($_GET, 'price');
$number = input($_GET, 'number');
if (strlen($price) < 2) {
    reply(['error' => "Error ($price): this price does not have enough characters."], 400);
}
if (strlen($price) > 5) {
    reply(['error' => "Error ($price): this price has too many characters."], 400);
}
if (!preg_match('/^([<>=])([0-9]+)$/D', $price, $match)) {
    reply(['error' => "Error ($price): we cannot define a price - string invalid."], 400);
}
$quantity = filter_var($number, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]);
if ($quantity === false) {
    reply(['error' => "Error ($number): not a positive number."], 400);
}
// Only the allowlisted operator enters SQL; all data uses placeholders.
$products = rows($pdo, 'SELECT type, brand, price, stock FROM products WHERE type = ? COLLATE NOCASE AND brand = ? COLLATE NOCASE AND price ' . $match[1] . ' CAST(? AS INTEGER) ORDER BY id', [$type, $brand, $match[2]]);
if (!$products) {
    reply(['error' => "Error ($price): no products found at this price."], 400);
}
// Garder les produits avec assez de stock.
$available = [];
$stock = 0;

foreach ($products as $product) {
    if ($product['stock'] > $stock) {
        $stock = $product['stock'];
    }
    if ($product['stock'] >= $quantity) {
        $product['number'] = $quantity;
        $available[] = $product;
    }
}

if (count($available) === 0) {
    reply(['error' => "Error ($number): sorry, we don't have enough stock, we only have $stock in stock."], 400);
}

reply(['products' => $available, 'message' => count($available) . ' product(s) found.']);
