const {normaliseURL,getURLSFromHTML} = require('./crawl.js')
const {test,expect} =  require('@jest/globals')



test('normaliseURL strip the (all) protocol',()=> {
    const input = 'https://google.com/santosh'
    const actualOutput = normaliseURL(input)
    const expectedOutput ='google.com/santosh'
    expect(actualOutput).toEqual(expectedOutput)

})

test('normaliseURL remove ending slash',()=> {
    const input = 'https://google.com/santosh/'
    const actualOutput = normaliseURL(input)
    const expectedOutput ='google.com/santosh'
    expect(actualOutput).toEqual(expectedOutput)

})

test('normaliseURL capitals are normalised',()=> {
    const input = 'https://GOOGLE.com/santosh/'
    const actualOutput = normaliseURL(input)
    const expectedOutput ='google.com/santosh'
    expect(actualOutput).toEqual(expectedOutput)
})



test('getURLSFromHTML ~exact same ',()=> { // to get all the urls from the webpage
    const inputHTMLBody = `
    <html>
        <body>
        <a href="https://www.google.com/santosh/"> 
        google
        </a>
        </body>
    </html>    
    `

    const inputBaseURL = "https://www.google.com/santosh/"
    const actualOutput = getURLSFromHTML(inputHTMLBody, inputBaseURL)
    const expectedOutput =["https://www.google.com/santosh/"]
    expect(actualOutput).toEqual(expectedOutput)
}) 

test('getURLSFromHTML ~relative => path ',()=> { // to get all the urls from the webpage
    const inputHTMLBody = `
    <html>
        <body>
        <a href="/santosh/"> 
        google
        </a>
        </body>
    </html>    
    `

    const inputBaseURL = "https://www.google.com"
    const actualOutput = getURLSFromHTML(inputHTMLBody, inputBaseURL)
    const expectedOutput =["https://www.google.com/santosh/"]
    expect(actualOutput).toEqual(expectedOutput)
})


test('getURLSFromHTML ~both => path ',()=> { // to get all the urls from the webpage
    const inputHTMLBody = `
    <html>
        <body>
        <a href="https://www.google.com/santosh1/"> 
        google 1
        </a>
        <a href="/santosh2/"> 
        google 2
        </a>
        <a href="/santosh3/"> 
        google 3
        </a>
        </body>
    </html>    
    `

    const inputBaseURL = "https://www.google.com"
    const actualOutput = getURLSFromHTML(inputHTMLBody, inputBaseURL)
    const expectedOutput =["https://www.google.com/santosh1/","https://www.google.com/santosh2/","https://www.google.com/santosh3/"]
    expect(actualOutput).toEqual(expectedOutput)
})

test('getURLSFromHTML ~Invalid URL => path ',()=> { // to get all the urls from the webpage
    const inputHTMLBody = `
    <html>
        <body>
        <a href="invalid_url"> 
        Invalid URL
        </a>
        </body>
    </html>    
    `

    const inputBaseURL = "https://www.google.com"
    const actualOutput = getURLSFromHTML(inputHTMLBody, inputBaseURL)
    const expectedOutput =[]
    expect(actualOutput).toEqual(expectedOutput)
})