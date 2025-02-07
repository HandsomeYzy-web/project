export const getTime = () => {
    const hour = new Date().getHours();
    const greetings = [
        { end: 6, message: '凌晨好！' },
        { end: 9, message: '早上好！' },
        { end: 12, message: '上午好！' },
        { end: 14, message: '中午好！' },
        { end: 17, message: '下午好！' },
        { end: 19, message: '傍晚好！' },
        { end: 22, message: '晚上好！' }
    ];

    for (let i = 0; i < greetings.length; i++) {
        if (hour < greetings[i].end) {
            return greetings[i].message;
        }
    }
    return '晚上好！';
};