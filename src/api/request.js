import Request from "@/api/index";

export const toLogin = (phone, password) => Request.post('/login/byphone', { phone, password });
export const isLogined = () => Request.get('/islogin', {}, true);
export const getAllTimus = (type, start, limit) => Request.get('/game/typetimu', {type, start, limit});
export const getOptionalGames = () => Request.get('/game/optional', {}, true);
export const insertTypeTimu = (type, timu) => Request.put('/game/insert/typetimu', {type, timu}, true);
export const collectGame = (rankid, id, type) => Request.put('/game/collect/gameandtimu', {rankid,id,type}, true);
export const insertGame = (info) => Request.put('/game/insert', info, true);
export const uploadImg = (file) => Request.post('/upload/img', file, true);
export const getAuditGame = (start, limit) => Request.get('/game/audit', {start, limit});
export const getGameById = (rankid) => Request.get('/game/id', {rankid});
export const getRankRewards = (rankid) => Request.get('/game/rank/reward', {rankid});
export const sendReward = (info) => Request.put('/game/sendReward', info, true);
