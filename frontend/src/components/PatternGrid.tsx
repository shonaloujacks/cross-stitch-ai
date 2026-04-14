import type { Pattern } from "../types"
import { Button, Box } from "@mui/material";
import jsPDF from 'jspdf';    

interface PatternGridProp {
  pattern: Pattern;
  setPattern: React.Dispatch<React.SetStateAction<Pattern | null>>;
};

  const downloadPattern = (pattern: Pattern) => {
    const cellSize = 20;
    const padding = 20;
    const titleHeight = 28;
    const gridHeight = pattern.height * cellSize;
    const keyItemHeight = 28;
    const keySectionHeight = pattern.palette.length * keyItemHeight + 30;
    const canvasWidth = Math.max(pattern.width * cellSize, 300) + padding * 2;
    const canvasHeight = padding + titleHeight + gridHeight + padding + keySectionHeight + padding;

    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Splice title
    const patternTitle = pattern.title.replace(' on a plain white #ffffff background', '')

    // Draw title
    ctx.fillStyle = 'black';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(patternTitle, padding, padding);

    // Draw the grid
    const gridOffsetY = padding + titleHeight;
    pattern.grid.forEach((row, rowIdx) => {
      row.forEach((cellValue, colIdx) => {
        const x = padding + colIdx * cellSize;
        const y = gridOffsetY + rowIdx * cellSize;

        ctx.fillStyle = cellValue === -1 ? 'white' : pattern.palette[cellValue].color;
        ctx.fillRect(x, y, cellSize, cellSize);

        ctx.strokeStyle = '#aaa';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(x, y, cellSize, cellSize);

        if (cellValue !== -1) {
          ctx.fillStyle = 'black';
          ctx.font = '11px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(pattern.palette[cellValue].symbol, x + cellSize / 2, y + cellSize / 2);
        }
      });
    });

    // Draw the colour key
    const keyOffsetY = gridOffsetY + gridHeight + padding;
    ctx.fillStyle = 'black';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('Colour key:', padding, keyOffsetY);

    pattern.palette.forEach((entry, i) => {
      const y = keyOffsetY + 22 + i * keyItemHeight;

      ctx.fillStyle = entry.color;
      ctx.fillRect(padding, y, cellSize, cellSize);
      ctx.strokeStyle = '#aaa';
      ctx.lineWidth = 0.5;
      ctx.strokeRect(padding, y, cellSize, cellSize);

      ctx.fillStyle = 'black';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(entry.symbol, padding + cellSize / 2, y + cellSize / 2);

      ctx.font = '13px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`${entry.name}  —  DMC: ${entry.dmcNumber}`, padding + cellSize + 8, y + cellSize / 2);
    });

    // Trigger the download
     const imgData = canvas.toDataURL('image/png');           
     const pdfPadding = 40                                                                                                                       
     const pdf = new jsPDF({ unit: 'px', format: [canvasWidth + pdfPadding * 2, canvasHeight + pdfPadding * 2] });                                                                                                   
     pdf.addImage(imgData, 'PNG', pdfPadding, pdfPadding, canvasWidth, canvasHeight);                                                                                                                  
     pdf.save(`${patternTitle || 'cross-stitch-pattern'}.pdf`);                                                                                                                                                                           
  };


const PatternGrid = ({ pattern, setPattern }: PatternGridProp) => {

  console.log('this is pattern',pattern)


  const cellSize = Math.min(15, Math.floor((window.innerWidth - 20) / pattern.width));

return (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20, flexDirection: 'column', alignItems:'center'}}>
    <div style ={{
    display: 'grid',
    gridTemplateColumns: `repeat(${pattern.width}, ${cellSize}px)`,
    width: `${pattern.width * cellSize}px`,
    margin: '0 auto'
   }}>
    {pattern.grid.flat().map((cellValue, i) => (
      <div key={i} style={{
        width: cellSize,
        height: cellSize,
        lineHeight: 1,
        fontSize: cellSize * 0.7,
        color: 'black',
        backgroundColor: cellValue === -1 ? 'white' : pattern.palette[cellValue].color,
        border: '0.5px solid grey',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {cellValue === -1 ? '' : pattern.palette[cellValue].symbol}
      </div>
    ))}
    </div>
      <div>
      Colour key:
      <ul style={{ listStyleType: 'none', padding: 0}}>
      {pattern.palette.map((palette, i) => (
        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8}}>
          <div style={{
            width: 20,
            height: 20,
            fontSize: cellSize * 0.7,
            backgroundColor: palette.color,
            border: '0.5px solid grey', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            color: 'black'
          }}>
            {palette.symbol}
          </div> 
          {palette.name}, DMC: {palette.dmcNumber}
        </li>
       ))} 
        </ul>
      </div>
      <Box sx={{ padding: 2}}> 
      <Button variant="contained" sx={{ mr: 1, color: '#ffffff'}} onClick={() => downloadPattern(pattern)}>
    download pattern
  </Button>
  <Button variant="contained" sx={{ ml: 1, color: '#ffffff'}} onClick={() => setPattern(null)}>start over</Button>
  </Box>
  </div>
)
}

export default PatternGrid;
