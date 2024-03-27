import {test, expect} from '@playwright/test';
import { createP2PRequestLink } from '../helpers/create_request_link';
import {UzPage} from "../pages/uz";

let globalPage;
const sum = '5000.00';
const currencyCode = '860';
const returnUrl = 'https://google.com';

let uz: UzPage;

test.beforeAll(async ({browser}, testInfo) => {
    const context = await browser.newContext();
    globalPage = await context.newPage();
    const baseUrl = await createP2PRequestLink({page: globalPage}, '18', 'send', sum, currencyCode, returnUrl, true, '123123', '123123');
    if( baseUrl !== undefined) {
        await globalPage.goto(baseUrl);
    }

    uz = new UzPage(globalPage);
});

test.afterAll(async () => {
    await globalPage.close();
});


test('Blocked user page elements are shown', async () => {
    await expect(uz.accountIsBlockedHeader).toBeVisible();
    await expect(uz.unlockMyAccountButton).toBeDisabled();
    await expect(uz.goToPersonalAccountButton).toBeEnabled();
    await expect(uz.unlockMyAccountButton).toBeDisabled();
    await uz.emailInputInBlockedUser.fill('auto_test_uz@test.com');
    // await uz.commentFieldInBlockedUser.fill('Test uz');
    await expect(uz.unlockMyAccountButton).toBeEnabled();
});


test('Locale change', async () => {
    const textContent = await uz.accountIsBlockedHeader.textContent();
    await expect(textContent).toEqual('Аккаунт заблокирован');

    await uz.changeLocaleButton.click();
    await uz.enButton.click();
    const newTextContent = await uz.accountIsBlockedHeader.textContent();
    await expect(newTextContent).toEqual('Account has been blocked');

    await uz.changeLocaleButton.click();
    await uz.uzButton.click();
    const new2TextContent = await uz.accountIsBlockedHeader.textContent();
    await expect(new2TextContent).toEqual('Akkaunt bloklandi');

});

test('Instruction modal window checks', async () => {

    await uz.instructionButton.click();
    await expect (uz.transferInstructionHeader).toBeVisible();
    await expect (uz.xButtonInInstructionModal).toBeVisible();
    await uz.xButtonInInstructionModal.click();
    await expect (uz.instructionButton).toBeVisible();
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

test('Unlock My Account Request Is Sent ', async () => {
    await uz.unlockMyAccountButton.click();
    await expect (uz.thanksForTheRequestText).toBeVisible();

});

//needs investigation
// test('Support chat can be opened', async () => {
//     await uz.supportChat.click();
//     await expect(uz.chatHeader).toBeVisible();
// });