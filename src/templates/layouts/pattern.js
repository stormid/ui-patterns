import { h } from 'preact';
import Skip from '@components/skip';
import Header from '@components/header';
import Main from '@components/main';
import LogoLink from '@components/logo-link';
import Title from '@components/title';
import Footer from '@components/footer';

const Default = ({ children }) => <body>
    <Header>
        <Skip />
        <LogoLink />
        <Title>UI Patterns</Title>
        {/* <ExampleNavigation ariaLabel={'Main navigation'}>
            <ExampleNavigationItem href="/" active={section === 'Home'}>Home</ExampleNavigationItem>
        </ExampleNavigation> */}
    </Header>
    <Main>
        <div class="page">
            { children }
        </div>
    </Main>
    <Footer />
</body>;

export default Default;