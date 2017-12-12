import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

/**
 * Service helps communicate between the ToastComponent and AppComponent.
 */
@Injectable()
export class ToastCommunicationService {
    // Observable string sources
    private positionSource: Subject<string>  = new Subject<string>();

    // Observable string streams
    public position$ = this.positionSource.asObservable();

    public setPosition(position: any) {
        this.positionSource.next(position);
    }
}
