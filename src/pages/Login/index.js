import React, { Component } from "react";
import { Flex, WingBlank, WhiteSpace, Toast } from "antd-mobile";

import { Link } from "react-router-dom";

import NavHeader from "../../components/NavHeader";

import styles from "./index.module.css";
import { Login_in } from "../../request/api";
// 导入withFormik
import { withFormik } from "formik";
// 导入Yup
import * as Yup from "yup";
// 验证规则：
const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/;
const REG_PWD = /^[a-zA-Z_\d]{5,12}$/;

/* 
  使用 formik 重构登录功能：

  1 安装：yarn add formik。
  2 导入 withFormik，使用 withFormik 高阶组件包裹 Login 组件。
  3 为 withFormik 提供配置对象：mapPropsToValues / handleSubmit。
  4 在 Login 组件中，通过 props 获取到 values（表单元素值对象）、 handleSubmit、handleChange。
  5 使用 values 提供的值，设置为表单元素的 value，使用 handleChange 设置为表单元素的 onChange。
    注意：在给表单元素设置 handleChange 的时候，为了让其生效，需要给 表单元素 添加 name 属性，并且 name 属性的值与当前value名称相同！
    
  6 使用 handleSubmit 设置为表单的 onSubmit 。
  7 在 handleSubmit 中，通过 values 获取到表单元素值。
  8 在 handleSubmit 中，完成登录逻辑。
*/
class Login extends Component {
  // state = {
  //   username: "",
  //   password: "",
  // };

  // getUserName = (e) => {
  //   this.setState({
  //     username: e.target.value,
  //   });
  // };

  // getPassword = (e) => {
  //   this.setState({
  //     password: e.target.value,
  //   });
  // };
  // 表单提交事件的事件处理程序
  // handleSubmit = async (e) => {
  //   // 阻止表单提交时的默认行为
  //   e.preventDefault();

  //   // 获取账号和密码
  //   const { username, password } = this.state;

  //   console.log("表单提交了", username, password);
  //   // 发送请求
  //   const res = await Login_in({
  //     username,
  //     password,
  //   });

  //   console.log("登录结果：", res);
  //   const { body: token, status, description } = res;
  //   if (status === 200) {
  //     // 登录成功
  //     console.log(token);
  //     if (token) {
  //       localStorage.setItem("hkzf_token", token.token);
  //     }
  //     this.props.history.go(-1);
  //   } else {
  //     Toast.info(description, 2, null, false);
  //   }
  // };
  render() {
    // const { username, password } = this.state;
    const { values, handleSubmit, handleChange, errors, touched } = this.props;
    console.log(values, errors, touched);
    return (
      <div className={styles.root}>
        {/* 顶部导航 */}
        <NavHeader className={styles.navHeader}>账号登录</NavHeader>
        <WhiteSpace size="xl" />

        {/* 登录表单 */}
        <WingBlank>
          <form onSubmit={handleSubmit}>
            <div className={styles.formItem}>
              <input
                className={styles.input}
                value={values.username}
                onChange={handleChange}
                name="username"
                placeholder="请输入账号"
              />
            </div>
            {errors.username && touched.username && (
              <div className={styles.error}>{errors.username}</div>
            )}
            {/* 长度为5到8位，只能出现数字、字母、下划线 */}
            {/* <div className={styles.error}>账号为必填项</div> */}
            <div className={styles.formItem}>
              <input
                className={styles.input}
                value={values.password}
                onChange={handleChange}
                name="password"
                type="password"
                placeholder="请输入密码"
              />
            </div>
            {errors.password && touched.password && (
              <div className={styles.error}>{errors.password}</div>
            )}
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
/* 
  给登录功能添加表单验证：

  1 安装：yarn add yup （ Yup 文档 ），导入 Yup。
  2 在 withFormik 中添加配置项 validationSchema，使用 Yup 添加表单校验规则（文档）。
  3 在 Login 组件中，通过 props 获取到 errors（错误信息）和  touched（是否访问过，注意：需要给表单元素添加 handleBlur 处理失焦点事件才生效！）。
  4 在表单元素中通过这两个对象展示表单校验错误信息。
*/
// 使用 withFormik 高阶组件包装 Login 组件，为 Login 组件提供属性和方法
Login = withFormik({
  // 提供状态：
  mapPropsToValues: () => ({ username: "", password: "" }),
  // 表单的提交事件
  handleSubmit: async (values, { props }) => {
    // 获取账号和密码
    const { username, password } = values;

    // console.log('表单提交了', username, password)
    // 发送请求
    const res = await Login_in({
      username,
      password,
    });
    console.log("登录结果：", res);
    const { status, body, description } = res;
    console.log(res);
    if (status === 200) {
      // 登录成功
      // console.log("hkzf_token", body.token);
      localStorage.setItem("hkzf_token", body.token);
      // 注意：无法在该方法中，通过 this 来获取到路由信息
      // 所以，需要通过 第二个对象参数中获取到 props 来使用 props
      /* 
        1 登录成功后，判断是否需要跳转到用户想要访问的页面（判断 props.location.state 是否有值）。
        2 如果不需要（没有值），则直接调用 history.go(-1) 返回上一页。
        3 如果需要，就跳转到 from.pathname 指定的页面（推荐使用 replace 方法模式，而不是 push）。
      */
      if (!props.location.state) {
        // 此时，表示是直接进入到了该页面，直接调用 go(-1) 即可
        props.history.go(-1);
      } else {
        // push：[home, login, map]
        // replace: [home, map]
        props.history.replace(props.location.state.from.pathname);
      }
      // 注意：无法在该方法中，通过 this 来获取到路由信息
      // 所以，需要通过 第二个对象参数中获取到 props 来使用 props
      // props.history.go(-1)
    } else {
      // 登录失败
      Toast.info(description, 2, null, false);
    }
  },
  // 添加表单校验规则
  validationSchema: Yup.object().shape({
    username: Yup.string()
      .required("账号为必填项")
      .matches(REG_UNAME, "长度为5到8位，只能出现数字、字母、下划线"),
    password: Yup.string()
      .required("密码为必填项")
      .matches(REG_PWD, "长度为5到12位，只能出现数字、字母、下划线"),
  }),
})(Login);
export default Login;
