import {test, expect} from '@playwright/test';
import { createSBPRequestLink } from './helpers/create_request_link';
import {currencies} from "./helpers/currencies";

let globalPage;
const sum = '500.00';
const currencyCode = '643';

test.beforeAll(async ({browser}, testInfo) => {
    const context = await browser.newContext();
    globalPage = await context.newPage();
    const baseUrl = await createSBPRequestLink({page: globalPage}, '18', 'send', sum, currencyCode);
    if( baseUrl !== undefined) {
        await globalPage.goto(baseUrl);
    }
});

test.afterAll(async () => {
    await globalPage.close();
});

test('Popup closing', async () => {
    const popupButton = globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[3]/div/div[3]/div[2]/div[2]');
    await expect(popupButton).toBeVisible();
    await globalPage.click('//*[@id="app"]/div[1]/div[1]/div[3]/div/div[3]/div[2]/div[2]');
    await expect(popupButton).toBeHidden();
});


test('Check amount', async () => {
    const amount = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[1]/div[2]/div/p').textContent();
    console.log(amount);
    await expect(`${amount}`).toEqual('500.00 ₽');
});


test('Phone number is visible', async () => {
    const phoneNumber = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[2]/div[1]/div[2]/div[1]/div/p');
    await expect(phoneNumber).toBeVisible();
});

test('Transfer completed button is active', async () => {
    const completeButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[2]/div[3]/div/button');
    await expect(completeButton).toBeEnabled();
});

test('Back  button is active', async () => {
    const completeButton = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[2]/div[3]/button');
    await expect(completeButton).toBeEnabled();
});

test('Locale change', async () => {
    const changeLocaleButton = await globalPage.locator('//*[@id="pv_id_2"]');
    const enButton = await globalPage.locator('//*[@id="pv_id_2_1"]/div/div');
    const uzButton = await globalPage.locator('//*[@id="pv_id_2_2"]/div/div');
    const ruButton = await globalPage.locator('//*[@id="pv_id_2_0"]/div/div');
    await changeLocaleButton.click();
    await enButton.click();
    await globalPage.waitForTimeout(2000);
    const mainEnText = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[1]/div[2]/p').textContent();
    await expect(mainEnText).toEqual('Transfer the exact amount:');
    await changeLocaleButton.click();
    await uzButton.click();
    await globalPage.waitForTimeout(2000);
    const mainUzText = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[1]/div[2]/p').textContent();
    await expect(mainUzText).toEqual('Belgilangan miqdorni otkazing:');
    await changeLocaleButton.click();
    await ruButton.click();
    await globalPage.waitForTimeout(2000);
    const mainRuText = await globalPage.locator('//*[@id="app"]/div[1]/div[1]/div[4]/div/div[2]/div/div[1]/div[2]/p').textContent();
    await expect(mainRuText).toEqual('Переведите точную сумму:');
});

    

