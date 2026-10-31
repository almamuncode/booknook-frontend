import test from 'node:test';
import assert from 'node:assert/strict';
import {mergeCatalogSeeds} from '../src/lib/catalog-migration.ts';
test('catalog upgrade preserves edits, user books and previously deleted original samples',()=>{
 const saved=[{id:'1',title:'My edit',copies:1},{id:'user-book',title:'My book'}];
 const seeds=[{id:'1',title:'Original',copies:4},{id:'2',title:'Deleted original'},{id:'ol-123',title:'New title'}];
 const upgraded=mergeCatalogSeeds(saved,seeds,false);
 assert.deepEqual(upgraded,[...saved,seeds[2]]);
 assert.deepEqual(mergeCatalogSeeds(upgraded,seeds,false),upgraded);
});
test('an upgraded catalog does not resurrect a subsequently deleted imported book',()=>{
 const saved=[{id:'1',title:'My edit'}];
 assert.deepEqual(mergeCatalogSeeds(saved,[...saved,{id:'ol-123',title:'Deleted'}],true),saved);
});
