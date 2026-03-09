require('dotenv').config()

const app = require('./app');
const AppDataSource = require('./config/database');
const PORT = process.env.PORT || 4000;

AppDataSource.initialize().then(()=>{
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  })
  });
