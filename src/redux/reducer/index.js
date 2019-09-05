/*Reducer: 数据处理 store 调用*/

import { type } from './../action';

const initialState = {
    menuMame:"首页"
};

//action 就是action文件夹下的index

const editName = (state = initialState, action) => {
    switch (action.type) {
        case type.SWITCH_MENU:
            return{
                ...state, //旧值
                menuName: action.menuName //新值
            };
            break;
        default:
            return {
                ...state
            };
    }
};

export default editName;
