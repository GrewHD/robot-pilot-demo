import React, { useState, useEffect } from 'react';
import './App.css';
import ArrowButton from './assets/arrow-button.svg'
import ArrowButtonPressed from './assets/arrow-button-pressed.svg'
import BellroyLogo from './assets/bellroy-logo.svg'

const DIRECTIONS = ['NORTH', 'EAST', 'SOUTH', 'WEST'];

const App = () => {
  const [robot, setRobot] = useState({ x: 2, y: 2, facing: 'SOUTH' });
  const [rotate, setRotate] = useState(0);
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  const rotateLeft = () => {
    const currentIndex = DIRECTIONS.indexOf(robot.facing);
    const newIndex = (currentIndex - 1 + DIRECTIONS.length) % DIRECTIONS.length;
    setRobot({ ...robot, facing: DIRECTIONS[newIndex] });
    setRotate(rotate - 90)
  };

  const rotateRight = () => {
    const currentIndex = DIRECTIONS.indexOf(robot.facing);
    const newIndex = (currentIndex + 1) % DIRECTIONS.length;
    setRobot({ ...robot, facing: DIRECTIONS[newIndex] });
    setRotate(rotate + 90)
  };

  const moveForward = () => {
    let { x, y, facing } = robot;
    switch (facing) {
      case 'NORTH':
        if (y < 4) y++;
        break;
      case 'EAST':
        if (x < 4) x++;
        break;
      case 'SOUTH':
        if (y > 0) y--;
        break;
      case 'WEST':
        if (x > 0) x--;
        break;
      default:
        break;
    }
    setRobot({ x, y, facing });
  };

  const handleKeyDown = (event: KeyboardEvent ) => {
    setPressedKey(event.key);

    switch (event.key) {
      case 'ArrowLeft':
        rotateLeft();
        break;
      case 'ArrowUp':
        moveForward();
        break;
      case 'ArrowRight':
        rotateRight();
        break;
      default:
        break;
    }
  };

  const handleKeyUp = () => {
    setPressedKey(null);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [robot]);

  return (
    <div className="App">
      <a target='_blank' href='https://bellroy.com/' className='mx-auto my-10 block w-fit'>
        <img src={BellroyLogo} alt='Bellroy Logo' />
      </a>
      <div className="grid p-8">
        {[...Array(5)].map((_, row) => (
          <div key={row} className="flex">
            {[...Array(5)].map((_, col) => (
              <div
                key={col}
                className={`cell ${
                  robot.x === col && robot.y === 4 - row ? 'robot' : ''
                }`}
              >
                {robot.x === col && robot.y === 4 - row && (
                  <span
                    className="emoji text-2xl"
                    style={{ transform: `rotate(${rotate}deg)` }}
                  >🤖</span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button onClick={rotateLeft} className='mt-[60px]'>
          <img src={pressedKey === 'ArrowLeft' ? ArrowButtonPressed : ArrowButton} alt="Rotate Left" />
        </button>
        <button onClick={moveForward} className='rotate-[90deg] self-baseline'>
          <img src={pressedKey === 'ArrowUp' ? ArrowButtonPressed : ArrowButton} alt="Move Forward" />
        </button>
        <button onClick={rotateRight} className='rotate-[180deg] mt-[60px]'>
          <img src={pressedKey === 'ArrowRight' ? ArrowButtonPressed : ArrowButton} alt="Rotate Right" />
        </button>
      </div>
    </div>
  );
};

export default App;
