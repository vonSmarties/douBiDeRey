<?php
include 'Entity.php';
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
    return $this->gallery;
  }

  public function setGallery(string $gallery) {
    $this->gallery=$gallery;
  }
}