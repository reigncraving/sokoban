<?php

function lvlReader($path){
    $level = array();
    $file = fopen($path, "r") or die("file not found!");
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