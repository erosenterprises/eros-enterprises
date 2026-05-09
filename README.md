# Eros Enterprises

## Local PostgreSQL Setup (Windows)

This app is designed to use PostgreSQL on `localhost:5432`. Prisma expects:

```text
Host: localhost
Port: 5432
Database: eros_enterprises
Shadow database: eros_enterprises_shadow
```

If your local `.env` points at `localhost:51214`, Prisma will fail unless a PostgreSQL server is actually listening on that port.

### Option 1: Native PostgreSQL for Windows

1. Install PostgreSQL for Windows.

2. Find and start the PostgreSQL service:

```powershell
Get-Service | Where-Object { $_.Name -match "postgres" -or $_.DisplayName -match "postgres" } | Select-Object Status, Name, DisplayName
Start-Service -Name postgresql-x64-16
```

If your installed service uses a different name, replace `postgresql-x64-16` with the name returned by the first command.

3. Create the databases with `psql`:

```powershell
psql -U postgres -h localhost -p 5432 -d postgres -c "CREATE DATABASE eros_enterprises;"
psql -U postgres -h localhost -p 5432 -d postgres -c "CREATE DATABASE eros_enterprises_shadow;"
```

If the databases already exist, PostgreSQL will report that and you can continue.

4. Copy `.env.example` to `.env` and set your local PostgreSQL password:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/eros_enterprises?schema=public"
SHADOW_DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/eros_enterprises_shadow?schema=public"
```

If you are correcting an existing `.env`, these PowerShell commands update the connection strings in place:

```powershell
$envPath = ".env"
$databaseUrl = 'DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/eros_enterprises?schema=public"'
$shadowDatabaseUrl = 'SHADOW_DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/eros_enterprises_shadow?schema=public"'
$lines = Get-Content $envPath
$lines = $lines | Where-Object { $_ -notmatch '^DATABASE_URL=' -and $_ -notmatch '^SHADOW_DATABASE_URL=' }
$lines += $databaseUrl
$lines += $shadowDatabaseUrl
Set-Content -Path $envPath -Value $lines
```

### Option 2: Docker Compose

If Docker Desktop is available, this repository now includes [`docker-compose.yml`](C:/Users/zoomn/OneDrive/Dokumen/Eros Enterprises SaaS/eros-enterprises/docker-compose.yml) and an init script for the shadow database.

1. Start PostgreSQL:

```powershell
docker compose up -d
```

2. Use the matching `.env` values:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/eros_enterprises?schema=public"
SHADOW_DATABASE_URL="postgresql://postgres:postgres@localhost:5432/eros_enterprises_shadow?schema=public"
```

### Prisma Commands

Run the Prisma workflow after PostgreSQL is reachable:

```powershell
npm run prisma:migrate:dev
npm run prisma:generate
npm run dev
```

If `npm run prisma:migrate:dev` still fails immediately on Windows with a Prisma engine `EPERM` error, run the same command from a normal local PowerShell session outside restricted sandboxes.

## Production

Production deployment notes, PM2 config, Nginx guidance, PostgreSQL setup, and backup/checklist instructions live in `docs/production-deployment.md`.
