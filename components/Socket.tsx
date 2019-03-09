import * as React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { littleBox } from '../Game/entities';
import { addEntityAction } from 'wild-magix';

interface SocketProps {
  addEntity: () => void;
}

const SocketComponent: React.FunctionComponent<SocketProps> = props => {
  const { addEntity } = props;
  const [message, setMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    const socket = io(window.location.href);
    socket.on('now', data => {
      setMessage(data.message);
      // not working atm
      // addEntity();
    });
  }, []);

  return <div div="socket-container">{message}</div>;
};

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  addEntity: () => dispatch(addEntityAction(littleBox)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SocketComponent);
