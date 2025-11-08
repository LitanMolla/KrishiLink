import Swal from 'sweetalert2';

const formatErrorTitle = (code) => {
    return code
        ?.replace("auth/", "")
        ?.replace(/-/g, " ")
        ?.replace(/\b\w/g, (char) => char.toUpperCase());
};

const ErrorToast = (error) => {
    const title = formatErrorTitle(error.code);

    let message = '';

    if (error.code === 'auth/missing-password') {
        message = 'Please enter your password.';
    }
    else if (error.code === 'auth/email-already-in-use') {
        message = 'This email is already registered.';
    }
    else if (error.code === 'auth/invalid-email') {
        message = 'Invalid email format.';
    }
    else if (error.code === 'auth/user-not-found') {
        message = 'No account found with this email.';
    }
    else if (error.code === 'auth/wrong-password') {
        message = 'Incorrect password.';
    }
    else {
        message = error.message || 'Something went wrong!';
    }

    Swal.fire({
        icon: "error",
        title,
        text: message
    });
};

export default ErrorToast;
