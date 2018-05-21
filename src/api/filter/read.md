
##### 请求过滤
   
#####支持前置过滤和后置过滤  使用示例

##### 添加默认filter  使用registerDefaultFilter 注册，表示该filter一定会被执行

          
          import ApiFetchBuild from "../../src/api/ApiFetchBuild";
          import {NeedLoginFilter} from "../../src/api/filter/default/NeedLoginFilter";
          import {NeedSignFilter} from "../../src/api/filter/default/NeedSignFilter";
          
          /**
           * 构建apiClient
           * @type {ApiClientFetch}
           */
          const apiClientFetch = ApiFetchBuild.registerDefaultFilter({
              pattern: "/memberService/*", //表示匹配memberService下的所有uri
              filter: new NeedLoginFilter({
                  getCurrentLoginMember: () => {
                  },
                  isLogin: () => {
                  },
                  saveMember: () => {
                  }
              }),
              filterName: "NeedLoginFilter"
          }).registerDefaultFilter({
              pattern: "/*", //表示匹配所有
              filter: new NeedSignFilter(""),
              filterName: "NeedSignFilter"
          }).build();
          
          //或者
          
          ApiFetchBuild.registerFilter(
              [
                  {
                      pattern: {
                          memberService: ["/getUser", "/getAccount", new RegExp("^/info/*")]
                      },//表示匹配memberService下的getUser，getAccount，info/*
                      filter: new NeedLoginFilter({
                          getCurrentLoginMember: () => {
                          },
                          isLogin: () => {
                          },
                          saveMember: () => {
                          }
                      }),
                      filterName: "NeedLoginFilter"
                  },
                  {
                      pattern(uri: string) {
                          return new RegExp("/*").test(uri);
                      }, //表示匹配所有
                      filter: new NeedSignFilter(""),
                      filterName: "NeedSignFilter"
                  }
              ]
          ).build();
          
          export default apiClientFetch;
          
          
          