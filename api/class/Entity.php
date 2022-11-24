<?php

/**
 * Classe Entity
 *
 * Classe qui défini le constructeur de toutes les classes de modèle
 */
abstract class Entity
{

  /**
   * Propriété protected integer : id
   *
   * id de l'objet dans la base de données
   */
  protected $id;

  /**
   * Propriété protected array : keys
   *
   * liste des noms des propriété de l'objet
   */
  protected $keys;

  /**
   * Constructeur
   *
   * défini tous les constructeurs
   *
   * @param void
   *
   * @return void
   */
  function __construct($values = null)
  {
    if ($values) {
      $this->hydrate($values);
    }
  }

  /**
   * fonction hydrate
   *
   * cherche une méthode set d'un modèle
   *
   * @param string nom de la données.
   *
   * @return string nom de la méthode set.
   */
  protected function hydrate(array $values)
  {
    foreach ($values as $key => $value) {
      $methodName = 'set' . ucfirst($key);
      if (method_exists($this, $methodName)) {
        $this->keys[] = $key;
        $this->$methodName($value);
      }
    }
  }

  /**
   * fonction hydrate
   *
   * cherche une méthode set d'un modèle
   *
   * @param string nom de la données.
   *
   * @return string json de l'objet.
   */
  public function getJson()
  {
    foreach ($this->keys as $key) {
      $methodName = 'get' . ucfirst($key);
      if (method_exists($this, $methodName)) {
        $json[$key] = $this->$methodName();
      }
    }
    return $json;
  }

  /**
   * fonction getId
   *
   * la fonction get de la propriété id
   *
   * @param void
   *
   * @return integer id de l'entity.
   */
  public function getId()
  {
    return $this->id;
  }

  /**
   * fonction setId
   *
   * la fonction set de la propriété id
   *
   * @param integer id de l'entity.
   *
   * @return void
   */
  public function setId(int $id)
  {
    $this->id = $id;
  }
}
