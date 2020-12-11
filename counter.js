var app = angular.module('rollingCounterApp', [])
.controller('FiveDayCtrl', function ($scope) {
  var that = this;
  $scope.date = new Date();
  $scope.roundtrips = 1;
  this.trades = [];
  this.alertType = function() {
    var counter = that.roundtripsLeft();
    switch (counter) {
      case 3:
        return 'alert-success';
      case 2:
        return 'alert-info';
      case 1:
        return 'alert-warning';
      default:
        return 'alert-danger';
    }
  }
  this.roundtripsLeft = function() {
    var counter = 0;
    for (i in that.trades) {
      if (moment(that.trades[i].date) >= moment().subtract(5,'days')) {
        counter += that.trades[i].roundtrips;
      }
    }
    return counter < 3 ? 3-counter : 0;
  };
  this.add = function() {
    if (!moment($scope.date).isValid()) {
      return;
    }
    for (i in that.trades) {
      console.log(that.trades[i].date);
      if (that.trades[i].date === $scope.date) {
        that.trades[i].roundtrips += $scope.roundtrips;
        return;
      }
    }
    that.trades.push({'date':$scope.date, 'roundtrips':$scope.roundtrips});
  };
});
