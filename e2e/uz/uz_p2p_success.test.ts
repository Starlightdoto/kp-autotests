import {test, expect} from '@playwright/test';
import { createP2PRequestLink } from '../helpers/create_request_link';
import {UzPage} from "../pages/uz";
import { filePath } from "../helpers/data";

let globalPage;
const sum = '5000.00';
const currencyCode = '860';

let uz: UzPage;

test.beforeAll(async ({browser}, testInfo) => {
    const context = await browser.newContext();
    globalPage = await context.newPage();
    const baseUrl = await createP2PRequestLink({page: globalPage}, '18', 'send', sum, currencyCode);
    if( baseUrl !== undefined) {
        await globalPage.goto(baseUrl);
    }

    uz = new UzPage(globalPage);
});



test.afterAll(async () => {
    await globalPage.close();
});


test('The First Page Main checks', async () => {

    const amount = await uz.amount;
    await expect(`${amount}`).toEqual('5 000.00 UZS ');

    const timer = (await uz.timerRaw).split('');
    await expect(Number(timer[0])).toBeLessThanOrEqual(10);

    await expect(uz.cardNumber).toBeVisible();

    await expect(uz.transferCompletedButton).toBeEnabled();

    await expect(uz.cancelButton).toBeEnabled();
});

test('I agree with transfer rules checkbox checks', async () => {
    await expect(uz.transferCompletedButton).toBeEnabled();
    await (uz.iAgreeCheckbox).click();
    await expect(uz.transferCompletedButton).toBeDisabled();
    await (uz.iAgreeCheckbox).click();
    await expect(uz.transferCompletedButton).toBeEnabled();
    await (uz.transferRulesLink).click();
    await expect (uz.transferRulesModal).toBeVisible();
    await expect(uz.okButtonInTransferRulesModal).toBeEnabled();
    await expect(uz.xButtonInTransferRulesModal).toBeEnabled();
    await uz.xButtonInTransferRulesModal.click();
    await expect (uz.transferRulesModal).toBeHidden();
});

test('Transfer rules modal window checks', async () => {
    await uz.transferRulesButton.click();
    await expect (uz.transferRulesModal).toBeVisible();
    await expect(uz.okButtonInTransferRulesModal).toBeEnabled();
    await expect(uz.attachingBankReceiptButton).toBeEnabled();
    await expect(uz.xButtonInTransferRulesModal).toBeEnabled();
    await uz.xButtonInTransferRulesModal. click();
    await expect (uz.transferRulesModal).toBeHidden();
    await uz.transferRulesButton.click();
    await expect (uz.transferRulesModal).toBeVisible();
    await uz.okButtonInTransferRulesModal.click();
    await expect (uz.transferRulesModal).toBeHidden();
});

test('Attaching Bank Receipt Modal Window checks', async () => {
    await uz.transferRulesButton.click();
    await uz.attachingBankReceiptButton.click();
    await globalPage.waitForTimeout(2000);
    await expect (uz.attachingBankReceiptModal).toBeVisible;
    await expect (uz.submitButtonInAttachingBankReceiptModal).toBeEnabled;
    await expect (uz.cancelButtonInAttachingBankReceiptModal).toBeEnabled;
    await uz.cancelButtonInAttachingBankReceiptModal.click();
    await expect (uz.attachingBankReceiptModal).toBeHidden;
    await uz.transferRulesButton.click();
    await uz.attachingBankReceiptButton.click();
    await uz.commentInputInAttachingBankReceiptModal.fill('auto_test_uz_p2p');
    await uz.emailInputInAttachingBankReceiptModal.fill('auto_test_uz_p2p@test.com');
    await globalPage.setInputFiles(uz.attachFilesZoneInAttachingBankReceiptModalSelector, [
        filePath]);
    await uz.submitButtonInAttachingBankReceiptModal.click();
    await globalPage.waitForTimeout(2000);
    await expect (uz.requestHasBeenSentModal).toBeVisible;
    await expect (uz.okButtonInRequestHasBeenSentModal).toBeEnabled;
    await uz.okButtonInRequestHasBeenSentModal.click();
    await expect (uz.requestHasBeenSentModal).toBeHidden;

});

test('Instruction modal window checks', async () => {

    await uz.instructionButton.click();
    await expect (uz.transferInstructionHeader).toBeVisible();
    await expect (uz.xButtonInInstructionModal).toBeVisible();
    await uz.xButtonInInstructionModal.click();
    await expect (uz.instructionButton).toBeVisible();
});


test('Cancel Modal Window checks', async () => {

    await uz.cancelButton.click();
    await expect (uz.cancelButtonInCancelModal). toBeEnabled;
    await expect (uz.backButtonInCancelModal). toBeEnabled;
    await uz.backButtonInCancelModal. click();
    await expect (uz.cancelModal). toBeHidden;
});


test('Locale change - main page', async () => {

    await uz.changeLocaleButton.click();
    await uz.enButton.click();
    await globalPage.waitForTimeout(2000);
    const enTextContent = await uz.mainEnText.textContent();
    await expect(enTextContent).toEqual('To replenish your account, make a transfer to this card');

    // const helpButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[3]/div/div[2]/div[1]/div/p');
    // const xButton = await globalPage.locator('body > div.p-dialog-mask.p-component-overlay.p-component-overlay-enter > div > div > div.instruction-modal__header > i');
    // const backButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[2]/div[3]/button');
    // const backModalButton = await globalPage. locator('body > div.p-dialog-mask.p-component-overlay.p-component-overlay-enter > div > div > div > div.application-modal__buttons > button.p-button.p-component.application-modal__buttons-back.primary');
    // await helpButton.click();
    // await globalPage.waitForTimeout(5000);
    // // const enTransferInstruction = await globalPage.locator('#pv_id_10_0_header_action > div > span');
    // // await enTransferInstruction.click();
    // const enTransferInstruction = await globalPage.locator('#pv_id_10_0_header_action > div > span').textContent();
    // await expect(enTransferInstruction).toEqual('Transfer');
    // await xButton. click();
    // await backButton.click();
    // const backModaltext = await globalPage. locator('body > div.p-dialog-mask.p-component-overlay.p-component-overlay-enter > div > div > div > div.application-modal__buttons > button.p-button.p-component.application-modal__buttons-confirm.secondary-gray > span.p-button-label').textContent();
    // await expect(backModaltext).toEqual('Cancel');
    // await backModalButton.click();

    await uz.ruButton.click();
    await globalPage.waitForTimeout(2000);
    const ruTextContent = await uz.mainRuText.textContent();
    await expect(ruTextContent).toEqual('Чтобы пополнить счет, выполните перевод по номеру карты');

    await uz.changeLocaleButton.click();
    await uz.uzButton.click();
    await globalPage.waitForTimeout(2000);
    const uzTextContent = await uz.mainUzText.textContent();
    await expect(uzTextContent).toEqual('Hisobingizni to\'ldirish uchun, karta raqamdan foydalanib pul o\'tkazmasini amalga oshiring');
    await uz.changeLocaleButton.click();


});

test('Go to transfer completed page', async () => {
    await expect(uz.transferCompletedButton).toBeEnabled();
    await uz.transferCompletedButton.click();
    await expect(uz.transferCompletedPageHeaderText).toBeVisible();
});

test('Transfer completed page main checks', async () => {

    await expect(uz.secondPageContinueButton).toBeDisabled();
    await expect(uz.iDidNotTransferButton).toBeEnabled();
    await uz.emailInput.fill('auto_test_uz_p2p@test.com');
});

test('Transfer Completed Page - I did not make a transfer modal appears', async () => {
    await uz.iDidNotTransferButton.click();
    await expect(uz.attachButton).toBeEnabled();
    await expect(uz.iDidNotMakeTransferButtonInModal).toBeEnabled();
    await uz.attachButton.click();
    await globalPage.waitForTimeout(2000);
    await expect(uz.attachButton).toBeHidden();
});


test('Attach receipt', async () => {
    await globalPage.setInputFiles(uz.dropZoneSelector, [
        filePath]);
});

test('Go to payment verification page', async () => {
    await uz.secondPageContinueButton.click();

    await uz.transferDetailsBlock.click();
    await globalPage.waitForTimeout(2000);

    await expect(uz.deleteButtonInVerificationPage).toBeEnabled();
    await expect(uz.pencilSignInVerificationPage).toBeEnabled();
    await uz.pencilSignInVerificationPage.click();
    await expect(uz.confirmButtonInVerificationPage).toBeEnabled();
    await uz.confirmButtonInVerificationPage.click();
    await expect(uz.pencilSignInVerificationPage).toBeEnabled();
});

test('Waiting for payment verification page - Delete modal appears', async () => {
    await uz.deleteButtonInVerificationPage.click();
    await expect(uz.cancelButtonInDeleteModal).toBeEnabled();
    await expect(uz.deleteButtonInDeleteModal).toBeEnabled();
    await uz.cancelButtonInDeleteModal.click();
    await globalPage.waitForTimeout(2000);
    await expect(uz.cancelButtonInDeleteModal).toBeHidden();
});


test('Waiting for payment verification page - Deleting the attached receipt', async () => {
    await uz.deleteButtonInVerificationPage.click();
    await expect(uz.cancelButtonInDeleteModal).toBeEnabled();
    await expect(uz.deleteButtonInDeleteModal).toBeEnabled();
    await uz.deleteButtonInDeleteModal.click();
    await globalPage.waitForTimeout(2000);
    await expect(uz.cancelButtonInDeleteModal).toBeHidden();
});

test('Attach receipt 2', async () => {
    await globalPage.setInputFiles(uz.dropZoneSelector, [
        filePath]);
});

test('Go to payment verification page 2', async () => {
    await uz.secondPageContinueButton.click();

    await uz.transferDetailsBlock.click();
    await globalPage.waitForTimeout(2000);

    await expect(uz.deleteButtonInVerificationPage).toBeEnabled();
    await expect(uz.pencilSignInVerificationPage).toBeEnabled();

});