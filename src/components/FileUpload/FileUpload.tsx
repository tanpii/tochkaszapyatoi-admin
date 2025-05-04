import React, {useState} from 'react';
import {Button, Icon} from '@gravity-ui/uikit';
import {Camera} from '@gravity-ui/icons';

import block from 'bem-cn-lite';
import './FileUpload.scss';
const b = block('fileUpload');

interface FileUploadProps {
    placeholder: string;
    onFileChange: (file: File | null) => void;
    value?: string;
}

export const FileUpload = ({placeholder, onFileChange, value}: FileUploadProps) => {
    const [preview, setPreview] = useState<string | null>(value || null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            setPreview(URL.createObjectURL(file));
            onFileChange(file);
        }
    };

    return (
        <div className={b()}>
            <input
                type="file"
                accept="image/*"
                className="file-upload-input"
                onChange={handleFileChange}
                style={{display: 'none'}}
                id="file-upload"
            />
            <Button
                onClick={() => document.getElementById('file-upload')?.click()}
                size="l"
                view="normal"
            >
                <Icon data={Camera} /> {placeholder}
            </Button>
            <img className={b('preview')} src={preview || undefined} />
        </div>
    );
};
