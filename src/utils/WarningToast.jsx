import Swal from 'sweetalert2';

const WarningToast = (title) => {
    Swal.fire({
        title: title||'',
        icon: "success"
    });
}

export default WarningToast