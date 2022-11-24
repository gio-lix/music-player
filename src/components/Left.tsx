import React, {FC, useEffect, useState} from 'react';
import "../assets/css/list.css"
import musics from "../assets/data"
import {MusicType} from "../typeing";
import {timer} from "../utils/timer";

interface Props {
    open: boolean
    musicNumber: number
    setOpen: Function
    setMusicNumber: Function
}

const Left: FC<Props> = ({setOpen, open, setMusicNumber, musicNumber}) => {
    return (
        <div className={`list ${open ? "show" : ""}`}>
            <div className="header">
                <div>
                    <i className="material-icons">queue_music</i>
                    <span>Music List</span>
                </div>
                <i
                    onClick={() => setOpen(false)}
                    className="material-icons">close</i>
            </div>
            <ul>
                {(musics as MusicType[]).map((music, index: number) => (
                    <li
                        key={music.id}
                        onClick={() => setMusicNumber(index)}
                        className={`${musicNumber === index ? "playing" : "play"}`}>
                        <div className="row">
                            <span>{music.title}</span>
                            <p>{music.artist}</p>
                        </div>
                        <Duration music={music}/>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Left;


interface DurationProps {
    music: any
}

const Duration = ({music}: DurationProps) => {
    const [duration, setDuration] = useState(0)

    useEffect(() => {
        const audio = new Audio(music.src)

        audio.onloadedmetadata = function () {
            if (audio.readyState > 0) {
                setDuration(audio.duration)
            }
        }
    },[music])

    return (
        <>
            <span className='duration'>{timer(duration)}</span>
        </>
    )
}