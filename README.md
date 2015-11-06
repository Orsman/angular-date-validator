### Angular Date Validator

Created a custom type of input field that will only allow numbers and will validate the input-field to a string in the format of "YYYY-MM-DD".

![Screenshot](./screenshot.png?raw=true "Angular date validator")

#####Usage:
````html
  <input type="text" ng-model="date" jf-date-validator>
````

#####TODO (lazy mans issue system):
- Each new input seems to be outside the $digest-cycle
- set up trigger event for "input".
- bring back possibility to edit selection.
- possibility to select the year and type in a new one. now there is a '-' added.