import React, {useState} from 'react';
import Card from "./components/Card";
import Left from "./components/Left";

function App() {
    const [musicNumber, setMusicNumber] = useState<number>(0)
    const [open, setOpen] = useState(false)

    return (
        <div className="container">
            <main>
                <Card
                    musicNumber={musicNumber}
                    setMusicNumber={setMusicNumber}
                    setOpen={setOpen}
                />
                <Left
                    open={open}
                    setOpen={setOpen}
                    musicNumber={musicNumber}
                    setMusicNumber={setMusicNumber}
                />
            </main>
        </div>
    );
}

export default App;
