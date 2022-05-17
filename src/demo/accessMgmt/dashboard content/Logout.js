import { Button } from 'antd';
import { signOut } from 'firebase/auth';
import { auth } from '../../../Firebase';
function Logout(props) {
  return (
    <Button
      className="logout_button"
      onClick={() => {
        props.setCurrentUser();
        signOut(auth);
        localStorage.removeItem('currentUser');

        props.setIsLoggedIn(false);
      }}
      type="danger"
    >
      Log out
    </Button>
  );
}

export default Logout;
