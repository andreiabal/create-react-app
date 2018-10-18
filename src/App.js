import React, { Component } from 'react';
import './App.css';
import Card from './Card.js';
import ArtistsCard from './ArtistsCard.js';
import { Route, Link } from 'react-router-dom'; 

class App extends Component {
  constructor(props) {
    super(props); //inicializando

    this.state = {
      artists: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const BASE_URL = "https://peaceful-badlands-98440.herokuapp.com"
    const options = {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ email: "rafael@laboratoria.la", password: "banana" })
    };

    fetch(`${BASE_URL}/login`, options)
      .then(res => { 
        const options = {
          method: "get", //poderia apagar o get porque é default
          credentials: 'include'
        };
        fetch(`${BASE_URL}/artists`, options)
          .then(res => res.json())
          .then(data => this.setState({ artists: data }));
        });

  }
  handleClick() {

  }

  render() {
    return (
      <div>
        <Card>
         <h1>Toca tudo</h1>
         <h2>A música que você quiser, quando quiser</h2>
        </Card>

        <nav className="menu">
          <Link to="/">Home</Link>
          <Link to="/about">Sobre</Link>
          <Link to="/artists">Artistas</Link>
          <Link to="/contact">Contato</Link>
        </nav>

        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={About}/>
        <Route path="/contact" exact component={Contact}/>
        <Route path="/artists" render={ () =>
          <div>
            {this.state.artists.map((artist) =>
              <ArtistsCard name={artist.name} genre={artist.genre} id={artist.id} key={artist.id} />
            )}
          </div>
        } />
      </div>
    );
  }
}

const Home = () => {
  return (
    <div>
      <h2>Conheça</h2>
    </div>
  )
}

const Contact = () => {
  return (
    <div>
      <h2>lalalalalalalala</h2>
    </div>
  )
}

const About = () => {
  return (
    <div>
      <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Nam hendrerit nisi sed sollicitudin pellentesque.
        Nunc posuere purus rhoncus pulvinar aliquam.
        Ut aliquet tristique nisl vitae volutpat.
        Nulla aliquet porttitor venenatis.
        Donec a dui et dui fringilla consectetur id nec massa.
        Aliquam erat volutpat.
      </h4>
    </div>
  )
}

export default App;
