import {test, expect} from '@playwright/test';
import { createQRRequestLink } from '../helpers/create_request_link';
import {ChiefpayPage} from "../pages/chiefpay";
import { filePath } from "../helpers/data";


let globalPage;
const sum = '500.00';
const currencyCode = '643';

let chiefpay: ChiefpayPage;

test.beforeAll(async ({browser}, testInfo) => {
    const context = await browser.newContext();
    globalPage = await context.newPage();
    const baseUrl = await createQRRequestLink({page: globalPage}, '18', 'send', sum, currencyCode);
    if( baseUrl !== undefined) {
        await globalPage.goto(baseUrl);
    }

    chiefpay = new ChiefpayPage(globalPage);

});


test.afterAll(async () => {
    await globalPage.close();
});


test('First Page Main checks', async () => {
    const amount = await chiefpay.amount;
    await expect(`${amount}`).toEqual('500.00 ₽');

    const timer = (await chiefpay.timerRaw).split('');
    await expect(Number(timer[0])).toBeLessThanOrEqual(10);

    // await expect(chiefpay.phoneNumber).toBeVisible();
    await expect(chiefpay.transferredButton).toBeEnabled();
    await expect(chiefpay.cancelButton).toBeEnabled();
});



test('How to transfer modal window checks', async () => {
    await chiefpay.howToTransferButton.click();
    await expect (chiefpay.transferInstructionModal).toBeVisible();
    await expect(chiefpay.gotItButtonInTransferInstruction).toBeEnabled();
    await expect(chiefpay.xButtonInTransferInstruction).toBeEnabled();
    await chiefpay.xButtonInTransferInstruction. click();
    await expect (chiefpay.transferInstructionModal).toBeHidden();
    await chiefpay.howToTransferButton.click();
    await expect (chiefpay.transferInstructionModal).toBeVisible();
    await chiefpay.gotItButtonInTransferInstruction.click();
    await expect (chiefpay.transferInstructionModal).toBeHidden();

});


test('Transfer rules modal window checks', async () => {
    await chiefpay.transferRulesButton.click();
    await expect (chiefpay.transferRulesModal).toBeVisible();
    await expect(chiefpay.gotItButtonInTransferRules).toBeEnabled();
    await expect(chiefpay.xButtonInTransferRules).toBeEnabled();
    await chiefpay.xButtonInTransferRules. click();
    await expect (chiefpay.transferRulesModal).toBeHidden();
    await chiefpay.transferRulesButton.click();
    await expect (chiefpay.transferRulesModal).toBeVisible();
    await chiefpay.gotItButtonInTransferRules.click();
    await expect (chiefpay.transferRulesModal).toBeHidden();

});


test('Chat Modal Window checks', async () => {
    await chiefpay.chatButton.click();
    await globalPage.waitForTimeout(2000);
    await expect (chiefpay.chatModal).toBeVisible;
    await expect (chiefpay.submitButtonInChatModal).toBeEnabled;
    await expect (chiefpay.cancelButtonInChatModal).toBeEnabled;
    await chiefpay.cancelButtonInChatModal.click();
    await expect (chiefpay.chatModal).toBeHidden;
    await chiefpay.chatButton.click();
    await chiefpay.commentInputInChatModal.fill('auto_test_chiefpay_qr');
    await chiefpay.emailInputInChatModal.fill('auto_test_chiefpay_qr@test.com');
    await globalPage.setInputFiles(chiefpay.attachFilesZoneInChatModalSelector, [
        filePath]);
    await chiefpay.submitButtonInChatModal.click();
    await globalPage.waitForTimeout(2000);
    await expect (chiefpay.requestHasBeenSentModal).toBeVisible;
    await expect (chiefpay.okButtonInRequestHasBeenSentModal).toBeEnabled;
    await chiefpay.okButtonInRequestHasBeenSentModal.click();
    await expect (chiefpay.requestHasBeenSentModal).toBeHidden;


});

test('Cancel Modal Window checks', async () => {
    await chiefpay.cancelButton.click();
    await expect (chiefpay.cancelModal).toBeVisible;
    await expect (chiefpay.yesButtonInCancelModal).toBeEnabled;
    await expect (chiefpay.noButtonInCancelModal).toBeEnabled;
    await chiefpay.noButtonInCancelModal. click();
    await expect (chiefpay.cancelModal).toBeHidden;

});



test('I agree with transfer rules checkbox checks', async () => {
    await expect(chiefpay.transferredButton).toBeEnabled();
    await (chiefpay.iAgreeCheckbox).click();
    await expect(chiefpay.transferredButton).toBeDisabled();
    await (chiefpay.iAgreeCheckbox).click();
    await expect(chiefpay.transferredButton).toBeEnabled();

    await (chiefpay.transferRulesLink).click();
    await expect (chiefpay.transferRulesModal).toBeVisible();
    await expect(chiefpay.gotItButtonInTransferRules).toBeEnabled();
    await expect(chiefpay.xButtonInTransferRules).toBeEnabled();
    await chiefpay.xButtonInTransferRules.click();
    await expect (chiefpay.transferRulesModal).toBeHidden();


});

test('Locale change - main page', async () => {
    await chiefpay.changeLocaleButton.click();
    await chiefpay.ruButton.click();
    await globalPage.waitForTimeout(2000);
    const ruTextContent = await chiefpay.mainRuText.textContent();
    await expect(ruTextContent).toEqual('Перевод по QR-коду');

    await chiefpay.changeLocaleButton.click();
    await chiefpay.enButton.click();
    await globalPage.waitForTimeout(2000);
    const enTextContent = await chiefpay.mainEnText.textContent();
    await expect(enTextContent).toEqual('Transfer using QR-code');
});


test('Go to transferred  page', async () => {
    await expect(chiefpay.transferredButton).toBeEnabled();
    await chiefpay.transferredButton.click();
    await expect(chiefpay.transferredPageHeaderText).toBeVisible();

    const timer = (await chiefpay.transferredPageTimerRaw).split('');
    await expect(Number(timer[0])).toBeLessThanOrEqual(3);
});


test('Filling in email field on transferred  page', async () => {
    await chiefpay.emailInputOnTransferredPage.fill('auto_test_chiefpay_qr@test.com');
    await chiefpay.saveButton.click();
    await expect(chiefpay.pencilSign).toBeVisible();


});


