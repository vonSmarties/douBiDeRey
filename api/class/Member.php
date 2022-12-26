<?php
include_once 'Entity.php';
/**
 *
 */
class Member extends Entity
{

  private $name, $firstName, $role, $address, $city, $phone, $mobile, $picture;
  protected $keys = ["id", "name", "firstName", "role", "address", "city", "phone", "mobile", "picture"];

  public function getName()
  {
    return $this->name;
  }

  public function setName(string $name)
  {
    $this->name = $name;
  }

  public function getFirstName()
  {
    return $this->firstName;
  }

  public function setFirstName(string $firstName)
  {
    $this->firstName = $firstName;
  }

  public function getRole()
  {
    return $this->role;
  }

  public function setRole(string $role)
  {
    $this->role = $role;
  }

  public function getAddress()
  {
    return $this->address;
  }

  public function setAddress(string $address)
  {
    $this->address = $address;
  }

  public function getCity()
  {
    return $this->city;
  }

  public function setCity(string $city)
  {
    $this->city = $city;
  }

  public function getPhone()
  {
    return $this->phone;
  }

  public function setPhone(string $phone)
  {
    $this->phone = $phone;
  }

  public function getMobile()
  {
    return $this->mobile;
  }

  public function setMobile(string $mobile)
  {
    $this->mobile = $mobile;
  }

  public function getPicture()
  {
    return $this->picture;
  }

  public function setPicture(string $picture)
  {
    $this->picture = $picture;
  }
}
