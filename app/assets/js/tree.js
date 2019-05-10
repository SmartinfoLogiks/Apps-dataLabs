module.exports = {

	initTree: function(divPane) {
		$(divPane).delegate("li>label","click",function() {
			$(this).closest("li").find(">ul").toggleClass("open");
			$(this).closest("ul.tree").find(".active").removeClass("active");
			$(this).addClass("active");
		});
		$(divPane).delegate("li>a>label","click",function() {
			$(this).closest("ul.tree").find(".active").removeClass("active");
			$(this).addClass("active");
		});
	},

	handleEvent: function(ulTree, cmd, src) {

	}
}