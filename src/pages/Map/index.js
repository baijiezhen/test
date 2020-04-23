import React from "react";
import NavHeader from "../../components/NavHeader/index";
import { area_map, houses } from "../../request/api";
import { Link } from "react-router-dom";
import { Toast } from "antd-mobile";

// 导入样式
// import "./index.scss";
import styles from "./index.module.css";
console.log(styles);
const BMap = window.BMap;
// 覆盖物样式
const labelStyle = {
  cursor: "pointer",
  border: "0px solid rgb(255, 0, 0)",
  padding: "0px",
  whiteSpace: "nowrap",
  fontSize: "12px",
  color: "rgb(255, 255, 255)",
  textAlign: "center",
};
export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      housesList: [],
      isShowList: false,
    };
  }
  componentDidMount() {
    this.initMap();
  }
  initMap() {
    // console.log(this);
    /* 
      1 获取当前定位城市。
      2 使用地址解析器解析当前城市坐标。
      3 调用 centerAndZoom() 方法在地图中展示当前城市，并设置缩放级别为11。
      4 在地图中展示该城市，并添加比例尺和平移缩放控件。
    */

    // 获取当前定位城市
    const { label, value } = JSON.parse(localStorage.getItem("hkzf_city"));
    console.log(label, value);
    // 初始化地图实例
    // 注意：在 react 脚手架中全局对象需要使用 window 来访问，否则，会造成 ESLint 校验错误
    const map = new BMap.Map("container");
    // 作用：能够在其他方法中通过 this 来获取到地图对象
    this.map = map;
    // 设置中心点坐标
    // const point = new BMap.Point(116.404, 39.915);
    // 初始化地图
    // map.centerAndZoom(point, 15);
    // 创建地址解析器实例
    const myGeo = new BMap.Geocoder();
    // 将地址解析结果显示在地图上，并调整地图视野
    myGeo.getPoint(
      label,
      async (point) => {
        if (point) {
          //  初始化地图
          map.centerAndZoom(point, 11);
          // map.addOverlay(new BMap.Marker(point))

          // 添加常用控件
          map.addControl(new BMap.NavigationControl()); // 平移缩放
          map.addControl(new BMap.ScaleControl()); //比例尺
          /* 
            1 获取房源数据。
            2 遍历数据，创建覆盖物，给每个覆盖物添加唯一标识（后面要用）。
            3 给覆盖物添加单击事件。
            4 在单击事件中，获取到当前单击项的唯一标识。
            5 放大地图（级别为13），调用 clearOverlays() 方法清除当前覆盖物。
          */
          // let mapData = await area_map({ id: value });
          // mapData = mapData.body;
          /* 
            1 创建 Label 实例对象。
            2 调用 setStyle() 方法设置样式。
            3 在 map 对象上调用 addOverlay() 方法，将文本覆盖物添加到地图中。
          */
          // mapData.forEach((item) => {
          //   console.log(item);
          //   const {
          //     coord: { longitude, latitude },
          //     label: areaName,
          //     count,
          //     value,
          //   } = item;
          //   // 创建覆盖物
          //   //   const areaPoint = new BMap.Point(longitude, latitude);
          //   //   const label = new BMap.Label("", {
          //   //     position: areaPoint,
          //   //     offset: new BMap.Size(-35, -35),
          //   //   });
          //   //   label.id = value;
          //   //   // 设置房源覆盖物内容
          //   //   label.setContent(`
          //   //   <div class="${styles.bubble}">
          //   //     <p class="${styles.name}">${item.label}</p>
          //   //     <p>${item.count}套</p>
          //   //   </div>
          //   // `);

          //   // 设置样式
          //   // label.setStyle(labelStyle);
          //   // 添加单击事件
          //   // label.addEventListener("click", () => {
          //   //   console.log("房源覆盖物被点击了", label.id);

          //   //   // 放大地图，以当前点击的覆盖物为中心放大地图
          //   //   // 第一个参数：坐标对象
          //   //   // 第二个参数：放大级别
          //   //   map.centerAndZoom(areaPoint, 13);

          //   //   // 解决清除覆盖物时，百度地图API的JS文件自身报错的问题
          //   //   setTimeout(() => {
          //   //     // 清除当前覆盖物信息
          //   //     map.clearOverlays();
          //   //   }, 0);
          //   // });
          //   // 添加覆盖物到地图中
          //   // map.addOverlay(label);
          // });
          this.renderOverlays(value);
        }
      },
      label
    );
  }
  // 渲染覆盖物入口
  // 1 接收区域 id 参数，获取该区域下的房源数据
  // 2 获取房源类型以及下级地图缩放级别
  async renderOverlays(id) {
    try {
      // 开启loading
      Toast.loading("加载中...", 0, null, false);

      const res = await area_map({ id });
      // 关闭 loading
      Toast.hide();

      const data = res.body;

      // 调用 getTypeAndZoom 方法获取级别和类型
      const { nextZoom, type } = this.getTypeAndZoom();

      data.forEach((item) => {
        // 创建覆盖物
        this.createOverlays(item, nextZoom, type);
      });
    } catch (e) {
      // 关闭 loading
      Toast.hide();
    }
  }

  // 计算要绘制的覆盖物类型和下一个缩放级别
  // 区   -> 11 ，范围：>=10 <12
  // 镇   -> 13 ，范围：>=12 <14
  // 小区 -> 15 ，范围：>=14 <16
  getTypeAndZoom() {
    // 调用地图的 getZoom() 方法，来获取当前缩放级别
    const zoom = this.map.getZoom();
    let nextZoom, type;

    // console.log('当前地图缩放级别：', zoom)
    if (zoom >= 10 && zoom < 12) {
      // 区
      // 下一个缩放级别
      nextZoom = 13;
      // circle 表示绘制圆形覆盖物（区、镇）
      type = "circle";
    } else if (zoom >= 12 && zoom < 14) {
      // 镇
      nextZoom = 15;
      type = "circle";
    } else if (zoom >= 14 && zoom < 16) {
      // 小区
      type = "rect";
    }

    return {
      nextZoom,
      type,
    };
  }

  // 创建覆盖物
  createOverlays(data, zoom, type) {
    const {
      coord: { longitude, latitude },
      label: areaName,
      count,
      value,
    } = data;

    // 创建坐标对象
    const areaPoint = new BMap.Point(longitude, latitude);

    if (type === "circle") {
      // 区或镇
      this.createCircle(areaPoint, areaName, count, value, zoom);
    } else {
      // 小区
      this.createRect(areaPoint, areaName, count, value);
    }
  }

  // 创建区、镇覆盖物
  createCircle(point, name, count, id, zoom) {
    // 创建覆盖物
    const label = new BMap.Label("", {
      position: point,
      offset: new BMap.Size(-35, -35),
    });

    // 给 label 对象添加一个唯一标识
    label.id = id;

    // 设置房源覆盖物内容
    label.setContent(`
      <div class="${styles.bubble}">
        <p class="${styles.name}">${name}</p>
        <p>${count}套</p>
      </div>
    `);

    // 设置样式
    label.setStyle(labelStyle);

    // 添加单击事件
    label.addEventListener("click", () => {
      // 调用 renderOverlays 方法，获取该区域下的房源数据
      this.renderOverlays(id);

      // 放大地图，以当前点击的覆盖物为中心放大地图
      this.map.centerAndZoom(point, zoom);

      // 解决清除覆盖物时，百度地图API的JS文件自身报错的问题
      setTimeout(() => {
        // 清除当前覆盖物信息
        this.map.clearOverlays();
      }, 0);
    });

    // 添加覆盖物到地图中
    this.map.addOverlay(label);
  }

  createRect(point, name, count, id) {
    // 创建覆盖物
    const label = new BMap.Label("", {
      position: point,
      offset: new BMap.Size(-50, -28),
    });

    // 给 label 对象添加一个唯一标识
    label.id = id;

    // 设置房源覆盖物内容
    label.setContent(`
      <div class="${styles.rect}">
        <span class="${styles.housename}">${name}</span>
        <span class="${styles.housenum}">${count}套</span>
        <i class="${styles.arrow}"></i>
      </div>
    `);

    // 设置样式
    label.setStyle(labelStyle);

    // 添加单击事件
    label.addEventListener("click", (e) => {
      this.getHousesList(label.id);
      // 获取当前被点击项
      const target = e.changedTouches[0];
      this.map.panBy(
        window.innerWidth / 2 - target.clientX,
        (window.innerHeight - 330) / 2 - target.clientY
      );
    });

    // 添加覆盖物到地图中
    this.map.addOverlay(label);
  }
  // 获取小区房源数据
  async getHousesList(id) {
    try {
      // 开启loading
      Toast.loading("加载中...", 0, null, false);
      let res = await houses({ id });
      res = res.body;
      Toast.hide();
      this.setState({
        housesList: res.list,
        // 展示房源列表
        isShowList: true,
      });
    } catch (e) {
      // 关闭 loading
      Toast.hide();
    }
  }
  // 封装渲染房屋列表的方法
  renderHousesList() {
    return this.state.housesList.map((item) => (
      <div className={styles.house} key={item.houseCode}>
        <div className={styles.imgWrap}>
          <img
            className={styles.img}
            src={`http://localhost:8080${item.houseImg}`}
            alt=""
          />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{item.title}</h3>
          <div className={styles.desc}>{item.desc}</div>
          <div>
            {/* ['近地铁', '随时看房'] */}
            {item.tags.map((tag, index) => {
              const tagClass = "tag" + (index + 1);
              return (
                <span
                  className={[styles.tag, styles[tagClass]].join(" ")}
                  key={tag}
                >
                  {tag}
                </span>
              );
            })}
          </div>
          <div className={styles.price}>
            <span className={styles.priceNum}>{item.price}</span> 元/月
          </div>
        </div>
      </div>
    ));
  }
  render() {
    return (
      <div className={styles.map}>
        <NavHeader
        // onLeftClick={() => {
        //   console.log(1111);
        // }}
        >
          地图找房
        </NavHeader>
        {/* 地图容器元素 */}
        <div id="container" className={styles.container} />
        {/* 房源列表 */}
        {/* 添加 styles.show 展示房屋列表 */}
        <div
          className={[
            styles.houseList,
            this.state.isShowList ? styles.show : "",
          ].join(" ")}
        >
          <div className={styles.titleWrap}>
            <h1 className={styles.listTitle}>房屋列表</h1>
            <Link className={styles.titleMore} to="/home/list">
              更多房源
            </Link>
          </div>

          <div className={styles.houseItems}>
            {/* 房屋结构 */}
            {this.renderHousesList()}
            {/* {this.state.housesList.map((item) => (
              <div className={styles.house} key={item.houseCode}>
                <div className={styles.imgWrap}>
                  <img
                    className={styles.img}
                    src={`http://localhost:8080${item.houseImg}`}
                    alt=""
                  />
                </div>
                <div className={styles.content}>
                  <h3 className={styles.title}>{item.title}</h3>
                  <div className={styles.desc}>{item.desc}</div>
                  <div>
                    {item.tags.map((tag) => (
                      <span
                        className={[styles.tag, styles.tag1].join(" ")}
                        key={tag}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className={styles.price}>
                    <span className={styles.priceNum}>{item.price}</span> 元/月
                  </div>
                </div>
              </div>
            ))} */}
          </div>
        </div>
      </div>
    );
  }
}
