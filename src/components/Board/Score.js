import styles from "./Board.module.css"
import Col from "react-bootstrap/Col"

const Score = (props) =>{
    return(
        <>
            <Col md={3} className="p-0 mx-1" style={{width:'fit-content'}}>
                <h6 className={"text-uppercase mr-1 " + styles.colorYellow}>{props.title}</h6>
                <h4 className={styles.score + ' p-2 mx-1 mb-3'}>{props.p1}</h4>
                <h4 className={styles.score + ' p-2 mx-1'}>{props.p2}</h4>
            </Col>
        </>
    )
}

export default Score