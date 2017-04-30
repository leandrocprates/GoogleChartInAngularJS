/**
 *DashBoard Controller 
 */

//carrega pacote de graficos 
google.load('visualization', '1', {
    packages: ['corechart', 'bar']
});



var app = angular.module('mainApp', []);

app.controller('dashboardController',function($scope, $http){

        var dadosDeConsumoPorUsuario;
        var dadosDeConsumoPorMes;
        var dadosAuditoriaRecorrente;


        /***************************************************
         *                                
         * Grafico de Consumo Por Mes
         ***************************************************/


        $scope.getConsumoPorMes = function(){

            $http.get('./rest/dashboard/usuarios/consumoMensal')
            .success(function(data){
                    console.log('Consumo Mensal Json : ');
                    console.log(data)
                    dadosDeConsumoPorMes = data;
                    $scope.carregaGraficoConsumoPorMes();
            }).error(function(data){
                    console.log('Erro no Servidor' + data);
            });
            
        };
    
        $scope.carregaGraficoConsumoPorMes = function(){
            
            
            var data = new  google.visualization.DataTable(
                dadosDeConsumoPorMes
            );
            
            var options = {
              hAxis: {title: 'Mês',  titleTextStyle: {color: '#333'}},
              vAxis: {minValue: 0},
              legend: {position: 'none'}
            };

            //instancia o grafico e substitui a div "chartPerMonth" presente em dashboard.html 
            //pelo grafico 
            var chart = new google.visualization.AreaChart(document.getElementById('chartPerMonth'));
            chart.draw(data, options);
            
        };
        
        
        $scope.getConsumoPorMes();
        

        /***************************************************
         *                                
         * Grafico de Consumo Por Usuario
         ***************************************************/

        $scope.getConsumoPorUsuario = function(){

            $http.get('./rest/dashboard/usuarios/consumo')
            .success(function(data){
                    console.log('Consumo Por Usuario Json : ');
                    console.log(data);
                    dadosDeConsumoPorUsuario = data;
                    $scope.carregaGraficoDeConsumoPorUsuario();
            }).error(function(data){
                    console.log('Erro no Servidor' + data);
            });
            
        };

        $scope.carregaGraficoDeConsumoPorUsuario = function(){
            
            console.log("Apos busca :"+dadosDeConsumoPorUsuario);
            
            var data = new  google.visualization.DataTable(
                dadosDeConsumoPorUsuario
            );

            var options = {
              hAxis: {
                title: 'Total Utilizado',
                minValue: 0
              },
              vAxis: {
                title: 'Usuarios'
              },
              legend: {position: 'none'}

            };

            var chart = new google.visualization.BarChart(document.getElementById('chartdiv'));

            chart.draw(data, options);

        };
        
        $scope.getConsumoPorUsuario();



        /***************************************************
         *                                
         * Grafico de Auditoria mais recorrente
         ***************************************************/


        $scope.getAuditoriaMaisRecorrente = function(){

            $http.get('./rest/dashboard/usuarios/auditoriaRecorrente')
            .success(function(data){
                    console.log('Auditoria Recorrente Json : ');
                    console.log(data);
                    dadosAuditoriaRecorrente = data;
                    $scope.carregaGraficoAuditoriasMaisRecorrentes();
            }).error(function(data){
                    console.log('Erro no Servidor' + data);
            });
            
        };

        $scope.carregaGraficoAuditoriasMaisRecorrentes = function(){
            
            
            var data = new  google.visualization.DataTable(
                dadosAuditoriaRecorrente
            );
            

            var options = {
            		sliceVisibilityThreshold: 0.0,
            		
            };

            var chart = new google.visualization.PieChart(document.getElementById('chartRecurrent'));

            chart.draw(data, options);

        };
        

        $scope.getAuditoriaMaisRecorrente();


});
