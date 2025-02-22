<?php
include_once 'Manager.php';
include_once 'Attach.php';

/**
 *
 */
class AttachManager extends Manager
{

  protected $table = 'attach';
  protected $champs = [
    [
      'nom' => 'id',
      'PDO' => PDO::PARAM_INT
    ],
    [
      'nom' => 'file',
      'PDO' => PDO::PARAM_STR
    ],
    [
      'nom' => 'title',
      'PDO' => PDO::PARAM_STR
    ],
    [
      'nom' => 'info',
      'PDO' => PDO::PARAM_INT
    ]
  ];

  public function readAllInfo(int $idInfo)
  {
    $values = $this->readWhereValue($idInfo, 'info');
    $tableau = [];
    foreach ($values as $value) {
      $tableau[] = new Attach($value);
    }
    return $tableau;
  }

  public function readOneInInfo(int $idInfo)
  {
    $values = $this->readWhereValue($idInfo, 'info');
    return new Attach($values[0]);
  }

  public function read(string $file)
  {
    $values = $this->readWhereValue($file, 'file');
    if (sizeof($values) == 1) {
      return new Attach($values[0]);
    } else {
      return new Attach();
    }
  }

  public function deleteAttach(Attach $attach)
  {
    if (file_exists('../' . $attach->getFile()))
      return unlink('../' . $attach->getFile()) && $this->deleteWhereValue($attach->getFile(), "file");
    return $this->deleteWhereValue($attach->getFile(), "file");
  }

  public function deleteAttachInfo(Info $info)
  {
    $attachs = $this->readAllInfo($info->getId());

    foreach ($attachs as $attach) {
      if (!$this->deleteAttach($attach)) {
        return false;
      }
    }

    return $this->deleteWhereValue($info->getId(), "info");
  }
}

$attachManager = new AttachManager();
