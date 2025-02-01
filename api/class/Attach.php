<?php
include_once 'Entity.php';
/**
 *
 */
class Attach extends Entity {

  private $file,$info;
  protected $keys = ["file","info"];

  public function getFile() {
    return $this->file;
  }

  public function setFile(string $file) {
    $this->file=$file;
  }

  public function getInfo() {
    return intval($this->info);
  }

  public function setInfo(int $info) {
    $this->info=$info;
  }
}