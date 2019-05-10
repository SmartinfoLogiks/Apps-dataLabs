module.exports = {


	toggleSidebar: function(src) {
		divPane = $(src).closest(".page_tabs");
		noteid = divPane.data("noteid");
		divPane.find('.editorSidebar').toggleClass('active');
	},

	renderEditor: function(noteID) {
		tabID = hashMD5(noteID);
		divPane = $("#mainBody #tab_"+tabID);
		editorUI = divPane.data("ui");
		if(editorUI==null) {
			editorUI = "mnote";
			divPane.data("ui",editorUI);
		}


		switch(editorUI) {
			case "mnote":
				divPane.find(".editorArea").load("./app/comps/editor-mnote.html", function(a) {
					treeUI.initTree(divPane.find("ul.tree"))

					console.log("LOADED");
				});
			break;

			default:
				divPane.find(".editorArea").html("<h3 align=center>UI Rendering Kit Not Supported Yet</h3>");
				appUI.showToast("This UI type is not supported yet.<br>Try updating me :-)");
		}
	}
}