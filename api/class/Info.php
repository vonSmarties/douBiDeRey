<?php
require('Entity.php');
/**
 *
 */
class Info extends Entity {

  private $html;

  public function getHtml() {
    return $this->html;
  }

  public function setHtml(string $html) {
    $this->html=$html;
  }
}