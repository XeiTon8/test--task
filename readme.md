# WB Tariffs Service
This app handles:
- Fetching data with external API
- Storing the fetched data in PostgreSQL
- Updating Google Sheets with it
- Scheduling automatic updates using cron

The app is running entirely in Docker containers.

## Tech Stack
- Node.js
- TypeScript
- Knex.js
- PostgreSQL
- Google Sheets API
- Docker & Docker Compose
- Zod (validation)

---

## Getting Started

### 1 Clone the repository

```bash
git clone <repo_url>
cd test--task
```
### 2 Create .env file
Create a .env file in the root folder based on the example provided in .env.example. Include API key and Google Spreadsheets credentials.

### 3 Run Docker
Use Docker commands:
```bash
docker compose down -v
docker compose build --no-cache
docker compose up
```

## How to check the app's working
1. Create the spreadsheet manually
2. Make sure the first sheet's named ```stocks_coefs```
3. Share it with your service account email

After running the app, data should appear automatically.
Additionally, feel free to check out logs and look for "DB result" query, which should indicate success of populating the DB with rows.