import { NextResponse } from "next/server";
import pg from 'pg';
import connection from "@/database/connectSql";

export async function POST(req){

    //creating new db client
    const db = new pg.Client(connection);

    try{
        //connecting the database
        await db.connect();
        let res = await db.query(`SELECT * FROM song_list ORDER BY RANDOM() LIMIT 5`);
        
        return NextResponse.json({data: res.rows});
    }
    catch(err){
        console.log("Error");
        return NextResponse.error({data:"ERROR"});
    }
    finally{
        await db.end();
    }
}