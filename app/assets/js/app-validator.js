// Text Field Validation Functions
// Author : Bismay Kumar Mohapatra

var emailfilter=/^\w+[\+\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i
var numb = '0123456789';
var lwr = 'abcdefghijklmnopqrstuvwxyz';
var upr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function isValid(parm, val) {
    if (parm == "") return true;
    for (i = 0; i < parm.length; i++) {
        if (val.indexOf(parm.charAt(i), 0) == -1) return false;
    }
    return true;
}

function checkmail(ele){
	if(ele.length<=0) return true;
	val=ele.val();
	if(val==null) return  false;
	val=val.trim();
	var returnval=emailfilter.test(val);
	return returnval;
}
function checkurl(ele){
	if(ele.length<=0) return true;
	val=ele.val();
	if(val==null) return  false;
	val=val.trim();
	return (val.indexOf("://")>2);
}
function checkphone(ele){
	if(ele.length<=0) return true;
	val=ele.val();
	if(val==null) return  false;
	val=val.trim();
	v=val.replace(" ","");
	v=v.replace("-","");
	if(v.charAt(0)=="+") {
		v=v.replace("+","");
	}
	if(v.length<10 || v.length>12) return false;
	else if(!isValid(v, numb)) return false;
	else return true;
}

function checkNumber(parm) {
    return isValid(parm, numb);
}

function checkLower(parm) {
    return isValid(parm, lwr);
}

function checkUpper(parm) {
    return isValid(parm, upr);
}

function checkAlpha(parm) {
    return isValid(parm, lwr + upr);
}

function checkAlphanum(parm) {
    return isValid(parm, lwr + upr + numb);
}

function checkDecimal(parm) {
    return isValid(parm, numb + '.');
}

