<?php
function get_shortest(array $string ){
    $shortest = $string[0];
    for( $i = 1; $i < count($string); $i++ ){
        if( strlen($string[$i]) < strlen($shortest) ){
            $shortest = $string[$i];
        }
    }
    return $shortest;

}