import { NextResponse } from "next/server";
import pg from 'pg';
import connection from "@/database/connectSql";
import fs from 'fs'
import path from "path";

export async function POST(req){
    const {playlistName, usernameCurrent} = await req.json();
    console.log(playlistName, usernameCurrent);
    //creating new db client
    const db = new pg.Client(connection);

    try{
        //connecting db
        await db.connect();

        //fetching playlist thumbnail
        let response = await db.query(`SELECT thumbnail FROM playlists WHERE username = $1 AND playlist_name = $2`, [usernameCurrent, playlistName]);
        let thumbnail = response.rows[0].thumbnail;
        let res = await db.query(`DELETE FROM playlists WHERE username = $1 AND playlist_name = $2`, [usernameCurrent, playlistName]);
        res = await db.query('DELETE FROM playlist_songs WHERE username = $1 AND playlist_name = $2', [usernameCurrent, playlistName]);


        //getting the file directory
        const thumbnail_path = path.join(process.cwd(), 'public', 'uploads', thumbnail);
        //deleting the thumbnail file
        await fs.unlinkSync(thumbnail_path);

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