/**
 * 配置
 */
export interface ApiConfig {

    /**
     * 协议前缀 http/https
     */
    SCHEMA_PREFIX: string;

    /**
     * 根域名
     */
    ROOT_DOMAIN: string;

    /**
     * web context
     */
    SITE_WEB_CONTEXT?: string;

    /**
     *基础域名
     */
    BASE_DOMAIN: string


    /**
     * 请求api的域名
     */
    API_BASE_URL: string;


    /**
     * 客户端id
     * @dataType {string}
     */
    CLIENT_ID?: string;

    /**
     * 客户端秘钥
     * @dataType {string}
     */
    CLIENT_SECRET?: string;


    /**
     * 渠道编号
     */
    CHANNEL_CODE?:string;







}
