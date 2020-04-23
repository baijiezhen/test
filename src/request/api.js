import { get, post } from "./http";
// 获取授权问题
export const home_banner = (p) => get("/home/swiper", p);
export const home_groups = (p) => get("/home/groups", p);
export const home_news = (p) => get("/home/news", p);
export const area_info = (p) => get("/area/info", p);
export const area_city = (p) => get("/area/city", p);
export const area_hot = (p) => get("/area/hot", p);
export const area_map = (p) => get("/area/map", p);
export const houses = (p) => get("/houses", p);
export const houses_condition = (p) => get("/houses/condition", p);
export const houses_detail = (id) => get(`/houses/${id}`);
export const Login_in = (p) => post("/user/login", p);
export const user = (p, headers) => get("/user", p, headers);
export const user_logout = (p, headers) => post("/user/logout", p, headers);
// await API.post("/user/logout", null, {
//   headers: {
//     authorization: getToken(),
//   },
// });
//  获取供应端服务条款
// export const _goods = p => get("/home/main/personal_category", p);
// export const _Info = p => get("/home/main/product_list", p);
// export const _Detail = p => get("/home/main/product_detail", p);
// export const _Poster = p => post("/home/main/poster", p);
