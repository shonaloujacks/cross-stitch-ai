import type { Pattern } from "../types"

interface PatternGridProp {
  pattern: Pattern;
};


const PatternGrid = ({ pattern }: PatternGridProp) => {

  console.log('this is pattern',pattern)

return (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20}}>
   <div style ={{
    display: 'grid',
    gridTemplateColumns: `repeat(${pattern.width}, 20px)`,
   }}>
    {pattern.grid.flat().map((cellValue, i) => (
      <div key={i} style={{
        width: 20,
        height: 20,
        backgroundColor: pattern.palette[cellValue].color,
        border: '0.5px solid grey',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {pattern.palette[cellValue].symbol}
      </div>
    ) )}

    </div>
  </div>
)
}

export default PatternGrid;
