import { app } from "./app";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Champions League API is running on port ${PORT}`);
  console.log(`📖 API Documentation: http://localhost:${PORT}`);
  console.log(`🏆 Clubs endpoint: http://localhost:${PORT}/api/clubs`);
  console.log(`⚽ Players endpoint: http://localhost:${PORT}/api/players`);
});
