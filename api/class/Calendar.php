<?php
include_once 'Entity.php';
/**
 *
 */
class Calendar extends Entity
{

  private $year, $date, $hour, $length, $club, $place;
  protected $keys = ["id", "date", "length", "club", "place"];

  public function getYear()
  {
    return $this->year;
  }

  public function setYear(string $year)
  {
    $this->year = $year;
  }

  public function getDate()
  {
    return $this->date;
  }

  public function setDate(string $date)
  {
    $this->date = $date;
  }

  public function getLength()
  {
    return $this->length;
  }

  public function setLength(string $length)
  {
    $this->length = $length;
  }

  public function getClub()
  {
    return $this->club;
  }

  public function setClub(string $club)
  {
    $this->club = $club;
  }

  public function getPlace()
  {
    return $this->place;
  }

  public function setPlace(string $place)
  {
    $this->place = $place;
  }
}
