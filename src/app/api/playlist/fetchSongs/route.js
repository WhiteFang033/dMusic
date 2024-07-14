import { NextResponse } from "next/server";
import pg from 'pg';
import connection from "@/database/connectSql";

export async function POST(req){
    const {playlistName, usernameCurrent} = await req.json();
    console.log(playlistName, usernameCurrent);
    //creating new db client
    const db = new pg.Client(connection);

    try{
        //connecting db
        await db.connect();
        let res = await db.query(
            `SELECT song_list.name, song_list.artist, song_list.src, playlist_songs.playlist_name, playlist_songs.username 
FROM song_list
INNER JOIN playlist_songs ON playlist_songs.song_name = song_list.name AND playlist_songs.username = $1 AND playlist_songs.playlist_name = $2
`
            , [usernameCurrent, playlistName]);
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