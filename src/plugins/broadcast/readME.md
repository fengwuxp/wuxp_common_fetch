
##### 广播插件
   
#####用于解决单页应用复杂情况下的数据交互和通知

       
        const broadcast = new BroadcastPlugin();
        
        //注册事件
        broadcast.register("update","test",()=>{});
       
        //发送广播
        broadcast.send("update","test",{});