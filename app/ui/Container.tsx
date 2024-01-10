"use client";
import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Switch,
  Typography,
} from "antd";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import ReactFlowComponent from "./ReactFlowComponent";
import { url_pattern } from "./constants";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const MainContainer = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [reqType, setReqType] = useState("GET");
  const [url, setURL] = useState("");

  const handleCancel = () => {
    setModalOpen(false);
  };

  const [JSONData, setJSONData] = useState();

  const handleApiCallRequest = () => {
    form
      .validateFields()
      .then((values) => {
        // form.resetFields();
        // console.log(values);

        const { requestUrl, requestParams, requestHeaders, requestType } =
          values;

        let reqUrl = requestUrl;
        // Building params
        if (requestParams && requestParams?.length) {
          let qs =
            "?" +
            requestParams
              ?.map(({ key, value }) => {
                return `${key}=${value}`;
              })
              .join("&");
          reqUrl += qs;
        }

        // Building headers

        let headers = new Headers();

        if (requestHeaders && requestHeaders?.length) {
          for (let header of requestHeaders) {
            headers.append(header["key"], header["value"]);
          }

        }

        fetch(url, { headers })
          .then((res) => {
            return res.json();
          })
          .then((resJSON) => setJSONData(resJSON))
          .catch((error) => {
            console.error(error);

          });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const apiRequestOpts = [
    { label: "GET", value: "GET" },
    { label: "POST", value: "POST" },
  ];

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const [form] = Form.useForm();

  return (
    <div className="flex h-screen m-t-12">
      <div className="w-1/4 shadow-md border-0 border-r border-solid border-r-stone-300 p-8">
        <>
          <JSONInput
            id="a_unique_id"
            placeholder={JSONData}
            // colors={darktheme}
            height={"50%"}
            width={"100%"}
            style={{
              outerBox: {
                border: "1px solid indigo",
              },
            }}
            theme="light_mitsuketa_tribute"
            locale={locale}
            reset={true}
          />
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
      <div className="flex flex-grow p-8">
        <ReactFlowComponent />
      </div>

      <Modal
        title="API Request"
        okText="Send"
        open={modalOpen}
        onOk={() => handleApiCallRequest()}
        onCancel={handleCancel}
      >
        {/* It should be form */}
        <Form
          form={form}
          name="api-request-form"
          style={{ maxWidth: 800 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={{ requestType: "GET" }}
        >
          <Form.Item label="Request" name="requestType">
            <Select
              defaultValue={"GET"}
              options={apiRequestOpts}
              onSelect={(value) => setReqType(value)}
            ></Select>
          </Form.Item>
          <Form.Item label="Authorization">
            <Switch />
          </Form.Item>

          <Form.Item
            label="URL"
            name="requestUrl"
            rules={[
              {
                required: true,
                pattern: url_pattern,
                message: "Please enter valid url!",
              },
            ]}
          >
            <Input onChange={(e) => setURL(e.target.value)} />
          </Form.Item>

          <Form.List name="requestParams">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }, index) => (
                  <Space
                    key={key}
                    style={{ display: "flex" }}
                    align="baseline"
                    className={index > 0 ? "justify-end" : ""}
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "key"]}
                      rules={[{ required: true, message: "Missing param key" }]}
                      label={index === 0 ? "PARAMS" : ""}
                    >
                      <Input placeholder="Key" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "value"]}
                      rules={[
                        { required: true, message: "Missing param value" },
                      ]}
                    >
                      <Input placeholder="Value" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add param
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.List name="requestHeaders">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }, index) => (
                  <Space
                    key={key}
                    style={{ display: "flex" }}
                    align="baseline"
                    className={index > 0 ? "justify-end" : ""}
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "key"]}
                      rules={[
                        { required: true, message: "Missing header key" },
                      ]}
                      label={index === 0 ? "HEADERS" : ""}
                    >
                      <Input placeholder="Key" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "value"]}
                      rules={[
                        { required: true, message: "Missing header value" },
                      ]}
                    >
                      <Input placeholder="Value" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add header
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          {reqType === "POST" ? (
            <Form.Item label="BODY" name="requestBody">
              <Input />
            </Form.Item>
          ) : null}
        </Form>
      </Modal>
    </div>
  );
};

export default MainContainer;
