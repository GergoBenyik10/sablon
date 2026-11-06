const express = require('express');
const app = express();
const mysql = require('mysql2/promise');

const con = mysql.createPool({
     host: 'localhost',
     user: 'root',
     password:'',
     database:'raktar_db',
     port:3307
});

app.get('/kategoriak', async (reg,res) => {
    try{
        const query = "SELECT * FROM `kategoriak`"
    const [rows] = await con.query(query);
    res.json(rows);
    }
    catch(error){
        console.error("Hiba a lekérdezés során:", error);
        res.status(500).json({error: 'Adatbázis hiba történt a lekérdezéskor.'});
    }
});
app.post('/kategoriak', async (reg, res) =>{
    try{
        const {id, nev} = reg.body;
    
        if(!id || !nev){
            return res.status(400).json({error:'A mezők kitöltése kötelező.'});
        }
    
    
        const query = "INSERT INTO termekek (id,nev) VALUES (?,?)";
        const [result] = await con.query(query, [id, nev,]);
        res.status(201).json({message: "Az adatok sikeresen hozzá lettek adva"});
    }
    catch(error){
        console.error("Hiba a beszúrás során:", error);
    res.status(500).json({error: "Nem sikerült az adatokat hozzá adni !"});
    }
    });

app.post('/termekek', async (reg, res) =>{
try{
    const {id, kategoria_id, nev, ar_ft, keszlet, elerheto} = reg.body;

    if(!id || !kategoria_id || !nev || !ar_ft || !keszlet || !elerheto){
        return res.status(400).json({error:'A mezők kitöltése kötelező.'});
    }


    const query = "INSERT INTO termekek (id,kategoria_id,nev,ar_ft,keszlet,elerheto) VALUES (?,?,?,?,?,?)";
    const [result] = await con.query(query, [id, kategoria_id, nev, ar_ft, keszlet, elerheto]);
    res.status(201).json({message: "Az adatok sikeresen hozzá lettek adva"});
}
catch(error){
    console.error("Hiba a beszúrás során:", error);
res.status(500).json({error: "Nem sikerült az adatokat hozzá adni !"});
}
});
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });