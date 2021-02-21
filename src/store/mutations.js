import {Notification} from "element-ui";

export default {
  init(state, info) {
    state.userinfo = info;
    window.localStorage.setItem('token', info.token);
    state.realyList = JSON.parse(localStorage.getItem('realyList')) || [];
  },
  setTimu(state, timu) {
    state.realyList.push(timu);
    window.localStorage.setItem('realyList', JSON.stringify(state.realyList));
  },
  deleteTimu(state, timu) {
    let index = state.realyList.findIndex(item => item === timu);
    if (index > -1) {
      state.realyList.splice(index, 1);
      window.localStorage.setItem('realyList', JSON.stringify(state.realyList));
    }
  },
  setCreatedTimu(state, timu) {
    if (state.alreadyList.includes(timu)) {
      Notification.warning('该题目已经被添加过了');
    } else {
      state.alreadyList.push(timu);
    }
  },
  deleteCreatedTimu(state, timu) {
    let index = state.alreadyList.findIndex(item => item === timu);
    if (index > -1) {
      state.alreadyList.splice(index, 1);
    }
  },
}