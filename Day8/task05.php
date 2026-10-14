<?php
function calc_average(array $numbers){
    if(count($numbers) == 0){
        return null;
    }
    $sum = array_sum($numbers);
    $average = $sum / count($numbers);
    return round($average, 1);
}