<?php
include_once 'Entity.php';
/**
 *
 */
class Info extends Entity {

  private $delta;
  protected $keys = ["id","delta"];

  public function getDelta() {
    return $this->delta;
  }

  public function setDelta(string $delta) {
    $this->delta=$delta;
  }
}