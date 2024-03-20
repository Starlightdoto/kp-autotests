import { Page } from 'playwright';
import {Locator} from "@playwright/test";


export class ChiefpayPage {
    private page: Page;

    private languageButton = '//*[@id="app"]/div[1]/header/div/div/div/div[1]/p';
    private instructionButton = '//*[@id="app"]/div[1]/header/div/div/div/div[2]/p';


    private amountSelector = '';
    private timerRawSelector = '';
    private phoneNumberSelector = '';
    private transferredButtonSelector = '';
    private cancelButtonSelector = '';
    private howToTransferButtonSelector = '';
    private transferInstructionModalSelector = '';
    private gotItButtonInTransferInstructionSelector = '';
    private xButtonInTransferInstructionSelector = '';
    private transferRulesButtonSelector = '';
    private transferRulesModalSelector = '';
    private gotItButtonInTransferRulesSelector = '';
    private xButtonInTransferRulesSelector = '';
    private chatButtonSelector = '';
    private chatModalSelector = '';
    private submitButtonInChatModalSelector = '';
    private cancelButtonInChatModalSelector = '';
    private commentInputInChatModalSelector = '';
    private emailInputInChatModalSelector = '';
    public attachFilesZoneInChatModalSelector = '';
    private requestHasBeenSentModalSelector = '';
    private okButtonInRequestHasBeenSentModalSelector = '';
    private cancelModalSelector = '';
    private yesButtonInCancelModalSelector = '';
    private noButtonInCancelModalSelector = '';
    private iAgreeCheckboxSelector = '';
    private transferRulesLinkSelector = '';
    private changeLocaleButtonSelector = '';
    private enButtonSelector = '';
    private ruButtonSelector = '';
    private mainRuTextSelector = '';
    private mainEnTextSelector = '';
    private transferredPageHeaderTextSelector = '';
    private transferredPageTimerRawSelector = '';
    private emailInputOnTransferredPageSelector = '';
    private saveButtonSelector = '';
    private pencilSignSelector = '';

    private transferCancelledTextSelector = '';
    private goToPersonalAccountButtonSelector = '';

    private transferCancelledRuTextSelector = '';
    private transferCancelledEnTextSelector = '';

    private cardNumberSelector = '';



    constructor(page: Page) {
        this.page = page;
    }


    public get amount(): Promise<string | null> {
        return this.page.locator(this.amountSelector). textContent();
    }

    public get timerRaw(): Promise<string | null> {
        return this.page.locator(this.timerRawSelector). textContent();
    }

    public get phoneNumber(): Locator {
        return this.page.locator(this.phoneNumberSelector);
    }

    public get transferredButton(): Locator {
        return this.page.locator(this.transferredButtonSelector);
    }

    public get cancelButton(): Locator {
        return this.page.locator(this.cancelButtonSelector);
    }


    public get howToTransferButton(): Locator {
        return this.page.locator(this.howToTransferButtonSelector);
    }

    public get transferInstructionModal(): Locator {
        return this.page.locator(this.transferInstructionModalSelector);
    }

    public get gotItButtonInTransferInstruction(): Locator {
        return this.page.locator(this.gotItButtonInTransferInstructionSelector);
    }

    public get xButtonInTransferInstruction(): Locator {
        return this.page.locator(this.xButtonInTransferInstructionSelector);
    }

    public get transferRulesButton(): Locator {
        return this.page.locator(this.transferRulesButtonSelector);
    }

    public get transferRulesModal(): Locator {
        return this.page.locator(this.transferRulesModalSelector);
    }

    public get gotItButtonInTransferRules(): Locator {
        return this.page.locator(this.gotItButtonInTransferRulesSelector);
    }

    public get xButtonInTransferRules(): Locator {
        return this.page.locator(this.xButtonInTransferRulesSelector);
    }

    public get chatButton(): Locator {
        return this.page.locator(this.chatButtonSelector);
    }

    public get chatModal(): Locator {
        return this.page.locator(this.chatModalSelector);
    }

    public get submitButtonInChatModal(): Locator {
        return this.page.locator(this.submitButtonInChatModalSelector);
    }

    public get cancelButtonInChatModal(): Locator {
        return this.page.locator(this.cancelButtonInChatModalSelector);
    }

    public get commentInputInChatModal(): Locator {
        return this.page.locator(this.commentInputInChatModalSelector);
    }

    public get emailInputInChatModal(): Locator {
        return this.page.locator(this.emailInputInChatModalSelector);
    }

    public get requestHasBeenSentModal(): Locator {
        return this.page.locator(this.requestHasBeenSentModalSelector);
    }

    public get okButtonInRequestHasBeenSentModal(): Locator {
        return this.page.locator(this.okButtonInRequestHasBeenSentModalSelector);
    }

    public get cancelModal(): Locator {
        return this.page.locator(this.cancelModalSelector);
    }

    public get yesButtonInCancelModal(): Locator {
        return this.page.locator(this.yesButtonInCancelModalSelector);
    }

    public get noButtonInCancelModal(): Locator {
        return this.page.locator(this.noButtonInCancelModalSelector);
    }

    public get iAgreeCheckbox(): Locator {
        return this.page.locator(this.iAgreeCheckboxSelector);
    }

    public get transferRulesLink(): Locator {
        return this.page.locator(this.transferRulesLinkSelector);
    }




    public get changeLocaleButton(): Locator {
        return this.page.locator(this.changeLocaleButtonSelector);
    }

    public get enButton(): Locator {
        return this.page.locator(this.enButtonSelector);
    }

    public get ruButton(): Locator {
        return this.page.locator(this.ruButtonSelector);
    }

    public get mainRuText(): Locator {
        return this.page.locator(this.mainRuTextSelector);
    }

    public get mainEnText(): Locator {
        return this.page.locator(this.mainEnTextSelector);
    }

    public get transferredPageHeaderText(): Locator {
        return this.page.locator(this.transferredPageHeaderTextSelector);
    }

    public get transferredPageTimerRaw(): Promise<string | null> {
        return this.page.locator(this.transferredPageTimerRawSelector). textContent();
    }

    public get emailInputOnTransferredPage(): Locator {
        return this.page.locator(this.emailInputOnTransferredPageSelector);
    }

    public get saveButton(): Locator {
        return this.page.locator(this.saveButtonSelector);
    }

    public get pencilSign(): Locator {
        return this.page.locator(this.pencilSignSelector);
    }

    public get transferCancelledText(): Locator {
        return this.page.locator(this.transferCancelledTextSelector);
    }

    public get goToPersonalAccountButton(): Locator {
        return this.page.locator(this.goToPersonalAccountButtonSelector);
    }

    public get transferCancelledRuText(): Locator {
        return this.page.locator(this.transferCancelledRuTextSelector);
    }

    public get transferCancelledEnText(): Locator {
        return this.page.locator(this.transferCancelledEnTextSelector);
    }

    public get cardNumber(): Locator {
        return this.page.locator(this.cardNumberSelector);
    }





}