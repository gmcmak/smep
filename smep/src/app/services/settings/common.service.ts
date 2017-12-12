import { Injectable, Inject } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class CommonService {
    private static readonly DEFAULT_LANGUAGE: string = "en";
    private static readonly DEFAULT_LANGUAGE_NAME: string = "English";

    languageOptions = {
        'en': 'English',
        'si': 'සිංහල',
        'ta': 'தமிழ்',
    };

    educationMenu: Array<string> = ['General', 'Professional'];
    
    languages: Array<string> = ['en','si','ta'];      

    private selectedLang: string = CommonService.DEFAULT_LANGUAGE;
    private selectedLangName: String = CommonService.DEFAULT_LANGUAGE_NAME;  

    constructor(private translate: TranslateService) {
        this.translate.addLangs(this.languages);
        // this language will be used as a fallback when a translation isn't found in the current language
        this.translate.setDefaultLang(CommonService.DEFAULT_LANGUAGE);
        // the lang to use, if the lang isn't available, it will use the current loader to get them
        this.translate.use(this.selectedLang);

        //TODO : get user settings and use preferredLanguage to initialize translate service

        let browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|si|ta/) ? browserLang : this.selectedLang);

     }

 

    private changeLanguage(lang) {
        this.selectedLang = lang;
        //TODO : set user settings
        this.translate.use(this.selectedLang);
        this.selectedLangName = this.languageOptions[lang];
    }

    
}