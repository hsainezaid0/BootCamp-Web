<?php
function dog_bark(int $woof_nb) {
    for ($i = 0; $i < $woof_nb; $i++) {
        if ($i > 0) {
            echo " ";
        }

        echo "woof";
    }

    echo "\n";
}