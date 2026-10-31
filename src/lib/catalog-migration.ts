// Only newly introduced catalog records are added during the one-time upgrade.
// Existing samples that the reader deleted stay deleted; saved edits stay intact.
export function mergeCatalogSeeds<T extends {id:string}>(saved:T[],seeds:T[],alreadyUpgraded:boolean):T[] {
 if(alreadyUpgraded)return saved;
 const ids=new Set(saved.map(book=>book.id));
 return [...saved,...seeds.filter(book=>book.id.startsWith('ol-')&&!ids.has(book.id))];
}
