import { useRef } from "react"
import { Toast } from 'primereact/toast';
import { Button } from "primereact/button";



export const UploadTask=()=>{
    const toast = useRef<Toast>(null)
    const onUpload = () => {
        toast.current?.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };
        
    return(
        <>
         <div className="card flex justify-content-center" style={{bottom: "20px", position: "fixed", right: "20px"}}>
            
            <Toast ref={toast}></Toast>
            <Button style={{ backgroundColor: "#304e1a", borderRadius: "35px", height: "50px",outline: "none", boxShadow: "none" }}>
            <i className="pi pi-plus"></i>
           
        </Button>
           
        </div>
        </>
    )
}