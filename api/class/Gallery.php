<?php
include_once 'Entity.php';
include_once 'Image.php';
/**
 *
 */
class Gallery extends Entity
{

  private $title;
  protected $keys = ["id", "title"];

  public function getTitle()
  {
    return $this->title;
  }

  public function setTitle(string $title)
  {
    $this->title = $title;
  }

  public function zipImages(array $images)
  {
    try {
      $zip = new ZipArchive();
      $zipName = "../gallery/" . $this->getId() . "/export.zip";
      $tmp = fopen($zipName,"w");
      fclose($tmp);
      $zip->open($zipName, ZipArchive::OVERWRITE);
      $this->fillZip($zip, $images);
      $zip->close();
      return true;
    } catch (Exception $ex) {
      return false;
    }
  }

  private function fillZip($zip, $images)
  {
    $galerieName = str_replace('/', '_', $this->getTitle());
    foreach ($images as $key => $image) {
      $zip->addFromString(
        basename($galerieName . '_' . $key . '.' . array_pop(explode('.', $image->getFile()))),
        file_get_contents('../' . $image->getFile())
      );
    }
  }
}
