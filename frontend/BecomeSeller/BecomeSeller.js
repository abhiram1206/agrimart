let userSubmitBtn = document.getElementById("submit-btn");
let userDetails = document.getElementById("user-details");
let businessDetails = document.getElementById("b-details");
let bankDetails = document.getElementById("bank-details");

let userTab = document.querySelectorAll('.user-details-wrapper')[0]; 
let businessTab = document.querySelectorAll('.user-details-wrapper')[1];
let bankTab = document.querySelectorAll('.user-details-wrapper')[2]; 

// Flags to track whether the user has submitted details
let isUserDetailsSubmitted = false;
let isBusinessDetailsSubmitted = false;

function switchToUserDetails() {
    if (!isUserDetailsSubmitted) { // Allow switching back to User Details if not submitted
        userDetails.classList.remove("hidden");
        businessDetails.classList.add("hidden");
        bankDetails.classList.add("hidden");

        userTab.classList.add("active");
        businessTab.classList.remove("active");
        bankTab.classList.remove("active");
    }
}

function switchToBusinessDetails() {
    if (!isBusinessDetailsSubmitted) { // Allow switching back to Business Details if not submitted
        userDetails.classList.add("hidden");
        businessDetails.classList.remove("hidden");
        bankDetails.classList.add("hidden");

        userTab.classList.remove("active");
        businessTab.classList.add("active");
        bankTab.classList.remove("active");
    }
}

function switchToBankDetails() {
    userDetails.classList.add("hidden");
    businessDetails.classList.add("hidden");
    bankDetails.classList.remove("hidden");

    userTab.classList.remove("active");
    businessTab.classList.remove("active");
    bankTab.classList.add("active");
}

userSubmitBtn.addEventListener("click", function() {
    isUserDetailsSubmitted = true; 
    switchToBusinessDetails();
});

let businessSubmitBtn = document.getElementById("submit-bank-btn");
businessSubmitBtn.addEventListener("click", function() {
    isBusinessDetailsSubmitted = true;
    switchToBankDetails();
});

// Event listeners for tab clicks
userTab.addEventListener("click", switchToUserDetails);
businessTab.addEventListener("click", switchToBusinessDetails);
bankTab.addEventListener("click", switchToBankDetails);
