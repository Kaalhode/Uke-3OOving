import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync, writeFileSync, existsSync } from 'fs';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export const savedsessionpath = path.join(__dirname,'sessions.json');

export function createSessionId() {
    return Math.random().toString(36).substring(2, 18);
}

export function readSessionData() {
    if (!existsSync(savedsessionpath)) {
        writeFileSync(savedsessionpath, JSON.stringify({}));
        return {};
    }
    try {
        const fileContent = readFileSync(savedsessionpath, 'utf-8');
        return fileContent ? JSON.parse(fileContent) : {};
    } catch (error) {
        console.error('Error reading or parsing sessions.json:', error);
        return {};
    }
}
