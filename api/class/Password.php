<?php
include_once 'Entity.php';
/**
 *
 */
class Password extends Entity
{

  private $password;
  protected $keys = ["idUser", "password"];

  public function checkPassword(string $password)
  {
    return password_verify($password, $this->password);
  }

  public function hashPassword()
  {
    $this->password = password_hash($this->password, PASSWORD_BCRYPT);
  }

  public function getPassword()
  {
    return $this->password;
  }

  public function setPassword(string $password)
  {
    $this->password = $password;
  }

  public function getIdUser()
  {
    return $this->idUser;
  }

  public function setIdUser(string $idUser)
  {
    $this->idUser = $idUser;
  }
}
