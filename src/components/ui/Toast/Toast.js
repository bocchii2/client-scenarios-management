import Swal from "sweetalert2";

const Toast = Swal.mixin({
  position: "top-end",
  icon: "success",
  toast: true,
  title: "Your work has been saved",
  showConfirmButton: false,
  timer: 1500,
});
const ToastError = Swal.mixin({
  position: "top-end",
  toast: true,
  icon: "error",
  title: "Your work has been saved",
  showConfirmButton: false,
  timer: 1500,
});

export const showToast = (title) => {
  Toast.fire({
    title: title,
  });
};

export const showToastError = (title) => {
  ToastError.fire({
    title: title,
  });
};

export const showToastWarning = (title) => {
  Swal.fire({
    icon: "warning",
    toast: true,
    position: "top-end",
    title: title,
    showConfirmButton: false,
    timer: 1500,
  });
};
