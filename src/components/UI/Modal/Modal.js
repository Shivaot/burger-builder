import React from 'react';
import Aux from '../../../hoc/Aux/Aux'
import classes from './Modal.module.css';
import BackDrop from '../Backdrop/Backdrop';



const Modal = props => {
    // shouldComponentUpdate(nextProps,nextState) {
    //     return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    // }
   
        return (
            <Aux>
                <BackDrop show={props.show} clicked={props.modalClosed}/>
                <div 
                    className={classes.Modal} 
                    style={{
                        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: props.show ? '1' : '0'
                    }}>
                    {props.children}
                </div>
             </Aux>
        );
    
}

/**
 * Until now we checked: should the component be updated (= re-render required)?
 *  From now on we check the opposite: should the component be memoized (= re-render not required)?
 */
// shouldComponentUpdate check if they are not equal 
// here we want to check if they ARE equal
// it checks if prev and next props are same then return the cached/memoize component
export default React.memo(Modal, (prevProps, nextProps) => nextProps.show === prevProps.show && nextProps.children === prevProps.children);   