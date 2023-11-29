const fs = require('fs');

async function getTable(name){
    let response='';
    let path = `./data/table_${name}.json`;

    const table = JSON.parse(fs.readFileSync(path, function(err){
        if(err) console.log(err);
        fs.close();
    }));
    
    response += "<tbody>"
    for(let i=0; i<table.length; i++){
        response += "<tr>"
        for(let j=0; j<table[i].length;j++){
            console.log("Rząd: "+i+", kolumna: "+j);
            if(table[i][j].class === "off" || table[i][j].class === "offShow"){
                response += `<td class=\"${table[i][j].class}\">"\t"</td>`
            }else{
                response += `<td class=\"${table[i][j].class}\" onmouseenter=\"${table[i][j].onmouseenter}(${table[i][j].id})\" id=\"${table[i][j].id}\">${table[i][j].id}`+
                `<span class=\"details\"></span></td>`;
            }
        }
        response += "</tr>"
    }
    response += "</tbody>"
    
    return response;
    
    
}

module.exports = {
    getTable
}