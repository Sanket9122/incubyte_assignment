const app = require('./app');
const { connectDB } = require('./src/config/db'); 

const PORT = process.env.PORT || 5000;

// Connect to Database and start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`[server]: Database connected. Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database. Exiting.", error);
    process.exit(1);
  });