import { NextResponse } from "next/server";
import pg from 'pg';
import connection from "@/database/connectSql";

export async function POST(req){
    const {title, username, operation, preference} = await req.json();
    console.log(title, username);
    // creating a new pg client for database operations
    const db = new pg.Client(connection);
    let res;
    try{
        //connecting database
        await db.connect();

        switch(operation){
            case 'fetch':
                res = await db.query("SELECT * FROM user_song_preferences WHERE song_name = $1 AND username = $2", [title, username]);
            break;

            case 'like':
                res = await db.query("SELECT * FROM user_song_preferences WHERE song_name = $1 AND username = $2", [title, username]);
                if(res.rows.length>0){
                    res = await db.query("UPDATE user_song_preferences SET preference = $1 WHERE song_name = $2 AND username = $3",[true, title, username]);
                    res = await db.query("SELECT preference FROM user_song_preferences WHERE song_name = $1 AND username = $2", [title, username]);
                }
                else{
                    res = await db.query("INSERT INTO user_song_preferences VALUES($1, $2, $3)", [title, username, true]);
                    res = await db.query("SELECT preference FROM user_song_preferences WHERE song_name = $1 AND username = $2", [title, username]);
                }
            break;

            case 'dislike':
                res = await db.query("SELECT * FROM user_song_preferences WHERE song_name = $1 AND username = $2", [title, username]);
                if(res.rows.length>0){
                    res = await db.query("UPDATE user_song_preferences SET preference = $1 WHERE song_name = $2 AND username = $3",[false, title, username]);
                    res = await db.query("SELECT preference FROM user_song_preferences WHERE song_name = $1 AND username = $2", [title, username]);
                }
                else{
                    res = await db.query("INSERT INTO user_song_preferences VALUES($1, $2, $3)", [title, username, false]);
                    res = await db.query("SELECT preference FROM user_song_preferences WHERE song_name = $1 AND username = $2", [title, username]);
                }
            break;
            case 'null':
                res = await db.query("SELECT * FROM user_song_preferences WHERE song_name = $1 AND username = $2", [title, username]);
                if(res.rows.length>0){
                    res = await db.query("DELETE FROM user_song_preferences WHERE song_name = $1 AND username = $2", [title, username]);
                }


            break;

            default:

        }
        return NextResponse.json({data: res.rows});
    }
    catch(err){
        console.log("Error fetching liked songs from db:", err);
        return NextResponse.json("Error");
    }
    finally{
        await db.end();
    }
}