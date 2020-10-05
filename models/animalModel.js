const sql = require('../database')

const Animal = (animal) => {
    this.espece = animal.espece
    this.sexe = animal.sexe
    this.date_naissance = animal.date_naissance
    this.nom = animal.nom
    this.commentaires = animal.commentaires
}


Animal.create = (newAnimal, result) => {
    sql.query("INSERT INTO animal SET ? ", newAnimal, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(err, null)
            return
        }

        console.log("Created animal: ", { id: res.insertId, ...newAnimal})
        result(null, { id: res.insertId, ...newAnimal})
    }
    )
}

Animal.findById = (animalId, result) => {
    sql.query(`SELECT * FROM animal WHERE id = ${animalId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found animal: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found animal with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  Animal.getAll = result => {
    sql.query("SELECT * FROM animal", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("aniaml: ", res);
      result(null, res);
    });
  };
  
  Animal.updateById = (id, animal, result) => {
    sql.query(
      "UPDATE animal SET email = ?, name = ?, active = ? WHERE id = ?",
      [animal.email, animal.name, animal.active, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found animal with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated animal: ", { id: id, ...animal });
        result(null, { id: id, ...animal });
      }
    );
  };
  
  Animal.remove = (id, result) => {
    sql.query("DELETE FROM animal WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found animal with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted animal with id: ", id);
      result(null, res);
    });
  };
  
  Animal.removeAll = result => {
    sql.query("DELETE FROM animal", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} animal`);
      result(null, res);
    });
  };
  
  module.exports = Animal