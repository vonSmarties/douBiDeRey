<?php
include_once 'Manager.php';
include_once 'Member.php';

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
    if (sizeof($values) == 1) {
      return new Member($values[0]);
    } else {
      return new Member();
    }
  }

  public function readAll()
  {
    $values = parent::readAll();
    $tableau = [];
    foreach ($values as $value) {
      $tableau[] = new Member($value);
    }
    return $tableau;
  }
}
