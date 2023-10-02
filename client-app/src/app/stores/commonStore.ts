import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/serverError";

export default class CommonStore {
    error: ServerError | null = null;
    token: string | null = window.localStorage.getItem('jwt');
    init: string | null = window.localStorage.getItem('nieu');
    appLoaded = false;
    initialCounter=1;


    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.token,
            token => {
                if (token) {
                    window.localStorage.setItem('jwt', token)
                }
                else {
                    window.localStorage.removeItem('jwt');
                }
            }
        )

        reaction(
            () => this.init,
            init => {
                if (init) {
                    window.localStorage.setItem('nieu', init)
                }
                else {
                    window.localStorage.removeItem('nieu');
                }
            }
        )
    }

    addCounter= (() => {
        if(this.initialCounter <50)
        this.initialCounter=this.initialCounter+1;
    })

    minusCounter= (() => {
        if(this.initialCounter!==1)
        this.initialCounter=this.initialCounter-1;
    })

    setServerError = (error: ServerError) => {
        this.error = error;
    }

    setToken = (token: string | null) => {
        this.token = token;
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }
}