const express = require('express');
const app = express();
const teamRoutes = express.Router();

let Team = require('../model/Team');

// api to add team
teamRoutes.route('/add').post(function (req, res) {
  let team = new Team(req.body);
  team.save()
  .then(team => {
    res.status(200).json({'status': 'success','mssg': 'team added successfully'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get teams
teamRoutes.route('/').get(function (req, res) {
  Team.find(function (err, teams){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','teams': teams});
    }
  });
});

// api to get team
teamRoutes.route('/team/:id').get(function (req, res) {
  let id = req.params.id;
  Team.findById(id, function (err, team){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','team': team});
    }
  });
});

// api to update route
teamRoutes.route('/update/:id').put(function (req, res) {
    Team.findById(req.params.id, function(err, team) {
    if (!team){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        team.name = req.body.name;
        team.country = req.body.country;
        team.foundation = req.body.foundation;
        team.titles_count = req.body.titles_count;

        team.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
teamRoutes.route('/delete/:id').delete(function (req, res) {
  Team.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = teamRoutes;