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
        let res = await db.query("SELECT * FROM playlists WHERE playlist_name = $1 and username = $2", [playlistName, usernameCurrent]);
        if(res.rows.length===0){
            res = await db.query("INSERT INTO playlists (playlist_name, username) VALUES($1, $2)", [playlistName, usernameCurrent]);
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