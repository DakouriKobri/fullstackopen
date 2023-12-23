function Notification({ message, isError }) {
  return (
    <div className="notification" style={{ color: isError ? 'red' : '' }}>
      {message}
    </div>
  );
}
export default Notification;
