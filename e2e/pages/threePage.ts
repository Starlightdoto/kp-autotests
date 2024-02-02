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
    private proceedButtonSelector = '#app > div.mobile-viewport > div.container-deposit.mobile-viewport > div:nth-child(4) > div > div.application > div > div.application__buttons > div > button';
    private cancelButtonSelector = '#app > div.mobile-viewport > div.container-deposit.mobile-viewport > div:nth-child(4) > div > div.application > div > div.application__buttons > button';
    private inputSumSelector = '//*[@id="v-step-0"]/input';
    private bankDropdownSelector = '//*[@id="pv_id_12"]/span';
    private anyOptionSelector = '//*[@id="pv_id_12_0"]/div';
    private sberOptionSelector = '//*[@id="pv_id_12_1"]/div';
    private tinkoffOptionSelector = '//*[@id="pv_id_12_2"]/div';
    private cancelModalSelector = '/html/body/div[3]/div/div/div';
    private modalCancelButtonSelector = '//html/body/div[3]/div/div/div/div[2]/button[1]';
    private backButtonSelector = 'body > div.p-dialog-mask.p-component-overlay.p-component-overlay-enter > div > div > div > div.application-modal__buttons > button.p-button.p-component.application-modal__buttons-back.primary';
    private orderCancelledPageMainTextSelector = '//*[@id="app"]/div[1]/div[1]/div[4]/div/div/div/p[1]';
    private popupButtonSelector = '//*[@id="app"]/div[1]/div[1]/div[3]/div/div[3]/div[2]/div[2]';
    private timerRawSelector = '//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[1]/div[1]/div[2]';
    private amountSelector = '//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[1]/div[2]/div/p';
    private cardNumberSelector = '//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[3]/div[2]/p';
    private completeButtonSelector = '//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[3]/div[2]/p';
    private secondPageCancelButtonSelector = '//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[6]/button';
    private cancellationReasonModalMainTextSelector = 'body > div:nth-child(7) > div > div > div > div:nth-child(1) > div.reason-modal__header > p';
    private firstCheckboxSelector = 'body > div:nth-child(7) > div > div > div > div:nth-child(1) > div.reason-modal__body > div.reason-modal__checkboxes > div:nth-child(1) > div > div > div.p-checkbox-box';
    private secondCheckboxSelector = 'body > div:nth-child(7) > div > div > div > div:nth-child(1) > div.reason-modal__body > div.reason-modal__checkboxes > div:nth-child(2) > div > div > div.p-checkbox-box';
    private commentInputSelector = 'body > div:nth-child(7) > div > div > div > div:nth-child(1) > div.reason-modal__body > textarea';
    private submitButtonSelector = 'body > div:nth-child(7) > div > div > div > div.reason-modal__footer-container > div > div > button';
    private skipThisStepButtonSelector = 'body > div:nth-child(7) > div > div > div > div.reason-modal__footer-container > div > button';
    private dropZoneSelector = '//*[@id="dropzoneFile"]';
    private headerTextSelector = '//*[@id="app"]/div[1]/div[1]/div[4]/div[1]/div[1]/div/div[2]/p';
    private transferDetailsBlockSelector = '//*[@id="app"]/div[1]/div[1]/div[4]/div[1]/div[2]/div/div[1]';
    private thirdPageSubmitButtonSelector = '//*[@id="app"]/div[1]/div[1]/div[4]/div[1]/div[2]/div/div[7]/button[1]';
    private iDidNotMakeTransferButtonSelector = '//*[@id="app"]/div[1]/div[1]/div[4]/div[1]/div[2]/div/div[7]/button[2]';
    private emailInputValidationErrorMessageSelector = '#app > div.mobile-viewport > div.container-deposit.mobile-viewport > div:nth-child(4) > div.container.shadow-container > div.status > div > div.status__form > div.status__form-container > small';
    private attachButtonSelector = 'body > div.p-dialog-mask.p-component-overlay.p-component-overlay-enter > div > div > div > div.application-modal__buttons > button.p-button.p-component.application-modal__buttons-back.primary';
    private iDidNotMakeTransferButtonInModalSelector = 'body > div.p-dialog-mask.p-component-overlay.p-component-overlay-enter > div > div > div > div.application-modal__buttons > button.p-button.p-component.application-modal__buttons-confirm.secondary-gray';
    private thirdPageOrderCancelledPageMainTextSelector = '#app > div.mobile-viewport > div.container-deposit.mobile-viewport > div:nth-child(4) > div > div > div > p.cancelled__header';


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

    public get proceedButton(): Locator {
        return this.page.locator(this.proceedButtonSelector);
    }

    public get cancelButton(): Locator {
        return this.page.locator(this.cancelButtonSelector);
    }

    public get inputSum(): Locator {
        return this.page.locator(this.inputSumSelector);
    }

    public get bankDropdown(): Locator {
        return this.page.locator(this.bankDropdownSelector);
    }

    public get anyOption(): Locator {
        return this.page.locator(this.anyOptionSelector);
    }

    public get sberOption(): Locator {
        return this.page.locator(this.sberOptionSelector);
    }

    public get tinkoffOption(): Locator {
        return this.page.locator(this.tinkoffOptionSelector);
    }

    public get cancelModal(): Locator {
        return this.page.locator(this.cancelModalSelector);
    }

    public get modalCancelButton(): Locator {
        return this.page.locator(this.modalCancelButtonSelector);
    }

    public get backButton(): Locator {
        return this.page.locator(this.backButtonSelector);
    }

    public get orderCancelledPageMainText(): Locator {
        return this.page.locator(this.orderCancelledPageMainTextSelector);
    }

    public get popupButton(): Locator {
        return this.page.locator(this.popupButtonSelector);
    }

    public get timerRaw(): Promise<string | null> {
        return this.page.locator(this.timerRawSelector).textContent();
    }

    public get amount(): Promise<string | null> {
        return this.page.locator(this.amountSelector).textContent();
    }

    public get cardNumber(): Locator {
        return this.page.locator(this.cardNumberSelector);
    }

    public get completeButton(): Locator {
        return this.page.locator(this.completeButtonSelector);
    }

    public get secondPageCancelButton(): Locator {
        return this.page.locator(this.secondPageCancelButtonSelector);
    }

    public get firstCheckbox(): Locator {
        return this.page.locator(this.firstCheckboxSelector);
    }

    public get secondCheckbox(): Locator {
        return this.page.locator(this.secondCheckboxSelector);
    }

    public get commentInput(): Locator {
        return this.page.locator(this.commentInputSelector);
    }

    public get submitButton(): Locator {
        return this.page.locator(this.submitButtonSelector);
    }

    public get skipThisStepButton(): Locator {
        return this.page.locator(this.skipThisStepButtonSelector);
    }

    public get cancellationReasonModalMainText(): Locator {
        return this.page.locator(this.cancellationReasonModalMainTextSelector);
    }

    public get dropZone(): Locator {
        return this.page.locator(this.dropZoneSelector);
    }

    public get headerText(): Locator {
        return this.page.locator(this.headerTextSelector);
    }

    public get transferDetailsBlock(): Locator {
        return this.page.locator(this.transferDetailsBlockSelector);
    }

    public get thirdPageSubmitButton(): Locator {
        return this.page.locator(this.thirdPageSubmitButtonSelector);
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

    public get thirdPageOrderCancelledPageMainText(): Locator {
        return this.page.locator(this.thirdPageOrderCancelledPageMainTextSelector);
    }

}