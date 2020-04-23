import React, { Component } from "react";
import { Flex, WingBlank, WhiteSpace, Toast } from "antd-mobile";

import { Link } from "react-router-dom";

import NavHeader from "../../components/NavHeader";

import styles from "./index.module.css";
import { Login_in } from "../../request/api";
// 验证规则：
// const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
// const REG_PWD = /^[a-zA-Z_\d]{5,12}$/

class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  getUserName = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  getPassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  // 表单提交事件的事件处理程序
  handleSubmit = async (e) => {
    // 阻止表单提交时的默认行为
    e.preventDefault();

    // 获取账号和密码
    const { username, password } = this.state;

    console.log("表单提交了", username, password);
    // 发送请求
    const res = await Login_in({
      username,
      password,
    });

    console.log("登录结果：", res);
    const { body: token, status, description } = res;
    if (status === 200) {
      // 登录成功
      console.log(token);
      if (token) {
        localStorage.setItem("hkzf_token", token.token);
      }
      this.props.history.go(-1);
    } else {
      Toast.info(description, 2, null, false);
    }
  };
  render() {
    const { username, password } = this.state;

    return (
      <div className={styles.root}>
        {/* 顶部导航 */}
        <NavHeader className={styles.navHeader}>账号登录</NavHeader>
        <WhiteSpace size="xl" />

        {/* 登录表单 */}
        <WingBlank>
          <form onSubmit={this.handleSubmit}>
            <div className={styles.formItem}>
              <input
                className={styles.input}
                value={username}
                onChange={this.getUserName}
                name="username"
                placeholder="请输入账号"
              />
            </div>
            {/* 长度为5到8位，只能出现数字、字母、下划线 */}
            {/* <div className={styles.error}>账号为必填项</div> */}
            <div className={styles.formItem}>
              <input
                className={styles.input}
                value={password}
                onChange={this.getPassword}
                name="password"
                type="password"
                placeholder="请输入密码"
              />
            </div>
            {/* 长度为5到12位，只能出现数字、字母、下划线 */}
            {/* <div className={styles.error}>账号为必填项</div> */}
            <div className={styles.formSubmit}>
              <button className={styles.submit} type="submit">
                登 录
              </button>
            </div>
          </form>
          <Flex className={styles.backHome}>
            <Flex.Item>
              <Link to="/registe">还没有账号，去注册~</Link>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    );
  }
}

export default Login;
