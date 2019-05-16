var headerTableCell = [];
function renderData() {
	chartTitle ="";

	headerTableCell = [];
	if (dataRender.length > 0) {
		$.each(dataRender[0], function (i, val) {
			headerTableCell.push(i);
		});
		gridView(headerTableCell, dataRender);
	} else {
		$('#gridView .errorGrid').removeClass('noData');
	}
}
function gridView(headerData, innerData) {
	xAxisUi = "";
	htmlHeader = "<tr>";
	$.each(headerData, function (a, b) {
		if (b != undefined) {
			xAxisUi += "<option data-value='" + b + "'>" + b + "</option>";
			colorInput = "<input type='color' class='pull-right clr" + removeSpecials(b) + "'  name='clr" + removeSpecials(b) + "'>";
			checkbox = "<input type='checkbox' class='cb" + removeSpecials(b) + "' value='" + removeSpecials(b) + "' name='yaxis'>";
			//colorInput = "<input type='color' class='clr" + removeSpecials(b) + "'  name='clr" + removeSpecials(b) + "'>";
			htmlHeader += "<th data-value='" + b + "' class='" + removeSpecials(b) + "' ><label>" + checkbox + b + " " + colorInput + "</label></td>";
		}
	});
	htmlHeader += "</tr>";
	$("#gridView > table > thead").html(htmlHeader);
	$("#xaxis").html(xAxisUi);
	htmlInner = "";
	$.each(innerData, function (a, b) {
		htmlInner += "<tr>";
		$.each(b, function (a1, b1) {
			htmlInner += "<td data-value='" + b1 + "' contenteditable='true' class='" + removeSpecials(a1) + "  edittext'>" + b1 + "</td>";
		});
		htmlInner += "</tr>";
	});
	$("#gridView > table > tbody").html(htmlInner);
	$("#zoom").css({"display": "block"});
	$("#addrow").css({"display": "block"});
	$('#fileUpload').val("");
}
function removeSpecials(str) {
	string = String(str).replace(/[^a-zA-Z0-9]/g, "");
	return string;
}