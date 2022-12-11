<?php

/**
 *
 */
class InfoManager extends Manager
{

  protected $table = 'info';
  protected $champs = [
    [
      'nom' => 'id',
      'PDO' => PDO::PARAM_INT
    ],
    [
      'nom' => 'html',
      'PDO' => PDO::PARAM_STR
    ]
  ];

  public function read(int $id)
  {
    $values = parent::readWhereValue($id, 'id');
    if (sizeof($values) == 1) {
      return new Info($values[0]);
    } else {
      return new Info();
    }
  }

  public function readLast()
  {
    $values = parent::readWithOrder('id', 'Desc',  1);
    if (sizeof($values) == 1) {
      return new Info($values[0]);
    } else {
      return new Info();
    }
  }

  public function readAll()
  {
    $values = parent::readWithOrder('id', 'Desc',  1000);
    $tableau = [];
    foreach ($values as $value) {
      $tableau[] = new Info($value);
    }
    return $tableau;
  }
}
