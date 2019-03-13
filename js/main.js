let validId,validPassword,validName,validCountry,validEmail,validZip,validLanguage,validComments,validDate,validNameMF,validSurnameMF,validDateMF;
$(document).ready(function(){
	hideAlerts();
	initDate();
	initRadioGroup();
	let fieldsMF = $("#fieldsMF");
	fieldsMF.hide();
	let textId = $("#textId");
	textId.blur(function(){validateId()});
	let textPassword = $("#textPassword");
	textPassword.blur(function(){validatePassword()});
	let textName = $("#textName");
	textName.blur(function(){validateName()});
	let textEmail = $("#textEmail");
	textEmail.blur(function(){validateEmail()});
	let textZip = $("#textZip");
	textZip.blur(function(){validateZip()});
	let btnSave = $("#btnSave");
	btnSave.click(function(){submitForm()});
	btnSave.prop("disabled",true);
	let pCounter = $("#counter");
	pCounter.hide();
	let textareaComments = $("#textareaComments");
	textareaComments.keyup(function(){counterChar()});
	textareaComments.focus(function(){showCounter()});
	textareaComments.blur(function(){hideCounter()});
	let selectCountry = $("#selectCountry");
	selectCountry.blur(function(){validateCountry()});
	let checkLanguage = $("input[type = 'checkbox']");
	checkLanguage.each(function(){
		$(this).click(function(){validateLanguage()});
	});
	let btnMF = $("#btnMF");
	btnMF.click(function(){
		fieldsMF.toggle();
		let value = $(this).val() == "SÍ" ? "NO" : "SÍ";
		$(this).attr("value",value);
	});
	let textDate = $("#textDate");
	textDate.blur(function(){validateDate()});
});

function hideAlerts(){
	$(".alert").each(function(){
		$(this).hide();
	});
}

function validateId(){
	let alertId = $("#alertId");
	let id = event.target.value;
	if (!validateEmpty(alertId,id)){
		mAddClass(event.target.id,"border-danger");
		validId = false;
	}else if(!validateLength(5,12,id,alertId)){
		mAddClass(event.target.id,"border-danger");
		validId = false;
	}else{
		hideAlert(alertId);
		mRemoveClass(event.target.id,"border-danger");
		validId = true;
		validForm();
	}
}

function validateEmpty(alertError,value){
	const MESSAGE = "Campo obligatorio"
	let isValid = true;
	if (!value){
		showAlert(alertError,MESSAGE);
		isValid = false;
	}
	return isValid;
}

function validatePassword(){
	let alertPassword = $("#alertPassword");
	let password = event.target.value;
	if (!validateEmpty(alertPassword,password)){
		mAddClass(event.target.id,"border-danger");
		validPassword = false;
	}else if(!validateLength(7,12,password,alertPassword)){
		mAddClass(event.target.id,"border-danger");
		validPassword = false;
	}else{
		hideAlert(alertPassword);
		mRemoveClass(event.target.id,"border-danger");
		validPassword = true;
		validForm();
	}
}

function validateName(){
	let alertName = $("#alertName");
	let name = event.target.value;
	let expReg = new RegExp(/^[A-Za-z\s]+$/g);
	const MESSAGE = "El nombre no puede contener números";
	if (!validateEmpty(alertName,name)){
		mAddClass(event.target.id,"border-danger");
		validName = false;
	}else if(!validateValue(name,expReg,alertName,MESSAGE)){
		mAddClass(event.target.id,"border-danger");
		validName = false;
	}else{
		hideAlert(alertName);
		mRemoveClass(event.target.id,"border-danger");
		validName = true;
		validForm();
	}
}

function validateEmail(){
	let alertEmail = $("#alertEmail");
	let email = event.target.value;
	let regExp = new RegExp(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i);
	const MESSAGE = "Email no válido";
	if (!validateEmpty(alertEmail,email)){
		mAddClass(event.target.id,"border-danger");
		validEmail = false;
	}else if(!validateValue(email,regExp,alertEmail,MESSAGE)){
		mAddClass(event.target.id,"border-danger");
		validEmail = false;
	}else{
		hideAlert(alertEmail);
		mRemoveClass(event.target.id,"border-danger");
		validEmail = true;
		validForm();
	}
}

function validateZip(){
	let alertZip = $("#alertZip");
	let zip = event.target.value;
	let expReg = new RegExp(/^[0-9\s]+$/g);
	const MESSAGE = "El código zip no puede contener letras";
	if (!validateEmpty(alertZip,zip)){
		mAddClass(event.target.id,"border-danger");
		validZip = false;
	}else if(!validateValue(zip,expReg,alertZip,MESSAGE)){
		mAddClass(event.target.id,"border-danger");
		validZip = false;
	}else{
		hideAlert(alertZip);
		mRemoveClass(event.target.id,"border-danger");
		validZip = true;
		validForm();
	}
}

function submitForm(){
	let mForm = $("#mForm");
	mForm.submit();
}

function validateCountry(){
	let countrySelected = $("#selectCountry option:selected").text();
	let alertCountry = $("#alertCountry");
	if (countrySelected == "Selecciona un país..."){
		mAddClass(event.target.id,"border-danger");
		showAlert(alertCountry,"Debes seleccionar un país");
		validCountry = false;
	}else{
		hideAlert(alertCountry);
		mRemoveClass(event.target.id,"border-danger");
		validCountry = true;
		validForm();
	}
}

function validateLanguage(){
	let alertLanguage = $("#alertLanguage");
	let checkLanguage = $("input[name = 'language']");
	let counter = 0;
	checkLanguage.each(function(){
		if ($(this).prop("checked")){
			counter++;
		}
	});
	if (counter < 1){
		showAlert(alertLanguage,"Debes seleccionar al menos un idioma")
		validLanguage = false;
	}else{
		hideAlert(alertLanguage);
		validLanguage = true;
		validForm();
	}
}

function validateLength(minLength,maxLength,value,alertError){
	const MESSAGE = "Tiene que tener una longitud entre " + minLength + " y " + maxLength;
	let isValid = true;
	if (value.length < minLength || value.length > maxLength){
		showAlert(alertError,MESSAGE);
		isValid = false;
	}
	return isValid;
}

function validateValue(value,expReg,alertError,message){
	let isValid = true;
	if (!expReg.test(value)){
		showAlert(alertError,message);
		isValid = false;
	}
	return isValid;
}

function mAddClass(input,value){
	$("#" + input).addClass(value);
}

function mRemoveClass(input,value){
	$("#" + input).removeClass(value);
}

function hideAlert(alertError){
	alertError.hide();
}

function showAlert(alertError,message){
	alertError.show();
	alertError.text(message);
}

function counterChar(){
	let charLength = event.target.value.length;
	const MAXLENGTH = 240;
	let pCounter = $("#counter");
	pCounter.text(charLength + "/" + MAXLENGTH);
	if (charLength > MAXLENGTH){
		mAddClass(pCounter.attr("id"),"text-danger");
		validComments = false;
	}else{
		mRemoveClass(pCounter.attr("id"), "text-danger");
		validComments = true;
	}
}

function showCounter(){
	let pCounter = $("#counter");
	pCounter.show();
}

function hideCounter(){
	let pCounter = $("#counter");
	pCounter.hide();
}

function validForm(){
	let btnSave = $("#btnSave");
	let fieldsMF = $("#fieldsMF");
	if (fieldsMF.css("display") == "none"){
		if (validId && validPassword && validName && validCountry && validEmail && validZip && validLanguage && validateDate){
			btnSave.prop("disabled",false);
		}
	}else{
		alert("esta activo");
	}
}

function initDate(){
	let textDate = $("#textDate");
	let textDateMF = $("#textDateMF");
	textDate.datepicker({
		changeMonth: true,
		changeYear: true
	});
	textDateMF.datepicker({
		changeMonth: true,
		changeYear: true
	});
}

function initRadioGroup(){
	let radioSons = $("input[name = 'sons']");
	radioSons.checkboxradio();
}

function validateDate(){
	let alertDate = $("#alertDate");
	let date = event.target.value;
	if (!validateEmpty(alertDate,date)){
		mAddClass(event.target.id,"border-danger");
		validDate = false;
	}else{
		hideAlert(alertDate);
		mRemoveClass(event.target.id,"border-danger");
		validateDate = true;
		validForm();
	}
}

