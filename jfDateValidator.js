
(function() {
  'use strict';

  angular
    .module('app')
    .directive('jfDateValidator', jfDateValidator);

  function jfDateValidator() {

    var directive = {
      restrict: 'A',
      require: 'ngModel',
      link: link
    };

    return directive;

    //////////////////////////////////////////////////////////

    // Check if the date is a valid date
    // valid if empty. ng-required will take care of that
    function _validDate(val) {
      if (val === null || val === undefined || val.length === 0) {
        return true;
      }
      return /(\d{4})\-\d\d\-\d\d/.test(val);
    }

    function _hasTextSelected(target) {
      if ((target.prop('selectionStart') !== null) && target.prop('selectionStart') !== target.prop('selectionEnd')) {
        return true;
      }
      return false;
    }

    function _formatDate(e) {
      var target, oldVal, newVal;
      var digit = String.fromCharCode(e.which);

      // Grab the input field so we can add the number into it
      target = e.currentTarget;
      oldVal = target.value;
      newVal = target.value + digit;

      // Enable edit when text is selected
      // if (_hasTextSelected(target)) {
      //   return;
      // }

      // Only allow 8 numbers (yyyy-mm-dd)
      if (newVal.replace(/\D/g, '').length > 8) {
        e.preventDefault();
        return;
      }

      // Add '-'
      if (newVal.length === 4 || newVal.length === 7) {
        e.preventDefault();
        target.value = '' + newVal + '-';
      }

      // Special case if user have deleted a '-' and adds a number
      // where there should be a '-'.
      //  && /d+$/.test(newVal)
      if ((newVal.length === 5 || newVal.length === 8)) {
        e.preventDefault();
        target.value = oldVal + '-' + digit;
      }
    }

    function _formatBackDate(e) {
      var target = e.currentTarget;
      var value = target.value;

      // Only do something when user presses backspace
      if (e.which !== 8) {
        return;
      }

      // if ((target.prop('selectionStart') !== null) && target.prop('selectionStart') !== value.length) {
      //   return;
      // }

      // If the last character is a digit and dash or just a digit. Delete it.
      // ngModel listens for 'input' event, after deleting trigger that event after setting the value.
      if (/\D\d$/.test(value)) {
        e.preventDefault();
        target.value = value.replace(/\D\d$/, '');
        //target.trigger('input');
      }
      else if (/\d$/.test(value)) {
        e.preventDefault();
        target.value = value.replace(/\d$/, '');
        //target.trigger('input');
      }
    }

    function link(scope, elem, attr, ctrl) {

      // Set up a event listener to the keyboard and depending
      // of what key user pressed we should do different actions.
      elem[0].addEventListener('keydown', function(e) {
        var digit = String.fromCharCode(e.which);

        // User pressed a number
        if (/\d$/.test(digit)) {
          _formatDate(e);
        }

        // User pressed "backspace"
        else if (e.which === 8) {
          _formatBackDate(e);
        }

      });

      var validateFn = function(val) {
        var valid = _validDate(val);

        ctrl.$setValidity('date', valid);
        return valid ? val : undefined;
      };

      ctrl.$parsers.push(validateFn);
      ctrl.$formatters.push(validateFn);
    }

  }

})();