/**
 *
 * Storage Library
 * @desc
 * @see https://github.com/typicode/lowdb
 *
 */

import {} from '../interfaces/Storage';

const _ = require('lodash');

const lodashId = require('lodash-id');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const STORAGE_PATH = '../storage/';

const adapter = new FileSync(`${STORAGE_PATH}db.json`);
const db = low(adapter);
const crypto = require('crypto');

db._.mixin(lodashId);

const PURGE_TIME: number = 1; // month

// change to class like spotify
export function getHash(): string {

  initHash();
  const hash: string = crypto.randomBytes(6).toString('hex');

  return hash;

}

function initHash(): void {

  const hasHash: boolean = db.has('hash').value();

  if (!hasHash) {

    db.set('bulk', []).write();

  }

}

/**
 *
 * Init Bulk
k* @desc make a bulk array if necessary and create initial data for a bulk index
 *
 */
export function initBulk(data: InitData): string {

  const now: number = Date.now();
  const hasBulk: boolean = db.has('bulk').value();

  if (!hasBulk) {

    db.set('bulk', []).write();

  }

  const meta = {
    active: true,
    created_at: now,
    indexOnly: false,
    updated_at: now,
  };

  const bulkData = _.merge(data, meta);

  const bulk = db
    .get('bulk')
    .insert(bulkData)
    .write();

  return bulk.id;

}

export function initCustom(data: CustomInitData): string {

  const now: number = Date.now();

  const meta = {
    active: false,
    created_at: now,
    indexOnly: true,
    total: 0,
    updated_at: now,
  };

  const bulkData = _.merge(data, meta);

  const bulk = db
    .get('bulk')
    .insert(bulkData)
    .write();

  return bulk.id;

}

/**
 *
 * Update Bulk
 * @desc update data for a bulk index
 *
 */
export function updateBulk(id: string, data: UpdateData): Record {

  return update(id, data, 'bulk');

}

/**
 *
 * Complete Bulk
 * @desc finish off a bulk index and mark as not active
 *
 */
export function completeBulk(id: string, data: CompleteData): Record {

  return update(id, data, 'bulk');

}

/**
 *
 * Get Bulk Progress
 * @desc query based on the ID passed in find the index and grab the data
 *
 */
export function getBulkProgress(id: string): any {

  const record: Record = db.get('bulk')
    .find({ id })
    .value();

  return record;

}

/**
 *
 * Get Actives
 * @desc grab the active bulk indexes
 *
 */
export function getActives(): Record[] {

  const records: Record[] = db.get('bulk')
    .filter({ active: true })
    .sortBy('created_at')
    .value();

  return cleanActives(records);

}

/**
 *
 * Get Latest Bulk
 * @desc grab the last three bulk index stats
 */
export function getLatestBulk(): Record[] {

  const records: Record[] = db.get('bulk')
    .sortBy('updated_at')
    .reverse()
    .filter({ indexOnly: false })
    .take(3)
    .value();

  return cleanActives(records);

}

/**
 *
 * Record Bump
 * @desc set a record of when we create a new index
 *
 */
export function recordBump(data: BumpData): string {

  const now: number = Date.now();
  const hasIndices: boolean = db.has('indices').value();

  if (!hasIndices) {

    db.set('indices', []).write();

  }

  const meta = {
    created_at: now,
    updated_at: now,
  };

  const bumpData = _.merge(data, meta);

  const bump = db
    .get('indices')
    .insert(bumpData)
    .write();

  return bump.id;

}

export function recordSwap(id: string, data: SwapData): void {

  update(id, data, 'indices');

}

/**
 *
 * Add XML
 * @desc push the xml ingested resource into an array with the meta data
 * to the existing record
 *
 */
export function addXml(id: string, name: string, headers: XMLResponseHeaders, documents: number) {

  const now: number = Date.now();
  const lastModified: string = headers['last-modified'] || '-1';
  const sizeMb: number = +headers['content-length'] / 1000000.0 || -1;

  const xmlData = {
    documents,
    lastModified,
    name,
    sizeMb,
  };

  const record: Record = db.get('bulk')
    .find({ id })
    .value();

  record.updated_at = now;

  if (!Object.prototype.hasOwnProperty.call(record, 'xmlData')) {

    record.xmlData = [];

  }

  record.xmlData.push(xmlData);

  db.get('bulk')
    .find({ id })
    .assign(record)
    .write();

}

/**
 *
 * Add CMS
 * @desc push the cms ingested resource into the cms array and account for
 * additions to an existing type that has been ingested already
 *
 */
export function addCms(id: string, name: string, documents: number) {

  const now: number = Date.now();

  const cmsData = {
    documents,
    name,
  };

  const record: Record = db.get('bulk')
    .find({ id })
    .value();

  record.updated_at = now;

  if (!Object.prototype.hasOwnProperty.call(record, 'cmsData')) {

    record.cmsData = [];

  }

  let added = false;
  for (const cms of record.cmsData) {

    if (cms.name === name) {

      cms.documents += documents;
      added = true;

    }

  }

  if (!added) {

    record.cmsData.push(cmsData);

  }

  db.get('bulk')
    .find({ id })
    .assign(record)
    .write();

}

/**
 *
 * Update
 * @access private
 * @desc update a record and update the timestamp
 *
 */
function update(id: string, data: any, type: string): Record {

  cleanRecords(type);

  const meta = {
    updated_at: Date.now(),
  };

  const updateData = _.merge(data, meta);

  const record: Record = db.get(type)
    .find({ id })
    .assign(updateData)
    .write();

  return record;

}

/**
 *
 * Clean Records
 * @desc we only want to keep so many records, so on any update clean
 * out old records as well
 *
 */
function cleanRecords(type: string) {

  const purgeTime: number = getPurgeTime();

  const record: Record = db.get(type)
    .remove((record: Record) => record.created_at <= purgeTime)
    .write();

}

/**
 *
 * Clean Actives
 * @desc make sure actives are marked as non active if over a certain
 * threshold of time
 *
 */
function cleanActives(records: Record[]): Record[] {

  for (let i = records.length - 1; i >= 0; i--) {

    if (records[i]) {

      const record = records[i];
      const now: number = Date.now();
      const elapsedMs: number = now - record.updated_at;
      const id: string = record.id;
      if (elapsedMs > ACTIVE_HOURS) {

        db.get('bulk')
          .find({ id })
          .assign({ active: false })
          .write();

        records.splice(i, 1);

      }

    }

  }

  return records;

}

/**
 *
 * Get Purge Time
 * @desc grab the purge time set in epoch format
 * @see https://stackoverflow.com/questions/24049164/javascript-get-timestamp-of-1-month-ago
 *
 */
function getPurgeTime(): number {

  const d: Date = new Date();

  d.setMonth(d.getMonth() - PURGE_TIME);
  d.setHours(0, 0, 0);
  d.setMilliseconds(0);

  // Get the time value in milliseconds and convert to seconds
  const purgeTime: number = +d / 1000 | 0;

  return purgeTime;

}
