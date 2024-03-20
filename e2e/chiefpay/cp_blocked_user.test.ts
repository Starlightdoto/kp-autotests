import {test, expect} from '@playwright/test';
import { createSBPRequestLink } from '../helpers/create_request_link';
import {ChiefpayPage} from "../pages/chiefpay";
import { filePath } from "../helpers/data";

let globalPage;
const sum = '500.00';
const currencyCode = '643';
const returnUrl = 'https://google.com';

let chiefpay: ChiefpayPage;

test.beforeAll(async ({browser}, testInfo) => {
    const context = await browser.newContext();
    globalPage = await context.newPage();
    const baseUrl = await createSBPRequestLink({page: globalPage}, '18', 'send', sum, currencyCode, returnUrl, true, '123123', '123123');
    if( baseUrl !== undefined) {
        await globalPage.goto(baseUrl);
    }

    chiefpay = new ChiefpayPage(globalPage);

});

test.afterAll(async () => {
    await globalPage.close();
});

test('Blocked user page elements are shown', async () => {
    await expect(chiefpay.transferCancelledText).toBeVisible();
    await expect(chiefpay.goToPersonalAccountButton).toBeEnabled();
    await expect(chiefpay.changeLocaleButton).toBeEnabled();
    await expect(chiefpay.howToTransferButton).toBeEnabled();
    await expect(chiefpay.transferRulesButton).toBeEnabled();
    await expect(chiefpay.chatButton).toBeEnabled();
});

test('Locale change', async () => {
    await chiefpay.changeLocaleButton.click();
    await chiefpay.ruButton.click();
    await globalPage.waitForTimeout(2000);
    const ruTextContent = await chiefpay.transferCancelledRuText.textContent();
    await expect(ruTextContent).toEqual('Перевод отменён');

    await chiefpay.changeLocaleButton.click();
    await chiefpay.enButton.click();
    await globalPage.waitForTimeout(2000);
    const enTextContent = await chiefpay.transferCancelledEnText.textContent();
    await expect(enTextContent).toEqual('Transfer cancelled');

});

test('How to Transfer modal window checks', async () => {
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
    await chiefpay.commentInputInChatModal.fill('auto_test_chiefpay_blocked_user');
    await chiefpay.emailInputInChatModal.fill('auto_test_chiefpay_blocked_user@test.com');
    await globalPage.setInputFiles(chiefpay.attachFilesZoneInChatModalSelector, [
        filePath]);
    await chiefpay.submitButtonInChatModal.click();
    await globalPage.waitForTimeout(2000);
    await expect (chiefpay.requestHasBeenSentModal).toBeVisible;
    await expect (chiefpay.okButtonInRequestHasBeenSentModal).toBeEnabled;
    await chiefpay.okButtonInRequestHasBeenSentModal.click();
    await expect (chiefpay.requestHasBeenSentModal).toBeHidden;

});