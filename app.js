const express = require('express');
const app = express();
const port = 3000;

// 定义路由
app.get('/', (req, res) => {
  res.send('Hello NodeJS!');
});

// 监听端口
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
