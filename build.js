const ejs = require('ejs')
const path = require('path')
const fs = require('fs')

const albums = fs.readFileSync('./assets/albums.json', {encoding: 'utf8'})
const albumsParsed = JSON.parse(albums)

//For test purposes
//console.log(albumsParsed)


const templatePath = path.join("views", "layout.ejs")

const outputDir = "dist"

ejs.renderFile(templatePath, {albums: albumsParsed.albums}, function(err, str){
    if(err){
        console.log(err)
    }
    else{
        const outputPath = path.join(outputDir, "index.html")
        fs.writeFileSync(outputPath, str)
    }
})