import './Sidebar.css';
import logo from './assets/logo.png';

const Sidebar = () => {
  return (
    <div className='sidebar'>
        {/*new chat button*/}
        <button>
            <img src={logo} alt='prismAI-logo' className='logo'></img>
            <span><i className="fa-solid fa-pen-to-square"></i></span>
        </button>

        {/*history*/}

        <ul className='history'>
            <li>thread1</li>
            <li>thread2</li>
            <li>thread3</li>
        </ul>

        {/*sign*/}
        <div className='sign'>
            <p>By Swapnaja Yadav &hearts;</p>
        </div>
    </div>
  )
}

export default Sidebar;