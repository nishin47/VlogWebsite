import { makeAutoObservable } from "mobx"

interface Modal {
    open: boolean;
    body: JSX.Element | null;
    ccode?: {} | undefined;
    country?:boolean;
}

export default class ModalStore {

    modal: Modal = {
        open: false,
        body: null,
        ccode: 372
    }

    constructor() {
        makeAutoObservable(this)
    }

    openModal = (content: JSX.Element) => {
        this.modal.open = true;
        this.modal.body = content;
    }

    closeModal = () => {
        this.modal.open = false;
        this.modal.body = null;

    }

    openModal2 = () => {
        this.modal.open = true;

    }

    setCountry = (val: number | undefined) => {
        this.modal.ccode = val;
    }

    getCountry = () => { return this.modal.ccode; }

    closeParent = () => { this.modal.country = false; }

    openParent = () => { this.modal.country = true; }
}