import '../../../styles/UserPage.css'

function UPContent(props){
    return (
        <div className='up_content'>
             email: {props.selectedUser.user}, password: {props.selectedUser.password}, type: {props.selectedUser.type}, ID: {props.selectedUser.id}
        <br></br>
             <span style={{fontSize: '2rem', color: 'red'}}>NOT FINISHED YET MY BIG MAN!</span>
        </div>
    )
}

export default UPContent

