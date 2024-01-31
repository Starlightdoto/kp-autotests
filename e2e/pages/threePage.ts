import { Page } from 'playwright';
import {Locator} from "@playwright/test";


export class ThreePage {
    private page: Page;

    private accountIsBlockedHeaderSelector = '//*[@id="app"]/div[1]/div[1]/div[4]/div/div/div[1]/p';
    private applyButtonSelector = '//*[@id="app"]/div[1]/div[1]/div[4]/div/div/div[2]/div[4]/div[1]/button';
    private goToPersonalAccountButtonSelector = '//*[@id="app"]/div[1]/div[1]/div[4]/div/div/div[2]/div[4]/button';
    private emailInputSelector = '//*[@id="emailInput"]';
    private commentFieldSelector = '//*[@id="comment"]';
    private chatButtonSelector = '//*[@id="app"]/div[1]/header/div/div/div/div[4]/p';
    private enButtonSelector = '//*[@id="app"]/div[1]/div[1]/div[3]/div/div[2]/div[3]/div/div[1]/div[1]/div';
    private helpButtonSelector = '//*[@id="app"]/div[1]/div[1]/div[3]/div/div[2]/div[1]/p';
    private firstDropDownSelector = '//*[@id="pv_id_8_0_header_action"]';
    private firstInstructionBlockSelector = '//*[@id="pv_id_8_0_content"]/div';
    private secondDropDownSelector = '//*[@id="pv_id_8_1_header_action"]';
    private secondInstructionBlockSelector = '//*[@id="pv_id_8_1_content"]/div';
    private thirdDropDownSelector = '//*[@id="pv_id_8_2_header_action"]';
    private thirdInstructionBlockSelector = '//*[@id="pv_id_8_2_content"]/div';
    private transferRulesButtonSelector = '//*[@id="app"]/div[1]/div[1]/div[3]/div/div[2]/div[2]/p';
    private transferRulesModalSelector = 'body > div.p-dialog-mask.p-component-overlay.p-component-overlay-enter > div > div > div';
    private okButtonSelector = 'body > div.p-dialog-mask.p-component-overlay.p-component-overlay-enter > div > div > div > div.transfer-rules-modal__footer > button';
    private supportChatSelector = '//*[@id="app"]/div[1]/div[1]/div[1]';
    private chatHeaderSelector = '//*[@id="main"]/div/div/div[1]/div/div/span';
    private xButtonSelector = 'body > div.p-dialog-mask.p-component-overlay.p-component-overlay-enter > div > div > div.instruction-modal__header > i';


    constructor(page: Page) {
        this.page = page;
    }

    public get accountIsBlockedHeader(): Locator {
        return this.page.locator(this.accountIsBlockedHeaderSelector);
    }

    public get applyButton(): Locator {
        return this.page.locator(this.applyButtonSelector);
    }

    public get goToPersonalAccountButton(): Locator {
        return this.page.locator(this.goToPersonalAccountButtonSelector);
    }

    public get emailInput(): Locator {
        return this.page.locator(this.emailInputSelector);
    }

    public get commentField(): Locator {
        return this.page.locator(this.commentFieldSelector);
    }

    public get enButton(): Locator {
        return this.page.locator(this.enButtonSelector);
    }

    public get helpButton(): Locator {
        return this.page.locator(this.helpButtonSelector);
    }

    public get firstDropDown(): Locator {
        return this.page.locator(this.firstDropDownSelector);
    }

    public get secondDropDown(): Locator {
        return this.page.locator(this.secondDropDownSelector);
    }

    public get thirdDropDown(): Locator {
        return this.page.locator(this.thirdDropDownSelector);
    }

    public get firstInstructionBlock(): Locator {
        return this.page.locator(this.firstInstructionBlockSelector);
    }

    public get secondInstructionBlock(): Locator {
        return this.page.locator(this.secondInstructionBlockSelector);
    }

    public get thirdInstructionBlock(): Locator {
        return this.page.locator(this.thirdInstructionBlockSelector);
    }

    public get xButton(): Locator {
        return this.page.locator(this.xButtonSelector);
    }

    public get transferRulesButton(): Locator {
        return this.page.locator(this.transferRulesButtonSelector);
    }

    public get transferRulesModal(): Locator {
        return this.page.locator(this.transferRulesModalSelector);
    }

    public get okButton(): Locator {
        return this.page.locator(this.okButtonSelector);
    }

    public get supportChat(): Locator {
        return this.page.locator(this.supportChatSelector);
    }

    public get chatHeader(): Locator {
        return this.page.locator(this.chatHeaderSelector);
    }

}