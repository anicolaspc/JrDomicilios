import React from "react";
import { Layout, Row, Col, Space } from "antd";
import { FacebookOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

const { Footer } = Layout;

const FooterComponent = () => (
  <Footer style={{ textAlign: "center", padding: "20px 0" }}>
    <Row justify="center" align="middle">
      <Col span={24}>
        <Space size="large">
          <Link to="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FacebookOutlined style={{ fontSize: "24px", color: "blue" }} />
          </Link>
          <Link to="https://wa.me" target="_blank" rel="noopener noreferrer">
            <WhatsAppOutlined style={{ fontSize: "24px", color: "green" }} />
          </Link>
        </Space>
      </Col>
      <Col span={24}>
        <p style={{ marginTop: "10px", fontSize: "14px" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </p>
      </Col>
    </Row>
  </Footer>
);

export default FooterComponent;