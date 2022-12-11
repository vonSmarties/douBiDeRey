<?php

/**
 *
 */
abstract class Manager
{

  /**
   * Proriété private string : dbInfo
   *
   * adresse et nom de la base de données
   */
  private $dbInfo = 'mysql:host=localhost;dbname=doubiderey;charset=utf8';

  /**
   * Proriété private string : dbUser
   *
   * utilisateur de la base de données
   */
  private $dbUser = 'root';

  /**
   * Proriété private string : dbMdp
   *
   * mot de passe utilisateur de la base de données
   */
  private $dbMdp = '';

  /**
   * Proriété private array<integer> : dboption
   *
   * option PDO pour le développement
   */
  private $dbOption = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);

  /**
   * Proriété protected : db, table, champs
   *
   * db objet PDO pour les requète à la base. table et champs sont définis par les managers qui héritent de Manager.
   */
  protected $db, $table, $champs;

  /**
   * Constructeur
   *
   * instanciation de la propritété db
   *
   * @param void
   *
   * @return void
   */
  public function __construct()
  {
    $this->db = new PDO($this->dbInfo, $this->dbUser, $this->dbMdp, $this->dbOption);
  }

  /**
   * fonction public : create
   *
   * Ajout d'une Entity dans la base de données
   *
   * @param Entity entity type défini par les managers enfants
   *
   * @return void
   */
  public function create(Entity $entity)
  {

    $champs = $this->strWithoutIdChamps();
    $noms = $champs['noms'];
    $values = $champs['values'];

    $sql = 'INSERT INTO ' . $this->table . " ($noms) VALUES ($values)";
    $req = $this->db->prepare($sql);
    $this->bindvaluesPDO($req, $entity);
    $req->execute();

    $id = $this->db->lastInsertId();
    $entity->setId($id);
  }

  /**
   * fonction public : readWhereValue
   *
   * lecture des données d'une ou plusieurs Entities à partir d'une valeur d'un des champs d'une des table de la base de donnée.
   *
   * @param any valeur du champ de la table choisi.
   * @param string nom du champ de la table choisi.
   *
   * @return array<any> données d'une ou plusieurs Entities retournées par la requète SQL
   */
  public function readWhereValue($value, string $champ)
  {

    $sql = 'SELECT * FROM ' . $this->table . ' WHERE ' . $this->condition($champ);

    $req = $this->db->prepare($sql);
    $this->bindValue($req, $value, $champ);
    $req->execute();
    $values = $req->fetchAll(PDO::FETCH_ASSOC);
    if ($values) {
      return $values;
    } else {
      return [];
    }
  }

  /**
   * fonction public : readWithOrder
   *
   * lecture des données d'une ou plusieurs Entities et ordonnées à partir d'une valeur d'un des champs d'une des table de la base de donnée.
   *
   * @param string nom du champ de la table choisi.
   * @param int nb de résultats retournés.
   * @param string direction de l'ordre.
   *
   * @return array<any> données d'une ou plusieurs Entities retournées par la requète SQL
   */
  public function readWithOrder(string $champ, string $direction = "ASC", ?int $limit)
  {

    $sql = 'SELECT * FROM ' . $this->table . ' ORDER BY ' . $champ . ' ' . $direction;
    if($direction){
      $sql .= ' LIMIT ' . $limit;
    }
    $req = $this->db->prepare($sql);
    $req->execute();
    $values = $req->fetchAll(PDO::FETCH_ASSOC);
    if ($values) {
      return $values;
    } else {
      return [];
    }
  }

  /**
   * fonction public : readAll
   *
   * retourne toutes les données d'une table
   *
   * @param void
   *
   * @return array<any> données de la table choisi
   */
  public function readAll()
  {

    $sql = 'SELECT * FROM ' . $this->table;

    $req = $this->db->prepare($sql);
    $req->execute();
    $values = $req->fetchALL(PDO::FETCH_ASSOC);
    if ($values) {
      return $values;
    } else {
      return [];
    }
  }

  /**
   * fonction public : update
   *
   * met à jour les données d'une Entity
   *
   * @param Entity type défini par les manager enfant
   *
   * @return void
   */
  public function update(Entity $entity)
  {

    $update = $this->lierChampsValuesPDO($entity);
    $sql = 'UPDATE ' . $this->table . " SET $update WHERE " . $this->condition('id');

    $req = $this->db->prepare($sql);
    $this->bindValue($req, $entity->getId(), 'id');
    $this->bindvaluesPDO($req, $entity);
    $req->execute();
  }

  /**
   * fonction public : delete
   *
   * supprime les données d'une Entity
   *
   * @param Entity type défini par les manager enfant
   *
   * @return void
   */
  public function delete(Entity $entity)
  {

    $sql = 'DELETE FROM ' . $this->table . ' WHERE ' . $this->condition('id');

    $req = $this->db->prepare($sql);
    $this->bindValue($req, $entity->getId(), 'id');
    $req->execute();
  }

  /**
   * fonction public : delete
   *
   * supprime les données d'une ou plusieurs Entities en fonction d'un champ 
   *
   * @param any valeur du champ de la table choisi.
   * @param string nom du champ de la table choisi.
   *   *
   * @return void
   */
  public function deleteWhereValue($value, string $champ)
  {

    $sql = 'DELETE FROM ' . $this->table . ' WHERE ' . $this->condition($champ);

    $req = $this->db->prepare($sql);
    $this->bindValue($req, $value, $champ);
    $req->execute();
  }

  /**
   * fonction private : strWithoutIdChamps
   *
   * met en forme les noms des champs et les variable PDO pour la requète SQL de création d'une Entity
   *
   * @param void
   *
   * @return array<string> tableau de deux ligne contenant le nom des champs et les variable PDO formaté pour la requète SQL
   */
  private function strWithoutIdChamps()
  {
    $champs = array_slice($this->champs, 1);
    $noms = [];
    $values = [];
    foreach ($champs as $champ) {
      $noms[] = $champ['nom'];
      $values[] = ':' . $champ['nom'];
    }
    return [
      'noms' => implode(',', $noms),
      'values' => implode(',', $values)
    ];
  }

  /**
   * fonction private : condition
   *
   * ecris la condition de la requète SQL à partir d'un champ
   *
   * @param string nom du champ de la condition
   *
   * @return array<string> condition formmater pour la requète
   */
  private function condition($champ)
  {
    return $champ . '=:' . $champ;
  }

  /**
   * fonction private : lierChampsValuesPDO
   *
   * met en forme les noms des champs et les variable PDO pour la requète SQL de update d'une Entity
   *
   * @param void
   *
   * @return string syntaxe du set de la requète SQL d'update
   */
  private function lierChampsValuesPDO(Entity $entity)
  {
    $return = '';
    foreach ($this->champs as $champ) {
      $methodName = 'get' . ucfirst($champ['nom']);
      if (method_exists($entity, $methodName)) {
        $value = $entity->$methodName();
        if (isset($value)) {
          $return .= $champ['nom'] . '=:' . $champ['nom'] . ',';
        }
      }
    }
    return substr($return, 0, -1);
  }

  /**
   * fonction protected : bindValue
   *
   * automatise le bindValue de l'objet PDO pour une seule valeur
   *
   * @param PDO requète SQL dont on doit lier la variable PDO à sa valeur
   * @param any valeur à attribuer à la variable PDO
   * @param string nom du champ dans la base de données
   *
   * @return void
   */
  protected function bindValue($req, $value, $type)
  {
    foreach ($this->champs as $key => $champ) {
      if ($champ['nom'] == $type) {
        $req->bindValue(':' . $champ['nom'], $value, $champ['PDO']);
      }
    }
  }

  /**
   * fonction protected : bindValuesPDO
   *
   * automatise le bindValue de l'objet PDO pour toutes les valeurs exceptées l'ID
   *
   * @param PDO requète SQL dont on doit lier les variable PDO à leurs valeurs
   * @param Entity type déterminé par les managers enfants
   *
   * @return void
   */
  protected function bindvaluesPDO($req, Entity $entity)
  {
    $champs = array_slice($this->champs, 1);
    foreach ($champs as  $champ) {
      $methodName = 'get' . ucfirst($champ['nom']);
      if (method_exists($entity, $methodName)) {
        $value = $entity->$methodName();
        if (isset($value)) {
          $req->bindValue(':' . $champ['nom'], $value, $champ['PDO']);
        }
      }
    }
  }
}
