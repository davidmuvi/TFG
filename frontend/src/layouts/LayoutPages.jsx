import Navbar from '../components/Navbar';

const Layout = ({ children }) => {
  return (
    <div className='min-h-screen min-w-full flex flex-col'>
      <Navbar />
      {children}
    </div>
  );
}

export default Layout;