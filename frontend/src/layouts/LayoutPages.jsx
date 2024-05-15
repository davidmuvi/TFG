import Navbar from '../components/navbar';

const Layout = ({ children }) => {
  return (
    <div className='h-screen w-screen'>
      <Navbar />
      {children}
    </div>
  );
}

export default Layout;