var arr = [{
        'biaoti': 'APP',
        'neirong': 'hi阿是否会奶量全看荒同期文科男爱护分散化五块环保部了不好看三非危保函 卷',
        'src': 'images/yingxiao.png',
        'guanjianzi': 'apptuiguang'
    },

    {
        'biaoti': '产品运营',
        'neirong': '思安发哈快乐十分哈卡无人北青网开机然后了可能是个框啦番看了可厉害看扣篮李可记',
        'src': 'images/wenan.png',
        'guanjianzi': 'chanpingyunying'
    },

    {
        'biaoti': '品牌营销',
        'neirong': '搜我暗黑玲网球拍入境卡两三年复合肥料卡视角两天了卡了扣伙食费拉康师傅捡垃圾纤维胶带开老三了卡石头喔了秋葵人就能来看房考虑好卡司法局坡为契机快过年了可能是福利卡神乐快换了个考核哦丘尔金来看房莱克斯诺',
        'src': 'images/yunying.png',
        'guanjianzi': 'pingpaiyingxiao'
    },

    {
        'biaoti': '文案圈',
        'neirong': '暗示法不去网吧绕口令千万别和刷卡机噶苏发过去玩客家人暴风不是的VB靠复活为何不把手机被坑几千万不氪金安保法师发不过来卡死人发过去哇嘎是开局把是开啦备卡加食发鬼啦葵扇就好比看手机发个拉时间翻倍新吃不完一个比赛的旮旯刷羁绊',
        'src': 'images/wenan.png',
        'guanjianzi': 'wenanquan'
    },

    {
        'biaoti': '海外推广',
        'neirong': '按实际废弃物客人gas不协战V型在是擦了食发鬼无人敢千万人gas发哈可送过去无人敢把上班吗哪上班发露乌龟群殴我如果家刷副本安居客刷副本吗下拨拉屎肝后期我看人家和按数据库拉风好吧按课时减防把森林防火快去五花肉看千瓦时卡视角分不开阿时间翻倍奥斯卡解放后空两千万更好看三级风gas开局防巴萨卡饭还不快拉丝机嘎哈克里斯房价高哈克己奉公可垃圾人发过去我开了入户卡就是个放杰卡斯购房款危急关头空气污染回去看；和',
        'src': 'images/2-13-480x300.png',
        'guanjianzi': 'haiwaituiguang'
    },

    {
        'biaoti': '游戏推广',
        'neirong': '卡级是两个号非亲非故还不能洒家咖啡馆，续命宝珠可是澜起科技拉康师傅',
        'src': 'images/62-2-480x300.jpg',
        'guanjianzi': 'youxituiguang'
    },

    {
        'biaoti': '青瓜早报',
        'neirong': '暗示法年卡健身房呼啦圈五花肉布鲁克哈',
        'src': 'images/baotu2.png',
        'guanjianzi': 'qingguazaobao'
    },

    {
        'biaoti': '联系我们',
        'neirong': '时才发觉阿萨德刚海忍太预估分可是举报，口县政府猎头那里看点会更快了换人了欠人情我家人；卷市东南方看论文和特莱文两口饭能升级开道馆哈尔就看留个纪念开了会可是你的发，复活iqwhrlk魂土能莱特我看好会计师电话费看',
        'src': 'images/1-7-480x300.jpg',
        'guanjianzi': 'lianxiwomen'
    },
    {
        'biaoti': '联系我们',
        'neirong': '时才发觉阿萨德刚海忍太预估分可是举报，口县政府猎头那里看点会更快了换人了欠人情我家人；卷市东南方看论文和特莱文两口饭能升级开道馆哈尔就看留个纪念开了会可是你的发，复活iqwhrlk魂土能莱特我看好会计师电话费看',
        'src': 'images/1-4-480x300.jpg',
        'guanjianzi': 'zuixinwenz'
    }
]
// 获取元素
let sec = document.querySelector(".sec-panel");
let xia = document.querySelectorAll(".xiabiankuang");

let item = document.querySelector('.item-img');
let tupian = document.querySelector('.aa')
let item_ = document.querySelector(".item_p")


//给sec绑定点击事件  委托它进行操作
sec.onclick = function (e) {

    // 获取点击到的元素的className
    let dainji = e.target.className;

    let arr2 = arr.filter(value => {
        // console.log(value);
        return value["guanjianzi"] === dainji
    })

    if (arr2.length !== 0) {
        xia.forEach(function (value) {
            // console.log(value);
            value.className == "xiabiankuang"
        })
        tupian.innerHTML = `<a href="" class="aa">
        <img class="j-lazy" src="${arr2[0]["src"]}">
        <div class="img1">APP推广</div>
        </a>`;
        item_.innerHTML = `
       <div>
       <p>${arr2[0]["biaoti"]}</p>
       <h3>${arr2[0]["neirong"]}</h3>
        </div>
         <div class="aa">
         <p>4小时前</p>
         <p>4.0k</p>
         </div>
        `
    } else {
        return;
    }

}