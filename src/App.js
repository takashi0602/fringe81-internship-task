import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip'
import './App.css';
import { usersList } from './users'

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="bg-info p-4">
          <div className="row align-items-center">
            <div className="col text-center">
              <img src={this.state.user.img} alt={this.state.user.name} className="c-image__large d-block bg-white m-auto"/>
              <select name="" id="" value={this.state.user.id} onChange={this.changeUser}>
                {this.selectUsers()}
              </select>
            </div>
            <div className="col text-white">拍手できる:{this.state.user.claps.possible}</div>
            <div className="col text-white">拍手された:{this.state.user.claps.point}</div>
          </div>
        </div>
        <div className="bg-light p-4">
          <div className="row align-items-center">
            <div className="col-4 text-center">
              <img src={this.state.praiseUser.img} alt={this.state.user.name} className="c-image__large d-block bg-white m-auto"/>
              <select name="" id="" value={this.state.praiseUser.id} onChange={this.changePraiseUsers}>
                {this.selectPraiseUsers()}
              </select>
            </div>
            <div className="col-8">
              <textarea name="" id="" rows="5" className="form-control" value={this.state.text} placeholder="5文字以上入力して下さい。" onChange={this.changeTextArea}/>
            </div>
          </div>
          <div className="text-right">
            <button className="btn btn-primary" onClick={this.submit} disabled={this.showPostButton()}>投稿</button>
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
      const activeUser = JSON.parse(localStorage.getItem("user"));
      const users = JSON.parse(localStorage.getItem("users")).filter((user) => {
        return activeUser.id !== user.id;
      });
      const posts = localStorage.getItem("posts") ? JSON.parse(localStorage.getItem("posts")) : [];
      this.state = {
        user: activeUser,
        praiseUser: users[0],
        text: "",
        posts: posts
      };
    }
    else {
      localStorage.setItem("users", JSON.stringify(usersList));
      let users = JSON.parse(localStorage.getItem("users"));
      localStorage.setItem("user", JSON.stringify(users[0]));
      this.state = {
        user: users[0],
        praiseUser: users[1],
        text: "",
        posts: []
      };
    }

    this.incrementClap = this.incrementClap.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.changePraiseUsers = this.changePraiseUsers.bind(this);
    this.changeTextArea = this.changeTextArea.bind(this);
    this.submit = this.submit.bind(this);
    this.showPosts = this.showPosts.bind(this);
    this.showClapButton = this.showClapButton.bind(this);
    this.showPostButton = this.showPostButton.bind(this);
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
    let activeUser = this.state.user;
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
      if (user.id === e.target.value) activeUser = user;
    }
    this.setState({user: activeUser});
    if (activeUser.id === users[0].id) praiseUser = users[1];
    else praiseUser = users[0];
    this.setState({praiseUser: praiseUser});
    localStorage.setItem('user', JSON.stringify(activeUser));
  }

  changePraiseUsers(e) {
    let praiseUser = this.state.praiseUser;
    let users = JSON.parse(localStorage.getItem("users"));
    for (let user of users) {
      if (user.id === e.target.value) praiseUser = user
    }
    this.setState({praiseUser: praiseUser});
  }

  changeTextArea(e) {
    this.setState({text: e.target.value});
  }

  submit() {
    let date = new Date();
    let posts = this.state.posts;
    let newPost = {
      id: this.state.posts.length,
      userId: this.state.user.id,
      userImg: this.state.user.img,
      praiseUserId: this.state.praiseUser.id,
      praiseUserImg: this.state.praiseUser.img,
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
    localStorage.setItem('posts', JSON.stringify(posts));
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
              <ReactTooltip effect="solid" place="bottom" multiline={true} />
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
    let activeUser = this.state.user;
    let posts = this.state.posts;
    let id = e.target.id;
    let users = JSON.parse(localStorage.getItem("users")).map((user) => {
      if (user.id === posts[id].userId || user.id === posts[id].praiseUserId) {
        user.claps.point += 1;
      }
      if (user.id === this.state.user.id) {
        user.claps.possible -= 2;
      }
      return user;
    });
    posts[id].claps.total += 1;
    activeUser.claps.possible -= 2;
    if (posts[id].claps.users.hasOwnProperty(activeUser.id)) {
      posts[id].claps.users[activeUser.id] += 1;
    }
    else {
      posts[id].claps.users[activeUser.id] = 1;
    }
    this.setState({user: activeUser});
    this.setState({posts: posts});
    localStorage.setItem("user", JSON.stringify(activeUser));
    localStorage.setItem("posts", JSON.stringify(posts));
    localStorage.setItem("users", JSON.stringify(users));
  }

  showClapButton(id) {
    let activeUser = this.state.user;
    let post = this.state.posts[id];
    if (post.userId === activeUser.id || post.praiseUserId === activeUser.id) return true;
    if (activeUser.claps.possible < 2) return true;
    if (post.claps.users.hasOwnProperty(activeUser.id) && post.claps.users[activeUser.id] > 14) return true;
    return false;
  }

  showPostButton() {
    return this.state.text.length < 5;
  }

  reset() {
    localStorage.clear();
  }
}

export default App;
