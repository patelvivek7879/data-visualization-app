"use client";
import React, { useState } from "react";
import {
  Button,
  Divider,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Switch,
  Typography,
} from "antd";

const MainContainer = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [reqType, setReqType] = useState("GET");
  const [url, setURL] = useState("");

  const handleCancel = () => {
    setModalOpen(false);
  };
  const handleApiCallRequest = () => {
    console.log("Api calling......");
    try{
      const res = fetch(url);
      console.log(res)
    }catch(error){
      console.log("ERR:", error)
    }
  };

  const apiRequestOpts = [
    { label: "GET", value: "GET" },
    { label: "POST", value: "POST" },
  ];

  return (
    <div className="flex h-screen m-t-12">
      <div className="w-96 border-r border-indigo p-12">
        <>
          <Input className="w-auto" />
        </>
        <Divider orientation="center">
          <Typography.Text type="secondary">OR</Typography.Text>
        </Divider>
        <div className="flex justify-center">
          <Button type="primary" onClick={() => setModalOpen(true)}>
            Make an API Request
          </Button>
        </div>
      </div>
      <div className="flex flex-1">right panel</div>

      <Modal
        title="Basic Modal"
        okText="Send"
        open={modalOpen}
        onOk={() => handleApiCallRequest()}
        onCancel={handleCancel}
      >
        <Space direction="vertical" className="w-full">
          <Row justify="space-between" align="middle">
            <Select defaultValue={"GET"} options={apiRequestOpts} onSelect={(value)=> setReqType(value)}></Select>
            <span>
              <Typography.Text>Authorization : </Typography.Text>
              <Switch />
            </span>
          </Row>
          <>
            <Typography.Text>URL :</Typography.Text>
            <Input onChange={(e)=> setURL(e.target.value)} />
          </>
          <>
            <Typography.Text>PARAMS :</Typography.Text>
            <Input />
            <Button>+ Add</Button>
          </>
          <>
            <Typography.Text>HEADERS :</Typography.Text>
            <Input />
            <Button>+ Add</Button>
          </>
          {reqType === "POST" ? (
            <>
              <Typography.Text>Body :</Typography.Text>
              <Input />
            </>
          ) : null}
        </Space>
      </Modal>
    </div>
  );
};

export default MainContainer;
