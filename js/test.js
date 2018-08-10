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

//点击一次添加一个init样式，再点击一次init样式换成done样式
function setScreenAnimate(screenCls) {
    let screen = document.querySelector(screenCls);// 获取文档中 id="demo" 的元素：// document.querySelector("#demo");
    let animateElements = screenAnimateElements[screenCls];//  需要设置动画的元素
    let isSetAnimateClass = false;//是否初始化子元素的样式
    let isAnimateDone=false;//当前屏幕下所有子元素的状态是done？

    screen.onclick = function () {
        // 初始化样式 为每一屏的所有元素增加init  A_init
        if (isSetAnimateClass === false) {
            for (let i = 0; i < animateElements.length; i++) {
                let element = document.querySelector(animateElements[i]);//获取每一屏下的所有子元素
                let baseClass = element.getAttribute('class');
                element.setAttribute('class',baseClass+' '+animateElements[i].substr(1)+'_animate_init');
            }
            isSetAnimateClass=true;
            return ;
        }

        // 切换所有的animateElements的init->done    变成  A A_done
        if (isAnimateDone===false){
            for (let i = 0; i < animateElements.length; i++) {
                let element = document.querySelector(animateElements[i]);//获取每一屏下的所有子元素
                let baseClass = element.getAttribute('class');
                element.setAttribute('class',baseClass.replace('_animate_init','_animate_done'));
            }
            isAnimateDone=true;
            return ;
        }
        // 切换所有的animateElements的done->init    变成  A A_init
        if (isAnimateDone===true){
            for (let i = 0; i < animateElements.length; i++) {
                let element = document.querySelector(animateElements[i]);//获取每一屏下的所有子元素
                let baseClass = element.getAttribute('class');
                element.setAttribute('class',baseClass.replace('_animate_done','_animate_init'));
            }
            isAnimateDone=false;
            return ;
        }
    }


}

setScreenAnimate('.screen-1');
setScreenAnimate('.screen-2');
setScreenAnimate('.screen-3');
setScreenAnimate('.screen-4');
setScreenAnimate('.screen-5');