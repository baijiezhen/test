import React from "react";
import { NavBar, Toast } from "antd-mobile";
import { area_city, area_hot } from "../../request/api";
import "./index.scss";
import { getCurrentCity } from "../../untils/index";
import { List, AutoSizer } from "react-virtualized";
import NavHeader from "../../components/NavHeader/index";
// const list = Array(100).fill("122312313");
// console.log(list);
// function rowRenderer({ key, index, style }) {
//   return (
//     <div key={key} style={style}>
//       {list[index]}
//     </div>
//   );
// }
console.log(1111111111);

const formatCityData = (list) => {
  const cityList = {};
  // const cityIndex = []

  // 1 遍历list数组
  list.forEach((item) => {
    // 2 获取每一个城市的首字母
    const first = item.short.substr(0, 1);
    // 3 判断 cityList 中是否有该分类
    if (cityList[first]) {
      // 4 如果有，直接往该分类中push数据
      // cityList[first] => [{}, {}]
      cityList[first].push(item);
    } else {
      // 5 如果没有，就先创建一个数组，然后，把当前城市信息添加到数组中
      cityList[first] = [item];
    }
  });

  // 获取索引数据
  const cityIndex = Object.keys(cityList).sort();

  return {
    cityList,
    cityIndex,
  };
};
// 封装处理字母索引的方法
const formatCityIndex = (letter) => {
  switch (letter) {
    case "#":
      return "当前定位";
    case "hot":
      return "热门城市";
    default:
      return letter.toUpperCase();
  }
};
// 索引（A、B等）的高度
const TITLE_HEIGHT = 36;
// 每个城市名称的高度
const NAME_HEIGHT = 50;
// 有房源的城市
const HOUSE_CITY = ["北京", "上海", "广州", "深圳"];
class CityList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityList: {},
      cityIndex: [],
      activeIndex: 0,
    };
    this.cityListComponent = React.createRef();
  }
  async componentDidMount() {
    let areaCity = await area_city({ level: 1 });
    areaCity = areaCity.body;
    let areaHot = await area_hot();
    areaHot = areaHot.body;
    const { cityList, cityIndex } = formatCityData(areaCity);
    cityList["hot"] = areaHot;
    // 将索引添加到 cityIndex 中
    cityIndex.unshift("hot");
    console.log(cityList, cityIndex);
    // console.log(areaHot);
    // 获取当前定位城市
    const curCity = await getCurrentCity();
    cityList["#"] = [curCity];
    // console.log(cityList, cityIndex, curCity);
    cityIndex.unshift("#");
    this.setState({
      cityList,
      cityIndex,
    });
    this.cityListComponent.current.measureAllRows();
  }
  rowRenderer = ({
    key,
    index,
    isScrolling, // 当前项是否在滚动中
    isVisible, // 是否可见
    style, // 注意：重点属性，一定要给每一个行数据添加该样式！作用：指定每一行的位置
  }) => {
    // console.log(key, index);
    const { cityIndex, cityList } = this.state;
    const letter = cityIndex[index];
    return (
      <div key={key} style={style} className="city">
        <div className="title">{formatCityIndex(letter)}</div>
        {cityList[letter].map((item) => (
          <div
            className="name"
            key={item.value}
            onClick={() => {
              this.changeCity(item);
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
    );
  };
  // 创建动态计算每一行高度的方法
  getRowHeight = ({ index }) => {
    // 索引标题高度 + 城市数量 * 城市名称的高度
    // TITLE_HEIGHT + cityList[cityIndex[index]].length * NAME_HEIGHT
    console.log(index);
    const { cityList, cityIndex } = this.state;
    return TITLE_HEIGHT + cityList[cityIndex[index]].length * NAME_HEIGHT;
  };
  // 封装渲染右侧索引列表的方法
  renderCityIndex() {
    // 获取到 cityIndex，并遍历其，实现渲染
    const { cityIndex, activeIndex } = this.state;
    return cityIndex.map((item, index) => (
      <li
        className="city-index-item"
        key={item}
        onClick={() => {
          // console.log('当前索引号：', index)
          this.cityListComponent.current.scrollToRow(index);
        }}
      >
        <span className={activeIndex === index ? "index-active" : ""}>
          {item === "hot" ? "热" : item.toUpperCase()}
        </span>
      </li>
    ));
  }
  /* 
    1 给 List 组件添加 onRowsRendered 配置项，用于获取当前列表渲染的行信息。
    2 通过参数 startIndex 获取到，起始行索引（也就是城市列表可视区最顶部一行的索引号）。
    3 判断 startIndex 和 activeIndex 是否相同（判断的目的是为了提升性能，避免不必要的 state 更新）。
    4 当 startIndex 和 activeIndex 不同时，更新状态 activeIndex 为 startIndex 的值。
  */

  // 用于获取List组件中渲染行的信息
  onRowsRendered = ({ startIndex }) => {
    // console.log('startIndex：', startIndex)
    if (this.state.activeIndex !== startIndex) {
      this.setState({
        activeIndex: startIndex,
      });
    }
  };
  changeCity({ label, value }) {
    if (HOUSE_CITY.indexOf(label) > -1) {
      // 有
      localStorage.setItem("hkzf_city", JSON.stringify({ label, value }));
      this.props.history.go(-1);
    } else {
      Toast.info("该城市暂无房源数据", 1, null, false);
    }
  }
  render() {
    return (
      <div className="citylist">
        {/* <NavBar
          className="navbar"
          mode="light"
          icon={<i className="iconfont icon-back" />}
          onLeftClick={() => this.props.history.go(-1)}
        >
          
        </NavBar> */}
        <NavHeader>城市选择</NavHeader>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              ref={this.cityListComponent}
              rowCount={this.state.cityIndex.length}
              rowHeight={this.getRowHeight}
              rowRenderer={this.rowRenderer}
              width={width}
              onRowsRendered={this.onRowsRendered}
              scrollToAlignment="start"
            />
          )}
        </AutoSizer>
        {/* 右侧索引列表 */}
        {/* 
          1 封装 renderCityIndex 方法，用来渲染城市索引列表。
          2 在方法中，获取到索引数组 cityIndex ，遍历 cityIndex ，渲染索引列表。
          3 将索引 hot 替换为 热。
          4 在 state 中添加状态 activeIndex ，指定当前高亮的索引。
          5 在遍历 cityIndex 时，添加当前字母索引是否高亮的判断条件。
        */}
        <ul className="city-index">{this.renderCityIndex()}</ul>
      </div>
    );
  }
}
export default CityList;
