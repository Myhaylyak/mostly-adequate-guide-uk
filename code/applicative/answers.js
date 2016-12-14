var
  Support     = require('../support'),
  IO          = Support.IO,
  Maybe       = Support.Maybe,
  liftA2      = Support.liftA2,
  Task        = require('data.task'),
  _           = require('ramda');

//-- Exercise 1 -------------------------------------------------------
// Write a function that add's two possibly null numbers together using `Maybe` and `ap`
var ex1 = function(x,y) {
  return Maybe
    .of(_.add)
    .ap(Maybe.of(x))
    .ap(Maybe.of(y));
}


//-- Exercise 2 -------------------------------------------------------
// Now write a function that takes 2 Maybe's and adds them. Use `liftA2` instead of `ap`.
var ex2 = liftA2(_.add);


//-- Exercise 3 -------------------------------------------------------
// Run both `getPost(n)` and `getComments(n)` then render the page with both. (the n arg is arbitrary)
var
  getPost     = Support.getPost,
  getComments = Support.getComments,
  mkComments  = _.reduce(function(acc,c){ return acc+'<li>'+c.body+'</li>' }, ''),
  render      = _.curry(function(p,cs) { return '<div>'+p.title+'</div>'+mkComments(cs); });

var ex3 =
  Task
    .of(render)
    .ap(getPost(2))
    .ap(getComments(2));
// or
var ex3 = liftA2(render,getPost(2),getComments(2));


//-- Exercise 4 -------------------------------------------------------
// Write an IO that gets both player1 and player2 from the cache and starts the game
var
  game         = _.curry(function(p1,p2) { return p1+' vs '+p2; });
  localStorage = {player1: "toby", player2: "sally"},
  getCache = function(x) {
    return new IO(function() { return localStorage[x]; });
  };

var ex4 = liftA2(game, getCache('player1'), getCache('player2'));


//-- Exports ----------------------------------------------------------
module.exports = {ex1:ex1,ex2:ex2,ex3:ex3,ex4:ex4}