var dataRender = "";
function uploadFile(fileUpload) {
    //Reference the FileUpload element.           
    //Validate whether File is valid Excel file.
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx|.csv)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();
            //For Browsers other than IE.
            if (reader.readAsBinaryString) {
                reader.onload = function (e) {
                    processExcel(e.target.result);
                };
                reader.readAsBinaryString(fileUpload.files[0]);
            } else {
                //For IE Browser.
                reader.onload = function (e) {
                    var data = "";
                    var bytes = new Uint8Array(e.target.result);
                    for (var i = 0; i < bytes.byteLength; i++) {
                        data += String.fromCharCode(bytes[i]);
                    }
                    processExcel(data);
                };
                reader.readAsArrayBuffer(fileUpload.files[0]);
            }
        } else {
            alert("This browser does not support HTML5.");
        }
    } else {
        alert("Please upload a valid Excel file.");
        $('#fileUpload').val("");
        $('#chart_title').val("");
    }   
};
function processExcel(data) {
    $("#msgHeader").show();
    dataRender = "";
    //Read the Excel File data.
    var workbook = XLSX.read(data, { type: 'binary' });
    //Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];
    //Read all rows from First Sheet into an JSON array.
     //var sCSV = XLSX.utils.make_csv(workbook.Sheets[firstSheet]);
     //alert(sCSV);
    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
    
    if (excelRows.length > 0) {
        dataRender = excelRows;
         $('#chart_title').val("");
        renderData();
    } else {
        $('#gridView .errorGrid').removeClass('noData');
        $('#fileUpload').val("");  
        $('#chart_title').val("");    
    }
};