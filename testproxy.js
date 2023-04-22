const axios = require('axios');
const HttpsProxyAgent = require('https-proxy-agent');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

  const proxyAgent = new HttpsProxyAgent(`http://167.99.228.174:12001`);
 
  const axiosInstance = axios.create({
    httpsAgent: proxyAgent,
    withCredentials: true,
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



const getHtmlCookie =async (axiosModify,type) =>{
  const urlCookie = "https://mbasic.facebook.com/login"
    const option = {
    headers:{
      accept: `text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7`,
      cookie:'datr=2HBDZHhW7GGmtFtto5qHnjy2',
      "accept-language": `en-US,en;q=0.9`
    }
  }
  const cookieDatr = 'datr=2HBDZHhW7GGmtFtto5qHnjy2'
  const siteCookie = await axiosModify.get(urlCookie,option)
  const dom = new JSDOM(siteCookie.data)
  console.log(siteCookie)
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
          "email":"sssssssssssss",
          "pass":"sssssssssssss",
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
      "accept-language": `en-US,en;q=0.9`
    }
  })
  return res
}

const main =async () =>{
  const {payload,cookies,siteCookie,userAgent} = await getHtmlCookie(axiosInstance,'')
  console.log(payload)
  const res = await postCookie(payload,cookies,axiosInstance,userAgent)
  console.log(res.data)
}
main()