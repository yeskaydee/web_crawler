const { JSDOM } = require("jsdom");

async function crawlPage(currentURL){
    console.log(`Currently crawling  "${currentURL}" `)

    try{
        const resp = await fetch(currentURL)

        if(resp.status>399){
            console.log(`error in fetch with status code : ${resp.status} on page ${currentURL}`)
            return
        }  // Test:- https://hostname.in/garbagepath


        const contentType = resp.headers.get("content-type")
        if(!contentType.includes("text/html")){ //application/xml is other type, text/html may have other parts like UTF encoding =>includes()
            console.log(`not-html response, as content type : ${contentType} on page ${currentURL}`)
            return
        }// Test:- https://hostname.in/img.jpeg

        console.log(await resp.text())

    }catch(err){
        console.log(`error in fetch:- "${err.message}", on page "${currentURL}"` )
    }


}


function getURLSFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody); //string to obect like YAML and JSON
  const linkElements = dom.window.document.querySelectorAll("a"); //for list of a tags
  for (const linkElement of linkElements) {
    if(linkElement.href.slice(0,1)==='/'){
        // Relative URL
        try {const urlObj = new URL(`${baseURL}${linkElement.href}`)
        urls.push(urlObj.href) //stringified link
    }
    catch (err){
        console.log(`Error in the relative pat : ${err.message}`)
    }
    }
    else{
        //Absolute URL
        try {const urlObj = new URL(linkElement.href)
        urls.push(urlObj.href) //stringified link
        }
        catch (err){
            console.log(`Error in the absoulte path link  : ${err.message}`)
    }

        // urls.push(linkElement.href); //iterating through all
    }
  }
  return urls;
}

function normaliseURL(urlString) {
  const urlObj = new URL(urlString);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    //taking into to account ending slash
    return hostPath.slice(0, -1);
  }
  return hostPath;
}

module.exports = {
  //makes it available to other js
  getURLSFromHTML,
  normaliseURL,
  crawlPage
};
