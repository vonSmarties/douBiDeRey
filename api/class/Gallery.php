<?php
include_once 'Entity.php';
/**
 *
 */
class Gallery extends Entity {

  private $title;
  protected $keys = ["id","title"];

  public function getTitle() {
    return $this->title;
  }

  public function setTitle(string $title) {
    $this->title=$title;
  }
}