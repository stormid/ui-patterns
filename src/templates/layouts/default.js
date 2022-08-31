import { Fragment, h } from 'preact';
import Header from '@components/header';
import Main from '@components/main';
import LogoLink from '@components/logo-link';
import Title from '@components/title';
import Footer from '@components/footer';

const Default = ({ children }) => <Fragment>
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
</Fragment>;

export default Default;