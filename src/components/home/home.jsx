import React from 'react';
import { Container, ProgressBar, Row, Col, Image } from 'react-bootstrap';
import Clock from 'react-live-clock';
import jumbotronEmoji from '../../assets/jumbotronEmoji.jpeg';
import timer from '../../assets/timer.png';
import ubc from '../../assets/ubc.jpg';
import lock from '../../assets/lock.png';
import like from '../../assets/like.png';
import './home.scss';

const Home = () => {
  return (
    <div className="home-container">
      <Row>
        <Col className="home-container__ubc">
          <Image className="home-container__ubc__image" src={ubc} alt="ubc" scale="0" />
        </Col>
        <Col>
          <Row>
            <Col className="home-container__clock">
              <Clock
                format={'h:mm a'}
                style={{fontSize: '1.2em', fontWeight: '900'}}
                ticking={true}
              />
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col md="auto" className="home-container__topic">
              Current Affairs
            </Col>
          </Row>
        </Col>
        <Col className="home-container__lock">
          <Image className="home-container__lock__image" src={lock} alt="ubc" scale="0" />
        </Col>
      </Row>
      <Container>
        <Row className="justify-content-md-center">
          <Col sm={2} className="home-container__emoji">
            <Image className="home-container__emoji__image" src={jumbotronEmoji} alt="Question" scale="0" />
          </Col>
          <Col sm={9} className="home-container__question">
            <h1><strong>Who is Uganda's Prime Minister!</strong></h1>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md="auto" className="home-container__like">
            <Image className="home-container__like__image" src={like} alt="Answer" scale="0" />
          </Col>
          <Col md="auto" className="home-container__answer">
            <h3><strong>Ruhakana Rugunda</strong></h3>
          </Col>
        </Row>
      </Container>
      <Row>
        <Col className="home-container__timer">
          <Image className="home-container__timer__image" src={timer} alt="timed game" scale="0" />  
        </Col>
      </Row>
      <ProgressBar
        now={60}
        min={0}
        max={100}
      />
    </div>
  );
}

export default Home;
