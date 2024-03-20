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


// test('The First Page Main checks', async () => {
//
//     const amount = await onePage.amount;
//     await expect(`${amount}`).toEqual('500.00 ₽');
//
//     const timer = (await onePage.timerRaw).split('');
//     await expect(Number(timer[0])).toBeLessThanOrEqual(10);
//
//     await expect(onePage.cardNumber).toBeVisible();
//
//     await expect(onePage.completeButton).toBeEnabled();
//
//     await expect(onePage.backButton).toBeEnabled();
// });
//
// test('I agree with transfer rules checkbox checks', async () => {
//     await expect(onePage.completeButton).toBeEnabled();
//     await (onePage.iAgreeCheckbox).click();
//     await expect(onePage.completeButton).toBeDisabled();
//     await (onePage.iAgreeCheckbox).click();
//     await expect(onePage.completeButton).toBeEnabled();
//     await (onePage.transferRulesLink).click();
//     await expect (onePage.transferRulesModal).toBeVisible();
//     await expect(onePage.okButtonInTransferRulesModal).toBeEnabled();
//     await expect(onePage.xButtonInTransferRulesModal).toBeEnabled();
//     await onePage.xButtonInTransferRulesModal.click();
//     await expect (onePage.transferRulesModal).toBeHidden();
// });
//
// test('Transfer rules modal window checks', async () => {
//     await onePage.transferRulesButton.click();
//     await expect (onePage.transferRulesModal).toBeVisible();
//     await expect(onePage.okButtonInTransferRulesModal).toBeEnabled();
//     await expect(onePage.attachingBankReceiptButton).toBeEnabled();
//     await expect(onePage.xButtonInTransferRulesModal).toBeEnabled();
//     await onePage.xButtonInTransferRulesModal. click();
//     await expect (onePage.transferRulesModal).toBeHidden();
//     await onePage.transferRulesButton.click();
//     await expect (onePage.transferRulesModal).toBeVisible();
//     await onePage.okButtonInTransferRulesModal.click();
//     await expect (onePage.transferRulesModal).toBeHidden();
// });
//
// test('Attaching Bank Receipt Modal Window checks', async () => {
//     await onePage.transferRulesButton.click();
//     await onePage.attachingBankReceiptButton.click();
//     await globalPage.waitForTimeout(2000);
//     await expect (onePage.attachingBankReceiptModal).toBeVisible;
//     await expect (onePage.submitButtonInAttachingBankReceiptModal).toBeEnabled;
//     await expect (onePage.cancelButtonInAttachingBankReceiptModal).toBeEnabled;
//     await onePage.cancelButtonInAttachingBankReceiptModal.click();
//     await expect (onePage.attachingBankReceiptModal).toBeHidden;
//     await onePage.transferRulesButton.click();
//     await onePage.attachingBankReceiptButton.click();
//     await onePage.commentInputInAttachingBankReceiptModal.fill('auto_test_one_page_p2p');
//     await onePage.emailInputInAttachingBankReceiptModal.fill('auto_test_one_page_p2p@test.com');
//     await globalPage.setInputFiles(onePage.attachFilesZoneInAttachingBankReceiptModalSelector, [
//         filePath]);
//     await onePage.submitButtonInAttachingBankReceiptModal.click();
//     await globalPage.waitForTimeout(2000);
//     await expect (onePage.requestHasBeenSentModal).toBeVisible;
//     await expect (onePage.okButtonInRequestHasBeenSentModal).toBeEnabled;
//     await onePage.okButtonInRequestHasBeenSentModal.click();
//     await expect (onePage.requestHasBeenSentModal).toBeHidden;
//
// });
//
// test('Help modal window checks', async () => {
//
//     await onePage.helpButton.click();
//     await expect (onePage.transferInstruction).toBeVisible();
//     await expect (onePage.statusInstruction).toBeVisible();
//     await expect (onePage.xButtonInHelpModal).toBeVisible();
//     await onePage.transferInstruction.click();
//     await expect (onePage.transferModal).toBeVisible();
//     await onePage.transferInstruction.click();
//     await expect (onePage.transferModal).toBeHidden();
//     await onePage.statusInstruction.click();
//     await expect (onePage.statusModal).toBeVisible();
//     await onePage.statusInstruction.click();
//     await expect (onePage.statusModal).toBeHidden();
//     await onePage.xButtonInHelpModal.click();
//     await expect (onePage.helpButton).toBeVisible();
// });
//
//
// test('Cancel Modal Window checks', async () => {
//
//     await onePage.backButton.click();
//     await expect (onePage.cancelButtonInBackModal). toBeEnabled;
//     await expect (onePage.backButtonInBackModal). toBeEnabled;
//     await onePage.backButtonInBackModal. click();
//     await expect (onePage.backModal). toBeHidden;
// });
//
//
// test('Locale change - main page', async () => {
//
//     await onePage.changeLocaleButton.click();
//     await onePage.enButton.click();
//     await globalPage.waitForTimeout(2000);
//     const enTextContent = await onePage.mainEnText.textContent();
//     await expect(enTextContent).toEqual('Transfer the exact amount:');
//
//     // const helpButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[3]/div/div[2]/div[1]/div/p');
//     // const xButton = await globalPage.locator('body > div.p-dialog-mask.p-component-overlay.p-component-overlay-enter > div > div > div.instruction-modal__header > i');
//     // const backButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[2]/div[3]/button');
//     // const backModalButton = await globalPage. locator('body > div.p-dialog-mask.p-component-overlay.p-component-overlay-enter > div > div > div > div.application-modal__buttons > button.p-button.p-component.application-modal__buttons-back.primary');
//     // await helpButton.click();
//     // await globalPage.waitForTimeout(5000);
//     // // const enTransferInstruction = await globalPage.locator('#pv_id_10_0_header_action > div > span');
//     // // await enTransferInstruction.click();
//     // const enTransferInstruction = await globalPage.locator('#pv_id_10_0_header_action > div > span').textContent();
//     // await expect(enTransferInstruction).toEqual('Transfer');
//     // await xButton. click();
//     // await backButton.click();
//     // const backModaltext = await globalPage. locator('body > div.p-dialog-mask.p-component-overlay.p-component-overlay-enter > div > div > div > div.application-modal__buttons > button.p-button.p-component.application-modal__buttons-confirm.secondary-gray > span.p-button-label').textContent();
//     // await expect(backModaltext).toEqual('Cancel');
//     // await backModalButton.click();
//
//     await onePage.changeLocaleButton.click();
//     await onePage.uzButton.click();
//     await globalPage.waitForTimeout(2000);
//     const uzTextContent = await onePage.mainUzText.textContent();
//     await expect(uzTextContent).toEqual('Belgilangan miqdorni otkazing:');
//     await onePage.changeLocaleButton.click();
//
//     await onePage.ruButton.click();
//     await globalPage.waitForTimeout(2000);
//     const ruTextContent = await onePage.mainRuText.textContent();
//     await expect(ruTextContent).toEqual('Переведите точную сумму:');
// });
//
// test('Go to transfer completed page', async () => {
//     await expect(onePage.completeButton).toBeEnabled();
//     await onePage.completeButton.click();
//     await expect(onePage.headerText).toBeVisible();
// });
//
// test('Transfer completed page main checks', async () => {
//
//     const timer = (await onePage.secondPageTimerRaw).split('');
//     await expect(Number(timer[0])).toBeLessThanOrEqual(3);
//
//     await onePage.transferDetailsBlock.click();
//     await globalPage.waitForTimeout(2000);
//
//     await expect(onePage.secondPageSubmitButton).toBeEnabled();
//     await expect(onePage.iDidNotMakeTransferButton).toBeEnabled();
//     await onePage.secondPageSubmitButton.click();
//     await expect(onePage.emailInputValidationErrorMessage).toBeVisible();
//     await onePage.emailInput.fill('auto_test_one_page_p2p@test.com');
// });
//
// test('Transfer Completed Page - I did not make a transfer modal appears', async () => {
//     await onePage.iDidNotMakeTransferButton.click();
//     await expect(onePage.attachButton).toBeEnabled();
//     await expect(onePage.iDidNotMakeTransferButtonInModal).toBeEnabled();
//     await onePage.attachButton.click();
//     await globalPage.waitForTimeout(2000);
//     await expect(onePage.attachButton).toBeHidden();
// });
//
//
// test('Attach receipt', async () => {
//     await globalPage.setInputFiles(onePage.dropZoneSelector, [
//         filePath]);
// });
//
// test('Go to payment verification page', async () => {
//     await onePage.secondPageSubmitButton.click();
//
//     await expect(onePage.iDidNotMakeTransferButtonInVerificationPage).toBeEnabled();
//     const timer = (await onePage.secondPageTimerRaw).split('');
//     await expect(Number(timer[0])).toBeLessThanOrEqual(3);
// });
//
// test('Waiting for payment verification page - I did not make a transfer modal appears', async () => {
//     await onePage.iDidNotMakeTransferButtonInVerificationPage.click();
//     await expect(onePage.attachButton).toBeEnabled();
//     await expect(onePage.iDidNotMakeTransferButtonInModal).toBeEnabled();
//     await onePage.attachButton.click();
//     await globalPage.waitForTimeout(2000);
//     await expect(onePage.attachButton).toBeHidden();
// });
