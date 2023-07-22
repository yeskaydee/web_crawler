const { JSDOM } = require("jsdom");

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
};
