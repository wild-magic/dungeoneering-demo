import Link from 'next/link';
import Header from '../components/header';
import Socket from '../components/Socket';

function Index() {
  return (
    <main>
      <Header />
      <section>
        <Socket />
      </section>
    </main>
  );
}

export default Index;
