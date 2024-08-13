import React, { useState, useRef, useEffect, forwardRef } from 'react';
import './index.less';
import instance from '../../service/request';
const CodeImage = ({ code, width = 90, height = 40 }) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (code === "") {
      return
    }
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear the canvas
    ctx.clearRect(0, 0, width, height);

    // Set the font and text color
    ctx.font = '1rem serif';
    ctx.fillStyle = 'White';

    // Draw the code on the canvas
    const x = width / 4;
    const y = height - 20;
    ctx.fillText(code, x, y);
  }, [code, width, height]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

const App = forwardRef((props, ref) => {
  const generateCode = () => {
    instance.get("/apis/youshan-m/index/code").then((val) => {
      if (val.data.success) {
        setCode(val.data.results)
      } else { setCode("") }
    })
  };
  const [code, setCode] = useState("");
  const codeRef = useRef();

  const renderRef = useRef(true); // 防止useEffect执行两次
  useEffect(() => {
    // if (renderRef.current) {
    //   // 防止useEffect执行两次
    //   renderRef.current = false
    //   return
    // }
    if (code === "") { generateCode() }

  })
  const handleClick = () => {
    generateCode()
  };

  return (
    <div className="container" onClick={handleClick} ref={ref}>
      <div className="code" ref={codeRef}>
        <CodeImage code={code} />
      </div>
    </div>
  );
});

export default App;
