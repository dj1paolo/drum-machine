// DrumMachine.jsx

const BANK = [
  { key: "Q", id: "Heater-1", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" },
  { key: "W", id: "Heater-2", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" },
  { key: "E", id: "Heater-3", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" },
  { key: "A", id: "Heater-4", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" },
  { key: "S", id: "Clap", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" },
  { key: "D", id: "Open-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" },
  { key: "Z", id: "Kick-n-Hat", url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" },
  { key: "X", id: "Kick", url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" },
  { key: "C", id: "Closed-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" }
];

function DrumPad({ pad, onHit }) {
  const handleClick = () => {
    const audio = document.getElementById(pad.key);
    if (audio) {
      audio.currentTime = 0;
      audio.play();
      onHit(pad.id);
    }
  };

  return (
    <button className="drum-pad" id={pad.id} onClick={handleClick}>
      {pad.key}
      <audio className="clip" id={pad.key} src={pad.url}></audio>
    </button>
  );
}

function App() {
  const [display, setDisplay] = React.useState("Ready");

  React.useEffect(() => {
    const handleKey = (e) => {
      const key = e.key.toUpperCase();
      const audio = document.getElementById(key);
      if (audio) {
        audio.currentTime = 0;
        audio.play();
        const pad = BANK.find((p) => p.key === key);
        if (pad) setDisplay(pad.id);
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div id="drum-machine">
      <div id="display">{display}</div>
      <div className="grid">
        {BANK.map((pad) => (
          <DrumPad key={pad.key} pad={pad} onHit={setDisplay} />
        ))}
      </div>
    </div>
  );
}

// Render
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
