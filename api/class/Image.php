<?php
include_once 'Entity.php';
/**
 *
 */
class Image extends Entity {

  private $file,$gallery;
  protected $keys = ["file","gallery"];

  public function getFile() {
    return $this->file;
  }

  public function setFile(string $file) {
    $this->file=$file;
  }

  public function getGallery() {
    return intval($this->gallery);
  }

  public function setGallery(int $gallery) {
    $this->gallery=$gallery;
  }
}