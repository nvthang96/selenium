const axios = require('axios')
const jsdom = require('jsdom');
const { JSDOM } = jsdom;


const main = async () =>{
    const urlLogin = "https://m.facebook.com/login"
    const formLog = await axios.get(urlLogin)
    const dom = new JSDOM(formLog.data)

    const lsd = await dom.window.document.querySelector('input[name="lsd"]').value;
    const jazoest =await dom.window.document.querySelector('input[name="jazoest"]').value;
    const m_ts = await dom.window.document.querySelector('input[name="m_ts"]').value;
    const li = await dom.window.document.querySelector('input[name="li"]').value;
    const try_number = await dom.window.document.querySelector('input[name="try_number"]').value;
    const unrecognized_tries = await dom.window.document.querySelector('input[name="unrecognized_tries"]').value;
    const login = await dom.window.document.querySelector('input[name="login"]').value;
    const bi_xrwh = await dom.window.document.getElementById('bi_xrwh').value;
    
    console.log(formLog.headers['set-cookie'])
    const co = formLog.headers['set-cookie'].map(item =>{
        const c = item.split(";")
        return c[0]
    })
    const cookies =  co.join(";")
    const payload= {
        "lsd":lsd,
        "jazoest":jazoest,
        "m_ts":m_ts,
        "li":li,
        "try_number":"0",
        "unrecognized_tries":"0",
        "email":"trove.catbui.1996",
        "pass":"Khongdong12123",
        "login":login,
        "bi_xrwh":"0"
      }
    const urlP = 'https://mbasic.facebook.com/login/device-based/regular/login/?refsrc=deprecated&lwv=100&refid=8'
    const resPost = await  axios.post(urlP,payload,{
        headers:{
            "accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "content-type": "application/x-www-form-urlencoded",
            "origin": "https://mbasic.facebook.com",
            "cookie": cookies,
            "accept-language": "en-US,en;q=0.9"
        }
    })
    
    const isLogin = new JSDOM(resPost.data)
    console.log(resPost.data)
    const die = await isLogin.window.document.getElementById('login_error') ? await isLogin.window.document.getElementById('login_error').innerHTML :''
    const live = await isLogin.window.document.querySelector('table span.s') ? await isLogin.window.document.querySelector('table span.s').innerHTML :''
    const block = await isLogin.window.document.querySelector('div [title="You’re Temporarily Blocked"]')
    console.log(live)
    console.log(block)
}

main()