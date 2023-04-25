const fs = require('fs');



const startDivide = async (filePath,count,nameFile,keyFirst,keySec) =>{
    const content = await fs.readFileSync(filePath, { encoding: 'utf-8' });
    const lines = content.split('\n');
    divide(lines,count,nameFile,keyFirst,keySec)
   }
  
  const divide = async (result,count,nameFile,keyFirst,keySec) =>{
      const space = Math.floor(result.length / count)
      const residual =  result.length - (space*count)
      for(let i = 0;i<=count;i++)
      {
        if(i<count)
        {
          const temp =[]
          await fs.writeFile(`${nameFile}${i}.json`, JSON.stringify(temp), 'utf8', (err) => {
            if (err) {
              console.error(err);
              return;
            }
          })
            for(let j = (space*i);j < space*(i+1) ;j++)
            {
                const [key1, key2] = await result[j].split(':');
                await temp.push({'PROXY_HOST':key1,'PROXY_PORT':key2})
                
            }
            await fs.writeFile(`${nameFile}${i}.json`,JSON.stringify(temp),'utf8', function (err) {
                  if (err) throw err;
                  console.log('File saved!');
                });
        }else if(i==count) {
          const temp =[]
          await fs.writeFile(`${nameFile}${i}.json`, JSON.stringify(temp), 'utf8', (err) => {
            if (err) {
              console.error(err);
              return;
            }
          })
            for(let j = result.length - residual; j < result.length; j++)
            {
                const [keyFirst, keySec] = await result[j].split(':');
                await temp.push({keyFirst:keyFirst,keySec:keySec})
            }
              await fs.writeFile(`${nameFile}${i}.json`,JSON.stringify(temp),'utf8', function (err) {
                  if (err) throw err;
                  console.log('File saved!');
                });
        }
        }
  }
  startDivide("36989.txt",10,'newProxy','email','password')