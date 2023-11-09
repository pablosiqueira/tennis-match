import Image  from "react-bootstrap/Image"
import styles from './Court.module.css'

const Court = (props) =>{
    console.log('serving ' + props.serv)
    console.log('top ' + props.sides.top)
    console.log('bottom ' + props.sides.bottom)
    const servName = props.serv === 'player1' ? props.names.player2 : props.names.player1
    console.log('name ' + servName)
    return(
        <>
            <div className="my-5 text-center">
                <div className={styles.playerDiv + ' py-2 px-4 mb-2'}>{props.sides.top} {props.sides.top===servName && <Image src={'./tennis.png'} alt='tennis ball' style={{width:'15px'}}/>}</div>
                <Image src={'./CourtModel.png'} className={styles.court + ' ' + (props.servSide==='r' ? styles.rotate : '')}/>
                <div className={styles.playerDiv + ' py-2 px-4 mt-2'}>{props.sides.bottom} {props.sides.bottom===servName && <Image src={'./tennis.png'} alt='tennis ball' style={{width:'15px'}}/>}</div>
            </div>
        </>
    )
}

export default Court