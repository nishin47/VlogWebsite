import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { LoginValues, User, UserFormValues } from "../models/user";
import { store } from "./store";
import { router } from "../router/Route";


export default class UserStore {
    user: User | null = null;
    isLogin = false;
    otp = '';
    messagetype: string = '';
    headermessage: string = '';
    content: string = '';
    isloaded = true;
    refreshTokenTimeout: any;

    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {

        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            router.navigate('/');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }


    changepassword = async (creds: LoginValues) => {

        try {
            this.initmessage();
            this.isloaded = false;
            const user = await agent.Account.changepassword(creds);
            this.isloaded = true;
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            router.navigate('/');

        } catch (error: any | string[]) {
            this.isloaded = true;

            if (error) {

                this.messagetype = 'negative';
                this.headermessage = error.length! > 0 ? error[0]! : "Something went wrong!";
                this.content = error[0]!;
                const timer = setTimeout(() => { this.initmessage() }, 5000); // Clear after 5 seconds

                return () => clearTimeout(timer); // Clean up the timer if component unmounts

            }
            throw error;
        }
    }




    login_new = async (creds: LoginValues) => {



        try {
            this.initmessage();
            const user = await agent.Account.login_new(creds);
            this.isloaded = true;
            store.commonStore.setToken(user.token);
            this.startRefreshTokenTimer(user);
            runInAction(() => this.user = user);
            router.navigate('/');

        } catch (error: any | string[]) {
            this.isloaded = true;

            if (error) {

                this.messagetype = 'negative';
                this.headermessage = error.length! > 0 ? error[0]! : "Something went wrong!";
                this.content = error[0]!;
                // const timer = setTimeout(() => { this.initmessage() }, 5000); // Clear after 5 seconds

                // return () => clearTimeout(timer); // Clean up the timer if component unmounts

            }
            throw error;
        }
    }

    forgotpassword = async (creds: LoginValues) => {


        try {


            const user = await agent.Account.forgotpassword(creds);

            runInAction(() => {


                this.messagetype = 'success';
                this.headermessage = 'We have e-mailed your password reset link!'
                this.content = 'Please check your email :  ' + user.email + 'and follow the instructions in the email to reset your password.';

                const timer = setTimeout(() => { this.initmessage() }, 5000); // Clear after 5 seconds
                return () => clearTimeout(timer); // Clean up the timer if component unmounts

            }

            );

        } catch (error) {
            throw error;
        }
    }
    login_otp = async () => {

        try {

            const loginform: LoginValues = {
                email: this.user!.email,
                password: '',
                firsttime: true,
                otp: this.otp
            }

            const user = await agent.Account.login_new(loginform);
            store.commonStore.setToken(user.token);
            runInAction(() => {
                this.user = user;
                this.isLogin = false;
            }
            );
            router.navigate('/');


        } catch (error) {
            throw error;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        router.navigate('/');
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => this.user = user);
            this.startRefreshTokenTimer(user);

        } catch (error) {
            console.log(error);
        }
    }

    initmessage = () => {
        this.headermessage = '';
        this.content = ''
        this.messagetype = '';
    }



    register = async (creds: UserFormValues) => {
        try {
            this.initmessage();
            const user = await agent.Account.register(creds);
            runInAction(() => {
                if (user) {
                    this.user = user;

                    this.messagetype = 'success';
                    this.headermessage = 'Your user registration was successful'
                    this.content = 'A verification email has been sent to ' + user.email + '.';
                    const timer = setTimeout(() => {
                        this.initmessage();
                        router.navigate('/login');
                    }, 5000); // Clear after 5 seconds

                    return () => clearTimeout(timer); // Clean up the timer if component unmounts

                }
            }

            );
        } catch (error) {
            throw error;
        }

    }

    refreshToken = async () => {
        this.stopRefreshTokenTimer();
        try {
            const user = await agent.Account.refreshToken();
            runInAction(() => this.user = user);
            store.commonStore.setToken(user.token);
            this.startRefreshTokenTimer(user);

        }
        catch (error) {
            console.log(error);
        }
    }

    private startRefreshTokenTimer(user: User) {

        const jwtToken = JSON.parse(atob(user.token.split('.')[1]));
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (60 * 1000);
        this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }
}