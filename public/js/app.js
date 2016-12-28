var app = angular.module('sampleApp', ['ngRoute', 'appRoutes', 'MainCtrl', 'xeditable', 'angular-clipboard', 'hljs']);
app.run(function(editableOptions) {
	editableOptions.theme = 'bs3';
});