import { ICity } from "./ICity";
export class City implements ICity {
    // economy= [stock, consume, production]
    constructor(private name: string, private economy: number[]) {
        this.name = name;
        this.economy = economy;
    }

    public getName() {
        return this.name;
    }

    private getStock() {
        return this.economy[0];
    }

    private getConsume() {
        return this.economy[1];
    }

    private getFactories() {
        return this.getFactories[2];
    }
    // consuming and producing are simultanously
    private consumes() {
        this.economy[0] = this.economy[0] - this.economy[1] + this.economy[2];
    }

    private setFactories(factories: number) {
        this.economy[2] = factories;
    }
}
