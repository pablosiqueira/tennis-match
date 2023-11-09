import Court from "../Court/Court"
import Board from "../Board/Board"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from "react";
import NewMatch from "../Board/NewMatch";

const Main = (props) =>{
    const [newMatch,setNewMatch] = useState(true)
    const [data,setData] = useState([])
    const [sides,setSides] = useState({top:'player1', bottom: 'player2'})
    const [servSide,setServSide] = useState('r')
    const [serv,setServ] = useState('')
    const [names,setNames] = useState({player1:'',player2:''})


    const startMatch = (matchData) => {
        console.log(matchData)
        setData(matchData)
        console.log(matchData.playSides)
        setServ(matchData.serv)
        setSides(matchData.playSide)
        setNewMatch(false)
        setNames({player1:matchData.player1,player2:matchData.player2})
    }

    const endMatch = () =>{
        setData([])
        setSides({top:'player1', bottom: 'player2'})
        setNewMatch(true)
        setServ('')
    }

    const changeServSide = (games,end) => {
        if(games % 2 === 0){
            const nowSide = {...sides}
            setSides({top: nowSide.bottom,bottom: nowSide.top})
            setServSide('r')
        }else{
            if(servSide === 'r'){
                setServSide('l')
            }else{
                setServSide('r')
            }
        }
        if(end === true){
            console.log('end of game')
            const oldServ = serv
            if(oldServ === 'player1'){
                setServ('player2')
            }else{
                setServ('player1')
            }
        }
    }

    return(
        <>
        <Container className="pb-4">
            <Row className="align-items-center">
            <Col sm={12} lg={6}><Court sides={sides} serv={serv} servSide={servSide} names={names}/></Col>
            <Col sm={12} lg={6}>
                {newMatch && <NewMatch startMatch={startMatch} changeSides={setSides}/>}
                {!newMatch && <Board data={data} serv={serv} end={endMatch} changeServSide={changeServSide}/>}
            </Col>
            </Row>
        </Container>
         
        </>
    )
}

export default Main