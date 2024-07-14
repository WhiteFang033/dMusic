import { NextResponse } from "next/server";
import pg from 'pg';
import connection from "@/database/connectSql";
import { hash } from "bcrypt";

export async function POST(req){
    const db = new pg.Client(connection);
    try{
        const {username, name,  email, password} = await req.json();
        const saltingRound = 10;

        const hashedPassword = await hash(password, saltingRound);
        let [fname, ...Rname] = name.split(" ");
        let lname = Rname.join(' ');
        db.connect();
        
        let usernameResult = await db.query("SELECT * FROM users WHERE username = $1", [username]);
        
        if(usernameResult.rows.length === 0){
            let emailResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);

            if(emailResult.rows.length === 0){
                const result = await db.query("INSERT INTO users (username, email, password, first_name, last_name) VALUES($1, $2, $3, $4, $5)", [username, email, hashedPassword, fname, lname]);
            }
            else{
                return NextResponse.json({error: "This email is already registered. Try Logging In."})
            }
        }
        else{
            return NextResponse.json({error: "This username is not available."})
        }
        db.end();
        return NextResponse.json({message: "User Registered"})
    }
    catch(err){
        console.log(err);
        return NextResponse.json({message: "Error occured while registering the user."});
    }
    finally{
        db.end();
    }
    
}