<?php
include_once 'Manager.php';
include_once 'Gallery.php';

/**
 *
 */
class GalleryManager extends Manager
{

  protected $table = 'gallery';
  protected $champs = [
    [
      'nom' => 'id',
      'PDO' => PDO::PARAM_INT
    ],
    [
      'nom' => 'title',
      'PDO' => PDO::PARAM_STR
    ]
  ];

  public function create(Entity $gallery)
  {
    $rtrn = parent::create($gallery);
    if ($rtrn) {
      mkdir("../gallery/" . $gallery->getId());
    }
    return $rtrn;
  }

  public function read(int $id)
  {
    $values = parent::readWhereValue($id, 'id');
    if (sizeof($values) == 1) {
      return new Gallery($values[0]);
    } else {
      return new Gallery();
    }
  }

  public function readLast()
  {
    $values = parent::readWithOrder('id', 'Desc', 1);
    if (sizeof($values) == 1) {
      return new Gallery($values[0]);
    } else {
      return new Gallery();
    }
  }

  public function readAll()
  {
    $values = parent::readWithOrder('id', 'Desc');
    $tableau = [];
    foreach ($values as $value) {
      $tableau[] = new Gallery($value);
    }
    return $tableau;
  }

  public function delete(Entity $gallery)
  {
    $rtrn = parent::delete($gallery);
    if ($rtrn){
      unlink("../gallery/" . $gallery->getId() . "/zip");
      rmdir("../gallery/" . $gallery->getId());
    }
    return $rtrn;
  }
}

$galleryManager = new GalleryManager();
