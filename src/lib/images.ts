export interface MediaItem {
  name: string;
  mimeType: string;
  url: string;
  isFolder: boolean;
  id: string;
  size?: string;
}

export interface GallerySection {
  name: string;
  path: string;
  imageCount: number;
  coverImage: MediaItem | null;
  items: MediaItem[];
}

const R2_BASE_URL = 'https://pub-cebc9e73438146788fb6fd8ce134426b.r2.dev';

interface ManifestFile {
  name: string;
  path: string;
  folder: string;
  mimeType: string;
  size: number;
}

interface Manifest {
  generatedAt: string;
  totalFiles: number;
  files: ManifestFile[];
}

let manifestCache: Manifest | null = null;

function isImage(mimeType: string): boolean {
  return mimeType.startsWith('image/');
}

function isVideo(mimeType: string): boolean {
  return mimeType.startsWith('video/');
}

async function fetchManifest(): Promise<Manifest> {
  if (manifestCache) return manifestCache;
  
  const res = await fetch('/manifest.json');
  if (!res.ok) throw new Error('Failed to fetch manifest');
  manifestCache = await res.json();
  return manifestCache!;
}

function encodeR2Path(path: string): string {
  return path
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');
}

export async function getFolderMediaItems(folderPath: string): Promise<MediaItem[]> {
  const manifest = await fetchManifest();
  
  const files = manifest.files.filter((f) => {
    const normalizedFolder = f.folder.replace(/\/$/, '').replace(/\n/g, '').trim();
    const normalizedPath = folderPath.replace(/\/$/, '').trim();
    return normalizedFolder === normalizedPath;
  });
  
  return files.map((f) => ({
    name: f.name,
    mimeType: f.mimeType,
    url: `${R2_BASE_URL}/${encodeR2Path(f.path)}`,
    isFolder: false,
    id: f.path.replace(/[^a-zA-Z0-9]/g, '_'),
    size: f.size?.toString(),
  }));
}

export async function getFolderImages(path: string): Promise<MediaItem[]> {
  const items = await getFolderMediaItems(path);
  return items.filter((i) => isImage(i.mimeType));
}

export async function getFolderVideos(path: string): Promise<MediaItem[]> {
  const items = await getFolderMediaItems(path);
  return items.filter((i) => isVideo(i.mimeType));
}

export async function getAboutImages(): Promise<MediaItem[]> {
  const aboutImages = await getFolderImages('about');
  return aboutImages.slice(0, 6);
}

export async function getHeroImages(): Promise<MediaItem[]> {
  const homeImages = await getFolderImages('Home screen');
  
  const dynamicImages = homeImages.filter((i) => 
    !i.name.startsWith('b') && 
    !i.name.startsWith('logo') && 
    !i.name.startsWith('sinthanai') &&
    !i.name.startsWith('slidder') &&
    !i.name.endsWith('.mp4')
  );
  
  const staticSliderImages: MediaItem[] = [
    { name: 'Slide 2', mimeType: 'image/png', url: '/slider/slide2.png', isFolder: false, id: 'static-slide-2' },
    { name: 'Slide 4', mimeType: 'image/png', url: '/slider/slide4.png', isFolder: false, id: 'static-slide-4' },
    { name: 'Slide 6', mimeType: 'image/png', url: '/slider/slide6.png', isFolder: false, id: 'static-slide-6' },
  ];
  
  const result: MediaItem[] = [];
  let staticIdx = 0;
  let dynamicIdx = 0;
  
  for (let i = 0; i < 6; i++) {
    if (i === 1 || i === 3 || i === 5) {
      if (staticIdx < staticSliderImages.length) {
        result.push(staticSliderImages[staticIdx]);
        staticIdx++;
      }
    } else {
      if (dynamicIdx < dynamicImages.length) {
        result.push(dynamicImages[dynamicIdx]);
        dynamicIdx++;
      }
    }
  }
  
  return result.length > 0 ? result : dynamicImages.slice(0, 6);
}

export async function getBannerImages(): Promise<MediaItem[]> {
  const homeImages = await getFolderImages('Home screen');
  return homeImages.filter((i) => i.name.startsWith('b'));
}

export async function getLogoImage(): Promise<MediaItem | null> {
  const homeImages = await getFolderImages('Home screen');
  return homeImages.find((i) => i.name === 'logo-1.png') || null;
}

export async function getGallerySubFolders(): Promise<{ name: string; path: string; id: string }[]> {
  const manifest = await fetchManifest();
  
  const folderSet = new Set<string>();
  
  for (const f of manifest.files) {
    const cleanFolder = f.folder.replace(/\n/g, '').trim();
    if (cleanFolder.startsWith('gallery/')) {
      const folderName = cleanFolder.replace('gallery/', '');
      if (folderName && !folderName.includes('/')) {
        folderSet.add(folderName);
      }
    }
  }
  
  return Array.from(folderSet).map((name) => ({
    name,
    path: `gallery/${name}`,
    id: name.replace(/[^a-zA-Z0-9]/g, '_'),
  }));
}

export async function getGallerySections(): Promise<GallerySection[]> {
  const subFolders = await getGallerySubFolders();
  const sections: GallerySection[] = [];

  for (const folder of subFolders) {
    const items = await getFolderMediaItems(folder.path);
    const images = items.filter((i) => isImage(i.mimeType));
    sections.push({
      name: folder.name,
      path: folder.path,
      imageCount: images.length,
      coverImage: images[0] || null,
      items,
    });
  }

  return sections;
}

export async function getGalleryRootItems(): Promise<MediaItem[]> {
  return getFolderMediaItems('gallery');
}

export async function getAllGalleryVideos(): Promise<MediaItem[]> {
  const rootVideos = await getFolderVideos('gallery');
  const subFolders = await getGallerySubFolders();
  const subFolderVideos: MediaItem[] = [];

  for (const folder of subFolders) {
    const videos = await getFolderVideos(folder.path);
    subFolderVideos.push(...videos);
  }

  return [...rootVideos, ...subFolderVideos];
}

export async function getCommentsImages(): Promise<MediaItem[]> {
  return getFolderImages('gallery/Comments from the students');
}