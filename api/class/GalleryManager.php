<?php

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
    $values = parent::readAll();
    foreach ($values as $value) {
      $tableau[] = new Gallery($value);
    }
    return $tableau;
  }
}
