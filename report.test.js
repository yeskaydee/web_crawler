const {sortPages} = require('./report.js')
const {test,expect} =  require('@jest/globals')



test('sortPages ',()=> {
    const input = {
        'https://google.com/santosh': 2,
        'https://google.com/google': 4
    }
    const actualOutput = sortPages(input)
    const expectedOutput =[
        ['https://google.com/google', 4],
        ['https://google.com/santosh', 2]
    ]  //array of arrays,=>  url and number
    expect(actualOutput).toEqual(expectedOutput)

})

test('sortMorePages ',()=> {
    const input = {
        'https://google.com/santosh': 2,
        'https://google.com/google': 4,
        'https://google.com/google/google': 1,
        'https://google.com/google/google/google': 3
    }
    const actualOutput = sortPages(input)
    const expectedOutput =[
        ['https://google.com/google', 4],
        ['https://google.com/google/google/google', 3],
        ['https://google.com/santosh', 2],
        ['https://google.com/google/google', 1]
    ]  //array of arrays,=>  url and number
    expect(actualOutput).toEqual(expectedOutput)

})