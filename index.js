const electron = require('electron');
const {app, BrowserWindow} = electron;
const dir = app.getPath('documents') + "/.devutils";
var fs = require('fs');
if(!fs.existsSync(dir)) fs.mkdirSync(dir);

var Datastore = require('nedb')
	, db = new Datastore({ filename: dir + "/data", autoload: true });

exports.dir = dir;

exports.db = db;
app.on('ready', () => {
    const mainWindow = new BrowserWindow({width: 1600, height: 800});
    mainWindow.loadURL(`file://${__dirname}/www/index.html`);
    mainWindow.openDevTools();

});