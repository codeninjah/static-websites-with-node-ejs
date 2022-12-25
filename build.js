const ejs = require('ejs')
const path = require('path')
const fs = require('fs')

const albums = fs.readFileSync('./assets/albums.json', {encoding: 'utf8'})
const albumsParsed = JSON.parse(albums).albums

let pages = []
let pageObject = {}
let content = []

//For test purposes
//console.log(albumsParsed)

//Creating pagination
//Source code: 
//https://github.com/renzosantamaria/static-website-with-node/blob/main/build.js
for(let i = 0; i < albumsParsed.length; i++){
    content.push(albumsParsed[i])

    if(i % 20 == 0 && i != 0 || i == albumsParsed.length - 1) {
        pageObject['fileName'] = `${i-19}-${i}.html`
        pageObject['template'] = `${i-19}-${i}.ejs`
        pageObject['albumsParsed'] = content
        pages.push(pageObject)
        content = []
        pageObject = {}
    }
}


const templatePath = path.join("views", "layout.ejs")

const outputDir = "dist"

for (let page of pages){
    const data = {page, pages}
    ejs.renderFile(templatePath, data, function(err,str){
        if(err){
            console.log(err)
        }
        else {
            const outputPath = path.join(outputDir, page.fileName)
            fs.writeFileSync(outputPath, str)
            console.log("Done with " + page.fileName)
        }
    })
}

/*
//This was the code to output all albums on one page
ejs.renderFile(templatePath, {albums: albumsParsed.albums}, function(err, str){
    if(err){
        console.log(err)
    }
    else{
        const outputPath = path.join(outputDir, "index.html")
        fs.writeFileSync(outputPath, str)
    }
})
*/