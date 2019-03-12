import Header from '../components/header';
import { version } from '../package.json';

function Index() {
  return (
    <main>
      <footer>
        <div>wildmagic at kenny.wtf 2019</div>
        <div>{version}</div>
        <div>
          <a href="https://github.com/wild-magic/Wild-Magic.git"> github</a>
        </div>
      </footer>
    </main>
  );
}

export default Index;
