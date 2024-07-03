import React, { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

interface ImageUploadProps {
    onUploadSuccess: (data: any) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUploadSuccess }) => {
    const toast = useRef<Toast>(null);
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef<FileUpload>(null);
    const queryClient = useQueryClient();

    const mutation = useMutation(
        (formData: FormData) => axios.post('http://127.0.0.1:8000/upload', formData),
        {
            onSuccess: (data) => {
                if (toast.current) {
                    toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
                }
                onUploadSuccess(data.data);
                queryClient.invalidateQueries('uploadedImages');
            },
            onError: (error) => {
                if (toast.current) {
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to upload file' });
                }
                console.error('Error uploading file:', error);
            },
        }
    );

    const onTemplateSelect = (e: { files: File[] }) => {
        let _totalSize = totalSize;
        let files = e.files;

        Object.keys(files).forEach((key: any) => {
            _totalSize += files[key].size || 0;
        });

        setTotalSize(_totalSize);
    };

    const onTemplateUpload = (e: { files: File[] }) => {
        console.log('onTemplateUpload called'); // Debug log
        let formData = new FormData();
        e.files.forEach((file) => {
            formData.append('files', file);
        });

        console.log("Uploading files:", formData);
        mutation.mutate(formData);
    };

    const onTemplateRemove = (file: File, callback: () => void) => {
        setTotalSize(totalSize - file.size);
        callback();
    };

    const onTemplateClear = () => {
        setTotalSize(0);
    };

    const headerTemplate = (options: any) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = totalSize / 10000;
        const formattedValue = fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {uploadButton}
                {cancelButton}
                <div className="flex align-items-center gap-3 ml-auto">
                    <span>{formattedValue} / 1 MB</span>
                    <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
                </div>
            </div>
        );
    };

    const itemTemplate = (file: any, props: any) => {
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{ width: '40%' }}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        );
    };

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
                    Drag and Drop Image Here
                </span>
            </div>
        );
    };

    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined', onClick: () => fileUploadRef.current?.upload() };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };

    return (
        <div>
            <Toast ref={toast}></Toast>

            <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
            <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
            <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

            <FileUpload ref={fileUploadRef} name="files" multiple accept="image/*" maxFileSize={1000000}
                customUpload onUpload={()=>{console.log("upload cliced")}} onSelect={()=>{console.log("clicked")}} onError={onTemplateClear} onClear={onTemplateClear}
                headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />
        </div>
    );
};

export default ImageUpload;
