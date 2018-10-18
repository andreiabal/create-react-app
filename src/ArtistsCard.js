import React from 'react';
import './Card.js';
import './ArtistsCard.css';
import Card from './Card';
import PropTypes from "prop-types";

function ArtistTrack(props) {
  return(
    <li className={props.className}>
      {props.title}<br />
      <iframe src={props.url} />
    </li>
  )
}

ArtistTrack.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  className: PropTypes.string
}

class ArtistsCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = { tracks: [] }
    this.getArtistTracks = this.getArtistTracks.bind(this);
  }
  
  getArtistTracks(event) {
    const BASE_URL = "https://peaceful-badlands-98440.herokuapp.com"
    const options = {
      method: "get", //poderia apagar o get porque é default
      credentials: 'include'
    };
    fetch(`${BASE_URL}/artists/${this.props.id}/tracks`, options)
      .then(res => res.json())
      .then(data => {
        if (data.length === 0) {
        this.setState({ tracks: [{title: "Nadinha de nada"}] })
        } else {
          this.setState({ tracks: data })
        }
      });
  }
  
  render() {
    return (
      <Card>
        <h2>{this.props.name}</h2>
        <h3>{this.props.genre}</h3>
        <button onClick={this.getArtistTracks}>
          Listar músicas
        </button>
        <ul>
          {this.state.tracks.map( (track, index) => 
          <ArtistTrack key={index} {...track}/> )}
        </ul>
      </Card>
    );
  }
}

ArtistsCard.propTypes = {
  name: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
}

export default ArtistsCard;

//{...track} é como dizer title={track.title}