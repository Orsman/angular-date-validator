(function() {
  'use strict';

  angular.module('app', []);

  angular
    .module('app')
    .controller('AppCtrl', AppCtrl);

  function AppCtrl() {
    var vm = this;

    vm.date = '';

  }

})();


