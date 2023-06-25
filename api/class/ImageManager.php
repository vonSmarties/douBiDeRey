<?php
include_once 'Manager.php';
include_once 'Image.php';

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
    if (file_exists('../' . $image->getFile()))
      return unlink('../' . $image->getFile()) && $this->deleteWhereValue($image->getFile(), "file");
    return $this->deleteWhereValue($image->getFile(), "file");
  }

  public function deleteImagesGallery(Gallery $gallery)
  {
    $images = $this->readAllGallery($gallery->getId());

    foreach ($images as $image) {
      if (!$this->deleteImage($image)) {
        return false;
      }
    }

    return $this->deleteWhereValue($gallery->getId(), "gallery");
  }
}

$imageManager = new ImageManager();
