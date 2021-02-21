import Vue from 'vue'
import Vuex from 'vuex';
import mutations from "@/store/mutations";
import actions from "@/store/actions";
import getters from "@/store/getters";

Vue.use(Vuex)

const state = {
  userinfo: null,
  realyList: [],
  alreadyList: [],
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
})
