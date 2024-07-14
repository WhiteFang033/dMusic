import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import DotMenuSvg from '@/../public/svg/dot_menu.svg'

const RemoveFromPlaylist = ({ playlistName, songTitle, songArtist, fetchPlaylistsSongs }) => {
    const [optionsHidden, setOptionsHidden] = useState(true);
    const { data: session, status } = useSession();
    const [usernameCurrent, setUsernameCurrent] = useState();


    useEffect(() => {
        if (session?.user?.username) {
            setUsernameCurrent(session.user.username);
        }
    }, [session, optionsHidden]);

    if (status === 'loading') {
        return <Loading />;
    }

    async function handleButtonClick() {
        setOptionsHidden(true);
        if (playlistName === 'Liked Songs') {
            let title = songTitle;
            let preference = null;
            let operation = 'null'
            let username = usernameCurrent
            const res = await fetch('api/songs/like', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title,
                    username,
                    operation,
                    preference
                })
            })
            if (res.ok) {
                const result = await res.json();
                let pref = result.data;
                if (pref?.length > 0) {
                    console.log(pref[0].preference);
                }

            }
            else {
                let title = songTitle;
                let artist = songArtist;
                let playlistTitle = playlistName

                try {
                    const res = await fetch('api/playlist/removeSong', {
                        method: "POST",
                        body: JSON.stringify({
                            title,
                            artist,
                            playlistTitle,
                            usernameCurrent
                        })
                    })

                    if (res.ok) {
                        const response = await res.json();
                        const result = response.data;
                        await fetchPlaylistsSongs();
                    }
                }
                catch (err) {
                    console.log(err);
                }
            }

        }
    }

    document.addEventListener("click", (e) => {
        if (e.target.matches('.options')) {
            return
        }
        else {
            setOptionsHidden(true);
        }
    })
    return (
        <div>
            <div className='options'>
                {optionsHidden ?
                    <button onClick={() => { setOptionsHidden(false) }}><Image className='options' src={DotMenuSvg} height={15} alt='options'></Image></button>
                    :
                    <div className="relative top-[100px] flex flex-col h-[120px] w-[250px] bg-zinc-950 rounded-xl items-center border-2 border-zinc-800">
                        <div className="flex h-[50px] w-[95%] items-center justify-start border-b-2 border-zinc-500 px-5 mb-2">
                            <h3 className='text-white text-lg font-semibold'>Remove From Playlist</h3>
                        </div>
                        <div className="flex flex-col w-[100%] h-[50px] justify-start items-center text-white text-lg">
                            <button onClick={handleButtonClick} className='options w-[100%] h-[50px] hover:bg-zinc-900 rounded-xl'>Remove</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default RemoveFromPlaylist
