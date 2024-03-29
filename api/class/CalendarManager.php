<?php
include_once 'Manager.php';
include_once 'Calendar.php';

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
      'nom' => 'date',
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
    $values = $this->readWhereValue($id, 'id');
    if (sizeof($values) == 1) {
      return new Calendar($values[0]);
    } else {
      return new Calendar();
    }
  }

  public function readYear(int $year)
  {

    $sql = "SELECT * FROM calendar WHERE date BETWEEN '" . ($year - 1) . "-12-31' AND '" . ($year + 1) . "-01-01' ORDER BY date ASC";

    $req = $this->db->prepare($sql);
    $req->execute();
    $values = $req->fetchAll(PDO::FETCH_ASSOC);
    $tableau = [];
    foreach ($values as $value) {
      $tableau[] = new Calendar($value);
    }
    return $tableau;  
  }

  public function deleteYear(int $year)
  {
    $this->deleteWhereValue($year, 'year');
  }

  public function readListYear()
  {
    $sql = "SELECT YEAR(date) as year FROM calendar GROUP BY YEAR(date) ORDER BY date desc";

    $req = $this->db->prepare($sql);
    $req->execute();
    $values = $req->fetchAll(PDO::FETCH_ASSOC);
    $tableau = [];
    foreach ($values as $value) {
      $tableau[] = intVal($value['year']);
    }
    return $tableau;  
  }

  
}

$calendarManager = new CalendarManager();
