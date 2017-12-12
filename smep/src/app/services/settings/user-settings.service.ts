import { Input, Output, EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class UserSettingsService {
    preferredLanguageField: string = "";

    @Output()
    languageChange: EventEmitter<string> = new EventEmitter<string>();

    @Input('language')
    set preferredLanguage(language: string) {
        //TODO: store to storage mechanism
        this.preferredLanguageField = language;
        this.languageChange.emit(this.preferredLanguageField);
    }

    get preferredLanguage() {
        return this.preferredLanguageField;
    }

}