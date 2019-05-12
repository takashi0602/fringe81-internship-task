import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip'
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
            <div className="col text-white">拍手できる:{this.state.user[0].claps.possible}</div>
            <div className="col text-white">拍手された:{this.state.user[0].claps.point}</div>
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
              <textarea name="" id="" rows="5" className="form-control" value={this.state.text} placeholder="5文字以上入力して下さい。" onChange={this.changeTextArea}/>
            </div>
          </div>
          <div className="text-right">
            <button className="btn btn-primary" onClick={this.submit}>投稿</button>
          </div>
        </div>
        <div>{this.showPosts()}</div>
        <button className="btn btn-danger mb-3" onClick={this.reset}>リセット</button>
      </div>
    );
  }

  constructor(props) {
    super(props);
    if (localStorage.getItem("users")) {
      this.state = JSON.parse(localStorage.getItem("state"));
    }
    else {
      localStorage.setItem("users", JSON.stringify(this.createUsers()));
      this.state = {
        user: [
          {
            id: "1",
            name: "nakaoka",
            img: "./images/monster01.png",
            claps: {
              possible: 100,
              point: 0
            }
          }
        ],
        praiseUser: [
          {
            id: "2",
            name: "yamamoto",
            img: "./images/monster02.png",
            claps: {
              possible: 100,
              point: 0
            }
          }
        ],
        text: "",
        posts: []
      };
      localStorage.setItem("state", JSON.stringify(this.state));
    }

    this.incrementClap = this.incrementClap.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.changePraiseUsers = this.changePraiseUsers.bind(this);
    this.changeTextArea = this.changeTextArea.bind(this);
    this.submit = this.submit.bind(this);
    this.showPosts = this.showPosts.bind(this);
    this.showClapButton = this.showClapButton.bind(this);
  }

  createUsers() {
    const users = [
      {
        id: "1",
        name: "nakaoka",
        img: "./images/monster01.png",
        claps: {
          possible: 100,
          point: 0
        }
      },
      {
        id: "2",
        name: "yamamoto",
        img: "./images/monster02.png",
        claps: {
          possible: 100,
          point: 0
        }
      },
      {
        id: "3",
        name: "tanaka",
        img: "./images/monster03.png",
        claps: {
          possible: 100,
          point: 0
        }
      },
      {
        id: "4",
        name: "inoue",
        img: "./images/monster04.png",
        claps: {
          possible: 100,
          point: 0
        }
      },
      {
        id: "5",
        name: "sakamoto",
        img: "./images/monster05.png",
        claps: {
          possible: 100,
          point: 0
        }
      },
      {
        id: "6",
        name: "kimura",
        img: "./images/monster06.png",
        claps: {
          possible: 100,
          point: 0
        }
      }
    ];
    return users;
  }

  selectUsers() {
    let users = JSON.parse(localStorage.getItem("users"));
    let options = [];
    for(let user of users) {
      options.push(<option key={user.id} value={user.id}>{user.name}</option>);
    }
    return options;
  }

  selectPraiseUsers() {
    let activeUser = this.state.user[0];
    let users = JSON.parse(localStorage.getItem("users"));
    let options = [];
    for(let user of users) {
      // user以外をoptionで表示する
      if (user.id !== activeUser.id) options.push(<option key={user.id} value={user.id}>{user.name}</option>);
    }
    return options;
  }

  changeUser(e) {
    let activeUser = this.state.user;
    let praiseUser = this.state.praiseUser;
    let users = JSON.parse(localStorage.getItem("users"));
    for (let user of users) {
      if (user.id === e.target.value) activeUser[0] = user;
    }
    this.setState({user: activeUser});
    if (activeUser[0].id === users[0].id) praiseUser[0] = users[1];
    else praiseUser[0] = users[0];
    this.setState({praiseUser: praiseUser});
    localStorage.setItem('state', JSON.stringify(this.state));
  }

  changePraiseUsers(e) {
    let praiseUser = this.state.praiseUser;
    let users = JSON.parse(localStorage.getItem("users"));
    for (let user of users) {
      if (user.id === e.target.value) praiseUser[0] = user
    }
    this.setState({praiseUser: praiseUser});
    localStorage.setItem('state', JSON.stringify(this.state));
  }

  changeTextArea(e) {
    this.setState({text: e.target.value});
  }

  submit() {
    if (this.state.text.length < 5) {
      alert("5文字以上入力して下さい。");
      return;
    }
    let date = new Date();
    let posts = this.state.posts;
    let newPost = {
      id: this.state.posts.length,
      userId: this.state.user[0].id,
      userImg: this.state.user[0].img,
      praiseUserId: this.state.praiseUser[0].id,
      praiseUserImg: this.state.praiseUser[0].img,
      text: this.state.text,
      date: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`,
      claps: {
        total: 0,
        users: {}
      }
    };
    posts.push(newPost);
    this.setState({posts: posts});
    this.setState({text: ""});
    localStorage.setItem('state', JSON.stringify(this.state));
  }

  showPosts() {
    let postsState = this.state.posts;
    let posts = [];
    for (let post of postsState) {
      posts.unshift(
        <div className="p-4" key={post.id}>
          <div>
            <img src={post.userImg} alt={post.userImg} className="c-image"/>
            <img src="./images/arrow_right.png" alt="arrow_right" className="c-image"/>
            <img src={post.praiseUserImg} alt={post.praiseUserImg} className="c-image"/>
          </div>
          <p className="mb-3">{post.text}</p>
          <div className="row m-0">
            <input type="image" src="./images/clap.png" alt="clap" id={post.id} className="c-image__small col-auto p-0" onClick={this.incrementClap} disabled={this.showClapButton(post.id)}/>
            <span className="col-auto" data-tip={this.tooltipText(post)}>
              {post.claps.total}
              <ReactTooltip effect="solid" place="bottom" multiline="true" />
            </span>
            <span className="col text-right">{post.date}</span>
          </div>
        </div>
      );
    }
    return posts;
  }

  tooltipText(post) {
    let users = JSON.parse(localStorage.getItem("users")).filter((user) => {
      return post.claps.users.hasOwnProperty(user.id);
    });
    let text = "";
    let count = 0;
    for (let user of users) {
      count += 1;
      text += `${user.name}: ${post.claps.users[user.id]}`;
      if (count < users.length) text += "<br>"
    }
    return text;
  }

  incrementClap(e) {
    let user = this.state.user[0];
    let post = this.state.posts;
    let id = e.target.id;
    let users = JSON.parse(localStorage.getItem("users")).map((user) => {
      if (user.id === post[id].userId || user.id === post[id].praiseUserId) {
        user.claps.point += 1;
      }
      if (user.id === this.state.user[0].id) {
        user.claps.possible -= 2;
      }
      return user;
    });
    post[id].claps.total += 1;
    user.claps.possible -= 2;
    if (post[id].claps.users.hasOwnProperty(user.id)) {
      post[id].claps.users[user.id] += 1;
    }
    else {
      post[id].claps.users[user.id] = 1;
    }
    this.setState({posts: post});
    localStorage.setItem("state", JSON.stringify(this.state));
    localStorage.setItem("users", JSON.stringify(users));
  }

  showClapButton(id) {
    let user = this.state.user[0];
    let post = this.state.posts[id];
    if (post.userId === user.id || post.praiseUserId === user.id) return true;
    if (user.claps.possible < 2) return true;
    if (post.claps.users.hasOwnProperty(user.id) && post.claps.users[user.id] > 14) return true;
    return false;
  }

  reset() {
    localStorage.clear();
  }
}

export default App;
