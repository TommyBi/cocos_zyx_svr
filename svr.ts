import { Request, Response, NextFunction } from 'express';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import { loginManager } from './apiLogin';

const app = express();

// 使用cors中间件，允许所有域名访问
app.use(cors());

// 使用helmet 中间件增强express应用安全性, 会强制使用https
app.use(helmet());

// 解析 application/json 类型的请求体
app.use(bodyParser.json());

// 解析 application/x-www-form-urlencoded 类型的请求体
app.use(bodyParser.urlencoded({ extended: true }));

// 创建路由实例 后面还需要注册路由，即绑定什么样的地址是 user 或 game
const user = express.Router();
const game = express.Router();

// 公共路由中间件
function routerMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log('routerMiddleware');
    next();
}
app.use(routerMiddleware);

// 登录路由
app.post('/login', async (req: Request, res: Response) => {
    loginManager.login(req, res);
});

// 用户相关路由
user.all('/chat', (req: Request, res: Response) => {
    res.send('user chat');
});

// 游戏相关路由
game.all('/rank', (req: Request, res: Response) => {
    res.send('game api');
});

// 注册路由
app.use('/user', user);
app.use('/game', game);

// 监听端口
app.listen(8080, () => {
    console.log('server start at localhost 8080');
});