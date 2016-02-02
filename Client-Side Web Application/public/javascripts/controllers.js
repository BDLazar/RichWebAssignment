/*Master*/
angular.module('myFirstApp').controller('MasterCtrl', [
  '$http',
  '$scope',
  '$rootScope',
  '$auth',
  'Account',
  '$mdToast',
  '$animate',
  '$mdUtil',
  '$window',
  function($http, $scope, $rootScope, $auth, Account, $mdToast, $animate, $mdUtil, $window) {

    $rootScope.title = "Tic Tac Toe";
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
    $scope.getProfile = function() {
      Account.getProfile()
        .success(function(data) {
          $rootScope.user = data;
        })
        .error(function(error) {
          console.log(error);
        });

    };
    $scope.getProfile();

    $scope.toastPosition = {
      bottom: true,
      top: false,
      left: true,
      right: false
    };
    $scope.getToastPosition = function() {
      return Object.keys($scope.toastPosition)
        .filter(function(pos) {
          return $scope.toastPosition[pos];
        })
        .join(' ');
    };
    $scope.showSignOutToast = function() {
      $mdToast.show({
        templateUrl: 'static/views/toast-template-signout.html',
        hideDelay: 3000,
        position: $scope.getToastPosition()
      });
    };

    $scope.signOut = function() {
      if (!$auth.isAuthenticated()) {
        return;
      }
      $auth.logout()
        .then(function() {
          $scope.showSignOutToast();
        });
    };
  }
]);

/*Index*/
angular.module('myFirstApp').controller('IndexCtrl', [
  '$scope',
  '$http',
  '$rootScope',
  '$auth',
  'Account',
  '$state',
  '$timeout',
  '$mdToast',
  '$animate',
  'socketio',
  function($scope, $http, $rootScope, $auth, Account, $state, $timeout, $mdToast, $animate, socketio) {
    $rootScope.title = "Tic Tac Toe";
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
    $scope.getProfile = function() {
      Account.getProfile()
        .success(function(data) {
          $rootScope.user = data;
          $scope.history = data.game_history;
        })
        .error(function(error) {
          console.log(error);
        });
    };
    $scope.getProfile();
      $scope.toastPosition = {
        bottom: true,
        top: false,
        left: true,
        right: false
      };
      $scope.getToastPosition = function() {
        return Object.keys($scope.toastPosition)
          .filter(function(pos) {
            return $scope.toastPosition[pos];
          })
          .join(' ');
      };

  }
]);

/*Login*/
angular.module('myFirstApp').controller('SignInCtrl', [
  '$scope',
  '$http',
  '$rootScope',
  '$auth',
  '$mdToast',
  '$animate',
  function($scope, $http, $rootScope, $auth, $mdToast, $animate) {
    $rootScope.title = 'Tic Tac Toe';
    $scope.toastPosition = {
      bottom: true,
      top: false,
      left: true,
      right: false
    };
    $scope.getToastPosition = function() {
      return Object.keys($scope.toastPosition)
        .filter(function(pos) {
          return $scope.toastPosition[pos];
        })
        .join(' ');
    };
    $scope.showSignInToastSuccess = function() {
      $mdToast.show({
        templateUrl: 'static/views/toast-template-signin-success.html',
        hideDelay: 3000,
        position: $scope.getToastPosition()
      });
    };
    $scope.showSignInToastError = function() {
      $mdToast.show({
        templateUrl: 'static/views/toast-template-signin-error.html',
        hideDelay: 3000,
        position: $scope.getToastPosition()
      });
    };
    $scope.login = function() {
      $auth.login({
          userName: $scope.userName,
          password: $scope.password,
          signedMeIn: $scope.signedMeIn
        })
        .then(function() {
          $scope.showSignInToastSuccess();
        })
        .catch(function(response) {
          $scope.showSignInToastError();
        });
    };
  }
]);

/*Register*/
angular.module('myFirstApp').controller('SignUpCtrl', [
  '$scope',
  '$http',
  '$rootScope',
  '$auth',
  '$mdToast',
  '$animate',
  '$state',
  function($scope, $http, $rootScope, $auth, $mdToast, $animate, $state) {
    $rootScope.title = 'Tic Tac Toe';
    $scope.toastPosition = {
      bottom: true,
      top: false,
      left: true,
      right: false
    };
    $scope.getToastPosition = function() {
      return Object.keys($scope.toastPosition)
        .filter(function(pos) {
          return $scope.toastPosition[pos];
        })
        .join(' ');
    };
    $scope.showSignUpToast = function() {
      $mdToast.show({
        templateUrl: 'static/views/toast-template-signup.html',
        hideDelay: 3000,
        position: $scope.getToastPosition()
      });
    };
    $scope.signup = function() {
      $auth.signup({
        userName: $scope.userName,
        aboutYou: $scope.aboutYou,
        password: $scope.password
      }).catch(function(response) {
        if (typeof response.data.message === 'object') {
          angular.forEach(response.data.message, function(message) {
            alert(message[0]);
          });
        } else {
          $scope.showSignUpToast();
        }
      });
    };
  }
]);

/*Games*/
angular.module('myFirstApp').controller('GamesCtrl', [
  '$scope',
  '$http',
  '$rootScope',
  '$auth',
  'Account',
  '$state',
  '$timeout',
  '$mdToast',
  '$animate',
  'socketio',
  function($scope, $http, $rootScope, $auth, Account, $state, $timeout, $mdToast, $animate, socketio) {
    $rootScope.title = "Tic Tac Toe";
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
    Account.getGame()
      .success(function(data) {
        $rootScope.user = data;
      })
      .error(function(error) {
        console.log(error);
      });

    $scope.toastPosition = {
      bottom: true,
      top: false,
      left: true,
      right: false
    };
    $scope.getToastPosition = function() {
      return Object.keys($scope.toastPosition)
        .filter(function(pos) {
          return $scope.toastPosition[pos];
        })
        .join(' ');
    };
    $scope.showGamesNotYourTurnToast = function() {
      $mdToast.show({
        templateUrl: 'static/views/toast-template-games-not-your-turn.html',
        hideDelay: 3000,
        position: $scope.getToastPosition()
      });
    };
  $scope.matched = 0;
  
// Starting the socket
socketio.on('rdyPlayers',function(players){
//player matched 
 if(players !== null){
    $scope.matched = 1;
    // 2D array board
     $scope.board = [
					//0,0                        0,1                   0,2
       [ { value: emptyCell, id:0 }, { value: emptyCell, id:1 }, { value: emptyCell, id:2 } ],
					//1,0                        1,1                   1,2
       [ { value: emptyCell, id:3 }, { value: emptyCell, id:4 }, { value: emptyCell, id:5 } ],
					//2,0                        2,1                   2,2
       [ { value: emptyCell, id:6 }, { value: emptyCell, id:7 }, { value: emptyCell, id:8 } ]
     ];
     $scope.currentPlayer = {};
     var emptyCell = '';
     $scope.move = function(cell) {
       // define cell value for each player
        if( $rootScope.user.user_name ===  players.currentPlayer){
          cell.value = players.player1Value;
        }else{
           cell.value = players.player2Value;
        }
        // check whether each moves is correct
       if($scope.currentPlayer.Name === $rootScope.user.user_name){
         //correct move
         if (isEndGame() === false) {
			/*if($scope.currentPlayer.Name === players.player1)
			{
				$scope.currentPlayer.Name = players.player2;
			}
			else
			{
				$scope.currentPlayer.Name = players.player1;
			}
			*/
           $scope.currentPlayer.Name = $scope.currentPlayer.Name === players.player1 ? players.player2: players.player1;

            // inform  the two players who is the next to go
           socketio.emit('PlayerTurn',{current: $scope.currentPlayer.Name});
            // disabled button
           socketio.emit('PlayerButtonDisabled',cell);
         }

          if($scope.winner === true){
             // game over inform the two player and show winner
             socketio.emit('GameOver',$scope.currentPlayer.Name);
           }

          if($scope.cat === true){
             // game over inform the two players and show tie
             socketio.emit('GameOverCat',$scope.currentPlayer.Name);
           }

       }else{
         //incorrect move
        $scope.showGamesNotYourTurnToast();
        cell.value = emptyCell;
       }
     };

     $scope.newGame = function() {
       //initial winner to false
       $scope.winner = false;
       //initial tie to false
       $scope.cat = false;
       //initial for all player
       $scope.currentPlayer.Name = players.currentPlayer;
       //initial winner  disabled to false
       $scope.winnerDisabled = function(){
         return false;
       };
       //reset all cell to ''
       _.each($scope.board, function(row) {
         _.each(row, function(cell) {
           // set cell. value to emptyCell which is ''
           cell.value = emptyCell;
         });
       });
       socketio.on('PlayerButtonDisabledEmit', function(data){
         // disabled button
         //data show the value and the hashkey being clicked
          $scope.isTaken = function(cell) {
            if(cell.id === data.id){
              cell.value = data.value;
              return data.value !== emptyCell;
            }
            return cell.value !== emptyCell;
          };
       });
       socketio.on('PlayerTurnEmit', function(data){
         $scope.currentPlayer.Name = data.current;
       });
       socketio.on('GameOverCatEmit',function(data){
         $scope.winnerDisabled = function(){
           return true;
         };
         //restart game
         $timeout(function() {
           $state.go('home');
         }, 3000);
           $scope.cat = true;
             var OpCat = $rootScope.user.user_name === players.player1 ? players.player2 : players.player1;
             var resultCat = {
               opponent : OpCat,
               won : 0,
               lost: 0,
               cat: 1,
               result:"Cat"
             };
             //update database
             Account.gameOver(resultCat)
               .success(function(data) {
                 $rootScope.user = data;
               })
               .error(function(error) {
                 alert("Error: "+error);
               });

       });

       socketio.on('GameOverEmit',function(data){
         $scope.winnerDisabled = function(){
           return true;
         };
         //restart game
         $timeout(function() {
           $state.go('home');
         }, 3000);

        $scope.winner = true;
         if(data === $rootScope.user.user_name){
           var OpWon = $rootScope.user.user_name === players.player1 ? players.player2 : players.player1;
           var resultWon = {
             opponent : OpWon,
             won : 1,
             lost: 0,
             cat: 0,
             result:"Won"
           };
           //update database
           Account.gameOver(resultWon)
             .success(function(data) {
               $rootScope.user = data;
             })
             .error(function(error) {
               alert("Error: "+error);
             });

         }else{
           var OpLose = $rootScope.user.user_name === players.player1 ? players.player2 : players.player1;
           var resultLose = {
             opponent :OpLose,
             won : 0,
             lost: 1,
             cat: 0,
             result:"Lost"
           };
           //update database
           Account.gameOver(resultLose)
             .success(function(data) {
               $rootScope.user = data;
             })
             .error(function(error) {
               alert("Error: "+error);
             });
         }
      });
     };
   //first load
     $scope.newGame();

     var checkMatch = function(cell1, cell2, cell3) {
       return cell1.value === cell2.value &&
              cell1.value === cell3.value &&
              cell1.value !== emptyCell;
     };
     var isEndGame = function() {
       var rowMatch = _.reduce([0, 1, 2], function(memo, row) {
         //return false if nth match
         //if match return true
         return memo || checkMatch($scope.board[row][0], $scope.board[row][1], $scope.board[row][2]);
       }, false);
       //false is the default value
       var columnMatch = _.reduce([0, 1, 2], function(memo, col) {
         return memo || checkMatch($scope.board[0][col], $scope.board[1][col], $scope.board[2][col]);
       }, false);

       var diagonalMatch = checkMatch($scope.board[0][0], $scope.board[1][1], $scope.board[2][2]) ||
                           checkMatch($scope.board[0][2], $scope.board[1][1], $scope.board[2][0]);
      // check for normal win
       $scope.winner = rowMatch || columnMatch || diagonalMatch;
       // check for tie game
         if(!$scope.winner){
           $scope.cat = true;
           $scope.cat = _.reduce(_.flatten($scope.board), function(memo, cell) {
             return memo && cell.value !== emptyCell;
           }, true);
         }

       return $scope.winner || $scope.cat;
     };

 }else{
   $scope.matched = 0;
 }
//end socket
});

//destroy the socket to avoid stacking up
$scope.$on('$destroy', function (event) {
  socketio.getSocket().removeAllListeners();
});

}]);

/*Users*/
angular.module('myFirstApp').controller('UsersCtrl', [
  '$scope',
  '$http',
  '$rootScope',
  '$auth',
  'Account',
  '$state',
  '$timeout',
  '$mdToast',
  '$animate',
  'socketio',
  function($scope, $http, $rootScope, $auth, Account, $state, $timeout, $mdToast, $animate, socketio) {
    $rootScope.title = "Tic Tac Toe";
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
    Account.getProfile()
      .success(function(data) {
        $rootScope.user = data;
      })
      .error(function(error) {
        console.log(error);
      });

      Account.getUsers()
        .success(function(data) {
          $scope.usersData = data;
        })
        .error(function(error) {
          console.log(error);
        });
  }
]);
