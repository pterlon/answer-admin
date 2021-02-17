import Request from "@/api/index";

export const toLogin = (phone, password) => Request.post('/login/byphone', { phone, password });
export const isLogined = () => Request.get('/islogin', {}, true);
export const getAllTimus = (type, start, limit) => Request.get('/game/typetimu', {type, start, limit});