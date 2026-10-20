
<?php
function whoami(): void {
    $name = $_POST["name"] ?? "";
    $age = $_POST["age"] ?? "";

    $hasName = is_string($name) && trim($name) !== "";

    $validAge = filter_var($age, FILTER_VALIDATE_INT) !== false
        && (int)$age >= 0;

    if ($hasName) {
        echo "Hi, my name is "
            . htmlspecialchars(trim($name), ENT_QUOTES, "UTF-8"); // Prevent XSS by escaping special characters
    } else {
        echo "Hi, I have no name";
    }

    if ($validAge) {
        echo " and I'm " . (int)$age . " years old";
    }

    echo ".";
}
