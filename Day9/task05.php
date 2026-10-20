<?php
function form_is_submitted(): bool
{
    return ($_SERVER['REQUEST_METHOD'] ?? '') === 'POST';
}

function whoami(): void
{
    $name = $_POST['name'] ?? null;
    $hasName = is_string($name) && trim($name) !== '';
    $age = $_POST['age'] ?? null;
    $validAge = is_string($age) || is_int($age)
        ? filter_var($age, FILTER_VALIDATE_INT, ['options' => ['min_range' => 0]])
        : false;

    $sentence = $hasName
        ? 'Hi, my name is ' . htmlspecialchars($name, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8')
        : 'Hi, I have no name';

    if ($validAge !== false) {
        $sentence .= " and I'm " . $validAge . ' years old';
    }

    echo $sentence . '.';

    $curriculums = [
        'pge' => 'PGE (Programme Grande Ecole)',
        'bachelor' => 'Bachelor',
        'msc' => 'MSC Pro',
        'coding' => 'Coding Academy',
        'wac' => 'Web@cademie',
    ];
    $curriculum = $_POST['curriculum'] ?? null;
    if (is_string($curriculum) && isset($curriculums[$curriculum])) {
        echo " I'm a student of " . $curriculums[$curriculum] . '.';
    }
}
