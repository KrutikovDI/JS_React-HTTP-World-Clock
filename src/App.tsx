import React, { useRef, useState } from 'react'
import classes from './App.module.css'
import { Clock } from './components/Clock/Clock'
import uuid from 'react-uuid'
import { IForm } from './interface';


function App() {

  const [form, setForm] = useState({
    name: '',
    timeZone: 0,
    handler: (event: React.MouseEvent<HTMLDivElement>)=>{},
    id: ''
  });
  
  let clockList: React.MutableRefObject<IForm[]> = useRef([])

  const handleClickDelete = (event: React.MouseEvent<HTMLDivElement>) => (
    clockList.current = clockList.current.filter((i: IForm) => i.id !== event.currentTarget.id),
    setForm(prevForm => ({...prevForm}))
  )

  let { name, timeZone } = form;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm(prevForm => ({...prevForm, [name]: value}))
  }

  const handleClick = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      form.id = uuid();
      form.handler = handleClickDelete
      clockList.current.push(form);
      setForm(prevForm => ({...prevForm, name: '', timeZone: 0}))
    }

  

  return (
    <>
      <form className={classes['form']} onSubmit={handleClick}>
        <label className={classes['label']}>
          <div>Название</div>
          <input name='name' type="text" className={classes['input']} value={name} required onChange={handleChange}/>
        </label>
        <label className={classes['label']}>
          <div>Временная зона</div>
          <input name='timeZone' type="number" className={classes['input']} value={timeZone} required onChange={handleChange}/>
        </label>
        <button className={classes['btn']} type="submit">Добавить</button>
      </form>
      <div className={classes["clock-field"]}>
        {clockList.current.map((c, i) => (
          <div className={classes['clock']} key={i}>
            <Clock item={c}/>
          </div>
      ))}
      </div>
    </>
  )
}

export default App