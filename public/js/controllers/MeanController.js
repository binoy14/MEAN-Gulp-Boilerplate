'use strict';

angular.module('MeanBoilerplate')
	.controller('MeanController', function($rootScope){
		$rootScope.technologies = [
			'Mongoose',
			'Express',
			'Angular',
			'Node'
		];
	});
