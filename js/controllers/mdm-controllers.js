/** MDM Controllers **/
angular.module('mdmUI.controllers', ['mdmUI.services','ngTable','ngTableExport'])

    .controller('dashboard', function ($scope, $http,ngTableParams,$filter) {
        $scope.showTable=false
        $scope.click =  function(value)
        {
            $http.get("locations.json")
                .success(function(data) {
                    $scope.showTable=true
                    $scope.entities = data;
                    $scope.keys = Object.keys($scope.entities[0]);
                    columns=[]
                    for(var key in $scope.keys)
                    {   
                        field=$scope.keys[key]

                        row={"title":field,"field":field,"visible":true,"sortable":field,"filter":{}}
                        row["filter"][field]="text"
                        console.log(row)
                        columns.push(row);
                    }

                    $scope.columns=columns
                    
                    $scope.title = "All " + value;
                    
                    $scope.tableParams = new ngTableParams({
                        page: 1,            // show first page
                        count: 10,           // count per page
                        filter:{}
                    }, {
                        total: $scope.entities.length, // length of data
                        getData: function($defer, params) {
                            
                            var orderedData = params.sorting() ?
                                                $filter('orderBy')($scope.entities, params.orderBy()) :
                                                $scope.entities;
                            var filterData=params.filter()?
                                                $filter('filter')($scope.entities, params.filter()) :
                                                $scope.entities;

                           
                            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                        }
                    });
                    
                });
            
        };
    })
    
;
