module.exports = {
	localStorage: require('node-localstorage'),

	getData: function(key, key1) {
		dx=localStorage.getItem(key);
		if(dx!=null) {
			if(dx.length>=2 && 
				((dx.substr(0,1)=="{" && dx.substr(dx.length-1,1)=="}") || (dx.substr(0,1)=="[" && dx.substr(dx.length-1,1)=="]"))) {
				try {
					json=$.parseJSON(dx);
					dx=json;
				} catch(e) {
					console.log(e);
				}
			}
		}
		if(key1!=null && typeof dx=="object") {
			return dx[key1];
		}
		return dx;
	},
	setData: function(key, value) {
		if(typeof value=="object") value=JSON.stringify(value);
		return localStorage.setItem(key, value);
	},
	getConfig: function(key) {
		dx=localStorage.getItem(key);
		if(dx==null) {
			if(APPCONFIG.CONFIG[key]!=null) {
				dx=APPCONFIG.CONFIG[key];
				localStorage.setItem(key,dx);
			}
		}
		return dx;
	},
	setConfig: function(key, value) {
		localStorage.setItem(key,value);
		return value;
	}
};