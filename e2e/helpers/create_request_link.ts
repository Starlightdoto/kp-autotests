const baseUrl = 'https://api.kiberpay.com/api/test/test';

export const createSBPRequestLink = async ({page}) => {
    await page.goto(baseUrl);


    await page.fill('body > form > p:nth-child(1) > input[type=text]', 'Mylink');
    
    await page.fill('body > form > p:nth-child(2) > input[type=password]', 'SuperLink');
    
    await page.selectOption("body > form > p:nth-child(3) > select", {
         value: "19" });
    
        await page.selectOption("body > form > p:nth-child(4) > select", {
         value: "send"});
    
    await page.fill('body > form > p:nth-child(5) > input[type=text]', '1000');
    
    await page.selectOption("body > form > p:nth-child(6) > select", {
             value: "643"});
             
    
    const p2pCheckbox = page.locator ("id=p2p");
    const sbpCheckbox = page.locator ("id=sbp");
    await p2pCheckbox.click();
    await sbpCheckbox.check();
    await page.click ("body > form > p:nth-child(43) > input[type=submit]");
}

    