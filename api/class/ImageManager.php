<?php

/**
 *
 */
class ImageManager extends Manager
{

  protected $table = 'image';
  protected $champs = [
    [
      'nom' => 'id',
      'PDO' => PDO::PARAM_INT
    ],
    [
      'nom' => 'file',
      'PDO' => PDO::PARAM_STR
    ],
    [
      'nom' => 'gallery',
      'PDO' => PDO::PARAM_INT
    ]
  ];

  public function readAllGallery(int $idGallery)
  {
    $values = $this->readWhereValue($idGallery, 'gallery');
    foreach ($values as $value) {
      $tableau[] = new Image($value);
    }
    return $tableau;
  }

  public function read(string $file)
  {
    $value = $this->readWhereValue($file, 'file');
    if ($value) {
      return new Image($value);
    } else {
      return new Gallery();
    }
  }

  public function deleteImage(Image $image)
  {
    $this->deleteWhereValue($image->file, "file");
  }
}
