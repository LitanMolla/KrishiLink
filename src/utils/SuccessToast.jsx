import Swal from 'sweetalert2';

const SuccessToast = (title) => {
    Swal.fire({
        title: title || '',
        icon: "success",
        confirmButtonColor: "#16a34a"
    });
}

export default SuccessToast