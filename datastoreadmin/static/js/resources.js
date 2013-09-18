angular.module('datastoreadmin.resources', ['ngResource']).
    factory('Model', [
        '$resource',
        'AppSettings',
        function ($resource, settings) {
            return $resource(settings.resources.apiUrl + "/:model/:id/:action", {
                id: '@id',
                model: '@model'
            }, {
                describe: {
                    method: 'GET',
                    url: settings.resources.apiUrl + '/:model/:action',
                    params: {action: 'describe'}
                }
            })
        }]);
