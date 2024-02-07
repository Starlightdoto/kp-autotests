import {test, expect} from '@playwright/test';
import { createSBPRequestLink } from '../helpers/create_request_link';

let globalPage;
const sum = '500.00';
const currencyCode = '643';
const returnUrl = 'https://google.com';


test.beforeAll(async ({browser}, testInfo) => {
    const context = await browser.newContext();
    globalPage = await context.newPage();
    const baseUrl = await createSBPRequestLink({page: globalPage}, '18', 'send', sum, currencyCode, returnUrl, true, '123123', '123123');
    if( baseUrl !== undefined) {
        await globalPage.goto(baseUrl);
    }
});

test.afterAll(async () => {
    await globalPage.close();
});

test('Blocked user page elements are shown', async () => {
    const transferCancelledText = await globalPage.locator('//*[@id="app"]/div[1]/main/div[1]/h1');
    await expect(transferCancelledText).toBeVisible();
    const goToPersonalAccountButton = await globalPage.locator('//*[@id="app"]/div[1]/main/div[1]/button');
    await expect(goToPersonalAccountButton).toBeEnabled();
    const languageButton = await globalPage.locator('//*[@id="app"]/div[1]/header/div/div/div/div[1]/p');
    await expect(languageButton).toBeEnabled();
    const instructionButton = await globalPage.locator('//*[@id="app"]/div[1]/header/div/div/div/div[2]/p');
    await expect(instructionButton).toBeEnabled();
    const transferRulesButton = await globalPage.locator('//*[@id="app"]/div[1]/header/div/div/div/div[3]/p');
    await expect(instructionButton).toBeEnabled();
    const chatButton = await globalPage.locator('//*[@id="app"]/div[1]/header/div/div/div/div[4]/p');
    await expect(instructionButton).toBeEnabled();
});

test('Locale change', async () => {
    const headerTextEn = await globalPage.locator('//*[@id="app"]/div[1]/main/div[1]/h1').textContent();
    await expect(headerTextEn).toEqual('Transfer cancelled');
    const changeLanguageButton = await globalPage.locator('//*[@id="app"]/div[1]/header/div/div/div/div[1]/p');
    await changeLanguageButton.click();
    const ruLanguageButton = await globalPage.locator('//*[@id="app"]/div[1]/header/div/div/div/div[5]/p[1]');
    await ruLanguageButton.click();
    const headerTextRu = await globalPage.locator('//*[@id="app"]/div[1]/main/div[1]/h1').textContent();
    await expect(headerTextRu).toEqual('Перевод отменён');
    await changeLanguageButton.click();
    const enLanguageButton = await globalPage.locator('//*[@id="app"]/div[1]/header/div/div/div/div[5]/p[2]');
    await enLanguageButton.click();
});

test('Instruction modal open and close', async () => {
    const instructionButton = await globalPage.locator('//*[@id="app"]/div[1]/header/div/div/div/div[2]/p');
    await instructionButton.click();
    const instructionModal = await globalPage.locator('//*[@id="app"]/div[1]/main/div[5]/div/div');
    await expect(instructionModal).toBeVisible();
    const okButton = await globalPage.locator('//*[@id="app"]/div[1]/main/div[5]/div/div/div[2]/button');
    await okButton.click();
    await expect(instructionModal).toBeHidden();
});

test('Transfer rules modal open and close', async () => {
    const transferRulesButton = await globalPage.locator('//*[@id="app"]/div[1]/header/div/div/div/div[3]/p');
    await transferRulesButton.click();
    const transferRulesModal = await globalPage.locator('//*[@id="app"]/div[1]/main/div[8]/div/div');
    await expect(transferRulesModal).toBeVisible();
    const okButton = await globalPage.locator('//*[@id="app"]/div[1]/main/div[8]/div/div/div[2]/button');
    await okButton.click();
    await expect(transferRulesModal).toBeHidden();
});


test('Chat modal open and close', async () => {
    const chatButton = await globalPage.locator('//*[@id="app"]/div[1]/header/div/div/div/div[4]/p');
    await chatButton.click();
    const chatModal = await globalPage.locator('//*[@id="app"]/div[1]/main/div[3]/div/div');
    await expect(chatModal).toBeVisible();
    const cancelButton = await globalPage.locator('//*[@id="app"]/div[1]/main/div[3]/div/div/div[2]/div[5]/button[2]');
    await cancelButton.click();
    await expect(chatModal).toBeHidden();
});


test('Chat submit problem', async () => {
    const chatButton = await globalPage.locator('//*[@id="app"]/div[1]/header/div/div/div/div[4]/p');
    await chatButton.click();
    const commentField = await globalPage.locator('//*[@id="app"]/div[1]/main/div[3]/div/div/div[2]/div[2]/textarea');
    await commentField.fill('Test test');
    const emailField = await globalPage.locator('//*[@id="app"]/div[1]/main/div[3]/div/div/div[2]/div[3]/div/input');
    await emailField.fill('auto_test_chiefpay@test.com');
    await globalPage.setInputFiles('//*[@id="app"]/div[1]/main/div[3]/div/div/div[2]/div[4]/div/input', [
        'assets/receipts/receipt1.png'
    ]);
    await globalPage.waitForTimeout(4000);
    const submitButton = await globalPage.locator('//*[@id="app"]/div[1]/main/div[3]/div/div/div[2]/div[5]/button[1]');
    await submitButton.click();
    const finalModal = await globalPage.locator('//*[@id="app"]/div[1]/main/div[4]/div/div');
    await expect(finalModal).toBeVisible();
    await globalPage.waitForLocator('//*[@id="app"]/div[1]/main/div[4]/div/div/div[2]/div[1]/p');
    const okButton = await globalPage.locator('//*[@id="app"]/div[1]/main/div[4]/div/div/div[2]/button');
    await okButton.click();
    await expect(finalModal).toBeHidden();
});