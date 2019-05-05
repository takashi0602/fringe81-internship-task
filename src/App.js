import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="bg-info p-4">
          <div className="row align-items-center">
            <div className="col text-center">
              <img src="./images/drink_tapioka_tea_woman.png" alt="drink_tapioka_tea_woman" className="c-image__large d-block bg-white m-auto"/>
              <select name="" id="" defaultValue="hoge" onChange={this.changeSelectUser}>
                {this.selectUsers()}
              </select>
            </div>
            <div className="col text-white">拍手できる:100</div>
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
      claps: Number(localStorage.getItem("claps")),
      user: [
        {
          img: "",
          name: ""
        }
      ]
    };

    this.selectUsers = this.selectUsers.bind(this);
    this.incrementClap = this.incrementClap.bind(this);
    this.changeSelectUser = this.changeSelectUser.bind(this);
  }

  createUsers() {
    let users = [
      {
        name: "nakaoka"
      },
      {
        name: "yamamoto"
      },
      {
        name: "tanaka"
      },
      {
        name: "inoue"
      },
      {
        name: "sakamoto"
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

  changeSelectUser(e) {
    let user = this.state.user;
    user[0].img = "";
    user[0].name = e.target.value;
    this.setState({user: user})
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
