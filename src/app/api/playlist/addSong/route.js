import { NextResponse } from "next/server";
import pg from 'pg';
import connection from "@/database/connectSql";

export async function POST(req){
    const {playlistName, usernameCurrent, artist, title} = await req.json();
    
    //creating new db client
    const db = new pg.Client(connection);

    try{
        //connecting db
        await db.connect();
        let res = await db.query("SELECT * FROM playlist_songs WHERE playlist_name = $1 AND username = $2 AND song_name = $3 AND artist = $4", [playlistName, usernameCurrent, title, artist]);
        if(res.rows.length===0){
            res = await db.query("INSERT INTO playlist_songs (playlist_name, username, song_name, artist) VALUES($1, $2, $3, $4)", [playlistName, usernameCurrent, title, artist]);
        }
        else{
            res.rows = [{message: "Already added in the playlist!"}]
        }
        console.log(res);
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