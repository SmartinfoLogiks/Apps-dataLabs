var color = ["#337E87", "#934D53", "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#ED6E76", "#337E87", "#934D53", "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#ED6E76", "#337E87", "#934D53", "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#ED6E76", "#337E87", "#934D53", "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#ED6E76", "#337E87", "#934D53", "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#ED6E76", "#337E87", "#934D53", "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#ED6E76", "#337E87", "#934D53", "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#ED6E76", "#337E87", "#934D53", "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#ED6E76", "#337E87", "#934D53", "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#ED6E76", "#337E87", "#934D53", "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#ED6E76", "#337E87", "#934D53", "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#ED6E76"];
var backgroundcolor = ["#337E87", "#934D53", "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#ED6E76", "#337E87", "#934D53", "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#ED6E76", "#337E87", "#934D53", "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#ED6E76", "#337E87", "#934D53", "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#ED6E76", "#337E87", "#934D53", "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#ED6E76", "#337E87", "#934D53", "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#ED6E76", "#337E87", "#934D53", "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#ED6E76", "#337E87", "#934D53", "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#ED6E76", "#337E87", "#934D53", "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#ED6E76", "#337E87", "#934D53", "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#ED6E76", "#337E87", "#934D53", "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#ED6E76"];
function viewBarChart(xAxisCol) {
    var chartData = [];
    var yaxis = getYaxis();

    if (yaxis) {
        chartData = getDataset(xAxisCol, yaxis);
        if (!chartData) { alert("Please select valid Datasets from Datagrid"); return false; }
        barChart(chartData);//BAR CHART
    } else {
        alert("Please select Datasets from Datagrid");
    }
}
function viewLineChart(xAxisCol) {
    var chartData = [];
    var yaxis = getYaxis();
    if (yaxis) {
        chartData = getDataset(xAxisCol, yaxis);
         console.log(yaxis);
        console.log(chartData);
        if (!chartData) { alert("Please select valid Datasets from Datagrid"); return false; }
        var fillVal = false;
        lineChart(chartData, fillVal);//LINE CHART
    } else {
        alert("Please select Datasets from Datagrid");
    }

}
function viewAreaChart(xAxisCol) {
    var chartData = [];
    var yaxis = getYaxis();
    if (yaxis) {
        chartData = getDataset(xAxisCol, yaxis);
        if (!chartData) { alert("Please select valid Datasets from Datagrid"); return false; }
        var fillVal = true;
        lineChart(chartData, fillVal);//AREA CHART
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
        pieChart(chartData);//PIE CHART
    } else {
        alert("Please select Datasets from Datagrid");
    }
}
function getYaxis() {
    yaxis = [];
    $(':checkbox:checked', "#gridView > table").each(function () {
        yaxis.push($(this).val());
    });
    if (yaxis.length > 0) {
        return yaxis;
    }
    return false;
}
function getDataset(xAxisCol, yAxisColAry) {
    var dataset = [];
    dataset['labels'] = [];
    dataset['datasets'] = [];
    var groupdata = [];
    $("#gridView > table > tbody").find('tr').each(function (column, td) {
        tr_this = this;
        //xAxisLabel = $(tr_this).find('td.' + xAxisCol).attr("data-value");
         xAxisLabel = $(tr_this).find('td.' + xAxisCol).html();
        if (xAxisLabel != undefined && xAxisLabel != null) {
            $.each(yAxisColAry, function (index, value) {             
                // yaxisVal = $(tr_this).find('td.' + value).attr("data-value");
                yaxisVal = $(tr_this).find('td.' + value).html();
                if (yaxisVal != undefined && yaxisVal != null) {
                    // console.log(yaxisVal);
                    groupdata[xAxisLabel] = groupdata[xAxisLabel] || [];
                    groupdata[xAxisLabel][value] = groupdata[xAxisLabel][value] || [];
                    groupdata[xAxisLabel][value].push(yaxisVal);
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
    var datasetValue = [];
    var j = 0;
    for (var key in datas) {
        if (datas.hasOwnProperty(key)) {
            clrval = $("#gridView > table > thead").find('th .clr' + key).val();
            datasetValue[j] = {
                label: key,
                backgroundColor: clrval,
                borderColor: clrval,
                data: datas[key]['data'],
                fill: fillStatus,
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
function barChart(datasetsData) {
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
                    }
                }]
            }
        }
    }
    chart = new Chart(popCanvas, config);
    $("#zoomg").css({"display": "block"});
}
function lineChart(datasetsData, fillVal) {
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
                    }
                }]
            }
        }
    }
    chart = new Chart(popCanvas, config);
    $("#zoomg").css({"display": "block"});
}

function pieChart(datasetsData) {
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
            // title:{
            //     display:true,
            //     text:""
            // },
            animation: {
                animateScale: true,
                animateRotate: true
            },
            tooltips: {
                mode: 'label',
                callbacks: {
                    // label: function (tooltipItem, data) {
                    //     var indice = tooltipItem.index;
                    //     return data.labels[indice] + ': ' + data.datasets[0].data[indice] + "% Devices";
                    // }
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
