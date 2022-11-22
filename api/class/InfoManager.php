<?php
/**
 *
 */
class InfoManager extends Manager
{

  protected $table='info';
  protected $champs=[
    [
      'nom'=>'id',
      'PDO'=>PDO::PARAM_INT
    ],
    [
      'nom'=>'html',
      'PDO'=>PDO::PARAM_STR
    ]
  ];

  

  public function read(int $id){
    $values=parent::readWhereValue($id,'id');
    if ($values) {
      return new Info($values);
    }
  }
}