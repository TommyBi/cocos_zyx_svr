import { sqlManager } from "./sqlManager";

// 登录验证的服务器业务
const express = require('express');
const axios = require('axios');
const util = require('./util');

export default class LoginManager {
    constructor() {
    }

    // 微信登录验证服务
    async loginAction(code: string) {
        // 发送一个https请求，并解析返回的结果
        const appid = 'wxdc39c78bfd045896';
        const secret = '20143ade40e34618654a725a755d345d';
        try {
            const response = await axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`);
            console.log(response.data);
            return response.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async login(req: any, res: any) {

        const query = req.body; // 获取 POST 请求的 body 参数
        console.log('Request：', req.url, query); // 打印完整的请求 URL

        try {
            if (query.code) {
                // 用户真实登录( 前端透传code -> 服务器获取用户唯一openid -> 注册/登录 -> 返回用户信息 )
                const code = query.code;
                const wxUserInfo = await this.loginAction(code);  // 移除 this
                let userInfo = await sqlManager.queryUserByOpenId(wxUserInfo.openid);
                if (userInfo.length === 0) {
                    // 需要注册
                    const result = await sqlManager.registerUser(wxUserInfo.openid, wxUserInfo.nickname, wxUserInfo.avatarurl);
                    res.json({ success: true, data: result });
                } else {
                    // 直接读取用户信息
                    userInfo = await sqlManager.queryUserByUserId(query.userId);
                    res.json({ success: true, data: userInfo });
                }
            } else if (query.userId) {
                const userId = query.userId;
                // mock用户登录    
                const userInfo = await sqlManager.queryUserByUserId(userId);
                console.log('mock user login', userInfo);
                if (userInfo.length === 0) {
                    // 注册用户
                    console.log('mock user register');
                    const nickName = util.produceNickName();
                    const result = await sqlManager.registerUser('-1', nickName, '');

                    console.log('mock user register result', result);
                    res.json({ success: true, data: result });
                } else {
                    // 用户登录
                    res.json({ success: true, data: userInfo });
                }
            } else {
                res.status(200).json({ success: true, message: '缺少参数' });
            }
        } catch (err: any) {
            console.error('登录失败:', err);
            res.status(500).json({ success: false, message: err.message });
        }
    }

    // 准备用户游戏进行中的状态信息
    private prepareGameinfo() {

    }

    // 准备用户游戏进行中的棋盘信息
    private prepareChessboard() {

    }

}

export const loginManager = new LoginManager();