<?php
include_once 'Manager.php';
include_once 'Password.php';

/**
 *
 */
class PasswordManager extends Manager
{

  protected $table = 'password';
  protected $champs = [
    [
      'nom' => 'idUser',
      'PDO' => PDO::PARAM_INT
    ],
    [
      'nom' => 'password',
      'PDO' => PDO::PARAM_STR
    ]
  ];

  public function read(int $idUser)
  {
    $values = parent::readWhereValue($idUser, 'idUser');
    if (sizeof($values) == 1) {
      return new Password($values[0]);
    } else {
      return new Password();
    }
  }
}
