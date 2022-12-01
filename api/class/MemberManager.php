<?php

/**
 *
 */
class MemberManager extends Manager
{

  protected $table = 'member';
  protected $champs = [
    [
      'nom' => 'id',
      'PDO' => PDO::PARAM_INT
    ],
    [
      'nom' => 'name',
      'PDO' => PDO::PARAM_STR
    ],
    [
      'nom' => 'firstName',
      'PDO' => PDO::PARAM_STR
    ],
    [
      'nom' => 'address',
      'PDO' => PDO::PARAM_STR
    ],
    [
      'nom' => 'city',
      'PDO' => PDO::PARAM_STR
    ],
    [
      'nom' => 'phone',
      'PDO' => PDO::PARAM_STR
    ],
    [
      'nom' => 'mobile',
      'PDO' => PDO::PARAM_STR
    ],
    [
      'nom' => 'picture',
      'PDO' => PDO::PARAM_STR
    ]
  ];

  public function read(int $id)
  {
    $values = parent::readWhereValue($id, 'id');
    if ($values) {
      return new Member($values);
    } else {
      return new Member();
    }
  }

  public function readAll()
  {
    $values = parent::readAll();
    foreach ($values as $value) {
      $tableau[] = new Member($value);
    }
    return $tableau;
  }
}
