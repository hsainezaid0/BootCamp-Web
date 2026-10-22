<?php
require __DIR__ . '/../common.php';
method('POST');
$email = input($_POST, 'email');
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    reply(['error' => 'The email address is not valid.'], 400);
}
reply(['message' => 'The email address is valid.']);
