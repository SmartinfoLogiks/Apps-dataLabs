module.exports = {
	_serviceLocal: function(src) {
		dx=requireLive("./app/cmds/"+src+".js");

		return dx;
	},
	_serviceComponent: function(src, compID, callBackSuccess, callBackError) {
		dx=requireLive("./app/comps/"+src+".html");

		return dx;
	},
	_servicePage: function(refURL, onSuccess, onError) {
		$.ajax({
                async: true,
                type: 'GET',
                url: refURL,
            }).success(function(data) {
                if(typeof onSuccess=="function") onSuccess(data);
            }).error(function(err,statusMsg) {
                if(typeof onError=="function") onError(err,statusMsg);
                else appUI.showPopupContent("Error loading panel");
            });
	},
	_serviceHeaders: function() {
		return {
	    			"token":localStorage.getItem("token"),
	    			"devid":deviceID,
	    			// 'Authorization':'Basic xxxxxxxxxxxxx',
			     	// 'X_CSRF_TOKEN':'xxxxxxxxxxxxxxxxxxxx',
			     	// 'Content-Type':'application/json'
	    		};
	},
	_serviceGET: function(cmd, callBackSuccess, callBackError) {
		$.ajax({
				async: true,
				type: 'GET',
	    		url: APPCONFIG.URLS.APIDATA+cmd,
	    		//dataType: 'json',
	    		//data: YourData,
	    		headers: appUtils._serviceHeaders()
			}).success(function(data) {
                if(typeof callBackSuccess=="function") callBackSuccess(data);
            }).error(function(err,statusMsg) {
            	if(err.status==400 || err.statusText=="Unauthorized") {
            		localStorage.removeItem("token");
					appUI.navigatePage("#login");

					appUI.showNotifications("Sorry you have been logged out. Try logging in again.");
					return;
            	}
                if(typeof callBackError=="function") callBackError(err);
                else {
                	if(statusMsg=="error") {
                		appUI.showNotifications("You seem to have lost internet connectivity.")
                	}
                }
            });
	},
	_servicePOST: function(cmd, data, callBackSuccess, callBackError) {
		// if(typeof data=="object")
		$.ajax({
				async: true,
				type: 'POST',
	    		url: APPCONFIG.URLS.APIDATA+cmd,
	    		//dataType: 'json',
	    		data: data,
	    		headers: appUtils._serviceHeaders()
			}).success(function(data) {
                if(typeof callBackSuccess=="function") callBackSuccess(data);
            }).error(function(err,statusMsg) {
            	if(err.status==400 || err.statusText=="Unauthorized") {
            		localStorage.removeItem("token");
					appUI.navigatePage("#login");

					appUI.showNotifications("Sorry you have been logged out. Try logging in again.");
					return;
            	}
                if(typeof callBackError=="function") callBackError(err);
                else {
                	if(statusMsg=="error") {
                		appUI.showNotifications("You seem to have lost internet connectivity.")
                	}
                }
            });
	},
	_servicePUT: function(cmd, data, callBackSuccess, callBackError) {
		// if(typeof data=="object")
		$.ajax({
				async: true,
				type: 'PUT',
	    		url: APPCONFIG.URLS.APIDATA+cmd,
	    		//dataType: 'json',
	    		data: data,
	    		headers: appUtils._serviceHeaders()
			}).success(function(data) {
                if(typeof callBackSuccess=="function") callBackSuccess(data);
            }).error(function(err,statusMsg) {
            	if(err.status==400 || err.statusText=="Unauthorized") {
            		localStorage.removeItem("token");
					appUI.navigatePage("#login");

					appUI.showNotifications("Sorry you have been logged out. Try logging in again.");
					return;
            	}
                if(typeof callBackError=="function") callBackError(err);
                else {
                	if(statusMsg=="error") {
                		appUI.showNotifications("You seem to have lost internet connectivity.")
                	}
                }
            });
	},
	_serviceDELETE: function(cmd, data, callBackSuccess, callBackError) {
		// if(typeof data=="object")
		$.ajax({
				async: true,
				type: 'DELETE',
	    		url: APPCONFIG.URLS.APIDATA+cmd,
	    		//dataType: 'json',
	    		data: {blocked:true},
	    		headers: appUtils._serviceHeaders()
			}).success(function(data) {
                if(typeof callBackSuccess=="function") callBackSuccess(data);
            }).error(function(err,statusMsg) {
            	if(err.status==400 || err.statusText=="Unauthorized") {
            		localStorage.removeItem("token");
					appUI.navigatePage("#login");

					appUI.showNotifications("Sorry you have been logged out. Try logging in again.");
					return;
            	}
                if(typeof callBackError=="function") callBackError(err);
                else {
                	if(statusMsg=="error") {
                		appUI.showNotifications("You seem to have lost internet connectivity.")
                	}
                }
            });
	},
	searchPage: function(parentID, term, unitClass,searchTag) {
		if(term==null || term.length<=0) {
			$(parentID+" "+unitClass).show();
			return;
		}
		albums=$(parentID).find(searchTag).filter(function() {
		return ($(this).text().trim().toLowerCase().indexOf(term.trim().toLowerCase())>=0);
		}).closest(unitClass);
		$(parentID+" "+unitClass).hide();
		albums.show();
	},
	padDigits: function(number, digits) {
	    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
	},
	isDev: function() {
	    return APPCONFIG.DEBUG;//(process.env.NODE_ENV === 'development');
	}
}