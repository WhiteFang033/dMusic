import { NextResponse } from "next/server";
import pg from 'pg';
import fs from 'fs'
import path from "path";
import connection from "@/database/connectSql";
import uniqid from "uniqid"

export async function POST(req) {
    // const { playlistName, usernameCurrent } = await req.json();
    const formData = await req.formData();

    const thumbnail = formData.get('thumbnail');
    const json = formData.get('json');
    const usernameCurrent = JSON.parse(json).usernameCurrent;
    const playlistName = JSON.parse(json).playlistName;
    const thumbnailName = uniqid(playlistName, `.${thumbnail.type.split('/')[1]}`);

    if (thumbnail !== null) {
        const bytes = await thumbnail.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        const filePath = path.join(uploadDir, thumbnailName);
        fs.writeFileSync(filePath, buffer);
    }

    // creating new db client
    const db = new pg.Client(connection);

    try {
        //connecting db
        await db.connect();
        let res = await db.query("SELECT * FROM playlists WHERE playlist_name = $1 and username = $2", [playlistName, usernameCurrent]);
        if (res.rows.length === 0) {
            res = await db.query("INSERT INTO playlists (playlist_name, username, thumbnail) VALUES($1, $2, $3)", [playlistName, usernameCurrent, thumbnailName]);
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