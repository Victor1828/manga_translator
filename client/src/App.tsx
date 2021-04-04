import React, { CSSProperties, useEffect, useState } from "react";
import { Button, Carousel, Image, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam } from "antd/lib/upload/interface";

function onChange(a: number) {
  console.log(a);
}

function App() {
  const [previews, setPreviews] = useState([] as any);
  const [temp, setTemp] = useState("" as any);

  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error: any) => reject(error);
    });
  };

  const customRequest = async (e: any) => {
    const res = await getBase64(e.file);
    setTemp(res);
  };

  useEffect(() => {
    if (!temp) return;
    setPreviews([temp, ...previews]);
  }, [temp]);

  return (
    <div
      style={{
        minHeight: "100vh",
      }}
    >
      <Upload
        multiple
        showUploadList={false}
        customRequest={customRequest}
      >
        <Button icon={<UploadOutlined />}>Upload Directory</Button>
      </Upload>
      <Carousel afterChange={onChange}>
        {previews.map((image: any, index: number) => (
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <img src={image} key={index} alt='manga panel' style={{margin: 'auto', width: '40%'}} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default App;
