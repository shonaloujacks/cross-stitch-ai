import type { Pattern } from "../types"

interface PatternGridProp {
  pattern: Pattern;
};


const PatternGrid = ({ pattern }: PatternGridProp) => {

  console.log('this is pattern',pattern)

return (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20, flexDirection: 'column', alignItems:'center'}}>
   <div style ={{
    display: 'grid',
    gridTemplateColumns: `repeat(${pattern.width}, 20px)`,
   }}>
    {pattern.grid.flat().map((cellValue, i) => (
      <div key={i} style={{
        width: 20,
        height: 20,
        backgroundColor: cellValue === -1 ? 'white' : pattern.palette[cellValue].color,
        border: '0.5px solid grey',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
            backgroundColor: palette.color,
            border: '0.5px solid grey', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {palette.symbol}
          </div> 
          {palette.name}, DMC: {palette.dmcNumber}
        </li>
       ))} 
        </ul>
      </div>
  </div>
)
}

export default PatternGrid;
