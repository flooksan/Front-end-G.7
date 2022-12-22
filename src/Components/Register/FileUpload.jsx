
import React from "react";

// ใช้ resize รูป 
import Resize from 'react-image-file-resizer';

// ใช้ดึงข้อมูล เชื่อม API
import axios from 'axios'

// อันนี้ antd ไม่ต้องใช้
import { Avatar, Badge} from 'antd';

// function upload files 
const FileUpload = ({value, setValue}) => {

    const handleChangeFile = (e) => {
        const files = e.target.files
        if (files) {
            let fileUpload =value.images


            // วนลูปจำนวนรูปที่อัพ
            for (let i = 0; i < files.length; i++); {
                Resize.imageFileResizer(
                    files[0],
                    300,
                    300,
                    100,
                    "JPEG",
                    0,
                    (uri) => {
                        axios.post
                        (import.meta.env.VITE_APP_API+ '/images',
                        {
                            image:uri
                        }
                        ).then(res=>{
                            fileUpload.push(res.data)
                            console.log('file upload in then', fileUpload)
                            setValue({...value, images:fileUpload})
                        }).catch(err=>{
                            console.log(err)
                        })
                        // console.log(uri);
                    },
                    "base64"
                )
            }
        };
    }
    return (
        <>
        <br />
        {value.images && value.images.map(item=>
        <span className="avatar-item">
        <Badge count="X">
            <Avatar
            className="m-3" 
            src={item.url} 
            shape="square" 
            size={120} />
        </Badge>
    </span>
            )}
        <div>
            <label>
                <input
                    onChange={handleChangeFile}
                    className="form-control"
                    type="file"
                    accept="images/*"
                    name="file"
                />

            </label>

        </div>
        </>
    )
}

export default FileUpload