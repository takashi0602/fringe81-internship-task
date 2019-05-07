import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="bg-info p-4">
          <div className="row align-items-center">
            <div className="col text-center">
              <img src={this.state.user[0].img} alt={this.state.user[0].name} className="c-image__large d-block bg-white m-auto"/>
              <select name="" id="" value={this.state.user[0].name} onChange={this.changeUser}>
                {this.selectUsers()}
              </select>
            </div>
            <div className="col text-white">拍手できる:{this.state.user[0].claps}</div>
            <div className="col text-white">拍手された:0</div>
          </div>
        </div>
        <div className="bg-light p-4">
          <div className="row align-items-center">
            <div className="col-4 text-center">
              <img src="./images/drink_tapioka_tea_woman.png" alt="drink_tapioka_tea_woman" className="c-image__large d-block bg-white m-auto"/>
              <select name="" id="">
                {this.selectPraiseUsers()}
              </select>
            </div>
            <div className="col-8">
              <textarea name="" id="" rows="5" className="form-control" placeholder="5文字以上入力して下さい。"/>
            </div>
          </div>
          <div className="text-right">
            <button className="btn btn-primary">投稿</button>
          </div>
        </div>
        <div className="p-4">
          <div>
            <img src="./images/drink_tapioka_tea_woman.png" alt="drink_tapioka_tea_woman" className="c-image"/>
            <img src="./images/arrow_right.png" alt="arrow_right" className="c-image"/>
            <img src="./images/drink_tapioka_tea_woman.png" alt="drink_tapioka_tea_woman" className="c-image"/>
          </div>
          <p className="mb-3">hogehogehogehogehogehoge</p>
          <div className="row m-0">
            <img src="./images/clap.png" alt="clap" className="c-image__small col-auto p-0" onClick={this.incrementClap}/>
            <span className="col-auto">{this.state.claps}</span>
            <span className="col text-right">2019/04/29 22:30</span>
          </div>
        </div>
        <button className="btn btn-danger mb-3" onClick={this.reset}>リセット</button>
      </div>
    );
  }

  constructor(props) {
    super(props);
    localStorage.setItem("claps", "0");
    this.state = {
      user: [
        {
          name: "nakaoka",
          img: "./images/monster01.png",
          claps: 100
        }
      ]
    };

    this.incrementClap = this.incrementClap.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  createUsers() {
    let users = [
      {
        name: "nakaoka",
        img: "./images/monster01.png",
        claps: 100
      },
      {
        name: "yamamoto",
        img: "./images/monster02.png",
        claps: 100
      },
      {
        name: "tanaka",
        img: "./images/monster03.png",
        claps: 100
      },
      {
        name: "inoue",
        img: "./images/monster04.png",
        claps: 100
      },
      {
        name: "sakamoto",
        img: "./images/monster05.png",
        claps: 100
      },
      {
        name: "kimura",
        img: "./images/monster06.png",
        claps: 100
      }
    ];
    return users;
  }

  selectUsers() {
    let users = this.createUsers();
    let options = [];
    for(let i in users) {
      options.push(<option key={i} value={users[i].name}>{users[i].name}</option>);
    }
    return options;
  }

  selectPraiseUsers() {
    let users = this.createUsers();
    let options = [];
    for(let i in users) {
      options.push(<option key={i} value={users[i].name}>{users[i].name}</option>);
    }
    return options;
  }

  changeUser(e) {
    let user = this.state.user;
    let users = this.createUsers();
    for (let i in users) {
      if (users[i].name === e.target.value) user[0] = users[i]
    }
    this.setState({user: user});
    localStorage.setItem('state', JSON.stringify(this.state));
  }


  incrementClap() {
    let claps = this.state.claps;
    this.setState({claps: ++claps});
    localStorage.setItem('claps', claps);
  }

  reset() {
    localStorage.clear();
  }
}

export default App;
