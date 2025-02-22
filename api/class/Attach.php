<?php
include_once 'Entity.php';
/**
 *
 */
class Attach extends Entity {

  private $file,$info,$title;
  protected $keys = ["file","info","title"];

  public function getFile() {
    return $this->file;
  }

  public function setFile(string $file) {
    $this->file=$file;
  }

  public function getTitle() {
    return $this->title;
  }

  public function setTitle(string $title) {
    $this->title=$title;
  }

  public function getInfo() {
    return intval($this->info);
  }

  public function setInfo(int $info) {
    $this->info=$info;
  }
}