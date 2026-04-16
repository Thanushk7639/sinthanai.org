export interface GDIFile {
  kind?: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime?: string;
  fileExtension?: string;
  id: string;
  driveId: string;
  link: string | null;
}

export interface GDIListResponse {
  nextPageToken: string | null;
  curPageIndex: number;
  data: {
    files: GDIFile[];
  };
}

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

const GDI_API = '/api/gdi';
const GDI_PUBLIC_URL = process.env.NEXT_PUBLIC_GDI_URL || '';

function isImage(mimeType: string): boolean {
  return mimeType.startsWith('image/');
}

function isVideo(mimeType: string): boolean {
  return mimeType.startsWith('video/');
}

function isFolder(mimeType: string): boolean {
  return mimeType === 'application/vnd.google-apps.folder';
}

function isJunk(mimeType: string, name: string): boolean {
  if (mimeType === 'application/x-partial-download') return true;
  if (name.endsWith('.crdownload')) return true;
  return false;
}

function toMediaItem(file: GDIFile): MediaItem {
  let url = '';
  if (file.link && GDI_PUBLIC_URL) {
    url = `${GDI_PUBLIC_URL}${file.link}&inline=true`;
  }
  return {
    name: file.name,
    mimeType: file.mimeType,
    url,
    isFolder: isFolder(file.mimeType),
    id: file.id,
    size: file.size,
  };
}

async function fetchFolder(path: string): Promise<GDIFile[]> {
  const res = await fetch(GDI_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'list', path }),
  });

  if (!res.ok) return [];
  const data: GDIListResponse = await res.json();
  return data.data?.files || [];
}

export async function getFolderMediaItems(path: string): Promise<MediaItem[]> {
  const files = await fetchFolder(path);
  return files
    .filter((f) => !isFolder(f.mimeType))
    .filter((f) => !isJunk(f.mimeType, f.name))
    .map(toMediaItem);
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
  const allImages = await getFolderImages('gallery/Spoken English Awarding Ceremony');
  return allImages.slice(0, 6);
}

export async function getHeroImages(): Promise<MediaItem[]> {
  const homeImages = await getFolderImages('Home screen');
  const heroImages = homeImages.filter((i) => !i.name.startsWith('b') && i.name !== 'logo-1.png' && i.name !== 'sinthanai.png');
  
  const staticSliderImages: MediaItem[] = [
    { name: 'Slide 2', mimeType: 'image/png', url: '/slider/slide2.png', isFolder: false, id: 'static-slide-2' },
    { name: 'Slide 4', mimeType: 'image/png', url: '/slider/slide4.png', isFolder: false, id: 'static-slide-4' },
    { name: 'Slide 6', mimeType: 'image/png', url: '/slider/slide6.png', isFolder: false, id: 'static-slide-6' },
  ];
  
  const result: MediaItem[] = [];
  for (let i = 0; i < 6; i++) {
    if (i === 1 || i === 3 || i === 5) {
      const staticIdx = i === 1 ? 0 : i === 3 ? 1 : 2;
      result.push(staticSliderImages[staticIdx]);
    } else if (heroImages[i]) {
      result.push(heroImages[i]);
    }
  }
  
  return result.length > 0 ? result : heroImages.slice(0, 6);
}

export async function getBannerImages(): Promise<MediaItem[]> {
  const images = await getFolderImages('Home screen');
  return images.filter((i) => i.name.startsWith('b'));
}

export async function getLogoImage(): Promise<MediaItem | null> {
  const images = await getFolderImages('Home screen');
  return images.find((i) => i.name === 'logo-1.png') || null;
}

export async function getGallerySubFolders(): Promise<{ name: string; path: string; id: string }[]> {
  const files = await fetchFolder('gallery');
  return files
    .filter((f) => isFolder(f.mimeType))
    .map((f) => ({ name: f.name, path: `gallery/${f.name}`, id: f.id }));
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

export async function searchFiles(query: string): Promise<MediaItem[]> {
  const res = await fetch(GDI_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'search', q: query }),
  });

  if (!res.ok) return [];
  const data: GDIListResponse = await res.json();
  return data.data?.files
    ?.filter((f) => !isFolder(f.mimeType) && f.link)
    .map(toMediaItem) || [];
}