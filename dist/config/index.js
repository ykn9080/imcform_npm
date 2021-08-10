"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.persistVar = exports.globalVar = exports.currentsetting = void 0;
const server_url = {
  dockermachine: "http://192.168.99.100:3001/",
  local: "http://localhost:9006/",
  cyram_dev: "http://src.netminer.com:9006/",
  namubuntu: "http://imcmaster.iptime.org:9006/",
  wifiubuntu: "http://imcmaster.iptime.org:9016/",
  smartasp: "http://node.imcmaster.co.kr/",
  digitalocean: "http://167.71.208.218:9006/"
};
const current_url = server_url.wifiubuntu;
const currentsetting = {
  passporturl: current_url,
  webserviceprefix: current_url,
  googlekey: "AIzaSyBIJnp5VXSiVEAr8xPM7-OWAYRfdYtlbV0"
}; //collection of global variable for Redux store initvalue

exports.currentsetting = currentsetting;
const persistVar = {
  login: "",
  token: "",
  menu: [],
  adminmenu: [],
  openmenu: []
};
exports.persistVar = persistVar;
const globalVar = {
  googlekey: currentsetting.googlekey,
  //"AIzaSyBIJnp5VXSiVEAr8xPM7-OWAYRfdYtlbV0"
  passporturl: currentsetting.passporturl,
  //"http://localhost:3001",
  webserviceprefix: currentsetting.webserviceprefix,
  //"http://localhost:3001/",//"http://www.imcmaster.co.kr/webservice.asmx/",
  fixedStr: ["$comp", "$name", "$id", "$boss", "$division", "$position"],
  fixedPeriod: ["$thisYear", "$thisQuarter", "$thisMonth", "$thisWeek", "$thisWeednumber", "$Today", "$Yesterday", "$Tomorrow"],
  convertlist: ["en:us", "cn:zh-cn", "cn:zh-tw", "jp:ja"],
  connecthead: ["code", "dbtype", "server", "database", "port", "user", "password"],
  openDialog: false,
  openDialog1: false,
  openDialog2: false,
  openPopup: false,
  openHelp: false,
  showSpin: false,
  tf1: false,
  tf2: false,
  tf3: false,
  obj1: {},
  obj2: {},
  obj3: {},
  formEdit: false,
  elementData: "",
  formData: [],
  listData: [],
  currentData: "",
  currentLink: null,
  returnpath: null,
  allData: null,
  allModel: null,
  treeData: "",
  flatData: "",
  login: "",
  token: null,
  selectedKey: "",
  selectedKey1: null,
  currentPage: "",
  tempMenu: [],
  tempData: null,
  tempModel: null,
  tempModelList: null,
  tempProject: null,
  tempSessionList: null,
  tempSession: null,
  tempTable: null,
  tempStyle: null,
  menu: [],
  adminmenu: [],
  openmenu: [],
  menuedit: false,
  showSidebar: true,
  apiUrl: "",
  projectbundle: "",
  dataviewBundle: null,
  currentStep: 0,
  subStep: 0,
  nextStep: null,
  graphdata: null,
  fullscreen: false,
  nodelink: {},
  card: {},
  optlist: [],
  modelresults: null,
  chklist: [],
  triggerChild: [],
  manipulation: null,
  paramvalue: null,
  showall: false,
  edit: false,
  help: null,
  helpLink: null,
  display: "icon",
  sortAction: false,
  searchWord: {},
  tabIndex: {},
  visiblebtn: false,
  graphclick: {},
  logicArr: []
};
exports.globalVar = globalVar;