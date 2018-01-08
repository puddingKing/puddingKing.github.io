import React from 'react';
import { Link } from 'react-router-dom';
import './public/css/main.css';
// import { browserHistory } from 'react-router';
import { createHashHistory } from 'history'

const history = createHashHistory()
console.log(history.location.pathname)

const links = [{
  id: 1,
  url: "/info",
  text: "个人信息"
}, {
  id: 2,
  url: "/shows",
  text: "项目展示"
}];

let activeid = 1;
init();

class App extends React.Component {
  render () {
    return (
      <div>
        <div className="page">
          <div className="wrapper top">
            <header className="pagetit">Shane HomePage</header>
            <div className="line"></div>
          </div>
          <div className="wrapper middle">
            <Menu list={links}></Menu>
            <div className="content">
              { this.props.children }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
function cueMenu(id) {
  activeid = id;
}

function ListItem(props) {
  return props.isActive ? <li className="active"><a>{props.text}</a></li> : <li onClick={cueMenu(props.id)}><Link to={props.url}>{props.text}</Link></li>
}

function Menu (props){
  const list = props.list
  const listItems = list.map((item) => {
    return <ListItem key={item.id.toString()} id={item.id} url={item.url} text={item.text} isActive={item.id === activeid} />
  });
  return (
    <ul className="menu fl">
      { listItems }
    </ul>
  )
}

function init () {
  links.map((item) => {
    if (item.url === history.location.pathname) {
      activeid = item.id
    }
  })
}

export default App;