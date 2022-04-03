function $(el) {
	return document.querySelector(el);
}

const	stateTax = .0241, 
        fedTax = .0462, 
        ficaTax = .062, 
        medTax = .0145,
		hrPay = $("#hrPay"),
		regHours = $("#regHours"),
		otHours = $("#otHours"),
		weeklyCheckBox = $("#weekly"),
		biWeeklyCheckBox = $("#biweekly"),
		inputs = document.querySelectorAll(".input__box");

/*================= PAYCHECK =================*/
let	checkRegPayField = $(".checkRegPay").querySelector(":last-child"),
	checkOTPayField = $(".checkOTPay").querySelector(":last-child"),
	checkGrossPayField = $(".checkGrossPay").querySelector(":last-child"),
	checkStateTaxField = $(".checkStateTax").querySelector(":last-child"),
	checkFedTaxField = $(".checkFedTax").querySelector(":last-child"),
	checkFicaTaxField = $(".checkFicaTax").querySelector(":last-child"),
	checkMedTaxField = $(".checkMedTax").querySelector(":last-child"),
	checkNetPayField = $(".checkNetPay").querySelector(":last-child");
			
/*================= MONTHLY =================*/
let	monthRegPayField = $(".monthRegPay").querySelector(":last-child"),
	monthOTPayField = $(".monthOTPay").querySelector(":last-child"),
	monthGrossPayField = $(".monthGrossPay").querySelector(":last-child"),
	monthStateTaxField = $(".monthStateTax").querySelector(":last-child"),
	monthFedTaxField = $(".monthFedTax").querySelector(":last-child"),
	monthFicaTaxField = $(".monthFicaTax").querySelector(":last-child"),
	monthMedTaxField = $(".monthMedTax").querySelector(":last-child"),
	monthNetPayField = $(".monthNetPay").querySelector(":last-child");
			
/*================= ANNUAL=================*/
let	yearRegPayField = $(".yearRegPay").querySelector(":last-child"),
	yearOTPayField = $(".yearOTPay").querySelector(":last-child"),
	yearGrossPayField = $(".yearGrossPay").querySelector(":last-child"),
	yearStateTaxField = $(".yearStateTax").querySelector(":last-child"),
	yearFedTaxField = $(".yearFedTax").querySelector(":last-child"),
	yearFicaTaxField = $(".yearFicaTax").querySelector(":last-child"),
	yearMedTaxField = $(".yearMedTax").querySelector(":last-child"),
	yearNetPayField = $(".yearNetPay").querySelector(":last-child");

document.addEventListener('click', function(event) {
    if (!hrPay.contains(event.target) && hrPay.value === "$") {
        hrPay.value = "";
    }
});

weeklyCheckBox.addEventListener("click", (event) => {
	if (biWeeklyCheckBox.checked) {
		biWeeklyCheckBox.checked = false;
	}
	
	setPay();
})

biWeeklyCheckBox.addEventListener("click", (event) => {
	if (weeklyCheckBox.checked) {
		weeklyCheckBox.checked = false;
	}
	
	setPay();
})

hrPay.addEventListener("click", () => {
	if (hrPay.value === "") {
        hrPay.value = "$";
    }
})

hrPay.addEventListener("keydown", (event) => {
	if (event.keyCode != 8) {
		if (event.keyCode < 48 || event.keyCode > 57 && event.keyCode < 96 || event.keyCode > 105) {
			event.preventDefault();
		}
	} else if (event.keyCode == 8 && hrPay.value.length <= 1) { 
		event.preventDefault();
	}
})

function setPay() {
	let paycheckData = paycheck(Number(hrPay.value.split("$").join("")), Number(regHours.value.split("").join("")), Number(otHours.value.split("").join("")));
		
	let yearData = new PayData(		paycheckData.regPay * 52,
									paycheckData.overtimePay * 52,
									paycheckData.grossPay * 52,
									paycheckData.stateTx * 52,
									paycheckData.fedTx * 52,
									paycheckData.ficaTx * 52,
									paycheckData.medTx * 52,
									paycheckData.netPay * 52);
								
	let monthData = new PayData (	yearData.regPay / 12,
									yearData.overtimePay / 12,
									yearData.grossPay / 12,
									yearData.stateTx / 12,
									yearData.fedTx / 12,
									yearData.ficaTx / 12,
									yearData.medTx / 12,
									yearData.netPay / 12);	
	
	if (biWeeklyCheckBox.checked) {
		checkRegPayField.innerText = "$" + curr(paycheckData.regPay * 2);
		checkOTPayField.innerText = "$" + curr(paycheckData.overtimePay * 2);
		checkGrossPayField.innerText = "$" + curr(paycheckData.grossPay * 2);
		checkStateTaxField.innerText = "$" + curr(paycheckData.stateTx * 2);
		checkFedTaxField.innerText = "$" + curr(paycheckData.fedTx * 2);
		checkFicaTaxField.innerText = "$" + curr(paycheckData.ficaTx * 2);
		checkMedTaxField.innerText = "$" + curr(paycheckData.medTx * 2);
		checkNetPayField.innerText = "$" + curr(paycheckData.netPay * 2);			
	} else {								
		checkRegPayField.innerText = "$" + curr(paycheckData.regPay);
		checkOTPayField.innerText = "$" + curr(paycheckData.overtimePay);
		checkGrossPayField.innerText = "$" + curr(paycheckData.grossPay);
		checkStateTaxField.innerText = "$" + curr(paycheckData.stateTx);
		checkFedTaxField.innerText = "$" + curr(paycheckData.fedTx);
		checkFicaTaxField.innerText = "$" + curr(paycheckData.ficaTx);
		checkMedTaxField.innerText = "$" + curr(paycheckData.medTx);
		checkNetPayField.innerText = "$" + curr(paycheckData.netPay);
	}
	
	monthRegPayField.innerText = "$" + curr(monthData.regPay);
	monthOTPayField.innerText = "$" + curr(monthData.overtimePay);
	monthGrossPayField.innerText = "$" + curr(monthData.grossPay);
	monthStateTaxField.innerText = "$" + curr(monthData.stateTx);
	monthFedTaxField.innerText = "$" + curr(monthData.fedTx);
	monthFicaTaxField.innerText = "$" + curr(monthData.ficaTx);
	monthMedTaxField.innerText = "$" + curr(monthData.medTx);
	monthNetPayField.innerText = "$" + curr(monthData.netPay);
	
	yearRegPayField.innerText = "$" + curr(yearData.regPay);
	yearOTPayField.innerText = "$" + curr(yearData.overtimePay);
	yearGrossPayField.innerText = "$" + curr(yearData.grossPay);
	yearStateTaxField.innerText = "$" + curr(yearData.stateTx);
	yearFedTaxField.innerText = "$" + curr(yearData.fedTx);
	yearFicaTaxField.innerText = "$" + curr(yearData.ficaTx);
	yearMedTaxField.innerText = "$" + curr(yearData.medTx);
	yearNetPayField.innerText = "$" + curr(yearData.netPay);
}

for (i in inputs) {
	inputs[i].addEventListener("keyup", (event) => {
		let paycheckData = paycheck(Number(hrPay.value.split("$").join("")), Number(regHours.value.split("").join("")), Number(otHours.value.split("").join("")));
		
		let yearData = new PayData(	paycheckData.regPay * 52,
									paycheckData.overtimePay * 52,
									paycheckData.grossPay * 52,
									paycheckData.stateTx * 52,
									paycheckData.fedTx * 52,
									paycheckData.ficaTx * 52,
									paycheckData.medTx * 52,
									paycheckData.netPay * 52);
									
		let monthData = new PayData (	yearData.regPay / 12,
										yearData.overtimePay / 12,
										yearData.grossPay / 12,
										yearData.stateTx / 12,
										yearData.fedTx / 12,
										yearData.ficaTx / 12,
										yearData.medTx / 12,
										yearData.netPay / 12)			
		setPay();
	});
}

function curr(num) {
    return (Math.round(num * 100) / 100).toFixed(2); 
}

function PayData(reg, overtime, gross, state, fed, fica, med, net) {
    this.regPay = reg;
    this.overtimePay = overtime;
    this.grossPay = gross;
    this.stateTx = state;
    this.fedTx = fed;
    this.ficaTx = fica;
    this.medTx = med;
    this.netPay = net;
}

function paycheck(sal, hours, ot) {
	let reg = (sal * hours); 
    let overtime = ((sal * 1.5) * ot);
    let gross = (reg + overtime);
    
    let paycheckData = new PayData(reg, 
                                   overtime, 
                                   gross, 
                                   (gross * stateTax), 
                                   (gross * fedTax), 
                                   (gross * ficaTax), 
                                   (gross * medTax), 
                                   (gross - ((gross * stateTax) + (gross * fedTax) + (gross * ficaTax) + (gross * medTax))));
    return paycheckData;
}

function monthSal(sal, hours, ot) {
    let payData = annualSalary(sal, hours, ot);
    let monthData = new PayData(payData.regPay / 12,
                                payData.overtimePay / 12,
                                payData.grossPay / 12, 
                                payData.stateTx / 12, 
                                payData.fedTx / 12, 
                                payData.ficaTx / 12, 
                                payData.medTx / 12, 
                                payData.netPay / 12)
    return monthData;
}

function annualSalary(sal, hours, ot) {
    let reg = (sal * hours) * 52; 
    let overtime = ((sal * 1.5) * ot) * 52;
    let gross = (reg + overtime);


    let yearData = new PayData(reg, 
                                   overtime, 
                                   gross, 
                                   (gross * stateTax), 
                                   (gross * fedTax), 
                                   (gross * ficaTax), 
                                   (gross * medTax), 
                                   (gross - ((gross * stateTax) + (gross * fedTax) + (gross * ficaTax) + (gross * medTax))));
								   
    return yearData;
}