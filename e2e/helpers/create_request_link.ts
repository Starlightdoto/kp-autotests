const baseUrl = 'https://api.kiberpay.com/api/test/test';

const loginLocator = 'body > form > p:nth-child(1) > input[type=text]';
const passwordLocator = 'body > form > p:nth-child(2) > input[type=password]';
const login = 'Mylink';
const password = 'SuperLink';
const merchantSelectorLocator = 'body > form > p:nth-child(3) > select';
const versionSelectorLocator = 'body > form > p:nth-child(4) > select';
const sumLocator = 'body > form > p:nth-child(5) > input[type=text]';
const currencySelectorLocator = 'body > form > p:nth-child(6) > select';
const p2pCheckboxLocator = 'id=p2p';
const sbpCheckboxLocator = 'id=sbp';
const submitButtonLocator = 'body > form > p:nth-child(43) > input[type=submit]';
const returnUrl = 'https://google.com';

export const createSBPRequestLink = async ({page}, merchant, version, sum, currency) => {
    await page.goto(baseUrl);

    await page.fill(loginLocator, login);

    await page.fill(passwordLocator, password);

    await page.selectOption(merchantSelectorLocator, {
         value: merchant });
    
    await page.selectOption(versionSelectorLocator, {
         value: version});

    await page.fill(sumLocator, sum);
    
    await page.selectOption(currencySelectorLocator, {
             value: currency});

    const sbpCheckbox = await page.locator(sbpCheckboxLocator);
    const p2pCheckbox = await page.locator(p2pCheckboxLocator);
    await p2pCheckbox.click();
    await sbpCheckbox.check();
    await page.click(submitButtonLocator);
    await page.goto(`https://api.kiberpay.com/api/test/inrequest?login=${login}&pas=${password}&id_merch=${merchant}&pspname=${version}&amount=${sum}&currency=${currency}&rate=0&fee=0&amount_edit=true&sbp=true&qr_bank=4&callback_url=&success_url=&fail_url=&return_url=${returnUrl}&merchant_uid=&customer_uid=&customer_acc=&mail=&test=%7B%7D&q=Send`);
    const requestUrl = await page.locator('body > p:nth-child(2) > a').textContent();
    return requestUrl;
}

    