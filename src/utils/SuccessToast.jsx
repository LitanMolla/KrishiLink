import Swal from 'sweetalert2';

const SuccessToast = (title) => {
    Swal.fire({
        title: title||'',
        icon: "success"
    });
}

export default SuccessToast