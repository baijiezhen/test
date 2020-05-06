import React from "react";
import SearchHeader from "../../components/SearchHeader/index";
import { Flex, Toast } from "antd-mobile";
import styles from "./index.module.css";
import {
  List,
  AutoSizer,
  WindowScroller,
  InfiniteLoader,
} from "react-virtualized";
import Filter from "./components/Filter";
import { houses } from "../../request/api";
import HouseItem from "../../components/HouseItem";
import Sticky from "../../components/Sticky";
import NoHouse from "../../components/NoHouse";
import { getCurrentCity } from "../../untils";
// const { label, value } = JSON.parse(localStorage.getItem("hkzf_city"));
/* 
  切换城市显示房源：

  原因：在组件外部的代码只会在项目加载时执行一次（刷新页面）。在切换路由时，不会重新重新执行。

       组件内部的 componentDidMount() 会在组件展示时执行，进入页面一次，执行一次。

  1 注释掉 获取当前定位城市信息 的代码。
  2 导入 utils 中的 getCurrentCity 方法。
  3 在 componentDidMount 中调用 getCurrentCity() 方法来获取当前定位城市信息。
  4 将 label 和 value 保存到 this 中。
  5 用到 label 和 value 的地方，使用 this.label 或 this.value 来访问。
*/
// console.log('HouseList')
// // 获取当前定位城市信息
// const { label, value } = JSON.parse(localStorage.getItem('hkzf_city'))
class HouseList extends React.Component {
  // 初始化默认值
  label = "";
  value = "";
  constructor(props) {
    super(props);
    this.state = { list: [], count: 0, isLoading: false };
  }
  onFilters = (filters) => {
    this.filters = filters;
    this.searchHouseList();
  };
  filters = {};
  // 用来获取房屋列表数据
  async searchHouseList() {
    this.setState({
      isLoading: true,
    });
    // 获取当前定位城市id
    Toast.loading("加载中...", 0, null, false);
    // const { value } = JSON.parse(localStorage.getItem("hkzf_city"));
    const res = await houses({
      cityId: this.value,
      ...this.filters,
      start: 1,
      end: 20,
    });
    let { list, count } = res.body;
    // 关闭loading
    Toast.hide();

    // 提示房源数量
    Toast.info(`共找到 ${count} 套房源`, 2, null, false);
    this.setState({
      list,
      count,
      isLoading: false,
    });
    console.log(res);
  }
  async componentDidMount() {
    let { label, value } = await getCurrentCity();
    this.label = label;
    this.value = value;
    this.searchHouseList();
  }
  renderHouseList = ({ key, index, style }) => {
    // 根据索引号来获取当前这一行的房屋数据
    const { list } = this.state;
    const house = list[index];

    // console.log(house);
    // 判断 house 是否存在
    // 如果不存在，就渲染 loading 元素占位
    if (!house) {
      return (
        <div key={key} style={style}>
          <p className={styles.loading} />
        </div>
      );
    }
    return (
      <HouseItem
        key={key}
        onClick={() => {
          this.props.history.push(`/detail/${house.houseCode}`);
        }}
        style={style}
        src={`http://localhost:8080${house.houseImg}`}
        title={house.title}
        desc={house.desc}
        tags={house.tags}
        price={house.price}
      />
    );
  };

  // 判断列表中的每一行是否加载完成
  isRowLoaded = ({ index }) => {
    return !!this.state.list[index];
  };

  // 用来获取更多房屋列表数据
  // 注意：该方法的返回值是一个 Promise 对象，并且，这个对象应该在数据加载完成时，来调用 resolve 让Promise对象的状态变为已完成。
  loadMoreRows = ({ startIndex, stopIndex }) => {
    // return fetch(`path/to/api?startIndex=${startIndex}&stopIndex=${stopIndex}`)
    //   .then(response => {
    //     // Store response data in list...
    //   })
    console.log(startIndex, stopIndex);

    return new Promise((resolve) => {
      // 数据加载完成时，调用 resolve 即可
      houses({
        cityId: this.value,
        ...this.filters,
        start: startIndex,
        end: stopIndex,
      }).then((res) => {
        console.log("loadMoreRows：", res);
        this.setState({
          list: [...this.state.list, ...res.body.list],
        });
        // 数据加载完成时，调用 resolve 即可
        resolve();
      });
    });
  };
  // 渲染列表数据
  renderList() {
    const { count, isLoading } = this.state;
    if (count === 0 && !isLoading) {
      return <NoHouse>没有找到房源，请您换个搜索条件吧~</NoHouse>;
    }

    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.loadMoreRows}
        rowCount={count}
      >
        {({ onRowsRendered, registerChild }) => (
          <WindowScroller>
            {({ height, isScrolling, scrollTop }) => (
              <AutoSizer>
                {({ width }) => (
                  <List
                    onRowsRendered={onRowsRendered}
                    ref={registerChild}
                    autoHeight // 设置高度为 WindowScroller 最终渲染的列表高度
                    width={width} // 视口的宽度
                    height={height} // 视口的高度
                    rowCount={count} // List列表项的行数
                    rowHeight={120} // 每一行的高度
                    rowRenderer={this.renderHouseList} // 渲染列表项中的每一行
                    isScrolling={isScrolling}
                    scrollTop={scrollTop}
                  />
                )}
              </AutoSizer>
            )}
          </WindowScroller>
        )}
      </InfiniteLoader>
    );
  }
  render() {
    // 获取当前定位城市信息
    let { count } = this.state;
    return (
      <div className={styles.root}>
        {/* 顶部搜索导航 */}
        <Flex className={styles.header}>
          <i
            className="iconfont icon-back"
            onClick={() => this.props.history.go(-1)}
          />
          <SearchHeader cityName={this.label} className={styles.searchHeader} />
        </Flex>

        {/* 条件筛选栏 */}
        <Sticky height={40}>
          <Filter onFilters={this.onFilters} />
        </Sticky>
        {/* 房屋列表 */}
        <div className={styles.houseItems}>{this.renderList()}</div>
      </div>
    );
  }
}
export default HouseList;
