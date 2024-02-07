import {test, expect} from '@playwright/test';
import { createSBPRequestLink } from '../helpers/create_request_link';
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


test('Check amount', async () => {
    const amount = await globalPage.locator('//*[@id="app"]/div[1]/main/div[1]/div[2]/div/div[2]/p[1]').textContent();
    await expect(`${amount}`).toEqual('500.00 ₽');
    const timerRaw = await globalPage.locator('//*[@id="app"]/div[1]/header/div/div/div[2]/p').textContent();
    const timer = timerRaw.split('');
    await expect(Number(timer[0])).toBeLessThanOrEqual(10);
});


test('Phone number is visible', async () => {
    const phoneNumber = await globalPage.locator('//*[@id="app"]/div[1]/main/div[1]/div[1]/div/p[1]');
    await expect(phoneNumber).toBeVisible();
});


test('Transferred button is active', async () => {
    const TransferredButton = await globalPage.locator('//*[@id="app"]/div[1]/main/div[1]/div[4]/button[2]');
    await expect(TransferredButton).toBeEnabled();
});


test('Cancel button is active', async () => {
    const cancelButton = await globalPage.locator('//*[@id="app"]/div[1]/main/div[1]/div[4]/button[1]');
    await expect(cancelButton).toBeEnabled();
});

test('Cancel Modal Window checks', async () => {
    const cancelButton = await globalPage.locator('//*[@id="app"]/div[1]/main/div[1]/div[4]/button[1]');
    await cancelButton.click();

    const cancelModal = await globalPage.locator ('//*[@id="app"]/div[1]/main/div[2]/div/div/div[2]');
    const yesButton = await globalPage.locator('#app > div.mx-auto.flex.h-full.flex-col.justify-between > main > div:nth-child(2) > div > div > div.py-10.px-8 > div.flex.items-center.justify-between.gap-x-4 > button.text-\\[\\#FF001F\\].dark\\:text-\\[\\#FF6161\\].bg-white.dark\\:bg-\\[\\#1C1C1C\\].border.border-\\[\\#FF6161\\].outline-none.py-3.px-3.xs\\:px-4.text-xl.font-semibold.rounded-\\[70px\\].w-full.sm\\:hover\\:shadow-\\[0_2px_8px_0_rgba\\(0\\,0\\,0\\,0\\.25\\)\\].transition-shadow');
    const noButton = await globalPage.locator('#app > div.mx-auto.flex.h-full.flex-col.justify-between > main > div:nth-child(2) > div > div > div.py-10.px-8 > div.flex.items-center.justify-between.gap-x-4 > button.text-white.bg-\\[\\#18325A\\].outline-none.py-3.px-3.xs\\:px-4.text-xl.font-semibold.rounded-\\[70px\\].w-full.sm\\:hover\\:shadow-\\[0_2px_8px_0_rgba\\(0\\,0\\,0\\,0\\.25\\)\\].transition-shadow');
    await expect (cancelModal).toBeVisible;
    await expect (yesButton).toBeEnabled;
    await expect (noButton).toBeEnabled;
    await noButton. click();
    await expect (cancelModal).toBeHidden;

});