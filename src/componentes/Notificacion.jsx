const Notificacion = ({msj}) =>{
    if(msj===null)
        return null
    return(
        <div className="error">
            {msj}
        </div>
    )
}
export default Notificacion