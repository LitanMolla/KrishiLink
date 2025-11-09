import Swal from 'sweetalert2';

const WarningToast = (title) => {
    Swal.fire({
        title: title||'',
        icon: "warning"
    });
}

export default WarningToast