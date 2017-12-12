export class CustomToastOptions {
    title: string;
    msg: string;
    showClose: boolean;
    timeout: number;
    theme: ToastThemeType;
    type: ToastType;

    constructor(title: string, msg: string);
    constructor(title: string, msg: string, type?: ToastType) {
        this.showClose = true;
        this.timeout = 5000;
        this.theme = ToastThemeType.material;
        if (!(type)) {
            this.type = ToastType.info;
        } else {
            this.type = type;
        }
    }
}

export enum ToastThemeType {
    default,
    material,
    bootstrap
}

export enum ToastType {
    default,
    info,
    success,
    wait,
    error,
    warning
}

export enum ToastPositions {
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
    'center-center'
}


