<?php

/**
 *
 */
class ImageManager extends Manager
{

  protected $table = 'image';
  protected $champs = [
    [
      'nom' => 'file',
      'PDO' => PDO::PARAM_STR
    ],
    [
      'nom' => 'gallery',
      'PDO' => PDO::PARAM_INT
    ]
  ];

  public function read(int $idGallery)
  {
    $values = parent::readWhereValue($idGallery, 'gallery');
    foreach ($values as $value) {
      $tableau[] = new Image($value);
    }
  }

  public function deleteImage(Image $image){
    $this->deleteWhereValue($image->file,"file");
  }
}
