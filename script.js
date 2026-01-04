// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdDVB_0qF8vlTjPEqIe7D17R3zMfLKRq4",
  authDomain: "food-otp-app.firebaseapp.com",
  projectId: "food-otp-app",
  storageBucket: "food-otp-app.firebasestorage.app",
  messagingSenderId: "661883669594",
  appId: "1:661883669594:web:4747b3b045afd7f6ff1c63"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Recaptcha
window.onload = function () {
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    'recaptcha-container',
    { size: 'normal' }
  );
};

// Send OTP
function sendOTP() {
  const phoneNumber = document.getElementById("phone").value;

  firebase.auth().signInWithPhoneNumber(phoneNumber, window.recaptchaVerifier)
    .then(function (confirmationResult) {
      window.confirmationResult = confirmationResult;
      alert("OTP Sent");
    })
    .catch(function (error) {
      alert(error.message);
    });
}

// Verify OTP
function verifyOTP() {
  const otp = document.getElementById("otp").value;

  window.confirmationResult.confirm(otp)
    .then(function (result) {
      const user = result.user;

      // Send success to Kodular
      if (window.AppInventor) {
        window.AppInventor.setWebViewString("LOGIN_SUCCESS");
      }

      alert("Login Success");
    })
    .catch(function (error) {
      alert("Invalid OTP");
    });
}
