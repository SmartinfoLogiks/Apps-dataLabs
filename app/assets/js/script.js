const _notestore=require("./app/assets/js/notestore.js");
const _editor=require("./app/assets/js/editor.js");
const treeUI=require("./app/assets/js/tree.js");
const eventsManager=require("./app/assets/js/events.js");

var NOTEBOOKS = {};
var NOTEACCOUNTS = {};

$(function() {
    $("body").delegate("*.actionCmd[data-cmd],*.actionCMD[data-cmd]", "click", function(e) {
    	e.preventDefault();

    	cmd = $(this).data("cmd");
    	if(cmd==null || cmd.length<=1) {
    		return;
    	}

    	if(typeof window[cmd] == "function") window[cmd](this);
    	else {
    		console.info("Action Command Not Found", cmd, this);
    	}
    });

    $("body").delegate("#noteTabBar a", "click", function(a) {
		if($(this).parent().hasClass("active")) {
			console.log("C");
		} else if($(this).attr("href")=="#tab_home") {
			showHomeTab(this);
		} else {
			openDocumentTab($(this).parent());
		}
	});

	winSize = appData.getData("WINDOW-DIMENSIONS");

	if(winSize!=null && winSize.width!=null && winSize.height!=null) {
		remote.getCurrentWindow().setSize(winSize.width,winSize.height);
	}

	$(window).resize(function() {
		appData.setData("WINDOW-DIMENSIONS",{"width":window.outerWidth,"height":window.outerHeight});
		if($("#mainBody").length>0) {
			// $("#mainBody").css("min-height",($(window).height()-$("#navbar").height()-10)+"px");
			$("#mainBody").css("height",($(window).height()-$("#navbar").height()-10)+"px");
		}
	});

	eventsManager.initEvents();

    loadNotebooks();
});

function showSidebar() {
	$("#wrapper").removeClass("nosidebar");
	$("#sidebar").show();
}
function hideSidebar() {
	$("#sidebar").hide();
	$("#wrapper").addClass("nosidebar");
}

function loadNotebooks() {
	NOTEACCOUNTS = appData.getData("NOTEACCOUNTS");
	NOTEBOOKS = appData.getData("NOTEBOOKS");

	if(NOTEACCOUNTS==null || NOTEBOOKS==null) {
		if(NOTEACCOUNTS==null) {
			NOTEACCOUNTS = {};
		}
		if(NOTEBOOKS==null) {
			NOTEBOOKS = {"local":[],"recent":[]};
		}
		saveNotebooks();
	}
}
function saveNotebooks() {
	if(NOTEBOOKS.recent.length>10) {
		NOTEBOOKS.recent=NOTEBOOKS.recent.slice(1);
	}
	appData.setData("NOTEBOOKS",NOTEBOOKS);
	appData.setData("NOTEACCOUNTS",NOTEACCOUNTS);
}


function newDocument() {
	appUI.showPrompt("New note name !!!", {}, (noteTitle) => {
		if(noteTitle) {
			noteID = "NOTE-"+deviceID+"-"+shortid.generate();
			docData = generateBlankNote();
			docData.title = noteTitle;

			appData.setData(noteID,docData);

			NOTEBOOKS.local.push({"title":noteTitle,"noteid":noteID});
			NOTEBOOKS.recent.push({"title":noteTitle,"noteid":noteID});

			saveNotebooks();

			openDocument(noteID, noteTitle);
		}
	});
}

function openDocument(noteID, noteTitle) {
	tabID = hashMD5(noteID);

	if($("#mainBody").find(".page_tabs#tab_"+tabID).length<=0) {
		_notestore.openNote(noteID, function(a) {
			//<i class='fa fa-times close-tab'></i>
			$("#noteTabBar").append("<li class='actionCMD' data-cmd='openDocumentTab' data-noteid='"+noteID+"'><a href='#tab_"+tabID+"'><i class='fa fa-file'></i> <span class='notetitle'>"+noteTitle+"</span></a></li>");
			$("#mainBody").append("<div id='tab_"+tabID+"' class='page_tabs' data-noteid='"+noteID+"'></div>");

			$("#mainBody #tab_"+tabID).load("./app/pages/editor.html",function() {
				$("#noteTabBar li.active").removeClass("active");
				$("#noteTabBar li[data-noteid='"+noteID+"']").addClass("active");

				$("#mainBody .page_tabs.active").removeClass("active");
				$("#mainBody .page_tabs#tab_"+tabID).addClass("active");

				hideSidebar();

				_editor.renderEditor(noteID);
			});

			if(typeof loadHomeNoteLists == "function") loadHomeNoteLists();
		});
	} else {
		$("#noteTabBar li.active").removeClass("active");
		$("#noteTabBar li[data-noteid='"+noteID+"']").addClass("active");

		$("#mainBody .page_tabs.active").removeClass("active");
		$("#mainBody .page_tabs#tab_"+tabID).addClass("active");

		hideSidebar();
	}
	
}

function openDocumentTab(src) {
	noteID = $(src).data("noteid");
	noteTitle = $(src).text();
	
	openDocument(noteID,noteTitle);
}

function saveDocumentTab() {

}

function closeDocumentTab() {
	
}


function loadDocument() {

}

function exportDocument() {

}

function showHomeTab() {
	$("#noteTabBar li.active").removeClass("active");
	$("#noteTabBar li:first-child").addClass("active");

	$("#mainBody .page_tabs.active").removeClass("active");
	$("#mainBody .page_tabs#tab_home").addClass("active");

	showSidebar();
}

function showSettingsTab() {
	$("#noteTabBar li.active").removeClass("active");
	$("#noteTabBar li:first-child").addClass("active");

	$("#mainBody .page_tabs.active").removeClass("active");
	$("#mainBody .page_tabs#tab_settings").addClass("active");

	hideSidebar();
}


function generateBlankNote() {
	return {
		"vers":1,
		"type":"mnote",
		"author":getAuthorInfo(),
		"created_on":moment().format("YY-MM-DD HH:mm:ss"),
		"last_update":moment().format("YY-MM-DD HH:mm:ss"),
		"share":"private",
		"title":"New Note",
		"content":`New note content`
	};
}

function getAuthorInfo() {
	author_name = appData.getData("AUTHOR_NAME");
	author_email = appData.getData("AUTHOR_EMAIL");	
	author_website = appData.getData("AUTHOR_WEBSITE");

	if(author_name==null) author_name = "";
	if(author_email==null) author_email = "";
	if(author_website==null) author_website = "";

	return {
		"name":author_name,
		"email":author_email,
		"website":author_website
	};
}



