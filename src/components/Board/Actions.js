import styles from './Board.module.css'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import {FaUndoAlt} from 'react-icons/fa'
//import { useState } from 'react'


const Actions = (props) => {
    //const [modalShow, setModalShow] = useState(false);
    //const [message, setMessage] = useState('');

    return(
        <>
        <div className={"d-flex justify-content-around py-2 " + styles.backGreen}>
            <div className='text-center'>
                <h4 className={styles.colorYellow}>Serving</h4>
                <h6>{props.serving}</h6>
                <Image src={'./tennis.png'} alt='tennis ball' style={{width:'35px'}}/>
                {props.netStatus !==1 && <Image src={'./tennis.png'} alt='tennis ball' style={{width:'35px'}}/>}
                {props.onNet < 2 && <Image src={'./net.png'} alt='net' style={{width:'35px'}}/>}
                {props.onNet < 1 &&  <Image src={'./net.png'} alt='net' style={{width:'35px'}}/>}
                <br/>
                <Button size='sm' className={styles.button23 + ' m-2'} variant="warning" onClick={() => props.handleNet('out')}>Out</Button>
                <Button size='sm' className={styles.button23 + ' m-2'} variant="warning" onClick={() => props.handleNet('net')}>Net</Button>
            </div>

            <div className='text-center'>
                <h4 className={styles.colorYellow}>Add Point</h4>
                <Image src={'./raq.png'} alt='tennis ball' style={{width:'35px'}}/>
                <div className={"d-flex justify-content-center " + styles.backGreen}>
                    <div>
                        <Button className={styles.button23 + ' m-1 w-100 '+ styles.pointBtn} variant="warning" onClick={()=>props.updatePoints('player1')}>{props.player1}</Button><br/>
                        <Button className={styles.button23 + ' m-1 w-100 ' + styles.pointBtn} variant="warning" onClick={()=>props.updatePoints('player2')}>{props.player2}</Button>
                    </div>
                    <Button className={styles.button23 + ' mx-2 my-1'} variant="warning" onClick={props.undoPoints}><FaUndoAlt/></Button>
                </div>
                 
            </div>
            
        </div>
        <h5 className={styles.msgStatus + " py-2"}><i>{props.message}</i></h5>

        <div className='d-flex justify-content-around mx-3 pb-2'>
            <Button className={styles.button23 + ' m-2'} size="lg" variant="warning" onClick={props.end}>End Match</Button>
            <Button className={styles.button23 + ' m-2'} size="lg" variant="warning" onClick={props.reset}>Reset Match</Button>
        </div> 

      
        
        </>
    )
}

export default Actions