import { Injectable } from '@angular/core';
import *  as Crypto from 'crypto-ts';

export class CryptoHelper {
    static encrypt(value: string, key: string): string {
        if (!value || !key) {
            return value;
        }
        return Crypto.AES.encrypt(value, key).toString();
    }

    static decrypt(value: string, key: string): string {
        if (!value || !key) {
            return value;
        }
        return Crypto.AES.decrypt(value, key).toString(Crypto.enc.Utf8);
    }
}