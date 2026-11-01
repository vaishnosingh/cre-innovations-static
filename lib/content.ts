import fs from 'fs/promises';
import path from 'path';
import { NavbarContent, FooterContent } from './types/content';
import { unstable_cache } from 'next/cache';

const readJsonFile = async (filePath: string) => {
  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Error reading or parsing JSON file at ${filePath}:`, error);
    return null;
  }
};

export async function getGlobalContent<T>(globalName: string): Promise<T> {
  const filePath = path.join(process.cwd(), 'config_manager', `${globalName}.json`);
  return readJsonFile(filePath);
}

export async function getPageContent<T>(pageName: string): Promise<T> {
  const filePath = path.join(process.cwd(), 'config_manager', `${pageName}.json`);
  return readJsonFile(filePath);
}
