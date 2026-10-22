<?php
require __DIR__ . '/../common.php';
method('GET');

// 1. Lire les deux champs.
$type = input($_GET, 'type');
$brand = input($_GET, 'brand');
$pdo = db();

// 2. Verifier le type : format, puis presence dans la base.
$typeValid = false;
$typeError = textError($type, 'type');

if ($type === '') {
    $typeMessage = 'No type sent yet!';
} elseif ($typeError !== null) {
    $typeMessage = "$type: $typeError";
} else {
    $query = $pdo->prepare('SELECT id FROM products WHERE type = ? COLLATE NOCASE LIMIT 1');
    $query->execute([$type]);
    $product = $query->fetch();

    if ($product === false) {
        $typeMessage = "$type: this type doesn't exist in our shop.";
    } else {
        $typeValid = true;
        $typeMessage = "$type: this type exists in databases.";
    }
}

// 3. Verifier la marque pour ce type.
$brandValid = false;
$brandError = textError($brand, 'brand');

if ($brand === '') {
    $brandMessage = 'No brand sent yet!';
} elseif ($brandError !== null) {
    $brandMessage = "$brand: $brandError";
} else {
    $query = $pdo->prepare('SELECT id FROM products WHERE type = ? COLLATE NOCASE AND brand = ? COLLATE NOCASE LIMIT 1');
    $query->execute([$type, $brand]);
    $product = $query->fetch();

    if ($product !== false) {
        $brandMessage = "$brand: this brand already exists in databases.";
    } elseif (!$typeValid) {
        $brandMessage = "$brand: choose an existing type first.";
    } else {
        $brandValid = true;
        $brandMessage = "$brand: this brand is valid for the type $type.";
    }
}

// 4. Envoyer les deux resultats au JavaScript.
reply([
    'type' => ['valid' => $typeValid, 'message' => $typeMessage],
    'brand' => ['valid' => $brandValid, 'message' => $brandMessage]
]);
