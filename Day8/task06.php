<?php
function sequence(int $n): void {
    if ($n < 0) {
        return;
    }

    $current = "1";//bach n9dro n9raw chiffres dyalo position b position.
    echo $current . PHP_EOL; // \N iteration 0 

    for ($i = 1; $i <= $n; $i++) {
        $next = ""; // terme jdid li kanbniw
        $length = strlen($current);

        for ($j = 0; $j < $length; $j++) {//boucle li kat9ra chiffres dyal $current.
            $count = 1;


            //kayn chiffre mn b3d position actuelle. , chiffre actuel == chiffre li b3do 
            while ($j + 1 < $length && $current[$j] == $current[$j + 1]) {
                $count++; //while kat7seb chiffres identiques li jayyin 7da b3diyathom.
                $j++;
            }

            $next = $next . $count . $current[$j]; // kanjm3o nombre de répétitions m3a chiffre f next 
        }

        $current = $next;
        echo $current . PHP_EOL;
    }
}