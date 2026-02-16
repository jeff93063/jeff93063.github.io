if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
	navigator.serviceWorker
	  .register("serviceWorker.js")
	  .then(res => console.log("service worker registered"))
	  .catch(err => console.log("service worker not registered", err))
  })
}
function setCookie(name,value,days) { //https://stackoverflow.com/questions/14573223/set-cookie-and-get-cookie-with-javascript
	//console.log("cookie name=" + name + " value=" + value + " days=" + days);
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days*24*60*60*1000));
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "")  + expires + "; path=/; SameSite=Strict";
}
function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function eraseCookie(name) {   
	document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function $(id) { return document.getElementById(id); }
var last = null;
var disableAutoFocus = false;
var focused = [];
var matlData = {
	"milling":{
		"al":{
			"hss":{
				"sfmMin":100,
				"sfmMax":300,
				"chipData": [
					{"dia":0, "minChip":0, "maxChip":0},
					{"dia":0.0625, "minChip":.0002, "maxChip":.0005},
					{"dia":0.125, "minChip":0.0003, "maxChip":0.0008},
					{"dia":0.25, "minChip":0.0005, "maxChip":0.0015},
					{"dia":0.375, "minChip":0.0005, "maxChip":0.0023},
					{"dia":0.5, "minChip":0.0005, "maxChip":0.003},
					{"dia":0.75, "minChip":0.0013, "maxChip":0.006},
					{"dia":1, "minChip":0.002, "maxChip":0.009},
					{"dia":1.5, "minChip":0.0035, "maxChip":0.015},
					{"dia":2, "minChip":0.005, "maxChip":0.021}
				]
			},
			"carbide":{
				"sfmMin":600,
				"sfmMax":1200,
				"chipData": [
					{"dia":0, "minChip":0, "maxChip":0},
					{"dia":0.0625, "minChip":0.0003, "maxChip":0.0008},
					{"dia":0.125, "minChip":0.0005, "maxChip":0.0015},
					{"dia":0.25, "minChip":0.001, "maxChip":0.003},
					{"dia":0.375, "minChip":0.002, "maxChip":0.004},
					{"dia":0.5, "minChip":0.003, "maxChip":0.005},
					{"dia":0.75, "minChip":0.0045, "maxChip":0.0075},
					{"dia":1, "minChip":0.006, "maxChip":0.01},
					{"dia":1.5, "minChip":0.009, "maxChip":0.015},
					{"dia":2, "minChip":0.012, "maxChip":0.02}
				]
			}
		},
		"stl":{
			"hss":{
				"sfmMin":80,
				"sfmMax":100,
				"chipData": [
					{"dia":0, "minChip":0, "maxChip":0},
					{"dia":0.0625, "minChip":0.0002, "maxChip":0.0005},
					{"dia":0.125, "minChip":0.0003, "maxChip":0.001},
					{"dia":0.25, "minChip":0.0005, "maxChip":0.002},
					{"dia":0.375, "minChip":0.0008, "maxChip":0.0025},
					{"dia":0.5, "minChip":0.001, "maxChip":0.003},
					{"dia":0.75, "minChip":0.0015, "maxChip":0.0045},
					{"dia":1, "minChip":0.002, "maxChip":0.006},
					{"dia":1.5, "minChip":0.003, "maxChip":0.009},
					{"dia":2, "minChip":0.004, "maxChip":0.012}
				]
			},
			"carbide":{
				"sfmMin":100,
				"sfmMax":350,
				"chipData": [
					{"dia":0, "minChip":0, "maxChip":0},
					{"dia":0.0625, "minChip":0.0006, "maxChip":0.0008},
					{"dia":0.125, "minChip":0.0008, "maxChip":0.0012},
					{"dia":0.25, "minChip":0.0012, "maxChip":0.002},
					{"dia":0.375, "minChip":0.0018, "maxChip":0.0028},
					{"dia":0.5, "minChip":0.0024, "maxChip":0.0036},
					{"dia":0.75, "minChip":0.0037, "maxChip":0.0053},
					{"dia":1, "minChip":0.005, "maxChip":0.007},
					{"dia":1.5, "minChip":0.0076, "maxChip":0.0104},
					{"dia":2, "minChip":0.0102, "maxChip":0.0138}
				]
			}
		},
		"cres":{
			"hss":{
				"sfmMin":40,
				"sfmMax":60,
				"chipData": [
					{"dia":0, "minChip":0, "maxChip":0},
					{"dia":0.0625, "minChip":0.0002, "maxChip":0.0005},
					{"dia":0.125, "minChip":0.0003, "maxChip":0.0008},
					{"dia":0.25, "minChip":0.0004, "maxChip":0.0015},
					{"dia":0.375, "minChip":0.0007, "maxChip":0.0023},
					{"dia":0.5, "minChip":0.001, "maxChip":0.003},
					{"dia":0.75, "minChip":0.0013, "maxChip":0.004},
					{"dia":1, "minChip":0.0015, "maxChip":0.005},
					{"dia":1.5, "minChip":0.002, "maxChip":0.007},
					{"dia":2, "minChip":0.0025, "maxChip":0.009}
				]
			},
			"carbide":{
				"sfmMin":50,
				"sfmMax":250,
				"chipData": [
					{"dia":0, "minChip":0, "maxChip":0},
					{"dia":0.0625, "minChip":0.0002, "maxChip":0.0003},
					{"dia":0.125, "minChip":0.0004, "maxChip":0.0006},
					{"dia":0.25, "minChip":0.0008, "maxChip":0.0012},
					{"dia":0.375, "minChip":0.0012, "maxChip":0.0018},
					{"dia":0.5, "minChip":0.0016, "maxChip":0.0024},
					{"dia":0.75, "minChip":0.002, "maxChip":0.003},
					{"dia":1, "minChip":0.0024, "maxChip":0.0036},
					{"dia":1.5, "minChip":0.0032, "maxChip":0.0048},
					{"dia":2, "minChip":0.004, "maxChip":0.006}
				]
			}
		}
	},
	"drilling":{
		"al":{
			"hss":{
				"sfmMin":200,
				"sfmMax":300,
				"chipData": [
					{"dia":0, "minChip":0, "maxChip":0},
					{"dia":0.0625, "minChip":0.001, "maxChip":0.0022},
					{"dia":0.125, "minChip":0.002, "maxChip":0.006},
					{"dia":0.25, "minChip":0.004, "maxChip":0.01},
					{"dia":0.375, "minChip":0.0055, "maxChip":0.0125},
					{"dia":0.5, "minChip":0.007, "maxChip":0.015},
					{"dia":0.75, "minChip":0.01, "maxChip":0.02},
					{"dia":1, "minChip":0.013, "maxChip":0.025},
					{"dia":1.5, "minChip":0.019, "maxChip":0.035},
					{"dia":2, "minChip":0.025, "maxChip":0.045}
				]
			},
			"carbide":{
				"sfmMin":150,
				"sfmMax":400,
				"chipData": [
					{"dia":0, "minChip":0, "maxChip":0},
					{"dia":0.0625, "minChip":0.0006, "maxChip":0.0013},
					{"dia":0.125, "minChip":0.001, "maxChip":0.0025},
					{"dia":0.25, "minChip":0.002, "maxChip":0.004},
					{"dia":0.375, "minChip":0.003, "maxChip":0.005},
					{"dia":0.5, "minChip":0.004, "maxChip":0.006},
					{"dia":0.75, "minChip":0.006, "maxChip":0.008},
					{"dia":1, "minChip":0.008, "maxChip":0.01},
					{"dia":1.5, "minChip":0.012, "maxChip":0.014},
					{"dia":2, "minChip":0.016, "maxChip":0.018}
				]
			}
		},
		"stl":{
			"hss":{
				"sfmMin":45,
				"sfmMax":70,
				"chipData": [
					{"dia":0, "minChip":0, "maxChip":0},
					{"dia":0.0625, "minChip":0.001, "maxChip":0.0022},
					{"dia":0.125, "minChip":0.002, "maxChip":0.006},
					{"dia":0.25, "minChip":0.004, "maxChip":0.01},
					{"dia":0.375, "minChip":0.0055, "maxChip":0.0125},
					{"dia":0.5, "minChip":0.007, "maxChip":0.015},
					{"dia":0.75, "minChip":0.01, "maxChip":0.02},
					{"dia":1, "minChip":0.013, "maxChip":0.025},
					{"dia":1.5, "minChip":0.019, "maxChip":0.035},
					{"dia":2, "minChip":0.025, "maxChip":0.045}
				]
			},
			"carbide":{
				"sfmMin":30,
				"sfmMax":90,
				"chipData": [
					{"dia":0, "minChip":0, "maxChip":0},
					{"dia":0.0625, "minChip":0.0004, "maxChip":0.0006},
					{"dia":0.125, "minChip":0.0008, "maxChip":0.0012},
					{"dia":0.25, "minChip":0.0016, "maxChip":0.0024},
					{"dia":0.375, "minChip":0.002, "maxChip":0.003},
					{"dia":0.5, "minChip":0.0024, "maxChip":0.0036},
					{"dia":0.75, "minChip":0.0032, "maxChip":0.0048},
					{"dia":1, "minChip":0.004, "maxChip":0.006},
					{"dia":1.5, "minChip":0.0056, "maxChip":0.0084},
					{"dia":2, "minChip":0.0072, "maxChip":0.0108}
				]
			}
		},
		"cres":{
			"hss":{
				"sfmMin":30,
				"sfmMax":50,
				"chipData": [
					{"dia":0, "minChip":0, "maxChip":0},
					{"dia":0.0625, "minChip":0.001, "maxChip":0.0022},
					{"dia":0.125, "minChip":0.002, "maxChip":0.006},
					{"dia":0.25, "minChip":0.004, "maxChip":0.01},
					{"dia":0.375, "minChip":0.0055, "maxChip":0.0125},
					{"dia":0.5, "minChip":0.007, "maxChip":0.015},
					{"dia":0.75, "minChip":0.01, "maxChip":0.02},
					{"dia":1, "minChip":0.013, "maxChip":0.025},
					{"dia":1.5, "minChip":0.019, "maxChip":0.035},
					{"dia":2, "minChip":0.025, "maxChip":0.045}
				]
			},
			"carbide":{
				"sfmMin":30,
				"sfmMax":90,
				"chipData": [
					{"dia":0, "minChip":0, "maxChip":0},
					{"dia":0.0625, "minChip":0.0004, "maxChip":0.0006},
					{"dia":0.125, "minChip":0.0004, "maxChip":0.0006},
					{"dia":0.25, "minChip":0.0008, "maxChip":0.0012},
					{"dia":0.375, "minChip":0.001, "maxChip":0.0015},
					{"dia":0.5, "minChip":0.0012, "maxChip":0.0018},
					{"dia":0.75, "minChip":0.0016, "maxChip":0.0024},
					{"dia":1, "minChip":0.002, "maxChip":0.003},
					{"dia":1.5, "minChip":0.0028, "maxChip":0.0042},
					{"dia":2, "minChip":0.0036, "maxChip":0.0054}
				]
			}
		}
	}
};

function initialize() { //grab all values from cookie if it exists
	if(getCookie("operation")){
		for(m of $("operation").options){
			if(getCookie("operation") == m.value){
				m.selected = true;
			}
		}
	}
	if(getCookie("material")){
		for(m of $("material").options){
			if(getCookie("material") == m.value){
				m.selected = true;
			}
		}
	}
	if(getCookie("cutter")){
		for(m of $("cutter").options){
			if(getCookie("cutter") == m.value){
				m.selected = true;
			}
		}
	}
	if(getCookie("dia")){
		$("dia").value = getCookie("dia");
	}
	if(getCookie("flutes")){
		$("flutes").value = getCookie("flutes");
	}
	if(getCookie("maxRPM")){
		$("maxRPM").value = getCookie("maxRPM");
	}
	sfm();
	if(getCookie("sfmOverride")){
		$("sfmOverride").value = getCookie("sfmOverride");
	}
	chip();
	if(getCookie("chipOverride")){
		$("chipOverride").value = getCookie("chipOverride");
	}
}

function sfm() {
	//overwrite sfm box with average recommended
	let matlCutterObject = matlData[$("operation").value][$("material").value][$("cutter").value];
	$("sfmMin").innerHTML = matlCutterObject["sfmMin"];
	$("sfmMax").innerHTML = matlCutterObject["sfmMax"];
	$("sfmOverride").value = (matlCutterObject["sfmMin"] + matlCutterObject["sfmMax"])/2;
}

function chip() {
	let d = parseFloat($("dia").value);
	//overwrite chip load box with average recommended
	let c = matlData[$("operation").value][$("material").value][$("cutter").value].chipData;
	let cMin = 0;
	let cMax = 0;
	for(i=0; i<c.length; i++){
		if(c[i].dia == d){
			cMin = c[i].minChip;
			cMax = c[i].maxChip;
		}
		else if(c[i].dia < d && c[i+1].dia > d){ //INTERPOLATE FOR IN-BETWEEN DIAMETERS
			let proportion = (d-c[i].dia)/(c[i+1].dia-c[i].dia);
			cMin = c[i].minChip + proportion * (c[i+1].minChip - c[i].minChip);
			cMax = c[i].maxChip + proportion * (c[i+1].maxChip - c[i].maxChip);
		}
		$("chipMin").innerHTML = cMin.toFixed(4);
		$("chipMax").innerHTML = cMax.toFixed(4);
		$("chipOverride").value = ((cMin + cMax)/2).toFixed(4);
	}
}

function calculate() {
	setCookie("operation",$("operation").value,99);
	setCookie("material",$("material").value,99);
	setCookie("cutter",$("cutter").value,99);
	setCookie("dia",$("dia").value,99);
	setCookie("flutes",$("flutes").value,99);
	setCookie("maxRPM",$("maxRPM").value,99);
	setCookie("sfmOverride",$("sfmOverride").value,99);
	setCookie("chipOverride",$("chipOverride").value,99);

	let speed = $("sfmOverride").value * 3.82 / $("dia").value;
	if(speed > parseFloat($("maxRPM").value)){
		speed = parseFloat($("maxRPM").value);
	}
	$("speed").value = toSigFigs(speed,2);
	let feed = 0;
	if($("operation").value == "milling"){
		feed = speed * $("chipOverride").value * $("flutes").value;
	}
	else if($("operation").value == "drilling"){
		feed = speed * $("chipOverride").value;
	}
	$("feed").value = toSigFigs(feed,2);
}

function toSigFigs(num, sigFigs = 2) { //from claude
	if (num === 0) return "0." + "0".repeat(Math.max(0, sigFigs - 1));
	if (!isFinite(num)) return String(num);
	if (sigFigs < 1) throw new Error("sigFigs must be at least 1");
	// Get the order of magnitude
	const magnitude = Math.floor(Math.log10(Math.abs(num)));
	// Round to the specified number of significant figures
	const factor = Math.pow(10, magnitude - (sigFigs - 1));
	const rounded = Math.round(num / factor) * factor;
	// Determine decimal places needed
	const decimalPlaces = Math.max(0, (sigFigs - 1) - magnitude);
	return rounded.toFixed(decimalPlaces);
}

