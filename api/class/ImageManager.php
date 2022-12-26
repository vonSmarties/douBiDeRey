<?php
include 'Manager.php';
include 'Image.php';

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
    $tableau = [];
    foreach ($values as $value) {
      $tableau[] = new Image($value);
    }
    return $tableau;
  }

  public function readOneInGallery(int $idGallery)
  {
    $values = $this->readWhereValue($idGallery, 'gallery');
    return new Image($values[0]);
  }

  public function read(string $file)
  {
    $values = $this->readWhereValue($file, 'file');
    if (sizeof($values) == 1) {
      return new Image($values[0]);
    } else {
      return new Image();
    }
  }

  public function deleteImage(Image $image)
  {
    $this->deleteWhereValue($image->getFile(), "file");
  }

  public function deleteImagesGallery(Gallery $gallery)
  {
    $this->deleteWhereValue($gallery->getId(), "gallery");
  }
}
