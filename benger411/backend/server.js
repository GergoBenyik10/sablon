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

app.use(express.json());

app.get('/get/kategoriak', async (reg,res) => {
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
app.post('/post/kategoriak', async (reg, res) =>{
    try{
        const {id, nev} = reg.body;
    
        if(!id || !nev){
            return res.status(400).json({error:'A mezők kitöltése kötelező.'});
        }
    
    
        const query = "INSERT INTO kategoriak (id,nev) VALUES (?,?)";
        const [result] = await con.query(query, [id, nev]);
        res.status(201).json({message: "Az adatok sikeresen hozzá lettek adva", id: result.insertId});
    }
    catch(error){
        console.error("Hiba a beszúrás során:", error);
    res.status(500).json({error: "Nem sikerült az adatokat hozzá adni !"});
    }
    });

app.patch('/patch/kategoriak/:id', async (reg, res) =>{
try{
    const {id} = reg.params;
    const {nev} = reg.body;

    if(!nev){
        return res.status(400).json({error:'A név megadása kötelező.'});
    }


    const query = "UPDATE kategoriak SET nev = ? WHERE id = ?";
    const [result] = await con.query(query, [nev, id]);
    res.status(201).json({message: "Az adatok sikeresen frissítve lettek"});
    
}
catch(error){
    console.error("Hiba a frissítés során:", error);
res.status(500).json({error: "Nem sikerült a frissítés!"});
}
});
app.delete('/delete/kategoriak/:id', async (reg, res) =>{
    try{
        const {id} = reg.params;
        const query = "DELETE FROM kategoriak WHERE id = ?";
        const [result] = await con.query(query, [id]);
        if(result.affectedRows === 0){
            return res.status(404).json({error: 'A kategória nem található'})
        }
        res.status(201).json({message: "Az adatok sikeresen dörölve lett"});
        
    }
    catch(error){
        console.error("Hiba a törlés során:", error);
    res.status(500).json({error: "Nem sikerült a törlés!"});
    }
    });
    app.get('/get/termekek', async (reg,res) => {
        try{
            const query = "SELECT * FROM `termekek`"
        const [rows] = await con.query(query);
        res.json(rows);
        }
        catch(error){
            console.error("Hiba a lekérdezés során:", error);
            res.status(500).json({error: 'Adatbázis hiba történt a lekérdezéskor.'});
        }
    });
    app.post('/post/termekek', async (reg, res) =>{
        try{
            const {id, nev} = reg.body;
        
            if(!id || !nev){
                return res.status(400).json({error:'A mezők kitöltése kötelező.'});
            }
        
        
            const query = "INSERT INTO termekek (id,kategoria_id,nev,ar_ft,keszlet,elerheto) VALUES (?,?,?,?,?,?)";
            const [result] = await con.query(query, [id, nev]);
            res.status(201).json({message: "Az adatok sikeresen hozzá lettek adva", id: result.insertId});
        }
        catch(error){
            console.error("Hiba a beszúrás során:", error);
        res.status(500).json({error: "Nem sikerült az adatokat hozzá adni !"});
        }
        });
    
    app.patch('/patch/termekek/:id', async (reg, res) =>{
    try{
        const {id} = reg.params;
        const {nev} = reg.body;
    
        if(!nev){
            return res.status(400).json({error:'A név megadása kötelező.'});
        }
    
    
        const query = "UPDATE termekek SET nev = ? WHERE id = ?";
        const [result] = await con.query(query, [nev, id]);
        res.status(201).json({message: "Az adatok sikeresen frissítve lettek"});
        
    }
    catch(error){
        console.error("Hiba a frissítés során:", error);
    res.status(500).json({error: "Nem sikerült a frissítés!"});
    }
    });
    app.delete('/delete/termekek/:id', async (reg, res) =>{
        try{
            const {id} = reg.params;
            const query = "DELETE FROM termekek WHERE id = ?";
            const [result] = await con.query(query, [id]);
            if(result.affectedRows === 0){
                return res.status(404).json({error: 'A kategória nem található'})
            }
            res.status(201).json({message: "Az adatok sikeresen dörölve lett"});
            
        }
        catch(error){
            console.error("Hiba a törlés során:", error);
        res.status(500).json({error: "Nem sikerült a törlés!"});
        }
        });
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });