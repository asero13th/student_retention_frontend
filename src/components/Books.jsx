import {
  Button,
  DatePicker,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Popover,
  Progress,
  Radio,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import book11 from "../book1.jpeg";
import { DeleteOutlined } from "@ant-design/icons";
import Loading from "../Loading";
import { analytics, app, db, firestore } from "../config/firebase";
import { logEvent } from "firebase/analytics";
import { getDatabase, set } from "firebase/database";
import {
  doc,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const Books = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [form] = Form.useForm();

  const database = getDatabase(app);

  const getPrediction = async (user) => {
    try {
      setLoading(true);

      const response = await axios.post("/predict", user);

      const booksCollection = collection(db, "Users");
      const userRef = doc(booksCollection, user.id);

      await updateDoc(userRef, {
        prediction: response.data["prediction"][0],
      });

      setUsers((prev) => {
        return prev.map((item) => {
          if (item.id === user.id) {
            return {
              ...item,
              prediction: response.data["prediction"][0],
            };
          }
          console.log(item);
          return item;
        });
      });

      console.log(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching books:", error);
      setLoading(false);
    }
  };

  //fetch the books data in the api  and use books instead of books1

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const booksCollection = collection(db, "Users");
        const booksSnapshot = await getDocs(booksCollection);
        console.log(booksSnapshot);
        const users = booksSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setUsers(users);
        console.log(users);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const showModal = (book) => {
    setIsModalOpen(true);
    setSelectedBook(book);
  };

  const content = (id) => {
    console.log(id);
    return (
      <div>
        <p className="text-red-600">Are you sure you want to delete ?</p>
        <div className="flex justify-around">
          <span className="cursor-pointer">no</span>
          <span className="cursor-pointer" onClick={() => deleteBook(id)}>
            yes
          </span>
        </div>
      </div>
    );
  };

  const deleteBook = async (id) => {
    console.warn("book id to be deleted is", id);
    try {
      setLoading(true);
      const bookRef = doc(db, "books", id);
      await deleteDoc(bookRef);
      setBooks(books.filter((book) => book.id !== id)); // Update books state
      console.warn("Book deleted with id:", id);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOk = () => {
    setSelectedBook(null);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setSelectedBook(null);
    setIsModalOpen(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="pt-5">
      {loading && <Loading />}
      {
        <Link
          to={`/addbook/`}
          className="bg-slate-600  text-green-400  px-4 p-3 rounded-md  text-center cursor-pointer"
        >
          Add Student data
        </Link>
      }
      <div className="flex flex-col  mt-4">
        <div className="p-4  border-green-500 border-t-4  shadow-2xl rounded-lg mt-4">
          <table className="w-full h-full mt-5 text-center  search-table-outter">
            <tbody className="justify-around py-10 ">
              <tr
                className="text-slate-600 text-md bg-slate-300  shadow-md font-bold pt-4"
                style={{ textAlign: "start" }}
              >
                <td>Name</td>
                <td>App</td>
                <td>Displaced</td>
                <td title="Debtor:  Whether the student is a debtor">Debter</td>
                <td title="Tuition fees up to date: Whether the student's tuition fees are up to date. (Categorical)01">
                  Tuition
                </td>
                <td>Gender</td>
                <td title="Scholarship Holder: : Whether the student is a scholarship holder.">
                  Scholarship
                </td>
                <td title="The age of the student at the time of enrollment.">
                  Age
                </td>
                <td title="The number of curricular units enrolled by the student in the first semester.">
                  enrolled(1st)
                </td>
                <td title="The number of curricular units approved by the student in the first semester.">
                  approved(1st)
                </td>
                <td title="Curricular units 1st sem (grade)">grade(1st)</td>
                <td title="The number of curricular units enrolled by the student in the second semester.">
                  enrolled(2nd)
                </td>
                <td title="The number of curricular units approved by the student in the second semester.">
                  approved(2nd)
                </td>
                <td title="Curricular units 2nd sem (grade)">grade(2nd)</td>
                <td title="Curricular units 2nd sem (grade)">prediction</td>
              </tr>
              {books &&
                users.map((user) => (
                  <>
                    <tr
                      key={user.id}
                      className=" py-10 mb-10 text-slate-500 "
                      style={{ textAlign: "start", margin: 32 }}
                    >
                      <td>{user["name"]}</td>
                      <td>{user["Application mode"]}</td>
                      <td>{user["Displaced"]}</td>
                      <td>{user["Debtor"]}</td>
                      <td>{user["Tuition fees up to date"]}</td>
                      <td>{user["Gender"]}</td>
                      <td>{user["Scholarship holder"]}</td>
                      <td>{user["Age at enrollment"]}</td>
                      <td>{user["Curricular units 1st sem (enrolled)"]}</td>
                      <td>{user["Curricular units 1st sem (approved)"]}</td>
                      <td>{user["Curricular units 1st sem (grade)"]}</td>
                      <td>{user["Curricular units 2nd sem (approved)"]}</td>
                      <td>{user["Curricular units 2nd sem (enrolled)"]}</td>
                      <td>{user["Curricular units 2nd sem (grade)"]}</td>
                      <td>
                        {user["prediction"] ? (
                          <span
                            style={{
                              color:
                                user["prediction"] === "Dropout"
                                  ? "red"
                                  : "green",
                            }}
                          >
                            {user["prediction"]}
                          </span>
                        ) : (
                          <button
                            onClick={() => getPrediction(user)}
                            type=""
                            className="mx-2 bg-slate-600 text-green-200 p-1 m-2 rounded-md"
                          >
                            predict
                          </button>
                        )}
                      </td>
                    </tr>
                    <Modal
                      title="Update book"
                      open={
                        isModalOpen &&
                        selectedBook &&
                        selectedBook._id === user._id
                      }
                      onOk={() => {
                        form
                          .validateFields()
                          .then((values) => {
                            form.resetFields();
                            handleOk();
                          })
                          .catch((info) => {
                            console.log("Validate Failed:", info);
                          });
                      }}
                      onCancel={handleCancel}
                    >
                      <Form
                        form={form}
                        name="basic"
                        initialValues={{}}
                        labelCol={{
                          span: 8,
                        }}
                        wrapperCol={{
                          span: 16,
                        }}
                        style={{
                          maxWidth: 600,
                        }}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        className=" text-center"
                      >
                        <Form.Item
                          label="book title"
                          name="title"
                          rules={[
                            {
                              message: "Please input book title!",
                            },
                          ]}
                        >
                          <Input defaultValue={user.title} />
                        </Form.Item>
                        <Form.Item
                          label="book author"
                          name="author"
                          rules={[
                            {
                              message: "Please input book author!",
                            },
                          ]}
                        >
                          <Input defaultValue={user.author} />
                        </Form.Item>
                        <Form.Item label="book image" name="image">
                          <Input defaultValue={user.image} />
                        </Form.Item>

                        <Form.Item
                          label="book date"
                          name="date"
                          rules={[
                            {
                              // message: 'Please input book date!',
                            },
                          ]}
                        >
                          <DatePicker format="DD-MM-YYYY" />
                        </Form.Item>

                        <Form.Item
                          label="book overview"
                          name="overview"
                          rules={[
                            {
                              message: "Please input book overview!",
                            },
                          ]}
                        >
                          <Input.TextArea defaultValue={user.overview} />
                        </Form.Item>

                        <Form.Item
                          label="Number of Pages"
                          name="num_of_pages"
                          rules={[
                            {
                              type: "number",
                              message: "Please input the number of pages!",
                            },
                          ]}
                        >
                          <InputNumber defaultValue={user.num_of_pages} />
                        </Form.Item>

                        <Form.Item
                          label="Genre"
                          name="genre"
                          rules={[
                            {
                              message: "Please input book genre!",
                            },
                          ]}
                        >
                          <Input defaultValue={user.genre} />
                        </Form.Item>

                        <Form.Item
                          label="Price"
                          name="price"
                          rules={[
                            {
                              message: "Please input book price!",
                            },
                          ]}
                        >
                          <Input defaultValue={user.price} />
                        </Form.Item>

                        <Form.Item
                          label="Book Status"
                          name="book_status"
                          rules={[
                            {
                              message: "Please input book status!",
                            },
                          ]}
                        >
                          <Input defaultValue={user.book_status} />
                        </Form.Item>

                        <Form.Item
                          label="Rating"
                          name="rating"
                          rules={[
                            {
                              type: "number",
                              message: "Please input book rating!",
                            },
                          ]}
                        >
                          <InputNumber defaultValue={user.rating} />
                        </Form.Item>

                        <Form.Item
                          label="Amount"
                          name="amount"
                          rules={[
                            {
                              type: "number",
                              message: "Please input the amount!",
                            },
                          ]}
                        >
                          <InputNumber defaultValue={user.amount} />
                        </Form.Item>

                        <Form.Item
                          wrapperCol={{
                            offset: 8,
                            span: 16,
                          }}
                        >
                          <Button
                            className="w-full bg-green-600 text-slate-200 hover:text-slate-100"
                            htmlType="submit"
                          >
                            Submit
                          </Button>
                        </Form.Item>
                      </Form>
                    </Modal>
                  </>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Books;
