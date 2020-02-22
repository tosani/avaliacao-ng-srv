import { CryptoHelper } from './crypto.helper';

export class SecureStorage implements Storage {
    [name: string]: any;
    length: number;

    constructor(public storage: Storage, public keyCrypto: string) {
    }

    clear(): void {
        this.storage.clear();
    }

    getItem(key: string): string {
        const item = this.storage.getItem(key);
        return CryptoHelper.decrypt(item, this.keyCrypto);
    }

    key(index: number): string {
        return this.storage.key(index);
    }
    removeItem(key: string): void {
        return this.storage.removeItem(key);
    }
    setItem(key: string, value: string): void {
        this.storage.setItem(key, CryptoHelper.encrypt(value, this.keyCrypto));
    }
}