import React, { ChangeEvent, FC, useRef } from "react";
import axios from "axios";
import Button from "../Button";

export interface UploadProps {
  action: string;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
}

const Upload: FC<UploadProps> = (props) => {
  const { action, onProgress, onSuccess, onError } = props;
  const fileInput = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    uploadFiles(files);
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };
  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files);
    postFiles.forEach((file) => {
      const formData = new FormData();
      formData.append(file.name, file);
      axios.post(action, formData, {
        headers: {
          // 传输文件更快的类型
          "Content-Type": "multipart/form-data",
        },
				// 利用axios自带的API来计算当前progress
        onUploadProgress: (e) => {
					let percentage = Math.round((e.loaded*100)/e.total) || 0;
					if(percentage<100){
						// 进度回调
						if(onProgress){
							onProgress(percentage,file);
						}
					}
				},
      }).then(res =>{
				console.log('result',res);
				if(onSuccess){
					// 成功回调
					onSuccess(res.data,file)
				}
			}).catch(err=>{
				console.log('error',err);
				if(onError){
					// 错误回调
					onError(err,file);
				}
			});
    });
  };
  return (
    <div className="cherry-upload-component">
      <Button btnType="primary" onClick={handleClick}>
        Upload File
      </Button>
      <input
        className="cherry-file-input"
        style={{ display: "none" }}
        type="file"
        ref={fileInput}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default Upload;
