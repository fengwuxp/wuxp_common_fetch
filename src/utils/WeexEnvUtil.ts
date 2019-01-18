let WEEX_ENV_PLATFORM_NAME = weex.config.env.platform.toLocaleLowerCase();

/**
 * 是否为浏览器
 * @return {boolean}
 */
const isWeb = (): boolean => {

    return WEEX_ENV_PLATFORM_NAME === 'web';
};

/**
 * 是否为安卓
 * @return {boolean}
 */
const isAndroid = (): boolean => {
    return WEEX_ENV_PLATFORM_NAME === 'android';
};

/**
 * 是否为ios
 * @return {boolean}
 */
const isIos = (): boolean => {

    return WEEX_ENV_PLATFORM_NAME === 'ios';
};
/**
 * 是否为 iphoneX
 * @return {boolean}
 */
const isIphoneX = (): boolean => {

    return isIos() && weex.config.env.deviceHeight === 2436;
};

/**
 * 是否为 iphoneXR
 * @return {boolean}
 */
const isIphoneXR = (): boolean => {

    return isIos() && weex.config.env.deviceHeight === 1792;
};


export {
    isAndroid,
    isWeb,
    isIos,
    isIphoneX,
    isIphoneXR
}
