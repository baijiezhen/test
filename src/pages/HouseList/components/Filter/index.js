import React, { Component } from "react";
// 导入 Spring 组件
import { Spring } from "react-spring/renderprops";
import FilterTitle from "../FilterTitle";
import FilterPicker from "../FilterPicker";
import FilterMore from "../FilterMore";
import { houses_condition } from "../../../../request/api";
import styles from "./index.module.css";

// 标题高亮状态
// true 表示高亮； false 表示不高亮
const titleSelectedStatus = {
  area: false,
  mode: false,
  price: false,
  more: false,
};
/* 
  获取当前筛选条件的数据：

  1 在 Filter 组件中，发送请求，获取所有筛选条件数据。
  2 将数据保存为状态：filtersData。
  3 封装渲染 FilterPicker 的方法 renderFilterPicker。

  4 在方法中，根据 openType 的类型，从 filtersData 中获取到需要的数据。
  5 将数据通过 props 传递给 FilterPicker 组件。
  6 FilterPicker 组件接收到数据后，将其作为 PickerView 组件的 data （数据源）。
*/

/* 
  设置默认选中值：

  1 在 Filter 组件中，提供选中值状态：selectedValues。
  2 根据 openType 获取到当前类型的选中值（defaultValue），通过 props 传递给 FilterPicker 组件。
  3 在 FilterPicker 组件中，将 defaultValue 设置为状态 value 的默认值。
  4 在点击确定按钮后，在父组件中更新当前 type 对应的 selectedValues 状态值。
*/
// FilterPicker 和 FilterMore 组件的选中值
const selectedValues = {
  area: ["area", "null"],
  mode: ["null"],
  price: ["null"],
  more: [],
};

export default class Filter extends Component {
  state = {
    titleSelectedStatus,
    openType: "",
    // 所有筛选条件数据
    filtersData: {},
    selectedValues,
  };

  // 点击标题菜单实现高亮
  // 注意：this指向的问题！！！
  // 说明：要实现完整的功能，需要后续的组件配合完成！

  /* 
    // 高亮：
    // selectedVal 表示当前 type 的选中值
    // 
    // 如果 type 为 area，此时，selectedVal.length !== 2 || selectedVal[0] !== 'area'，就表示已经有选中值
    // 如果 type 为 mode，此时，selectedVal[0] !== 'null'，就表示已经有选中值
    // 如果 type 为 price，此时，selectedVal[0] !== 'null'，就表示已经有选中值
    // 如果 type 为 more, ...

    实现步骤：

    1 在标题点击事件 onTitleClick 方法中，获取到两个状态：标题选中状态对象和筛选条件的选中值对象。
    2 根据当前标题选中状态对象，获取到一个新的标题选中状态对象（newTitleSelectedStatus）。
    3 使用 Object.keys() 方法，遍历标题选中状态对象。
    4 先判断是否为当前标题，如果是，直接让该标题选中状态为 true（高亮）。

    5 否则，分别判断每个标题的选中值是否与默认值相同。
    6 如果不同，则设置该标题的选中状态为 true。
    7 如果相同，则设置该标题的选中状态为 false。
    8 更新状态 titleSelectedStatus 的值为：newTitleSelectedStatus。
  */
  onTitleClick = (type) => {
    const { titleSelectedStatus, selectedValues } = this.state;
    // 创建新的标题选中状态对象
    const newTitleSelectedStatus = { ...titleSelectedStatus };

    // 遍历标题选中状态对象
    // Object.keys() => ['area', 'mode', 'price', 'more']
    Object.keys(titleSelectedStatus).forEach((key) => {
      // key 表示数组中的每一项，此处，就是每个标题的 type 值。
      if (key === type) {
        // 当前标题
        newTitleSelectedStatus[type] = true;
        return;
      }

      // 其他标题：
      const selectedVal = selectedValues[key];
      if (
        key === "area" &&
        (selectedVal.length !== 2 || selectedVal[0] !== "area")
      ) {
        // 高亮
        newTitleSelectedStatus[key] = true;
      } else if (key === "mode" && selectedVal[0] !== "null") {
        // 高亮
        newTitleSelectedStatus[key] = true;
      } else if (key === "price" && selectedVal[0] !== "null") {
        // 高亮
        newTitleSelectedStatus[key] = true;
      } else if (key === "more" && selectedVal.length !== 0) {
        // 更多选择项 FilterMore 组件
        newTitleSelectedStatus[key] = true;
      } else {
        newTitleSelectedStatus[key] = false;
      }
    });
    this.setState({
      // 展示对话框
      openType: type,
      // 使用新的标题选中状态对象来更新
      titleSelectedStatus: newTitleSelectedStatus,
    });
    // console.log(type);
    // this.setState((prevState) => {
    //   return {
    //     titleSelectedStatus: {
    //       // 获取当前对象中所有属性的值
    //       ...prevState.titleSelectedStatus,
    //       [type]: true,
    //     },
    //     openType: type,
    //   };
    // });
  };
  // 取消（隐藏对话框）
  onCancel = (type) => {
    console.log(type);
    const { titleSelectedStatus, selectedValues } = this.state;
    // 创建新的标题选中状态对象
    const newTitleSelectedStatus = { ...titleSelectedStatus };

    // 菜单高亮逻辑处理
    const selectedVal = selectedValues[type];
    if (
      type === "area" &&
      (selectedVal.length !== 2 || selectedVal[0] !== "area")
    ) {
      // 高亮
      newTitleSelectedStatus[type] = true;
    } else if (type === "mode" && selectedVal[0] !== "null") {
      // 高亮
      newTitleSelectedStatus[type] = true;
    } else if (type === "price" && selectedVal[0] !== "null") {
      // 高亮
      newTitleSelectedStatus[type] = true;
    } else if (type === "more" && selectedVal.length !== 0) {
      // 更多选择项 FilterMore 组件
      newTitleSelectedStatus[type] = true;
    } else {
      newTitleSelectedStatus[type] = false;
    }
    // 隐藏对话框
    this.setState({
      openType: "",
      titleSelectedStatus: newTitleSelectedStatus,
    });
  };

  // 确定（隐藏对话框）
  onSave = (type, value) => {
    // 其他标题：
    const { titleSelectedStatus } = this.state;
    // 创建新的标题选中状态对象
    const newTitleSelectedStatus = { ...titleSelectedStatus };
    const selectedVal = value;
    if (
      type === "area" &&
      (selectedVal.length !== 2 || selectedVal[0] !== "area")
    ) {
      // 高亮
      newTitleSelectedStatus[type] = true;
    } else if (type === "mode" && selectedVal[0] !== "null") {
      // 高亮
      newTitleSelectedStatus[type] = true;
    } else if (type === "price" && selectedVal[0] !== "null") {
      // 高亮
      newTitleSelectedStatus[type] = true;
    } else if (type === "more" && selectedVal.length !== 0) {
      // 更多选择项 FilterMore 组件
      newTitleSelectedStatus[type] = true;
    } else {
      newTitleSelectedStatus[type] = false;
    }
    console.log(type, value);
    const newSelectedValues = {
      ...this.state.selectedValues,
      // 只更新当前 type 对应的选中值
      [type]: value,
    };

    console.log("最新的选中值：", newSelectedValues);
    const { area, mode, price, more } = newSelectedValues;

    // 筛选条件数据
    const filters = {};

    // 区域
    const areaKey = area[0];
    let areaValue = "null";
    if (area.length === 3) {
      areaValue = area[2] !== "null" ? area[2] : area[1];
    }
    filters[areaKey] = areaValue;

    // 方式和租金
    filters.mode = mode[0];
    filters.price = price[0];

    // 更多筛选条件 more
    filters.more = more.join(",");

    console.log(filters);
    this.props.onFilters(filters);
    // 隐藏对话框
    this.setState({
      openType: "",
      titleSelectedStatus: newTitleSelectedStatus,
      selectedValues: newSelectedValues,
    });
  };
  async getFiltersData() {
    const { value } = JSON.parse(localStorage.getItem("hkzf_city"));
    let res = await houses_condition({ id: value });
    res = res.body;
    this.setState({
      filtersData: res,
    });
  }
  componentDidMount() {
    this.getFiltersData();
  }
  // 渲染 FilterPicker 组件的方法
  renderFilterPicker() {
    const {
      openType,
      filtersData: { area, subway, rentType, price },
      selectedValues,
    } = this.state;
    let defaultValue = selectedValues[openType];
    if (openType !== "area" && openType !== "mode" && openType !== "price") {
      return null;
    }

    // 根据 openType 来拿到当前筛选条件数据
    let data = [];
    let cols = 3;
    switch (openType) {
      case "area":
        // 获取到区域数据
        data = [area, subway];
        cols = 3;
        break;
      case "mode":
        data = rentType;
        cols = 1;
        break;
      case "price":
        data = price;
        cols = 1;
        break;
      default:
        break;
    }

    return (
      <FilterPicker
        key={openType}
        onCancel={this.onCancel}
        onSave={this.onSave}
        data={data}
        cols={cols}
        type={openType}
        defaultValue={defaultValue}
      />
    );
  }
  /* 
    设置默认选中值：

    1 在渲染 FilterMore 组件时，从 selectedValues 中，获取到当前选中值 more。
    2 通过 props 将选中值传递给 FilterMore 组件。
    3 在 FilterMore 组件中，将获取到的选中值，设置为子组件状态 selectedValues 的默认值。
    4 给遮罩层绑定单击事件。
    5 在单击事件中，调用父组件的方法 onCancel 关闭 FilterMore 组件。
  */
  renderFilterMore() {
    const {
      openType,
      selectedValues,
      filtersData: { roomType, oriented, floor, characteristic },
    } = this.state;
    if (openType !== "more") {
      return null;
    }

    const data = {
      roomType,
      oriented,
      floor,
      characteristic,
    };

    const defaultValue = selectedValues.more;

    return (
      <FilterMore
        data={data}
        type={openType}
        onSave={this.onSave}
        onCancel={this.onCancel}
        defaultValue={defaultValue}
      />
    );
  }
  /* 
    react-spring 的基本使用：

    1 安装：yarn add react-spring。
    2 打开 Spring 组件文档（Spring 组件用来将数据从一个状态移动到另一个状态）。
    3 导入 Spring 组件，使用 Spring 组件包裹要实现动画效果的遮罩层 div。
    4 通过 render-props 模式，将参数 props（样式） 设置为遮罩层 div 的 style。
    5 给 Spring 组件添加 from 属性，指定：组件第一次渲染时的动画状态。
    6 给 Spring 组件添加 to 属性，指定：组件要更新的新动画状态。
  */
  /* 
    实现遮罩层动画：

    1 创建方法 renderMask 来渲染遮罩层 div。
    2 修改渲染遮罩层的逻辑，保证 Spring 组件一直都被渲染（Spring 组件都被销毁了，就无法实现动画效果）。
    3 修改 to 属性的值，在遮罩层隐藏时为 0，在遮罩层展示时为 1。
    4 在 render-props 的函数内部，判断 props.opacity 是否等于 0。
    5 如果等于 0，就返回 null（不渲染遮罩层），解决遮罩层遮挡页面导致顶部导航失效问题。
    6 如果不等于 0，渲染遮罩层 div。
  */
  // 渲染遮罩层div
  renderMask() {
    const { openType } = this.state;

    const isHide = openType === "more" || openType === "";

    return (
      <Spring from={{ opacity: 0 }} to={{ opacity: isHide ? 0 : 1 }}>
        {(props) => {
          // 说明遮罩层已经完成动画效果，隐藏了
          if (props.opacity === 0) {
            return null;
          }

          return (
            <div
              style={props}
              className={styles.mask}
              onClick={() => this.onCancel(openType)}
            />
          );
        }}
      </Spring>
    );

    /* if (openType === 'more' || openType === '') {
      return null
    }

    return (
      <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
        {props => {
          return (
            <div
              style={props}
              className={styles.mask}
              onClick={() => this.onCancel(openType)}
            />
          )
        }}
      </Spring>
    ) */
  }
  render() {
    const { titleSelectedStatus, openType } = this.state;

    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {/* {openType === "area" || openType === "mode" || openType === "price" ? (
          <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
            {(props) => {
              // props => { opacity: 0 } 是从 0 到 1 的中间值
              // console.log(props);

              return (
                <div
                  style={props}
                  className={styles.mask}
                  onClick={() => this.onCancel(openType)}
                />
              );
            }}
          </Spring>
        ) : null} */}
        {this.renderMask()}
        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle
            titleSelectedStatus={titleSelectedStatus}
            onClick={this.onTitleClick}
          />

          {/* 前三个菜单对应的内容： */}
          {/* {openType === "area" ||
          openType === "mode" ||
          openType === "price" ? (
            <FilterPicker onCancel={this.onCancel} onSave={this.onSave} />
          ) : null} */}
          {this.renderFilterPicker()}

          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
          {this.renderFilterMore()}
        </div>
      </div>
    );
  }
}
