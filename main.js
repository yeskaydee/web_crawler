const {crawlPage} = require('./crawl.js')
const {printReport} = require('./report.js')


async function main(){
    if (process.argv.length<3){
        console.log("seems invalid")
        process.exit(1) // more research to be done regarding the process
    }
    if (process.argv.length>3){
        console.log("give one url at a time")
        process.exit(1) // more research to be done regarding the process
    }
    const baseURL=process.argv[2]


    console.log(`🕷️ Spider Crawls the ${baseURL} `)
    const pages = await crawlPage(baseURL,baseURL,{}) //currentURL at starrt is baseURL , {} empty object for pages

    printReport(pages)

}

main() 
 