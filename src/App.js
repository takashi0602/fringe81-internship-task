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
              <select name="" id="" value={this.state.user[0].id} onChange={this.changeUser}>
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
              <img src={this.state.praiseUser[0].img} alt={this.state.user[0].name} className="c-image__large d-block bg-white m-auto"/>
              <select name="" id="" value={this.state.praiseUser[0].id} onChange={this.changePraiseUsers}>
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
    this.state = {
      user: [
        {
          id: "1",
          name: "nakaoka",
          img: "./images/monster01.png",
          claps: 100
        }
      ],
      praiseUser: [
        {
          id: "2",
          name: "yamamoto",
          img: "./images/monster02.png"
        }
      ]
    };

    this.incrementClap = this.incrementClap.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.changePraiseUsers = this.changePraiseUsers.bind(this);
  }

  createUsers() {
    let users = [
      {
        id: "1",
        name: "nakaoka",
        img: "./images/monster01.png",
        claps: 100
      },
      {
        id: "2",
        name: "yamamoto",
        img: "./images/monster02.png",
        claps: 100
      },
      {
        id: "3",
        name: "tanaka",
        img: "./images/monster03.png",
        claps: 100
      },
      {
        id: "4",
        name: "inoue",
        img: "./images/monster04.png",
        claps: 100
      },
      {
        id: "5",
        name: "sakamoto",
        img: "./images/monster05.png",
        claps: 100
      },
      {
        id: "6",
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
      options.push(<option key={i} value={users[i].id}>{users[i].name}</option>);
    }
    return options;
  }

  selectPraiseUsers() {
    let user = this.state.user[0];
    let users = this.createUsers();
    let options = [];
    for(let i in users) {
      if (users[i].id !== user.id) options.push(<option key={i} value={users[i].id}>{users[i].name}</option>);
    }
    return options;
  }

  changeUser(e) {
    let user = this.state.user;
    let praiseUser = this.state.praiseUser;
    let users = this.createUsers();
    for (let i in users) {
      if (users[i].id === e.target.value) user[0] = users[i]
    }
    this.setState({user: user});

    // userとpraiseUserの値が同じ場合、praiseUserの値を変更
    if (user[0].id === praiseUser[0].id) {

      // user.idが1なら、users.idが2の値を返す
      if (user[0].id === "1") praiseUser[0] = users[1];

      // user.idが1以外なら、users.idが1の値を返す
      else praiseUser[0] = users[0];
      this.setState({praiseUser: praiseUser});
    }
    localStorage.setItem('state', JSON.stringify(this.state));
  }

  changePraiseUsers(e) {
    let user = this.state.praiseUser;
    let users = this.createUsers();
    for (let i in users) {
      if (users[i].id === e.target.value) user[0] = users[i]
    }
    this.setState({praiseUser: user});
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
