import { NextResponse } from "next/server";
import pg from 'pg';
import fs from 'fs'
import path from "path";
import connection from "@/database/connectSql";

export async function POST(req) {
    const { playlistName, usernameCurrent } = await req.json();
    // const formData = await req.formData();
    // console.log(formData);

    // const thumbnail = formData.get('thumbnail');
    // console.log(thumbnail);
    // if (thumbnail !== null) {
    //     const bytes = await file.arrayBuffer();
    //     const buffer = Buffer.from(bytes);

    //     const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    //     if (!fs.existsSync(uploadDir)) {
    //         fs.mkdirSync(uploadDir);
    //     }

    //     const filePath = path.join(uploadDir, file.name);
    //     fs.writeFileSync(filePath, buffer);
    // }

    //creating new db client
    const db = new pg.Client(connection);

    try {
        //connecting db
        await db.connect();
        let res = await db.query("SELECT * FROM playlists WHERE playlist_name = $1 and username = $2", [playlistName, usernameCurrent]);
        if (res.rows.length === 0) {
            res = await db.query("INSERT INTO playlists (playlist_name, username) VALUES($1, $2)", [playlistName, usernameCurrent]);
        }
        return NextResponse.json({ data: res.rows });
    }
    catch (err) {
        console.log(err);
        return NextResponse.error({ data: "Error" });
    }
    finally {
        await db.end();
    }
}