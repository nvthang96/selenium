const { Worker } = require("worker_threads");
const fs = require('fs');

// const express = require('express')
// const app = express()

// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

// app.listen(3000)








const multiThread =async (count) =>{
  for(let i = 0;i <= count;i++)
  {
    await fs.writeFile(`./Result/die/die${i}.json`, JSON.stringify([]), 'utf8', (err) => {
      if (err) {
        console.error(err);
        return;
      }
    })
    await fs.writeFile(`./Result/live/live${i}.json`, JSON.stringify([]), 'utf8', (err) => {
      if (err) {
        console.error(err);
        return;
      }
    })


    const seprateThread = new Worker('./checkMBasic.js');
    const data = await fs.readFileSync(`newData${i}.json`, { encoding: 'utf-8' });
    const proxy = await fs.readFileSync(`newProxy${i}.json`, { encoding: 'utf-8' });
    const obj = {
      data:data,
      proxy:proxy,
      count:i
    }
    seprateThread.postMessage(obj)
  }
  }
  
//  const startDivide = async (count) =>{
//   const filePath = 'listacc.txt'
//   const content = await fs.readFileSync(filePath, { encoding: 'utf-8' });
//   const lines = content.split('\n');
//   divide(lines,count)
//  }

// const divide = async (result,count) =>{
//     const space = Math.floor(result.length / count)
//     const residual =  result.length - (space*count)
//     console.log('residual',residual)
//     console.log("lengh",result.length)
//     for(let i = 0;i<=count;i++)
//     {
//       if(i<count)
//       {
//         const temp =[]
//         await fs.writeFile(`newData${i}.json`, JSON.stringify(temp), 'utf8', (err) => {
//           if (err) {
//             console.error(err);
//             return;
//           }
//         })
//           for(let j = (space*i);j < space*(i+1) ;j++)
//           {
//               const [email, password] = await result[j].split(':');
//               await temp.push({email:email,password:password})
              
//           }
//           //  await seprateThread.postMessage(ar)
//           await fs.writeFile(`newData${i}.json`,JSON.stringify(temp),'utf8', function (err) {
//                 if (err) throw err;
//                 console.log('File saved!');
//               });
//       }else if(i==count) {
//         const temp =[]
//         await fs.writeFile(`newData${i}.json`, JSON.stringify(temp), 'utf8', (err) => {
//           if (err) {
//             console.error(err);
//             return;
//           }
//         })
//           for(let j = result.length - residual; j < result.length; j++)
//           {
//               const [email, password] = await result[j].split(':');
//               await temp.push({email:email,password:password})
//           }
//           //  await seprateThread.postMessage(ar)
//             await fs.writeFile(`newData${i}.json`,JSON.stringify(temp),'utf8', function (err) {
//                 if (err) throw err;
//                 console.log('File saved!');
//               });
//       }
//       }
// }
// startDivide(50)
multiThread(50)