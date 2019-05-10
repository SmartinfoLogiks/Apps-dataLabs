module.exports = {
	NOTESDATA : {},
	SAVE_NEEDED:[],

	openNote: function(docID, callBack) {
		

		if(callBack!=null && typeof callBack == "function") {
			callBack(docID);
		}
	},

	updateNote: function(docID, docData, callBack) {



		if(callBack!=null && typeof callBack == "function") {
			callBack(docID);
		}
	},

	saveNote: function(docID, callBack) {



		if(callBack!=null && typeof callBack == "function") {
			callBack(docID);
		}
	}
}