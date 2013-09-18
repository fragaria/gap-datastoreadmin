angular.module('datastoreadmin.controllers', ['datastoreadmin.resources']).
    controller('ModelListController', [
        '$scope',
        '$location',
        '$routeParams',
        'Model',
        function ($scope, $location, $routeParams, Model) {
            $scope.models = Model.query();

            if (typeof $scope.model == 'undefined')
                $scope.model = null;

            $scope.selectModel = function (model) {
                $scope.model = model;
                $location.path('/' + model.resource + '/list');
            };

            $scope.isSelected = function (model) {
                return $scope.model == model;
            };
        }]).
    controller('ListController', [
        '$scope',
        '$routeParams',
        'Model',
        function ($scope, $routeParams, Model) {
//            $scope.model = {model: 'ExampleModel'};
            $scope.model = Model.describe({model: $routeParams.model});
        }]);
