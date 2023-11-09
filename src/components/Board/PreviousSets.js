import Col from "react-bootstrap/Col"
import styles from './Board.module.css'



const PreviousSets = (props) =>{
    let prevs = [{player1:0, player2:0},{player1:0, player2:0}, {player1:0, player2:0}, {player1:0, player2:0}]
    const size = props.sets.length
    if(size > 0){
        props.sets.map(item => {
            prevs = prevs.slice(1,4)
            prevs = [...prevs,item]
            return prevs
        })
    }
    return(
        <>
        <Col md={4} >
                        <div className={styles.previous}>
                            <h6 className={styles.colorYellow}>PREVIOUS SETS</h6>
                            <div className="d-flex mb-2 justify-content-center">
                                {prevs.map(item => 
                                    {return <h4 className={styles.score + ' p-2 mx-1 ' + ((item.player1 === 0 && item.player2 === 0) ? styles.colorPurple : '')}>{item.player1}</h4>})
                                }
                                
                            </div>
                            <div className="d-flex justify-content-center">
                                {prevs.map(item => 
                                    {return <h4 className={styles.score + ' p-2 mx-1 ' + ((item.player1 === 0 && item.player2 === 0) ? styles.colorPurple : '')}>{item.player2}</h4>})
                                }
                            </div>
                        </div>
        </Col>
        </>
    )
}

export default PreviousSets