import 'server-only';
import {readFileSync} from 'node:fs';
import path from 'node:path';
import {cityPresence, getCityPresence} from '@/lib/city-presence';

export type CityRestaurant = {
  index: string;
  brand: string;
  address: string;
  year: string;
};

const sourcePath = path.join(process.cwd(), '..', '..', 'danh_sach_nha_hang_aladdin_da_khai_truong_20260613.md');

function readSource() {
  return readFileSync(sourcePath, 'utf8');
}

function extractCitySection(markdown: string, heading: string) {
  const pattern = new RegExp(`### ${heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} \\([^\\n]+\\)([\\s\\S]*?)(?=\\n### |\\n## |$)`);
  return markdown.match(pattern)?.[1] ?? '';
}

function parseTableRows(section: string): CityRestaurant[] {
  return section
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('|') && !line.includes(':--') && !line.includes('Thương hiệu'))
    .map((line) => line.split('|').slice(1, -1).map((cell) => cell.trim()))
    .filter((cells) => cells.length >= 4)
    .map(([index, brand, address, year]) => ({index, brand, address, year}));
}

export function getCityRestaurants(slug: string) {
  const city = getCityPresence(slug);
  if (!city) return [];
  const markdown = readSource();
  return parseTableRows(extractCitySection(markdown, city.sourceHeading));
}

export function getCityBrandSummary(restaurants: CityRestaurant[]) {
  return Array.from(
    restaurants.reduce((summary, restaurant) => {
      const brand = restaurant.brand.replace(/ \*\(đã dừng\)\*/g, '');
      summary.set(brand, (summary.get(brand) ?? 0) + 1);
      return summary;
    }, new Map<string, number>()),
  ).map(([brand, count]) => ({brand, count}));
}

export function getCityStaticParams() {
  return cityPresence.map((city) => ({slug: city.slug}));
}
