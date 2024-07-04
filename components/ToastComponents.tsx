
import { Toast } from "primereact/toast";
import { useRef } from "react";

const ToastComponents = ()=>{
    const toast = useRef<Toast>(null);

    const showSuccess = (message: string)=>{
        toast.current?.show({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
    }
    const showError = (message: string) => {
        toast.current?.show({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
      };
    
      return { toast, showSuccess, showError };
}

export default ToastComponents
