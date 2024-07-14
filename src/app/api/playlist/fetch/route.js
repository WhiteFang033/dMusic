import { NextResponse } from "next/server";
import pg from 'pg';
import connection from "@/database/connectSql";

export async function POST(req){
    const {username} = await req.json();
    
    //creating new db client
    const db = new pg.Client(connection);

    try{
        //connecting db
        await db.connect();
        let res = await db.query("SELECT * FROM playlists WHERE username = $1", [username]);
        return NextResponse.json({data: res.rows});
    }
    catch(err){
        console.log(err);
        return NextResponse.error({data: "Error"});
    }
    finally{
        await db.end();
    }
}