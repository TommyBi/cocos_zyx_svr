// 随机生成一个用户的名称
function produceNickName() {
    // 形容词列表
    const adjectives = [
        '开心的', '忧郁的', '活泼的', '安静的', '温柔的', '热情的', '冷静的', '可爱的', '优雅的', '神秘的',
        '慵懒的', '机灵的', '害羞的', '大方的', '调皮的', '认真的', '文静的', '活力的', '友善的', '专注的',
        '快乐的', '聪明的', '勇敢的', '谨慎的', '敏捷的', '坚强的', '温暖的', '清新的', '甜美的', '善良的',
        '幽默的', '耐心的', '细心的', '贴心的', '纯真的', '可靠的', '诚实的', '正直的', '豁达的', '乐观的',
        '积极的', '稳重的', '灵动的', '轻盈的', '柔和的', '恬静的', '欢快的', '雅致的', '从容的', '率真的',
        '天真的', '执着的', '坚定的', '睿智的', '敏锐的', '机智的', '沉稳的', '淡定的', '随和的', '朴实的',
        '含蓄的', '谦逊的', '儒雅的', '干练的', '灵巧的', '敬业的', '专业的', '细致的', '周到的', '妥善的',
        '和蔼的', '慈祥的', '善解人意的', '心细的', '耐心的', '专一的', '执著的', '坦率的', '真诚的', '纯朴的',
        '质朴的', '憨厚的', '老实的', '单纯的', '天真的', '可爱的', '萌萌的', '软萌的', '呆萌的', '乖巧的',
        '懂事的', '贴心的', '暖心的', '知心的', '热心的', '耐心的', '细心的', '用心的', '专心的', '静心的'
    ];

    // 名词列表（动物和植物）
    const nouns = [
        // 动物
        '熊猫', '小猫', '小狗', '兔子', '松鼠', '小鹿', '狐狸', '浣熊', '考拉', '海豚',
        '企鹅', '长颈鹿', '大象', '老虎', '狮子', '斑马', '河马', '袋鼠', '羊驼', '蝴蝶',
        '小鸟', '孔雀', '天鹅', '鹦鹉', '猫头鹰', '小马', '山羊', '绵羊', '小鸭', '小鸡',
        '仓鼠', '刺猬', '小熊', '北极熊', '海獭', '海狮', '海马', '章鱼', '水獭', '麋鹿',
        '梅花鹿', '小羊', '小牛', '小猪', '小驴', '小兔', '小鹅', '小鸽', '小燕', '小雀',
        // 植物
        '向日葵', '玫瑰', '樱花', '荷花', '菊花', '兰花', '百合', '桃花', '梅花', '牡丹',
        '茉莉', '栀子花', '杜鹃', '紫罗兰', '薰衣草', '桂花', '莲花', '郁金香', '梨花', '杏花',
        '橘子', '柠檬', '草莓', '樱桃', '苹果', '香蕉', '葡萄', '蓝莓', '桃子', '梨子',
        '榴莲', '菠萝', '西瓜', '哈密瓜', '火龙果', '椰子', '柚子', '枣子', '无花果', '石榴',
        '山竹', '荔枝', '龙眼', '杨梅', '枇杷', '柿子', '李子', '橙子', '木瓜', '芒果'
    ];

    // 随机获取形容词和名词
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

    // 组合成昵称
    return randomAdjective + randomNoun;
}

module.exports = {
    produceNickName: produceNickName
}