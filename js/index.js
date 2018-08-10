// 获取元素
let getElem=function (selector) {
    return document.querySelector(selector)
};

let getAllElem=function (selector) {
    return document.querySelectorAll(selector);
};

//获取元素样式
let getCls=function (element) {
    return element.getAttribute('class');
};
//设置元素样式
let setCls=function (element,cls) {
    return element.setAttribute('class',cls);
};


// 为元素添加样式(主要添加类名）
let addCls=function (element,cls) {
    let baseCls=getCls(element);//获取样式（类名）
    if (baseCls.indexOf(cls)===-1){//如果不包含此类，则添加新类名
        setCls(element,baseCls+' '+cls)
    }

};
// 为元素删除样式(主要删除类名）outline AAA
let delCls=function (element,cls) {
    let baseCls=getCls(element);//获取样式（类名）
    if (baseCls.indexOf(cls)!==-1){//如果包含此类，则f
        setCls(element,baseCls.split(cls).join(' '))
    }

};


// 第一步初始化样式
let screenAnimateElements={
    '.screen-1':[
        '.screen-1_heading',
        '.screen-1_phone',
        '.screen-1_shadow',

    ],
    '.screen-2':[
        '.screen-2_heading',
        '.screen-2_subheading',
        '.screen-2_phone',
        '.screen-2_point_i_1',
        '.screen-2_point_i_2',
        '.screen-2_point_i_3',
    ],
    '.screen-3':[
        '.screen-3_subheading',
        '.screen-3_heading',
        '.screen-3_phone',
        '.screen-3_features',
    ],
    '.screen-4':[
        '.screen-4_subheading',
        '.screen-4_heading',
        '.screen-4_type_item_i_1',
        '.screen-4_type_item_i_2',
        '.screen-4_type_item_i_3',
        '.screen-4_type_item_i_4',
    ],
    '.screen-5': [
        '.screen-5_subheading',
        '.screen-5_heading',
        '.screen-5_bg',
    ]


};

// 设置屏幕元素为初始状态
let setSCreenAnimateInit=function (screenCls) {
    let screen = document.querySelector(screenCls);// 获取文档中 id="demo" 的元素：// document.querySelector("#demo");
    let animateElements = screenAnimateElements[screenCls];//  需要设置动画的元素
    for (let i = 0; i < animateElements.length; i++) {
        let element = document.querySelector(animateElements[i]);//获取每一屏下的所有子元素
        let baseClass = element.getAttribute('class');
        element.setAttribute('class',baseClass+' '+animateElements[i].substr(1)+'_animate_init');
    }
};
// 设置播放屏内的元素动画 //切换所有的animateElements的init->done    变成  A A_done
let playScreenAnimateDone=function(screenCls){
    let screen = document.querySelector(screenCls);// 获取文档中 id="demo" 的元素：// document.querySelector("#demo");
    let animateElements = screenAnimateElements[screenCls];//  需要设置动画的元素
    // 切换所有的animateElements的init->done    变成  A A_done
    for (let i = 0; i < animateElements.length; i++) {
        let element = document.querySelector(animateElements[i]);//获取每一屏下的所有子元素
        let baseClass = element.getAttribute('class');
        element.setAttribute('class',baseClass.replace('_animate_init','_animate_done'));
    }
};

window.onload=function () {
    for (k in screenAnimateElements){
        setSCreenAnimateInit(k);// k=screen-1,2,3,4,5
    }
};

// 第二步，滚动到哪就播放哪
let navItems=getAllElem('.header_nav-item');
let outLineItems=getAllElem('.outline_item');
//导航条和侧边变红
let switchNavItemActive=function(index){
    // 导航
    for (let i=0;i<navItems.length;i++){
        delCls(navItems[i],'header_nav-item_status_active');
    }
    addCls(navItems[index],'header_nav-item_status_active');
    // 侧边
    for (let i=0;i<outLineItems.length;i++){
        delCls(outLineItems[i],'outline_item_status_active');
    }
    addCls(outLineItems[index],'outline_item_status_active');
};

window.onscroll=function () {
    let top=document.documentElement.scrollTop;//获取滚动条到顶部的距离
    console.log(top);
    // 导航条黑色动画
    if(top>80){
        addCls(getElem('.header'),'header_status_back')
        addCls(getElem('.outline'),'outline_status_in')
    }else{
        delCls(getElem('.header'),'header_status_back');
        delCls(getElem('.outline'),'outline_status_in');
        switchNavItemActive(0);//滚动到哪，导航条在哪就变红
    }
    if (top>1){
        playScreenAnimateDone('.screen-1')

    }
    if (top>800*1-100){
        playScreenAnimateDone('.screen-2')
        switchNavItemActive(1);
    }
    if (top>800*2-100){
        playScreenAnimateDone('.screen-3')
        switchNavItemActive(2);
    }
    if (top>800*3-100){
        playScreenAnimateDone('.screen-4')
        switchNavItemActive(3);
    }
    if (top>800*4-100){
        playScreenAnimateDone('.screen-5')
        switchNavItemActive(4);
    }
};


// 第三步(导航条和侧边)双向定位（可以用锚点）

let setNavJump=function (i,lib) {
    let item=lib[i];//0 1 2 3 4
    console.log(item);
    item.onclick=function () {
        document.documentElement.scrollTop=i*800;//点击导航条跳转到某一个位置
    }
};
for (let i=0;i<navItems.length;i++) {
    setNavJump(i,navItems);
}
for (let i=0;i<outLineItems.length;i++) {
    setNavJump(i,outLineItems);
}


// 第四部：导航栏滑动效果
let navTip=getElem('.header_nav-tip');
let setTip=function (index,lib) {
    lib[index].onmouseover=function () {
        navTip.style.left=(index*100 )+'px'
    };

    let activeIdx=0;
    lib[index].onmouseout=function () {
        for (let i=0;i<lib.length;i++){
            if (getCls(lib[i]).indexOf('header_nav-item_status_active')>-1){
                activeIdx=i;
                break;
            }
        }
        navTip.style.left=(activeIdx*100)+'px'
    }
};
for (let i=0;i<navItems.length;i++){
    setTip(i,navItems);
}