const requireLive = require('require-reload')(require);
const remote = require('electron').remote;
const os = require('os');
const fs = require('fs');
const fsUtils = require('fs');
const fsExtra = require('fs-extra');
const fsPath = require('path');
// const globalShortcut = require('electron').remote.globalShortcut;
// const {clipboard} = require('electron')

const winston = require('winston');

const saveFile = require('electron').remote.require('electron-save-file');
const dialogUtils = require('electron').remote.dialog 
const electronShortcut = require('electron').remote.require('electron-localshortcut');
const prompt = require('electron-prompt');

//Loading other libs
const handleBars = require('handlebars');
const hashMD5 = require('md5');
const moment = require("moment");
const shortid = require('shortid');
const SimpleMDE = require('simplemde');

//LIBS
const appUI=require("./app/assets/js/app-ux.js");
const appAPI=require("./app/assets/js/app-validator.js");
const appUtils=require("./app/assets/js/app-utils.js");
const appData=require("./app/assets/js/app-data.js");
var XLSX = require('xlsx');
var Chart = require('chart.js');
var md5 = require('md5');
var isWin = /^win/.test(process.platform);

var APPCONFIG={};

var macAddress="";
var deviceID=null;

var logger = null;

$(function() {
    shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@');
    
    try {
        netAdd=os.networkInterfaces();
        netKeys=Object.keys(netAdd);
        netKeys = netKeys.filter(a => {
                if(netAdd[a][0].mac!=null && netAdd[a][0].mac.length>0 && netAdd[a][0].mac!="00:00:00:00:00:00") return true;
                else return false;
            });
        if(netKeys.length>0) {
            macAddress=netAdd[netKeys[0]][0]['mac'];
            macAddress=macAddress.toUpperCase();
        } else {
            macAddress=netAdd[netKeys[0]][0]['mac'];
            macAddress=macAddress.toUpperCase();
        }
    } catch(e) {
        console.log("MAC Address Not Found");
    }
    if(macAddress!=null && macAddress.length>0) {
        deviceID=hashMD5(macAddress);
    } else {
        deviceID="";
    }

    //Disable all Std <a> Links
    $("body").delegate("a[href]:not([data-toggle])","click",function() {
        href=$(this).attr('href');
        if(href=="#" || href=="##" || href.substr(0,2)=="##") return true;
        return false;
    });

    //Start normal process
    $.ajax("./app/app.json").done(function(data) {
        data=$.parseJSON(data);
        APPCONFIG=data;

        // APPCONFIG.DEBUG=appUtils.isDev();

        if(appUtils.isDev()) {
            APPCONFIG=$.extend(APPCONFIG,APPCONFIG.SETTINGS.DEV);
        } else {
            APPCONFIG=$.extend(APPCONFIG,APPCONFIG.SETTINGS.PROD);
        }

        if(APPCONFIG.HOME==null) APPCONFIG.HOME="#home";

        if(APPCONFIG.UICONFIG==null) APPCONFIG.UICONFIG={};
        if(APPCONFIG.POLICIES==null) APPCONFIG.POLICIES={};

        checkAppPaths();

        // initLoggers();

        //Start Debugger
        // appDebugger();

        initUI(initEvents);

        loadAppShell();

        setTimeout(function() {
            // appAPI.checkAlerts();
        },appData.getConfig('NOTIFICATION_INTERVAL'));
    });
});

function initUI(callBack) {
    appUI.generateMenu();
    appUI.showTray();
    
    if(callBack!=null && typeof callBack=="function") {
        callBack();
    }
}

function initEvents() {
    $("body").delegate("a[href].pageLink","click",function() {
        href=$(this).attr('href');
        appUI.navigatePage(href, this);
        return false;
    });
    $("body").delegate("a[href].browserLink","click",function() {
        href=$(this).attr('href');
        remote.shell.openItem(href);
        return false;
    });
    $("body").delegate("*.actioncmd[cmd]","click",function() {
        cmd=$(this).attr('cmd');
        if(window[cmd]!=null) window[cmd](this);
        return false;
    });

    $("body").delegate("*.actionchange[cmd],*.actionChange[cmd]","change",function() {
        cmd=$(this).attr('cmd');
        if(window[cmd]!=null) window[cmd](this);
        return false;
    });
    
    $("body").delegate(".searchPage input[type=search]","keyup",function(e) {
        appUtils.searchPage("#albumList",$(this).val(),".albumUnit",".searchText");
    });
}

function registerShortcut(key, callBack) {//'Ctrl+A'
// electronShortcut.register(remote.getCurrentWindow(),key,function(e) {
    // electronShortcut.register(remote.getGlobal("getMainWindow")(),key,function(e) {
    //     // console.log("CTRL+A");
    //     if(typeof callBack=="function") callBack(e);
    // });
}

function loadAppShell() {
    $("body").load("./app/app.html");
}

/*Other Supporting Functions*/
function logoutApp() {
    appSecure.doLogout(function() {
        appUI.navigatePage("login");
    },function() {
        appUI.navigatePage("login");
    });
    
}

function maximize() {
    if(remote.getCurrentWindow().isMaximized()) {
        remote.getCurrentWindow().restore();
    } else {
        remote.getCurrentWindow().maximize();
    }
}

function fullScreen() {
    if(remote.getCurrentWindow().isFullScreen()) {
        remote.getCurrentWindow().setFullScreen(false);
    } else {
        remote.getCurrentWindow().setFullScreen(true);
    }
}

function closeApp() {
    remote.app.exit();
}
function reloadApp() {
    window.location.reload();
}

function appDebugger() {
    if(APPCONFIG.DEBUG!=true) return;

    //Page Change Watcher
    fsUtils.watch(__dirname+"/app/pages/",function (event, filename) {
        fileHashlink=filename.replace(".html","");
        switch(event) {
            case "change":
                if(appUI.CURRENT_PAGE==fileHashlink) {
                    appUI.reloadPage();
                } else {
                    appUI.navigatePage(fileHashlink);
                }
            break;
            case "rename":

            break;
            case "delete":

            break;
        }
    });
}
function initLoggers() {
    logPath=getLogsPath();

    logger=new (winston.Logger)({
            level: 'verbose',
            transports: [
                new (winston.transports.Console)({ level: 'warn' }),
                new (winston.transports.File)({
                  name: 'info-file',
                  filename: fsPath.join(logPath,"info.log"),
                  level: 'info'
                }),
                new (winston.transports.File)({
                  name: 'warn-file',
                  filename: fsPath.join(logPath,"warning.log"),
                  level: 'warn'
                }),
                new (winston.transports.File)({
                  name: 'error-file',
                  filename: fsPath.join(logPath,"error.log"),
                  level: 'error'
                })
            ]
          });
    console.info=function(e) {
            logger.info(e);//2
        }
    console.warn=function(e) {
            logger.warn(e);//1
        }
    console.error=function(e) {
            logger.error(e);//0
        }
    
    console.info("Starting Application On "+moment(new Date()).format("Y-MM-d H:m:s"));
    console.info("Application Path "+fsPath.join(getAppPath(),"usermedia"));
}


function showLoader(divID) {
    $(divID).html("<div style='text-align:center;width: 100%;margin-top:100px;'><span class='fa fa-spinner fa-2x fa-spin'></span></div>");
}
function hideLoader(divID) {
    $(divID).html("<div style='text-align:center;width: 100%;margin-top:100px;display: none;'><span class='fa fa-spinner fa-2x fa-spin'></span></div>");
}