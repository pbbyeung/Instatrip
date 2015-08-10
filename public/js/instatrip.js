angular.module('instatrip', [
    'ui.router',
    'instatrip.services',
    'instatrip.pics',
    'instatrip.map',
    'ngScrollable',
    ])
.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.withCredentials = true;
  $httpProvider.defaults.useXDomain = true;
}]);
