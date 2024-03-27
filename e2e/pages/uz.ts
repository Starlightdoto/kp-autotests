import { Page } from 'playwright';
import {Locator} from "@playwright/test";


export class UzPage {
    private page: Page;



    private amountSelector = '//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[1]/div[2]/div/p';
    private timerRawSelector = '';
    private cardNumberSelector = '';
    private transferCompletedButtonSelector = '';
    private cancelButtonSelector = '';

    private iAgreeCheckboxSelector = '';
    private transferRulesLinkSelector = '';
    private transferRulesModalSelector = '';
    private okButtonInTransferRulesModalSelector = '';
    private xButtonInTransferRulesModalSelector = '';

    private transferRulesButtonSelector = '';
    private attachingBankReceiptButtonSelector = '';
    private attachingBankReceiptModalSelector = '';
    private submitButtonInAttachingBankReceiptModalSelector = '';
    private cancelButtonInAttachingBankReceiptModalSelector = '';
    private commentInputInAttachingBankReceiptModalSelector = '';
    private emailInputInAttachingBankReceiptModalSelector = '';
    public attachFilesZoneInAttachingBankReceiptModalSelector = '';
    private requestHasBeenSentModalSelector = '';
    private okButtonInRequestHasBeenSentModalSelector = '';

    private instructionButtonSelector = '';
    private transferInstructionHeaderSelector = '';
    private xButtonInInstructionModalSelector = '';

    private cancelModalSelector = '';
    private cancelButtonInCancelModalSelector = '';
    private backButtonInCancelModalSelector = '';

    private changeLocaleButtonSelector = '';
    private enButtonSelector = '';
    private uzButtonSelector = '';
    private ruButtonSelector = '';
    private mainEnTextSelector = '';
    private mainUzTextSelector = '';
    private mainRuTextSelector = '';

    private transferCompletedPageHeaderTextSelector = '';
    private emailInputSelector = '';
    private transferDetailsBlockSelector = '';
    private secondPageContinueButtonSelector = '';
    private iDidNotTransferButtonSelector = '';
    private attachButtonSelector = '';
    private iDidNotMakeTransferButtonInModalSelector = '';
    public dropZoneSelector = '';

    private deleteButtonInVerificationPageSelector = '';
    private pencilSignInVerificationPageSelector = '';
    private confirmButtonInVerificationPageSelector = '';

    private cancelButtonInDeleteModalSelector = '';
    private deleteButtonInDeleteModalSelector = '';

    private orderCancelledTextSelector = '';

    private accountIsBlockedHeaderSelector = '';
    private unlockMyAccountButtonSelector = '';
    private goToPersonalAccountButtonSelector = '';
    private emailInputInBlockedUserSelector = '';
    private commentFieldInBlockedUserSelector = '';
    private supportChatSelector = '';
    private chatHeaderSelector = '';
    private thanksForTheRequestTextSelector = '';








    constructor(page: Page) {
        this.page = page;
    }


    public get amount(): Promise<string | null> {
        return this.page.locator(this.amountSelector). textContent();
    }

    public get timerRaw(): Promise<string | null> {
        return this.page.locator(this.timerRawSelector). textContent();
    }


    public get cardNumber(): Locator {
        return this.page.locator(this.cardNumberSelector);
    }

    public get transferCompletedButton(): Locator {
        return this.page.locator(this.transferCompletedButtonSelector);
    }

    public get cancelButton(): Locator {
        return this.page.locator(this.cancelButtonSelector);
    }

    public get iAgreeCheckbox(): Locator {
        return this.page.locator(this.iAgreeCheckboxSelector);
    }

    public get transferRulesLink(): Locator {
        return this.page.locator(this.transferRulesLinkSelector);
    }

    public get transferRulesModal(): Locator {
        return this.page.locator(this.transferRulesModalSelector);
    }

    public get okButtonInTransferRulesModal(): Locator {
        return this.page.locator(this.okButtonInTransferRulesModalSelector);
    }

    public get xButtonInTransferRulesModal(): Locator {
        return this.page.locator(this.xButtonInTransferRulesModalSelector);
    }

    public get transferRulesButton(): Locator {
        return this.page.locator(this.transferRulesButtonSelector);
    }

    public get attachingBankReceiptButton(): Locator {
        return this.page.locator(this.attachingBankReceiptButtonSelector);
    }

    public get attachingBankReceiptModal(): Locator {
        return this.page.locator(this.attachingBankReceiptModalSelector);
    }

    public get submitButtonInAttachingBankReceiptModal(): Locator {
        return this.page.locator(this.submitButtonInAttachingBankReceiptModalSelector);
    }

    public get cancelButtonInAttachingBankReceiptModal(): Locator {
        return this.page.locator(this.cancelButtonInAttachingBankReceiptModalSelector);
    }

    public get commentInputInAttachingBankReceiptModal(): Locator {
        return this.page.locator(this.commentInputInAttachingBankReceiptModalSelector);
    }

    public get emailInputInAttachingBankReceiptModal(): Locator {
        return this.page.locator(this.emailInputInAttachingBankReceiptModalSelector);
    }

    public get requestHasBeenSentModal(): Locator {
        return this.page.locator(this.requestHasBeenSentModalSelector);
    }

    public get okButtonInRequestHasBeenSentModal(): Locator {
        return this.page.locator(this.okButtonInRequestHasBeenSentModalSelector);
    }


    public get instructionButton(): Locator {
        return this.page.locator(this.instructionButtonSelector);
    }

    public get transferInstructionHeader(): Locator {
        return this.page.locator(this.transferInstructionHeaderSelector);
    }


    public get xButtonInInstructionModal(): Locator {
        return this.page.locator(this.xButtonInInstructionModalSelector);
    }


    public get cancelModal(): Locator {
        return this.page.locator(this.cancelModalSelector);
    }

    public get cancelButtonInCancelModal(): Locator {
        return this.page.locator(this.cancelButtonInCancelModalSelector);
    }

    public get backButtonInCancelModal(): Locator {
        return this.page.locator(this.backButtonInCancelModalSelector);
    }

    public get changeLocaleButton(): Locator {
        return this.page.locator(this.changeLocaleButtonSelector);
    }

    public get enButton(): Locator {
        return this.page.locator(this.enButtonSelector);
    }

    public get uzButton(): Locator {
        return this.page.locator(this.uzButtonSelector);
    }

    public get ruButton(): Locator {
        return this.page.locator(this.ruButtonSelector);
    }

    public get mainEnText(): Locator {
        return this.page.locator(this.mainEnTextSelector);
    }

    public get mainUzText(): Locator {
        return this.page.locator(this.mainUzTextSelector);
    }

    public get mainRuText(): Locator {
        return this.page.locator(this.mainRuTextSelector);
    }

    public get transferCompletedPageHeaderText(): Locator {
        return this.page.locator(this.transferCompletedPageHeaderTextSelector);
    }


    public get emailInput(): Locator {
        return this.page.locator(this.emailInputSelector);
    }

    public get transferDetailsBlock(): Locator {
        return this.page.locator(this.transferDetailsBlockSelector);
    }

    public get secondPageContinueButton(): Locator {
        return this.page.locator(this.secondPageContinueButtonSelector);
    }

    public get iDidNotTransferButton(): Locator {
        return this.page.locator(this.iDidNotTransferButtonSelector);
    }



    public get attachButton(): Locator {
        return this.page.locator(this.attachButtonSelector);
    }

    public get iDidNotMakeTransferButtonInModal(): Locator {
        return this.page.locator(this.iDidNotMakeTransferButtonInModalSelector);
    }


    public get deleteButtonInVerificationPage(): Locator {
        return this.page.locator(this.deleteButtonInVerificationPageSelector);
    }

    public get pencilSignInVerificationPage(): Locator {
        return this.page.locator(this.pencilSignInVerificationPageSelector);
    }

    public get confirmButtonInVerificationPage(): Locator {
        return this.page.locator(this.confirmButtonInVerificationPageSelector);
    }

    public get cancelButtonInDeleteModal(): Locator {
        return this.page.locator(this.cancelButtonInDeleteModalSelector);
    }


    public get deleteButtonInDeleteModal(): Locator {
        return this.page.locator(this.deleteButtonInDeleteModalSelector);
    }



    public get orderCancelledText(): Locator {
        return this.page.locator(this.orderCancelledTextSelector);
    }

    public get accountIsBlockedHeader(): Locator {
        return this.page.locator(this.accountIsBlockedHeaderSelector);
    }

    public get unlockMyAccountButton(): Locator {
        return this.page.locator(this.unlockMyAccountButtonSelector);
    }

    public get goToPersonalAccountButton(): Locator {
        return this.page.locator(this.goToPersonalAccountButtonSelector);
    }

    public get emailInputInBlockedUser(): Locator {
        return this.page.locator(this.emailInputInBlockedUserSelector);
    }

    public get commentFieldInBlockedUser(): Locator {
        return this.page.locator(this.commentFieldInBlockedUserSelector);
    }

    public get supportChat(): Locator {
        return this.page.locator(this.supportChatSelector);
    }

    public get chatHeader(): Locator {
        return this.page.locator(this.chatHeaderSelector);
    }

    public get thanksForTheRequestText(): Locator {
        return this.page.locator(this.thanksForTheRequestTextSelector);
    }

}