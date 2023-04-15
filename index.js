
const { Worker } = require('worker_threads');
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const proxy = require('selenium-webdriver/proxy');
const axios = require('axios');

const PROXY_HOST = '61.7.146.7';
const PROXY_PORT = '8082';

const proxyServer = `http://${PROXY_HOST}:${PROXY_PORT}`;
const proxyConfig = proxy.manual({
    // http: proxyServer,
    https: proxyServer
});

const capabilities = webdriver.Capabilities.chrome();
capabilities.setProxy(proxyConfig);
// Khởi tạo trình duyệt Chrome
// var listName
// async function data(callback){
//   const pkList = await axios.get('https://pokeapi.co/api/v2/pokemon')
//   console.log(pkList.data.results)
//   callback(pkList.data.results)
//   return pkList
// } 
// data((data)=>{
//   listName = data
// })

async function test(){
    const options = new chrome.Options();
    options.addArguments("--disable-notifications",'--disable-blink-features=AutomationControlled')
    // options.addArguments('--headless', '--disable-gpu', '--disable-dev-shm-usage', '--no-sandbox');
    const driver = await new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .withCapabilities(capabilities)
    .build();

// Đi đến trang web cần thao tác
await driver.get('https://www.facebook.com/');

// Tìm và click vào nút có id là "btnSubmit"
// const el = driver.findElement(webdriver.By.id('email'));
// const ac =await driver.wait(webdriver.until.elementLocated(webdriver.By.css('input[name="email"]')));
// const bt =await driver.wait(webdriver.until.elementLocated(webdriver.By.css('input[name="pass"]')));
// bt.sendKeys("thang")
// ac.sendKeys("ac")
// const log = await driver.wait(webdriver.until.elementLocated(webdriver.By.css('button[name="login"]')));
// log.getAttribute('outerHTML').then(html => console.log(html));
// console.log(bt)
// driver.executeScript(`
//     // console.log("AAAAAAAAAAA")
//     // console.log("BBBBBBBBBBBBBBBB",document.querySelector('input[name="email"]'))
//     // document.querySelector('input[name="email"]').value="thang"
//     setTimeout(() => {
//         const result = 'Hello, world!';
//         console.log(result)
//       }, 5000);
// `);

const setInput = async () =>{
    const username =await driver.wait(webdriver.until.elementLocated(webdriver.By.css('input[name="email"]')));
    const pass =await driver.wait(webdriver.until.elementLocated(webdriver.By.css('input[name="pass"]')));
    const loginClick = await driver.wait(webdriver.until.elementLocated(webdriver.By.css('button[name="login"]')));
    await username.sendKeys("100091441354667")
    await pass.sendKeys("handanba")
    await loginClick.click()
}
const waitUntilPageLoaded = async () => {
    await driver.wait(async () => {
      const readyState = await driver.executeScript('return document.readyState;');
      return readyState === 'complete';
    });
  };
  waitUntilPageLoaded().then( async ()=>{
    await setInput()
    const checkLogin = await driver.wait(webdriver.until.elementLocated(webdriver.By.css('div[aria-label="Messenger"]')));
    await driver.get('https://www.facebook.com/pages/creation/?ref_type=launch_point') 

        const pageName = await driver.wait(webdriver.until.elementLocated(webdriver.By.css('label[aria-label="Tên Trang (bắt buộc)"] input')));
        await pageName.sendKeys("Selela EmClacon")
        const category = await driver.wait(webdriver.until.elementLocated(webdriver.By.css('label[aria-label="Hạng mục (Bắt buộc)"] input')));
        await category.sendKeys("K")
        const pickRole = await driver.wait(webdriver.until.elementLocated(webdriver.By.css('ul[aria-label="7 gợi ý tìm kiếm"] li')));
        await pickRole.click()
        const createPage = await driver.wait(webdriver.until.elementLocated(webdriver.By.css('div[aria-label="Tạo Trang"]')));
        await createPage.click()
        // const choiceOption = await driver.wait(webdriver.until.elementLocated(webdriver.By.css('input[aria-label="Không có giờ làm việc"]')));
        // await choiceOption.click()
        // const btn_Next = await driver.wait(webdriver.until.elementLocated(webdriver.By.css('div[aria-label="Tiếp"]')));
        // console.log('btn_Next',btn_Next)
        // await btn_Next.click()
        // const img = await driver.wait(webdriver.until.elementLocated(webdriver.By.xpath('//*[@id="mount_0_0_YH"]/div/div[1]/div/div[5]/div/div/div[3]/div/div/div[1]/div[1]/div[1]/div/div[2]/div[1]/div[2]/div/div/div/div[1]/div/div/div/div/div/div/div/div/div/input')));
        await driver.get('https://www.facebook.com/pages/creation/?ref_type=launch_point')
        let alert = await driver.switchTo().alert();
        console.log(alert)
        await alert.dismiss();

    // console.log("checkLogin",img)

    // const checkURL = setInterval(async ()=>{
    //   const url = await driver.getCurrentUrl().then(function(url) {
    //     console.log(url);
    //     if(url=="https://www.facebook.com/?sk=welcome")
    //     {
    //       console.log("checked success!!")
    //       clearInterval(checkURL);
    //       driver.get('https://www.facebook.com/pages/creation/?ref_type=launch_point')
    //     }
    // });
    // },2000)
    
    // await driver.wait(until.elementLocated(By.xpath("//h1[contains(text(),'Welcome to the new page!')]")));
    // driver.get('https://www.facebook.com/pages/creation/?ref_type=launch_point') 
   
  })
}

// const test1 = (a,b) =>{
//     console.log("c=",a+b)
// } 
// const auth = await spawn(new Worker(test1))
// const hashed = await auth.test1(1,5)

// console.log("Hashed password:", hashed)

// await Thread.terminate(auth)
// thread1.run(test1(1,2)).then((result) => {
//     console.log(result); // Kết quả: 15
//   });
//   thread2.run(test1(5,5)).then((result) => {
//     console.log(result); // Kết quả: 15
//   });

test()

