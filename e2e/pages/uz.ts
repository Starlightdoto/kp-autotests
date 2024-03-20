import { Page } from 'playwright';
import {Locator} from "@playwright/test";


export class UzPage {
    private page: Page;



    private amountSelector = '//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[1]/div[2]/div/p';
    private timerRawSelector = '';
    private phoneNumberSelector = '';
    private completeButtonSelector = '';
    private backButtonSelector = '';
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
    private helpButtonSelector = '';
    private transferInstructionSelector = '';
    private statusInstructionSelector = '';
    private xButtonInHelpModalSelector = '';
    private transferModalSelector = '';
    private statusModalSelector = '';
    private backModalSelector = '';
    private cancelButtonInBackModalSelector = '';
    private backButtonInBackModalSelector = '';
    private changeLocaleButtonSelector = '';
    private enButtonSelector = '';
    private uzButtonSelector = '';
    private ruButtonSelector = '';
    private mainEnTextSelector = '';
    private mainUzTextSelector = '';
    private mainRuTextSelector = '';
    private headerTextSelector = '';
    private secondPageTimerRawSelector = '';
    private emailInputSelector = '';
    private transferDetailsBlockSelector = '';
    private secondPageSubmitButtonSelector = '';
    private iDidNotMakeTransferButtonSelector = '';
    private emailInputValidationErrorMessageSelector = '';
    private attachButtonSelector = '';
    private iDidNotMakeTransferButtonInModalSelector = '';
    public dropZoneSelector = '';
    private iDidNotMakeTransferButtonInVerificationPageSelector = '';


    private cancellationReasonModalHeaderTextSelector = '';
    private firstCheckboxInCancellationReasonModalSelector = '';
    private secondCheckboxInCancellationReasonModalSelector = '';
    private commentInputInCancellationReasonModalSelector = '';
    private submitButtonInCancellationReasonModalSelector = '';
    private skipThisStepButtonInCancellationReasonModalSelector = '';
    public dropZoneInCancellationReasonModalSelector = '';
    private theRequestIsOutdatedTextSelector = '';

    private accountIsBlockedHeaderSelector = '';
    private unlockMyAccountButtonSelector = '';
    private goToPersonalAccountButtonSelector = '';
    private emailInputInBlockedUserSelector = '';
    private commentFieldInBlockedUserSelector = '';
    private supportChatSelector = '';
    private chatHeaderSelector = '';

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

    public get completeButton(): Locator {
        return this.page.locator(this.completeButtonSelector);
    }

    public get backButton(): Locator {
        return this.page.locator(this.backButtonSelector);
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


    public get helpButton(): Locator {
        return this.page.locator(this.helpButtonSelector);
    }

    public get transferInstruction(): Locator {
        return this.page.locator(this.transferInstructionSelector);
    }

    public get statusInstruction(): Locator {
        return this.page.locator(this.statusInstructionSelector);
    }

    public get xButtonInHelpModal(): Locator {
        return this.page.locator(this.xButtonInHelpModalSelector);
    }

    public get transferModal(): Locator {
        return this.page.locator(this.transferModalSelector);
    }

    public get statusModal(): Locator {
        return this.page.locator(this.statusModalSelector);
    }

    public get backModal(): Locator {
        return this.page.locator(this.backModalSelector);
    }

    public get cancelButtonInBackModal(): Locator {
        return this.page.locator(this.cancelButtonInBackModalSelector);
    }

    public get backButtonInBackModal(): Locator {
        return this.page.locator(this.backButtonInBackModalSelector);
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

    public get headerText(): Locator {
        return this.page.locator(this.headerTextSelector);
    }

    public get secondPageTimerRaw(): Promise<string | null> {
        return this.page.locator(this.secondPageTimerRawSelector). textContent();
    }

    public get emailInput(): Locator {
        return this.page.locator(this.emailInputSelector);
    }

    public get transferDetailsBlock(): Locator {
        return this.page.locator(this.transferDetailsBlockSelector);
    }

    public get secondPageSubmitButton(): Locator {
        return this.page.locator(this.secondPageSubmitButtonSelector);
    }

    public get iDidNotMakeTransferButton(): Locator {
        return this.page.locator(this.iDidNotMakeTransferButtonSelector);
    }

    public get emailInputValidationErrorMessage(): Locator {
        return this.page.locator(this.emailInputValidationErrorMessageSelector);
    }

    public get attachButton(): Locator {
        return this.page.locator(this.attachButtonSelector);
    }

    public get iDidNotMakeTransferButtonInModal(): Locator {
        return this.page.locator(this.iDidNotMakeTransferButtonInModalSelector);
    }


    public get iDidNotMakeTransferButtonInVerificationPage(): Locator {
        return this.page.locator(this.iDidNotMakeTransferButtonInVerificationPageSelector);
    }



    public get cancellationReasonModalHeader(): Locator {
        return this.page.locator(this.cancellationReasonModalHeaderTextSelector);
    }

    public get firstCheckboxInCancellationReasonModal(): Locator {
        return this.page.locator(this.firstCheckboxInCancellationReasonModalSelector);
    }

    public get secondCheckboxInCancellationReasonModal(): Locator {
        return this.page.locator(this.secondCheckboxInCancellationReasonModalSelector);
    }


    public get commentInputInCancellationReasonModal(): Locator {
        return this.page.locator(this.commentInputInCancellationReasonModalSelector);
    }

    public get submitButtonInCancellationReasonModal(): Locator {
        return this.page.locator(this.submitButtonInCancellationReasonModalSelector);
    }

    public get skipThisStepButtonInCancellationReasonModal(): Locator {
        return this.page.locator(this.skipThisStepButtonInCancellationReasonModalSelector);
    }

    public get theRequestIsOutdatedText(): Locator {
        return this.page.locator(this.theRequestIsOutdatedTextSelector);
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

    public get cardNumber(): Locator {
        return this.page.locator(this.cardNumberSelector);
    }

}