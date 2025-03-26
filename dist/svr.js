"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const apiLogin_1 = require("./apiLogin");
const app = (0, express_1.default)();
// 使用cors中间件，允许所有域名访问
app.use((0, cors_1.default)());
// 使用helmet 中间件增强express应用安全性, 会强制使用https
app.use((0, helmet_1.default)());
// 解析 application/json 类型的请求体
app.use(body_parser_1.default.json());
// 解析 application/x-www-form-urlencoded 类型的请求体
app.use(body_parser_1.default.urlencoded({ extended: true }));
// 创建路由实例 后面还需要注册路由，即绑定什么样的地址是 user 或 game
const user = express_1.default.Router();
const game = express_1.default.Router();
// 公共路由中间件
function routerMiddleware(req, res, next) {
    console.log('routerMiddleware');
    next();
}
app.use(routerMiddleware);
// 登录路由
app.post('/login', async (req, res) => {
    apiLogin_1.loginManager.login(req, res);
});
// 用户相关路由
user.all('/chat', (req, res) => {
    res.send('user chat');
});
// 游戏相关路由
game.all('/rank', (req, res) => {
    res.send('game api');
});
// 注册路由
app.use('/user', user);
app.use('/game', game);
// 监听端口
app.listen(8080, () => {
    console.log('server start at localhost 8080');
});
