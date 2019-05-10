module.exports = {
	//https://electronjs.org/docs/api/accelerator
	eventManager : this,
	bypassEvent : false,

	initEvents: function() {
		eventManager = this;

		this.localEvents();
		this.globalEvents();
	},
	localEvents: function() {
		eventManager = this;

		document.addEventListener('keydown', function(e) {
			activeTreePane = $("#mainBody .page_tabs.active ul.tree");
			ele = activeTreePane.find(".active");
			ele1 = $(ele).closest("li");
			// console.log(ele.prop("tagName"),ele);

			switch(e.keyCode) {
				case 13://ENTER
					if(activeTreePane.length>0) {
						if(ele.attr("contenteditable")) {
							e.preventDefault();
							eventManager.bypassEvent = true;
							ele.removeAttr("contenteditable");
							return;
						}
					}
				break;
				case 27://Escape
					if(activeTreePane.length>0) {
						if(ele.attr("contenteditable")) {
							e.preventDefault();
							eventManager.bypassEvent = true;
							ele.removeAttr("contenteditable");
							return;
						}
					}
				break;
				case 8://Delete
					if(activeTreePane.length>0) {
						if(ele.attr("contenteditable")) {
							eventManager.bypassEvent = true;
							return;
						}
					}
				break;
				default:
					if(activeTreePane.length>0) {
						if(ele.attr("contenteditable")) {
							eventManager.bypassEvent = true;
							return;
						}
					}
			}
		});
		document.addEventListener('keyup', function(e) {
			activeTreePane = $("#mainBody .page_tabs.active ul.tree");
			ele = activeTreePane.find(".active");
			ele1 = $(ele).closest("li");
			console.log(ele.prop("tagName"),ele);

			switch(e.keyCode) {
				case 13://ENTER
					if(eventManager.bypassEvent) {
						eventManager.bypassEvent = false;
						return;
					}
					if(activeTreePane.length>0) {
						switch(ele.prop("tagName")) {
					        case "A":
								$("<li><a><label class='active'>new</label></a></li>").insertAfter($(ele).closest("li"));
								$(ele).removeClass("active");
							break;
					        case "LABEL":
								//$("<li><label class='active'><a>folder</a></label><ul></ul></li>").insertAfter($(ele).closest("li"));
								$("<li><a><label class='active'>new</label></a></li>").insertAfter($(ele).closest("li"));
								$(ele).removeClass("active");
							break;
					        default:
								console.log("NOT SUPPORTED",ele.prop("tagName"));
						}
					}
				break;
				case 9://TAB
					if(eventManager.bypassEvent) {
						eventManager.bypassEvent = false;
						return;
					}
					if(activeTreePane.length>0) {
						switch(ele.prop("tagName")) {
					        case "A"://REPLACE
								$(ele).removeClass("active");
								ele1.replaceWith("<li><label><a>"+ele1.text()+"</a></label><ul class='open'><li><a><label class='active'>new</label></a></li></ul></li>");
							break;
					        case "LABEL":
								$(ele).removeClass("active");
								ele1.find(">ul").append("<li><a><label class='active'>new</label></a></li>");
							break;
					        default:
								console.log("NOT SUPPORTED",ele.prop("tagName"));
						}
					}
				break;
				case 38://UP
					if(activeTreePane.length>0) {
						if(ele1.prev().length>0) {
							ele1.prev().find(">label,>a>label").addClass("active");
							ele.removeClass("active");
						}
					}
				break;
				case 40://DOWN
					if(activeTreePane.length>0) {
						if(ele1.next().length>0) {
							ele1.next().find(">label,>a>label").addClass("active");
							ele.removeClass("active");
						}
					}
				break;
				case 37://LEFT
					if(activeTreePane.length>0) {
						ele2 = ele.closest("ul").closest("li").find(">label,>a>label");
						if(ele2.length>0) {
							ele2.addClass("active");
							ele.removeClass("active");
						}
					}
				break;
				case 39://RIGHT
					if(activeTreePane.length>0) {
						if(ele1.find(">ul").length>0) {
							if(!ele1.find(">ul").hasClass("open")) ele1.find(">ul").addClass("open");

							if(ele1.find(">ul>li").length>0) {
								ele1.find(">ul>li:first-child").find(">label,>a>label").addClass("active");
								ele.removeClass("active");
							}
						}
					}
				break;
				case 32://SPACE
					if(eventManager.bypassEvent) {
						eventManager.bypassEvent = false;
						return;
					}
					if(ele.prop("tagName")!="LABEL") {
						return;
					}
					if(ele.attr("contenteditable")) {
						//ele.removeAttr("contenteditable");
					} else {
						ele.attr("contenteditable","true");
						ele.focus();
					}
					
				break;
				case 8://DELETE
					if(eventManager.bypassEvent) {
						eventManager.bypassEvent = false;
						return;
					}
					if(activeTreePane.length>0) {
						if(ele1.length>0) {
							ele1.prev().find(">label,>a").addClass("active");
							ele1.detach();
						}
					}
				break;
				default:
					console.log(e.keyCode);
			}



		    // This would be triggered by pressing CTRL + A
		    // if (e.ctrlKey && e.keyCode == 65) {
		    //     window.location.href = "http://ourcodeworld.com"; 
		    // }

		    // Or with ALT + A
		    //if (e.altKey && e.keyCode == 65) {
		    //    window.location.href = "http://ourcodeworld.com"; 
		    //}
		}, false);
	},
	globalEvents: function() {
		// globalShortcut.register('CommandOrControl+Y', () => {
		    
		//   });
		// globalShortcut.register('Enter', () => {
		 //    if($("#mainBody .page_tabs.active").find("ul.tree .active").length>0) {
			// 	ele = $("#mainBody .page_tabs.active").find("ul.tree .active");
			// 	switch(ele.prop("tagName")) {
			//         case "A":
			// 			$("<a class='active'><label>new</label></a>").insertAfter(ele);
			// 			$(ele).removeClass("active");
			// 		break;
			//         case "LABEL":
			// 			$("<li><label class='active'><a>folder</a></label><ul></ul></li>").insertAfter(ele);
			// 			$(ele).removeClass("active");
			// 		break;
			//         default:
			// 			console.log("NOT SUPPORTED",ele.prop("tagName"));
			// 	}
			// }
		// 	return true;
		//   });
	}
}