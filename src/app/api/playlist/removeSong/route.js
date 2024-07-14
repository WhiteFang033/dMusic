import { NextResponse } from "next/server";
import pg from 'pg';
import connection from "@/database/connectSql";

export async function POST(req){
    const {playlistTitle, usernameCurrent, artist, title} = await req.json();
    console.log(playlistTitle, usernameCurrent, artist, title);
    //creating new db client
    const db = new pg.Client(connection);

    try{
        //connecting db
        await db.connect();
        let res = await db.query("DELETE FROM playlist_songs WHERE playlist_name = $1 AND username = $2 AND song_name = $3 AND artist = $4", [playlistTitle, usernameCurrent, title, artist]);
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