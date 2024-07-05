import React, { Component } from 'react';
import classes from './clock.module.css';
import moment from 'moment';
import { IForm, IState } from '../../interface';


// export const Clock = (props: proposIForm) => {
//   const { name, timeZone, handler, id } = props.item

//   const[ time, setTime ] = useState(
//     {
//     secondsDegrees: (Number(moment().format('ss')) / 60) * 360 + 90,
//     minutesDegrees: (Number(moment().format('mm')) / 60) * 360 + 90,
//     hoursDegrees: (Number(moment().format('HH')) / 60) * 360 + 90,
//     }
//   );

//   return (
//     <div className={classes['field']}>
//         <h4 className={classes['h4']}>{name}</h4>
//         <div className={classes['clock']}>
//             <div className={classes[""]}></div>
//             <div className={`${classes['hand']} ${classes['hour']}`} style={{transform: `rotate(${time.hoursDegrees}deg)`}}></div>
//             <div className={`${classes['hand']} ${classes['minute']}`} style={{transform: `rotate(${time.minutesDegrees}deg)`}}></div>
//             <div className={`${classes['hand']} ${classes['second']}`} style={{transform: `rotate(${time.secondsDegrees}deg)`}}></div>
//             <div id={id} className={classes['delete']} onClick={handler}>X</div>
//         </div>

      
//     </div>
//   )
// }

interface proposIForm{
  item: IForm,
}

export class Clock extends Component<proposIForm, IState> {
  intervalFh: number | undefined;
  
  constructor (props: proposIForm) {
    super(props);

    this.state = {
      secondsDegrees: 0,
      minutesDegrees: 0,
      hoursDegrees: 0,
    }
  }

  componentDidMount(): void {
    this.setState( this.calculateTime() )

    this.intervalFh = setInterval(() => {
      this.setState( this.calculateTime() )
    }, 1000);
  }

  componentWillUnmount(): void {
    clearInterval(this.intervalFh);
  }

  calculateTime () {
    return {
      hoursDegrees:  (360 / 12) * ((Number(moment().format('HH')) + this.props.item.timeZone) % 12) + (360 / 12) * (Number(moment().format('mm')) / 60),
      minutesDegrees: (360 / 60) * Number(moment().format('mm')) + 90,
      secondsDegrees: (360 / 60) * Number(moment().format('ss'))
    }
  }


  componentDidUpdate(_oldProps: Readonly<proposIForm>, _oldState: Readonly<IState>) {}

  render() {
    return (
      <div className={classes['field']}>
        <h4 className={classes['h4']}>{this.props.item.name}</h4>
        <div className={classes['clock']}>
          <div className={classes[""]}></div>
          <div className={`${classes['hand']} ${classes['hour']}`} style={{transform: `rotate(${this.state.hoursDegrees}deg)`}}></div>
          <div className={`${classes['hand']} ${classes['minute']}`} style={{transform: `rotate(${this.state.minutesDegrees}deg)`}}></div>
          <div className={`${classes['hand']} ${classes['second']}`} style={{transform: `rotate(${this.state.secondsDegrees}deg)`}}></div>
          <div id={this.props.item.id} className={classes['delete']} onClick={this.props.item.handler}>X</div>
        </div>
      </div>
    );
  }
}