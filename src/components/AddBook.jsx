import React, { useState } from "react";
import { Alert, Button, DatePicker, Form, Input, InputNumber } from "antd";
import { collection, addDoc } from "firebase/firestore";
import Loading from "../Loading";
import { db } from "../config/firebase";
import { v4 as uuidv4 } from "uuid";

const AddBook = () => {
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const onFinish = async (values) => {
    console.log(" book to be added  :", values);
    const updatedValues = {
      ...values,
      id: uuidv4(),
    };

    try {
      setLoading(true);
      const booksCollection = collection(db, "books");
      const docRef = await addDoc(booksCollection, updatedValues);
      console.log("Book added with ID:", docRef.id);
      setAdded(true);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  if (added) {
  }

  if (successMessage) {
    return (
      <Alert
        message={successMessage}
        type="success"
        showIcon
        closable
        onClose={() => setSuccessMessage("")}
      />
    );
  }
  return (
    <div className="my-4 pt-4 ">
      {loading && <Loading />}
      <span className="text-slate-700 text-2xl pt-44">Add Student data</span>
      <hr className="h-2 w-full bg-green-600 rounded-b-lg mb-5" />
      <div className="my-4 pt-4 sm:flex sm:justify-center sm:items-center min-h-screen w-full">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="flex flex-col text-center shadow-lg p-8 px-10 justify-center w-full"
        >
          <Form.Item
            label="Name"
            name="Name"
            rules={[
              {
                required: true,
                message: "Please input Name of the studernt!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Application Mode"
            name="Application Mode"
            rules={[
              {
                required: true,
                message: "Please input Application Mode!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="Disability"
            name="Disability"
            rules={[
              {
                required: true,
                message: "Please input Disability status!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="Debt status"
            name="Debtor"
            rules={[
              {
                required: true,
                message: "please input the debt status!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="Tuition fees up to date"
            name="Tuition fees up to date"
            rules={[
              {
                required: true,
                message: "this field is required!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="Gender"
            rules={[
              {
                required: true,
                message: "please input the gender",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="Scholarship holder"
            name="Scholarship holder"
            rules={[
              {
                required: true,
                message: "please input the Scholarship status",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="Age"
            name="Age at enrollment"
            rules={[
              {
                required: true,
                message: "please input the Scholarship status",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="enrolled(1st)"
            name="Curricular units 1st sem (enrolled)"
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="approved(1st)"
            name="Curricular units 1st sem (approved)"
          >
            <InputNumber />
          </Form.Item>

          <Form.Item label="Grade(1st)" name="Curricular units 1st sem (grade)">
            <InputNumber />
          </Form.Item>
          
          <Form.Item
            label="enrolled(2nd)"
            name="Curricular units 2nd sem (enrolled)"
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="approved(2nd)"
            name="Curricular units 2nd sem (approved)"
          >
            <InputNumber />
          </Form.Item>

          <Form.Item label="Grade(2nd)" name="Curricular units 2nd sem (grade)">
            <InputNumber />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
            className="w-full flex sm:justify-start sm:justify-center"
          >
            <Button
              className="bg-green-600 text-slate-200 hover:text-slate-100 "
              htmlType="submit"
            >
              Add Student data
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddBook;
