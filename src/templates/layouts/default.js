import { h } from 'preact';
import Skip from '@components/skip';
import Header from '@components/header';
// import ExampleNavigation from '@components/example-navigation';
// import ExampleNavigationItem from '@components/example-navigation-item';
import Main from '@components/main';
import LogoLink from '@components/logo-link';
import Title from '@components/title';
import Footer from '@components/footer';

const Default = ({ children }) => <body>
    <Header>
        <LogoLink />
        <Title>UI Patterns</Title>
        {/* <ExampleNavigation ariaLabel={'Main navigation'}>
            <ExampleNavigationItem href="/" active={section === 'Home'}>Home</ExampleNavigationItem>
        </ExampleNavigation> */}
    </Header>
    <Main>
        { children }
    </Main>
    <Footer />
</body>;

export default Default;