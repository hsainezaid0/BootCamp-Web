<?php
require __DIR__ . '/../common.php';
method('GET');
reply(['name' => input($_GET, 'name')]);
