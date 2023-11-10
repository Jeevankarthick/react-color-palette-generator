import "./styles.css";
import { useState } from "react";

export default function App() {
  return (
    <>
      <ColorPalette />
    </>
  );
}

function randomColorGenerate() {
  const color = "#000000".replace(/0/g, function () {
    return (~~(Math.random() * 16)).toString(16);
  });
  return color;
}

let initialColors = [];
let count = 1;
while (count <= 5) {
  const randomColor = randomColorGenerate();
  if (!initialColors.includes(randomColor)) {
    initialColors.push(randomColor);
    count++;
  }
}

function ColorPalette() {
  const [colors, setColors] = useState(initialColors);

  function handleColorClick(prevColor) {
    const newColor = randomColorGenerate();
    !colors.includes(newColor)
      ? setColors((Colors) =>
          Colors.map((color) => (color === prevColor ? newColor : color))
        )
      : handleColorClick(prevColor);
  }

  function handleGenerate() {
    setColors((colors) => colors.map((color) => randomColorGenerate()));
  }

  return (
    <div className="container">
      <h1 className="heading">Color Palette Generator</h1>
      <PaletteBox colors={colors} onColorClick={handleColorClick} />
      <button className="generate-btn" onClick={handleGenerate}>
        Generate New Palette
      </button>
    </div>
  );
}

function PaletteBox({ colors, onColorClick }) {
  return (
    <div className="palette-box">
      {colors.map((color) => (
        <ColorBox color={color} onColorClick={onColorClick} key={color} />
      ))}
    </div>
  );
}

function ColorBox({ color, onColorClick }) {
  const [copied, setCopied] = useState(false);

  function handleClick(e) {
    // if button clicked
    if (e.target.id === "copy-btn") {
      let copyText = e.target.textContent;
      navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    } else {
      onColorClick(e.target.textContent);
    }
  }

  return (
    <div
      className="color-box"
      style={{ backgroundColor: color }}
      onClick={handleClick}
    >
      <button id="copy-btn" className="color-code-btn">
        {copied ? "copied" : color}
      </button>
    </div>
  );
}
