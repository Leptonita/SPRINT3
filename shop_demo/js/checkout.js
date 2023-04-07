'use strict';

function notOnlyLetters(text){
	
	let letrasValidas = 'aáàbcdeéèfghiíìjklmnñoóòpqrstuúùvwxyz '; //espacio en blanco para nombres compuestos
	let result = false;
	for (let i = 0 ; i < text.length; i++) {
		if (!letrasValidas.includes((text.charAt(i)).toLowerCase())){
			result = true;  //hay algun caracter que no es letra valida
		}
	}
	return result;
}

function numerosConLetras(text) {
	
	return (pattern.test(text));
}

// Exercise 7
function validate() {
	let error = 0;
	// Get the input fields
	let fName = document.getElementById("fName");
	let fLastN = document.getElementById("fLastN");
	let fAddress = document.getElementById("fAddress");

	let fEmail = document.getElementById("fEmail");
	let fPassword = document.getElementById("fPassword");
	let fPhone = document.getElementById("fPhone");

	// Get the error elements
	let errorName = document.getElementById("errorName");
	let errorLastN = document.getElementById("errorLastN");
	let errorAddress = document.getElementById("errorAddress");

	let errorEmail = document.getElementById("errorEmail");  
	let errorPassword = document.getElementById("errorPassword");
	let errorPhone = document.getElementById("errorPhone");

	// Regular Expressions 
	let patternLettersNumbers = /([a-z].*[0-9])|([0-9].*[a-z])/i;
	
	let patternOnlyLetters = /^[A-z]+\s*[A-z]+$/gi; 
	//patternOnlyLetters contempla dos palabras para nombres compuestos y dos apellidos 
	//  patternOnlyLetters only one string with letters /^[A-z]+$/gi
	//let patternOnlyNumbers = /^[0-9]+$/g;
	
	let patternEmail = /^\w+([\.-_+]?\w+)*@\w+([\.-]?\w+)*(\.[a-z]{2,10})+$/i ;

	// Validate fields entered by the user: name, phone, password, and email
	if(fName.value == "" || notOnlyLetters(fName.value) || fName.value.length <3){
		error++;
		fName.style.borderColor = 'red';
		//fName.classList.add("is-invalid");
		//fName.classList.remove("is-valid");
		errorName.style.display = 'block';
	} else{
		//fName.classList.remove("is-invalid");
		//fName.classList.add("is-valid");
		fName.style.borderColor = 'green';
		errorName.style.display = 'none';
	}
	
	
	if(fLastN.value == "" || !patternOnlyLetters.test(fLastN.value)  || fLastN.value.length <3){
		error++;
		fLastN.style.borderColor = 'red';
		errorLastN.style.display = 'block';
	} else {
		fLastN.style.borderColor = 'green';
		errorLastN.style.display = 'none';
	}
	

	if(fAddress.value == "" || fAddress.value.length <3){
		error++;
		fAddress.style.borderColor = 'red';
		errorAddress.style.display = 'block';
	} else {
		fAddress.style.borderColor = 'green';
		errorAddress.style.display = 'none';
	}


	if(fEmail.value == "" || !patternEmail.test(fEmail.value) || fEmail.value.length < 3){
		error++;
		fEmail.style.borderColor = 'red';
		errorEmail.style.display = 'block';
	} else {
		fEmail.style.borderColor = 'green';
		errorEmail.style.display = 'none';
	}

	if(fPassword.value == "" || !patternLettersNumbers.test(fPassword.value)|| fPassword.value.length < 3){
		error++;
		fPassword.style.borderColor = 'red';
		errorPassword.style.display = 'block';
	} else {
		fPassword.style.borderColor = 'green';
		errorPassword.style.display = 'none';
	}

	//console.log('!patternLettersNumbers.test(fPassword.value)',!patternLettersNumbers.test(fPassword.value));

	if(fPhone.value == "" || isNaN(fPhone.value)|| fPhone.value.length !=9){
		error++;
		fPhone.style.borderColor = 'red';
		errorPhone.style.display = 'block';
	} else {
		fPhone.style.borderColor = 'green';
		errorPhone.style.display = 'none';
	}
	/* 
	*/


	/*  
	if(error>0){
		alert("Error");
	}else{
		alert("OK");
	}
 	*/
}

