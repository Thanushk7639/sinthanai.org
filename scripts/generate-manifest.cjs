#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ASSETS_DIR = '/home/thanush/Downloads/sinthanai fountation';
const OUTPUT_FILE = path.join(__dirname, '..', 'public', 'manifest.json');

function getMimeType(filename) {
  const ext = path.extname(filename).toLowerCase();
  const mimeTypes = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
  };
  return mimeTypes[ext] || 'application/octet-stream';
}

function walkDir(dir, basePath = '') {
  const results = [];
  
  if (!fs.existsSync(dir)) {
    console.log(`Directory not found: ${dir}`);
    return results;
  }
  
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      const folderName = item;
      const subItems = walkDir(fullPath, path.join(basePath, folderName));
      results.push(...subItems);
    } else {
      const ext = path.extname(item).toLowerCase();
      if (['.png', '.jpg', '.jpeg', '.webp', '.gif', '.mp4', '.webm'].includes(ext)) {
        results.push({
          name: item,
          path: basePath ? `${basePath}/${item}` : item,
          folder: basePath,
          mimeType: getMimeType(item),
          size: stat.size,
        });
      }
    }
  }
  
  return results;
}

function getFolders(manifest) {
  const folders = new Map();
  
  for (const item of manifest) {
    if (item.folder) {
      if (!folders.has(item.folder)) {
        folders.set(item.folder, []);
      }
      folders.get(item.folder).push(item);
    }
  }
  
  return folders;
}

console.log('Scanning assets directory...');

const manifest = [];

const homeScreenPath = path.join(ASSETS_DIR, 'Home screen');
if (fs.existsSync(homeScreenPath)) {
  const homeItems = walkDir(homeScreenPath, 'Home screen');
  manifest.push(...homeItems);
  console.log(`Found ${homeItems.length} items in Home screen`);
}

const aboutPath = path.join(ASSETS_DIR, 'about');
if (fs.existsSync(aboutPath)) {
  const aboutItems = walkDir(aboutPath, 'about');
  manifest.push(...aboutItems);
  console.log(`Found ${aboutItems.length} items in about`);
}

const galleryPath = path.join(ASSETS_DIR, 'gallery');
if (fs.existsSync(galleryPath)) {
  const galleryDirs = fs.readdirSync(galleryPath);
  
  for (const dir of galleryDirs) {
    const dirPath = path.join(galleryPath, dir);
    const stat = fs.statSync(dirPath);
    
    if (stat.isDirectory()) {
      const items = walkDir(dirPath, path.join('gallery', dir));
      manifest.push(...items);
      console.log(`Found ${items.length} items in gallery/${dir.trim()}`);
    } else if (dir.endsWith('.mp4') || dir.endsWith('.webm')) {
      manifest.push({
        name: dir,
        path: `gallery/${dir}`,
        folder: 'gallery',
        mimeType: getMimeType(dir),
        size: stat.size,
      });
    }
  }
}

const output = {
  generatedAt: new Date().toISOString(),
  totalFiles: manifest.length,
  files: manifest,
  folders: Object.fromEntries(getFolders(manifest)),
};

const outputDir = path.dirname(OUTPUT_FILE);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));
console.log(`\nManifest generated: ${OUTPUT_FILE}`);
console.log(`Total files: ${manifest.length}`);

const folders = getFolders(manifest);
console.log(`\nFolders found: ${folders.size}`);
for (const [folder, items] of folders) {
  console.log(`  - ${folder.trim()}: ${items.length} files`);
}