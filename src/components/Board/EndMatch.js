import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import styles from './Board.module.css'
import Image from "react-bootstrap/Image"
//import { useState,useEffect } from "react"

const EndMatch = (props) =>{
   /* const [data,setData] = useState({...props.data})
    console.log(data)

    useEffect(()=>{
        setData({...props.data})
    },[props.data])
*/
    const data = {...props.data}
    //console.log(data)
    const time = data.elapsedTime.split('.')

    return(
        <>
        <Container className={styles.backGreen + " text-center p-0 " + styles.colorYellow}>
        <h3 className={'mt-2'}>End of Match</h3>
        {props.matchWinner === '' && 
            <>
            <h3>Draw</h3>
            <h4>{props.totalSets.player1} - {props.totalSets.player1}</h4>
            </>}
        {props.matchWinner !== '' && <Image src={'./trophy.png'} alt='trophy' className="mb-2" style={{width:'50px'}}/>}    
        
        {props.matchWinner === 'player1' && <h5><b>{data.player1}</b> {props.totalSets.player1} - {props.totalSets.player2} <b>{data.player2}</b></h5>}
        {props.matchWinner === 'player2' && <h5><b>{data.player2}</b> {props.totalSets.player2} - {props.totalSets.player1} <b>{data.player1}</b></h5>}
        <div className="mb-2">
        {(props.matchWinner === '' || props.matchWinner === 'player1') &&  props.sets.map((item) =>{
            return <span>{'(' + item.player1} - {item.player2 + ') '}</span>
        })}
        {(props.matchWinner === 'player2') &&  props.sets.map((item) =>{
            return <span>{'(' + item.player2} - {item.player1 + ') '}</span>
        })}
        </div>
        <h5>Play Time: {time[0]}h {time[1]}min {time[2]}s</h5>
        {props.matchWinner !== '' && <h5 className={styles.msgStatus + " py-2"}><i>Winner - {data[props.matchWinner]}</i></h5>}
        <div className='d-flex justify-content-around mx-3 pb-2'>
            <Button className={styles.btns + ' m-2'} size="lg" variant="warning" onClick={props.end}>New Match</Button>
        </div> 
        </Container>
        </>
    )
}

export default EndMatch