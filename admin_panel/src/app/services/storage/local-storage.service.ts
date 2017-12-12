import { Injectable } from "@angular/core";
import { Store } from "./store.service";

import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class LocalStorageStore implements Store {

    constructor(private localStorageService: LocalStorageService) { }

    public containsKey(key: string): boolean {
        if (this.localStorageService.get(key)) {
            return true;
        }
        return false;
    }

    public get<T>(key: string): T {
        return <T> this.localStorageService.get(key);
    }


    public put<T>(key: string, value: T): void {
        this.localStorageService.set(key, value);
    }


    public remove(key: string): void {
        this.localStorageService.remove(key);
    }

    public clear(): void {
        this.localStorageService.remove();
    }

    public keys(): string[] {
        let keys: string[] = [];
        for (var i = 0; i < this.localStorageService.keys.length; i++) {
            keys.push(this.localStorageService.keys[i]);
        }
        return keys;
    }

}