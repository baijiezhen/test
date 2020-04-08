import React from "react";
import { Route } from "react-router-dom";
import News from "../News/index";
import Index from "../Index/index";
import HouseList from "../HouseList/index";
import Profile from "../Profile/index";
import { TabBar } from "antd-mobile";
import "./index.css";
import { Carousel, WingBlank } from "antd-mobile";
// TabBar 数据
import axios from "axios";
const tabItems = [
  {
    title: "首页",
    icon: "icon-ind",
    path: "/home"
  },
  {
    title: "找房",
    icon: "icon-findHouse",
    path: "/home/list"
  },
  {
    title: "资讯",
    icon: "icon-infom",
    path: "/home/news"
  },
  {
    title: "我的",
    icon: "icon-my",
    path: "/home/profile"
  }
];
/* 
  问题：点击首页导航菜单，导航到 找房列表 页面时，找房菜单没有高亮

  原因：原来我们实现该功能的时候，只考虑了 点击 以及 第一次加载 Home 组件的情况。但是，我们没有考虑不重新加载 Home 组件时的路由切换，因为，这种情况下，我们的代码没有覆盖到

  解决：
    思路：在 路由切换 时，也执行 菜单高亮 的逻辑代码
    1 添加 componentDidUpdate 钩子函数
    2 在钩子函数中判断路由地址是否切换（因为路由的信息是通过 props 传递给组件的，所以，通过比较更新前后的两个props）
    3 在路由地址切换时，让 菜单高亮
*/
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 控制默认高亮菜单
      selectedTab: this.props.location.pathname,
      data: ["1", "2", "3"],
      imgHeight: 176
    };
  }
  componentDidMount() {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        data: [
          "AiyWuByWklrrUDlFignR",
          "TekJlZRVCjLFexlOCuWn",
          "IJOtIlfsYdTyaDTRVrLI"
        ]
      });
    }, 100);
  }
  // 组件接收到新的props（此处，实际上是路由信息）就会触发该钩子函数
  componentDidUpdate(prevProps) {
    // prevProps 上一次的props，此处也就是上一次的路由信息
    // this.props 当前最新的props，此处也就是最新的路由信息
    // 注意：在该钩子函数中更新状态时，一定要在 条件判断 中进行，否则会造成递归更新的问题
    if (prevProps.location.pathname !== this.props.location.pathname) {
      // 此时，就说明路由发生切换了
      this.setState({
        selectedTab: this.props.location.pathname
      });
    }
  }
  renderTabBarItem() {
    return tabItems.map((item, index) => {
      return (
        <TabBar.Item
          title={item.title}
          key={item.title}
          icon={<i className={`iconfont  ${item.icon}`}></i>}
          selectedIcon={<i className={`iconfont  ${item.icon}`}></i>}
          selected={this.state.selectedTab === item.path}
          onPress={() => {
            this.setState({
              selectedTab: item.path
            });
            this.props.history.push(item.path);
          }}
        ></TabBar.Item>
      );
    });
  }
  render() {
    console.log(this.props.location.pathname);
    return (
      <div className="home">
        <Route exact path="/home" component={Index}></Route>
        <Route path="/home/list" component={HouseList}></Route>
        <Route path="/home/news" component={News}></Route>
        <Route path="/home/profile" component={Profile}></Route>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#21b97a"
          barTintColor="white"
          hidden={this.state.hidden}
          noRenderContent={true}
        >
          {this.renderTabBarItem()}
        </TabBar>
      </div>
    );
  }
}
export default Home;
