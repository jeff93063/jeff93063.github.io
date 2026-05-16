const inchmm = .039370079;
const fracPrec = 64;
const drills = [[0.0019,"#107"],[0.0023,"#106"],[0.0027,"#105"],[0.0031,"#104"],[0.0035,"#103"],[0.0039,"#102"],[0.0043,"#101"],
    [0.0047,"#100"],[0.0051,"#99"],[0.0055,"#98"],[0.0059,"#97"],[0.0063,"#96"],[0.0067,"#95"],[0.0071,"#94"],[0.0075,"#93"],
    [0.0079,"#92"],[0.0083,"#91"],[0.0087,"#90"],[0.0091,"#89"],[0.0095,"#88"],[0.0100,"#87"],[0.0105,"#86"],[0.0110,"#85"],
    [0.0115,"#84"],[0.0120,"#83"],[0.0125,"#82"],[0.0130,"#81"],[0.0135,"#80"],[0.0145,"#79"],[0.0160,"#78"],[0.0180,"#77"],
    [0.0200,"#76"],[0.0210,"#75"],[0.0225,"#74"],[0.0240,"#73"],[0.0250,"#72"],[0.0260,"#71"],[0.0280,"#70"],[0.0292,"#69"],
    [0.0310,"#68"],[0.0320,"#67"],[0.0330,"#66"],[0.0350,"#65"],[0.0360,"#64"],[0.0370,"#63"],[0.0380,"#62"],[0.0390,"#61"],
    [0.0400,"#60"],[0.0410,"#59"],[0.0420,"#58"],[0.0430,"#57"],[0.0465,"#56"],[0.0520,"#55"],[0.0550,"#54"],[0.0595,"#53"],
    [0.0635,"#52"],[0.0670,"#51"],[0.0700,"#50"],[0.0730,"#49"],[0.0760,"#48"],[0.0785,"#47"],[0.0810,"#46"],[0.0820,"#45"],
    [0.0860,"#44"],[0.0890,"#43"],[0.0935,"#42"],[0.0960,"#41"],[0.0980,"#40"],[0.0995,"#39"],[0.1015,"#38"],[0.1040,"#37"],
    [0.1065,"#36"],[0.1100,"#35"],[0.1110,"#34"],[0.1130,"#33"],[0.1160,"#32"],[0.1200,"#31"],[0.1285,"#30"],[0.1360,"#29"],
    [0.1405,"#28"],[0.1440,"#27"],[0.1470,"#26"],[0.1495,"#25"],[0.1520,"#24"],[0.1540,"#23"],[0.1570,"#22"],[0.1590,"#21"],
    [0.1610,"#20"],[0.1660,"#19"],[0.1695,"#18"],[0.1730,"#17"],[0.1770,"#16"],[0.1800,"#15"],[0.1820,"#14"],[0.1850,"#13"],
    [0.1890,"#12"],[0.1910,"#11"],[0.1935,"#10"],[0.1960,"#9"],[0.1990,"#8"],[0.2010,"#7"],[0.2040,"#6"],[0.2055,"#5"],
    [0.2090,"#4"],[0.2130,"#3"],[0.2210,"#2"],[0.2280,"#1"],[0.2340,"A"],[0.2380,"B"],[0.2420,"C"],[0.2460,"D"],[0.2500,"E"],
    [0.2570,"F"],[0.2610,"G"],[0.2660,"H"],[0.2720,"I"],[0.2770,"J"],[0.2810,"K"],[0.2900,"L"],[0.2950,"M"],[0.3020,"N"],
    [0.3160,"O"],[0.3230,"P"],[0.3320,"Q"],[0.3390,"R"],[0.3480,"S"],[0.3580,"T"],[0.3680,"U"],[0.3770,"V"],[0.3860,"W"],
    [0.3970,"X"],[0.4040,"Y"],[0.4130,"Z"]];

function gcd(a, b) {
	if (!b) {
		return a;
	}
	return gcd(b, a % b);
}

function reduce(num, denom){
	let g = gcd(num,denom);
	return num/g + "/" + denom/g;
}

function calculate() {
	let nearby = [];
	let numIn = parseFloat(document.getElementById("numIn").value);
	let prevMetric = Math.floor(numIn / inchmm);
	let nextMetric = Math.ceil(numIn / inchmm);
	let nearestMetric = Math.round(numIn / inchmm);
	if ((nearestMetric*inchmm).toFixed(4) == numIn.toFixed(4)){
		nearby.push([nearestMetric*inchmm,nearestMetric + " mm"]);
		nearby.push([(nearestMetric+1)*inchmm, (nearestMetric+1) + " mm"]);
		nearby.push([(nearestMetric-1)*inchmm, (nearestMetric-1) + " mm"]);
	}
	else {
		nearby.push([prevMetric*inchmm,prevMetric + " mm"]);
		nearby.push([nextMetric*inchmm,nextMetric + " mm"]);
	}
	for (i=0;i<fracPrec;i++){
		if((i/fracPrec).toFixed(4) == numIn.toFixed(4)){ //right on the money, push 3 numbers instead of 2
			nearby.push([(i-1)/fracPrec, reduce(i-1,fracPrec)]);
			nearby.push([i/fracPrec, reduce(i, fracPrec)]);
			nearby.push([(i+1)/fracPrec, reduce(i+1, fracPrec)]);
		}
		else if((i/fracPrec).toFixed(4) < numIn.toFixed(4) && ((i+1)/fracPrec).toFixed(4) > numIn.toFixed(4)){
			nearby.push([i/fracPrec,reduce(i, fracPrec)]);
			nearby.push([(i+1)/fracPrec, reduce(i+1,fracPrec)]);
		}
	}
	for (j=0; j<drills.length; j++){
		if(drills[j][0] == numIn){ //right on the money
			nearby.push(drills[j-1]);
			nearby.push(drills[j]);
			nearby.push(drills[j+1]);
		}
		else if(drills[j][0] < numIn && drills[j+1][0] > numIn){
			nearby.push(drills[j]);
			nearby.push(drills[j+1]);
		}
	}
	nearby.sort(function(a,b){
		return b[0]-a[0];
	});
	let min = nearby[nearby.length-1][0];
	let max = nearby[0][0];
	let spread = 0;
	if (numIn - min > max - numIn){
		spread = numIn - min;
	}
	else{
		spread = max - numIn;
	}
	console.log("min=" + min + "\nmax=" + max + "\nspread=" + spread);
	for (m=0;m<nearby.length;m++){

	}
	let beforeString = "";
	let afterString = "";
	let equalString = "";
	for (k=0;k<nearby.length;k++){
		if (nearby[k][0].toFixed(4) == numIn.toFixed(4)){
			equalString += nearby[k][0].toFixed(4) + " = " + nearby[k][1] + "<br />";
		}
		else if (nearby[k][0] < numIn){
			console.log(nearby[k][0]);
			let top = .5 + ((numIn - nearby[k][0])/spread) * .5;
			console.log(top);
			afterString += "<span style='--myvar:" + top + ";'>" + nearby[k][0].toFixed(4) + " = " + nearby[k][1] + "</span>";
		}
		else{
			console.log(nearby[k][0]);
			let top = .5 - ((nearby[k][0] - numIn)/spread) * .5;
			console.log(top);
			beforeString += "<span style='--myvar:" + top + ";'>" + nearby[k][0].toFixed(4) + " = " + nearby[k][1] + "</span>";
		}
	}
	document.getElementById("output").innerHTML = beforeString + "<span style='--myvar:.5;'>" + equalString + "</span>" + afterString;
}
