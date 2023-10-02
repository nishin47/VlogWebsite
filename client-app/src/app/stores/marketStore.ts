import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Market } from "../models/market";
import { format } from 'date-fns';

export default class MarketStore {
    marketRegistry = new Map<string, Market>();
    loadingInitial = true;
    selectedMarket: Market | undefined = undefined;
    


    constructor() {
        makeAutoObservable(this)
    }

    get marketArray() {
        return Array.from(this.marketRegistry.values());
    }

    get groupedMarkets() {
        return Object.entries(
            this.marketArray.reduce((markets, market) => {   
                markets[market.id]=markets[market.id] ?[...markets[market.id],market]: [market];            
                return markets;
            },{} as {[key: string]: Market[]})
        )
    }


    loadMarkets = async () => {
        this.loadingInitial = true;
        try {
            const markets = await agent.Markets.list();
            markets.forEach((market: Market) => {
                this.setMarket(market);
            })
            this.setLoadingInitial(false);

        } catch (error) {
         
            this.setLoadingInitial(false);
        }

    }


    loadMarket = async (id: string) =>{
        let market= this.getMarket(id);
        if(market){
            this.selectedMarket = market;
            return market;
        }
        else {
            this.loadingInitial = true;
            try{
                market =  await agent.Markets.details(id);
                this.setMarket(market!);
                runInAction(() =>{
                   this.selectedMarket=market;
                })                
                this.setLoadingInitial(false);
                return market;
            }
            catch(error){
             
                this.setLoadingInitial(false);
            }
        }
   }

   private getMarket = (id: string) => {
    return this.marketRegistry.get(id);
}


    private setMarket = (market: Market) => {

        this.marketRegistry.set(market.id, market);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

}