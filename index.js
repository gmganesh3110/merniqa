// const fs=require('fs')
// const path=require('path')
// const inputFile=path.join(__dirname,'input.txt')
// const outputFile=path.join(__dirname,'output.txt')

// const readStream=fs.createReadStream(inputFile,{encoding:'utf-8'})
// const writeStream=fs.createWriteStream(outputFile,{encoding:'utf-8'})

// let wordsCount=0;
// let leftOver=''
// readStream.on('data',(chunk)=>{
//     writeStream.write(chunk)
//     const text=leftOver+chunk;
//     const words=text.split(/\s+/)
//     leftOver=words.pop()||'';
//     wordsCount+=words.filter(Boolean).length
// })
// readStream.on('end',()=>{
//     if(leftOver.trim()) wordsCount++;
//     console.log("Reading complted")
//     console.log(wordsCount)
// })

// readStream.on('error',(err)=>{
//     console.log(err)
// })
// writeStream.on('error',(err)=>{
//     console.log(err)
// })

// writeStream.on('finish',()=>{
//     console.log('Writing finished')
// })

// const urls = [
//   "https://jsonplaceholder.typicode.com/posts/1",
//   "https://jsonplaceholder.typicode.com/posts/2",
//   "https://jsonplaceholder.typicode.com/invalid", // this will fail
//   "https://jsonplaceholder.typicode.com/posts/4",
//   "https://jsonplaceholder.typicode.com/posts/5",
// ];

// async function fetchAllUrl(urls) {
//   const result = await Promise.allSettled(
//     urls.map(async (url) => {
//       const res = await fetch(url);
//       if (!res.ok) throw new Error("Error" + res.status);
//       return res.json();
//     })
//   );
//   return (await result).map((r) => {
//         if(r.status==='fulfilled'){
//             return r.value
//         }
//         else{
//             return r.status
//         }
//   });
// }

// fetchAllUrl(urls)
//   .then((output) => {
//     console.log(output);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// const urls = [
//   'http://jsonplaceholder.typicode.com/posts/1',
//   'http://jsonplaceholder.typicode.com/posts/2',
//   'http://jsonplaceholder.typicode.com/posts/invalidcode',
//   'http://jsonplaceholder.typicode.com/posts/4',
//   'http://jsonplaceholder.typicode.com/posts/5',
// ];
// async function fetchAllUrl(urls) {
//   const result = await Promise.allSettled(
//     urls.map(async (url) => {
//       const res = await fetch(url);
//       if (!res.ok) throw new Error("API Error" + res.status);
//       return res.json();
//     })
//   );
//   return result.map((res) => {
//     return res.status === "fulfilled" ? res.value : res.status;
//   });
// }
// fetchAllUrl(urls)
//   .then((output) => console.log(output))
//   .catch((err) => console.log(err));

const fs=require('fs')
const path=require('path')

const inputFile=path.join(__dirname,'input.txt')

const outputFile=path.join(__dirname,'output.txt')


const readStream=fs.createReadStream(inputFile,{encoding:'utf-8'})
const writeStream=fs.createWriteStream(outputFile,{encoding:'utf-8'})
let wordsCount=0;
let leftText=''
readStream.on('data',(chunk)=>{
  writeStream.write(chunk)
  const text=leftText+chunk;
  const words=text.split(/\s+/);
  leftText=words.pop()||''
  wordsCount+=words.filter(Boolean).length;
})

readStream.on('end',()=>{
  if(leftText.trim()) wordsCount++;
  console.log("Words",wordsCount)
})

writeStream.on('error',(err)=>{
  console.log(err)
})
readStream.on('error',(err)=>{
  console.log(err)
})

writeStream.on('finish',()=>{
  console.log("Wrinting ginished")
})