/*
 * Copyright 2019 LABOR.digital
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Last modified: 2019.01.25 at 18:37
 */
import {isBrowser} from '../Environment/isBrowser';
import {EventBus} from '../Events/EventBus';
import {HelferleinEventList} from '../Events/HelferleinEventList';
import {asArray} from '../FormatAndConvert/asArray';
import {PlainObject} from '../Interfaces/PlainObject';
import {forEach} from '../Lists/forEach';
import {map} from '../Lists/map';
import {isEmpty} from '../Types/isEmpty';
import {isUndefined} from '../Types/isUndefined';

let knownHash = '';
let hashCache = {};

/**
 * This helper is used to set an anchor part of the url
 * to a list of key value pairs like: #/key/value/key2/value2
 */
export class UrlHash
{
    /**
     * Checks if a given key is set in the current anchor tag
     * @param key
     */
    static has(key: string): boolean
    {
        const hash = UrlHash.getAll();
        return !isUndefined(hash[key]);
    }
    
    /**
     * Returns the value for a given key
     * @param key The key to retrieve the value for
     * @param defaultValue Optional value which is returned if the given key does not exist
     */
    static get(key: string, defaultValue?: string | null): string | null | undefined
    {
        const hash = UrlHash.getAll();
        return isUndefined(hash[key]) ? defaultValue : hash[key];
    }
    
    /**
     * Sets a single key value pair
     * @param key
     * @param value
     */
    static set(key: string, value: string | number | null): void
    {
        const hash = UrlHash.getAll();
        if (isEmpty(value)) {
            delete hash[key];
        } else {
            hash[key] = value;
        }
        UrlHash.update(hash);
    }
    
    /**
     * Sets multiple values using only a single change request
     * @param values
     */
    static setMultiple(values: PlainObject): void
    {
        const hash = UrlHash.getAll();
        forEach(values, (v, k) => {
            if (isEmpty(v)) {
                delete hash[k];
                return;
            }
            hash[k] = v;
        });
        UrlHash.update(hash);
    }
    
    /**
     * Returns all key value pairs that are currently in the hash
     */
    static getAll(): PlainObject
    {
        return JSON.parse(JSON.stringify(UrlHash.parseFromUrl()));
    }
    
    /**
     * Parses the current hash value into an object
     * The hash is expected to look like #/key/value/key2/value2
     */
    protected static parseFromUrl(): PlainObject
    {
        if (!isBrowser()) {
            return {};
        }
        if (window.location.hash === knownHash) {
            return hashCache;
        }
        if (window.location.hash === '') {
            return {};
        }
        if (window.location.hash.indexOf('/') === -1) {
            return {};
        }
        knownHash = window.location.hash;
        const hash = window.location.hash.replace(/^[#\/]*/, '');
        const hashParts = hash.split('/');
        const parsed = {};
        let key = null;
        forEach(hashParts, e => {
            e = decodeURIComponent(e);
            if (key !== null) {
                if (parseInt(e) + '' === e) {
                    e = parseInt(e);
                }
                parsed[key] = e;
                key = null;
                return;
            }
            key = e;
        });
        return hashCache = parsed;
    }
    
    /**
     * Converts the given hash object into a string representation valid for the url
     * @param hash
     */
    protected static update(hash: PlainObject): void
    {
        if (!isBrowser()) {
            return;
        }
        if (isEmpty(hash)) {
            EventBus.emit(HelferleinEventList.EVENT_HASH_UPDATE, {new: ''});
            window.location.hash = '/';
            return;
        }
        const list = asArray(map(hash, (v, k) => encodeURIComponent(k + '') + '/' + encodeURIComponent(v)));
        const hashString = '#/' + list.join('/');
        EventBus.emit(HelferleinEventList.EVENT_HASH_UPDATE, {new: hashString});
        window.location.hash = hashString;
    }
}