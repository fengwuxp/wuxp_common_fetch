import {isWeb} from "../utils/WeexEnvUtil";

/**
 * 自定义location 保存对象
 * Created by wuxp on 2017/6/6.
 */
if (isWeb()) {
    const locationModal :any= {

        /**
         * 获取我的位置信息
         * @param flag
         * @param succ 成功回调  {"district":"街道","address":"详细地址","latitude":123.99,"longitude":36.99}
         * @param fail 失败回调
         */
        getMyLocation(flag,succ = (params:any) => {
        }, fail = () => {
        }){
            console.log("浏览器暂不支持该方法");
            succ({
                district:"杨桥西路298号",
                address:"福州市鼓楼区杨桥西路298号",
                areaCode:300,
                latitude:123.1,
                longitude:55.23
            })
        },
        /**
         * Map={"mode":1,"address":"地址","slat":"起点纬度","slng":"起点经度","dlat":"目标纬度","dlng":"目标经度"}
         * mode:1、2、3，分别表示公交、驾车和步行
         * address:可空
         * 坐标double型，起点坐标不传
         * @param params
         * @param succ
         * @param fail
         */
        openRoutePlan(params:any,succ=()=>{},fail=()=>{}){
            console.log("浏览器暂不支持改方法");
        }
    };
    console.log("注册自定义模块 location");
    weex.registerModule('location', locationModal);
}
