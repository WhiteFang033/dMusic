import { NextResponse } from "next/server";
import pg from 'pg';
import connection from "@/database/connectSql";

export async function POST(req){
    const db = new pg.Client(connection);
    const {username} = await req.json();
    console.log(username);
    try{
        await db.connect();
        let res = await db.query(`SELECT name, src, artist
FROM song_list
INNER JOIN user_song_preferences ON user_song_preferences.username = $1 AND user_song_preferences.song_name = song_list.name AND user_song_preferences.preference = $2`, [username, true]);
        
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