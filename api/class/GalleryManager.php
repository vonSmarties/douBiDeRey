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
    if ($values) {
      return new Gallery($values);
    }
  }

  public function readLast()
  {
    $values = parent::readLast();
    if ($values) {
      return new Gallery($values);
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