import React from 'react';
import './App.css';

function App() {
  return (
    <div className="container">
      <div className="bg-info p-4">
        <div className="row align-items-center">
          <div className="col text-center">
            <img src="./images/drink_tapioka_tea_woman.png" alt="drink_tapioka_tea_woman" className="c-image__large d-block bg-white m-auto"/>
            <select name="" id="">
              <option>nakaoka</option>
            </select>
          </div>
          <div className="col text-white">拍手できる:70</div>
          <div className="col text-white">拍手された:0</div>
        </div>
      </div>
      <div className="bg-light p-4">
        <div className="row align-items-center">
          <div className="col-4 text-center">
            <img src="./images/drink_tapioka_tea_woman.png" alt="drink_tapioka_tea_woman" className="c-image__large d-block bg-white m-auto"/>
            <select name="" id="">
              <option>nakaoka</option>
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
          <img src="./images/clap.png" alt="clap" className="c-image__small col-auto p-0"/>
          <span className="col-auto">0</span>
          <span className="col text-right">2019/04/29 22:30</span>
        </div>
      </div>
    </div>
  );
}

export default App;
