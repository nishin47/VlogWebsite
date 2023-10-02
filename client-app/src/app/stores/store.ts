import { createContext,useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";
import MarketStore from "./marketStore";
import ModalStore from "./modalStore";
import UserStore from "./userStore";

interface Store {
    activityStore: ActivityStore;
    commonStore: CommonStore;
    userStore: UserStore,
    modalStore: ModalStore,
    marketStore: MarketStore
}

export const store: Store = {
    activityStore: new ActivityStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore : new ModalStore(),
    marketStore : new MarketStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext (StoreContext);
}