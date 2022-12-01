<?php

/**
 *
 */
class CalendarManager extends Manager
{

  protected $table = 'calendar';
  protected $champs = [
    [
      'nom' => 'id',
      'PDO' => PDO::PARAM_INT
    ],
    [
      'nom' => 'year',
      'PDO' => PDO::PARAM_STR
    ],
    [
      'nom' => 'date',
      'PDO' => PDO::PARAM_STR
    ],
    [
      'nom' => 'hour',
      'PDO' => PDO::PARAM_STR
    ],
    [
      'nom' => 'length',
      'PDO' => PDO::PARAM_STR
    ],
    [
      'nom' => 'club',
      'PDO' => PDO::PARAM_STR
    ],
    [
      'nom' => 'place',
      'PDO' => PDO::PARAM_STR
    ]
  ];

  public function read(string $id)
  {
    $value = $this->readWhereValue($id, 'id');
    if ($value) {
      return new Calendar($value);
    } else {
      return new Calendar();
    }
  }

  public function readYear(int $year)
  {
    $values = $this->readWhereValue($year, 'year');
    foreach ($values as $value) {
      $tableau[] =  new Calendar($value);
    }
    return $tableau;
  }

  public function deleteYear(int $year)
  {
    $this->deleteWhereValue($year, 'year');
  }
}
