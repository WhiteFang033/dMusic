import { NextResponse } from "next/server";
import pg from 'pg';
import connection from "@/database/connectSql";

export async function POST(req){
    const db = new pg.Client(connection);
    const {username} = await req.json();
    console.log(username, "heloo");
    try{
        await db.connect();
        let res = await db.query(`SELECT * from users WHERE username = $1`, [username]);
        console.log(res.rows)
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