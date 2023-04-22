const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const proxy = require('selenium-webdriver/proxy');
const socks = require("socks");
const PROXY_HOST = '202.29.215.78';
const PROXY_PORT = '8080';

const proxyServer = `http://${PROXY_HOST}:${PROXY_PORT}`;
const proxyConfig = proxy.manual({
    // http: proxyServer,
    https: proxyServer
});

const SOCKS4_HOST = "49.156.38.126"
const SOCKS4_PORT = "5678"


// Thiết lập proxy SOCKS4
const socksProxy = {
  ipaddress: SOCKS4_HOST,
  port: SOCKS4_PORT,
  type: 4
};



const capabilities = webdriver.Capabilities.chrome();
capabilities.setProxy(proxyConfig);


async function test(){
    const options = new chrome.Options();
    options.addArguments("--disable-notifications",'--disable-blink-features=AutomationControlled')
    // options.addArguments(`--proxy-server=socks4://${socksProxy.ipaddress}:${socksProxy.port}`);
    // options.addArguments('--headless', '--disable-gpu', '--disable-dev-shm-usage', '--no-sandbox');
    const driver = await new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    // .withCapabilities(proxyCapabilities)
    .build();

// Đi đến trang web cần thao tác
await driver.get('https://mbasic.facebook.com/login');
// await driver.get('https://checkip.com.vn/');
// const waitUntilPageLoaded = async () => {
//     await driver.wait(async () => {
//       const readyState = await driver.executeScript('return document.readyState;');
//       return readyState === 'complete';
//     });
//   };
//   waitUntilPageLoaded().then( async ()=>{
    
//   })
// }
// await logUpForm(driver)
// await setInput(driver)
}

const logUpForm = async (driver) =>{
    const btn_them =await driver.wait(webdriver.until.elementLocated(webdriver.By.xpath('//*[@id="login-view"]/div[2]/div/div[3]/div/button')));
    await btn_them.click()
    const btn_sigUp =await driver.wait(webdriver.until.elementLocated(webdriver.By.xpath('//*[@id="login-view"]/div[2]/div/div[4]/div/div/div/button[1]/div/div')));
    await btn_sigUp.click()
    
    
    const title =await driver.wait(webdriver.until.elementLocated(webdriver.By.xpath('//*[@id="dialog-title"]')));
    var btn_Select =await driver.wait(webdriver.until.elementsLocated(webdriver.By.css('button[title="Select"]')));
    console.log("check:",btn_Select)
    // btn_Select.getAttribute('outerHTML').then(html => console.log(html));
    
   
    // while (!checkBtnSelect || !checkBtnSelect.isDisplayed()) {
    //     checkBtnSelect = await driver.wait(webdriver.until.elementLocated(webdriver.By.css('button[title="Select"]')));
    // }
    const intervalBtnS= setInterval( async ()=>{
        try {
            
            await btn_Select[0].click()
            await clearInterval(intervalBtnS)
            const checkBox1 =await driver.wait(webdriver.until.elementLocated(webdriver.By.xpath('//*[@id="modal"]/div[2]/div/div/div/div[2]/div[1]/div/input')));
            await checkBox1.click()
            const checkBox2 =await driver.wait(webdriver.until.elementLocated(webdriver.By.xpath('//*[@id="modal"]/div[2]/div/div/div/div[2]/div[2]/div/input')));
            await checkBox2.click()
            const btn_OK =await driver.wait(webdriver.until.elementLocated(webdriver.By.xpath('//*[@id="modal"]/div[2]/div/div/div/div[3]/button[2]')));
            await btn_OK.click()
            
        } catch (error) {
            if(error)
            {
                console.log('bug')
                btn_Select = await driver.wait(webdriver.until.elementsLocated(webdriver.By.css('button[title="Select"]')))
            }
            
        }
    },1000)
    
    // await checkBtnSelect.click()
   
    
}

const setInput = async (driver) =>{
    const username =await driver.wait(webdriver.until.elementLocated(webdriver.By.xpath('//*[@id="signup-account-dialog"]/div/div[1]/div/div/div/div[1]/input')));
    console.log('check',username)
    await username.sendKeys("MegalonDon140396121")
    const pass =await driver.wait(webdriver.until.elementLocated(webdriver.By.css('input[aria-label="Set password"]')));
    await pass.sendKeys("Handanba111.")
    const passConfirm = await driver.wait(webdriver.until.elementLocated(webdriver.By.css('input[aria-label="Repeat password"]')));
    await passConfirm.sendKeys("Handanba111.")
    const checkBoxPolicy =await driver.wait(webdriver.until.elementLocated(webdriver.By.xpath('//*[@id="signup-account-dialog"]/div/div[3]/div/input')));
    const checkBoxOld =await driver.wait(webdriver.until.elementLocated(webdriver.By.xpath('//*[@id="signup-account-dialog"]/div/div[4]/div/input')));
    
    var checkUser =await driver.wait(webdriver.until.elementLocated(webdriver.By.xpath('//*[@id="signup-account-dialog"]/div/div[1]/small/div')));
    var checkCapCha = false
    const intervalCheckUser = setInterval(async () =>{
        if(checkUser){
            checkUser.getAttribute('outerHTML')
            .then(async (html) => {
                console.log('html',html)
                if(html==`<div class="mt-s">Email address is available.</div>`)
                {
                    console.log("User Success!")
                    clearInterval(intervalCheckUser)
                    const btn_Next =await driver.wait(webdriver.until.elementLocated(webdriver.By.css('button[title="Next"]')));
                    await btn_Next.click()
                    
                }else {
                    console.log("User false!")
                    checkUser =await driver.wait(webdriver.until.elementLocated(webdriver.By.xpath('//*[@id="signup-account-dialog"]/div/div[1]/small/div')));
                }
                
            })
        }
       
    },2000)

    await checkBoxPolicy.click()
    await checkBoxOld.click()

    
}

test()