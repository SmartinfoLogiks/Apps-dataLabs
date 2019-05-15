module.exports = {
	CURRENT_PAGE:"home",
	CURRENT_URI:"home",
	generateMenu: function() {
		if(APPCONFIG.DEBUG==true) {
			if(typeof APPCONFIG.MENU_2=="object") {
				APPCONFIG.MENU_2['DEVTEST']={"link":"#ztest","icon":"fa fa-bug"};
			} else {
				APPCONFIG.MENU_2={};
				APPCONFIG.MENU_2['DEVTEST']={"link":"#ztest","icon":"fa fa-bug"};
			}
		}
		if(typeof APPCONFIG.MENU=="object" || typeof APPCONFIG.MENU_1=="object") {
			htmlMenu=[];

			menuObj=null;
			if(typeof APPCONFIG.MENU=="object") {
				menuObj=APPCONFIG.MENU;
			} else if(typeof APPCONFIG.MENU_1=="object") {
				menuObj=APPCONFIG.MENU_1;
			}
			if(menuObj!=null) {
				$.each(menuObj,function(k,v) {
					if((typeof v)=="string") {
						htmlMenu.push("<li><a class='pageLink' href='"+v+"'>"+k+"</a></li>");
					} else {
						if(v.hidden===true) return;
					 	lnk="";icon="";clas="";title="";
						if(v.link!=null) lnk=v.link;
						if(v.icon!=null) icon=v.icon;
						if(v.class!=null) clas=v.class;
						if(v.title!=null) title=v.title;
						htmlMenu.push("<li class='"+clas+"'><a class='pageLink' data-toggle='tooltip' data-placement='right' href='"+lnk+"' title='"+title+"'><i class='"+icon+"'></i></a></li>");
					}
				});
				htmlMenu=htmlMenu.join("");
				$("#sidebarMenu ul.side-menu").html(htmlMenu);
				$('#sidebarMenu [data-toggle="tooltip"]').tooltip();   
			}
		}
		if(typeof APPCONFIG.MENU_2=="object") {
			htmlMenu=[];
			$.each(APPCONFIG.MENU_2,function(k,v) {
				if((typeof v)=="string") {
					icon="";
					htmlMenu.push("<a class='pageLink' href='"+v+"' data-toggle='tooltip' data-placement='top' title='"+k+"'><span class='"+icon+"' aria-hidden='true'></span></a>");
				} else {
					if(v.display===false) return;
				 	lnk="";icon="";clas="";
					if(v.link!=null) lnk=v.link;
					if(v.icon!=null) icon=v.icon;
					if(v.class!=null) clas=v.class;
					htmlMenu.push("<a class='pageLink "+clas+"' href='"+lnk+"' data-toggle='tooltip' data-placement='top' title='"+k+"'><span class='"+icon+"' aria-hidden='true'></span></a>");
				}
			});

			htmlMenu=htmlMenu.join("");
			$("#footer .footer-icons").html(htmlMenu);
		}
	},
	navigatePage: function(page, src) {
		$("#sidebarMenu li.active").removeClass("active");
		$("#footer .active").removeClass("active");
		$(src).parent().addClass("active");

		if(page.indexOf("@")==0) {
			//Load A Function
			page=page.substr(1);

			if(typeof window[page]) {
				window[page](src, this);
			} else {
				console.warn("Support Function Not Found : "+page);
			}
		} else {
			//Load a page
			this.showLoaderPage();
			
			if(page.substr(0,1)=="#") page=page.substr(1);

			if(typeof appSecure=="object" && page!='login') {
				accessObject=appSecure.checkAccess(page);
				if(accessObject==false) {
					this.navigatePage("#login");
					return;
				}
			}

			this.CURRENT_URI=page;

			page=page.split("/")[0];
			page=page.replace("_","/");

			pageURL="./app/pages/"+page+".html";
			//console.log(pageURL);

			this.CURRENT_PAGE=page;

			if(APPCONFIG.UICONFIG.NOMENU!=null && APPCONFIG.UICONFIG.NOMENU.indexOf(page)>=0) {
				$("#menubar").hide();
			} else {
				$("#menubar").show();
			}

			if(APPCONFIG.UICONFIG.NOSIDEBAR!=null && APPCONFIG.UICONFIG.NOSIDEBAR.indexOf(page)>=0) {
				$("#sidebar").hide();
			} else {
				$("#sidebar").show();
			}

			if(APPCONFIG.UICONFIG.NOFOOTER!=null && APPCONFIG.UICONFIG.NOFOOTER.indexOf(page)>=0) {
				$("#footer").hide();
			} else {
				$("#footer").show();
			}

			appUI.hidePopups();

			appUtils._servicePage(pageURL,function(data) {
				$("#mainBody").html(data);

			  	appUI.refreshUIWidgets();

			  	if(typeof window['initPageEvents']=="function") initPageEvents(this);

			  	if($("#sidebar").is(":visible")) {
					$("#mainBody").removeClass("noSidebar");
				} else {
					$("#mainBody").addClass("noSidebar");
				}                
			});
		}
	},
	refreshUIWidgets: function() {
		$(".modal").modal("hide");
		if($("#sidebar").is(":visible")) {
			// appAPI.getProfileInfo(function(data) {
			//     if(data) {
			//     	einviteWIP=appData.getData("EINVITECOUNT");
			//     	if(einviteWIP==null) einviteWIP=0;

			//     	$("#userAvatarDesktop").attr("src",data.avatar);

			//     	data.albums_working=data.albums_created-data.albums_closed;

			//     	$("#albums_published").html(data.albums_closed);
			//     	$("#albums_working").html(data.albums_working);
			    	
			//     	$("#templates_downloads").html(data.templates_downloaded);
			//     	$("#templates_max").html(data.templates_left);
			//     	// $("#templates_used").html(data.templates_used);
			    	
			//     	$("#credits_earned").html(data.credits_left);
			//     	$("#credits_spent").html(data.credits_spent);
			//     	$("#credits_spent").html(data.credits_spent);

			//     	$("#einvites_created").html(data.einvites_created);
			//     	$("#einvites_received").html(data.einvites_received);
			//     	$("#einvites_wip").html(einviteWIP);

			//     }
			// });
		}
		
		$(".component[data-componentid]").each(function() {
			compid=$(this).data("componentid");
			if(compid==null) return;
			$(this).load("./app/comps/"+compid+".html");
		});

		appUI.initAjaxDataUI();
	},
	reloadPage: function() {
		this.navigatePage(this.CURRENT_PAGE);
	},
	homePage: function() {
		this.navigatePage(APPCONFIG.HOME);
	},
	showLoader: function(div,msg) {
		if(msg!=null && msg.length>0) {
			$(div).append("<div class='text-center loading'><br><i class='fa fa-spinner fa-4x fa-spin'></i><br><br>"+msg+"</div>");
		} else {
			$(div).append("<div class='text-center loading'><br><i class='fa fa-spinner fa-4x fa-spin'></i></div>");
		}
	},
	showLoaderPage: function() {
		$("#mainBody").html("<div class='text-center loading'><br><i class='fa fa-spinner fa-4x fa-spin'></i></div>");
	},
	showLoaderPopup: function() {
		appUI.showPopup("loading");
	},
	showConfirm: function(msg, onOK, onCancel, onShow) {
		appUI.showPopup("blank",function(a) {
				html="<div class='text-left'>"+msg+"</div>"+
					"<div><button class='btn btn-success pull-right'>Ok</button><button class='btn btn-danger pull-right'>Cancel</button></div>"+
					"<div class='clearfix'></div>";
				$(".modal-body",a).html(html);
				$(".modal-body",a).find(".btn.btn-danger").click(onCancel);
				$(".modal-body",a).find(".btn.btn-success").click(onOK);
				$(".modal-body",a).find(".btn").click(function() {
					$('.modal').fadeOut();
					$('.modal,.modal-backdrop').detach();
				});
			});
	},
	showPrompt: function(msg, params = {}, onClose) {
		params = $.extend({
			title: "Question!",
			label: msg,
			value: '',
			inputAttrs: {
		        // type: 'url'
		    }
		}, params);

		prompt(params)
		.then((r) => {
		    if(r === null) {
		        onClose(false);
		    } else {
		        onClose(r);
		    }
		})
		.catch((a) => onClose(false));
	},
	showMsg: function(msg, onClose) {
		appUI.showPopup("blank",function(a) {
				html="<div class='text-left'>"+msg+"</div>"+
					"<div><button class='btn btn-danger pull-right'>Cancel</button></div>"+
					"<div class='clearfix'></div>";
				$(".modal-body",a).html(html);
				$(".modal-body",a).find(".btn.btn-danger").click(onClose);
				$(".modal-body",a).find(".btn").click(function() {
					$('.modal').fadeOut();
					$('.modal,.modal-backdrop').detach();
				});
			});
	},
	showPopupContent: function(content, onShowCallback, modalClass, params) {
		appUI.showPopup("blank",function(a) {
				$(".modal-body",a).html(content);
				if(onShowCallback!=null && typeof onShowCallback=="function") onShowCallback(modalWindow);
			},modalClass,params);
	},
	showPopup: function(popupID, onShowCallback, modalClass, params) {
		if(modalClass==null) modalClass="";
		url="app/comps/"+popupID+".html";

		$('.modal').detach();

		appUtils._servicePage(url,function(data) {
			params=$.extend({
			    backdrop: 'static',
			    keyboard: false  // to prevent closing with Esc button (if you want this too)
			},params);
			
			modalWindow=$('<div class="modal fade model-background '+modalClass+'">' + data + '</div>').modal(params);
			if(onShowCallback!=null && typeof onShowCallback=="function") onShowCallback(modalWindow);
		});
	},
	showPopupURL: function(url, onShowCallback, modalClass, params) {
		if(modalClass==null) modalClass="";

		$('.modal').detach();

		appUtils._servicePage(url,function(data) {
			params=$.extend({
			    backdrop: 'static',
			    keyboard: false  // to prevent closing with Esc button (if you want this too)
			},params);
			
			modalWindow=$('<div class="modal fade model-background '+modalClass+'">' + data + '</div>').modal(params);
			if(onShowCallback!=null && typeof onShowCallback=="function") onShowCallback(modalWindow);
		});
	},
	hidePopups: function() {
		$('.modal').fadeOut();
		$('.modal,.modal-backdrop').detach();
	},
	showNotifications: function(body, title, params) {
		//eg. appUI.showNotifications("asd",{"body":"akshdkasd","icon":"./app/images/author1.png"})
		// console.log(navigator.platform);
		if(params==null) params={};
		if(title==null) {
			title=APPCONFIG.TITLE+" says:";
		}
		params=$.extend({"body":body},params);
		if(navigator.platform.toLowerCase()=="win32" || navigator.platform.toLowerCase()=="windows") {
			appUI.showToast(body);
		} else {
			new Notification(title, params);
		}
	},
	showToast: function(msg,opts) {
		var defOpts = {
	            displayTime: 2000,
	            bodyclass: "",
	            inTime: 300,
	            outTime: 200,
	            effects: false,
	            inEffect:"fade",
	            outEffect:"fade",
	            maxWidth: 500,
	            position: "top-right",
	        };
	    opts = $.extend(defOpts, opts);
		opts.position=opts.position.toLowerCase().split("-");
		var y,x;
		switch (opts.position[0]) {
	        case "top":
	            y = 32;
	            break;
	        case "bottom":
	            y = 1.0325;
	            break;
	        default:
	            y = 2;
	    }
	    switch (opts.position[1]) {
	        case "left":
	            x = 72;
	            break;
	        case "right":
	            x = 72;
	            break;
	        default:
	            x = 2;
	    }
	    $("body .lgksToast.toast").detach();
		toast = $("<div class='toast lgksToast "+opts.bodyclass+"'>" + msg + "</div>");
	    $("body").append(toast);
	    var l = window.innerHeight;
	    var j = window.innerWidth;
	    toast.css({
	            "max-width": opts.maxWidth + "px",
	            "top": ((l - toast.outerHeight()) / y) + $(window).scrollTop() + "px",
				"position":"absolute",
				"padding":"10px",
				"z-index":99999999,
				"display":"none",
	            "font-size": "12px",
	        });
	    switch (opts.position[1]) {
			case "left":
				toast.css({
					left: ((j - toast.outerWidth()) / x) + $(window).scrollLeft() + "px",
				});
				break;
			case "right":
				toast.css({
					right: ((j - toast.outerWidth()) / x) + $(window).scrollLeft() + "px",
				});
				break;
			default:
				toast.css({
					right: ((j - toast.outerWidth()) / x) + $(window).scrollLeft() + "px",
				});
		}
	    if(opts.bodyclass=="" || opts.bodyclass==null) {
			toast.css({
	            "color":"#ffffff",
				"background-color":"rgba(0,0,0, 0.7)",
				"border-radius":"4px",
				"-moz-border-radius":"4px",
				"-webkit-border-radius":"4px",
				"border":"2px solid #CCCCCC"
	        });
		}
		if(opts.effects===true) {
			toast.show(opts.inEffect,opts.inTime).delay(opts.displayTime).hide(opts.outEffect,opts.outTime, function() {
						//toast.remove();
					});
		} else {
			toast.show(opts.inTime).delay(opts.displayTime).hide(opts.outTime, function() {
						//toast.remove();
					});
		}
	},
	showTray: function() {
		if(APPCONFIG.MENU_TRAY!=null) {
			try {
				const {Tray, Menu} = remote;
				let tray = new Tray(fsPath.join(getAppPath(),'icon.png'));

				trayContextMenu=[];
				$.each(APPCONFIG.MENU_TRAY, function(k,v) {
					if(v.hidden===true) return;
					trayContextMenu.push({"label":k,click: function () {
	                  		appUI.navigatePage(v.link);
		               	},enabled:true});
				});

				let trayMenu = Menu.buildFromTemplate(trayContextMenu);

				tray.setToolTip(APPCONFIG.TITLE);
	         	tray.setContextMenu(trayMenu)
	         } catch(e) {}
		}
	},
	initAjaxDataUI: function() {
		$('.ajaxlist[data-url][data-template]').each(function() {
			appUI.loadAjaxListUI(this);
		});
	},
	reloadAjaxDataUI: function(ele) {
		$(ele).data("page", 0);
		appUI.loadAjaxDataUI(ele);
	},
	loadAjaxDataUI: function(ele) {
		ajaxURL = $(ele).data("url");
		ajaxParams = $(ele).data("params");
		ajaxFilterFunc = $(ele).data("filterfunc");
		ajaxPreLoad = $(ele).data("preload");

		page = $(ele).data("page");
		limit = $(ele).data("limit");

		if (page == null || page == 0) {
			page = 0;
			$(ele).data("page", 0);
		}

		if (limit == null) limit = 20;
		if (ajaxParams == null) ajaxParams = "";

		$(ele).find(".showmore").detach();

		if (page == 0) {
			$(ele).html("<div class='loaderui text-center'><div class='fa fa-spinner fa-spin fa-3x'></div></div>");
		}

		if (ajaxPreLoad != null && ajaxPreLoad.length > 0 && typeof window[ajaxPreLoad] == "function") {
			window[ajaxPreLoad](ele);
		}

		ajaxURI = getServiceCMD(ajaxURL) + "&page=" + page + "&limit=" + limit + ajaxParams;
		if (ajaxFilterFunc != null && ajaxFilterFunc.length > 0 && typeof window[ajaxFilterFunc] == "function") {
			//POST
			q = window[ajaxFilterFunc](ele);
			processAJAXPostQuery(ajaxURI, q, function(ans) {
					try {
						ajaxPostLoad = $(ele).data("postload");
						ajaxShowMore = $(ele).data("showmore");
						ajaxTMPL = $(ele).data("template");

						ajaxTMPL = $("#" + ajaxTMPL).html();
						// console.log([ajaxTMPL, ans.Data]);

						uiRenderer = Handlebars.compile(ajaxTMPL);

						htmlData = uiRenderer({
							"Data": ans.Data
						});
						$(ele).find(".loaderui").detach();
						$(ele).append(htmlData);

						page = $(ele).data("page");
						page++;
						$(ele).data("page", page);

						if ($(ele).children().length > 0 && (ajaxShowMore == "true" || ajaxShowMore === true)) {
							if (ans.Data.length >= limit) {
								$(ele).append("<span class='showmore'>more ...</span>");
							}
						}

						if (ajaxPostLoad != null && ajaxPostLoad.length > 0 && typeof window[ajaxPostLoad] == "function") window[ajaxPostLoad](ele, ans);
					} catch (e) {
						ajaxPostError = $(ele).data("posterror");
						console.error(e);
						if (ajaxPostError != null && ajaxPostError.length > 0 && typeof window[ajaxPostError] == "function") window[ajaxPostError](ele, ans);
					}
				},
				function(e) {
					ajaxPostError = $(ele).data("posterror");

					if (ajaxPostError != null && ajaxPostError.length > 0 && typeof window[ajaxPostError] == "function") window[ajaxPostError](ele);
				}, true, true);
		} else {
			//GET
			processAJAXGetQuery(ajaxURI, function(ans) {
				try {
					ajaxPostLoad = $(ele).data("postload");
					ajaxShowMore = $(ele).data("showmore");
					ajaxTMPL = $(ele).data("template");

					ajaxTMPL = $("#" + ajaxTMPL).html();
					//console.log([ajaxTMPL, ans.Data]);

					uiRenderer = Handlebars.compile(ajaxTMPL);

					htmlData = uiRenderer({
						"Data": ans.Data
					});
					$(ele).find(".loaderui").detach();
					$(ele).append(htmlData);

					page = $(ele).data("page");
					page++;
					$(ele).data("page", page);

					if ($(ele).children().length > 0 && (ajaxShowMore == "true" || ajaxShowMore === true)) {
						$(ele).append("<span class='showmore'>more ...</span>");
					}

					if (ajaxPostLoad != null && ajaxPostLoad.length > 0 && typeof window[ajaxPostLoad] == "function") window[ajaxPostLoad](ele, ans);
				} catch (e) {
					ajaxPostError = $(ele).data("posterror");
					console.error(e);
					if (ajaxPostError != null && ajaxPostError.length > 0 && typeof window[ajaxPostError] == "function") window[ajaxPostError](ele, ans);
				}
			});
		}
	}
};
