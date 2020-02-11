import React from 'react';
import { Container, ProgressBar, Row, Col, Image } from 'react-bootstrap';
import Clock from 'react-live-clock';
import jumbotronEmoji from '../../assets/jumbotronEmoji.jpeg';
import timer from '../../assets/timer.png';
import './landingPage.scss';

const LandingPage = props => {
  const { count } = props
  return (
    <Container>
      <div className="landing-container">
        <Row >
          <Col className="landing-container__emoji">
            <Image className="landing-container__emoji__image" src={jumbotronEmoji} alt="Welcome" scale="0" />
          </Col>
        </Row>
        <Row >
          <Col className="landing-container__starting">
            Starting shortly.........
          </Col>
        </Row>
        <Row >
          <Col className="landing-container__timer">
            <Image className="landing-container__timer__image" src={timer} alt="timed game" scale="0" />  
          </Col>
        </Row>
        <ProgressBar
          now={count}
          min={0}
          max={100}
        />
        <div className="landing-container__clock">
          <Clock
            format={'h:mm a'}
            style={{fontSize: '1.2em', fontWeight: '900'}}
            ticking={true}
          />
        </div>
      </div>
    </Container>
  );
}

export default LandingPage;
