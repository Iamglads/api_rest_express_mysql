const Animal = require("../models/animalModel");
const log = console.log;

exports.create = (req, res) => {
  // Validate request

  if (!req.body) {
    res.status(400).json(log("Content can not be empty!"));
  }

  // Creer un animal

  const animal = new Animal({
    espece: req.body.espece,
    sexe: req.body.sexe,
    nom: req.body.nom,
    commentaires: req.body.commentaires,
    date_naissance: req.body.date_naissance,
  });

  // save ne animal in the database

  Animal.create(animal, (err, data) => {
    if (err)
      res
        .status(500)
        .send(
          err.message ||
            "Une erreur s'est produite du l'enregistrement d'un animal"
        );
    else res.status(200).send(data);
  });
};

// Recuperer la liste de tous les animaux dans la BD
exports.findAll = (req, res) => {
  Animal.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Errer produit durant la récupération des animaux!",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Animal.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Nous n'avons pas trouvé cet animal avec l'identifiant ${req.params.id}`,
        });
      } else res.status(500).send(new Error());
    } else res.status(201).send(data);
  });
};

exports.update = (req, res) => {
	// Validate Request, make sure content are not empty 

	if(!req.body) {
		res.status(400).send({ message: 'Veuillez remplir les champs'})
	}

	Animal.updateById(req.params.id, new Animal(req.Body), (err, data) => {
		if(err) {
			res.status(404).send({ message: "Not found!"})
		} else res.send(data)
	})
}

exports.delete = (req, res) => {
	Animal.remove(req.params.id, (err, data) => {
		if (err) {
		  if (err.kind === "not_found") {
			res.status(404).send({
			  message: `Not found Customer with id ${req.params.id}.`
			});
		  } else {
			res.status(500).send({
			  message: "Nous ne pouvons pas supprimer l'animal avec l'identifiant:" + req.params.customerId
			});
		  }
		} else res.send({ message: `Animal supprimé de la base de données!` });
	  });
};

exports.deleteAll = (req, res) => {
	Customer.removeAll((err, data) => {
		if (err)
		  res.status(500).send({
			message:
			  err.message || "Error"
		  });
		else res.send({ message: `Vous avez supprimé tous les animaux de la base de données` });
	  });
}
