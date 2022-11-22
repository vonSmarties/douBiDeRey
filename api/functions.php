<?php

function __autoload($className){
  $classDir = 'class/'.$className.'.php';
  if(file_exists($classDir)){
    require_once ($classDir);
  }else{
    echo "le fichier $classDir n'existe pas";
  }
}
