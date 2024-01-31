import { Page } from 'playwright';


export class ChiefpayPage {
    private page: Page;

    private transferCancelledText = '//*[@id="app"]/div[1]/main/div[1]/h1';
    private goToPersonalAccountButton = '//*[@id="app"]/div[1]/main/div[1]/button';
    private languageButton = '//*[@id="app"]/div[1]/header/div/div/div/div[1]/p';
    private instructionButton = '//*[@id="app"]/div[1]/header/div/div/div/div[2]/p';
    private transferRulesButton = '//*[@id="app"]/div[1]/header/div/div/div/div[3]/p';
    private chatButton = '//*[@id="app"]/div[1]/header/div/div/div/div[4]/p';

    constructor(page: Page) {
        this.page = page;
    }
}