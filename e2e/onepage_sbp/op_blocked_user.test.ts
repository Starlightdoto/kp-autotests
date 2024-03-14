import {test, expect} from '@playwright/test';
import { createSBPRequestLink } from '../helpers/create_request_link';
import { OnePage } from '../pages/onePage';

let globalPage;
const sum = '500.00';
const currencyCode = '643';
const returnUrl = 'https://google.com';

let onePage: OnePage;

test.beforeAll(async ({browser}, testInfo) => {
    const context = await browser.newContext();
    globalPage = await context.newPage();
    const baseUrl = await createSBPRequestLink({page: globalPage}, '18', 'send', sum, currencyCode, returnUrl, true, '123123', '123123');
    if( baseUrl !== undefined) {
        await globalPage.goto(baseUrl);
    }

    onePage = new OnePage(globalPage);
});

test.afterAll(async () => {
    await globalPage.close();
});


test('Blocked user page elements are shown', async () => {
    await expect(onePage.accountIsBlockedHeader).toBeVisible();
    await expect(onePage.unlockMyAccountButton).toBeDisabled();
    await expect(onePage.goToPersonalAccountButton).toBeEnabled();
    await onePage.emailInputInBlockedUser.fill('auto_test_onepage@test.com');
    await expect(onePage.unlockMyAccountButton).toBeDisabled();
    await onePage.commentFieldInBlockedUser.fill('Test one_page');
    await expect(onePage.unlockMyAccountButton).toBeEnabled();
});


test('Locale change', async () => {
    const textContent = await onePage.accountIsBlockedHeader.textContent();
    await expect(textContent).toEqual('Аккаунт заблокирован');

    await onePage.changeLocaleButton.click();
    await onePage.enButton.click();
    const newTextContent = await onePage.accountIsBlockedHeader.textContent();
    await expect(newTextContent).toEqual('Account has been blocked');

    await onePage.changeLocaleButton.click();
    await onePage.uzButton.click();
    const new2TextContent = await onePage.accountIsBlockedHeader.textContent();
    await expect(new2TextContent).toEqual('Akkaunt bloklandi');

    await onePage.changeLocaleButton.click();
    await onePage.ruButton.click();
});


test('Help modals are shown', async () => {
    await onePage.helpButton.click();
    await expect (onePage.transferInstruction).toBeVisible();
    await expect (onePage.statusInstruction).toBeVisible();
    await expect (onePage.xButtonInHelpModal).toBeVisible();
    await onePage.transferInstruction.click();
    await expect (onePage.transferModal).toBeVisible();
    await onePage.transferInstruction.click();
    await expect (onePage.transferModal).toBeHidden();
    await onePage.statusInstruction.click();
    await expect (onePage.statusModal).toBeVisible();
    await onePage.statusInstruction.click();
    await expect (onePage.statusModal).toBeHidden();
    await onePage.xButtonInHelpModal.click();
    await expect (onePage.helpButton).toBeVisible();
});


test('Transfer rules modal is shown', async () => {
    await onePage.transferRulesButton.click();
    await expect (onePage.transferRulesModal).toBeVisible();
    await expect(onePage.okButtonInTransferRulesModal).toBeEnabled();
    await expect(onePage.attachingBankReceiptButton).toBeEnabled();
    await expect(onePage.xButtonInTransferRulesModal).toBeEnabled();
    await onePage.xButtonInTransferRulesModal. click();
    await expect (onePage.transferRulesModal).toBeHidden();
    await onePage.transferRulesButton.click();
    await expect (onePage.transferRulesModal).toBeVisible();
    await onePage.okButtonInTransferRulesModal.click();
    await expect (onePage.transferRulesModal).toBeHidden();
});



//needs investigation
// test('Support chat can be opened', async () => {
//     await onePage.supportChat.click();
//     await expect(onePage.chatHeader).toBeVisible();
// });