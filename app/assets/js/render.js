var color = ["#337E87", "#934D53", "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#ED6E76", "#337E87", "#934D53", "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#ED6E76", "#337E87", "#934D53", "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#ED6E76", "#337E87", "#934D53", "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#ED6E76", "#337E87", "#934D53", "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#ED6E76", "#337E87", "#934D53", "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#ED6E76", "#337E87", "#934D53", "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#ED6E76", "#337E87", "#934D53", "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#ED6E76", "#337E87", "#934D53", "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#ED6E76", "#337E87", "#934D53", "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#ED6E76", "#337E87", "#934D53", "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#ED6E76"];
var backgroundcolor = ["#337E87", "#934D53", "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#ED6E76", "#337E87", "#934D53", "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#ED6E76", "#337E87", "#934D53", "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#ED6E76", "#337E87", "#934D53", "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#ED6E76", "#337E87", "#934D53", "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#ED6E76", "#337E87", "#934D53", "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#ED6E76", "#337E87", "#934D53", "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#ED6E76", "#337E87", "#934D53", "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#ED6E76", "#337E87", "#934D53", "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#ED6E76", "#337E87", "#934D53", "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#ED6E76", "#337E87", "#934D53", "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#ED6E76"];

function viewBarChart(xAxisCol) {
    var chartData = [];
    var yaxis = getYaxis();
    
    if (yaxis) {
        chartTitle ="";
        chartData = getDataset(xAxisCol, yaxis);
        if (!chartData) { alert("Please select valid Datasets from Datagrid"); return false; }
        chartTitle = getChartTitle(xAxisCol,yaxis);
        if($('#chart_title').val()=="" || $('#chart_title').val()==null){
            $('#chart_title').val(chartTitle);
        } else {
            chartTitle = $('#chart_title').val();
        }
        barChart(chartData,chartTitle);//BAR CHART
    } else {
        alert("Please select Datasets from Datagrid");
       
    }
}
function viewLineChart(xAxisCol) {
    var chartData = [];
    var yaxis = getYaxis();
    
    if (yaxis) {
        chartTitle ="";
        chartData = getDataset(xAxisCol, yaxis);
        if (!chartData) { alert("Please select valid Datasets from Datagrid"); return false; }
        var fillVal = false;
        chartTitle = getChartTitle(xAxisCol,yaxis);
        if($('#chart_title').val()=="" || $('#chart_title').val()==null){
            $('#chart_title').val(chartTitle);
        } else {
            chartTitle = $('#chart_title').val();
        }
        lineChart(chartData, fillVal,chartTitle);//LINE CHART
    } else {
        alert("Please select Datasets from Datagrid");
          
    }

}
function viewAreaChart(xAxisCol) {
    var chartData = [];
    var yaxis = getYaxis();
    if (yaxis) {
        chartTitle ="";
        chartData = getDataset(xAxisCol, yaxis);
        if (!chartData) { alert("Please select valid Datasets from Datagrid"); return false; }
        var fillVal = true;
        chartTitle = getChartTitle(xAxisCol,yaxis);
        if($('#chart_title').val()=="" || $('#chart_title').val()==null){
            $('#chart_title').val(chartTitle);
        } else {
            chartTitle = $('#chart_title').val();
        }
        lineChart(chartData, fillVal,chartTitle);//AREA CHART
    } else {
        alert("Please select Datasets from Datagrid");
       
    }

}
function viewPieChart(xAxisCol) {
    var chartData = [];
    var yaxis = getYaxis();

    if (yaxis) {
        chartData = getDataset(xAxisCol, yaxis);
        if (!chartData) { alert("Please select valid Datasets from Datagrid"); return false; }
        chartTitle = getChartTitle(xAxisCol,yaxis);
        if($('#chart_title').val()=="" || $('#chart_title').val()==null){
            $('#chart_title').val(chartTitle);
        } else {
            chartTitle = $('#chart_title').val();
        }
        pieChart(chartData,chartTitle);//PIE CHART
    } else {
        alert("Please select Datasets from Datagrid");
       
    }
}
function getYaxis() {
    yaxisArr = [];
    $(':checkbox:checked', "#gridView > table").each(function () {
        yaxisArr.push($(this).val());
    });
    if (yaxisArr.length > 0) {
        return yaxisArr;
    }
    return false;
}
function getDataset(xAxisCol, yAxisColAry) {
     
     if($('#y_axisinput').val() == null || $('#y_axisinput').val() == ""){
        y_axisLabel = getLabelTitle(yAxisColAry);
     } else {
        y_axisLabel = $('#y_axisinput').val();
     } 
     
    var dataset = [];
    dataset['labels'] = [];
    dataset['datasets'] = [];
    var groupdata = [];
    $("#gridView > table > tbody").find('tr').each(function (column, td) {
        tr_this = this;
        // xAxisLabel = $(tr_this).find('td.' + xAxisCol).attr("data-value");
         xAxisLabel = $(tr_this).find('td.' + xAxisCol).html();
        
        if (xAxisLabel != undefined && xAxisLabel != null) {
            $.each(yAxisColAry, function (index, value) {             
                // yaxisVal = $(tr_this).find('td.' + value).attr("data-value");

                yaxisName = $("#gridView > table > thead").find('th.' + value).attr("data-ref");

                yaxisVal = $(tr_this).find('td.' + value).html();
                if (yaxisVal != undefined && yaxisVal != null) {
                    groupdata[xAxisLabel] = groupdata[xAxisLabel] || [];
                    groupdata[xAxisLabel][yaxisName] = groupdata[xAxisLabel][yaxisName] || [];
                    groupdata[xAxisLabel][yaxisName].push(yaxisVal);
                }
            });
        }
    });
    
    for (var key in groupdata) {
        if (groupdata.hasOwnProperty(key)) {
            dataset['labels'].push(key);

            for (var k1 in groupdata[key]) {

                if (groupdata[key].hasOwnProperty(k1)) {
                    var value = 0;
                    for (var k2 in groupdata[key][k1]) {
                        if (groupdata[key][k1].hasOwnProperty(k2)) {
                            if (!isNaN(groupdata[key][k1][k2])) {
                                value += parseFloat(groupdata[key][k1][k2]);
                            }
                        }
                    }
                    dataset['datasets'][k1] = dataset['datasets'][k1] || [];
                    dataset['datasets'][k1]['data'] = dataset['datasets'][k1]['data'] || [];
                    dataset['datasets'][k1]['data'].push(value);
                }
            }
        }
    }
    
    if (dataset['labels'].length > 0) return dataset;
    else return false;
}
function designDatasets(datas, fillStatus) {
    line_thick = $('#line_thickinput').val();
    var datasetValue = [];
    var j = 0;
    for (var key in datas) {
        if (datas.hasOwnProperty(key)) {
            clrval = $("#gridView > table > thead").find('th .clr' + md5(key)).val();
            datasetValue[j] = {
                label: key,
                backgroundColor: clrval,
                borderColor: clrval,
                data: datas[key]['data'],
                fill: fillStatus,
                borderWidth: line_thick
            }
            j++;
        }
    }
    return datasetValue;
}
function designDatasetsPie(datas) {
    var datasetValue = [];
    var j = 0;
    for (var key in datas) {
        if (datas.hasOwnProperty(key)) {
            datasetValue[j] = {
                label: key,
                backgroundColor: backgroundcolor,
                data: datas[key]['data']
            }
            j++;
        }
    }
    return datasetValue;
}
function barChart(datasetsData,chartTitle) {
    //var xaxis = $("#xaxis").val();
    if($("#x_axisinput").val() == null || $("#x_axisinput").val() ==""){
        x_axisLabel = $('#xaxis option:selected').attr('data-ref');
    }  else {
        x_axisLabel = $("#x_axisinput").val();
    }
    var fillVal = true;
    var dataSets = designDatasets(datasetsData['datasets'], true);
   
    if (chart != null) {
        chart.destroy();
    }
    var popCanvas = $("#graphChart");
    var config = {
        type: 'bar',
        data:
        {
            labels: datasetsData['labels'],
            datasets: dataSets
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            title: {
                display: true,
                text: chartTitle,
            },
            tooltips: {
                mode: 'point',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    ticks: {
                        stepSize: 1,
                        autoSkip: false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: x_axisLabel
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: y_axisLabel
                    }
                }]
            }
            
        }
    }
    chart = new Chart(popCanvas, config);
    $("#zoomg").css({"display": "block"});
}
function lineChart(datasetsData, fillVal,chartTitle) {
     //var xaxis = $("#xaxis").val();
    if($("#x_axisinput").val() == null || $("#x_axisinput").val() ==""){
        x_axisLabel = $('#xaxis option:selected').attr('data-ref');
    }  else {
        x_axisLabel = $("#x_axisinput").val();
    }
    var dataSets = designDatasets(datasetsData['datasets'], fillVal);
    if (chart != null) {
        chart.destroy();
    }
    var popCanvas = $("#graphChart");
    var config = {
        type: 'line',
        data:
        {
            labels: datasetsData['labels'],
            datasets: dataSets
           
        },
        options: {
            scaleShowLabels: false,
            responsive: true,
            maintainAspectRatio: false,

            legend: {
                display: true,
                position: "bottom"
            },
            title: {
                display: true,
                text: chartTitle,
            },
            tooltips: {
                mode: 'point',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
            xAxes: [{
                ticks: {
                    stepSize: 1,
                    autoSkip: false
                },
                scaleLabel: {
                    display: true,
                    labelString: x_axisLabel
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: y_axisLabel
                }
            }]
            }
             //borderWidth: 0.5
        }
    }
    chart = new Chart(popCanvas, config);
    $("#zoomg").css({"display": "block"});
}

function pieChart(datasetsData,chartTitle) {
    var dataSets = designDatasetsPie(datasetsData['datasets']);
    if (chart != null) {
        chart.destroy();
    }
    var config = {
        type: "pie",
        data: {
            datasets: dataSets,
            labels: datasetsData['labels'],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: true,
                position: 'right',
            },
            title: {
                display: true,
                text: chartTitle,
            },
            animation: {
                animateScale: true,
                animateRotate: true
            },
            tooltips: {
                mode: 'label',
                callbacks: {
                   
                    label: function (item, data) {
                        return data.datasets[item.datasetIndex].label + ": " + data.labels[item.index] + ": " + data.datasets[item.datasetIndex].data[item.index];
                    }
                }
            },
        }
    };
    var popCanvas = $("#graphChart");
    chart = new Chart(popCanvas, config);
    $("#zoomg").css({"display": "block"});
}

function getChartTitle(x,y){
    var xval = $('#xaxis option:selected').attr('data-ref');
    yxx = "";
    $.each( y, function( key, value ) {
      $("table.t1 thead tr th").each(function(){
        yx =  $("table.t1 thead tr th."+value).attr('data-ref');
      
    });
        yxx += " "+yx + " and";
    });
    var lastIndex = yxx.lastIndexOf(" ");
    yxx = yxx.substring(0, lastIndex);
    return xval + " versus " + yxx;
}

function getLabelTitle(y){
    yxx = "";
    $.each( y, function( key, value ) {
      $("table.t1 thead tr th").each(function(){
        yx =  $("table.t1 thead tr th."+value).attr('data-ref');
    });
        yxx += " "+yx + " and";
    });
    var lastIndex = yxx.lastIndexOf(" ");
    yxx = yxx.substring(0, lastIndex);
     
    return yxx;
}
