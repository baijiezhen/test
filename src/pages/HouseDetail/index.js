import React, { Component } from "react";

import { Carousel, Flex, Modal, Toast } from "antd-mobile";

import NavHeader from "../../components/NavHeader";
import HouseItem from "../../components/HouseItem";
import HousePackage from "../../components/HousePackage";
import {
  houses_detail,
  is_collect,
  collect,
  del_collect,
} from "../../request/api";
// import { BASE_URL } from '../../utils/url'
import { isAuth } from "../../untils/auth";

import styles from "./index.module.css";
const BASE_URL = "http://localhost:8080";
console.log(styles);
// 猜你喜欢
const recommendHouses = [
  {
    id: 1,
    src: BASE_URL + "/img/message/1.png",
    desc: "72.32㎡/南 北/低楼层",
    title: "安贞西里 3室1厅",
    price: 4500,
    tags: ["随时看房"],
  },
  {
    id: 2,
    src: BASE_URL + "/img/message/2.png",
    desc: "83㎡/南/高楼层",
    title: "天居园 2室1厅",
    price: 7200,
    tags: ["近地铁"],
  },
  {
    id: 3,
    src: BASE_URL + "/img/message/3.png",
    desc: "52㎡/西南/低楼层",
    title: "角门甲4号院 1室1厅",
    price: 4300,
    tags: ["集中供暖"],
  },
];
let alert = Modal.alert;
// 百度地图
const BMap = window.BMap;

const labelStyle = {
  position: "absolute",
  zIndex: -7982820,
  backgroundColor: "rgb(238, 93, 91)",
  color: "rgb(255, 255, 255)",
  height: 25,
  padding: "5px 10px",
  lineHeight: "14px",
  borderRadius: 3,
  boxShadow: "rgb(204, 204, 204) 2px 2px 2px",
  whiteSpace: "nowrap",
  fontSize: 12,
  userSelect: "none",
};

export default class HouseDetail extends Component {
  state = {
    isLoading: false,

    houseInfo: {
      // 房屋图片
      houseImg: [],
      // 标题
      title: "",
      // 标签
      tags: [],
      // 租金
      price: 0,
      // 房型
      roomType: "两室一厅",
      // 房屋面积
      size: 89,
      // 装修类型
      renovation: "精装",
      // 朝向
      oriented: [],
      // 楼层
      floor: "",
      // 小区名称
      community: "",
      // 地理位置
      coord: {
        latitude: "39.928033",
        longitude: "116.529466",
      },
      // 房屋配套
      supporting: [],
      // 房屋标识
      houseCode: "",
      // 房屋描述
      description: "",
    },
    isFavorite: false,
  };

  componentDidMount() {
    this.getHouseDetail();
    this.renderMap("天山星城", {
      latitude: "31.219228",
      longitude: "121.391768",
    });
    // 检查房源是否收藏
    this.checkFavorite();
  }

  // 渲染轮播图结构
  // 渲染轮播图结构
  renderSwipers() {
    const {
      houseInfo: { houseImg },
    } = this.state;
    console.log(houseImg);
    return houseImg.map((item) => (
      <a key={item} href="http://itcast.cn">
        <img src={BASE_URL + item} alt="" />
      </a>
    ));
  }
  // 渲染地图
  renderMap(community, coord) {
    const { latitude, longitude } = coord;

    const map = new BMap.Map("map");
    const point = new BMap.Point(longitude, latitude);
    map.centerAndZoom(point, 17);

    const label = new BMap.Label("", {
      position: point,
      offset: new BMap.Size(0, -36),
    });

    label.setStyle(labelStyle);
    label.setContent(`
      <span>${community}</span>
      <div class="${styles.mapArrow}"></div>
    `);
    map.addOverlay(label);
  }
  async getHouseDetail() {
    const { id } = this.props.match.params;

    // 开启loading
    this.setState({
      isLoading: true,
    });

    const res = await houses_detail(id);
    console.log(res);

    this.setState({
      houseInfo: res.body,
      isLoading: false,
    });

    const { community, coord } = res.body;

    // 渲染地图
    this.renderMap(community, coord);
  }

  // 检查房源是否收藏：
  async checkFavorite() {
    const isLogin = isAuth();

    if (!isLogin) {
      // 没有登录
      return;
    }

    // 已登录
    const { id } = this.props.match.params;
    const res = await is_collect(id);
    console.log(res);
    const { status, body } = res;
    if (status === 200) {
      // 表示请求已经成功，需要更新 isFavorite 的值
      this.setState({
        isFavorite: body.isFavorite,
      });
    }
  }

  /* 
    收藏房源：

    1 给收藏按钮绑定单击事件，创建方法 handleFavorite 作为事件处理程序。
    2 调用 isAuth 方法，判断是否登录。
    3 如果未登录，则使用 Modal.alert 提示用户是否去登录。
    4 如果点击取消，则不做任何操作。
    5 如果点击去登录，就跳转到登录页面，同时传递 state（登录后，再回到房源收藏页面）。
    
    6 根据 isFavorite 判断，当前房源是否收藏。
    7 如果未收藏，就调用添加收藏接口，添加收藏。
    8 如果已收藏，就调用删除收藏接口，去除收藏。

    alert('提示', '登录后才能收藏房源，是否去登录?', [
      { text: '取消' },
      {
        text: '去登录',
        onPress: () => {}
      }
    ])
  */
  handleFavorite = async () => {
    const isLogin = isAuth();
    const { history, location, match } = this.props;

    if (!isLogin) {
      // 未登录
      return alert("提示", "登录后才能收藏房源，是否去登录?", [
        { text: "取消" },
        {
          text: "去登录",
          onPress: () => history.push("/login", { from: location }),
        },
      ]);
    }

    // 已登录
    const { isFavorite } = this.state;
    const { id } = match.params;

    if (isFavorite) {
      // 已收藏，应该删除收藏
      const res = await del_collect(id);
      console.log(res);
      this.setState({
        isFavorite: false,
      });

      if (res.status === 200) {
        // 提示用户取消收藏
        Toast.info("已取消收藏", 1, null, false);
      } else {
        // token 超时
        Toast.info("登录超时，请重新登录", 2, null, false);
      }
    } else {
      // 未收藏，应该添加收藏
      const res = await collect(id);
      // console.log(res)
      if (res.status === 200) {
        // 提示用户收藏成功
        Toast.info("已收藏", 1, null, false);
        this.setState({
          isFavorite: true,
        });
      } else {
        // token 超时
        Toast.info("登录超时，请重新登录", 2, null, false);
      }
    }
  };
  render() {
    const {
      isLoading,
      houseInfo: {
        community,
        title,
        price,
        roomType,
        size,
        floor,
        oriented,
        supporting,
        description,
      },
      isFavorite,
    } = this.state;
    return (
      <div className={styles.root}>
        {/* 导航栏 */}
        <NavHeader
          className={styles.navHeader}
          rightContent={[<i key="share" className="iconfont icon-share" />]}
        >
          {community}
        </NavHeader>

        {/* 轮播图 */}
        <div className={styles.slides}>
          {!isLoading ? (
            <Carousel autoplay infinite autoplayInterval={5000}>
              {this.renderSwipers()}
            </Carousel>
          ) : (
            ""
          )}
        </div>

        {/* 房屋基础信息 */}
        <div className={styles.info}>
          <h3 className={styles.infoTitle}>
            整租 · 精装修，拎包入住，配套齐Q，价格优惠
          </h3>
          <Flex className={styles.tags}>
            <Flex.Item>
              <span className={[styles.tag, styles.tag1].join(" ")}>
                随时看房
              </span>
            </Flex.Item>
          </Flex>

          <Flex className={styles.infoPrice}>
            <Flex.Item className={styles.infoPriceItem}>
              <div>
                8500
                <span className={styles.month}>/月</span>
              </div>
              <div>租金</div>
            </Flex.Item>
            <Flex.Item className={styles.infoPriceItem}>
              <div>1室1厅1卫</div>
              <div>房型</div>
            </Flex.Item>
            <Flex.Item className={styles.infoPriceItem}>
              <div>78平米</div>
              <div>面积</div>
            </Flex.Item>
          </Flex>

          <Flex className={styles.infoBasic} align="start">
            <Flex.Item>
              <div>
                <span className={styles.title}>装修：</span>
                精装
              </div>
              <div>
                <span className={styles.title}>楼层：</span>
                低楼层
              </div>
            </Flex.Item>
            <Flex.Item>
              <div>
                <span className={styles.title}>朝向：</span>南
              </div>
              <div>
                <span className={styles.title}>类型：</span>普通住宅
              </div>
            </Flex.Item>
          </Flex>
        </div>

        {/* 地图位置 */}
        <div className={styles.map}>
          <div className={styles.mapTitle}>
            小区：
            <span>天山星城</span>
          </div>
          <div className={styles.mapContainer} id="map">
            地图
          </div>
        </div>

        {/* 房屋配套 */}
        <div className={styles.about}>
          <div className={styles.houseTitle}>房屋配套</div>
          <HousePackage
            list={[
              "电视",
              "冰箱",
              "洗衣机",
              "空调",
              "热水器",
              "沙发",
              "衣柜",
              "天然气",
            ]}
          />
          {/* <div className="title-empty">暂无数据</div> */}
        </div>

        {/* 房屋概况 */}
        <div className={styles.set}>
          <div className={styles.houseTitle}>房源概况</div>
          <div>
            <div className={styles.contact}>
              <div className={styles.user}>
                <img src={BASE_URL + "/img/avatar.png"} alt="头像" />
                <div className={styles.useInfo}>
                  <div>王女士</div>
                  <div className={styles.userAuth}>
                    <i className="iconfont icon-auth" />
                    已认证房主
                  </div>
                </div>
              </div>
              <span className={styles.userMsg}>发消息</span>
            </div>

            <div className={styles.descText}>
              {/* {description || '暂无房屋描述'} */}
              1.周边配套齐全，地铁四号线陶然亭站，交通便利，公交云集，距离北京南站、西站都很近距离。
              2.小区规模大，配套全年，幼儿园，体育场，游泳馆，养老院，小学。
              3.人车分流，环境优美。
              4.精装两居室，居家生活方便，还有一个小书房，看房随时联系。
            </div>
          </div>
        </div>

        {/* 推荐 */}
        <div className={styles.recommend}>
          <div className={styles.houseTitle}>猜你喜欢</div>
          <div className={styles.items}>
            {recommendHouses.map((item) => (
              <HouseItem {...item} key={item.id} />
            ))}
          </div>
        </div>

        {/* 底部收藏按钮 */}
        <Flex className={styles.fixedBottom}>
          <Flex.Item onClick={this.handleFavorite}>
            <img
              src={
                BASE_URL + (isFavorite ? "/img/star.png" : "/img/unstar.png")
              }
              className={styles.favoriteImg}
              alt="收藏"
            />
            <span className={styles.favorite}>
              {isFavorite ? "已收藏" : "收藏"}
            </span>
          </Flex.Item>
          <Flex.Item>在线咨询</Flex.Item>
          <Flex.Item>
            <a href="tel:400-618-4000" className={styles.telephone}>
              电话预约
            </a>
          </Flex.Item>
        </Flex>
      </div>
    );
  }
}
