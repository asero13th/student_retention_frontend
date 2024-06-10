import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Avatar, Badge, Layout } from "antd";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Books from "./components/Books";
import Selles from "./components/Selles";
import Orders from "./components/Orders";
import AddBook from "./components/AddBook";
import Carts from "./components/Carts";

function App() {
  const { Content } = Layout;

  return (
    <>
      <Router>
        <div className="">
          <Layout style={{ minHeight: "100vh" }} className="">
            <Layout className="">
              <div className="">
                <Content style={{ margin: "0 16px" }} className="">
                  <Routes>
                    <Route path="/" element={<Books />} />
                    <Route path="/addbook/" element={<AddBook />} />
                    <Route path="/sells/" element={<Selles />} />
                    <Route path="/orders/" element={<Orders />} />
                    <Route path="/carts/" element={<Carts />} />
                  </Routes>
                </Content>
              </div>
            </Layout>
          </Layout>
        </div>
      </Router>
    </>
  );
}

export default App;
