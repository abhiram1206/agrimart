document.addEventListener("DOMContentLoaded", function() {
    let userSubmitBtn = document.getElementById("submit-btn");
    let businessSubmitBtn = document.getElementById("submit-business-btn");
    let bankSubmitBtn = document.getElementById("submit-bank-btn");

    let userDetails = document.getElementById("user-details");
    let businessDetails = document.getElementById("b-details");
    let bankDetails = document.getElementById("bank-details");

    let userTab = document.querySelectorAll('.user-details-wrapper')[0]; 
    let businessTab = document.querySelectorAll('.user-details-wrapper')[1];
    let bankTab = document.querySelectorAll('.user-details-wrapper')[2]; 

    let isUserDetailsSubmitted = false;
    let isBusinessDetailsSubmitted = false;
    let isBankDetailsSubmitted = false;

    let sellerDetails = {};

    userSubmitBtn.addEventListener("click", function() {
        // Collect user data
        UserDetails();
        isUserDetailsSubmitted = true;  
        alert("User details saved. Please proceed to the bank details section.");
        switchToBusinessDetails();
    });

    businessSubmitBtn.addEventListener("click", function() {
        // Collect business data and send to backend
        BusinessDetails();
        isBusinessDetailsSubmitted = true;
        alert("Business details saved. Please proceed to the bank details section.");
        switchToBankDetails();
    });

    bankSubmitBtn.addEventListener("click", async function() {
        await BankDetails();
        isBankDetailsSubmitted = true;
        alert("Bank details saved.");
    });

    function validateData(data) {
        return Object.values(data).every(value => value && value.length > 0);
    }

    userTab.addEventListener("click", switchToUserDetails);
    businessTab.addEventListener("click", switchToBusinessDetails);
    bankTab.addEventListener("click", switchToBankDetails);

    function switchToUserDetails() {
        if (!isUserDetailsSubmitted) {
            userDetails.classList.remove("hidden");
            businessDetails.classList.add("hidden");
            bankDetails.classList.add("hidden");

            userTab.classList.add("active");
            businessTab.classList.remove("active");
            bankTab.classList.remove("active");
        }
    }

    function switchToBusinessDetails() {
        if (!isBusinessDetailsSubmitted) {
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

    function UserDetails() {
        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let mobile = document.getElementById("mobileNumber").value;
        let email = document.getElementById("email").value;
        let alternativeEmail = document.getElementById("alternativeEmail").value;
        let AddressLine1 = document.getElementById("addressLine1").value;
        let AddressLine2 = document.getElementById("addressLine2").value;
        let locality = document.getElementById("locality").value;
        let City = document.getElementById("city").value;
        let ZipCode = document.getElementById("zip").value;

        let UserDetails = {
            firstName,
            lastName,
            mobile,
            email,
            alternativeEmail,
            AddressLine1,
            AddressLine2,
            locality,
            City,
            ZipCode
        }

        Object.assign(sellerDetails, { UserDetails });
    }

    async function BusinessDetails() {
        let BusinessName = document.getElementById("businessName").value;
        let gstno = document.getElementById("gstin").value;
        let BusinessType = document.getElementById("businessType").value;
        let panoraadhar = document.getElementById("panOrAadhar").value;
        let BusinessNumber = document.getElementById("businessMobile").value;
        let BusinessAddressLine1 = document.getElementById("addressLine1").value;
        let BusinessAddressLine2 = document.getElementById("addressLine2").value;
        let Businesslocality = document.getElementById("Locality").value;
        let BusinessCity = document.getElementById("City").value;
        let BusinessZipCode = document.getElementById("zip").value;

        let BusinessDetails = {
            BusinessName,
            gstno,
            BusinessType,
            panoraadhar,
            BusinessNumber,
            BusinessAddressLine1,
            BusinessAddressLine2,
            Businesslocality,
            BusinessCity,
            BusinessZipCode
        }

        Object.assign(sellerDetails, { BusinessDetails });
    }

    async function BankDetails() {
        // Collect bank data
        let BankName = document.getElementById("accountName").value;
        let AccountHolderName = document.getElementById("accountHolderName").value;
        let ifsccode = document.getElementById("ifsc").value;
        let Banklocality = document.getElementById("bankLocality").value;
        let accountNumber = document.getElementById("accountNumber").value;
        let cvv = document.getElementById("cvv").value;
        let expirydate = document.getElementById("expiryDate").value;

        let BankDetails = {
            BankName,
            AccountHolderName,
            ifsccode,
            Banklocality,
            accountNumber,
            cvv,
            expirydate
        }

        Object.assign(sellerDetails, { BankDetails });

        // Send to backend
        await sendSellerDetailsToBackend();
    }

    async function sendSellerDetailsToBackend() {
        try {
            const userId = localStorage.getItem("userId");
            const response = await fetch('http://localhost:3000/seller/newSeller', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, sellerDetails })
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                alert(`Error: ${errorResponse.message}`);
            } else {
                const successResponse = await response.json();
                alert(successResponse.message);
            }
        } catch (error) {
            console.error('Error sending data to backend:', error);
            alert('An error occurred while sending data to backend.');
        }
    }
});
