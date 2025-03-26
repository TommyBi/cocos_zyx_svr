import { createPool, Pool, PoolOptions, RowDataPacket } from 'mysql2';


interface Data extends RowDataPacket {
    
}

interface User extends Data {
    userId: number;
    openId: string;
    nickName: string;
    avatar: string;
}

const poolConfig: PoolOptions = {
    host: 'localhost',
    user: 'root',
    password: 'Yrb13145211',
    database: 'user',
    connectionLimit: 10,
    queueLimit: 50,
    waitForConnections: true
};



export default class SqlManager {
    pool: Pool;
    constructor() {
        this.pool = createPool(poolConfig);
    }
    // 通过openId查询用户
    queryUserByOpenId(openId: string): Promise<Data[]> {
        return new Promise((resolve, reject) => {
            this.pool.query<Data[]>(
                'SELECT * FROM userSheet WHERE openId = ?',
                [openId],
                (err, rows) => {
                    if (err) return reject(err);
                    resolve(rows);
                }
            );
        });
    }

    // 通过userId查询用户
    async queryUserByUserId(userId: number): Promise<User[]> {
        return new Promise((resolve, reject) => {
            this.pool.query('SELECT * FROM userSheet WHERE userId = ?', [userId],
                (err, rows: User[]) => {
                    if (err) return reject(err);
                    resolve(rows);
                });
        });
    }

    // 注册用户
    async registerUser(
        openId: string,
        nickName: string,
        avatarUrl: string
    ): Promise<any> {
        try {
            const result: any = await this.pool.promise().query(
                'INSERT INTO userSheet (openId, nickName, avatar) VALUES (?,?,?)',
                [openId, nickName, avatarUrl]
            );

            const userId = result.insertId;
            const rows = await this.pool.promise().query(
                'SELECT * FROM userSheet WHERE userId = ?',
                [userId]
            );

            return rows[0];
        } catch (err) {
            throw err;
        }
    }
    /**
      更新用户信息（使用事务的方式进行数据库的修改提交操作, 其中涉及到beginTransaction 和 commit 的操作行为组合）
      这种模式确保了：
    - 原子性：所有操作要么全部成功，要么全部失败
    - 一致性：数据库始终保持有效状态
    - 隔离性：事务中的操作对其他连接不可见，直到提交
    - 持久性：一旦提交，更改就是永久性的
      因此，是的， commit() 确实会提交 beginTransaction() 之后执行的所有操作，使它们永久生效。 
     */
    async updateUserInfo(openId: string, newInfo: any) {
        const connection = await this.pool.promise().getConnection();
        try {
            await connection.beginTransaction();

            // 执行多个操作
            await connection.query('UPDATE userSheet SET ... WHERE openId = ?', [openId]);
            await connection.query('INSERT INTO userLog ...', [newInfo]);

            await connection.commit();
        } catch (err) {
            await connection.rollback();
            throw err;
        } finally {
            connection.release();
        }
    }

    checkConnection() {
        // 定期检查连接池状态
        setInterval(() => {
            // console.log(`Active connections: ${pool._allConnections.length}`);
            // console.log(`Idle connections: ${pool._freeConnections.length}`);
            // console.log(`Waiting for connection: ${pool._connectionQueue.length}`);
        }, 10000);
    }

}
export const sqlManager = new SqlManager();
