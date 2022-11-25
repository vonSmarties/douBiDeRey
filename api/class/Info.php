<?php
include 'Entity.php';
/**
 *
 */
class Info extends Entity {

  private $html;
  protected $keys = ["id","html"];

  public function getHtml() {
    return $this->html;
  }

  public function setHtml(string $html) {
    $this->html=$html;
  }
}