import React from 'react'
import ReactDOM from 'react-dom'

interface IParam {
  id: number;
  name: string;
  value: string;
  }

const ParamEditor = () => {
  const style = {
    padding:"12px",
}
  const [state, setState] = React.useState<IParam[]>([]);
  const [newValue, setNewValue] = React.useState('');
  const [idd, setIdd] = React.useState<number>(NaN);

    const onChange = (e) => {
      e.preventDefault()
      const id = e.target[0].value
      const name = e.target[1].value
      const val = e.target[2].value
      setState([...state, {
      id: id,
      name: name,
      value: val,
    }])
    e.target.reset()
  }

  const changeState = (e) => {
      setNewValue(e.target.value)
  }

console.log(state);

React.useEffect(() => {
      setState(prevState => 
      prevState.map(item => 
        item.id === idd 
          ? { ...item, value: newValue }
          : item
      )
    )
}, [newValue, idd])

  return (
    <div>
      <form onSubmit={onChange}>
         <input type="number" placeholder="id" required/>
         <input type="text" placeholder="name" required/>
         <input type="text" placeholder="value" required/>
         <button type='submit'>Add</button>
      </form>
      <></>
      {!!state.length &&
      <div style={style}>
        <h3>Model</h3>
        {state.map(e => (
          <div>
          <span style={style}>{e.name}</span>
          <input type='text' defaultValue={e.value} onChange={changeState} onClick={() => setIdd(e.id)}/>
        </div>
        ))}
      </div>
      }
    </div>
  )
}


ReactDOM.render(<ParamEditor />, document.getElementById('root'))
