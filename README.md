### Angular Date Validator

Created a custom type of input field that will only allow numbers and will validate the input-field to a string in the format of "YYYY-MM-DD".

#####Usage:
````html
  <input type="text" ng-model="date" jf-date-validator>
````


#####TODO:
- make sure only number a being added. (currently - and ' can be added).
- set up trigger event for "input".
- bring back selection.
- possibility to select the year and type in a new one. now there is a '-' added.