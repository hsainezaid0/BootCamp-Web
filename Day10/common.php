<?php
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
set_exception_handler(function (Throwable $error): void {
    error_log((string) $error);
    reply(['error' => 'A server error occurred. Please try again.'], 500);
});
// Envoyer un tableau PHP au navigateur sous forme de JSON.
function reply($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE);
    exit;
}
// Verifier si la requete utilise la bonne methode : GET ou POST.
function method($expected) {
    if ($_SERVER['REQUEST_METHOD'] !== $expected) {
        header('Allow: ' . $expected);
        reply(['error' => 'Method not allowed.'], 405);
    }
}
// Lire un champ et refuser les tableaux a la place du texte.
function input($source, $key) {
    if (!isset($source[$key])) {
        return '';
    }
    if (!is_string($source[$key])) {
        reply(['error' => 'Invalid field: ' . $key], 400);
    }
    return $source[$key];
}
function db() {
    $pdo = new PDO('sqlite:' . __DIR__ . '/ajax_products.db');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    $pdo->exec('PRAGMA busy_timeout = 5000');
    return $pdo;
}
// Les points d'interrogation SQL sont remplaces par les valeurs de execute.
function rows($pdo, $sql, $values = []) {
    $query = $pdo->prepare($sql);
    $query->execute($values);
    return $query->fetchAll();
}
function textError($value, $field) {
    if ($field === 'type') {
        $min = 3;
        $max = 10;
    } else {
        $min = 2;
        $max = 20;
    }
    if (strlen($value) < $min) {
        return "this $field does not have enough characters.";
    }
    if (strlen($value) > $max) {
        return "this $field has too many characters.";
    }
    if ($field === 'type') {
        // Lettres et tirets uniquement. Le i ignore les majuscules.
        $pattern = '/^[a-z-]+$/iD';
    } else {
        $pattern = '/^[a-z0-9&-]+$/iD';
    }
    if (!preg_match($pattern, $value)) {
        if ($field === 'type') {
            return "this type has non-alphabetical characters (different from '-').";
        }
        return 'this brand has invalid characters.';
    }
    return null;
}
function productInputs($source) {
    $type = input($source, 'type');
    $brand = input($source, 'brand');
    $error = textError($type, 'type');
    if ($error) {
        reply(['error' => "Error ($type): $error"], 400);
    }
    $error = textError($brand, 'brand');
    if ($error) {
        reply(['error' => "Error ($brand): $error"], 400);
    }
    return [$type, $brand];
}
