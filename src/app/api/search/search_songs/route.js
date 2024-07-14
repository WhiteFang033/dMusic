import { NextResponse } from "next/server";
import pg from 'pg';
import connection from "@/database/connectSql";

export async function POST(req){
    let {searchValue} = await req.json();
    
    //initializing database
    const db = new pg.Client(connection);
    await db.connect();

    try{
        //fetching data from data base

        let result = await db.query(`SELECT * FROM song_list WHERE LOWER(name) LIKE LOWER($1) || $2`, [searchValue, "%"]);
        
        return NextResponse.json({data: result.rows});

    }
    catch(err){
        return NextResponse.err({message: "Error fetching search results."})
    }
    finally{
        await db.end();
    }
    
}