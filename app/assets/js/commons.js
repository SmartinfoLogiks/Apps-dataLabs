$(function() {
  handleBars.registerHelper('dated', function(dt,format) {
    if(format==null) format='DD,MMM YYYY';
    if(dt==null || dt.length<=0) {
      return "";
    } else {
      return moment(dt).format(format);
    }
  });
  handleBars.registerHelper('humanDate', function(dt,format) {
    if(dt==null || dt.length<=0) {
      return "";
    } else {
      return moment(dt).fromNow();
    }
  });
  // handleBars.registerHelper('textAvatar', function(name) {
  //   if(name==null) name="#";
  //   return getTextAvatar(name);
  // });
});

Array.prototype.unique = function() {
    var a = this.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
};
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
function fileName(file) {
  fname=file.split("\\");
  if(fname.length>1) {
    return fname[fname.length-1];
  } else {
    fname=file.split("/");
    return fname[fname.length-1];
  }
}
function openPreviewViewer(URI) {
  remote.getGlobal("openNewWindow")(URI);
}

//Path funcs
function getUserDataPath() {
  albumPath=appData.getData("DATAPATH");
  if(albumPath!=null && albumPath.indexOf(".asar")>1) {
    albumPath=null;
  }
  if(albumPath==null) {
    // albumPath=fsPath.join(getAppPath(),"usermedia");
    albumPath=fsPath.join(remote.app.getPath('userData'),"usermedia");
    appData.setData("DATAPATH",albumPath);
  }
  return albumPath;
}

function getAppPath() {
  dataPath=remote.app.getPath('userData');
  return dataPath;
}

function getTempPath() {
  tempPath=remote.app.getPath('temp');
  tempPath=fsPath.join(tempPath,remote.app.getName());
  appData.setData("TEMPDIR",tempPath);

  return tempPath;
}

function getMyPath() {
  exePath=remote.app.getPath('exe');
  appPath=fsPath.dirname(exePath);
  return appPath;
}
function getLogsPath() {
  logsPath=fsPath.join(getAppPath(),"logs");
  return logsPath;
}

function checkAppPaths() {
  paths=[
    getAppPath(),
    getTempPath(),
    getMyPath(),
    getLogsPath(),
    getUserDataPath(),
  ];
  $.each(paths,function(k,fPath) {
    fsUtils.exists(fPath,function(ans) {
        if(!ans) {
          fsUtils.mkdir(fPath);
        }
        // console.log(fPath);
      });
  });
}

function closePopups() {
  appUI.hidePopups();
}