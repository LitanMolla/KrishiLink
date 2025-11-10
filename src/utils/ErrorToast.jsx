import Swal from 'sweetalert2';
const formatErrorTitle = (code) => {
  return code
    ?.replace("auth/", "")
    ?.replace(/-/g, " ")
    ?.replace(/\b\w/g, (char) => char.toUpperCase());
};
const ErrorToast = (error) => {
  const title = formatErrorTitle(error?.code);
  let message = '';
  switch (error?.code) {
    case "auth/missing-password":
      message = "Please enter your password.";
      break;
    case "auth/email-already-in-use":
      message = "This email is already registered.";
      break;
    case "auth/invalid-email":
      message = "Invalid email format.";
      break;
    case "auth/user-not-found":
      message = "No account found with this email.";
      break;
    case "auth/wrong-password":
      message = "Incorrect password.";
      break;
    case "auth/invalid-credential":
      message = "Incorrect email or password.";
      break;
    case "auth/weak-password":
      message = "Password must be at least 6 characters.";
      break;
    case "auth/network-request-failed":
      message = "Network error. Check your internet connection.";
      break;
    case "auth/too-many-requests":
      message = "Too many attempts. Please try again later.";
      break;
    case "auth/popup-closed-by-user":
      message = "Login popup was closed before completion.";
      break;
    default:
      message = error?.message || "Something went wrong!";
  }
  Swal.fire({
    icon: "error",
    title,
    text: message
  });
};
export default ErrorToast;
