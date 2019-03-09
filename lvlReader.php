<?php

function lvlReader($path){
    $level = array();
    $file = fopen($path, "r") or die("Please select level");
    $index = 0;

    while(!feof($file)){
           $line = nl2br(fgetc($file));
           $index++;
           $level[$index] = $line;
           echo $level[$index];
    }

    fclose($file);
}

?>