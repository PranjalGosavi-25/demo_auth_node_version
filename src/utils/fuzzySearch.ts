import Fuse from 'fuse.js';

export function fuzzySearch<T>(
  arr: any[],
  searchKeyword: string,
  options?: Fuse.IFuseOptions<any>
): T[] {
  const fuse = new Fuse(arr, { ...options, threshold: 0.4 });

  const searchResult = fuse
    .search(searchKeyword)
    .map((result) => result.item) as T[];

  return searchResult;
}
