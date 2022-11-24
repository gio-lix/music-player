import React, {FC, useEffect, useRef, useState} from 'react';
import music from "../assets/data"
import "../assets/css/card.css"
import {timer} from "../utils/timer";


interface Props {
    musicNumber: number
    setMusicNumber: Function
    setOpen: Function
}

const Card: FC<Props> = ({setMusicNumber, musicNumber, setOpen}) => {
    const [duration, setDuration] = useState<number>(1)
    const [currentTime, setCurrentTime] = useState<number>(0)
    const [play,setPlay] = useState<boolean>(false)
    const [showValue, setShowValue] = useState<boolean>(false)
    const [value, setValue] = useState<number>(0)
    const [repeat, setRepeat] = useState<string>("repeat")

    const audioRef = useRef<HTMLAudioElement | null>(null)


    const handleStart = () => {
        setDuration(audioRef.current!.duration)
        if (play) {
            audioRef.current?.play()
        }
    }

    const handlePlayAudio = () => {
        if (play) {
            (audioRef.current as HTMLAudioElement).pause()
            setPlay(false)
        } else {
            (audioRef.current as HTMLAudioElement).play()
            setPlay(true)
        }
    }

    const handleTimeUpdate = () => {
        const currentTime = audioRef.current?.currentTime
        setCurrentTime(currentTime!)
    }

    const changeCurrentTime = (e:React.ChangeEvent<HTMLInputElement>) => {
        const time = Number(e.target.value)
        audioRef.current!.currentTime = time
    }

    const handleNextPrev = (n: number) => {
        setMusicNumber((value: number) => {
            if (n > 0) {
                return value + n > music.length - 1 ? 0 : value + n
            }
            return  value + n < 0 ? music.length - 1 : value + n
        })
    }

    const handleRepeat = () => {
        setRepeat((value: string) => {
            switch (value) {
                case "repeat":
                    return "repeat_one"
                case "repeat_one":
                    return "shuffle"
                default:
                    return "repeat"
            }
        })
    }

    const randomNumber = (): number => {
        const number = Math.floor(Math.random() * (music.length - 1))
        if (number === musicNumber) {
            return randomNumber()
        }
        return number
    }
    const handleShuffle = () => {
        const num = randomNumber()
        setMusicNumber(num)
    }

    const EndedAudio = () => {
        switch (repeat) {
            case "repeat_one":
                return audioRef.current?.play()
            case "shuffle":
                return handleShuffle()
            default:
                return handleNextPrev(1)
        }
    }

    useEffect(() => {
        audioRef.current!.volume = value / 100
    },[value])

    return (
        <div className="card">
            <div className="nav">
                <i className="material-icons">expand_more</i>
                <span>Now Playing {musicNumber + 1}/{music.length}</span>
                <i
                    className="material-icons"
                    onClick={() => setOpen((prev: boolean) => !prev)}
                >queue_music</i>
            </div>
            <div className="img">
                <img
                    src={music[musicNumber].thumbnail}
                    className={`${play ? "playingImg" : ""}`}
                    alt="img"

                />
            </div>
            <div className="details">
                <p className='title'>{music[musicNumber].title}</p>
                <p className='artist'>{music[musicNumber].artist}</p>
            </div>
            <div className="progress">
                <input
                    type="range"
                    value={currentTime}
                    onChange={changeCurrentTime}
                    min={0}
                    max={duration}
                    style={{
                        background: `linear-gradient(to right, 
                        #3264fe ${currentTime/duration*100}%,
                        #e5e5e5 ${currentTime/duration*100}%
                        )`
                    }}
                />
            </div>
            <div className='timer'>
                <span>{timer(currentTime)}</span>
                <span>{timer(duration)}</span>
            </div>
            <div className="controls">
                <i className="material-icons"
                   onClick={handleRepeat}
                >{repeat}</i>
                <i className="material-icons" id='prev'
                   onClick={() => handleNextPrev(-1)}
                >skip_previous</i>

                <div className='play' onClick={handlePlayAudio}>
                    <i className="material-icons" id='prev'>
                        {play ? "pause" : "play_arrow"}
                    </i>
                </div>
                <i className="material-icons" id='next'
                   onClick={() => handleNextPrev(1)}
                >skip_next</i>
                <i
                    onClick={() => setShowValue(prev => !prev)}
                    className="material-icons"
                >volume_up</i>

                <div className={`volume ${showValue ? "show" : ""}`}>
                    <i
                        onClick={() => setValue(v => v > 0 ? 0 : 100)}
                        className="material-icons">
                        {value === 0 ? "volume_off" : "volume_up"}
                    </i>
                    <input
                        type="range"
                        min={0}
                        max={100}
                        value={value}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setValue(Number(e.target.value))}
                        style={{
                            background: `linear-gradient(to right, 
                        #3264fe ${value}%,
                        #e5e5e5 ${value}%
                        )`
                        }}
                    />
                    <span>{value}</span>

                </div>
            </div>
            <audio
                ref={audioRef}
                src={music[musicNumber].src}
                onLoadedData={handleStart}
                onTimeUpdate={handleTimeUpdate}
                onEnded={EndedAudio}
                hidden
            />
        </div>
    );
};

export default Card;