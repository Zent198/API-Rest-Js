import fs from 'fs';
import path from 'path';
import pool from './db.js';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const runMigrations = async () => {
    try {
        console.log("⏳ Iniciando migraciones...");

        const sqlPath =path.join(__dirname, '../../migration.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        const queries = sql.split(';').filter(query => query.trim() !== '');

        for (let query of queries) {
            await pool.query(query);
        }

        console.log("✅ Tablas sincronizadas y relaciones verificadas.");
    } catch (error) {
        console.error("❌ Error en la migración:", error.message);
    }
};