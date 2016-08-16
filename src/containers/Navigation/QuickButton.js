
import React, { PropTypes } from 'react'; // eslint-disable-line
import s from './QuickButton.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { TransitionMotion, spring, Motion, presets } from 'react-motion';


const QuickButton = ({ onClick, count, icon, active }) => (<div
  onClick={onClick}
  className={active ? s.rootActive : s.root}
>
    {/* {!!count && !active &&*/}
    {/* <div className={style.counter}>{count}</div>}*/}
    <TransitionMotion
      willEnter={() => ({ transform: 0 })}
      willLeave={() => ({ transform: spring(0, {stiffness: 350, damping: 20}) })}

      styles={
            !!count && !active ? [{ key: 'qweq', style: { transform: spring(1, {stiffness: 350, damping: 10}) } }] : []
        }
    >
        {(items) => {
          if (items.length) {
            const { key, style } = items[0];
            return (<div className={s.counter} key={key} style={{
              transform: `scale(${style.transform}) translateX(calc(-50% + 8px)) translateY(calc(-50% - 8px))`,
            }} >{count}</div>);
          }
          return null;
        }}
    </TransitionMotion>


    <i className="material-icons">{icon}</i>
</div>);

QuickButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
};


export default withStyles(s)(QuickButton);
