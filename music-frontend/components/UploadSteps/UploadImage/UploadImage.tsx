import React from 'react'
import { FileUpload } from '../../FileUpload/FileUpload'
import { Button } from '@mui/material'
import c from './UploadImage.module.css'

interface UploadImageProps {
    setPicture: (file: File) => void;
}

export const UploadImage: React.FC<UploadImageProps> = ({ setPicture }) => {
  return (
    <div className={c.wrapper} >
        <div className={c.img_wrapper} style={{ width: '248.5px', height: '248.5px', backgroundColor: '#808080' }}></div>
        <FileUpload setFile={setPicture} accept="image/*" className={c.btn_wrapper}>
            <Button className={c.btn} >Upload image</Button>
        </FileUpload>
    </div>
  )
}
