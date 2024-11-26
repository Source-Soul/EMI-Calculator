// Get the input elements by their IDs
const loanAmountInput = document.getElementById("loanAmount");
const interestRateInput = document.getElementById("interestRate");
const loanTenureInput = document.getElementById("tenure");

// Get the output elements to display results
const loanEMIValue = document.querySelector(".loan-emi .value");
const totalInterestValue = document.querySelector(".total-interest .value");
const totalAmountValue = document.querySelector(".total-amount .value");

// Get the warning message element
const warningMessage = document.querySelector(".warning-message");

// Get the calculate and refresh button elements
const calcButton = document.querySelector(".calc-button");
const refreshButton = document.querySelector(".refresh-button");

// Function to display a warning if inputs are invalid
const showWarning = (message) => {
    warningMessage.innerHTML = message;
    warningMessage.style.display = "block";
};

// Function to hide the warning message
const hideWarning = () => {
    warningMessage.style.display = "none";
};

// Function to calculate EMI
const calculateEMI = (loanAmount, interestRate, loanTenure) => {
    const interestRatePerMonth = interestRate / 12 / 100; // Monthly interest rate

    // If the loan tenure or any input is zero or negative, show warning and return 0
    if (loanAmount <= 0 || loanTenure <= 0 || interestRate <= 0) {
        showWarning("Please enter valid positive values for Loan Amount, Interest Rate, and Tenure.");
        return 0;
    }

    const emi = loanAmount * interestRatePerMonth * Math.pow(1 + interestRatePerMonth, loanTenure) / (Math.pow(1 + interestRatePerMonth, loanTenure) - 1);
    return emi;
};

// Function to update the result values on the page
const updateData = (emi, loanAmount, loanTenure) => {
    if (emi <= 0) {
        loanEMIValue.innerHTML = 0;
        totalAmountValue.innerHTML = 0;
        totalInterestValue.innerHTML = 0;
        return;
    }

    // Show the exact floating-point value without rounding
    loanEMIValue.innerHTML = emi.toFixed(2); // Displaying with 2 decimal points for clarity
    const totalAmount = emi * loanTenure; // Total amount payable
    totalAmountValue.innerHTML = totalAmount.toFixed(2); // Displaying with 2 decimal points

    const totalInterestPayable = totalAmount - loanAmount; // Total interest payable
    totalInterestValue.innerHTML = totalInterestPayable.toFixed(2); // Displaying with 2 decimal points
};

// Function to refresh input values
const refreshInputValues = () => {
    const loanAmount = parseFloat(loanAmountInput.value);
    const interestRate = parseFloat(interestRateInput.value);
    const loanTenure = parseFloat(loanTenureInput.value);
    return { loanAmount, interestRate, loanTenure };
};

// Initialization function to set up the EMI calculation
const init = () => {
    // Refresh input values
    const { loanAmount, interestRate, loanTenure } = refreshInputValues();

    // Hide any existing warnings before calculation
    hideWarning();

    // Calculate EMI if the inputs are valid
    const emi = calculateEMI(loanAmount, interestRate, loanTenure);
    
    // If valid inputs, update the data
    if (emi > 0) {
        updateData(emi, loanAmount, loanTenure);
    }
};

// Initialize the calculation on page load
init();

// Add an event listener for the calculate button to re-calculate when clicked
calcButton.addEventListener("click", init);

// Add an event listener for the refresh button to reload the page when clicked
refreshButton.addEventListener("click", () => {
    location.reload();  // This reloads the page
});
